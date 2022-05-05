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
}
