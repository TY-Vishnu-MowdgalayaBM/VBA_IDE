import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Create Modules object
const modules: { [index:string]: any } = {}

// Dynamically import and namespace Vuex modules
const moduleNames: Array<string> = [
  'fd'
]

moduleNames.forEach(name => {
  let module = require(`../storeModules/${name}`)

  modules[name] = {
    namespaced: true,
    ...module.default
  }
})

const store = new Vuex.Store({ strict: true, modules })

export default store
