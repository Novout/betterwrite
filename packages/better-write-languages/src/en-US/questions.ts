export default {
  default: {
    description:
      'Here are several answers to common questions about betterwrite.io:',
  },
  navigatorSupport: {
    title: 'What browsers are supported?',
    description:
      'betterwrite.io depends on certain features that are not supported by all browsers. Check out the recommended browsers below:',
  },
  generatorSupport: {
    title: `Why don't generators have the same support as (.PDF)?`,
    description:
      'betterwrite.io was exclusively intended to export .pdf, but brought new features in the course of development. As a result, other extensions cannot support specific features, either due to extension limitations or lack of required adaptation. See the table of supported features for each extension below.',
    items: {
      paragraph: 'Paragraph',
      customParagraph: 'Custom Paragraph',
      italicAndBold: 'Italic and Bold',
      headings: 'Headings',
      breakLine: 'Break Line',
      breakPage: 'Break Page',
      image: 'Image',
      list: 'List',
      checkbox: 'Checkbox',
      header: 'Header',
      summary: 'Summary',
      footer: 'Footer',
    },
  },
  generatorRecommendations: {
    title: 'Which configuration should I export my documents?',
    description:
      'By default, the application exports in the recommended format settings in all extensions it makes available. For example, the PDF extension exports documents in CYMK / 300dpi, i.e. ready for printing. We recommend that you research the specific extension if you want to change any of the default options.',
  },
  futureFeatures: {
    title: 'Where can I find or suggest future features and modifications?',
    description:
      'betterwrite.io is an open source project, where suggestions, criticisms and bug reports can be found by ',
    clickHere: 'clicking here.',
  },
  releasePlanning: {
    title: 'When will the app be officially released?',
    description:
      'betterwrite.io aims to make version 1.0 official in the first half of 2023.',
  },
  importProjects: {
    title: 'What projects can I import here?',
    description:
      'The application supports importing projects with the extension .bw, .doc, .docx and .txt. So far, it has no plans to directly support importing projects from Google Docs, Microsoft Word, Overleaf, or any other similar tool.',
  },
}
