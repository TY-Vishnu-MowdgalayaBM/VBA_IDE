// @ts-nocheck
import { shallowMount } from '@vue/test-utils'
import FDCheckBox from './index.vue'
import store from '@/store/index.ts'
import { ControlPropertyData } from '../../../models/ControlsTableProperties/ControlPropertyData'

const controlObj = new ControlPropertyData()

const propsObj = {
  controlId: 'ID_CheckBox1'
}

const checkbox1 = controlObj.data.CheckBox

const factory = (propsArg: Object) => {
  return shallowMount(FDCheckBox, {
    propsData: {
      ...propsObj,
      ...propsArg
    },
    store
  })
}

describe('FDCheckBox.vue', () => {
  describe('render and default test', () => {
    const testWrapper = factory({ data: controlObj.data.CheckBox })
    it('instance test', () => {
      expect(testWrapper.isVueInstance()).toBe(true)
    })
  })
  describe('necessary things check test', () => {
    const testWrapper = factory({ data: controlObj.data.CheckBox })
    it('name test', () => {
      expect(testWrapper.name()).toBe('FDCheckBox')
    })
  })
  describe('event test', () => {
    const testWrapper = factory({ data: controlObj.data.CheckBox })
    it('keydown test', () => {
      testWrapper.trigger('keydown')
    })
    it('click test', () => {
      testWrapper.trigger('click')
    })
    it('keydown.tab test', () => {
      testWrapper.trigger('keydown', {
        key: 'a'
      })
    })
    it('keydown.enter test', () => {
      testWrapper.trigger('keydown', {
        key: 'enter'
      })
    })
    it('blur test', () => {
      testWrapper.trigger('blur')
    })
    it('input test', () => {
      testWrapper.trigger('input')
    })
    it('dragstart test', () => {
      testWrapper.trigger('dragstart')
    })
  })
  describe('CheckBox prop test', () => {
    const testWrapper = factory({ data: controlObj.data.CheckBox })
    it('controlId test', () => {
      expect(testWrapper.props().controlId).toMatch(`ID_CheckBox1`)
      expect(testWrapper.props().controlId).toBeDefined()
      expect(testWrapper.props().controlId).not.toBeNull()
    })
    it('data test', () => {
      expect(testWrapper.props().data).toStrictEqual(controlObj.data.CheckBox)
      expect(testWrapper.props().data).toBeDefined()
      expect(testWrapper.props().data).not.toBeNull()
    })
  })

  describe('method test', () => {
    const testWrapper = factory({ data: controlObj.data.CheckBox })
    it('instance test', () => {
      expect(testWrapper.isVueInstance()).toBe(true)
    })
    it('updateCaption test', () => {
      const checkBox = testWrapper.find('input')
      checkBox.checked = true
      expect(checkBox.checked).toBe(true)
      checkBox.trigger('input')
    })
    it('makeChecked test', () => {
      testWrapper.vm.syncIsEditMode = false
      testWrapper.vm.isRunMode = true
      testWrapper.vm.makeChecked()
    })
    it('verifyValue test', () => {
      testWrapper.vm.isRunMode = false
      testWrapper.vm.verifyValue('true', 'false')
    })
    it('verifyValue test', () => {
      testWrapper.vm.isRunMode = false
      testWrapper.vm.verifyValue('true', 'false')
    })
    it('verifyValue test when false', () => {
      testWrapper.vm.isRunMode = false
      testWrapper.vm.verifyValue('false', 'true')
    })
  })

  describe('prop data test', () => {
    const testWrapper = factory({ data: controlObj.data.CheckBox })
    const checkBox = { ...checkbox1 }
    testWrapper.vm.isRunMode = true
    delete checkBox.properties.Font
    checkBox.properties.Visible = !checkBox.properties.Visible
    checkBox.properties.BackStyle = !checkBox.properties.BackStyle
    checkBox.properties.BackColor = '#D6D5D5'
    checkBox.properties.TabKeyBehavior = !checkbox1.properties.TabKeyBehavior
    checkBox.properties.AutoSize = !checkbox1.properties.AutoSize
    checkBox.properties.AutoTab = !checkbox1.properties.AutoTab
    checkBox.properties.TabStop = !checkbox1.properties.TabStop
    checkBox.properties.EnterKeyBehavior = !checkbox1.properties.EnterKeyBehavior
    checkBox.properties.Locked = !checkbox1.properties.Locked
    checkBox.properties.MultiLine = !checkbox1.properties.MultiLine
    checkBox.properties.Alignment = !checkBox.properties.Alignment
    checkBox.properties.TextAlign = 1
    checkBox.properties.SpecialEffect = 1
    checkBox.properties.Value = 'text'
    checkBox.properties.Text = 'text'
    checkBox.properties.WordWrap = !checkBox.properties.WordWrap
    checkBox.properties.Enabled = !checkBox.properties.Enabled

    testWrapper.setProps({ data: checkBox })
    it('autoSize test', () => {
      checkBox.properties.AutoSize = !checkbox1.properties.AutoSize
      expect(testWrapper.props().data.properties.AutoSize).toBe(false)
    })
    it('autoTab test', () => {
      expect(testWrapper.props().data.properties.AutoTab).toBe(true)
    })
    it('enterKeyBehavior test', () => {
      expect(testWrapper.props().data.properties.EnterKeyBehavior).toBe(true)
    })
    it('locked test', () => {
      expect(testWrapper.props().data.properties.Locked).toBe(true)
    })
    it('MultiLine test', () => {
      expect(testWrapper.props().data.properties.MultiLine).toBe(true)
    })
    it('TabStop test', () => {
      expect(testWrapper.props().data.properties.TabStop).toBe(false)
    })
    it('TabKeyBehavior test', () => {
      expect(testWrapper.props().data.properties.TabKeyBehavior).toBe(true)
    })
    it('Visible test', () => {
      expect(testWrapper.props().data.properties.Visible).toBe(false)
    })
    it('wordWrap test', () => {
      expect(testWrapper.props().data.properties.WordWrap).toBe(false)
    })
    it('Name test', () => {
      expect(testWrapper.props().data.properties.Name).toMatch('CheckBox')
    })
    it('BackColor test', () => {
      expect(testWrapper.props().data.properties.BackColor).toMatch('#D6D5D5')
    })
    it('ForeColor test', () => {
      expect(testWrapper.props().data.properties.ForeColor).toMatch('#000000')
    })
    it('Value test', () => {
      expect(testWrapper.props().data.properties.Value).toMatch('text')
    })
    it('Text test', () => {
      expect(testWrapper.props().data.properties.Text).toMatch('text')
    })
    it('TextAlign test', () => {
      expect(testWrapper.props().data.properties.TextAlign).toBe(1)
    })
    it('SpecialEffect test', () => {
      expect(testWrapper.props().data.properties.SpecialEffect).toBe(1)
    })
    it('BackStyle test', () => {
      expect(testWrapper.props().data.properties.BackStyle).toBe(false)
    })
    it('BackColor test', () => {
      expect(testWrapper.props().data.properties.BackColor).toBe('#D6D5D5')
    })
    it('WordWrap test', () => {
      expect(testWrapper.props().data.properties.WordWrap).toBe(false)
    })
    it('Visible test', () => {
      testWrapper.vm.isRunMode = false
      expect(testWrapper.vm.data.properties.Visible).toBe(false)
    })
    it('Alignment test', () => {
      expect(testWrapper.props().data.properties.Alignment).toBe(false)
    })
  })

  describe('value test', () => {
    const testWrapper = factory({ data: controlObj.data.CheckBox })
    const checkBox = { ...checkbox1 }
    checkBox.properties.PasswordChar = 'A'
    checkBox.properties.FontStyle = true
    testWrapper.setProps({ data: checkBox })
    it('checkBox value test', () => {
      const checkBox = testWrapper.find('input')
      checkBox.checked = true
      expect(checkBox.checked).toBeTruthy()
    })
    it('checkBox font test', () => {
      const checkBox = testWrapper.find('label')
      checkBox.element.style.fontFamily = 'arial'
      expect(checkBox.element.style.fontFamily).toEqual('arial')
    })
  })
})
