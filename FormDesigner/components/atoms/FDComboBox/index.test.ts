// @ts-nocheck
import { shallowMount } from '@vue/test-utils'
import FDComboBox from './index.vue'
import store from '@/store/index.ts'
import { ControlPropertyData } from '../../../models/ControlsTableProperties/ControlPropertyData'

const controlObj = new ControlPropertyData()
const comboBox1 = controlObj.data.ComboBox
const propsObj = {
  userFormId: 'ID_USERFORM1',
  controlId: 'ID_ComboBox1',
  containerId: 'ID_USERFORM1'
}

const factory = (propsArg: Object) => {
  return shallowMount(FDComboBox, {
    propsData: {
      ...propsObj,
      ...propsArg
    },
    store
  })
}

describe('FDComboBox.vue', () => {
  describe('render and default test', () => {
    const testWrapper = factory({ data: comboBox1 })
    it('instance test', () => {
      expect(testWrapper.isVueInstance()).toBe(true)
    })
  })
  describe('necessary things check test', () => {
    const testWrapper = factory({ data: comboBox1 })
    it('name test', () => {
      expect(testWrapper.name()).toBe('FDComboBox')
    })
    it('Data test', () => {
      expect(testWrapper.props().data).not.toBeUndefined()
    })
  })
  describe('event test', () => {
    const testWrapper = factory({ data: comboBox1 })
    it('clearMatchEntry blur', () => {
      testWrapper.trigger('blur')
    })
    it('clearMatchEntry()', () => {
      testWrapper.vm.clearMatchEntry()
    })
    it('handleBlur()', () => {
      testWrapper.props().data.properties.EnterFieldBehavior = 1
      let x = testWrapper.find('textarea')
      x.trigger('blur')
    })
    it('handleBlur Two()', () => {
      testWrapper.props().data.properties.HideSelection = false
      testWrapper.vm.textareaRef = true
      let x = testWrapper.find('textarea')
      x.trigger('blur')
    })
    it('handleBlur Three()', () => {
      testWrapper.props().data.properties.MatchRequired = true
      testWrapper.vm.textareaRef = true
      let x = testWrapper.find('textarea')
      x.trigger('blur')
    })
    it('handleBlur Four()', () => {
      testWrapper.props().data.properties.MatchRequired = true
      testWrapper.vm.textareaRef = true
      testWrapper.vm.arrayCheck = 0
      let x = testWrapper.find('textarea')
      x.trigger('blur')
    })
    it('handleClick()', () => {
      let x = testWrapper.find('textarea')
      x.trigger('click')
    })
    it('handleClick Two()', () => {
      let x = testWrapper.find('textarea')
      testWrapper.props().data.properties.EnterFieldBehavior = 0
      x.trigger('click')
    })
    it('handleClick Three()', () => {
      let x = testWrapper.find('textarea')
      testWrapper.props().data.properties.EnterFieldBehavior = 2
      x.trigger('click')
    })
    it('divHide check()', () => {
      let x = testWrapper.find('div')
      x.trigger('click')
    })
    it('dragBehavior ()', () => {
      let x = testWrapper.find('textarea')
      x.trigger('dragstart')
      testWrapper.props().data.properties.DragBehavior = false
    })
    it('dragBehavior Two()', () => {
      testWrapper.props().data.properties.DragBehavior = true
    })
    it('handleTextInput()', () => {
      let x = testWrapper.find('textarea')
      x.trigger('input')
    })
    it('setSelection()', () => {
      testWrapper.vm.setSelection()
    })
    it('ValueData()', () => {
      testWrapper.vm.ValueData()
    })
    it('clearMatchEntry()', () => {
      testWrapper.vm.clearMatchEntry()
    })
    it('ListRowsValue()', () => {
      testWrapper.vm.ListRowsValue()
    })
    it('checkSelectionMargin()', () => {
      testWrapper.vm.checkSelectionMargin()
    })
    it('expandWidth()', () => {
      testWrapper.vm.expandWidth()
    })
    it('changeDropButtonStyle()', () => {
      testWrapper.vm.changeDropButtonStyle()
    })
    it('enabledCheck()', () => {
      testWrapper.vm.enabledCheck()
    })
    it('setSelection trigger()', () => {
      let y = testWrapper.find('span')
      y.trigger('click')
    })
    it('dragBehavior trigger()', () => {
      let y = testWrapper.find('textarea')
      y.trigger('dragstart')
    })
    it('enabledCheck trigger()', () => {
      let y = testWrapper.find('div')
      y.trigger('click')
    })
    it('divHide trigger()', () => {
      testWrapper.props().data.properties.HideSelection = false
      let y = testWrapper.find({ ref: 'hideSelectionDiv' })
      y.trigger('click')
    })
    it('divHide trigger()', () => {
      testWrapper.props().data.properties.HideSelection = true
      let y = testWrapper.find('textarea')
      y.trigger('click')
    })
    it('tableClick trigger()', () => {
      let y = testWrapper.find('table')
      y.trigger('click')
    })
    it('enableCheck trigger()', () => {
      let y = testWrapper.find('.selected')
      testWrapper.vm.isRunMode = true
      testWrapper.props().data.properties.Enabled = true
      testWrapper.props().data.properties.Locked = false
      y.trigger('click')
    })
    it('enableCheck trigger Two()', () => {
      let y = testWrapper.find('.selected')
      testWrapper.vm.isRunMode = true
      testWrapper.props().data.properties.Enabled = false
      y.trigger('click')
    })
    it('expandwidth ()', () => {
      testWrapper.vm.expandWidth()
      testWrapper.props().data.properties.ShowDropButtonWhen = 0
    })
    it('expandwidth Two()', () => {
      testWrapper.vm.expandWidth()
      testWrapper.props().data.properties.ShowDropButtonWhen = 1
      testWrapper.vm.isVisible = true
    })
    it('expandwidth Three()', () => {
      testWrapper.vm.expandWidth()
      testWrapper.vm.isVisible = false
    })
    it('display Three()', () => {
      testWrapper.props().data.properties.ShowDropButtonWhen = 2
    })
    it('dropButtonStyle check()', () => {
      testWrapper.props().data.properties.DropButtonStyle = 2
      testWrapper.vm.changeDropButtonStyle()
    })
    it('dropButtonStyle check Two()', () => {
      testWrapper.props().data.properties.DropButtonStyle = 3
      testWrapper.vm.changeDropButtonStyle()
    })
    it('dropButtonStyle check Three()', () => {
      testWrapper.props().data.properties.DropButtonStyle = 0
    })
  })
  describe('button prop test', () => {
    const testWrapper = factory({ data: comboBox1 })
    it('controlId test', () => {
      expect(testWrapper.props().controlId).toMatch(`ID_ComboBox1`)
      expect(testWrapper.props().controlId).toBeDefined()
      expect(testWrapper.props().controlId).not.toBeNull()
    })
    const othercomboBox = { ...comboBox1 }
    testWrapper.vm.isRunMode = true
    testWrapper.vm.open = true
    delete othercomboBox.properties.Font
    othercomboBox.properties.BackStyle = !othercomboBox.properties.BackStyle
    othercomboBox.properties.BackColor = '#eeeeee'
    othercomboBox.properties.TextAlign = 2
    othercomboBox.properties.WordWrap = !othercomboBox.properties.WordWrap
    othercomboBox.properties.Enabled = !othercomboBox.properties.Enabled
    othercomboBox.properties.AutoSize = !othercomboBox.properties.AutoSize
    othercomboBox.properties.Locked = !othercomboBox.properties.Locked
    othercomboBox.properties.Visible = !othercomboBox.properties.Visible
    othercomboBox.properties.SpecialEffect = 0
    othercomboBox.properties.BorderStyle = 0
    othercomboBox.properties.ColumnWidths = ''
    testWrapper.setProps({ data: othercomboBox })
  })
})
