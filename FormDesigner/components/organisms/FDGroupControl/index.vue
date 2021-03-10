<template>
  <div v-if="groupedControls[userFormId].groupArray.length!==0">
   <div
      v-for="(groupName, index) in groupedControls[userFormId].groupArray"
      :class="getGroupEditStyle(groupName)"
      :key="groupName.concat(index)"
      :style="getGroupStyle(groupName)"
      :id="groupName"
      @mousedown="handleMouseDown($event,'drag')"
      @contextmenu.self.stop="openMenu($event,'control')"
    >
    <div
    :style="getGroupStyle(groupName)"
    class="innerGroupStyle"
    :id="groupName"
    @mousedown="innerGroupDivMouseDown"
    @contextmenu="openMenu($event,'container')"
    >
    <div class="handle handle-tl" :style="handlerStyle(groupName)" @mousedown.stop="handleMouseDown($event,'tl')"></div>
      <div class="handle handle-tr" :style="handlerStyle(groupName)" @mousedown.stop="handleMouseDown($event,'tr')"></div>
      <div class="handle handle-tm" :style="handlerStyle(groupName)" @mousedown.stop="handleMouseDown($event,'tm')"></div>
      <div class="handle handle-ml" :style="handlerStyle(groupName)" @mousedown.stop="handleMouseDown($event,'ml')"></div>
      <div class="handle handle-mr" :style="handlerStyle(groupName)" @mousedown.stop="handleMouseDown($event,'mr')"></div>
      <div class="handle handle-bl" :style="handlerStyle(groupName)" @mousedown.stop="handleMouseDown($event,'bl')"></div>
      <div class="handle handle-br" :style="handlerStyle(groupName)" @mousedown.stop="handleMouseDown($event,'br')"></div>
      <div class="handle handle-bm" :style="handlerStyle(groupName)" @mousedown.stop="handleMouseDown($event,'bm')"></div>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import {
  IselectControl,
  IupdateControl,
  IupdateGroup
} from '@/storeModules/fd/actions'
import { State, Action } from 'vuex-class'
import { EventBus } from '@/FormDesigner/event-bus'
import FDCommonMethod from '@/api/abstract/FormDesigner/FDCommonMethod'
@Component({
  name: 'GroupControl',
  components: {}
})
export default class GroupControl extends FDCommonMethod {
  @State((state) => state.fd.groupedControls) groupedControls!: groupedControls;
  @State((state) => state.fd.selectedControls)
  selectedControls!: fdState['selectedControls'];
  @State((state) => state.fd.userformData) userformData!: userformData;
  @State((state:rootState) => state.fd.toolBoxSelect) toolBoxSelect!: fdState['toolBoxSelect']
  @Prop({ required: true, type: Array }) public currentSelectedGroup!: string[];
  @Prop({ required: true, type: String }) public userFormId!: string;
  @Prop({ required: true, type: String }) public containerId!: string;
  @Prop() controlRef: any;

  @Action('fd/updateControl') updateControl!: (payload: IupdateControl) => void;
  @Action('fd/updateGroup') updateGroup!: (payload: IupdateGroup) => void;
  @Action('fd/selectControl') selectControl!: (payload: IselectControl) => void;

  divStyleArray: Array<IGroupStyle> = [];
  resizeDiv: string = '';
  isMouseDownProp: boolean = false

  positions: IMousePosition = {
    clientX: 0,
    clientY: 0,
    movementX: 0,
    movementY: 0,
    offsetX: 0,
    offsetY: 0
  };
  groupName: string = '';
  count: number = 0;
  currentMouseDownEvent: CustomMouseEvent | null = null;
  control: string = ''
  container: string = ''
  createGroup (groupName: string) {
    this.groupStyle(groupName)
  }
  value = 'different'
  isMainSelect = false;
  isMove: boolean = false
  tempEvent = {}

