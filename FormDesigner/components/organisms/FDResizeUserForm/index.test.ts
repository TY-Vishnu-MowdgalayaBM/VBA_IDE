// @ts-nocheck
import { shallowMount, createLocalVue } from '@vue/test-utils'
import FDUserform from './index.vue'
import { UserFormData } from '../../../models/UserFormData.ts'
import store from '@/store/index.ts'

// const testData = (store.state as any).fd.userformData['ID_USERFORM1']['ID_Label2']

const propsObj = {
  controlId: 'ID_USERFORM1',
  userFormId: 'ID_USERFORM1',
  userFormData: UserFormData
}

const factory = (propsArg: Object) => {
  return shallowMount(FDUserform, {
    propsData: {
      ...propsObj,
      ...propsArg
    },
    store
  })
}

describe('FDUserform.vue', () => {
  describe('render and default test', () => {
    const testWrapper = factory(propsObj)
    it('instance test', () => {
      expect(testWrapper.isVueInstance()).toBe(true)
    })
  })
  describe('necessary things check test', () => {
    const testWrapper = factory(propsObj)
    it('name test', () => {
      expect(testWrapper.name()).toBe('UserForm')
    })
    it('propControlData test', () => {
      expect(testWrapper.vm.propControlData).not.toBeUndefined()
    })
  })
  describe('event test', () => {
    const testWrapper = factory(propsObj)
    it('keydown delete test', () => {
      testWrapper.trigger('click')
    })
    it('click test', () => {
      testWrapper.trigger('keydown.delete')
    })
  })
  describe('Userform prop test', () => {
    const testWrapper = factory(propsObj)
    it('prop Defined test', () => {
      expect(testWrapper.vm.propControlData).toBeDefined()
    })
  })
})
