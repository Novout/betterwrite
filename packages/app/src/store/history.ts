import type { HistoryState, HistoryStateBarItem, ID } from 'better-write-types'
import { defineStore } from 'pinia'
import { useProjectStore } from './project'

export const useHistoryStore = defineStore('history', {
  state: (): HistoryState => {
    return {
      stack: [],
      bar: [],
      barActive: undefined,
    }
  },
  actions: {
    updateScroll() {
      const id = this.barActive

      if (id) {
        const prev = this.bar.find(({ id }) => id === id)

        if (prev) {
          const index = this.bar.indexOf(prev)

          const value =
            document.querySelector('#entity-main')?.scrollTop ||
            document.querySelector('#bw-wysiwyg')?.scrollTop

          if (value === undefined) return

          this.bar[index].scrollHeight = value || 0
        }
      }
    },
    addBar(item: HistoryStateBarItem) {
      const PROJECT = useProjectStore()

      const exists = this.bar.some(
        ({ id, type }) => item.id === id && type === item.type,
      )

      this.updateScroll()

      this.barActive = item.id

      if (exists) return

      if (
        (PROJECT.type === 'only-annotations' && item.type === 'annotations') ||
        PROJECT.type === 'creative'
      ) {
        this.bar.unshift(item)

        if (this.bar.length > 12) this.bar.pop()
      }
    },
    updateItemName(name: string, id: ID<string>) {
      const index = this.bar.findIndex((item) => item.id === id)

      if (index === -1) return

      if (this.bar && this.bar[index]) this.bar[index].name = name
    },
    deleteBar(item: HistoryStateBarItem) {
      this.bar = this.bar.filter(({ id }) => item.id !== id) ?? []

      if (item.id === this.barActive) this.barActive = undefined
    },
  },
})
