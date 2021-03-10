// // @ts-nocheck
// import { shallowMount, createLocalVue } from '@vue/test-utils'
// import FDLabel from './index.vue'
// import { Label } from '@/FormDesigner/models/Label.ts'
// import store from '@/store/index.ts'

// // const testData = (store.state as any).fd.userformData['ID_USERFORM1']['ID_Label2']

// const propsObj = {
//   userFormId: 'ID_USERFORM1',
//   controlId: 'ID_Label1',
//   containerId: 'ID_USERFORM1'
// }

// const factory = (propsArg: Object) => {
//   return shallowMount(FDLabel, {
//     propsData: {
//       ...propsObj
//     },
//     store
//   })
// }

// describe('FDLabel.vue', () => {
//   describe('render and default test', () => {
//     const testWrapper = factory(propsObj)
//     it('instance test', () => {
//       expect(testWrapper.isVueInstance()).toBe(true)
//     })
//   })
//   describe('necessary things check test', () => {
//     const testWrapper = factory(propsObj)
//     it('name test', () => {
//       expect(testWrapper.name()).toBe('FDLabel')
//     })
//     it('propControlData test', () => {
//       expect(testWrapper.vm.propControlData).not.toBeUndefined()
//     })
//   })
//   describe('event test', () => {
//     const testWrapper = factory(propsObj)
//     it('keydown delete test', () => {
//       testWrapper.trigger('click')
//     })
//     it('click test', () => {
//       testWrapper.trigger('keydown.delete')
//     })
//   })
//   Label.properties.SpecialEffect = 1
//   Label.properties.AutoSize = true
//   Label.properties.Accelerator = 'a'
//   Label.properties.BackStyle = 1
//   Label.properties.WordWrap = false
//   Label.properties.Enabled = false
//   Label.properties.MousePointer = 0
//   Label.properties.FontItalic = false
//   Label.properties.FontBold = true
//   Label.properties.Visible = false
//   describe('label prop test', () => {
//     const testWrapper = factory(propsObj)
//     it('propControlData null test', () => {
//       expect(testWrapper.vm.propControlData).not.toBeNull()
//     })
//   })
// })
