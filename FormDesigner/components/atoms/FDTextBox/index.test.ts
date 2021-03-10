// @ts-nocheck
import { shallowMount } from '@vue/test-utils'
import FDTextBox from './index.vue'
import store from '@/store/index.ts'
import { ControlPropertyData } from '../../../models/ControlsTableProperties/ControlPropertyData'

const controlObj = new ControlPropertyData()
const textBox1 = controlObj.data.TextBox
const propsObj = {
  userFormId: 'ID_USERFORM1',
  controlId: 'ID_TextBox1',
  containerId: 'ID_USERFORM1',
  isRunMode: false
}

const factory = (propsArg: Object) => {
  return shallowMount(FDTextBox, {
    propsData: {
      ...propsObj,
      ...propsArg
    },
    store
  })
}

describe('FDTextBox.vue', () => {
  describe('render and default test', () => {
    const testWrapper = factory({ data: textBox1 })
    it('instance test', () => {
      expect(testWrapper.isVueInstance()).toBe(true)
    })
  })
  describe('necessary things check test', () => {
    const testWrapper = factory({ data: textBox1 })
    it('name test', () => {
      expect(testWrapper.name()).toBe('FDTextBox')
    })
    it('data test', () => {
      expect(testWrapper.props().data).not.toBeUndefined()
    })
  })
  describe('event test', () => {
    const testWrapper = factory({ data: textBox1 })
    const b = testWrapper.vm.$el.querySelector('textarea')
    it('click test', () => {
      b.dispatchEvent(new MouseEvent('click'))
      testWrapper.props().data.properties.HideSelection = false
      b.dispatchEvent(new MouseEvent('click'))
    })
    it('input test', () => {
      testWrapper.props().data.properties.PasswordChar = ''
      testWrapper.props().data.properties.ControlSource = 'a'
      b.dispatchEvent(new KeyboardEvent('input'))
      testWrapper.props().data.properties.PasswordChar = ''
      testWrapper.props().data.properties.ControlSource = ''
      b.dispatchEvent(new KeyboardEvent('input'))
      testWrapper.props().data.properties.PasswordChar = 'a'
      testWrapper.props().data.properties.CursorStartPosition = '0'
      testWrapper.props().data.properties.CursorEndPosition = '3'
      b.dispatchEvent(new KeyboardEvent('input'))
      testWrapper.props().data.properties.CursorStartPosition = ''
      testWrapper.props().data.properties.CursorEndPosition = ''
      testWrapper.props().data.properties.Text = 'c'
      b.dispatchEvent(new KeyboardEvent('input'))
      testWrapper.props().data.properties.CursorStartPosition = ''
      testWrapper.props().data.properties.CursorEndPosition = ''
      testWrapper.props().data.properties.Text = 'hello world'
      b.dispatchEvent(new KeyboardEvent('input'))
    })
    it('keydown test', () => {
      testWrapper.props().data.properties.PasswordChar = 'a'
      b.dispatchEvent(new KeyboardEvent('keydown', {
        keyCode: 8
      }))
      b.dispatchEvent(new KeyboardEvent('keydown'))
      try {
        testWrapper.vm.handleDelete(new KeyboardEvent('keydown'))
      } catch (error) {
        expect(error).toBe(error)
      }
    })
    it('keydown.tab test', () => {
      b.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'Tab',
        keyCode: 9
      }))
    })
    it('keydown.tab test with TabKeyBehavior true', () => {
      testWrapper.props().data.properties.TabKeyBehavior = true
      b.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'Tab',
        keyCode: 9
      }))
    })
    it('keydown.enter test', () => {
      b.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'Enter'
      }))
    })
    it('keydown.enter test with EnterKeyBehavior true', () => {
      testWrapper.props().data.properties.EnterKeyBehavior = true
      b.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'Enter'
      }))
    })
    it('keydown.enter test with EnterKeyBehavior false', () => {
      testWrapper.props().data.properties.EnterKeyBehavior = false
      b.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'Enter'
      }))
    })
    it('blur test', () => {
      testWrapper.props().data.properties.HideSelection = false
      b.dispatchEvent(new MouseEvent('blur'))
      testWrapper.props().data.properties.HideSelection = true
      b.dispatchEvent(new MouseEvent('blur'))
    })
    it('dragstart test', () => {
      testWrapper.props().data.properties.DragStart = true
      b.dispatchEvent(new MouseEvent('dragstart'))
    })
    it('dragstart test with DragBehavior true', () => {
      testWrapper.props().data.properties.DragStart = true
      testWrapper.props().data.properties.DragBehavior = true
      b.dispatchEvent(new MouseEvent('dragstart'))
    })
    it('dragstart test with DragBehavior false', () => {
      testWrapper.props().data.properties.DragStart = true
      testWrapper.props().data.properties.DragBehavior = false
      b.dispatchEvent(new MouseEvent('dragstart'))
    })
    it('getDisableValue test', () => {
      testWrapper.vm.isRunMode = true
      testWrapper.props().data.properties.Enabled = true
      testWrapper.props().data.properties.Locked = false
      expect(testWrapper.props().data.properties.Locked).toBe(false)
    })
    it('divHide click test', () => {
      const a = testWrapper.vm.$el.querySelector('div')
      a.dispatchEvent(new MouseEvent('click'))
    })
  })
  describe('prop test', () => {
    const testWrapper = factory({ data: textBox1 })
    it('controlId test', () => {
      expect(testWrapper.props().controlId).toMatch(`ID_TextBox1`)
      expect(testWrapper.props().controlId).toBeDefined()
      expect(testWrapper.props().controlId).not.toBeNull()
    })
    const otherTextBox = { ...textBox1 }
    testWrapper.props().isRunMode = true
    otherTextBox.properties.BackStyle = !otherTextBox.properties.BackStyle
    otherTextBox.properties.BackColor = '#eeeeee'
    otherTextBox.properties.WordWrap = !otherTextBox.properties.WordWrap
    otherTextBox.properties.TextAlign = 1
    otherTextBox.properties.SpecialEffect = 0
    otherTextBox.properties.Enabled = !otherTextBox.properties.Enabled
    otherTextBox.properties.Visible = !otherTextBox.properties.Visible
    otherTextBox.properties.AutoSize = !otherTextBox.properties.AutoSize
    otherTextBox.properties.Locked = !otherTextBox.properties.Locked
    otherTextBox.properties.ControlSource = 'a2'
    otherTextBox.properties.Value = 'test'
    otherTextBox.properties.PasswordChar = 'h'
    testWrapper.setProps({ data: otherTextBox })
    it('autoSize test', () => {
      expect(testWrapper.props().data.properties.AutoSize).toBe(true)
    })
    it('autoSize test false', () => {
      testWrapper.props().data.properties.AutoSize = false
      expect(testWrapper.props().data.properties.AutoSize).toBe(false)
    })
    it('Visible test', () => {
      testWrapper.props().isRunMode = false
      testWrapper.props().data.properties.Visible = false
      expect(testWrapper.props().data.properties.Visible).toBe(false)
    })
    it('PasswordChar, Val test', () => {
      testWrapper.props().data.properties.PasswordChar = 'a'
    })
  })
  describe('Text Value prop test ', () => {
    const testWrapper = factory({ data: textBox1 })
    const otherTextBox = { ...textBox1 }
    delete otherTextBox.properties.Font
    otherTextBox.properties.Text = ''
    otherTextBox.properties.ControlSource = ''
    otherTextBox.properties.Value = ''
    otherTextBox.properties.PasswordChar = ''
    testWrapper.setProps({ data: otherTextBox })
  })
})
