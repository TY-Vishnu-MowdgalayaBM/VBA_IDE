import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { controlProperties } from '@/FormDesigner/controls-properties'
import { Action, State } from 'vuex-class'
import { IdeleteControl, IselectControl, IupdateControl, IupdateControlExtraData } from '@/storeModules/fd/actions'
import FDCommonMethod from './FDCommonMethod'
import { EventBus } from '@/FormDesigner/event-bus'

@Component({
  name: 'FdSelectVue'
})
export default class FdSelectVue extends FDCommonMethod {
  isMoveWhenMouseDown = false
  /**
   * select mode : false / edit mode : true
   */
  isEditMode = false
  @Prop({ required: true, type: String }) public userFormId!: string
  @Prop({ required: true, type: String }) public controlId!: string

  @State((state:rootState) => state.fd.isRunMode) isRunMode!: fdState['isRunMode']
  @State(state => state.fd.selectedControls) selectedControls!: fdState['selectedControls']
  @State(state => state.fd.userformData) userformData!: userformData
  @Action('fd/selectControl') selectControl!: (payload: IselectControl) => void;
  @Action('fd/deleteControl') deleteControl!: (payload: IdeleteControl) => void;
  @Action('fd/updateControl') updateControl!: (payload: IupdateControl) => void;
  @Action('fd/updateControlExtraData') updateControlExtraData!: (payload: IupdateControlExtraData) => void;

  positions: IMousePosition = {
    clientX: 0,
    clientY: 0,
    movementX: 0,
    movementY: 0
  };
  resizeDiv: string = '';
  isMoving: boolean = false

  setEditMode (contentEditable: boolean) {
    if (this.selectedControls[this.userFormId].selected.includes(this.controlId)) {
      this.isEditMode = contentEditable
    }
  }

  updateControlAction (propertyName: keyof controlProperties, propertyValue: number, controlId: string) {
    this.updateControl({
      userFormId: this.userFormId,
      controlId: controlId,
      propertyName: propertyName,
      value: propertyValue
    })
  }

  controlEditMode (e: MouseEvent) {
    if (this.isEditMode) {
      e.stopPropagation()
    }
  }

  updateIsMove (value: boolean) {
    if (value === true) {
      this.isMoveWhenMouseDown = value
    }
    this.isMoving = value
  }
  updateEditMode (value: boolean) {
    this.isEditMode = value
  }
  private updateUserFormResize (value: IResizeValue) {
    if (value.handler === 'br') {
      this.updateControlAction('Width', value.x, this.userFormId)
      this.updateControlAction('Height', value.y, this.userFormId)
    } else if (value.handler === 'bm') {
      this.updateControlAction('Height', value.y, this.userFormId)
    } else if (value.handler === 'mr') {
      this.updateControlAction('Width', value.x, this.userFormId)
    }
  }
  private updateResize (value: IResizeValue) {
    const controlType = this.userformData[this.userFormId][this.controlId].type
    const dragResizectrlArray =
    (controlType === 'Frame' || controlType === 'MultiPage') && !this.selectedControlArray.includes(this.controlId)
      ? [this.controlId]
      : this.selectedControlArray
    for (let i of dragResizectrlArray) {
      if (!i.startsWith('group')) {
        const dragResizeControl: controlProperties = this.userformData[this.userFormId][i].properties
        const controlType: string = this.userformData[this.userFormId][i].type
        const top = (dragResizeControl.Top!) - value.y
        const left = (dragResizeControl.Left!) - value.x
        let incWidth = (dragResizeControl.Width! + value.x) > 0 ? (dragResizeControl.Width! + value.x) : 0
        let incHeight = (dragResizeControl.Height! + value.y) > 0 ? (dragResizeControl.Height! + value.y) : 0
        let decWidth = (dragResizeControl.Width! - value.x) > 0 ? (dragResizeControl.Width! - value.x) : 0
        let decHeight = (dragResizeControl.Height! - value.y) > 0 ? (dragResizeControl.Height! - value.y) : 0
        decHeight = controlType === 'CheckBox' && decHeight < 13 ? 13 : decHeight
        decWidth = controlType === 'CheckBox' && decWidth < 10 ? 10 : decWidth
        incHeight = controlType === 'CheckBox' && incHeight < 13 ? 13 : incHeight
        incWidth = controlType === 'CheckBox' && incWidth < 10 ? 10 : incWidth
        decHeight = controlType === 'OptionButton' && decHeight < 15 ? 15 : decHeight
        decWidth = controlType === 'OptionButton' && decWidth < 14 ? 14 : decWidth
        incHeight = controlType === 'OptionButton' && incHeight < 15 ? 15 : incHeight
        incWidth = controlType === 'OptionButton' && incWidth < 14 ? 14 : incWidth
        if (value.handler === 'drag') {
          if (value.x !== 0 || value.y !== 0) {
            this.isMoveWhenMouseDown = true
          }
          this.updateControlAction('Top', top, i)
          this.updateControlAction('Left', left, i)
        } else {
          if (value.handler.includes('t')) {
            if (incHeight > 0) {
              this.updateControlAction('Top', top, i)
            }
            this.updateControlAction('Height', incHeight, i)
          } else if (value.handler.includes('b')) {
            this.updateControlAction('Height', decHeight, i)
          }
          if (value.handler.includes('l')) {
            if (incWidth > 0) {
              this.updateControlAction('Left', left, i)
            }
            this.updateControlAction('Width', incWidth, i)
          } else if (value.handler.includes('r')) {
            this.updateControlAction('Width', decWidth, i)
          }
        }
      }
    }
  }

  get selectedContainer () {
    return this.selectedControls[this.userFormId].container
  }
  get selectedControlArray () {
    return this.selectedControls[this.userFormId].selected
  }
  get propControlData (): controlData {
    return this.userformData[this.userFormId][this.userFormId]
  }

  updateModelHandle (updateData: IupdateDataModel) {
    this.updateControl({
      userFormId: this.userFormId,
      controlId: this.controlId,
      propertyName: updateData.propertyName,
      value: updateData.value
    })
  }

  updateModelExtraDataHandle (updateData: IupdateDataModelExtraData) {
    this.updateControlExtraData({
      userFormId: this.userFormId,
      controlId: this.controlId,
      propertyName: updateData.propertyName,
      value: updateData.value
    })
  }
  bringFront () {
    const container = this.selectedControls[this.userFormId].container[0]
    if (container) {
      this.swapZIndex(
        this.userformData[this.userFormId][container].controls.length
      )
    }
  }
  getMouseCursor (controlId: string, callback: Function) {
    const cursorProp = this.mousePointerToDisplay(controlId)
    callback(cursorProp)
  }

  mousePointerToDisplay (controlId: string) {
    const containerList = this.getContainerList(controlId)
    let currentCursor = 0
    let conatinerIndex = 0
    for (let index = 0; index < containerList.length; index++) {
      if (this.userformData[this.userFormId][containerList[index]].properties.MousePointer !== 0 && this.userformData[this.userFormId][containerList[index]].properties.MousePointer !== undefined) {
        currentCursor = this.userformData[this.userFormId][containerList[index]].properties.MousePointer!
        conatinerIndex = index
        break
      }
    }
    const cursorValue = controlProperties.mousePointerProp(this.userformData[this.userFormId][containerList[conatinerIndex]])
    return cursorValue
  }
  created () {
    EventBus.$on('getMouseCursor', this.getMouseCursor)
  }
  destroyed () {
    EventBus.$off('getMouseCursor')
  }
}
