import { useProjectStore } from '@/store/project'

export const useDev = () => {
  const PROJECT = useProjectStore()

  const cmd = (str: string) => {
    const args = str.toLowerCase().split(' ')

    // purge all unused features (for legacy projects debug)
    if (args[0] === 'entity' && args[1] === 'purge') {
      PROJECT.chapters.forEach((page) => {
        page.entities.forEach((entity) => {
          // @ts-ignore
          if (entity.external?.paragraph?.generator) {
            delete entity.external.paragraph['generator']
          }
        })
      })
    }
  }

  return { cmd }
}
