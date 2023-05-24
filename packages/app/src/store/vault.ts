import { ProjectDocument, ProjectObject } from 'better-write-types'
import { files } from 'dropbox'
import { defineStore } from 'pinia'

export const useVaultStore = defineStore('vault', {
  state: (): {
    dropboxFiles: files.FileMetadataReference[]
    documents?: ProjectDocument[]
  } => {
    return {
      dropboxFiles: [],
      documents: undefined,
    }
  },
})
