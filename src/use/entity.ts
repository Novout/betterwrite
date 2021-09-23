import { Callback } from '@/types/utils'

export const useEntity: Callback<any> = () => {
  const entry = (input: string, target: string): boolean => {
    return (
      input.startsWith('/' + target) ||
      input.startsWith('/' + target.toUpperCase())
    )
  }

  return { entry }
}
