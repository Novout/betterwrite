import {
  ProjectObject,
  AccountPlan,
  SupabaseIntegrations,
  ID,
} from 'better-write-types'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import { useUtils } from '../utils'

export const getSupabaseUser = async () => {
  return null
}

export const useSupabase = () => {
  const toast = useToast()
  const { t } = useI18n()
  const utils = useUtils()

  const toDashboard = () => {

  }

  const login = (
    provider: SupabaseIntegrations,
    notification: boolean = true
  ) => {
    toast.info(t('toast.generics.load'))
  }

  const out = () => {
  }

  const getDocuments = async () => {

  }

  const getProjects = async () => {

  }

  const saveProject = async (project?: ProjectObject) => {

  }

  const deleteProject = async (id: ID<number>) => {

  }

  const loadProject = (context: ProjectObject) => {
   
  }

  const loadProjectById = async (id: ID<number>) => {
    
  }

  const getProfile = async () => {

  }

  const getProjectSize = (context: ProjectObject) => {
    return (
      utils.object().getMemorySizeOfObject(context)[0] +
      ' ' +
      utils.object().getMemorySizeOfObject(context)[1]
    )
  }

  const getAllProjectSize = async () => {
 
  }

  const getPlanBar = async (plan: AccountPlan) => {

  }

  const getCorrectPlan = (plan: AccountPlan) => {
    switch (plan) {
      case 'beginner':
        return t('dashboard.account.plans.beginner')
      case 'intermediate':
        return t('dashboard.account.plans.intermediate')
      case 'advanced':
        return t('dashboard.account.plans.advanced')
      case 'unlimited':
        return t('dashboard.account.plans.unlimited')
      default:
        return '__NOT_DEFINED__'
    }
  }

  return {
    toDashboard,
    login,
    out,
    getDocuments,
    getProjects,
    saveProject,
    loadProjectById,
    loadProject,
    deleteProject,
    getProfile,
    getProjectSize,
    getAllProjectSize,
    getPlanBar,
    getCorrectPlan,
  }
}
