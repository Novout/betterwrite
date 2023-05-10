<template>
  <EditorEntityDefaultContainer :entity="props.entity">
    <div ref="main" class="border border-theme-border-1 shadow-lg">
      <div
        class="px-6 p-3 gap-2 flex flex-wrap items-center gap-0.5 children:align-middle children:my-auto shadow"
      >
        <IconUndo ref="lUndo" class="wb-drau-icon" @click="undo" />
        <IconRedo ref="lRedo" class="wb-drau-icon" @click="redo()" />
        <IconTrash ref="lClear" class="wb-drau-icon" @click="clear()" />
        <EditorEntityDefaultDrauDiviser />
        <IconWriteStylus
          ref="lStylus"
          :class="[
            drauu?.mode === 'stylus' ? 'wb-drau-icon-active' : 'wb-drau-icon',
          ]"
          @click.prevent.stop="onBrushModeChoice('stylus')"
        />
        <IconPencilCreative
          ref="lDraw"
          :class="[
            drauu?.mode === 'draw' ? 'wb-drau-icon-active' : 'wb-drau-icon',
          ]"
          @click.prevent.stop="onBrushModeChoice('draw')"
        />

        <IconEraser
          ref="lStylus"
          :class="[
            drauu?.mode === 'eraseLine'
              ? 'wb-drau-icon-active'
              : 'wb-drau-icon',
          ]"
          @click.prevent.stop="onBrushModeChoice('eraseLine')"
        />
        <EditorEntityDefaultDrauDiviser />
        <IconLine
          ref="lLine"
          :class="[
            drauu?.mode === 'line' && !brush.arrowEnd
              ? 'wb-drau-icon-active'
              : 'wb-drau-icon',
          ]"
          @click.prevent.stop="onBrushModeChoice('line')"
        />
        <IconArrowRight
          ref="lArrow"
          :class="[
            drauu?.mode === 'line' && brush.arrowEnd
              ? 'wb-drau-icon-active'
              : 'wb-drau-icon',
          ]"
          @click.prevent.stop="onBrushModeChoice('line', true)"
        />
        <IconRectangle
          ref="lRect"
          :class="[
            drauu?.mode === 'rectangle'
              ? 'wb-drau-icon-active'
              : 'wb-drau-icon',
          ]"
          @click.prevent.stop="onBrushModeChoice('rectangle')"
        />
        <IconEllipse
          ref="lEllipse"
          :class="[
            drauu?.mode === 'ellipse' ? 'wb-drau-icon-active' : 'wb-drau-icon',
          ]"
          @click.prevent.stop="onBrushModeChoice('ellipse')"
        />
        <EditorEntityDefaultDrauDiviser />
        <InputColorPicker v-model="lColor" />
        <EditorEntityDefaultDrauDiviser />
        <input
          ref="lInput"
          type="range"
          min="1"
          max="10"
          value="4"
          step="0.5"
          name="Size"
          title="Size"
          @input="onInputRange"
        />
        <EditorEntityDefaultDrauDiviser />
        <IconSolid
          ref="lSolid"
          class="wb-drau-icon"
          aria-label="Solid"
          :class="[
            brush.dasharray === undefined
              ? 'wb-drau-icon-active'
              : 'wb-drau-icon',
          ]"
          @click.prevent.stop="onStyleModeChoice('solid')"
        />
        <IconDashed
          ref="lDashed"
          :class="[
            brush.dasharray === '4' ? 'wb-drau-icon-active' : 'wb-drau-icon',
          ]"
          @click.prevent.stop="onStyleModeChoice('dashed')"
        />
        <IconDotted
          ref="lDotted"
          :class="[
            brush.dasharray === '1 7' ? 'wb-drau-icon-active' : 'wb-drau-icon',
          ]"
          @click.prevent.stop="onStyleModeChoice('dotted')"
        />
        <EditorEntityDefaultDrauDiviser />
        <IconImageConvert
          ref="lDownload"
          class="wb-drau-icon"
          @click.prevent.stop="onCreateSvg"
        />
      </div>
      <div style="touch-action: none">
        <svg ref="drau" class="w-full min-h-64 flex-auto z-10"></svg>
      </div>
    </div>
  </EditorEntityDefaultContainer>
</template>

<script setup lang="ts">
  import { useEnv } from '@/use/env'
  import { useCycle } from '@/use/cycle'
  import { useUtils } from '@/use/utils'
  import { useDrauu } from '@vueuse/integrations/useDrauu'
  import { Entity } from 'better-write-types'
  import { DrawingMode } from 'drauu'
  import { saveAs } from 'file-saver'
  import { onMounted, ref, watch } from 'vue'

  const props = defineProps<{
    entity: Entity
  }>()

  const env = useEnv()
  const cycle = useCycle()
  const utils = useUtils()

  const main = ref()
  const drau = ref<SVGElement | null>()

  const lColor = ref<string>('#000')
  const lUndo = ref()
  const lRedo = ref()
  const lClear = ref()
  const lDownload = ref()
  const lInput = ref()

  const {
    undo,
    redo,
    clear,
    brush,
    drauuInstance: drauu,
    load,
    onEnd,
  } = useDrauu(drau, {
    brush: {
      color: 'black',
      size: 3,
    },
    acceptsInputTypes: ['mouse', 'pen', 'touch'],
  })

  onMounted(() => {
    if (props.entity.raw !== env.emptyLine()) {
      cycle.awaitedOnMounted(() => {
        // TODO: improve local.onLoadProject deserialize for correct onMounted access ref's
        // branch for workaround in async svg+xml render
        if(drauu.value?.el?.innerHTML) clear()

        load(props.entity.raw)
      })
    }
  })

  onEnd(async () => {
    const width = drauu.value!.el!.clientWidth
    const height = drauu.value!.el!.clientHeight

    drauu.value!.el!.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    drauu.value!.el!.setAttribute('viewBox', `0 0 ${width} ${height}`)

    const normalize = drauu.value!.el!.outerHTML.replace(
      utils.regex().classTag(),
      ''
    )

    props.entity.external!.image!.size!.width = width
    props.entity.external!.image!.size!.height = height

    props.entity.raw = normalize || ''

    await cycle.update()
  })

  watch(lColor, (color) => {
    drauu.value!.brush.color = color
  })

  const onBrushModeChoice = (mode: DrawingMode, arrow = false) => {
    brush.value.arrowEnd = arrow
    drauu.value!.mode = mode
  }

  const setColor = () => {
    brush.value.color = lColor.value
  }

  const onStyleModeChoice = (mode: 'solid' | 'dotted' | 'dashed') => {
    switch (mode) {
      case 'solid':
        brush.value.dasharray = undefined
        setColor()
        break
      case 'dashed':
        brush.value.dasharray = '4'
        setColor()
        break
      case 'dotted':
        brush.value.dasharray = '1 7'
        setColor()
        break
      default:
        brush.value.dasharray = undefined
        setColor()
    }
  }

  const onInputRange = () => {
    brush.value.size = +lInput.value.value

    setColor()
  }

  const onCreateSvg = () => {
    drauu.value!.el!.setAttribute('xmlns', 'http://www.w3.org/2000/svg')

    const data = drauu.value!.el!.outerHTML || ''
    const blob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' })

    saveAs(blob, 'image.svg')
  }
</script>
