import { PluginTypes } from 'better-write-types'
import { On } from 'better-write-plugin-core'
import { rootCtx, defaultValueCtx, Editor } from '@milkdown/core'
import { listener, listenerCtx } from '@milkdown/plugin-listener'
import { math } from '@milkdown/plugin-math'
import { tooltip } from '@milkdown/plugin-tooltip'
import { clipboard } from '@milkdown/plugin-clipboard'
import { block } from '@milkdown/plugin-block'
import { bw } from './theme'
import { cmk } from './plugin/commonmark'
import { sls } from './plugin/slash'

export const PluginAnnotationsSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks
) => {
  const start = async () => {
    await Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, document.querySelector('#bw-wysiwyg'))
        /*
        ctx.set(defaultValueCtx, {
          type: 'json',
          value: {},
        });
        */
        ctx.set(defaultValueCtx, '# Test')
        ctx.get(listenerCtx).updated((ctx, doc, prevDoc) => {
          // console.log(doc.toJSON());
        })
      })
      .use(listener)
      .use(cmk)
      .use(math)
      .use(sls(hooks))
      .use(tooltip)
      .use(clipboard)
      .use(block)
      .use(bw)
      .create()
  }

  On.externals().PluginAnnotationsStart(emitter, [
    () => {
      start()
    },
    () => {},
  ])
}
