/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare var Dropbox: any

declare module '@heroicons/vue'
declare module 'keyboardjs'
declare module 'pdfmake/build/pdfmake' {
  let pdfMake: any
  namespace pdfMake {}
  export = pdfMake
}
declare module 'node-fetch'
