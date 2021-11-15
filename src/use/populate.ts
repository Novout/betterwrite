import isElectron from 'is-electron'
import { ProjectState } from '../types/project'
import { useText } from './text'
import { useEnv } from './env'
import { useFormat } from './format'

export const usePopulate = () => {
  const project = (project: ProjectState): ProjectState => {
    return {
      creative: {
        name: useText().kebab(project.name),
        nameRaw: project.name,
        version: project.version,
        creator: project.creator,
        producer: project.creator,
        keywords: '',
        subject: project.subject,
        type: project.type,
        totalPagesCreated: 1,
        main: {},
        summary: {},
        pageLoaded: 1,
        pages: [
          {
            id: 1,
            entities: [
              {
                type: 'heading-one',
                raw: project.name,
                createdAt: useFormat().actually(),
                updatedAt: useFormat().actually(),
              },
              {
                type: 'paragraph',
                raw: project.subject,
                createdAt: useFormat().actually(),
                updatedAt: useFormat().actually(),
              },
            ],
          },
        ],
        bw: {
          platform: isElectron() ? 'desktop' : 'web',
          version: useEnv().packageVersion() as string,
        },
      },
      blank: {
        name: useText().kebab(project.name),
        nameRaw: project.name,
        version: project.version,
        creator: project.creator,
        producer: project.creator,
        keywords: '',
        subject: project.subject,
        type: project.type,
        totalPagesCreated: 1,
        main: {},
        summary: {},
        pageLoaded: 1,
        pages: [
          {
            id: 1,
            entities: [
              {
                type: 'paragraph',
                raw: project.subject,
                createdAt: useFormat().actually(),
                updatedAt: useFormat().actually(),
              },
            ],
          },
        ],
        bw: {
          platform: isElectron() ? 'desktop' : 'web',
          version: useEnv().packageVersion() as string,
        },
      },
    }[project.type] as ProjectState
  }

  return { project }
}
