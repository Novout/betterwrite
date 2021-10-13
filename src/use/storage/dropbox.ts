import { useStore } from 'vuex'
import { nextTick } from 'vue'
import { useToast } from 'vue-toastification'
import { Dropbox as DBX, DropboxResponse, DropboxResponseError } from 'dropbox'
import { useEnv } from '@/use/env'
import i18n from '@/lang'

export const useDropbox = () => {
  const toast = useToast()
  const store = useStore()
  const { t } = i18n.global

  const loadContext = async (context: any) => {
    if (!context) return

    store.commit('project/load', context.project)
    await nextTick

    store.commit('context/load', store.state.project.pages[0])
    await nextTick

    store.commit('logger/load', context.logger.content)
    store.commit('pdf/load', context.pdf)

    toast.success(t('toast.project.load'))
  }

  const save = () => {
    if (!store.state.auth.dropbox.accessToken) {
      return
    }

    const obj = {
      project: store.state.project,
      editor: store.state.editor,
      logger: store.state.logger,
      pdf: {
        styles: store.state.pdf.styles,
        fonts: [],
        normalize: {},
      },
    }

    const dbx = new DBX({
      accessToken: store.state.auth.dropbox.accessToken,
    })

    const path = `/${store.state.project.name}.bw`

    toast.info(t('toast.generics.load'))

    dbx
      .filesUpload({
        path,
        contents: JSON.stringify(obj),
      })
      .then(() => {
        toast.success(t('toast.project.save'))
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
              })
              .catch(() => {
                toast.error(t('toast.project.error'))
              })
          })
          .catch(() => {
            toast.error(t('toast.project.error'))
          })
      })
  }

  const load = async () => {
    if (!store.state.auth.dropbox.accessToken) {
      return
    }

    const options = {
      success: function (files: Array<any>) {
        const file = files[0]

        toast.info(t('toast.generics.load'))

        const dbx = new DBX({
          accessToken: store.state.auth.dropbox.accessToken,
        })
        dbx
          .filesDownload({ path: file.id })
          .then(async (data: DropboxResponse<any>) => {
            const context = JSON.parse(await data.result.fileBlob.text())

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
