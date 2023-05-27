import { ProjectDocument } from './project'
import type { files } from 'dropbox'

export interface VaultState {
  dropboxFiles: files.FileMetadataReference[]
  documents?: ProjectDocument[]
}
