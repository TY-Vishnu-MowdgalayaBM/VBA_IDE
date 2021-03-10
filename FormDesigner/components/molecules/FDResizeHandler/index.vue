<template>
  <div>
    <div v-for="handlerName in handlers" :key="handlerName">
      <div
        v-if="controlType === 'control'"
        :class="[getMainSelected ? `handle handle-${handlerName}`: null]"
        :style="handlerStyle"
        @mousedown.stop="handleMouseDown($event, handlerName, controlType, controlId)"
      ></div>

      <div
        v-else-if="controlType === 'userform'"
        :class="[`userFormHandle userFormHandle-${handlerName}`]"
        @mousedown.stop="handleMouseDown($event, handlerName, controlType, userFormId)"
      ></div>
    </div>
    <div v-show="isMove" class="m-top-b move-border" :style="getTStyle" />
    <div v-show="isMove" class="m-right-b move-border" :style="getRStyle"/>
    <div v-show="isMove" class="m-bottom-b move-border" :style="getBStyle"/>
    <div v-show="isMove" class="m-left-b move-border" :style="getLStyle"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { EventBus } from '@/FormDesigner/event-bus'
import FDCommonMethod from '@/api/abstract/FormDesigner/FDCommonMethod'
@Component({
  name: 'Resizehandler',
  components: {}
})
export default class Resizehandler extends FDCommonMethod {
  $el: HTMLDivElement
  @State((state) => state.fd.selectedControls) selectedControls!: fdState['selectedControls'];
  @State((state) => state.fd.userformData) userformData!: userformData;

  @Prop({ required: true, type: String }) public controlId!: string;
  @Prop({ required: true, type: String }) public userFormId: string;
  @Prop({ required: true, type: String }) public controlType: string;
  @Prop() public size: {width: number, height: number, left: number, top: number}
  isGroupControl: boolean = false

  positions: IMousePosition = {
    clientX: 0,
    clientY: 0,
    movementX: 0,
    movementY: 0,
    offsetX: 0,
    offsetY: 0
  };
  resizeDiv: string = '';
  handlerPosition: IMouseHandler = {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    movementX: 0,
    movementY: 0
  }

  handlers: Array<String> = ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'];

  isGroupActivated: number = -1
  isSelContainerList: string[] = []
  currentMouseDownEvent: CustomMouseEvent | null = null
  @Emit('updateResize')
  private updateResize (value: IResizeValue) {
    return value
  }
  @Emit('muldragControl')
  private muldragControl (event: MouseEvent, handler: string) {
    return { event: event, handler: handler }
  }
  @Emit('updateModel')
  updateDataModel (updateData: IupdateDataModel) {
    return updateData
  }

  @Emit('updateUserFormResize')
  private updateUserFormResize (value: IResizeValue) {
    return value
  }
  @Emit('createGroup')
  createGroup (groupId: string) {
    return groupId
  }

  @Emit('updateIsMove')
  updateIsMove (val: boolean) {
    return val
  }

  isMove = false
  isMainSelect = false
  isSelctedControl: string = ''
  currentELPosition: any = null
  created () {
    EventBus.$on('getMoveValue', this.getMoveValue)
    EventBus.$on('startMoveControl', this.startMoveControl)
    EventBus.$on('moveControl', this.moveControl)
    EventBus.$on('elementDrag', this.elementDrag)
    EventBus.$on('endMoveControl', this.endMoveControl)
    EventBus.$on('resizeGroupControl', this.resizeGroupControl)
    EventBus.$on('startResizeGroupControl', this.startResizeGroupControl)
  }
  destroyed () {
    EventBus.$off('getMoveValue', this.getMoveValue)
    EventBus.$off('startMoveControl', this.startMoveControl)
    EventBus.$off('moveControl', this.moveControl)
    EventBus.$off('elementDrag', this.elementDrag)
    EventBus.$off('endMoveControl', this.endMoveControl)
    EventBus.$off('resizeGroupControl', this.resizeGroupControl)
    EventBus.$off('startResizeGroupControl', this.startResizeGroupControl)
  }
  getMoveValue (callBack: Function) {
    if (this.isMainSelect) {
      if (this.userformData[this.userFormId][this.controlId].type === 'Frame' || this.userformData[this.userFormId][this.controlId].type === 'MultiPage') {
        callBack(this.positions.offsetX, this.positions.offsetY, this.isSelctedControl, this.getContainerList(this.isSelctedControl)[0])
      } else {
        callBack(this.positions.offsetX, this.positions.offsetY, this.controlId)
      }
    }
  }
  startResizeGroupControl (event: MouseEvent, handler: string) {
    const control = this.userformData[this.userFormId][this.controlId]
    if (control.type !== 'Userform') {
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      this.handlerPosition.left = 0
      this.handlerPosition.top = 0
      this.handlerPosition.width = this.size.width
      this.handlerPosition.height = this.size.height
      this.resizeDiv = handler
    }
  }
  startMoveControl (event: MouseEvent, handler: string, containerList: string[]) {
    this.isSelContainerList = containerList
    EventBus.$emit('handleName', 'notDrag')
    if (this.getIsMoveTarget && this.size) {
      this.resizeDiv = handler
      this.handlerPosition.left = 0
      this.handlerPosition.top = 0
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      this.handlerPosition.width = this.size.width
      this.handlerPosition.height = this.size.height
    }
  }
  updateMoveBorder (control: string) {
    const userData = this.userformData[this.userFormId]
    const containerList = this.selectedControls[this.userFormId].container
    const containerControls = userData[this.isSelContainerList[0]].controls
    if (containerControls.includes(control) && (this.getSelectedControlsDatas!.includes(control) || containerList.includes(control))) {
      this.isMove = true
    }
  }

