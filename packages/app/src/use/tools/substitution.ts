import { useProjectStore } from '@/store/project'
import { useEnv } from '../env'
import { html } from '../raw'

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

    PROJECT.templates.substitutions.italic.forEach((template) => {
      const result =
        html().italic().open() + template.data + html().italic().close()

      if (template.active && template.data !== result)
        _raw = _raw.replaceAll(template.data, result)
    })

    PROJECT.templates.substitutions.bold.forEach((template) => {
      const result =
        html().bold().open() + template.data + html().bold().close()

      if (template.active && template.data !== result)
        _raw = _raw.replaceAll(template.data, result)
    })

    return _raw
  }

  return { purge }
}
