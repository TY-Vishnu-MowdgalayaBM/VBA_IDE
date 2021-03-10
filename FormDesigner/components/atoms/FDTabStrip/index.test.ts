// @ts-nocheck
import { shallowMount } from '@vue/test-utils'
import FDTabStrip from './index.vue'
import store from '@/store/index.ts'
import { ControlPropertyData } from '../../../models/ControlsTableProperties/ControlPropertyData'

const controlObj = new ControlPropertyData()
const tabStrip1 = controlObj.data.TabStrip
const propsObj = {
  userFormId: 'ID_USERFORM1',
  controlId: 'ID_TabStrip1',
  containerId: 'ID_USERFORM1'
}

const factory = (propsArg: Object) => {
  return shallowMount(FDTabStrip, {
    propsData: {
      ...propsObj,
      ...propsArg
    },
    store
  })
}

describe('FDTabStrip.vue', () => {
  describe('render and default test', () => {
    const testWrapper = factory({ data: tabStrip1 })
    it('instance test', () => {
      expect(testWrapper.isVueInstance()).toBe(true)
    })
  })
  describe('necessary things check test', () => {
    const testWrapper = factory({ data: tabStrip1 })
    it('name test', () => {
      expect(testWrapper.name()).toBe('FDTabStrip')
    })
    it('propControlData test', () => {
      expect(testWrapper.props().data).not.toBeUndefined()
    })
  })
  describe('methods', () => {
    const testWrapper = factory({ data: tabStrip1 })
    it('getdisableValue test', () => {
      testWrapper.vm.isRunMode = true
      testWrapper.props().data.properties.Enabled = true
    })
    it('rightClickSelect test', () => {
      testWrapper.vm.rightClickSelect(2)
    })
    it('contextmenu.stop trigger test', () => {
      const label = testWrapper.find('label')
      testWrapper.vm.isEditMode = true
      label.trigger('contextmenu.stop')
    })
    it('contextmenu.stop method test', () => {
      const tempEvent = new MouseEvent('contextmenu.stop')
      testWrapper.vm.contextMenuVisible(tempEvent, -1)
    })
    it('contextmenu.stop trigger test', () => {
      const label = testWrapper.find('label')
      testWrapper.vm.isEditMode = false
      label.trigger('contextmenu.stop')
    })
    it('closemenu test', () => {
      testWrapper.vm.closeMenu()
    })
    it('leftmove test', () => {
      testWrapper.vm.leftmove()
    })
    it('leftmove test TWO', () => {
      testWrapper.props().data.properties.TabOrientation = 2
      testWrapper.vm.leftmove()
    })
    it('rightmove test', () => {
      testWrapper.props().data.properties.TabOrientation = 0
      testWrapper.vm.rightmove()
    })
    it('rightmove test TWO', () => {
      testWrapper.props().data.properties.TabOrientation = 2
      testWrapper.vm.rightmove()
    })
    it('Set Visible test', () => {
      testWrapper.vm.isRunMode = true
      testWrapper.props().data.properties.Visible = false
    })
    it('Set Style test', () => {
      testWrapper.props().data.properties.Style = 2
    })
    it('Set TabOrientation test', () => {
      testWrapper.props().data.properties.TabOrientation = 3
    })
    it('Set scrollCheck test', () => {
      testWrapper.vm.tabslength = 200
      testWrapper.props().data.properties.Width = 220
      testWrapper.vm.scrollCheck()
    })
    it('Set scrollCheck test TWO', () => {
      testWrapper.vm.tabslength = 220
      testWrapper.props().data.extraDatas.Tabs.length = 10
      testWrapper.props().data.properties.Width = 200
      testWrapper.vm.scrollCheck()
    })
    it('Check filter', () => {
      testWrapper.props().data.extraDatas.Tabs[0].Accelerator = '7'
    })
    it('Check filter TWO', () => {
      testWrapper.props().data.extraDatas.Tabs[0].Accelerator = ''
    })
    it('afterbeginCaption filter Test', () => {
      testWrapper.vm.$options.filters.afterbeginCaption('abc', '')
    })
    it('acceleratorCaption Test', () => {
      testWrapper.vm.$options.filters.acceleratorCaption('abc', '')
    })
    it('beforeendCaption filter Test', () => {
      testWrapper.vm.$options.filters.beforeendCaption('abc', '')
    })
  })
  describe('button prop test', () => {
    const testWrapper = factory({ data: tabStrip1 })
    it('controlId test', () => {
      expect(testWrapper.props().controlId).toMatch(`ID_TabStrip1`)
      expect(testWrapper.props().controlId).toBeDefined()
      expect(testWrapper.props().controlId).not.toBeNull()
    })
    const otherTabStrip = { ...tabStrip1 }
    delete otherTabStrip.properties.Font
    otherTabStrip.properties.BackColor = '#ffffff'
    otherTabStrip.properties.Forecolor = '#eeeeee'
    otherTabStrip.properties.MultiRow = !otherTabStrip.properties.MultiRow
    otherTabStrip.properties.Style = 1
    otherTabStrip.properties.TabFixedHeight = 20
    otherTabStrip.properties.TabFixedWidth = 20
    otherTabStrip.properties.TabOrientation = 1
    otherTabStrip.properties.value = 1
    otherTabStrip.properties.Enabled = !otherTabStrip.properties.Enabled
    // otherTabStrip.properties.Accelerator = 'a'
    // otherTabStrip.properties.Visible = !otherTabStrip.properties.Visible
    testWrapper.setProps({ data: otherTabStrip })
  })
})
