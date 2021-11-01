import { nextTick } from 'vue'
import { useToast } from 'vue-toastification'
import { Dropbox as DBX, DropboxResponse, DropboxResponseError } from 'dropbox'
import { useEnv } from '@/use/env'
import { useProjectStore } from '@/store/project'
import i18n from '@/lang'
import { useAuthStore } from '@/store/auth'
import useEmitter from '@/use/emitter'
import { useAbsoluteStore } from '@/store/absolute'
import usePlugin from '../plugin/core'
import { useProject } from '../project'
import { ProjectObject } from '@/types/project'
import { useStorage } from './storage'

export const useDropbox = () => {
  const PROJECT = useProjectStore()
  const AUTH = useAuthStore()
  const ABSOLUTE = useAbsoluteStore()

  const toast = useToast()
  const emitter = useEmitter()
  const storage = useStorage()
  const plugin = usePlugin()
  const project = useProject()
  const { t } = i18n.global

  const loadContext = async (context: ProjectObject) => {
    if (!context) return

    project.onLoadProject(context)
  }

  const save = () => {
    if (!AUTH.dropbox.accessToken) {
      return
    }

    const dbx = new DBX({
      accessToken: AUTH.dropbox.accessToken,
    })

    const path = `/${PROJECT.name}.bw`

    toast.info(t('toast.generics.load'))

    storage.normalize().then(() => {
      dbx
        .filesUpload({
          path,
          contents: JSON.stringify(storage.getProjectObject()),
        })
        .then(() => {
          toast.success(t('toast.project.save'))
          plugin.emit('plugin-dropbox-save', 'success')
        })
        .catch(() => {
          dbx
            .filesDeleteV2({
              path,
            })
            .then(() => {
              dbx
                .filesUpload({
                  path,
                  contents: JSON.stringify(storage.getProjectObject()),
                })
                .then(() => {
                  toast.success(t('toast.project.save'))
                  plugin.emit('plugin-dropbox-save', 'success')
                })
                .catch(() => {
                  toast.error(t('toast.project.error'))
                  plugin.emit('plugin-dropbox-save', 'error')
                })
            })
            .catch(() => {
              toast.error(t('toast.project.error'))
              plugin.emit('plugin-dropbox-save', 'error')
            })
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
        dbx
          .filesDownload({ path: file.id })
          .then(async (data: DropboxResponse<any>) => {
            let context = storage.support(
              JSON.parse(await data.result.fileBlob.text())
            )

            ABSOLUTE.aside = true

            loadContext(context)
          })
          .catch((err: DropboxResponseError<any>) => {
            toast.error(t('toast.project.error'))
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
