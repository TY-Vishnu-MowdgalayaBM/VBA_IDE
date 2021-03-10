// @ts-nocheck
import { shallowMount } from '@vue/test-utils'
import FDFrame from './index.vue'
import store from '@/store/index.ts'
import { ControlPropertyData } from '../../../models/ControlsTableProperties/ControlPropertyData'

const controlObj = new ControlPropertyData()
const frame2 = controlObj.data.Frame
const propsObj = {
  userFormId: 'ID_USERFORM1',
  controlId: 'ID_Frame1',
  containerId: 'ID_USERFORM1',
  isEditMode: false
}

const factory = (propsArg: Object) => {
  return shallowMount(FDFrame, {
    propsData: {
      ...propsObj,
      ...propsArg
    },
    store
  })
}

describe('FDFrame.vue', () => {
  describe('render and default test', () => {
    const testWrapper = factory({ data: frame2 })
    it('instance test', () => {
      expect(testWrapper.isVueInstance()).toBe(true)
    })
  })
  describe('necessary things check test', () => {
    const testWrapper = factory({ data: frame2 })
    it('name test', () => {
      expect(testWrapper.name()).toBe('FDFrame')
    })
    it('propControlData test', () => {
      expect(testWrapper.props().data).not.toBeUndefined()
    })
  })
  describe('event test', () => {
    const testWrapper = factory({ data: frame2 })
    it('click test', () => {
      testWrapper.trigger('click')
    })
    it('delete test', () => {
      testWrapper.trigger('keydown.delete')
      testWrapper.vm.selectedControls[propsObj.userFormId].selected[0] = 'ID_Frame1'
      testWrapper.trigger('keydown.delete')
    })
    it('contextmenu test', () => {
      testWrapper.trigger('contextmenu.stop')
    })
    it('mousedown test', () => {
      testWrapper.trigger('mousedown')
      testWrapper.vm.selectedControls[propsObj.userFormId].container[0] = 'ID_Frame1'
      testWrapper.trigger('mousedown')
    })
    it('mouseup test', () => {
      testWrapper.trigger('mouseup')
    })
    it('keydown.ctrl.exact.stop test', () => {
      testWrapper.trigger('keydown.ctrl.exact.stop')
    })
    
  })
  describe('method test', () => {
    const testWrapper = factory({ data: frame2 })
    it('createBackgroundString method', () => {
      testWrapper.props().data.properties.Picture = ''
      const a = testWrapper.vm.createBackgroundString
      expect(a).toBe('url()')
    })
    it('delete test', () => {
      testWrapper.trigger('keydown.delete')
    })
    it('closeMenu test', () => {
      testWrapper.vm.closeMenu()
    })
  })
  describe('frame prop test', () => {
    const testWrapper = factory({ data: frame2 })
    it('controlId test', () => {
      expect(testWrapper.props().controlId).toMatch(`ID_Frame1`)
      expect(testWrapper.props().controlId).toBeDefined()
      expect(testWrapper.props().controlId).not.toBeNull()
    })
    it('prop test', () => {
      const otherFrame = { ...frame2 }
      delete otherFrame.properties.Font
      otherFrame.properties.SpecialEffect = 1
      otherFrame.properties.BorderStyle = 1
      otherFrame.properties.BorderColor = '#eeeeee'
      otherFrame.properties.BackColor = '#eeeeee'
      otherFrame.properties.ScrollLeft = 10
      otherFrame.properties.ScrollTop = 10
      otherFrame.properties.Enabled = !otherFrame.properties.Enabled
      otherFrame.properties.Visible = !otherFrame.properties.Visible
      otherFrame.properties.Picture = 'url("data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAMQOAADEDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADb2+T/AAAAAAAAAAEAAAAAAAAAAAAAAACQkJOjioqM/5KSj/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/f3+/ri4uf+ioqT+qqqs/aurrf6NjYr/k5OS/q2tq/69vb/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP39/v+zs7T/paWn/7a2uP++vr7/wcHC/8TExf/Hx8n/uLi4/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACoqKj/ysrL/wAAAADCwsJo4uLj/vT08v/39/b/2tra/7CwsP8AAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAApaWn/8vLz/8AAAAAAAAAAAAAAAAAAAAA7+/v/+Pj5P5OTkv/AAAAAAAAAAAAAAAAsbG0/19fYzMAAAAAV1dW/9LS0P+zs7f+m5uiuwAAAAIAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACBwcK/wEBAP/w8fL/wcG8/ru7vP+2trT/pqal/5aWlf+IiIf/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/h0hIP45OTv/AwEB/rKxr//o6Of/39/e/9zc3v/Hx8j+xcXD/8HBxP4AAAAAAAAAAAAAAAAAAAAAAAAAAJ2dnP00MjP/SUdH/wUECv/BwMf////9//z8/P/8/Pz/6urp/+Tk5v/h4eX/AAAAAAAAAAAAAAAAAAAAAAEBAAQDAgD/NTUw/wADAP/z9PH/8vLy//Pz8v/z8/X/9fX2//f3+P/6+vf//Pz5/wAAAAAAAAAAAAAAAAAAAABsbGz/MC8z/jYzNP/a29j+19fZ/9TU1f/S0tP/0dHR/9HR0f/T09P/09PV/9XV1v8AAAAAAAAAAAAAAAAAAAAAOTk2/zMzMv/s7e/+8PHv//Px8v76+fb//Pz6/v7+/v/////+///+/v39+/7o6Oz+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAP//AAD+/AAA/3cAAP4AAAD+cAAA/noAAOz/AADEHwAA6F8AAMAPAACADwAAUA8AACr/AAD//wAA//8AAA==")'
      testWrapper.setProps({ data: otherFrame })
    })
  })
})
