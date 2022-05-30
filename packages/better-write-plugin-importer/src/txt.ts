import { On } from 'better-write-plugin-core'
import { PluginTypes, ImporterParams, Entities } from 'better-write-types'
import { nextTick } from 'vue-demi'

export const TXTSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks
) => {
  On.externals().PluginImporterTXT(emitter, [
    async ({ data, fileName }: ImporterParams) => {
      const content = data.split('\n')
      const entities: Entities = []
      let __FIRST_ROW__ = true

      content.forEach((row: string) => {
        if (__FIRST_ROW__ && row) {
          entities.push(hooks.factory.entity().create('heading-one', row))
          __FIRST_ROW__ = false

          return
        }

        if (!row) {
          entities.push(hooks.factory.entity().create('line-break'))

          return
        }

        entities.push(hooks.factory.entity().create('paragraph', row))
      })

      stores.PROJECT.createExternal({
        name: hooks.utils.text().kebab(fileName),
        nameRaw: fileName,
        version: '0.1.0',
        creator: 'betterwrite',
        producer: 'betterwrite',
        keywords: 'docx,project',
        subject: 'betterwrite',
        type: 'creative',
        totalPagesCreated: 1,
        main: {},
        summary: {},
        pageLoaded: 1,
        scrollLoaded: 0,
        offsetLoaded: 0,
        pages: [
          {
            id: 1,
            title: entities[0].raw,
            entities,
            createdAt: hooks.format.actually(),
            updatedAt: hooks.format.actually(),
          },
        ],
        bw: {
          platform: 'web',
          version: hooks.env.packageVersion() as string,
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
            text: hooks.defines.generator().substitutions().text(),
            italic: hooks.defines.generator().substitutions().italic(),
            bold: hooks.defines.generator().substitutions().bold(),
          },
        },
        shortcuts: {
          inserts: [],
        },
      })

      await nextTick

      stores.CONTEXT.load(stores.PROJECT.pages[0])

      await nextTick

      if (
        !hooks.breakpoints.isMobile().value &&
        stores.PROJECT.type === 'creative'
      )
        stores.ABSOLUTE.aside = true

      stores.ABSOLUTE.project.blocked = false

      hooks.toast.success(hooks.i18n.t('toast.project.create'))
    },
    () => {},
  ])
}
