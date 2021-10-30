import { nextTick } from 'vue'
import { useToast } from 'vue-toastification'
import { Dropbox as DBX, DropboxResponse, DropboxResponseError } from 'dropbox'
import { useEnv } from '@/use/env'
import { useProjectStore } from '@/store/project'
import { useEditorStore } from '@/store/editor'
import { useLoggerStore } from '@/store/logger'
import { usePDFStore } from '@/store/pdf'
import { useContextStore } from '@/store/context'
import i18n from '@/lang'
import { useAuthStore } from '@/store/auth'
import useEmitter from '@/use/emitter'
import isElectron from 'is-electron'
import { useAbsoluteStore } from '@/store/absolute'
import usePlugin from '../plugin/core'
import { useProject } from '../project'
import { ProjectObject } from '../../types/project'

export const useDropbox = () => {
  const CONTEXT = useContextStore()
  const PROJECT = useProjectStore()
  const EDITOR = useEditorStore()
  const AUTH = useAuthStore()
  const LOGGER = useLoggerStore()
  const PDF = usePDFStore()
  const ABSOLUTE = useAbsoluteStore()

  const toast = useToast()
  const emitter = useEmitter()
  const env = useEnv()
  const plugin = usePlugin()
  const project = useProject()
  const { t } = i18n.global

  const loadContext = async (context: ProjectObject) => {
    if (!context) return

    project.onLoadProject(context)
  }

  const save = async () => {
    if (!AUTH.dropbox.accessToken) {
      return
    }

    emitter.emit('entity-close', { all: true })
    await nextTick

    const obj = {
      project: PROJECT.$state,
      editor: EDITOR.$state,
      logger: LOGGER.$state,
      pdf: {
        styles: PDF.styles,
        fonts: [],
        normalize: {},
      },
    }

    const dbx = new DBX({
      accessToken: AUTH.dropbox.accessToken,
    })

    const path = `/${PROJECT.name}.bw`

    toast.info(t('toast.generics.load'))

    dbx
      .filesUpload({
        path,
        contents: JSON.stringify(obj),
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
                contents: JSON.stringify(obj),
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
            const context = JSON.parse(await data.result.fileBlob.text())
            // <= v0.3.10
            if (context.project?.pages[0]?.entity) {
              context.project?.pages.forEach((target: any) => {
                target['entities'] = target['entity']
                delete target['entity']
              })
            }

            // <= 0.4.0
            if (!context.project.bw) {
              context.project.bw = {
                platform: isElectron() ? 'desktop' : 'web',
                version: env.packageVersion(),
              }
            }

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
