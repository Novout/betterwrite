import { On } from 'better-write-plugin-core'
import {
  Entity,
  Maybe,
  PluginTypes,
  ProjectStateSchemaCharacterItem,
} from 'better-write-types'
import { ASTUtils } from 'better-write-contenteditable-ast'
import { HEXToRGBA } from 'better-write-color-converter'

export const PluginBackgroundColorSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks
) => {
  On.externals().PluginCharactersColorBackground(emitter, [
    ({
      entity,
      str,
      character,
    }: {
      entity: Entity
      str: string
      character: ProjectStateSchemaCharacterItem
    }) => {
      if (!hooks.entity.utils().isTextBlock(entity.type) || character.disabled)
        return

      const text: Maybe<string> = ASTUtils.normalize(str, {
        type: 'all',
        whitespace: true,
      })

      if (!text) return

      const color = HEXToRGBA(character.color, character.colorAlpha)

      const isValidImportant =
        !entity.visual.custom || (entity.visual.custom && character.important)

      const nameCase = hooks.transformer
        .characters()
        .nameCase(character.nameCase, 'setter')

      switch (nameCase) {
        case 'strict':
          if (
            text.split(/\s/).find((t) => t === character.name) &&
            isValidImportant
          )
            entity.visual.custom = color
          break
        case 'default':
          if (
            text
              .split(/(\s|\s[&-._:])/)
              .find((t) =>
                t.toLowerCase().includes(character.name.toLowerCase())
              ) &&
            isValidImportant
          )
            entity.visual.custom = color
          break
        case 'all':
          if (
            text.toLowerCase().includes(character.name.toLowerCase()) &&
            isValidImportant
          )
            entity.visual.custom = color
          break
        default:
          break
      }
    },
    () => {},
  ])
}