  updateGroupMoveBorder (control: string) {
    this.isMove = true
  }

  moveControl (event: MouseEvent, controltype: string) {
    if (controltype === 'groupControlDrag') {
      if (this.getSelectedControlsDatas!.includes(this.controlId)) {
        this.moveGroupControlBorder(event)
        this.updateGroupMoveBorder(this.controlId)
      }
    } else {
      if (this.getIsMoveTarget) {
        this.moveBorder(event)
        if (event.movementX !== 0 && event.movementY !== 0) {
          if (this.currentMouseDownEvent && (event.movementX !== 0 || event.movementY !== 0)) {
            this.currentMouseDownEvent.customCallBack && this.currentMouseDownEvent.customCallBack()
          }
          this.updateIsMove(true)
          const containerType = this.userformData[this.userFormId][this.controlId].type
          if (containerType === 'Frame' || containerType === 'MultiPage') {
            EventBus.$emit('handleName', 'frameDrag')
          } else {
            EventBus.$emit('handleName', 'drag')
          }
        }
      }
      this.updateMoveBorder(this.controlId)
    }
  }
  endMoveControl (val: string) {
    if (val === 'groupEndMove') {
      this.positions.movementX = 0
      this.positions.movementY = 0
      this.isMove = false
    } else {
      if (this.getIsMoveTarget) {
        this.positions.movementX = 0
        this.positions.movementY = 0
        this.isMove = false
      }
    }
    this.isSelctedControl = ''
    this.updateIsMove(false)
  }
  /**
   * @description Implementation  of Logic for resize and drag the control and userform, it preserve initial position of control/userform position
   * @function handleMouseDown
   * @param event it is type of  MouseEvent
   * @param handler specifies handlerName(for example topLeft, BottomRight etc)
   * @param controlType To differentiate between userform and control resize logic
   */
  handleMouseDown (event: CustomMouseEvent, handler: string, controlType: string, controlID: string) {
    this.isSelctedControl = controlID
    this.updateIsMove(false)
    EventBus.$emit('handleName', 'notDrag')
    const controlGroup = this.userformData[this.userFormId][this.controlId].properties.GroupID
    this.isGroupActivated = this.selectedControls[this.userFormId].selected.findIndex((val: string) => val.startsWith('group'))
    if (this.isGroupActivated === -1 || (controlGroup === '' && !this.selectedControl.includes(this.controlId))) {
      this.resizeDiv = handler
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      this.currentMouseDownEvent = event
      if (controlType === 'control') {
        const containerType = this.userformData[this.userFormId][this.controlId].type
        if (handler !== 'drag') {
          this.isMainSelect = true
          EventBus.$emit('startMoveControl', event, handler, this.getContainerList(this.isSelctedControl))
          document.onmousemove = (event: MouseEvent) => { EventBus.$emit('elementDrag', event) }
        } else {
          this.positions.offsetX = event.offsetX
          this.positions.offsetY = event.offsetY
          this.isMainSelect = true
          EventBus.$emit('startMoveControl', event, handler, this.getContainerList(this.isSelctedControl))
          document.onmousemove = (event: MouseEvent) => { EventBus.$emit('moveControl', event) }
        }
      } else {
        document.onmousemove = this.userFormResize
      }
      document.onmouseup = this.closeDragElement
    } else {
      this.muldragControl(event, handler)
    }
  }

