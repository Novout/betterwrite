import { commandsCtx, Ctx, schemaCtx, themeManagerCtx } from '@milkdown/core'
import {
  slashPlugin,
  slash,
  WrappedAction,
  createDropdownItem,
} from '@milkdown/plugin-slash'
import { PluginTypes } from 'better-write-types'

export const defaultActions = (
  ctx: Ctx,
  input = '/',
  i18n: PluginTypes.PluginHook
): WrappedAction[] => {
  const { nodes } = ctx.get(schemaCtx)
  const actions: Array<
    WrappedAction & { keyword: string[]; typeName: string }
  > = [
    {
      id: 'h1',
      dom: createDropdownItem(
        ctx.get(themeManagerCtx),
        i18n.t('editor.annotations.theme.tags.h1'),
        'h1'
      ),
      command: () => ctx.get(commandsCtx).call('TurnIntoHeading', 1),
      keyword: ['h1', 'large heading'],
      typeName: 'heading',
    },
    {
      id: 'h2',
      dom: createDropdownItem(
        ctx.get(themeManagerCtx),
        i18n.t('editor.annotations.theme.tags.h2'),
        'h2'
      ),
      command: () => ctx.get(commandsCtx).call('TurnIntoHeading', 2),
      keyword: ['h2', 'medium heading'],
      typeName: 'heading',
    },
    {
      id: 'h3',
      dom: createDropdownItem(
        ctx.get(themeManagerCtx),
        i18n.t('editor.annotations.theme.tags.h3'),
        'h3'
      ),
      command: () => ctx.get(commandsCtx).call('TurnIntoHeading', 3),
      keyword: ['h3', 'small heading'],
      typeName: 'heading',
    },
    {
      id: 'bulletList',
      dom: createDropdownItem(
        ctx.get(themeManagerCtx),
        i18n.t('editor.annotations.theme.tags.bulletList'),
        'bulletList'
      ),
      command: () => ctx.get(commandsCtx).call('WrapInBulletList'),
      keyword: ['bullet list', 'ul'],
      typeName: 'bullet_list',
    },
    {
      id: 'orderedList',
      dom: createDropdownItem(
        ctx.get(themeManagerCtx),
        i18n.t('editor.annotations.theme.tags.orderedList'),
        'orderedList'
      ),
      command: () => ctx.get(commandsCtx).call('WrapInOrderedList'),
      keyword: ['ordered list', 'ol'],
      typeName: 'ordered_list',
    },
    {
      id: 'taskList',
      dom: createDropdownItem(
        ctx.get(themeManagerCtx),
        i18n.t('editor.annotations.theme.tags.taskList'),
        'taskList'
      ),
      command: () => ctx.get(commandsCtx).call('TurnIntoTaskList'),
      keyword: ['task list', 'task'],
      typeName: 'task_list_item',
    },
    {
      id: 'image',
      dom: createDropdownItem(
        ctx.get(themeManagerCtx),
        i18n.t('editor.annotations.theme.tags.image'),
        'image'
      ),
      command: () => ctx.get(commandsCtx).call('InsertImage'),
      keyword: ['image'],
      typeName: 'image',
    },
    {
      id: 'blockquote',
      dom: createDropdownItem(
        ctx.get(themeManagerCtx),
        i18n.t('editor.annotations.theme.tags.quote'),
        'quote'
      ),
      command: () => ctx.get(commandsCtx).call('WrapInBlockquote'),
      keyword: ['quote', 'blockquote'],
      typeName: 'blockquote',
    },
    {
      id: 'table',
      dom: createDropdownItem(
        ctx.get(themeManagerCtx),
        i18n.t('editor.annotations.theme.tags.table'),
        'table'
      ),
      command: () => ctx.get(commandsCtx).call('InsertTable'),
      keyword: ['table'],
      typeName: 'table',
    },
    {
      id: 'code',
      dom: createDropdownItem(
        ctx.get(themeManagerCtx),
        i18n.t('editor.annotations.theme.tags.code'),
        'code'
      ),
      command: () => ctx.get(commandsCtx).call('TurnIntoCodeFence'),
      keyword: ['code'],
      typeName: 'fence',
    },
    {
      id: 'divider',
      dom: createDropdownItem(
        ctx.get(themeManagerCtx),
        i18n.t('editor.annotations.theme.tags.divider'),
        'divider'
      ),
      command: () => ctx.get(commandsCtx).call('InsertHr'),
      keyword: ['divider', 'hr'],
      typeName: 'hr',
    },
  ]

  const userInput = input.slice(1).toLocaleLowerCase()

  return actions
    .filter(
      (action) =>
        !!nodes[action.typeName] &&
        action.keyword.some((keyword) => keyword.includes(userInput))
    )
    .map(({ keyword, typeName, ...action }) => action)
}

export const sls = ({ i18n }: PluginTypes.PluginHooks) => {
  return slash.configure(slashPlugin, {
    config: (ctx) => {
      // Define a status builder
      return ({ isTopLevel, content }) => {
        // You can only show something at root level
        if (!isTopLevel) return null

        // Empty content ? Set your custom empty placeholder !
        if (!content) {
          return { placeholder: i18n.t('editor.annotations.theme.placeholder') }
        }

        // Define the placeholder & actions (dropdown items) you want to display depending on content
        if (content.startsWith('/')) {
          return {
            actions: defaultActions(ctx, '/', i18n),
          }
        }

        return null
      }
    },
  })
}
