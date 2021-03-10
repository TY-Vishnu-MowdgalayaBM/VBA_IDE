// @ts-nocheck
import { shallowMount } from '@vue/test-utils'
import FDScrollBar from './index.vue'
import store from '@/store/index.ts'
import { ControlPropertyData } from '../../../models/ControlsTableProperties/ControlPropertyData'

const controlObj = new ControlPropertyData()
const scrollBar1 = controlObj.data.ScrollBar
const propsObj = {
  userFormId: 'ID_USERFORM1',
  controlId: 'ID_ScrollBar1',
  containerId: 'ID_USERFORM1'
}

const factory = (propsArg: Object) => {
  return shallowMount(FDScrollBar, {
    propsData: {
      ...propsObj,
      ...propsArg
    },
    store
  })
}

describe('FDScrollBar.vue', () => {
  describe('render and default test', () => {
    const testWrapper = factory({ data: scrollBar1 })
    it('instance test', () => {
      expect(testWrapper.isVueInstance()).toBe(true)
    })
  })
  describe('necessary things check test', () => {
    const testWrapper = factory({ data: scrollBar1 })
    it('name test', () => {
      expect(testWrapper.name()).toBe('FDScrollBar')
    })
    it('propControlData test', () => {
      expect(testWrapper.props().data).not.toBeUndefined()
    })
    it('ButtonClick()', () => {
      expect(testWrapper.vm.isClicked).toBe(false)
    })
    it('Scroll BY Class()', () => {
      const x = testWrapper.find('.outer-scroll')
      testWrapper.vm.isRunMode = true
      testWrapper.props().data.properties.Enabled = false
      x.trigger('scroll')
      testWrapper.vm.isRunMode = true
      testWrapper.props().data.properties.Enabled = true
      x.trigger('scroll')
    })
    it('Scroll BY Class Two()', () => {
      const x = testWrapper.find('.outer-scroll')
      testWrapper.vm.isRunMode = false
      testWrapper.vm.isEditMode = false
      x.trigger('scroll')
      testWrapper.vm.isRunMode = false
      testWrapper.vm.isEditMode = true
      x.trigger('scroll')
    })
    it('Enabled check()', () => {
      this.isRunMode = true
      testWrapper.props().data.properties.Enabled = false
    })
    it('isClicked check()', () => {
      this.isRunMode = true
      testWrapper.vm.isClicked = true
    })
    it('WidthHeight check()', () => {
      testWrapper.props().data.properties.Width = 5
      testWrapper.props().data.properties.Height = 6
      expect(testWrapper.vm.checkOtherOrientations()).toBe(true)
    })
    it('WidthHeight check Two()', () => {
      testWrapper.props().data.properties.Width = 7
      testWrapper.props().data.properties.Height = 6
      expect(testWrapper.vm.checkOtherOrientations()).toBe(false)
    })
    it('Visible check()', () => {
      testWrapper.vm.isRunMode = true
      testWrapper.props().data.properties.Visible = true
    })
  })
})
describe('button prop test', () => {
  const testWrapper = factory({ data: scrollBar1 })
  it('controlId test', () => {
    expect(testWrapper.props().controlId).toMatch(`ID_ScrollBar1`)
    expect(testWrapper.props().controlId).toBeDefined()
    expect(testWrapper.props().controlId).not.toBeNull()
  })
  const otherScrollBar = { ...scrollBar1 }
  otherScrollBar.properties.Enabled = !otherScrollBar.properties.Enabled
  otherScrollBar.properties.Visible = !otherScrollBar.properties.Visible
  testWrapper.setProps({ data: otherScrollBar })
})