  created () {
    EventBus.$on('getGroupMoveValue', this.getGroupMoveValue)
    EventBus.$on('startGroupMoveControl', this.startGroupMoveControl)
    EventBus.$on('moveGroupControl', this.moveGroupControl)
    EventBus.$on('endGroupMoveControl', this.endGroupMoveControl)
    EventBus.$on('getClientValue', this.getClientValue)
    EventBus.$on('updasteGroupSize', this.updasteGroupSize)
    EventBus.$on('getGroupSize', this.getGroupSize)
    EventBus.$on('groupElementDrag', this.elementDrag)
    EventBus.$on('getGroupDisplay', this.getGroupDisplay)
    EventBus.$on('updateGroupStyle', (groupName: string) => {
      this.groupStyle(groupName)
    })
  }
  getGroupDisplay (groupName: string, callback: Function) {
    const findIndex = this.divStyleArray.findIndex((val) => val.groupName === groupName)
    if (findIndex !== -1) {
      callback(this.divStyleArray[findIndex].display)
    }
  }
  destroyed () {
    EventBus.$off('getGroupMoveValue', this.getGroupMoveValue)
    EventBus.$off('startGroupMoveControl', this.startGroupMoveControl)
    EventBus.$off('moveGroupControl', this.moveGroupControl)
    EventBus.$off('endGroupMoveControl', this.endGroupMoveControl)
    EventBus.$off('getClientValue', this.getClientValue)
    EventBus.$off('updasteGroupSize', this.updasteGroupSize)
    EventBus.$off('getGroupSize', this.getGroupSize)
    EventBus.$off('groupElementDrag', this.elementDrag)
    EventBus.$off('updateGroupStyle')
  }
  convertToGridSize (val: number) {
    const gridSize = 9
    return Math.round(val / gridSize) * gridSize
  }
  updasteGroupSize (propName: keyof controlProperties, propertyValue: number, groupIndex: number) {
    if (this.selectedControls[this.userFormId].container[0] === this.containerId) {
      if (propName === 'GroupID') {
        this.divStyleArray[groupIndex].left = `${this.convertToGridSize(parseInt(this.divStyleArray[groupIndex].left!))}px`
        this.divStyleArray[groupIndex].height = `${this.convertToGridSize(parseInt(this.divStyleArray[groupIndex].height!))}px`
        this.divStyleArray[groupIndex].top = `${this.convertToGridSize(parseInt(this.divStyleArray[groupIndex].top!))}px`
        this.divStyleArray[groupIndex].width = `${this.convertToGridSize(parseInt(this.divStyleArray[groupIndex].width!))}px`
      } else {
        this.groupStyle(this.divStyleArray[groupIndex].groupName!)
        this.updatedValue(groupIndex, propName, propertyValue)
        this.groupStyle(this.divStyleArray[groupIndex].groupName!)
      }
    }
  }
  updatedValue (groupIndex: number, propName: keyof controlProperties, diff: number) {
    for (const j in this.userformData[this.userFormId][this.containerId].controls) {
      const index = this.userformData[this.userFormId][this.containerId].controls[j]
      const controlProp = this.userformData[this.userFormId][index].properties
      const divStyle = this.divStyleArray[groupIndex]
      if (controlProp.GroupID && controlProp.GroupID === divStyle.groupName) {
        if (propName === 'Left') {
          let left: number = diff + this.leftArray[j]
          this.updateControlAction(propName, left, index)
        } else if (propName === 'Top') {
          let top: number = diff + this.topArray[j]
          this.updateControlAction(propName, top, index)
        } else if (propName === 'Width') {
          let left = (diff * this.leftArray[j]) / parseInt(divStyle.width!) + parseInt(divStyle.left!)
          let width = diff * this.percwidthArray[j]
          this.updateControlAction('Left', left, index)
          this.updateControlAction(propName, width, index)
        } else if (propName === 'Height') {
          let top = (diff * this.topArray[j]) / parseInt(divStyle.height!) + parseInt(divStyle.top!)
          let height = diff * this.percheightArray[j]
          this.updateControlAction('Top', top, index)
          this.updateControlAction(propName, height, index)
        }
      }
    }
  }
  getClientValue (value: string, containerX: number, containerY: number, event: MouseEvent, container: string, previousEvent: MouseEvent) {
    this.value = value
    this.container = container
    if (container === this.containerId) {
      this.positions.clientX = previousEvent.clientX
      this.positions.clientY = previousEvent.clientY
      this.positions.offsetX = previousEvent.offsetX
      this.positions.offsetY = previousEvent.offsetY
      this.elementMouseDrag(event, containerX, containerY, previousEvent)
    }
  }
  getGroupMoveValue (callBack: Function) {
    callBack(
      this.positions.offsetX,
      this.positions.offsetY,
      this.control,
      this.tempEvent
    )
  }
  getGroupSize (callBack: Function) {
    if (this.containerId === this.selectedControls[this.userFormId].container[0]) {
      callBack(this.divStyleArray)
    }
  }
  endGroupMoveControl () {
    // if (this.getIsMoveTarget) {
    this.positions.movementX = 0
    this.positions.movementY = 0
    this.positions.clientX = 0
    this.positions.clientY = 0
    this.isMove = false
    // }
  }
  topArray: number[] = [];
  leftArray: number[] = [];

