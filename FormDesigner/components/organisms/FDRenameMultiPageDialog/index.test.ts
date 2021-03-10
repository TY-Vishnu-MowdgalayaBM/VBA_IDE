
// @ts-nocheck
import { shallowMount } from '@vue/test-utils'
import FDRenameMultiPageDialog from './index.vue'
import store from '@/store/index.ts'
import { EventBus } from '@/FormDesigner/event-bus'

const factory = (propsArg: Object) => {
  return shallowMount(FDRenameMultiPageDialog, {
    propsData: {
      ...propsArg
    },
    store
  })
}

describe('FDRenameMultiPageDialog.vue', () => {
  describe('render and default test', () => {
    const testWrapper = factory()
    it('instance test', () => {
      expect(testWrapper.isVueInstance()).toBe(true)
    })
  })
  describe('necessary things check test', () => {
    const testWrapper = factory()
    it('name test', () => {
      expect(testWrapper.name()).toBe('FDRenameMultiPageDialog')
    })
  })
  describe('event test', () => {
    it('click test', () => {
      const testWrapper = factory()
      EventBus.$emit('renamePage', 'ID_USERFORM1', 'ID_TabStrip1')
      testWrapper.setData({ selectedTabData: {
        Name: '',
        Caption: '',
        ToolTip: '',
        Accelerator: 'a'
      } })
      const target = testWrapper.findAll('.btn-outline')
      target.trigger('click')
      testWrapper.vm.selectedTabData.Accelerator = ''
      target.trigger('click')
    })
  })
  describe('methods test', () => {
    const testWrapper = factory()
    it('event bus test', () => {
      EventBus.$emit('renamePage', 'ID_USERFORM1', 'ID_TabStrip1')
    })
    it('event bus test for invalid controlId', () => {
      EventBus.$emit('renamePage', 'ID_USERFORM1', 'ID_TabStrip2')
    })

    it('handleRename method test', () => {
      testWrapper.findAll('.btn-outline').trigger('input')
    })
    it('destroy method test', () => {
      const testWrapper = factory()
      testWrapper.destroy()
    })
    it('handleRename method test for invalid element', () => {
      try {
        testWrapper.vm.handleRename(new KeyboardEvent('input'))
      } catch (error) {
        expect(error.message).toBe('Expected HTMLInputElement but found different element')
      }
    })
    it('updateAccelerator method test for invalid element', () => {
      try {
        testWrapper.vm.updateAccelerator(new KeyboardEvent('input'))
      } catch (error) {
        expect(error.message).toBe('Expected HTMLInputElement but found different element')
      }
    })
    it('handleTip method test for invalid element', () => {
      try {
        testWrapper.vm.handleTip(new KeyboardEvent('input'))
      } catch (error) {
        expect(error.message).toBe('Expected HTMLInputElement but found different element')
      }
    })
  })
})
