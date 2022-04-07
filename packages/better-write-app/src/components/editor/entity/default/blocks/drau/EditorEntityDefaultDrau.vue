<template>
  <EditorEntityDefaultContainer :entity="props.entity">
    <div class="border border-theme-border-1 shadow-lg">
      <div
        class="px-6 p-3 gap-2 flex flex-wrap items-center gap-0.5 children:align-middle children:my-auto shadow"
      >
        <HeroIcon
          ref="lUndo"
          class="wb-drau-icon"
          aria-label="Undo"
          title="Undo"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="iconify iconify--dashicons"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              d="M12 5H7V2L1 6l6 4V7h5c2.2 0 4 1.8 4 4s-1.8 4-4 4H7v2h5c3.3 0 6-2.7 6-6s-2.7-6-6-6z"
              class="st0"
            ></path></svg
        ></HeroIcon>
        <HeroIcon
          ref="lRedo"
          class="wb-drau-icon"
          aria-label="Redo"
          title="Redo"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              d="M8 5h5V2l6 4l-6 4V7H8c-2.2 0-4 1.8-4 4s1.8 4 4 4h5v2H8c-3.3 0-6-2.7-6-6s2.7-6 6-6z"
              class="st0"
            ></path></svg
        ></HeroIcon>
        <IconTrash
          ref="lClear"
          class="wb-drau-icon"
          aria-label="Clear"
          title="Clear"
        />
        <EditorEntityDefaultDrauDiviser />
        <IconWriteStylus
          ref="lStylus"
          class="wb-drau-icon"
          aria-label="Stylus"
          title="Stylus"
          @click.prevent.stop="onBrushModeChoice('stylus')"
        />
        <IconPencilCreative
          ref="lDraw"
          class="wb-drau-icon"
          aria-label="Draw"
          title="Draw"
          @click.prevent.stop="onBrushModeChoice('draw')"
        />

        <IconEraser
          v-if="env.isDev()"
          ref="lStylus"
          class="wb-drau-icon"
          aria-label="Stylus"
          title="Stylus"
          @click.prevent.stop="onBrushModeChoice('eraseLine')"
        />
        <EditorEntityDefaultDrauDiviser />
        <IconLine
          ref="lLine"
          class="wb-drau-icon"
          aria-label="Line"
          title="Line"
          @click.prevent.stop="onBrushModeChoice('line')"
        />
        <IconArrowRight
          ref="lArrow"
          class="wb-drau-icon"
          aria-label="Arrow"
          title="Arrow"
          @click.prevent.stop="onBrushModeChoice('line', true)"
        />
        <IconRectangle
          ref="lRect"
          class="wb-drau-icon"
          aria-label="Rect"
          title="Rect"
          @click.prevent.stop="onBrushModeChoice('rectangle')"
        />
        <IconEllipse
          ref="lEllipse"
          class="wb-drau-icon"
          aria-label="Ellipse"
          title="Ellipse"
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
        />
        <EditorEntityDefaultDrauDiviser />
        <button
          ref="lSolid"
          class="wb-drau-icon"
          aria-label="Solid"
          @click.prevent.stop="onStyleModeChoice('solid')"
        >
          —
        </button>
        <button
          ref="lDashed"
          class="wb-drau-icon"
          aria-label="Dashed"
          @click.prevent.stop="onStyleModeChoice('dashed')"
        >
          ┅
        </button>
        <button
          ref="lDotted"
          class="wb-drau-icon"
          aria-label="Dotted"
          @click.prevent.stop="onStyleModeChoice('dotted')"
        >
          ⋯
        </button>
        <EditorEntityDefaultDrauDiviser />
        <IconImageToBlock
          ref="lBlock"
          class="wb-drau-icon"
          title="Download"
          @click.prevent.stop="onCreateImageBlock"
        />
        <IconImageConvert
          ref="lDownload"
          class="wb-drau-icon ml-2"
          title="Download"
          @click.prevent.stop="onCreateSvg"
        />
      </div>
      <svg
        id="svg"
        ref="drau"
        class="w-full min-h-64 flex-auto z-10"
        style="touch-action: none"
      ></svg>
    </div>
  </EditorEntityDefaultContainer>
</template>

<script setup lang="ts">
  import { useEnv } from '@/use/env'
  import { useUtils } from '@/use/utils'
  import { useEventListener } from '@vueuse/core'
  import { useDrauu } from '@vueuse/integrations/useDrauu'
  import { Entity } from 'better-write-types'
  import { DrawingMode } from 'drauu'
  import { saveAs } from 'file-saver'
  import { ref, watch } from 'vue'

  const props = defineProps<{
    entity: Entity
  }>()

  const env = useEnv()
  const utils = useUtils()

  const drau = ref()
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
  } = useDrauu(drau, {
    brush: {
      color: 'black',
      size: 3,
    },
    acceptsInputTypes: ['mouse', 'pen', 'touch'],
  })

  useEventListener(lUndo, 'click', () => {
    undo()
  })

  useEventListener(lRedo, 'click', () => {
    redo()
  })

  useEventListener(lClear, 'click', () => {
    clear()
  })

  useEventListener(lInput, 'input', () => {
    brush.value.size = +lInput.value.value

    setColor()
  })

  watch(lColor, (color) => {
    drauu.value!.brush.color = color
  })

  const onBrushModeChoice = (
    mode: DrawingMode | 'eraseLine',
    arrow = false
  ) => {
    brush.value.arrowEnd = arrow
    drauu.value!.mode = mode as any
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

  const onCreateSvg = () => {
    drauu.value!.el!.setAttribute('xmlns', 'http://www.w3.org/2000/svg')

    const data = drauu.value!.el!.outerHTML || ''
    const blob = new Blob([data], { type: 'image/svg+xml' })

    saveAs(blob, 'image.svg')
  }

  const onCreateImageBlock = () => {
    drauu.value!.el!.setAttribute('xmlns', 'http://www.w3.org/2000/svg')

    const data = drauu.value!.el!.outerHTML || ''
    const blob = new Blob([data], { type: 'image/svg+xml' })

    utils
      .convert()
      .blobToBase64(blob)
      .then((base64) => {
        console.log(base64)
      })
  }
</script>

<style scoped>
  div > button {
    margin: 0 0.25rem;
  }
</style>
