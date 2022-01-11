import { useToast } from 'vue-toastification'
import { Dropbox as DBX, DropboxResponse, DropboxResponseError } from 'dropbox'
import { useEnv } from '@/use/env'
import { useAuthStore } from '@/store/auth'
import { useAbsoluteStore } from '@/store/absolute'
import { useProject } from '../project'
import { ProjectObject } from 'better-write-types'
import { useStorage } from './storage'
import { useNProgress } from '@vueuse/integrations'
import { useI18n } from 'vue-i18n'
import { usePlugin } from 'better-write-plugin-core'

export const useDropbox = () => {
  const AUTH = useAuthStore()
  const ABSOLUTE = useAbsoluteStore()

  const toast = useToast()
  const storage = useStorage()
  const plugin = usePlugin()
  const project = useProject()
  const { isLoading } = useNProgress()
  const { t } = useI18n()

  const loadContext = async (context: ProjectObject) => {
    if (!context) return

    project.onLoadProject(context)
  }

  const save = () => {
    if (!AUTH.dropbox.accessToken) {
      return
    }

    if (!confirm(t('editor.window.saveDropbox'))) return

    const dbx = new DBX({
      accessToken: AUTH.dropbox.accessToken,
    })

    const path = `/${project.utils().exportName('bw')}`

    toast.info(t('toast.generics.load'))

    storage.normalize().then(() => {
      isLoading.value = true

      dbx
        .filesUpload({
          path,
          contents: JSON.stringify(storage.getProjectObject()),
          mode: {
            '.tag': 'overwrite',
          },
        })
        .then(() => {
          toast.success(t('toast.dropbox.save'))
          plugin.emit('plugin-dropbox-save', 'success')
        })
        .catch(() => {
          toast.error(t('toast.project.error'))
          plugin.emit('plugin-dropbox-save', 'error')
        })
        .finally(() => {
          isLoading.value = false
        })
    })
  }

  const load = async () => {
    if (!AUTH.dropbox.accessToken) {
      return
    }

    const options = {
      success: function (files: Array<any>) {
        const file = files[0]

        toast.info(t('toast.generics.load'))

        const dbx = new DBX({
          accessToken: AUTH.dropbox.accessToken as string,
        })

        isLoading.value = true

        dbx
          .filesDownload({ path: file.id })
          .then(async (data: DropboxResponse<any>) => {
            let context = storage.support(
              JSON.parse(await data.result.fileBlob.text())
            )

            ABSOLUTE.aside = true

            storage.normalize().then(() => {
              loadContext(context)
            })
          })
          .catch((err: DropboxResponseError<any>) => {
            toast.error(t('toast.project.error'))
          })
          .finally(() => {
            isLoading.value = false
          })
      },

      cancel: function () {},
      linkType: 'preview',
      multiselect: false,
      extensions: ['.bw'],
      folderselect: false,
    }

    Dropbox.choose(options)
  }

  const connect = () => {
    window.open(
      `https://www.dropbox.com/oauth2/authorize?client_id=${useEnv().dropboxKey()}&response_type=token&redirect_uri=${useEnv().getCorrectLocalUrl()}&scope=account_info.read files.metadata.write files.metadata.read files.content.write files.content.read`,
      '_self'
    )
  }

  return { load, save, connect }
}
