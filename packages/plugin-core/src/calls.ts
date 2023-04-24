import { PluginTypes } from 'better-write-types'

export const EditorCreated = (emitter: PluginTypes.PluginEmitter) => {
  emitter.emit('call-editor-created')
}

export const EditorMounted = (emitter: PluginTypes.PluginEmitter) => {
  emitter.emit('call-editor-mounted')
}

export const EditorUnmounted = (emitter: PluginTypes.PluginEmitter) => {
  emitter.emit('call-editor-unmounted')
}

export const EditorEntityUpdated = (emitter: PluginTypes.PluginEmitter) => {
  emitter.emit('call-editor-entity-updated')
}

export const EditorEntityTextSaved = (emitter: PluginTypes.PluginEmitter) => {
  emitter.emit('call-editor-entity-text-saved')
}
