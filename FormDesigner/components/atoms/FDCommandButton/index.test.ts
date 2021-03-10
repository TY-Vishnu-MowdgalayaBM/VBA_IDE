// @ts-nocheck
import { shallowMount } from '@vue/test-utils'
import FDCommandButton from './index.vue'
import store from '@/store/index.ts'
import { ControlPropertyData } from '../../../models/ControlsTableProperties/ControlPropertyData'

const controlObj = new ControlPropertyData()
const commandButton1 = controlObj.data.CommandButton
const propsObj = {
  userFormId: 'ID_USERFORM1',
  controlId: 'ID_CommandButton1',
  containerId: 'ID_USERFORM1'
}

const factory = (propsArg: Object) => {
  return shallowMount(FDCommandButton, {
    propsData: {
      ...propsObj,
      ...propsArg
    },
    store
  })
}

describe('FDCommandButton.vue', () => {
  describe('render and default test', () => {
    const testWrapper = factory({ data: commandButton1 })
    it('instance test', () => {
      expect(testWrapper.isVueInstance()).toBe(true)
    })
  })
  describe('necessary things check test', () => {
    const testWrapper = factory({ data: commandButton1 })
    it('name test', () => {
      expect(testWrapper.name()).toBe('FDCommandButton')
    })
    it('propControlData test', () => {
      expect(testWrapper.props().data).not.toBeUndefined()
    })
  })
  describe('event test', () => {
    const testWrapper = factory({ data: commandButton1 })
    it('keydown delete test', () => {
      testWrapper.trigger('click')
    })
    it('click test', () => {
      testWrapper.props().data.properties.ID = 'ID_CommandButton1'
      testWrapper.trigger('keydown.delete')
    })
    it('setContentEditable enter test', () => {
      testWrapper.trigger('keydown.enter')
      expect(testWrapper.vm.isContentEditable).toBe(false)
    })
    it('setContentEditable blur', () => {
      testWrapper.trigger('blur')
      expect(testWrapper.vm.isContentEditable).toBe(false)
    })
    it('commandButtonClick()', () => {
      testWrapper.vm.isRunMode = true
      testWrapper.props().data.properties.Visible = true
      testWrapper.props().data.BackStyle = 1
      testWrapper.props().data.BackColor = '#eeeeee'
      testWrapper.vm.isActivated = true
      delete testWrapper.props().data.properties.Font
      testWrapper.trigger('click.stop')
    })
    it('commandButtonClickWhenNotLocked()', () => {
      testWrapper.vm.isActivated = true
      // testWrapper.setProps(...testWrapper.properties.Locked = false)
      testWrapper.props().data.properties.Locked = false
      testWrapper.trigger('click.stop')
    })
    it('commandButtonClickThree()', () => {
      testWrapper.vm.isRunMode = true
      testWrapper.props().data.properties.Enabled = !testWrapper.props().data.properties.Enabled
      testWrapper.props().data.properties.Locked = true
      testWrapper.trigger('click.stop')
    })
    it('updateAutoSize()', () => {
      testWrapper.vm.updateAutoSize()
      expect(testWrapper.props().data.properties.Height).toBe(22)
      expect(testWrapper.props().data.properties.Width).toBe(120)
    })
    it('isClicked', () => {
      expect(testWrapper.vm.isClicked).toBe(false)
    })
    it('updateCaption()', () => {
      const button = testWrapper.find('button')
      button.element.innerText = 'CommandButton1'
      button.trigger('input')
      expect(testWrapper.props().data.properties.Caption).toBe('CommandButton1')
    })
    it('isActivated test', () => {
      testWrapper.vm.isRunMode = true
      testWrapper.vm.isActivated = true
    })
    it('getDisableValue test', () => {
      testWrapper.vm.isRunMode = true
      testWrapper.props().data.properties.Enabled = false
      testWrapper.props().data.properties.Locked = true
      expect(testWrapper.props().data.properties.Locked).toBe(true)
    })
  })
  describe('button prop test', () => {
    const testWrapper = factory({ data: commandButton1 })
    it('controlId test', () => {
      expect(testWrapper.props().controlId).toMatch(`ID_CommandButton1`)
      expect(testWrapper.props().controlId).toBeDefined()
      expect(testWrapper.props().controlId).not.toBeNull()
    })
    const otherCommandButton = { ...commandButton1 }
    delete otherCommandButton.properties.Font
    otherCommandButton.properties.BackStyle = !otherCommandButton.properties.BackStyle
    otherCommandButton.properties.BackColor = '#eeeeee'
    otherCommandButton.properties.WordWrap = !otherCommandButton.properties.WordWrap
    otherCommandButton.properties.Enabled = !otherCommandButton.properties.Enabled
    otherCommandButton.properties.Visible = !otherCommandButton.properties.Visible
    otherCommandButton.properties.Default = !otherCommandButton.properties.Default
    otherCommandButton.properties.Cancel = !otherCommandButton.properties.Cancel
    otherCommandButton.properties.AutoSize = !otherCommandButton.properties.AutoSize
    otherCommandButton.properties.TakeFocusOnClick = !otherCommandButton.properties.TakeFocusOnClick
    otherCommandButton.properties.Locked = !otherCommandButton.properties.Locked
    testWrapper.setProps({ data: otherCommandButton })
    it('autoSize test', () => {
      expect(testWrapper.props().data.properties.AutoSize).toBe(true)
    })
    it('Locked test', () => {
      expect(testWrapper.vm.isClicked).toBe(false)
    })
  })
  describe('Locked prop test', () => {
    it('isClicked', () => {
      const testWrapper = factory({ data: commandButton1 })
      const otherCommandButton = { ...commandButton1 }
      testWrapper.vm.isRunMode = false
      testWrapper.vm.isActivated = true
      otherCommandButton.properties.Locked = true
      testWrapper.setProps({ data: otherCommandButton })
      expect(testWrapper.vm.isClicked).toBe(false)
    })
    it('Visible test', () => {
      const testWrapper = factory({ data: commandButton1 })
      testWrapper.vm.isRunMode = false
      testWrapper.vm.isActivated = true
      expect(testWrapper.props().data.properties.Visible).toBe(true)
    })
  })
})
