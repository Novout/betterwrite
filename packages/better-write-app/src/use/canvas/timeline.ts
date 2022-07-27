import { useProjectStore } from '@/store/project'
import { ID } from 'better-write-types'
import Konva from 'konva'
import { onBeforeUnmount, ref } from 'vue'
import { useUtils } from '../utils'

export type TimelineRow = [Konva.Layer, Konva.Rect]

export const useCanvasTimeline = () => {
  const PROJECT = useProjectStore()

  const utils = useUtils()

  const stage = ref<Konva.Stage | null>(null)
  const rows = ref<TimelineRow[]>([])
  const groups = ref<Konva.Group[]>([])
  const transformers = ref<Konva.Transformer[]>([])

  onBeforeUnmount(() => {
    stage.value = null
    rows.value = []
    groups.value = []
    transformers.value = []
  })

  const base = () => {
    const reset = () => {
      resetTransformers()
    }

    const resetTransformers = () => {
      transformers.value?.forEach((t) => {
        if (t) t?.enabledAnchors([])
      })
    }

    const textOnEditField = (title: Konva.Text) => {
      title.visible(false)

      const textPosition = title.getAbsolutePosition()

      const stageBox = stage.value?.container().getBoundingClientRect()

      const areaPosition = {
        // @ts-ignore
        x: stageBox.left + textPosition.x,
        // @ts-ignore
        y: stageBox.top + textPosition.y,
      }
      const textarea = document.createElement('textarea')
      document.body.appendChild(textarea)

      textarea.value = title.text()
      textarea.style.overflow = 'none'
      textarea.style.border = 'none'
      textarea.style.resize = 'none'
      textarea.style.position = 'absolute'
      textarea.style.top = areaPosition.y - 5 + 'px'
      textarea.style.left = areaPosition.x + 'px'
      textarea.style.minWidth = title.width() + 'px'
      textarea.className = 'bg-transparent wb-text'

      textarea.focus()

      textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          title.text(textarea.value)
          title.visible(true)
          document.body.removeChild(textarea)
        }
      })
    }

    return { reset, resetTransformers, textOnEditField }
  }

  const load = () => {}

  const start = () => {
    stage.value = new Konva.Stage({
      container: 'bw-timeline',
      width: 1000,
      height: 800,
      draggable: true,
    })
    const background = new Konva.Rect({
      x: 0,
      y: 0,
      width: 1000,
      height: 800,
      fill: 'rgba(0, 0, 0, 0.2)',
    })
    const layer = new Konva.Layer()
    layer.add(background)
    stage.value?.add(layer)
    stage.value?.on('dragmove', () => {
      document.body.style.cursor = 'grabbing'
    })
    stage.value?.on('dragend', () => {
      document.body.style.cursor = 'default'
    })
    background.on('click', ({ evt }) => {
      const uuid = utils.id().uuidv4()

      const row = factory().row({
        id: uuid,
        pos: 0,
        title: 'Guest',
        context: {
          x: 0,
          y: evt.offsetY - 50,
          width: background.width(),
          height: 100,
        },
        layer,
      })

      rows.value.push(row)
      factory().group(row, { id: uuid, title: 'Guest', layer })
    })
  }

  const factory = () => {
    const row = (options: {
      id: ID<any>
      pos: number
      title: string
      context?: {
        x: number
        y: number
        width: number
        height: number
      }
      layer: Konva.Layer
    }): TimelineRow => {
      const container = new Konva.Group({
        draggable: true,
      })
      container.on('dragmove', () => {
        container.x(0)
      })
      const background = new Konva.Rect({
        id: `row-${options.id}`,
        x: options.context?.x || 0,
        y: options.context?.y || options.pos * 120,
        width: options.context?.width || 800,
        height: options.context?.height || 100,
        fill: 'rgba(0, 0, 0, 0.2)',
        shadowBlur: 5,
      })
      const title = new Konva.Text({
        x: 10,
        y: options.context!.y + 5 || options.pos * 120,
        text: options.title,
        fontSize: 18,
        fontFamily: 'Raleway',
        fill: 'rgba(255, 255, 255, 0.25)',
      })
      title.on('dblclick dbltap', () => {
        base().textOnEditField(title)
      })
      title.on('mouseover', () => {
        document.body.style.cursor = 'text'
      })
      title.on('mouseout', () => {
        document.body.style.cursor = 'default'
      })

      background.on('click', ({ evt }) => {
        base().reset()

        factory().group(row, {
          id: options.id,
          title: 'Guest',
          context: {
            x: (evt.offsetX - 50) / 2,
            width: 100,
          },
          layer: options.layer,
        })
      })
      background.on('contextmenu', ({ evt }) => {
        evt.preventDefault()
        evt.stopPropagation()

        base().reset()

        document.body.style.cursor = 'default'

        container.destroyChildren()
        container.destroy()
      })

      container.add(background)
      container.add(title)

      options.layer.add(container)

      const row = [container, background] as TimelineRow

      return row
    }

    const group = (
      [container, background]: TimelineRow,
      options: {
        id: ID<any>
        title?: string
        color?: string
        context?: {
          x: number
          width: number
        }
        createdByClick?: boolean
        layer: Konva.Layer
      }
    ) => {
      const centerY = (background.y() + background.height() / 2) / 2
      // const centerX = background.x() + (background.width() / 2)

      const color = options.color || utils.text().randomColor()

      const group = new Konva.Group({
        id: `bar-${options.id}`,
        x: options.context?.x || 10,
        y: centerY,
        width: options.context?.width || background.width() / 2,
        height: 15,
        draggable: true,
      })
      const bg = new Konva.Rect({
        id: `bg-bar-${options.id}`,
        x: options.context?.x || 10,
        y: centerY,
        width: options.context?.width || background.width() / 2,
        height: 15,
        fill: color,
        shadowBlur: 1,
        cornerRadius: 2,
      })
      group.add(bg)
      container.add(group)

      const centergroupY = group.y() + (group.height() / 2 - 7.5)
      const centergroupX = group.x() + 10

      group.on('click', () => {
        tr?.enabledAnchors(['middle-right', 'middle-left'])
      })
      group.on('mouseover', () => {
        document.body.style.cursor = 'pointer'
      })
      group.on('mouseout', () => {
        document.body.style.cursor = 'default'
      })
      group.on('dragmove', () => {
        group.y(centerY)

        if (background.x() >= group.x()) group.x(0)
        if (background.x() + background.width() - group.width() <= group.x())
          group.x(background.x() + background.width() - group.width())
      })
      group.on('contextmenu', ({ evt }) => {
        evt.preventDefault()
        evt.stopPropagation()

        base().reset()

        document.body.style.cursor = 'default'

        tr?.enabledAnchors([])
        group.destroy()
      })
      groups.value.push(group)

      const tr = new Konva.Transformer({
        id: `bg-bar-tr-${options.id}`,
        nodes: [bg],
        rotateEnabled: false,
        borderEnabled: false,
        flipEnabled: false,
        enabledAnchors: [],
        anchorFill: color,
        anchorStroke: '#FFF',
      })
      container.add(tr)
      // transformers.value.push(tr)

      if (options.title) {
        const title = new Konva.Text({
          id: `bg-bar-title-${options.id}`,
          x: centergroupX,
          y: centergroupY,
          text: options.title,
          fontSize: 16,
          fontFamily: 'Poppins',
          fill: 'black',
        })
        title.on('dblclick dbltap', () => {
          base().textOnEditField(title)
        })
        tr.on('transform', () => {
          title.x(bg.x() + 10)
        })
        title.on('mouseover', () => {
          document.body.style.cursor = 'text'
        })
        title.on('mouseout', () => {
          document.body.style.cursor = 'default'
        })

        group.add(title)
      }
    }

    return { row, group }
  }

  const externals = () => {
    const load = () => {
      PROJECT.base = 'timeline'
    }

    return { load }
  }

  return { start, stage, rows, factory, externals }
}
