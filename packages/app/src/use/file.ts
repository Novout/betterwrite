import { useProjectStore } from '@/store/project'
import { useFileSystemAccess } from '@vueuse/core'
import { destr } from 'destr'
import { saveAs } from 'file-saver'
import { useStorage } from './storage/storage'

export const useFile = () => {
  const PROJECT = useProjectStore()

  const storage = useStorage()

  const i = async ({
    extensions,
  }: {
    extensions: Record<string, string[]>
  }): Promise<Record<any, any>> => {
    return new Promise(async (res, rej) => {
      const system = useFileSystemAccess({
        types: [
          {
            description: 'Better Write',
            accept: {
              ...extensions,
            },
          },
        ],
        excludeAcceptAllOption: true,
      })

      try {
        await system.open()
      } catch (e) {
        rej()

        return
      }

      const data = destr(system.data.value)

      res(data)
    })
  }

  const e = async (target: Record<any, any>, name: string): Promise<void> => {
    await storage.normalize()

    saveAs(
      new Blob([JSON.stringify(target, null, 2)], {
        type: 'application/json;charset=utf-8',
      }),
      PROJECT.name + name,
    )
  }

  return { import: i, export: e }
}