  percwidthArray: number[] = [];
  percheightArray: number[] = [];

  initialArray: Array<IGroupStyle> = [];

  get getIsMoveTarget () {
    const isGroupPrsent = this.selectedControls[this.userFormId].selected.findIndex((val: string) => {
      val.startsWith('group')
    })
    return isGroupPrsent === -1
  }
  startGroupMoveControl (event: MouseEvent) {
    // EventBus.$emit('groupDrag', 'groupdrag')
    if (this.getIsMoveTarget) {
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
    }
  }

  moveGroupControl (event: MouseEvent) {
    if (this.getIsMoveTarget) {
      //   this.moveBorder(event)
      if (event.movementX !== 0 && event.movementY !== 0) {
        EventBus.$emit('isMousedownMove', true)
        EventBus.$emit('moveControl', event, 'groupControlDrag')
        EventBus.$emit('groupDrag', 'groupdrag')
        this.isMove = true
        // this.updateIsMove(true)
      }
    }
  }

  updateControlAction (
    propertyName: keyof controlProperties,
    propertyValue: number,
    controlId: string
  ) {
    this.updateControl({
      userFormId: this.userFormId,
      controlId: controlId,
      propertyName: propertyName,
      value: propertyValue
    })
  }
  handlerStyle (groupName: string) {
    const isGroup: string = this.selectedControls[this.userFormId].selected[0]
    return {
      backgroundColor: isGroup === groupName ? 'white' : 'black',
      borderColor: isGroup === groupName ? 'black' : 'white'
    }
  }
  groupStyle (groupName: string) {
    this.count += 1
    let index = this.divStyleArray.findIndex(
      (p: IGroupStyle) => p.groupName === groupName
    )
    if (index === -1) {
      this.divStyleArray.push({
        left: '0px',
        top: '0px',
        width: '0px',
        height: '0px',
        display: 'none',
        groupName: groupName
      })
    }
    const styleLeft: number[] = []
    const styleWidth: number[] = []
    const styleTop: number[] = []
    const styleHeight: number[] = []
    for (const control of this.userformData[this.userFormId][this.containerId]
      .controls) {
      if (
        this.userformData[this.userFormId][control].properties.GroupID ===
        groupName
      ) {
        const controlprop = this.userformData[this.userFormId][control]
          .properties
        styleLeft.push(controlprop.Left!)
        styleTop.push(controlprop.Top!)
        styleWidth.push(controlprop.Width! + controlprop.Left!)
        styleHeight.push(controlprop.Height! + controlprop.Top!)
      }
    }
    index = this.divStyleArray.findIndex(
      (p: IGroupStyle) => p.groupName === groupName
    )
    this.divStyleArray[index].left = `${Math.min(...styleLeft)}px`
    this.divStyleArray[index].top = `${Math.min(...styleTop)}px`
    this.divStyleArray[index].width = `${
      Math.max(...styleWidth) - Math.min(...styleLeft)
    }px`
    this.divStyleArray[index].height = `${
      Math.max(...styleHeight) - Math.min(...styleTop)
    }px`

    this.topArray = []
    this.leftArray = []

    this.percwidthArray = []
    this.percheightArray = []

    for (const control of this.userformData[this.userFormId][this.containerId].controls) {
      const controlProp = this.userformData[this.userFormId][control].properties
      if (this.userformData[this.userFormId][control].type !== 'Useform') {
        if (controlProp.GroupID !== '') {
          for (const divStyle of this.divStyleArray) {
            if (controlProp.GroupID === divStyle.groupName) {
              this.topArray.push(controlProp.Top! - parseInt(divStyle.top!))

              this.leftArray.push(controlProp.Left! - parseInt(divStyle.left!))

              this.percheightArray.push(
              controlProp.Height! / parseInt(divStyle.height!)
              )

              this.percwidthArray.push(
              controlProp.Width! / parseInt(divStyle.width!)
              )
            }
          }
        } else {
          this.topArray.push(controlProp.Top!)

          this.leftArray.push(controlProp.Left!)

          this.percheightArray.push(controlProp.Height!)

          this.percwidthArray.push(controlProp.Width!)
        }
      }
    }
    this.initialArray = []
    for (let k = 0; k < this.divStyleArray.length; k++) {
      this.initialArray.push(Object.assign({}, this.divStyleArray[k]))
    }
  }

