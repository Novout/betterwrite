import { useProjectStore } from '@/store/project'
import { useEnv } from '../env'

export const useSubstitution = () => {
  const PROJECT = useProjectStore()

  const env = useEnv()

  const purge = (raw: string): string => {
    let _raw = raw
      .replaceAll(env.emptyLine(), ' ')
      .replaceAll(env.lineBreak(), ' ')
      .replaceAll(env.pageBreak(), ' ')

    PROJECT.templates.substitutions.text.forEach((template) => {
      if (template.active) _raw = _raw.replaceAll(template.old, template.new)
    })

    return _raw
  }

  return { purge }
}
