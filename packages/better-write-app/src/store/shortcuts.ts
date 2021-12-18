import { ShortcutsState } from 'better-write-types'
import { defineStore } from 'pinia'
import { useDefines } from '../use/defines'

export const useShortcutsStore = defineStore('shortcuts', {
  state: (): ShortcutsState => {
    return {
      localSaveProject: useDefines().shortcuts(
        'localSaveProject'
      ) as Array<string>,
      localLoadProject: useDefines().shortcuts(
        'localLoadProject'
      ) as Array<string>,
      newProject: useDefines().shortcuts('newProject') as Array<string>,
      newChapter: useDefines().shortcuts('newChapter') as Array<string>,
      deleteChapter: useDefines().shortcuts('deleteChapter') as Array<string>,
      generatePDF: useDefines().shortcuts('generatePDF') as Array<string>,
      switcherRawText: useDefines().shortcuts(
        'switcherRawText'
      ) as Array<string>,
      finderRawText: useDefines().shortcuts('finderRawText') as Array<string>,
      logger: useDefines().shortcuts('logger') as Array<string>,
      previewPDF: useDefines().shortcuts('previewPDF') as Array<string>,
      configurationPDF: useDefines().shortcuts(
        'configurationPDF'
      ) as Array<string>,
    }
  },
})
