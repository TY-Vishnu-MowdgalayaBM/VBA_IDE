import store from '@/store/index.ts'
import getStoryFunction from './utilPropCase.js'

let curStoryVueInstance = null

export const sampleStore = store

export function updateVuexCallback (targetStore) {
  return (name, value) => {
    const updateName = name.split('_')[0]
    targetStore.dispatch('fd/updateControl', {
      userFormId: curStoryVueInstance.UserFormId,
      controlId: curStoryVueInstance.ControlId,
      propertyName: updateName,
      value
    })
  }
}

export function updateDataCallback () {
  return (name, value) => {
    const updateName = name.split('_')[0]
    curStoryVueInstance[updateName] = value
  }
}

export function initUpdate (targetStore, vueInstance) {
  curStoryVueInstance = vueInstance
  if (curStoryVueInstance.UserFormId && curStoryVueInstance.ControlId) {
    const properties = targetStore.state.fd.userformData[curStoryVueInstance.UserFormId][curStoryVueInstance.ControlId].properties
    for (let propName in properties) {
      const value = properties[propName]
      getStoryFunction(propName, curStoryVueInstance.ControlId)(value)
    }
  }
}