  moveBorder (event: MouseEvent) {
    event.preventDefault()
    this.positions.movementX = this.positions.clientX - event.clientX
    this.positions.movementY = this.positions.clientY - event.clientY
    const scale: number = (this.propControlData.properties.Zoom! * 1) / 100
    const grid: Array<number> = [9, 9]
    const x: number =
      Math.round(this.positions.movementX / scale / grid[0]) * grid[0]
    const y: number =
      Math.round(this.positions.movementY / scale / grid[1]) * grid[1]

    this.positions.movementX = x
    this.positions.movementY = y
  }
  moveGroupControlBorder (event: MouseEvent) {
    event.preventDefault()
    this.resizeDiv = 'drag'
    this.isGroupControl = true
    this.positions.movementX = this.positions.clientX - event.clientX
    this.positions.movementY = this.positions.clientY - event.clientY
    const scale: number = (this.propControlData.properties.Zoom! * 1) / 100
    const grid: Array<number> = [9, 9]
    const x: number =
      Math.round(this.positions.movementX / scale / grid[0]) * grid[0]
    const y: number =
      Math.round(this.positions.movementY / scale / grid[1]) * grid[1]

    this.positions.movementX = x
    this.positions.movementY = y
  }
  get getLStyle () {
    if (this.resizeDiv === 'drag') {
      return this.size ? {
        left: `${-this.positions.movementX}px`,
        top: `${-this.positions.movementY}px`,
        height: this.isGroupControl ? `${this.size.height}px !important` : '100%'
      } : null
    } else {
      return this.size ? {
        left: `${-this.handlerPosition.left}px !important`,
        top: `${-this.handlerPosition.top}px !important`,
        height: `${this.handlerPosition.height}px !important`
      } : null
    }
  }
  get getTStyle () {
    if (this.resizeDiv === 'drag') {
      return this.size ? {
        left: `${-this.positions.movementX}px`,
        top: `${-this.positions.movementY}px`,
        width: this.isGroupControl ? `${this.size.width}px !important` : '100%'
      } : null
    } else {
      return this.size ? {
        left: `${-this.handlerPosition.left}px`,
        top: `${-this.handlerPosition.top}px`,
        width: `${this.handlerPosition.width}px !important`
      } : null
    }
  }
  get getRStyle () {
    if (this.resizeDiv === 'drag') {
      return this.size ? {
        left: `${this.size.width - this.positions.movementX}px`,
        top: `${-this.positions.movementY}px`,
        height: this.isGroupControl ? `${this.size.height}px !important` : '100%'
      } : null
    } else {
      return this.size ? {
        left: `${this.handlerPosition.width - this.handlerPosition.left}px`,
        height: `${this.handlerPosition.height}px !important`,
        top: `${-this.handlerPosition.top}px !important`
      } : null
    }
  }
  get getBStyle () {
    if (this.resizeDiv === 'drag') {
      return this.size ? {
        left: `${-this.positions.movementX}px`,
        top: `${this.size.height - this.positions.movementY}px`,
        width: this.isGroupControl ? `${this.size.width}px !important` : '100%'
      } : null
    } else {
      return this.size ? {
        top: `${this.handlerPosition.height - this.handlerPosition.top}px`,
        width: `${this.handlerPosition.width}px !important`,
        left: `${-this.handlerPosition.left}px`
      } : null
    }
  }
  /**
   * @description Implementation  of Logic for  resizing the userform
   * @function userFormResize
   * @param event it is type of  MouseEvent
   */
  userFormResize (event: MouseEvent): void {
    event.preventDefault()
    this.positions.movementX = this.positions.clientX - event.clientX
    this.positions.movementY = this.positions.clientY - event.clientY
    this.positions.clientX = event.clientX
    this.positions.clientY = event.clientY

    const decWidth: number =
      this.propControlData.properties.Width! - this.positions.movementX
    const decHeight: number =
      this.propControlData.properties.Height! - this.positions.movementY

    if (decWidth > 102 && decHeight > 29) {
      this.updateUserFormResize({
        x: decWidth,
        y: decHeight,
        handler: this.resizeDiv
      })
    }
  }

