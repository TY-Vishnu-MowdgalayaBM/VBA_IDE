// @ts-nocheck
import { shallowMount } from '@vue/test-utils'
import FDListBox from './index.vue'
import store from '@/store/index.ts'
import { ControlPropertyData } from '../../../models/ControlsTableProperties/ControlPropertyData'

const controlObj = new ControlPropertyData()
const listBox1 = controlObj.data.ListBox
const propsObj = {
  userFormId: 'ID_USERFORM1',
  controlId: 'ID_ListBox1',
  containerId: 'ID_USERFORM1'
}

const factory = (propsArg: Object) => {
  return shallowMount(FDListBox, {
    propsData: {
      ...propsObj,
      ...propsArg
    },
    store
  })
}

describe('FDListBox.vue', () => {
  describe('render and default test', () => {
    const testWrapper = factory({ data: listBox1 })
    it('instance test', () => {
      expect(testWrapper.isVueInstance()).toBe(true)
    })
  })
  describe('necessary things check test', () => {
    const testWrapper = factory({ data: listBox1 })
    it('name test', () => {
      expect(testWrapper.name()).toBe('FDListBox')
    })
    it('Data test', () => {
      expect(testWrapper.props().data).not.toBeUndefined()
    })
  })
  describe('event test', () => {
    const testWrapper = factory({ data: listBox1 })
    it('clearMatchEntry blur', () => {
      testWrapper.trigger('blur')
    })
    it('clearMatchEntry()', () => {
      testWrapper.vm.clearMatchEntry()
    })
    it('tableClick()', () => {
      testWrapper.vm.tableClick()
    })
    it('ValueData()', () => {
      testWrapper.vm.ValueData()
    })
    it('textColumnChange()', () => {
      testWrapper.vm.textColumnChange()
    })
    it('multiSelectCheck()', () => {
      testWrapper.props().data.properties.MultiSelect = 1
      // testWrapper.vm.multiSelectCheck()
    })
    it('listCheck()', () => {
      testWrapper.props().data.properties.ListStyle = 1
      // testWrapper.vm.listCheck()
    })
    it('isRunMode true()', () => {
      testWrapper.vm.isRunMode = true
    })
    it('Value check()', () => {
      testWrapper.props().data.properties.Value = 'true'
      // testWrapper.vm.tempData![0][this.properties.BoundColumn! - 1] = 'true'
    })
    it('RowSourceData check()', () => {
      testWrapper.props().data.extraDatas.RowSourceData = ''
      testWrapper.props().data.extraDatas.RowSourceData.length = 0
    })
  })
  describe('button prop test', () => {
    const testWrapper = factory({ data: listBox1 })
    it('controlId test', () => {
      expect(testWrapper.props().controlId).toMatch(`ID_ListBox1`)
      expect(testWrapper.props().controlId).toBeDefined()
      expect(testWrapper.props().controlId).not.toBeNull()
    })
  })
  describe('prop data test', () => {
    const testWrapper = factory({ data: controlObj.data.OptionButton })
    const optionButton = { ...listBox1 }
    testWrapper.vm.isRunMode = true
    delete optionButton.properties.Font
    optionButton.properties.Visible = !optionButton.properties.Visible
    optionButton.properties.BorderStyle = !optionButton.properties.BorderStyle
    optionButton.properties.SpecialEffect = 1
    optionButton.properties.TextAlign = 2
    optionButton.properties.ColumnWidths = ''

    testWrapper.setProps({ data: optionButton })
  })
})
