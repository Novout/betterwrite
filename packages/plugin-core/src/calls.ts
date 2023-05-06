import { PluginTypes } from 'better-write-types'

export const LandingCreated = (emitter: PluginTypes.PluginEmitter) => {
  emitter.emit('call-landing-created')
}

export const LandingMounted = (emitter: PluginTypes.PluginEmitter) => {
  emitter.emit('call-landing-mounted')
}

export const LandingUnmounted = (emitter: PluginTypes.PluginEmitter) => {
  emitter.emit('call-landing-unmounted')
}

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
