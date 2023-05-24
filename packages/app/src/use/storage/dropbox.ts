import { useToast } from 'vue-toastification'
import { Dropbox as DBX, DropboxAuth, DropboxResponse, DropboxResponseError, files } from 'dropbox'
import { useEnv } from '@/use/env'
import { useAuthStore } from '@/store/auth'
import { useProject } from '../project'
import { useStorage } from './storage'
import { useI18n } from 'vue-i18n'
import { usePlugin } from 'better-write-plugin-core'
import { readBW, writeBW } from 'better-write-extension'
import { useVaultStore } from '@/store/vault'

export const useDropbox = () => {
  const AUTH = useAuthStore()
  const VAULT = useVaultStore()

  const toast = useToast()
  const storage = useStorage()
  const plugin = usePlugin()
  const project = useProject()
  const { t } = useI18n()
  const env = useEnv()

  const save = () => {
    if (!AUTH.account.dropboxAccessToken) {
      return
    }

    const dbx = new DBX({
      clientId: env.dropboxKey(),
      accessToken: AUTH.account.dropboxAccessToken,
    })

    const path = `/${project.utils().exportFullName('bw')}`

    toast.info(t('toast.generics.load'))

    plugin.emit('plugin-progress-start')

    storage.normalize().then(async () => {
      const payload = storage.getProjectObject()
      payload.project.externalProvider = 'dropbox'

      const obj = JSON.stringify(payload)
      const zip = await writeBW(obj)

      dbx
        .filesUpload({
          path,
          contents: zip,
          mode: {
            '.tag': 'overwrite',
          },
        })
        .then(({ result }) => {
          if(!VAULT.dropboxFiles.some(({ id }) => id === result.id )) VAULT.dropboxFiles.unshift(result as files.FileMetadataReference)

          toast.success(t('toast.dropbox.save'))
        })
        .catch(() => {
          toast.error(t('toast.project.error'))
        })
        .finally(() => {
          plugin.emit('plugin-progress-end')
        })
    })
  }

  const load = async () => {
    if(!AUTH.account.dropboxAccessToken) {
      return []
    }

    const dbx = new DBX({
      accessToken: AUTH.account.dropboxAccessToken
    })

    plugin.emit('plugin-progress-start')

    const files = await dbx.filesListFolder({ path: '' })

    if(!files || files.result.entries.length === 0) {
      toast.warning(t('toast.dropbox.empty'))

      plugin.emit('plugin-progress-end')

      return []
    }

    // @ts-expect-error
    const targets = (files.result.entries.filter(file => file?.is_downloadable && file?.['.tag'] === 'file') ?? []) as files.FileMetadataReference[]

    VAULT.dropboxFiles.unshift(...targets)

    plugin.emit('plugin-progress-end')

    toast.success(t('toast.generics.successChanged'))
  }

  const loadProject = (file: files.FileMetadataReference) => {
    if(!AUTH.account.dropboxAccessToken) return

    const dbx = new DBX({
      accessToken: AUTH.account.dropboxAccessToken
    })

    plugin.emit('plugin-progress-start')
  
    dbx
      .filesDownload({ path: file.id })
      .then(async (data: DropboxResponse<any>) => {
        const bw = await readBW(data.result.fileBlob as Blob)
        const content = storage.support(bw)

        project.onLoadProject(content)
      })
      .catch(() => {
        toast.error(t('toast.project.error'))
      })
      .finally(() => {
        plugin.emit('plugin-progress-end')
      })
  }

  const deleteProject = (file: files.FileMetadataReference) => {
    if(!AUTH.account.dropboxAccessToken) return

    const dbx = new DBX({
      accessToken: AUTH.account.dropboxAccessToken
    })

    plugin.emit('plugin-progress-start')

    dbx.filesDeleteV2({ path: file.id })
      .then(() => {
        VAULT.dropboxFiles = VAULT.dropboxFiles.filter(({ id }) => id !== file.id)
      })
      .catch((err: DropboxResponseError<any>) => {
        toast.error(t('toast.project.error'))
      })
      .finally(() => {
        plugin.emit('plugin-progress-end')
      })
  }

  const connect = async () => {
    const dbxAuth = new DropboxAuth({
      clientId: env.dropboxKey(),
    })

    const url = await dbxAuth.getAuthenticationUrl(env.getCorrectLocalUrl(), 'dropboxbw', 'code' , 'online', ['account_info.read', 'files.metadata.write', 'files.metadata.read', 'files.content.write', 'files.content.read', 'file_requests.read'], undefined, true)

    localStorage.removeItem('code_verifier')
    localStorage.setItem('code_verifier', dbxAuth.getCodeVerifier())

    window.open(
      url as string,
      '_self'
    )
  }

  return { load, save, connect, loadProject, deleteProject }
}
