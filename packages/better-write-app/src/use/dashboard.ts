import { useProjectStore } from '@/store/project'
import { nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useLocalStorage } from './storage/local'

export const useDashboard = () => {
  const PROJECT = useProjectStore()

  const router = useRouter()
  const local = useLocalStorage()

  const { t } = useI18n()

  const project = () => {
    const n = async (type: string) => {
      PROJECT.create({
        name: t('editor.aside.project.new.content.name'),
        version: t('editor.aside.project.new.content.version'),
        creator: t('editor.aside.project.new.content.creator'),
        subject: t('editor.aside.project.new.content.subject'),
        type,
      } as any)

      await nextTick

      local.onSaveProject(false).then(() => {
        router.push('/')
      })
    }

    return { new: n }
  }

  return { project }
}