  deActGroupControl () {
    const selControl = this.selectedControls[this.userFormId].selected
    if (
      this.currentSelectedGroup.length === 1 &&
      selControl.length === 1 &&
      !selControl[0].startsWith('group')
    ) {
      const controlId = this.selectedControls[this.userFormId].selected[0]
      if (
        this.currentSelectedGroup[0] ===
        this.userformData[this.userFormId][controlId].properties.GroupID!
      ) {
        this.selectControl({
          userFormId: this.userFormId,
          select: {
            container: this.getContainerList(this.currentSelectedGroup[0]),
            selected: [this.currentSelectedGroup[0]]
          }
        })
      }
    }
  }

  handleMouseDown (event: CustomMouseEvent, handler: string) {
    if (this.toolBoxSelect === 'Select' && !this.isMouseDownProp) {
      event.stopPropagation()
      this.tempEvent = event
      EventBus.$emit('groupDrag', 'NotDrag')
      this.isMove = false
      this.resizeDiv = handler
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      this.currentMouseDownEvent = event
      if (handler !== 'drag') {
        EventBus.$emit('startGroupMoveControl', event)
        EventBus.$emit('startResizeGroupControl', event, handler)
        document.onmousemove = (event: MouseEvent) => {
          EventBus.$emit('resizeGroupControl', event, this.positions)
        }
      } else {
        this.positions.offsetX = event.offsetX
        this.positions.offsetY = event.offsetY
        this.isMainSelect = true
        EventBus.$emit('startGroupMoveControl', event)
        EventBus.$emit('startResizeGroupControl', event, handler)
        document.onmousemove = (event: MouseEvent) => {
          EventBus.$emit('moveGroupControl', event)
        }
      }
      document.onmouseup = (event) => {
        this.closeDragElement(event, handler)
      }
    } else {
      this.isMouseDownProp = false
    }
  }
  elementMouseDrag (event: MouseEvent, containerX: number, containerY: number, previousEvent: MouseEvent): void {
    event.preventDefault()
    if (this.container === this.containerId) {
      const containerProp = this.userformData[this.userFormId][this.containerId].properties
      for (const i of this.selectedControls[this.userFormId].selected) {
        if (i.startsWith('group')) {
          const index = this.divStyleArray.findIndex(val => val.groupName === i)
          this.divStyleArray[index].display = 'block'
          this.groupStyle(this.divStyleArray[index].groupName!)
        }
      }
      this.resizeDiv = 'drag'
      let targetLeft = -1
      let targetTop = -1
      const main = this.selectedControls[this.userFormId].selected[0]
      const isGroup = main.startsWith('group') ? this.divStyleArray.findIndex(val => val.groupName === main) : -1
      if (isGroup === -1) {
        const targetData = this.userformData[this.userFormId][main].properties
        targetLeft = targetData.Left!
        targetTop = targetData.Top!
      } else {
        const targetData = this.divStyleArray[isGroup]
        targetLeft = parseInt(targetData.left!)
        targetTop = parseInt(targetData.top!)
      }
      this.positions.movementX = (targetLeft - (containerX - this.positions.offsetX!))
      this.positions.movementY = (targetTop - (containerY - this.positions.offsetY!))
      const scale: number = 1
      const grid: Array<number> = [10, 10]
      const x: number =
      Math.round(this.positions.movementX / scale / grid[0]) * grid[0]
      const y: number =
      Math.round(this.positions.movementY / scale / grid[1]) * grid[1]

      if (this.currentMouseDownEvent && (x !== 0 || y !== 0)) {
        this.currentMouseDownEvent.customCallBack &&
        this.currentMouseDownEvent.customCallBack()
      }
      let dragResizeControl: IGroupStyle = {}
      let dragResizeControl1: controlProperties = { ID: '' }

      for (let i = 0; i < this.divStyleArray.length; i++) {
        this.groupName = this.divStyleArray[i].groupName!
        dragResizeControl = this.divStyleArray[i]
        if (dragResizeControl.display === 'block') {
          let top: number = -1
          let left: number = -1
          let decHeight: number = -1
          top = parseInt(dragResizeControl.top!) - y
          left = parseInt(dragResizeControl.left!) - x

          if (this.resizeDiv === 'drag') {
            dragResizeControl.top = `${top + containerProp.ScrollTop!}px`
            dragResizeControl.left = `${left + containerProp.ScrollLeft!}px`
          }
          for (const j in this.userformData[this.userFormId][this.containerId]
            .controls) {
            const index = this.userformData[this.userFormId][this.containerId]
              .controls[j]
            const controlProp = this.userformData[this.userFormId][index]
              .properties
            if (
              controlProp.GroupID === this.divStyleArray[i].groupName &&
            this.divStyleArray[i].display === 'block'
            ) {
              dragResizeControl1 = controlProp
              if (this.resizeDiv === 'drag') {
                top = dragResizeControl1.Top! - y
                left = dragResizeControl1.Left! - x
                this.updateControlAction('Top', top + containerProp.ScrollTop!, index)
                this.updateControlAction('Left', left + containerProp.ScrollLeft!, index)
              }
            }
          }
        }
      }
      for (let k of this.selectedControls[this.userFormId].selected) {
        if (!k.startsWith('ID_USERFORM') && !k.startsWith('group')) {
          let dragResizeReffer: IdragResizeRefStyle = {}
          const control: controlProperties = this.userformData[this.userFormId][k]
            .properties
          for (const key in this.controlRef.resizeControl) {
            if (
              this.controlRef.resizeControl[key].$refs['draRef'.concat(control.ID)] !== undefined
            ) {
              dragResizeReffer = this.controlRef.resizeControl[key].$refs['draRef'.concat(control.ID)]
            }
          }
          const top = control.Top! - y
          const left = control.Left! - x

          if (this.resizeDiv === 'drag') {
            this.updateControlAction('Top', top + containerProp.ScrollTop!, k)
            this.updateControlAction('Left', left + containerProp.ScrollLeft!, k)
          }
        }
      }
    }
  }

