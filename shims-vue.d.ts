/// <reference path="./@types/vuex.d.ts"/>
/// <reference path="./@types/fd.d.ts"/>
/// <reference path="./@types/vue-drag-selector.d.ts"/>
/// <reference path="./api/abstract/FormDesigner/@types/FdControlVue.d.ts"/>

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

// ToDo: it will be deleted
declare module '*.svg' {
  const content: any
  export default content
}

declare module 'vue-split-panel'
// declare module 'vue-drag-selector'
