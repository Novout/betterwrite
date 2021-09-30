import { Callback } from '@/types/utils'

export const useDefines: Callback<any> = () => {
  const shortcuts = (k: string) => {
    return {
      localSaveProject: ['CTRL + S', 'ctrl > s'],
      localLoadProject: ['CTRL + P', 'ctrl > p'],
      newProject: ['CTRL + Shift + Q', 'ctrl > shift > q'],
      newChapter: ['CTRL + Q', 'ctrl > q'],
      deleteChapter: ['CTRL + D', 'ctrl > d'],
      configurationPDF: ['CTRL + G', 'ctrl > g'],
      previewPDF: ['CTRL + Shift + G', 'ctrl > shift > g'],
      generatePDF: ['CTRL + Alt + G', 'ctrl > alt > g'],
      switcherRawText: ['CTRL + H', 'ctrl > h'],
      logger: ['CTRL + L', 'ctrl > l'],
    }[k]
  }

  const pdf: Callback<any> = () => {
    const fixFonts = () => {
      return ['EB Garamond', 'Cormorant Garamond']
    }

    const fontFamily = (): Array<string> => {
      return ['Roboto']
    }

    const alignment = (): Array<string> => {
      return ['left', 'center', 'right', 'justify']
    }

    const decoration = (): Array<string> => {
      return ['none', 'underline', 'lineThrough', 'overline']
    }

    const decorationStyle = (): Array<string> => {
      return ['none', 'dashed', 'dotted', 'double', 'wavy']
    }

    const base = () => {
      const pageSize = (): Array<string> => {
        return [
          'A5',
          '4A0',
          '2A0',
          'A0',
          'A1',
          'A2',
          'A3',
          'A4',
          'A6',
          'A7',
          'A8',
          'A9',
          'A10',
          'B0',
          'B1',
          'B2',
          'B3',
          'B4',
          'B5',
          'B6',
          'B7',
          'B8',
          'B9',
          'B10',
          'C0',
          'C1',
          'C2',
          'C3',
          'C4',
          'C5',
          'C6',
          'C7',
          'C8',
          'C9',
          'C10',
          'RA0',
          'RA1',
          'RA2',
          'RA3',
          'RA4',
          'SRA0',
          'SRA1',
          'SRA2',
          'SRA3',
          'SRA4',
          'EXECUTIVE',
          'FOLIO',
          'LEGAL',
          'LETTER',
          'TABLOID',
        ]
      }

      const pageOrientation = (): Array<string> => {
        return ['portrait', 'landscape']
      }

      const pageMargins = (): Array<number> => {
        return [40, 5, 40, 5]
      }

      return { pageSize, pageMargins, pageOrientation }
    }

    return {
      fontFamily,
      alignment,
      decoration,
      decorationStyle,
      base,
      fixFonts,
    }
  }

  return {
    shortcuts,
    pdf,
  }
}