  elementDrag (event: MouseEvent): void {
    event.preventDefault()
    this.positions.movementX = this.positions.clientX - event.clientX
    this.positions.movementY = this.positions.clientY - event.clientY
    const scale: number = 1
    const grid: Array<number> = [10, 10]
    const x: number =
      Math.round(this.positions.movementX / scale / grid[0]) * grid[0]
    const y: number =
      Math.round(this.positions.movementY / scale / grid[1]) * grid[1]

    if (this.currentMouseDownEvent && (x !== 0 || y !== 0)) {
      this.currentMouseDownEvent.customCallBack &&
        this.currentMouseDownEvent.customCallBack()
    }
    const diffGridX: number = x - this.positions.movementX
    const diffGridY: number = y - this.positions.movementY

    this.positions.clientX = event.clientX - diffGridX
    this.positions.clientY = event.clientY - diffGridY

    let dragResizeControl: IGroupStyle = {}
    let dragResizeControl1: controlProperties = { ID: '' }

    for (let i = 0; i < this.divStyleArray.length; i++) {
      this.groupName = this.divStyleArray[i].groupName!
      dragResizeControl = this.divStyleArray[i]
      if (dragResizeControl.display === 'block') {
        let top: number = -1
        let left: number = -1
        let incWidth: number = -1
        let incHeight: number = -1
        let decWidth: number = -1
        let decHeight: number = -1
        top = parseInt(dragResizeControl.top!) - y
        left = parseInt(dragResizeControl.left!) - x
        incWidth =
          parseInt(dragResizeControl.width!) + x > 0
            ? parseInt(dragResizeControl.width!) + x
            : 0
        incHeight =
          parseInt(dragResizeControl.height!) + y > 0
            ? parseInt(dragResizeControl.height!) + y
            : 0
        decWidth =
          parseInt(dragResizeControl.width!) - x > 0
            ? parseInt(dragResizeControl.width!) - x
            : 0
        decHeight =
          parseInt(dragResizeControl.height!) - y > 0
            ? parseInt(dragResizeControl.height!) - y
            : 0

        if (this.resizeDiv === 'drag') {
          dragResizeControl.top = `${top}px`
          dragResizeControl.left = `${left}px`
        } else {
          if (this.resizeDiv.includes('t')) {
            if (incHeight > -1) {
              const groupBottom = parseInt(dragResizeControl.height!) + parseInt(dragResizeControl.top!)
              if (top < groupBottom) {
                dragResizeControl.top = `${top}px`
              } else {
                dragResizeControl.top = `${groupBottom}px`
              }
            }
            dragResizeControl.height = `${incHeight}px`
          } else if (this.resizeDiv.includes('b')) {
            dragResizeControl.height = `${decHeight}px`
          }

          if (this.resizeDiv.includes('l')) {
            if (incWidth > -1) {
              const groupRight = parseInt(dragResizeControl.width!) + parseInt(dragResizeControl.left!)
              if (left < groupRight) {
                dragResizeControl.left = `${left}px`
              } else {
                dragResizeControl.left = `${groupRight}px`
              }
            }
            dragResizeControl.width = `${incWidth}px`
          } else if (this.resizeDiv.includes('r')) {
            dragResizeControl.width = `${decWidth}px`
          }
        }
        for (const j in this.userformData[this.userFormId][this.containerId]
          .controls) {
          const index = this.userformData[this.userFormId][this.containerId]
            .controls[j]
          const controlProp = this.userformData[this.userFormId][index]
            .properties

          let top: number = controlProp.Height! < 1 ? parseInt(dragResizeControl.top!)
            : (parseInt(dragResizeControl.height!) * this.topArray[j]) /
              parseInt(this.initialArray[i].height!) +
            parseInt(this.initialArray[i].top!)

          let height: number = controlProp.Height! < 1 ? parseInt(dragResizeControl.height!)
            : parseInt(dragResizeControl.height!) * this.percheightArray[j]

          let left: number = controlProp.Width! < 1 ? parseInt(dragResizeControl.left!)
            : (parseInt(dragResizeControl.width!) * this.leftArray[j]) /
              parseInt(this.initialArray[i].width!) +
            parseInt(this.initialArray[i].left!)

          let width: number = controlProp.Width! < 1 ? parseInt(dragResizeControl.width!)
            : parseInt(dragResizeControl.width!) * this.percwidthArray[j]

          let right: number = controlProp.Width! < 1 ? parseInt(dragResizeControl.left!)
            : (parseInt(dragResizeControl.width!) * this.leftArray[j]) /
              parseInt(this.initialArray[i].width!) +
            parseInt(dragResizeControl.left!)

          let bottom: number = controlProp.Height! < 1 ? parseInt(dragResizeControl.top!)
            : (parseInt(dragResizeControl.height!) * this.topArray[j]) /
              parseInt(this.initialArray[i].height!) +
            parseInt(dragResizeControl.top!)
          if (
            controlProp.GroupID === this.divStyleArray[i].groupName &&
            this.divStyleArray[i].display === 'block'
          ) {
            dragResizeControl1 = controlProp
            if (this.resizeDiv === 'drag') {
              top = dragResizeControl1.Top! - y
              left = dragResizeControl1.Left! - x
              this.updateControlAction('Top', top, index)
              this.updateControlAction('Left', left, index)
            } else {
              if (this.resizeDiv.includes('t')) {
                this.updateControlAction('Top', bottom, index)
                this.updateControlAction('Height', height, index)
              } else if (this.resizeDiv.includes('b')) {
                this.updateControlAction('Top', top, index)
                this.updateControlAction('Height', height, index)
              }
              if (this.resizeDiv.includes('l')) {
                this.updateControlAction('Left', right, index)
                this.updateControlAction('Width', width, index)
              } else if (this.resizeDiv.includes('r')) {
                this.updateControlAction('Left', left, index)
                this.updateControlAction('Width', width, index)
              }
            }
          }
        }
      }
    }
    for (let k of this.selectedControls[this.userFormId].selected) {
      if (!k.startsWith('ID_USERFORM') && !k.startsWith('group')) {
        let dragResizeReffer: IdragResizeRefStyle = {}
        const control: controlProperties = this.userformData[this.userFormId][k]
          .properties
        for (const key in this.controlRef.resizeControl) {
          if (
            this.controlRef.resizeControl[key].$refs['draRef'.concat(control.ID)] !== undefined
          ) {
            dragResizeReffer = this.controlRef.resizeControl[key].$refs['draRef'.concat(control.ID)]
          }
        }
        const top = dragResizeReffer.offsetTop! - y
        const left = dragResizeReffer.offsetLeft! - x
        const incWidth = control.Width! + x > 0 ? control.Width! + x : 0
        const incHeight = control.Height! + y > 0 ? control.Height! + y : 0
        const decWidth = control.Width! - x > 0 ? control.Width! - x : 0
        const decHeight = control.Height! - y > 0 ? control.Height! - y : 0

        if (this.resizeDiv === 'drag') {
          this.updateControlAction('Top', top, k)
          this.updateControlAction('Left', left, k)
        } else {
          if (this.resizeDiv.includes('t')) {
            if (incHeight > 0) {
              this.updateControlAction('Top', top, k)
            }
            this.updateControlAction('Height', incHeight, k)
          } else if (this.resizeDiv.includes('b')) {
            this.updateControlAction('Height', decHeight, k)
          }
          if (this.resizeDiv.includes('l')) {
            if (incWidth > 0) {
              this.updateControlAction('Left', left, k)
            }
            this.updateControlAction('Width', incWidth, k)
          } else if (this.resizeDiv.includes('r')) {
            this.updateControlAction('Width', decWidth, k)
          }
        }
      }
    }
  }
  openContextMenu (e: MouseEvent, parentID: string, controlID: string, type: string) {
    this.$emit('openMenu', e, parentID, controlID, type)
  }
  openMenu (event: MouseEvent, type: string) {
    event.preventDefault()
    event.stopPropagation()
    const container = this.selectedControls[this.userFormId].container[0]
    let controlId = container
    if (type === 'control') {
      controlId = this.getSelectedControlsDatas![0]
    }
    this.openContextMenu(event, container, controlId, type)
  }