  /**
   * @description Implementation  of Logic for resize and drag the control and userform
   * @function elementDrag
   * @param event it is type of  MouseEvent
   */
  elementDrag (event: MouseEvent, controltype: string): void {
    event.preventDefault()
    const userData = this.userformData[this.userFormId]
    const controlType = userData[this.controlId].type
    this.positions.movementX = this.positions.clientX - event.clientX
    this.positions.movementY = this.positions.clientY - event.clientY
    const scale: number = (this.propControlData.properties.Zoom! * 1) / 100
    // const scale1: number = (this.propControlData.properties.Zoom! * 10) / 100
    const grid: Array<number> = (controlType === 'ComboBox' || controlType === 'ListBox' || controlType === 'TextBox') ? [9, userData[this.controlId].properties.Font!.FontSize! + 18] : [9, 9]
    const x: number =
      Math.round(this.positions.movementX / scale / grid[0]) * grid[0]
    const y: number =
      Math.round(this.positions.movementY / scale / grid[1]) * grid[1]
    this.handlerPosition.movementX = x
    this.handlerPosition.movementY = y

    // const diffGridX: number = x - this.positions.movementX
    // const diffGridY: number = y - this.positions.movementY

    // this.positions.clientX = event.clientX - diffGridX
    // this.positions.clientY = event.clientY - diffGridY
    if (this.currentMouseDownEvent && (x !== 0 || y !== 0)) {
      this.currentMouseDownEvent.customCallBack && this.currentMouseDownEvent.customCallBack()
    }
    const selected = this.selectedControls[this.userFormId].selected
    if (selected.length === 1 && selected[0] === this.controlId && this.size) {
      const top = (this.size.height! + y) > 0 ? y : y - (this.size.height! + y)
      const left = (this.size.width! + x) > 0 ? x : x - (this.size.width! + x)
      let incWidth = (this.size.width! + x) > 0 ? (this.size.width! + x) : -(this.size.width! + x)
      let incHeight = (this.size.height! + y) > 0 ? (this.size.height! + y) : -(this.size.height! + y)
      let decWidth = (this.size.width! - x) > 0 ? (this.size.width! - x) : -(this.size.width! - x)
      let decHeight = (this.size.height! - y) > 0 ? (this.size.height! - y) : -(this.size.height! - y)
      decHeight = controlType === 'CheckBox' && decHeight < 13 ? 13 : decHeight
      decWidth = controlType === 'CheckBox' && decWidth < 12 ? 12 : decWidth
      incHeight = controlType === 'CheckBox' && incHeight < 13 ? 13 : incHeight
      incWidth = controlType === 'CheckBox' && incWidth < 12 ? 12 : incWidth
      decHeight = controlType === 'OptionButton' && decHeight < 15 ? 15 : decHeight
      decWidth = controlType === 'OptionButton' && decWidth < 14 ? 14 : decWidth
      incHeight = controlType === 'OptionButton' && incHeight < 15 ? 15 : incHeight
      incWidth = controlType === 'OptionButton' && incWidth < 14 ? 14 : incWidth
      if (this.resizeDiv.includes('t')) {
        this.handlerPosition.top = top
        this.handlerPosition.height = incHeight
      } else if (this.resizeDiv.includes('b')) {
        if ((this.size.height! - y) > 0) {
          this.handlerPosition.height = decHeight
        } else {
          this.handlerPosition.top = decHeight
          this.handlerPosition.height = decHeight
        }
      }
      if (this.resizeDiv.includes('l')) {
        this.handlerPosition.left = left
        this.handlerPosition.width = incWidth
      } else if (this.resizeDiv.includes('r')) {
        if ((this.size.width! - x) > 0) {
          this.handlerPosition.width = decWidth
        } else {
          this.handlerPosition.left = decWidth
          this.handlerPosition.width = decWidth
        }
      }
    } else if (this.size) {
      const top = y
      const left = x
      let incWidth = (this.size.width! + x) > 0 ? (this.size.width! + x) : 0
      let incHeight = (this.size.height! + y) > 0 ? (this.size.height! + y) : 0
      let decWidth = (this.size.width! - x) > 0 ? (this.size.width! - x) : 0
      let decHeight = (this.size.height! - y) > 0 ? (this.size.height! - y) : 0
      if (this.resizeDiv.includes('t')) {
        if (incHeight > 0) {
          this.handlerPosition.top = top
        }
        this.handlerPosition.height = incHeight
      } else if (this.resizeDiv.includes('b')) {
        this.handlerPosition.height = decHeight
      }
      if (this.resizeDiv.includes('l')) {
        if (incWidth > 0) {
          this.handlerPosition.left = left
        }
        this.handlerPosition.width = incWidth
      } else if (this.resizeDiv.includes('r')) {
        this.handlerPosition.width = decWidth
      }
    }
    this.updateMoveBorder(this.controlId)
  }

