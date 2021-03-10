// @ts-nocheck
import { shallowMount, createLocalVue } from '@vue/test-utils'
import FDOptionButton from './index.vue'
import store from '@/store/index.ts'
import { ControlPropertyData } from '../../../models/ControlsTableProperties/ControlPropertyData'

const controlObj = new ControlPropertyData()

const propsObj = {
  controlId: 'ID_OptionButton1'
}

const optionbutton1 = controlObj.data.OptionButton

const factory = (propsArg: Object) => {
  return shallowMount(FDOptionButton, {
    propsData: {
      ...propsObj,
      ...propsArg
    },
    store
  })
}

describe('FDOptionButton.vue', () => {
  describe('render and default test', () => {
    const testWrapper = factory({ data: controlObj.data.OptionButton })
    it('instance test', () => {
      expect(testWrapper.isVueInstance()).toBe(true)
    })
  })
  describe('necessary things check test', () => {
    const testWrapper = factory({ data: controlObj.data.OptionButton })
    it('name test', () => {
      expect(testWrapper.name()).toBe('FDOptionButton')
    })
  })
  describe('event test', () => {
    const testWrapper = factory({ data: controlObj.data.OptionButton })
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
  describe('OptionButton prop test', () => {
    const testWrapper = factory({ data: controlObj.data.OptionButton })
    it('controlId test', () => {
      expect(testWrapper.props().controlId).toMatch(`ID_OptionButton1`)
      expect(testWrapper.props().controlId).toBeDefined()
      expect(testWrapper.props().controlId).not.toBeNull()
    })
    it('data test', () => {
      expect(testWrapper.props().data).toStrictEqual(controlObj.data.OptionButton)
      expect(testWrapper.props().data).toBeDefined()
      expect(testWrapper.props().data).not.toBeNull()
    })
  })

  describe('method test', () => {
    const testWrapper = factory({ data: controlObj.data.OptionButton })
    it('instance test', () => {
      expect(testWrapper.isVueInstance()).toBe(true)
    })
    it('updateCaption test', () => {
      const optionButton = testWrapper.find('input')
      optionButton.checked = true
      expect(optionButton.checked).toBe(true)
      optionButton.trigger('input')
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
    const testWrapper = factory({ data: controlObj.data.OptionButton })
    const optionButton = { ...optionbutton1 }
    testWrapper.vm.isRunMode = true
    delete optionButton.properties.Font
    optionButton.properties.Visible = !optionButton.properties.Visible
    optionButton.properties.BackStyle = !optionButton.properties.BackStyle
    optionButton.properties.BackColor = '#D6D5D5'
    optionButton.properties.TabKeyBehavior = !optionbutton1.properties.TabKeyBehavior
    optionButton.properties.AutoSize = !optionbutton1.properties.AutoSize
    optionButton.properties.AutoTab = !optionbutton1.properties.AutoTab
    optionButton.properties.TabStop = !optionbutton1.properties.TabStop
    optionButton.properties.EnterKeyBehavior = !optionbutton1.properties.EnterKeyBehavior
    optionButton.properties.Locked = !optionbutton1.properties.Locked
    optionButton.properties.MultiLine = !optionbutton1.properties.MultiLine
    optionButton.properties.Alignment = !optionButton.properties.Alignment
    optionButton.properties.TextAlign = 1
    optionButton.properties.SpecialEffect = 1
    optionButton.properties.Value = 'text'
    optionButton.properties.Text = 'text'
    optionButton.properties.WordWrap = !optionButton.properties.WordWrap
    optionButton.properties.Enabled = !optionButton.properties.Enabled

    testWrapper.setProps({ data: optionButton })
    it('autoSize test', () => {
      optionButton.properties.AutoSize = !optionbutton1.properties.AutoSize
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
      expect(testWrapper.props().data.properties.Name).toMatch('OptionButton')
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
    const testWrapper = factory({ data: controlObj.data.OptionButton })
    const optionButton = { ...optionbutton1 }
    optionButton.properties.PasswordChar = 'A'
    optionButton.properties.FontStyle = true
    testWrapper.setProps({ data: optionButton })
    it('optionButton value test', () => {
      const optionButton = testWrapper.find('input')
      optionButton.checked = true
      expect(optionButton.checked).toBeTruthy()
    })
    it('optionButton font test', () => {
      const optionButton = testWrapper.find('label')
      optionButton.element.style.fontFamily = 'arial'
      expect(optionButton.element.style.fontFamily).toEqual('arial')
    })
  })
})
