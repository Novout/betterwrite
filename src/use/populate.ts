import isElectron from 'is-electron'
import { ProjectState } from '../types/project'
import { useText } from './text'
import { useEnv } from './env'
import { useFormat } from './format'
import { useDefines } from './defines'
import { PDFStateStyles } from '../types/pdf'

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
                raw: debug().names().paragraph(),
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
                raw: debug().names().paragraph(),
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

  const debug = () => {
    const names = () => {
      const paragraph = () => {
        return 'Vivamus ac facilisis nisl. Nam a nulla convallis, euismod libero a, rutrum purus. Mauris luctus maximus diam, et ornare dolor luctus vel. Nam mi sem, venenatis sed elementum et, tempor id orci. Duis eget erat a eros scelerisque faucibus. Sed scelerisque pharetra justo id placerat. Mauris sit amet est eget felis iaculis dictum. In hac habitasse platea dictumst. Aenean nibh ipsum, faucibus nec pulvinar sed, euismod gravida metus. Vivamus quis nisl in nisl aliquet aliquam. Vestibulum quis tortor feugiat, faucibus ante quis, rutrum nulla. Donec congue ornare luctus.'
      }

      return { paragraph }
    }

    return { names }
  }

  const pdf = () => {
    const styles = (): PDFStateStyles => {
      return {
        base: {
          summary: {
            type: 'default',
            fontFamily: useDefines().pdf().fontFamily()[1],
            fontSize: 20,
          },
          background: {
            data: '' as string,
            main: '' as string,
          },
          pageSize: useDefines().pdf().base().pageSize()[0] as string,
          pageOrientation: useDefines()
            .pdf()
            .base()
            .pageOrientation()[0] as string,
          pageMargins: {
            left: useDefines().pdf().base().pageMargins()[0] as number,
            top: useDefines().pdf().base().pageMargins()[1] as number,
            right: useDefines().pdf().base().pageMargins()[2] as number,
            bottom: useDefines().pdf().base().pageMargins()[3] as number,
          },
          header: {
            start: 3,
            content: 'Content here',
            alignment: 'center',
            textSize: 9,
            textType: 'simple',
            fontFamily: useDefines().pdf().fontFamily()[1],
          },
          footer: {
            start: 3,
            alignment: 'default',
            textSize: 9,
            textType: 'simple',
            fontFamily: useDefines().pdf().fontFamily()[1],
          },
        },
        paragraph: {
          font: useDefines().pdf().fontFamily()[1] as string,
          fontSize: 12 as number,
          lineHeight: 1 as number,
          alignment: useDefines().pdf().alignment()[3] as
            | 'left'
            | 'center'
            | 'right'
            | 'justify',
          indent: 3 as number,
          characterSpacing: 0 as number,
          color: '#000000' as string,
          background: '#ffffff' as string,
          markerColor: '' as string,
          decoration: useDefines().pdf().decoration()[0] as
            | 'underline'
            | 'lineThrough'
            | 'overline'
            | undefined,
          decorationStyle: useDefines().pdf().decorationStyle()[0] as
            | 'dashed'
            | 'dotted'
            | 'double'
            | undefined,
          decorationColor: '' as string,
          margin: {
            top: 0 as number,
            bottom: 0 as number,
          },
        },
        headingOne: {
          font: useDefines().pdf().fontFamily()[0] as string,
          fontSize: 26 as number,
          lineHeight: 1 as number,
          bold: true as boolean,
          italics: false as boolean,
          alignment: useDefines().pdf().alignment()[1] as
            | 'left'
            | 'center'
            | 'right'
            | 'justify',
          characterSpacing: 0 as number,
          color: '#000000' as string,
          background: '#ffffff' as string,
          markerColor: '' as string,
          decoration: useDefines().pdf().decoration()[0] as
            | 'underline'
            | 'lineThrough'
            | 'overline'
            | undefined,
          decorationStyle: useDefines().pdf().decorationStyle()[0] as
            | 'dashed'
            | 'dotted'
            | 'double'
            | 'wavy',
          decorationColor: '' as string,
          breakPage: true as boolean,
          margin: {
            top: 45 as number,
            bottom: 45 as number,
          },
        },
        headingTwo: {
          font: useDefines().pdf().fontFamily()[0] as string,
          fontSize: 22 as number,
          lineHeight: 1 as number,
          bold: true as boolean,
          italics: false as boolean,
          alignment: useDefines().pdf().alignment()[1] as
            | 'left'
            | 'center'
            | 'right'
            | 'justify',
          characterSpacing: 0 as number,
          color: '#000000' as string,
          background: '#ffffff' as string,
          markerColor: '' as string,
          decoration: useDefines().pdf().decoration()[0] as
            | 'underline'
            | 'lineThrough'
            | 'overline',
          decorationStyle: useDefines().pdf().decorationStyle()[0] as
            | 'dashed'
            | 'dotted'
            | 'double'
            | 'wavy',
          decorationColor: '' as string,
          breakPage: false as boolean,
          margin: {
            top: 25 as number,
            bottom: 25 as number,
          },
        },
        headingThree: {
          font: useDefines().pdf().fontFamily()[0] as string,
          fontSize: 16 as number,
          lineHeight: 1 as number,
          bold: true as boolean,
          italics: false as boolean,
          alignment: useDefines().pdf().alignment()[1] as
            | 'left'
            | 'center'
            | 'right'
            | 'justify',
          characterSpacing: 0 as number,
          color: '#000000' as string,
          background: '#ffffff' as string,
          markerColor: '' as string,
          decoration: useDefines().pdf().decoration()[0] as
            | 'underline'
            | 'lineThrough'
            | 'overline',
          decorationStyle: useDefines().pdf().decorationStyle()[0] as
            | 'dashed'
            | 'dotted'
            | 'double'
            | 'wavy',
          decorationColor: '' as string,
          breakPage: false as boolean,
          margin: {
            top: 15 as number,
            bottom: 15 as number,
          },
        },
        switcher: {
          cover: false,
          main: false,
          footer: true,
          header: false,
          summary: true,
          encryption: false,
        },
      }
    }

    return { styles }
  }

  return { project, pdf, debug }
}
