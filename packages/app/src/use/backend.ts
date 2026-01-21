import { useAuthStore } from "@/store/auth"
import { usePlugin } from "better-write-plugin-core"
import { nextTick } from "vue"

export const useBackend = () => {
  const AUTH = useAuthStore()

  const plugin = usePlugin()

  const getUser = async () => {
    plugin.emit('plugin-backend-load-user')

    await nextTick
  }

  const registerUser = async () => {
    plugin.emit('plugin-backend-register-user')

    await nextTick
  }

  const getProject = (id: string) => {

  }

  const getLibraries = (id: string) => {
    return []
  }

  const deleteProject = (id: string) => {

  }

  return { registerUser, getUser, getProject, getLibraries, deleteProject }
}