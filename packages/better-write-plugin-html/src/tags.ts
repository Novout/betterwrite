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
    }

    body > main {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 600px;
      overflow: auto;
      padding: 5rem;
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
      text-indent: 2rem;
    }

    ._TEXT_LIST_ {
      
    }

    ._TEXT_CHECKBOX_ {
      
    }

    ._PAGE_BREAK_ {
      
    }

    ._LINE_BREAK_ {
      padding: 2rem 0;
    }

    ._IMAGE_ {
      
    }

    ._DRAW_ {
      
    }
  `
}

export const HTML = (content: string) => {
  return `
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Better Write</title>
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

export const HEADING_ONE = (text: string) => {
  return `
    <p class="_BLOCK_ _HEADING_ _HEADING_ONE">${text}</p>
  `
}

export const PARAGRAPH = (text: string) => {
  return `
    <p class="_BLOCK_ _TEXT_ _TEXT_PARAGRAPH_">${text}</p>
  `
}
