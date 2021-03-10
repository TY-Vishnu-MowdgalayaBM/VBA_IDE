// @ts-nocheck
import { shallowMount } from '@vue/test-utils'
import FDMultiPage from './index.vue'
import store from '@/store/index.ts'
import { ControlPropertyData } from '../../../models/ControlsTableProperties/ControlPropertyData'

const controlObj = new ControlPropertyData()
const multiPage2 = controlObj.data.MultiPage
const propsObj = {
  userFormId: 'ID_USERFORM1',
  controlId: 'ID_MultiPage1',
  containerId: 'ID_USERFORM1',
  isEditMode: true,
  isRunMode: false
}

const factory = (propsArg: Object) => {
  return shallowMount(FDMultiPage, {
    propsData: {
      ...propsObj,
      ...propsArg
    },
    store
  })
}
describe('FDMultiPage.vue', () => {
  describe('render and default test', () => {
    const testWrapper = factory({ data: multiPage2 })
    it('instance test', () => {
      expect(testWrapper.isVueInstance()).toBe(true)
    })
  })
  describe('FDMultiPage.vue', () => {
    describe('render and default test', () => {
      const testWrapper = factory({ data: multiPage2 })
      it('instance test', () => {
        expect(testWrapper.isVueInstance()).toBe(true)
      })
    })
    describe('necessary things check test', () => {
      const testWrapper = factory({ data: multiPage2 })
      it('name test', () => {
        expect(testWrapper.name()).toBe('FDMultiPage')
      })
      it('propControlData test', () => {
        expect(testWrapper.props().data).not.toBeUndefined()
      })
    })
    describe('event test', () => {
      const testWrapper = factory({ data: multiPage2 })
      it('click test', () => {
        testWrapper.trigger('click')
      })
      it('delete test', () => {
        testWrapper.vm.controlId = 'ID_Frame1'
        testWrapper.find('.outer-page').trigger('keydown.delete.stop.exact')
        testWrapper.vm.controlId = 'ID_MultiPage1'
        testWrapper.vm.selectedControls[propsObj.userFormId].selected[0] = 'ID_MultiPage1'
        testWrapper.find('.outer-page').trigger('keydown.delete.stop.exact')
      })
      it('contextmenu test', () => {
        testWrapper.find('.outer-page').trigger('contextmenu.stop')
      })
      it('mousedown test', () => {
        testWrapper.find('.outer-page').trigger('mousedown')
        testWrapper.vm.controlId = 'ID_MultiPage1'
        testWrapper.vm.selectedControls[propsObj.userFormId].container[0] = 'ID_MultiPage1'
        testWrapper.find('.outer-page').trigger('mousedown')
      })
      it('mouseup test', () => {
        testWrapper.find('.outer-page').trigger('mouseup')
      })
      it('runmode true test', () => {
        const otherMultiPage = { ...multiPage2 }
        testWrapper.setProps({ data: otherMultiPage, isRunMode: true })
        expect(testWrapper.props().isRunMode).toBe(true)
      })
    })
    describe('method test', () => {
      const testWrapper = factory({ data: multiPage2 })
      it('closeMenu test', () => {
        testWrapper.vm.closeMenu()
      })
      it('closeContextMenu test', () => {
        testWrapper.vm.closeContextMenu()
      })
      //   it('isChecked test', () => {
      //     testWrapper.vm.isChecked(1)
      //   })
      it('leftmove test', () => {
        testWrapper.vm.leftmove()
        testWrapper.vm.data.properties.TabOrientation = 2
        testWrapper.vm.leftmove()
        testWrapper.vm.data.properties.TabOrientation = 1
      })
      it('rightmove test', () => {
        testWrapper.vm.data.properties.TabOrientation = 0
        testWrapper.vm.rightmove()
        testWrapper.vm.data.properties.TabOrientation = 2
        testWrapper.vm.rightmove()
      })
      it('setValue test', () => {
        testWrapper.vm.setValue(1)
      })
      it('showContextMenu test', () => {
        testWrapper.findAll('div').trigger('contextmenu.stop')
      })
      it('handleKeyDown test', () => {
        testWrapper.findAll('div').trigger('keydown')
      })
    })
    describe('multipage prop test', () => {
      const testWrapper = factory({ data: multiPage2 })
      it('controlId test', () => {
        expect(testWrapper.props().controlId).toMatch(`ID_MultiPage1`)
        expect(testWrapper.props().controlId).toBeDefined()
        expect(testWrapper.props().controlId).not.toBeNull()
      })
      it('prop test', () => {
        testWrapper.vm.selectedPageData.properties.Picture = 'url("test")'
        const otherMultiPage = { ...multiPage2 }
        otherMultiPage.properties.BackColor = '#eeeeee'
        otherMultiPage.properties.MultiRow = true
        otherMultiPage.properties.Style = 2
        otherMultiPage.properties.TabFixedWidth = 10
        otherMultiPage.properties.TabFixedHeight = 10
        otherMultiPage.properties.TabOrientation = 3
        otherMultiPage.properties.Enabled = !otherMultiPage.properties.Enabled
        otherMultiPage.properties.Visible = !otherMultiPage.properties.Visible
        testWrapper.setProps({ data: otherMultiPage })
      })
      it('prop test with different values', () => {
        testWrapper.setData({ selectedPageID: '' })
        const otherMultiPage = { ...multiPage2 }
        otherMultiPage.properties.MultiRow = false
        otherMultiPage.properties.Style = 1
        otherMultiPage.properties.TabFixedWidth = 0
        otherMultiPage.properties.TabFixedHeight = 1
        otherMultiPage.properties.TabOrientation = 2
        otherMultiPage.properties.Enabled = !otherMultiPage.properties.Enabled
        otherMultiPage.properties.Visible = !otherMultiPage.properties.Visible
        testWrapper.setProps({ data: otherMultiPage })
      })
    })
  })
})