  resizeGroupControl (event: MouseEvent, positions: IMousePosition): void {
    event.preventDefault()
    const control = this.userformData[this.userFormId][this.controlId]
    if (control.type !== 'Userform' && this.getSelectedControlsDatas!.includes(this.controlId)) {
      this.positions.movementX = positions.clientX - event.clientX
      this.positions.movementY = positions.clientY - event.clientY
      const scale: number = (this.propControlData.properties.Zoom! * 1) / 100
      const scale1: number = (this.propControlData.properties.Zoom! * 10) / 100
      const grid: Array<number> = [scale1, scale1]
      const x: number =
      Math.round(this.positions.movementX / scale / grid[0]) * grid[0]
      const y: number =
      Math.round(this.positions.movementY / scale / grid[1]) * grid[1]
      this.handlerPosition.movementX = x
      this.handlerPosition.movementY = y
      // const diffGridX: number = x - this.positions.movementX
      // const diffGridY: number = y - this.positions.movementY

      // this.positions.clientX = event.clientX - diffGridX
      // this.positions.clientY = event.clientY - diffGridY
      if (this.currentMouseDownEvent && (x !== 0 || y !== 0)) {
        this.currentMouseDownEvent.customCallBack && this.currentMouseDownEvent.customCallBack()
      }

      const top = y
      const left = x
      let incWidth = (this.size.width! + x) > 0 ? (this.size.width! + x) : 0
      let incHeight = (this.size.height! + y) > 0 ? (this.size.height! + y) : 0
      let decWidth = (this.size.width! - x) > 0 ? (this.size.width! - x) : 0
      let decHeight = (this.size.height! - y) > 0 ? (this.size.height! - y) : 0
      if (this.resizeDiv.includes('t')) {
        if (incHeight > 0) {
          this.handlerPosition.top = top
        }
        this.handlerPosition.height = incHeight
      } else if (this.resizeDiv.includes('b')) {
        this.handlerPosition.height = decHeight
      }
      if (this.resizeDiv.includes('l')) {
        if (incWidth > 0) {
          this.handlerPosition.left = left
        }
        this.handlerPosition.width = incWidth
      } else if (this.resizeDiv.includes('r')) {
        this.handlerPosition.width = decWidth
      }
      this.isMove = true
    // if (this.getIsMoveTarget) {
    //   const containerType = this.userformData[this.userFormId][this.controlId].type
    //   if (containerType === 'Frame' || containerType === 'MultiPage') {
    //     if (controltype === containerType) {
    //       this.isMove = true
    //     }
    //   } else {
    //     this.isMove = true
    //   }
    // }
    }
  }

  /**
   * @description To destory the document event(mouseup,mousemove) attached while drag and resize implementation
   * @function closeDragElement
   */
  closeDragElement (): void {
    const selected = this.selectedControls[this.userFormId].selected
    if (this.resizeDiv !== 'drag' && this.controlType !== 'userform') {
      if (selected.length === 1 && selected[0] === this.controlId) {
        this.updateDataModel({ propertyName: 'Width', value: Math.abs(this.handlerPosition.width!) })
        this.updateDataModel({ propertyName: 'Height', value: Math.abs(this.handlerPosition.height!) })
        this.updateDataModel({ propertyName: 'Left', value: this.handlerPosition.left! > 0 ? this.size.left - Math.abs(this.handlerPosition.left!) : Math.abs(this.handlerPosition.left!) + this.size.left })
        this.updateDataModel({ propertyName: 'Top', value: this.handlerPosition.top! > 0 ? this.size.top - Math.abs(this.handlerPosition.top!) : Math.abs(this.handlerPosition.top!) + this.size.top })
      } else {
        this.updateResize({ x: this.handlerPosition.movementX, y: this.handlerPosition.movementY, handler: this.resizeDiv })
      }
    }
    EventBus.$emit('updateIsControlMove', this.isMove)
    EventBus.$emit('endMoveControl')
    this.isMainSelect = false
    this.positions.offsetX = 0
    this.positions.offsetY = 0
    document.onmouseup = null
    document.onmousemove = null
    const groupId = this.userformData[this.userFormId][this.controlId]
      .properties.GroupID
    if (groupId !== '') {
      this.createGroup(groupId!)
    }
  }