  closeDragElement (event:MouseEvent, handler: string): void {
    if (handler !== 'drag') {
      this.elementDrag(event)
    }
    if (this.value === 'same') {
      this.elementDrag(event)
      this.value = 'different'
    }
    EventBus.$emit('updateIsControlMove', this.isMove)
    EventBus.$emit('groupDrag', 'NotDrag')
    EventBus.$emit('endMoveControl', 'groupEndMove')
    EventBus.$emit('endGroupMoveControl')
    if (handler === 'drag') {
      const selected = this.selectedControls[this.userFormId].selected
      for (const grpname in selected) {
        if (selected[grpname].startsWith('group')) {
          this.groupStyle(selected[grpname])
        }
      }
    }
    for (const controlGroup in this.divStyleArray) {
      const groupName = this.divStyleArray[controlGroup].groupName!
      if (groupName.startsWith('group')) {
        this.groupStyle(groupName)
      }
    }
    document.onmouseup = null
    document.onmousemove = null
  }
  getGroupEditStyle (groupName: string) {
    const selected = this.selectedControls[this.userFormId].selected
    let type = ''
    let selGroupId = ''
    let userData = this.userformData[this.userFormId]
    type = !selected[0].startsWith('group') ? userData[selected[0]].type : ''
    selGroupId = type === 'Page'
      ? userData[this.getContainerList(selected[0])[0]].properties.GroupID!
      : type !== '' && type !== 'Userform'
        ? userData[selected[0]].properties.GroupID!
        : ''
    let isSelected = selected.length === 1 && !selected[0].startsWith('group') && selGroupId === groupName
    if (isSelected !== true) {
      const containerList = this.getContainerList(this.getSelectedControlsDatas![0])
      for (let i = 0; i <= containerList.length - 1; i++) {
        const type = userData[containerList[i]].type
        let groupId = ''
        if (type === 'Page') {
          groupId = userData[this.getContainerList(containerList[i])[0]].properties.GroupID!
        } else {
          groupId = userData[containerList[i]].properties.GroupID!
        }
        isSelected = groupId === groupName
        if (isSelected) {
          break
        }
      }
    }
    return isSelected ? 'mainEditDiv' : 'mainDiv'
  }
  getGroupStyle (groupName: string) {
    return this.divStyleArray[this.divStyleArray.findIndex((p) => p.groupName === groupName)]
  }

