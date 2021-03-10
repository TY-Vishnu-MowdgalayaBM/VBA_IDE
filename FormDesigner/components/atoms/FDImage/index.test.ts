// @ts-nocheck
import { shallowMount } from '@vue/test-utils'
import FDImage from './index.vue'
import store from '@/store/index.ts'
import { ControlPropertyData } from '@/FormDesigner/models/ControlsTableProperties/ControlPropertyData'
const controlObj = new ControlPropertyData()
const image1 = controlObj.data.Image

const propsObj = {
  userFormId: 'ID_USERFORM1',
  controlId: 'ID_Image1',
  containerId: 'ID_USERFORM1',
  isRunMode: false
}

const factory = (propsArg: Object) => {
  return shallowMount(FDImage, {
    propsData: {
      ...propsObj,
      ...propsArg
    },
    store
  })
}

describe('FDImage.vue', () => {
  describe('render and default test', () => {
    const testWrapper = factory({ data: image1 })
    it('instance test', () => {
      expect(testWrapper.isVueInstance()).toBe(true)
    })
  })
  describe('necessary things check test', () => {
    const testWrapper = factory({ data: image1 })
    it('name test', () => {
      expect(testWrapper.name()).toBe('FDImage')
    })
    it('propControlData test', () => {
      expect(testWrapper.props().data).not.toBeUndefined()
    })
  })
  describe('event test', () => {
    const testWrapper = factory({ data: image1 })
    it('click test', () => {
      testWrapper.trigger('click')
    })
    it('delete test', () => {
      testWrapper.trigger('keydown.delete')
    })
  })
  describe('image prop test', () => {
    const testWrapper = factory({ data: image1 })
    it('controlId test', () => {
      expect(testWrapper.props().controlId).toMatch(`ID_Image1`)
      expect(testWrapper.props().controlId).toBeDefined()
      expect(testWrapper.props().controlId).not.toBeNull()
    })
    const otherImage = { ...image1 }
    otherImage.properties.BackStyle = 0
    otherImage.properties.SpecialEffect = 1
    otherImage.properties.Visible = !otherImage.properties.Visible
    otherImage.properties.AutoSize = !otherImage.properties.AutoSize
    otherImage.properties.Picture = 'url("data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAMQOAADEDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADb2+T/AAAAAAAAAAEAAAAAAAAAAAAAAACQkJOjioqM/5KSj/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/f3+/ri4uf+ioqT+qqqs/aurrf6NjYr/k5OS/q2tq/69vb/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP39/v+zs7T/paWn/7a2uP++vr7/wcHC/8TExf/Hx8n/uLi4/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACoqKj/ysrL/wAAAADCwsJo4uLj/vT08v/39/b/2tra/7CwsP8AAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAApaWn/8vLz/8AAAAAAAAAAAAAAAAAAAAA7+/v/+Pj5P5OTkv/AAAAAAAAAAAAAAAAsbG0/19fYzMAAAAAV1dW/9LS0P+zs7f+m5uiuwAAAAIAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACBwcK/wEBAP/w8fL/wcG8/ru7vP+2trT/pqal/5aWlf+IiIf/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/h0hIP45OTv/AwEB/rKxr//o6Of/39/e/9zc3v/Hx8j+xcXD/8HBxP4AAAAAAAAAAAAAAAAAAAAAAAAAAJ2dnP00MjP/SUdH/wUECv/BwMf////9//z8/P/8/Pz/6urp/+Tk5v/h4eX/AAAAAAAAAAAAAAAAAAAAAAEBAAQDAgD/NTUw/wADAP/z9PH/8vLy//Pz8v/z8/X/9fX2//f3+P/6+vf//Pz5/wAAAAAAAAAAAAAAAAAAAABsbGz/MC8z/jYzNP/a29j+19fZ/9TU1f/S0tP/0dHR/9HR0f/T09P/09PV/9XV1v8AAAAAAAAAAAAAAAAAAAAAOTk2/zMzMv/s7e/+8PHv//Px8v76+fb//Pz6/v7+/v/////+///+/v39+/7o6Oz+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAP//AAD+/AAA/3cAAP4AAAD+cAAA/noAAOz/AADEHwAA6F8AAMAPAACADwAAUA8AACr/AAD//wAA//8AAA==")'
    testWrapper.setProps({ data: otherImage })
    it('autoSize test', () => {
      otherImage.properties.AutoSize = !otherImage.properties.AutoSize
      expect(testWrapper.props().data.properties.AutoSize).toBe(false)
    })
  })
})
