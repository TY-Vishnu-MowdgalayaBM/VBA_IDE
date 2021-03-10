// @ts-nocheck
import { shallowMount } from '@vue/test-utils'
import ToolBox from './index.vue'
import store from '@/store/index.ts'

const factory = (propsArg: Object) => {
  return shallowMount(ToolBox, {
    propsData: {
      ...propsArg
    },
    store
  })
}

describe('FDToolBox', () => {
  describe('render and default test', () => {
    const testWrapper = factory()
    it('instance test', () => {
      expect(testWrapper.isVueInstance()).toBe(true)
    })
  })
  describe('necessary things check test', () => {
    const testWrapper = factory()
    it('name test', () => {
      expect(testWrapper.name()).toBe('ToolBox')
    })
  })
  describe('event test', () => {
    const testWrapper = factory()
    const element = testWrapper.find('.container')
    it('click test', () => {
      element.trigger('click')
    })
  })
})
