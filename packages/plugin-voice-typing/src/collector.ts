import { On } from 'better-write-plugin-core'
import { PluginTypes } from 'better-write-types'
import { computed, watch } from 'vue-demi'

type SR = {
  lang: string
  continuous: boolean
  interimResults: boolean
  onresult: ((event: SREvent) => void) | null
  onend: (() => void) | null
  onerror: (() => void) | null
  start(): void
  stop(): void
}

type SRResult = { isFinal: boolean; [index: number]: { transcript: string } }
type SREvent = { resultIndex: number; results: SRResult[] & { length: number } }

// Minimum gap (ms) between final results to insert a period vs comma
const GAP_PERIOD = 2000
const GAP_COMMA = 700

export const CollectorSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks,
) => {
  let recognition: SR | null = null
  let activeStream: MediaStream | null = null

  const stop = () => {
    recognition?.stop()
    recognition = null
    activeStream?.getTracks().forEach((t) => t.stop())
    activeStream = null
    hooks.project.utils().resetAllVisual()
  }

  On.externals().PluginVoiceStart(emitter, [
    async (lang: string, deviceId?: string) => {
      const { isSupported } = hooks.vueuse.core.useSpeechRecognition({ lang, continuous: true })
      const { audioInputs: microphones } = hooks.vueuse.core.useDevicesList()

      if (!isSupported.value) {
        hooks.toast(hooks.i18n.t('toast.generics.supported'))
        return
      }

      if (microphones.value.length === 0) {
        hooks.toast(hooks.i18n.t('toast.speech.microphone'))
        return
      }

      // toggle off if already running
      if (recognition) {
        stop()
        emitter.emit('plugin-voice-is-listening', false)
        return
      }

      // force specific microphone via getUserMedia before starting SpeechRecognition
      if (deviceId) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: { deviceId: { exact: deviceId } },
          })
          activeStream = stream
        } catch {
          // ignore — fall through to default mic
        }
      }

      // melhoria 2: id reativo ao cursor
      const id = computed(() => stores.EDITOR.actives.entity.index)

      const getEntityBase = (entityId: number): string => {
        const raw = stores.CONTEXT.entities[entityId]?.raw ?? ''
        const emptyLine = hooks.env.emptyLine()
        return raw === emptyLine ? '' : raw.trim()
      }

      let baseText = getEntityBase(id.value)
      let accumulatedFinal = ''
      let lastFinalTime = 0

      // melhoria 2: quando o foco muda de entidade, salva o acumulado na antiga
      // e reinicia o contexto para a nova
      const stopIdWatch = watch(id, (newId, oldId) => {
        if (newId === oldId) return

        // confirma texto acumulado na entidade anterior
        const committed = baseText
          ? `${baseText} ${accumulatedFinal}`.trim()
          : accumulatedFinal.trim()

        if (committed) {
          emitter.emit('plugin-voice-mutate', { id: oldId, result: committed })
          stores.CONTEXT.entities[oldId].visual.warning = false
        }

        // reinicia para a nova entidade
        baseText = getEntityBase(newId)
        accumulatedFinal = ''
        lastFinalTime = 0

        stores.CONTEXT.entities[newId].visual.warning = true
      })

      // melhoria visual de qual entidade está sendo ditada
      hooks.project.utils().resetAllVisual()
      if (stores.CONTEXT.entities[id.value]) {
        stores.CONTEXT.entities[id.value].visual.warning = true
      }

      // usa Web Speech API diretamente para controle total sobre interim e isFinal
      const SRCtor = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition
      recognition = new SRCtor() as SR
      recognition.lang = lang
      recognition.continuous = true
      recognition.interimResults = true // melhoria 5

      recognition.onresult = (event: SREvent) => {
        let interimTranscript = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript

          if (event.results[i].isFinal) {
            // melhoria 3: pontuação automática baseada na pausa
            const now = Date.now()
            const gap = lastFinalTime ? now - lastFinalTime : 0
            lastFinalTime = now

            let segment = transcript.trim()

            if (gap >= GAP_PERIOD && accumulatedFinal) {
              // pausa longa → ponto final
              segment = '. ' + capitalize(segment)
            } else if (gap >= GAP_COMMA && accumulatedFinal) {
              // pausa curta → vírgula
              segment = ', ' + segment
            } else if (accumulatedFinal) {
              segment = ' ' + segment
            }

            accumulatedFinal += segment
          } else {
            interimTranscript += transcript
          }
        }

        // melhoria 1: append ao texto pré-existente
        const fullFinal = baseText
          ? `${baseText} ${accumulatedFinal}`.trim()
          : accumulatedFinal.trim()

        if (accumulatedFinal) {
          emitter.emit('plugin-voice-mutate', { id: id.value, result: fullFinal })
        }

        // melhoria 5: exibe interim no DOM sem salvar no store
        if (interimTranscript) {
          ;(emitter.emit as (...a: any[]) => void)('entity-speech-interim', {
            id: id.value,
            base: fullFinal,
            interim: interimTranscript.trim(),
          })
        }
      }

      recognition.onend = () => {
        emitter.emit('plugin-voice-is-listening', false)
        stopIdWatch()
        hooks.project.utils().resetAllVisual()
      }

      recognition.onerror = () => {
        emitter.emit('plugin-voice-is-listening', false)
        stopIdWatch()
        hooks.project.utils().resetAllVisual()
        recognition = null
      }

      recognition.start()
      emitter.emit('plugin-voice-is-listening', true)
    },
    () => {},
  ])

  On.externals().PluginVoiceStop(emitter, [
    () => {
      stop()
      emitter.emit('plugin-voice-is-listening', false)
      stores.ABSOLUTE.tools.speechRecognition = false
    },
    () => {},
  ])
}

const capitalize = (s: string): string =>
  s.length === 0 ? s : s[0].toUpperCase() + s.slice(1)