  @Watch('selectedControls', { deep: true })
  updateGroupStyle () {
    const userData = this.userformData[this.userFormId]
    const container = this.selectedControls[this.userFormId].container[0]
    const selectedContainer = userData[container].type === 'MultiPage' && userData[container].controls.length > 0
      ? this.getContainerList(container)[0] : container
    if (selectedContainer !== this.containerId && this.isMove) {
      const selected = this.selectedControls[this.userFormId].selected
      for (const grpname in selected) {
        if (selected[grpname].startsWith('group')) {
          const fingGroupIndex = this.divStyleArray.findIndex(val => val.groupName === selected[grpname])
          this.divStyleArray.splice(fingGroupIndex, 1)
        }
      }
    }
    if (this.divStyleArray.length > 0 && selectedContainer === this.containerId) {
      for (const index in this.divStyleArray) {
        this.divStyleArray[index].display = 'none'
      }
      const selControl = this.selectedControls[this.userFormId].selected
      if (selControl.length >= 1) {
        for (const val of this.getSelectedControlsDatas!) {
          const controlData = this.userformData[this.userFormId][val]
          const groupId = controlData.type === 'Page' ? this.userformData[this.userFormId][this.getContainerList(val)[0]].properties.GroupID! : controlData.properties.GroupID!
          if (groupId) {
            const index = this.divStyleArray.findIndex(
              (p) => p.groupName === groupId
            )
            this.divStyleArray[index].display = 'block'
          }
        }
      } else {
        if (
          selControl[0].startsWith('group') ||
          (!selControl[0].startsWith('group') &&
            selControl.includes(
              this.userformData[this.userFormId][selControl[0]].properties
                .GroupID!
            ))
        ) {
          if (selControl[0].startsWith('group')) {
            const index = this.divStyleArray.findIndex(
              (p) => p.groupName === selControl[0]
            )
            if (index !== -1) {
              this.divStyleArray[index].display = 'block'
            }
          } else {
            const index = this.divStyleArray.findIndex(
              (p) =>
                p.groupName ===
                this.userformData[this.userFormId][selControl[0]].properties
                  .GroupID!
            )
            if (index !== -1) {
              this.divStyleArray[index].display = 'block'
            }
          }
        }
      }
    } else {
      for (const index in this.divStyleArray) {
        this.divStyleArray[index].display = 'none'
      }
    }
    const containerList = this.getContainerList(this.getSelectedControlsDatas![0])
    for (let i = 0; i <= containerList.length - 1; i++) {
      const type = userData[containerList[i]].type
      let groupId = ''
      if (type === 'Page') {
        groupId = userData[this.getContainerList(containerList[i])[0]].properties.GroupID!
      } else {
        groupId = userData[containerList[i]].properties.GroupID!
      }
      const findIndex = this.divStyleArray.findIndex(val => val.groupName === groupId)
      if (findIndex !== -1) {
        this.divStyleArray[findIndex].display = 'block'
      }
    }
  }
  innerGroupDivMouseDown () {
    this.isMouseDownProp = true
  }
}
</script>

