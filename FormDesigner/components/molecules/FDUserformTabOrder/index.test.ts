
// @ts-nocheck
import { shallowMount } from '@vue/test-utils'
import FDUserformTabOrder from './index.vue'
import store from '@/store/index.ts'
import { EventBus } from '@/FormDesigner/event-bus'

const factory = (propsArg: Object) => {
  return shallowMount(FDUserformTabOrder, {
    propsData: {
      ...propsArg
    },
    store
  })
}

describe('FDUserformTabOrder.vue', () => {
  describe('render and default test', () => {
    const testWrapper = factory()
    it('instance test', () => {
      expect(testWrapper.isVueInstance()).toBe(true)
    })
  })
  describe('necessary things check test', () => {
    const testWrapper = factory()
    it('name test', () => {
      expect(testWrapper.name()).toBe('FDUserformTabOrder')
    })
  })
  describe('event test', () => {
    it('click test', () => {
      const testWrapper = factory()
      EventBus.$emit('userFormTabOrder', 'ID_USERFORM1', 'ID_USERFORM1')
      const target = testWrapper.find('.taborder-buttons')
      target.trigger('click')
    })
  })
  describe('methods test', () => {
    it('event bus test', () => {
      EventBus.$emit('userFormTabOrder', 'ID_USERFORM1', 'ID_USERFORM1')
    })
    it('event bus test for invalid controlId', () => {
      EventBus.$emit('userFormTabOrder', 'ID_USERFORM1', 'ID_TabStrip1')
    })
    it('destroy method test', () => {
      const testWrapper = factory()
      testWrapper.destroy()
    })
  })
})
