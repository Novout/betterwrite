import { Entity, ProjectObject } from 'better-write-types'

export const STYLES = () => {
  return `
    * {
      margin: 0;
      padding: 0;
      outline: 0;
      font-size: 16px;
      font-feature-settings: 'ss02' on, 'ss01' on;
      -webkit-font-smoothing: antialiased;
    }

    body {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
      width: 100%;
      overflow-y: auto;
      overflow-x: hidden;
    }

    body > main {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 768px;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 5rem;
    }

    @media (max-width: 768px)
    {
      body > main {
        width: 90%;
      }
    }

    ._BLOCK_ {
      width: 100%;
    }

    ._HEADING_ {
      display: flex;
      justify-content: center;
      align-items: center;
      font-weigth: 700;
    }

    ._HEADING_ONE {
      font-size: 2rem;
      margin-top: 5rem;
      margin-bottom: 2rem;
    }

    ._HEADING_TWO {
      font-size: 1.5rem;
      margin-top: 4rem;
      margin-bottom: 1.5rem;
    }

    ._HEADING_THREE {
      font-size: 1.25rem;
      margin-top: 3rem;
      margin-bottom: 1rem;
    }

    ._TEXT_ {
      text-align: justify;
      text-justify: inter-word;
    }

    ._TEXT_PARAGRAPH_ {
      text-indent: 1.75rem;
    }

    ._TEXT_LIST_ {
      display: list-item;
      list-style: inside;
    }

    ._TEXT_CHECKBOX_ {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    ._PAGE_BREAK_ {
      padding: 20rem 0;
    }

    ._LINE_BREAK_ {
      padding: 1.5rem 0;
    }

    ._IMAGE_ {
      
    }

    ._DRAU_ {
      
    }

    ._FAKE_INDENT_ {
      margin-left: 3.25rem;
    }
  `
}

export const HTML = (content: string, { project }: ProjectObject) => {
  return `
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${project.nameRaw}</title>
      </head>
      <style>
        ${STYLES()}
      </style>
      <body>
        <main>
          ${content}
        </main>
      </body>
    </html>
  `
}

export const PARAGRAPH = (text: string) => {
  return `
    <p class="_BLOCK_ _TEXT_ _TEXT_PARAGRAPH_">${text}</p>
  `
}

export const HEADING_ONE = (text: string) => {
  return `
    <h1 class="_BLOCK_ _HEADING_ _HEADING_ONE">${text}</h1>
  `
}

export const HEADING_TWO = (text: string) => {
  return `
    <h2 class="_BLOCK_ _HEADING_ _HEADING_TWO">${text}</h2>
  `
}

export const HEADING_THREE = (text: string) => {
  return `
    <h3 class="_BLOCK_ _HEADING_ _HEADING_THREE">${text}</h3>
  `
}

export const PAGE_BREAK = () => {
  return `
    <div class="_BLOCK_ _PAGE_BREAK_" />
  `
}

export const LINE_BREAK = () => {
  return `
    <div class="_BLOCK_ _LINE_BREAK_" />
  `
}

export const IMAGE = (data: string) => {
  return `
    <img alt="A generated image" src="${data}" class="_BLOCK_ _IMAGE_" style="width: 100%;" />
  `
}

export const DRAU = (svg: string) => {
  return `
    <div class="_BLOCK_ _DRAU_">${svg}</div>
  `
}

export const LIST = (text: string) => {
  return `
    <div class="_FAKE_INDENT_ _BLOCK_ _TEXT_">
      <p class="_TEXT_LIST_">${text}</p>
    </div>
  `
}

export const CHECKBOX = ({ raw, external }: Entity) => {
  return `
    <div class="_FAKE_INDENT_ _BLOCK_ _TEXT_ _TEXT_CHECKBOX_">
      <input type="checkbox" ${external?.checkbox?.select ? 'checked' : ''}>
      <p>${raw}</p>
    </div>
  `
}
