const colors = require('tailwindcss/colors')

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
     'raleway': ['Raleway', 'ui-sans-serif', 'system-ui'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
    },
    fontSize: {
      '3xs': '.6rem',
      '2xs': '.875rem',
      'xs': '.875rem',
      'sm': '1rem',
      'tiny': '1rem',
      'base': '1.125rem',
      'lg': '1.25rem',
      'xl': '1.5rem',
      '2xl': '1.875rem',
      '3xl': '2.25rem',
      '4xl': '3rem',
      '5xl': '4rem',
      '6xl': '5em',
      '7xl': '6rem',
     },
    extend: {
      top: theme => ({
        'top-0.75': '0.2rem'
      }),
      height: theme => ({
        "editor": "75vh",
        "editor-mobile": "90vh"
      }),
      maxHeight: theme => ({
        "editor": "75vh",
        "editor-mobile": "90vh"
      }),
      minHeight: theme => ({
        "editor": "75vh",
        "editor-mobile": "90vh"
      }),
      backgroundColor: theme => ({
        "black-opacity": 'rgba(0,0,0, 0.15)',
        "white-opacity": 'rgba(255,255,255, 0.1)',
        "modal": 'rgba(0,0,0, 0.6)'
      }),
      boxShadow: theme => ({
        "binset": `rgba(50, 50, 93, 0.4) 0px 2px 5px -1px, rgba(0, 0, 0, 0.65) 0px 1px 3px -1px;`,
        "winset": `rgba(50, 50, 93, 0.3) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;`,
        "wp-shadow": 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;'
      }),
      backgroundImage: theme => ({
        "wb-image": `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23374151' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        "wb-image-dark": `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e5e5e5' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }),
      zIndex: theme => ({
        "max": "9999",
        "preview": "200",
        "aside": "100",
        "aside-open": "100",
        "min": "-1"
      })
    },
    textIndent: {
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.50rem',
      '7': '1.75rem',
      '8': '2rem',
      '9': '2.25rem',
      '10': '2.5rem',
      '11': '3rem',
      '12': '3.5rem',
      '13': '4rem',
      '14': '4.5rem',
      '15': '5rem',
      '16': '5.5rem',
      '17': '6rem',
      '18': '6.5rem',
      '19': '7rem',
      '20': '7.5rem'
    },
    textShadow: {
      'default': '0 2px 5px rgba(0, 0, 0, 0.5)',
      'lg': '0 2px 10px rgba(0, 0, 0, 0.5)',
    },
    textDecorationStyle: {
      'solid': 'solid',
      'double': 'double',
      'dotted': 'dotted',
      'dashed': 'dashed',
      'wavy': 'wavy',
    },
    textDecorationColor: {
      'red': '#f00',
      'green': '#0f0',
      'blue': '#00f',
    },
    fontVariantCaps: {
      'normal': 'normal',
      'small': 'small-caps',
      'all-small': 'all-small-caps',
      'petite': 'petite-caps',
      'unicase': 'unicase',
      'titling': 'titling-caps',
    },
    fontVariantNumeric: {
      'normal': 'normal',
      'ordinal': 'ordinal',
      'slashed-zero': 'slashed-zero',
      'lining': 'lining-nums',
      'oldstyle': 'oldstyle-nums',
      'proportional': 'proportional-nums',
      'tabular': 'tabular-nums',
      'diagonal-fractions': 'diagonal-fractions',
      'stacked-fractions': 'stacked-fractions',
    },
    fontVariantLigatures: {
      'normal': 'normal',
      'none': 'none',
      'common': 'common-ligatures',
      'no-common': 'no-common-ligatures',
      'discretionary': 'discretionary-ligatures',
      'no-discretionary': 'no-discretionary-ligatures',
      'historical': 'historical-ligatures',
      'no-historical': 'no-historical-ligatures',
      'contextual': 'contextual',
      'no-contextual': 'no-contextual',
    },
    textRendering: {
      'rendering-auto': 'auto',
      'optimize-legibility': 'optimizeLegibility',
      'optimize-speed': 'optimizeSpeed',
      'geometric-precision': 'geometricPrecision'
    },
    textStyles: theme => ({
      heading: {
        output: false,
        fontWeight: theme('fontWeight.bold'),
        lineHeight: theme('lineHeight.tight'),
      },
      h1: {
        extends: 'heading',
        fontSize: theme('fontSize.5xl'),
        '@screen sm': {
          fontSize: theme('fontSize.6xl'),
        },
      },
      h2: {
        extends: 'heading',
        fontSize: theme('fontSize.4xl'),
        '@screen sm': {
          fontSize: theme('fontSize.5xl'),
        },
      },
      h3: {
        extends: 'heading',
        fontSize: theme('fontSize.4xl'),
      },
      h4: {
        extends: 'heading',
        fontSize: theme('fontSize.3xl'),
      },
      h5: {
        extends: 'heading',
        fontSize: theme('fontSize.2xl'),
      },
      h6: {
        extends: 'heading',
        fontSize: theme('fontSize.xl'),
      },
      link: {
        fontWeight: theme('fontWeight.bold'),
        color: theme('colors.blue.400'),
        '&:hover': {
          color: theme('colors.blue.600'),
          textDecoration: 'underline',
        },
      },
      richText: {
        fontWeight: theme('fontWeight.normal'),
        fontSize: theme('fontSize.base'),
        lineHeight: theme('lineHeight.relaxed'),
        '> * + *': {
          marginTop: '1em',
        },
        'h1': {
          extends: 'h1',
        },
        'h2': {
          extends: 'h2',
        },
        'h3': {
          extends: 'h3',
        },
        'h4': {
          extends: 'h4',
        },
        'h5': {
          extends: 'h5',
        },
        'h6': {
          extends: 'h6',
        },
        'ul': {
          listStyleType: 'disc',
        },
        'ol': {
          listStyleType: 'decimal',
        },
        'a': {
          extends: 'link',
        },
        'b, strong': {
          fontWeight: theme('fontWeight.bold'),
        },
        'i, em': {
          fontStyle: 'italic',
        },
      },
    }),
  },
  variants: ["hover", "focus", "active", "dark", "responsive"],
  plugins: [
    require('tailwindcss-typography')({
      ellipsis: true,      
      hyphens: true,         
      kerning: true,       
      textUnset: true,        
      componentPrefix: 'c-', 
    })
  ],
};