<style  scoped>
.move-border {
  z-index: 9999;
  position: absolute;
  border: 1px rgb(59, 58, 58) dashed;
}
.m-top-b,
.m-bottom-b {
  width: 100%;
}
.m-left-b,
.m-right-b {
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
.mainDiv {
  cursor: move;
  position: absolute;
  --border-width: 5;
  --stripe-distance: 2px;
  border: calc(var(--border-width) * 1px) solid transparent;
  border-image: repeating-linear-gradient(
      -110deg,
      black,
      transparent 1px,
      transparent var(--stripe-distance),
      black calc(var(--stripe-distance) + 0.2px)
    )
    var(--border-width);
  padding: 5px;
  margin-top: -5px;
  margin-left: -5px;
  display: none;
}
.mainEditDiv {
  position: absolute;
  cursor: move;
  --border-width: 5;
  --stripe-distance: 2px;
  border: calc(var(--border-width) * 1px) solid transparent;
  border-image: repeating-linear-gradient(
      -45deg,
      black,
      transparent 2px,
      transparent var(--stripe-distance),
      black calc(var(--stripe-distance) + 0.2px)
    )
    var(--border-width);
  padding: 5px;
  margin-top: -5px;
  margin-left: -5px;
  display: none;
}
.innerGroupStyle {
    margin-top: -5px;
    margin-left: -5px;
    padding-right: 10px;
    padding-bottom: 10px;
}
.handle {
  box-sizing: border-box;
  position: absolute;
  width: 6px;
  height: 6px;
  background: white;
  border: 1px solid #333;
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
</style>
