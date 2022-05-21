import { ProjectState, PDFStateStyles } from 'better-write-types'
import { useEnv } from './env'
import { useFormat } from './format'
import { useDefines } from './defines'
import { useUtils } from './utils'
import { useFactory } from './factory'

export const usePopulate = () => {
  const factory = useFactory()

  const project = (project: ProjectState, title?: string): ProjectState => {
    return {
      creative: {
        name: useUtils().text().kebab(project.name),
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
        scrollLoaded: 0,
        offsetLoaded: 0,
        pages: [
          {
            id: 1,
            title: project.name,
            entities: [
              factory.entity().create('heading-one', title || project.name),
              factory.entity().create('paragraph', ''),
            ],
            createdAt: useFormat().actually(),
            updatedAt: useFormat().actually(),
          },
        ],
        bw: {
          platform: 'web',
          version: useEnv().packageVersion() as string,
        },
        pdf: {
          encryption: {
            userPassword: '',
            ownerPassword: '',
          },
          permissions: {
            printing: 'highResolution',
            modifying: false,
            copying: false,
            annotating: true,
            fillingForms: true,
            contentAccessibility: true,
            documentAssembly: true,
          },
        },
        creative: {
          drafts: [],
        },
        templates: {
          generator: [],
          substitutions: {
            text: useDefines().generator().substitutions().text(),
            italic: useDefines().generator().substitutions().italic(),
            bold: useDefines().generator().substitutions().bold(),
          },
        },
      },
      blank: {
        name: useUtils().text().kebab(project.name),
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
        scrollLoaded: 0,
        offsetLoaded: 0,
        pages: [
          {
            id: 1,
            title: project.name,
            entities: [factory.entity().create('paragraph', '')],
            createdAt: useFormat().actually(),
            updatedAt: useFormat().actually(),
          },
        ],
        bw: {
          platform: 'web',
          version: useEnv().packageVersion() as string,
        },
        pdf: {
          encryption: {
            userPassword: '',
            ownerPassword: '',
          },
          permissions: {
            printing: 'highResolution',
            modifying: false,
            copying: false,
            annotating: true,
            fillingForms: true,
            contentAccessibility: true,
            documentAssembly: true,
          },
        },
        creative: {
          drafts: [],
        },
        templates: {
          generator: [],
          substitutions: {
            text: useDefines().generator().substitutions().text(),
            italic: useDefines().generator().substitutions().italic(),
            bold: useDefines().generator().substitutions().bold(),
          },
        },
      },
    }[project.type] as ProjectState
  }

  const debug = () => {
    const names = () => {
      const paragraph = () => {
        return '- Vivamus ac facilisis nisl.'
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
            type: useDefines().pdf().base().summaryStyle()[0] as any,
            fontFamily: useDefines().pdf().fontFamily()[1],
            fontSize: 20,
          },
          note: {
            text: '',
            bw: true,
          },
          background: {
            color: '#FFFFFF' as string,
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
            content: useDefines().pdf().base().header().content(),
            alignment: useDefines().pdf().base().alignment()[0] as any,
            textSize: 9,
            textType: useDefines().pdf().base().footerStyle()[0] as any,
            fontFamily: useDefines().pdf().fontFamily()[1],
          },
          footer: {
            start: 3,
            alignment: useDefines().pdf().base().alignment()[0] as any,
            textSize: 9,
            textType: useDefines().pdf().base().footerStyle()[0] as any,
            fontFamily: useDefines().pdf().fontFamily()[1],
          },
        },
        paragraph: {
          font: useDefines().pdf().fontFamily()[1] as string,
          fontSize: 12 as number,
          lineHeight: 1 as number,
          alignment: useDefines().pdf().alignment()[0] as
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
          alignment: useDefines().pdf().alignment()[2] as
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
          alignment: useDefines().pdf().alignment()[2] as
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
          alignment: useDefines().pdf().alignment()[2] as
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
        lineBreak: {
          spacing: 10,
          image: {
            data: '',
            active: false,
            width: 50,
            height: 50,
          },
        },
        switcher: {
          cover: true,
          main: false,
          footer: true,
          header: false,
          summary: false,
          encryption: false,
          theme: false,
        },
      }
    }

    return { styles }
  }

  return { project, pdf, debug }
}