  /**
   * @description  To get main and sub selected control details by passing
   * userFormId  which is taken as props from parent Component
   * @function selectedControl
   *
   */
  get selectedControl () {
    return this.selectedControls[this.userFormId].selected
  }

  /**
   * @description style object to dynamically changing the styles of  main and sub selected control in case of multiple selection  based on propControlData
   * @function handlerStyle
   *
   */
  get handlerStyle () {
    return {
      backgroundColor:
        this.selectedControl[0] === this.controlId ? 'white' : 'black',
      borderColor:
        this.selectedControl[0] === this.controlId ? 'black' : 'white'
    }
  }

  /**
   * @description propControlData is abstract class providing implementation to resize UserForm by passing
   * userFormId  which is taken as props from parent Component
   * @function propControlData
   *
   */
  get propControlData (): controlData {
    return this.userformData[this.userFormId][this.userFormId]
  }

  get getMainSelected () {
    return (
      this.selectedControls[this.userFormId].selected.includes(this.controlId) ||
      (this.selectedControls[this.userFormId].container.includes(this.controlId) &&
      this.selectedControls[this.userFormId].selected.includes(this.controlId) !== (this.selectedControls[this.userFormId].container.includes(this.controlId))
      ))
  }

  get getContainerSelect () {
    return this.controlId === this.selectedControls[this.userFormId].container[0]
  }

  get getIsMoveTarget () {
    return this.getMainSelected
  }
}
</script>

<style  scoped>
.move-border {
  z-index: 9999;
  position: absolute;
  border: 0.5px rgb(59, 58, 58) dashed;
}
.m-top-b, .m-bottom-b{
  width: 100%;
}
.m-left-b, .m-right-b{
  height: 100%;
}
.resize-area {
  position: absolute;
  width: 100%;
  height: 100%;
}
.handle {
  box-sizing: border-box;
  position: absolute;
  width: 6px;
  height: 6px;

  background: white;
  border: 1px solid #333;
}
.handleActivate {
  box-sizing: border-box;
  position: absolute;
  width: 6px;
  height: 6px;

  background: black;
  border: 1px solid white;
}
.handle-tl {
  top: -5px;
  left: -5px;
  cursor: nw-resize;
}
.handle-tm {
  top: -5px;
  left: 50%;
  margin-left: -5px;
  cursor: n-resize;
}
.handle-tr {
  top: -5px;
  right: -5px;
  cursor: ne-resize;
}
.handle-ml {
  top: 50%;
  margin-top: -5px;
  left: -5px;
  cursor: w-resize;
}
.handle-mr {
  top: 50%;
  margin-top: -5px;
  right: -5px;
  cursor: e-resize;
}
.handle-bl {
  bottom: -5px;
  left: -5px;
  cursor: sw-resize;
}
.handle-bm {
  bottom: -5px;
  left: 50%;
  margin-left: -5px;
  cursor: s-resize;
}
.handle-br {
  bottom: -5px;
  right: -5px;
  cursor: se-resize;
}
.userFormHandle {
  box-sizing: border-box;
  position: absolute;
  width: 8px;
  height: 8px;
  background: white;
  border: 1px solid #333;
}
.userFormHandle-tl {
  top: -8px;
  left: -8px;
  cursor: nw-resize;
  background: black;
  border: 1px solid white;
  cursor: default;
}
.userFormHandle-tm {
  top: -9px;
  left: 50%;
  margin-left: -8px;
  cursor: n-resize;
  background: black;
  border: 1px solid white;
  cursor: default;
}
.userFormHandle-tr {
  top: -8px;
  right: -8px;
  cursor: ne-resize;
  background: black;
  border: 1px solid white;
  cursor: default;
}
.userFormHandle-ml {
  top: 50%;
  margin-top: -8px;
  left: -9px;
  background: black;
  border: 1px solid white;
  cursor: default;
}
.userFormHandle-mr {
  top: 50%;
  margin-top: -8px;
  right: -9px;
  cursor: e-resize;
}
.userFormHandle-bl {
  bottom: -8px;
  left: -8px;
  cursor: sw-resize;
  background: black;
  border: 1px solid white;
  cursor: default;
}
.userFormHandle-bm {
  bottom: -9px;
  left: 50%;
  margin-left: -8px;
  cursor: s-resize;
}
.userFormHandle-br {
  bottom: -8px;
  right: -8px;
  cursor: se-resize;
}
</style>
