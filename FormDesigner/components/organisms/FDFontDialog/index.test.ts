
// @ts-nocheck
import { shallowMount } from '@vue/test-utils'
import FDFontDialog from './index.vue'
import store from '@/store/index.ts'

const propsObj = {
  value: {
    FontName: 'Arial',
    FontSize: 10,
    FontBold: false,
    FontItalic: true,
    FontUnderline: true,
    FontStrikethrough: true,
    FontStyle: 'Arial Narrow Italic'
  },
  isOpen: true
}

const factory = (propsArg: Object) => {
  return shallowMount(FDFontDialog, {
    propsData: {
      ...propsObj,
      ...propsArg
    },
    store
  })
}

describe('FDFontDialog.vue', () => {
  describe('render and default test', () => {
    const testWrapper = factory(propsObj)
    it('instance test', () => {
      expect(testWrapper.isVueInstance()).toBe(true)
    })
  })
  describe('necessary things check test', () => {
    const testWrapper = factory(propsObj)
    it('name test', () => {
      expect(testWrapper.name()).toBe('FDFontDialog')
    })
  })
  describe('event test', () => {
    const testWrapper = factory(propsObj)
    it('click test', () => {
      const target = testWrapper.find('div')
      target.trigger('click')
    })
    it('change event test', () => {
      const target = testWrapper.find('.inputClass')
      target.element.value = 'Underline'
      target.trigger('change')
      testWrapper.vm.isFontStrikeOut = true
      testWrapper.vm.isFontUnderline = false
      target.element.value = 'Underline'
      target.trigger('change')
      testWrapper.vm.isFontStrikeOut = false
      testWrapper.vm.isFontUnderline = true
      target.element.value = 'Underline'
      target.trigger('change')
      testWrapper.vm.isFontStrikeOut = false
      testWrapper.vm.isFontUnderline = false
      target.element.value = 'Underline'
      target.trigger('change')
    })
  })
  describe('methods test', () => {
    const testWrapper = factory(propsObj)
    it('size value click test', () => {
      testWrapper.vm.sizeValue('12')
    })
    it('changeFont method test', () => {
      testWrapper.vm.changeFont('Bahnschrift')
    })

    it('changeStyle method test', () => {
      testWrapper.vm.changeStyle('Bahnschrift')
      testWrapper.vm.changeStyle('')
    })
    it('fontStyleObj method test', () => {
      testWrapper.vm.$props.isOpen = false
    })
    it('emitFont method test', () => {
      testWrapper.vm.emitFont(propsObj.value)
    })
    it('setFontDialogVisiblilty method test', () => {
      testWrapper.vm.setFontDialogVisiblilty(true)
    })
    it('updateFont method test', () => {
      testWrapper.vm.fontWeight = 'bold'
      testWrapper.vm.fontStyle1 = 'italic'
      testWrapper.vm.updateFont()
      testWrapper.vm.fontWeight = ''
      testWrapper.vm.fontStyle1 = 'italic'
      testWrapper.vm.updateFont()
      testWrapper.vm.fontWeight = 'bold'
      testWrapper.vm.fontStyle1 = ''
      testWrapper.vm.updateFont()
      testWrapper.vm.fontWeight = ''
      testWrapper.vm.fontStyle1 = ''
      testWrapper.vm.updateFont()
    })
  })
})
