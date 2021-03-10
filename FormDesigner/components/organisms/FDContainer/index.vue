<template>
  <div @mouseup="onMouseUp" :style="parentDiv" @scroll="updateChildHeightWidth" ref="parentDivRef" >
    <drag-selector
      ref="dragSelector"
      :style="dragSelectorStyle"
      :isEditMode="checkIsEditMode"
      @deActiveControl="event => deActiveControl(event)"
      @dragSelectorControl="event => dragSelectorControl(event)"
      @addControlObj="event => addControlObj(event)"
    >
    <div :style="childDiv">
    <div :style="pictureChildDiv">
      <GroupControl
        :containerId="containerId"
        :userFormId="userFormId"
        ref="groupRef"
        class="group"
        :controlRef="$refs"
        :currentSelectedGroup="filterSelected"
        @openMenu="(e, parentID, controlID, type) => openContextMenu(e, parentID, controlID, type)"
      />
      <div
        v-for="control in propControlData.controls"
        :key="control"
        class="resize"
      >
        <ResizeControl
          ref="resizeControl"
          :name="control"
          :controlId="control"
          :containerId="controlId"
          :userFormId="userFormId"
          :currentSelectedGroup.sync="currentSelectedGroup"
          @createGroup="createGroup"
          @dragControl="dragControl"
          @muldragControl="muldragControl"
        >
        </ResizeControl>
      </div>
    </div>
    </div>
    </drag-selector>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Ref, Watch } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import ResizeControl from '@/FormDesigner/components/organisms/FDResizeControl/index.vue'
import ContextMenu from '@/FormDesigner/components/atoms/FDContextMenu/index.vue'
import { controlContextMenu } from '@/FormDesigner/models/controlContextMenuData'
import { userformContextMenu } from '../../../models/userformContextMenuData'
import GroupControl from '@/FormDesigner/components/organisms/FDGroupControl/index.vue'
import {
  IsetChildControls,
  IaddChildControls,
  IselectControl,
  IupdateControl,
  IupdateGroup,
  IupdateControlExtraData
} from '@/storeModules/fd/actions'
import { EventBus } from '../../../event-bus'
import FDCommonMethod from '@/api/abstract/FormDesigner/FDCommonMethod'
import DragSelector from '@/FormDesigner/components/organisms/FDDragSelector/DragSelector.vue'
@Component({
  name: 'Container',
  components: {
    ContextMenu,
    GroupControl,
    ResizeControl,
    DragSelector
  }
})
export default class Container extends FDCommonMethod {
  $el!: HTMLDivElement;
  currentSelectedGroup: string = '';
  @Prop() getScrollBarX: string
  @Prop() getScrollBarY: string
  isControlPasted: boolean = false

  @Prop({ required: true, type: String }) public controlId!: string;
  @Prop({ required: true, type: String }) userFormId!: string;
  @Prop({ required: true, type: String }) containerId!: string;
  @Prop() mouseCursorData: string;
  @Prop() getSampleDotPattern: { backgroundImage: string; backgroundSize: string; backgroundPosition: string }
  @State((state: rootState) => state.fd.toolBoxSelect) toolBoxSelect!: fdState['toolBoxSelect'];
  @State((state) => state.fd.selectedControls)
  selectedControls!: fdState['selectedControls'];
  @State((state) => state.fd.userformData) userformData!: userformData;
  @State((state) => state.fd.groupedControls)
  groupedControls!: fdState['groupedControls'];

  @Action('fd/updateGroup') updateGroup!: (payload: IupdateGroup) => void;
  @Action('fd/updateControlExtraData') updateControlExtraData!: (payload: IupdateControlExtraData) => void;
  @Action('fd/updateControl') updateControl!: (payload: IupdateControl) => void;
  @Action('fd/setChildControls') setChildControls!: (
    payload: IsetChildControls
  ) => void;
  @Action('fd/addChildControls') addChildControls!: (
    payload: IaddChildControls
  ) => void;
  @Action('fd/selectControl') selectControl!: (payload: IselectControl) => void;

  @Prop() isEditMode: boolean;
  @Prop() width: number
  @Prop() height: number

  @Ref('groupRef') readonly groupRef!: GroupControl;
  @Ref('refContextMenu') readonly refContextMenu!: ContextMenu;
  @Ref('dragSelector') readonly dragSelector: dragselector;
  @Ref('contextmenu') readonly contextmenu: HTMLDivElement;
  @Ref('parentDivRef') parentDivRef: HTMLDivElement

  @Prop() createBackgroundString: string
  @Prop() getSizeMode: string
  @Prop() getRepeatData: string
  @Prop() getPosition: string

  controlContextMenu: Array<IcontextMenu> = controlContextMenu;
  userformContextMenu: Array<IcontextMenu> = userformContextMenu;
  handler: string = '';
  grouphandler: string = '';
  mainSelectData: controlData
  containerPosition: IMousePosition = { clientX: 0, clientY: 0, movementX: 0, movementY: 0 }
  selectedGroup: string[] = []
  groupStyleArray: Array<IGroupStyle> = [];
  updatedDragHeight: number = 0;
  updatedDragWidth: number = 0;
  isControlMove: boolean = false
  mouseUpOnPageTab: boolean = false

  updateChildHeightWidth () {
    if (this.parentDivRef) {
      const controlProp = this.propControlData.properties
      const type = this.propControlData.type
      const ph = type && type === 'Page' ? this.height! : controlProp.Height!
      const pw = type && type === 'Page' ? this.width! : controlProp.Width!
      if (this.isControlPasted) {
        this.updatedDragHeight = Math.abs(this.parentDivRef.scrollHeight - ph!)
        this.updatedDragWidth = Math.abs(this.parentDivRef.scrollWidth - pw!)
        this.isControlPasted = false
      }
      if (this.isControlMove === false && this.isControlPasted === false) {
        this.updateControl({
          userFormId: this.userFormId,
          controlId: this.controlId,
          propertyName: 'ScrollLeft',
          value: this.parentDivRef.scrollLeft
        })
        this.updateControl({
          userFormId: this.userFormId,
          controlId: this.controlId,
          propertyName: 'ScrollTop',
          value: this.parentDivRef.scrollTop
        })
      } else {
        const controlProp = this.propControlData.properties
        this.$el.scrollTop = controlProp.ScrollTop!
        this.$el.scrollLeft = controlProp.ScrollLeft!
        this.updateIsControlMove(false)
      }
    }
  }
  /**
   * @description To get the selected container  from controls are dragged
   * @function selectedContainer
   */
  get selectedContainer () {
    return [...this.selectedControls[this.userFormId].container][0]
  }

  /**
   * @description To get the selected controls to be dropped
   * @function selectedSelect
   */
  get selectedSelect () {
    if (this.grouphandler === 'groupdrag') {
      const selectedSelect = []
      for (let k = 0; k < this.selectedGroup.length; k++) {
        if (this.selectedGroup[k].startsWith('group')) {
          for (const i in this.userformData[this.userFormId]) {
            if (!i.startsWith('ID_USERFORM')) {
              const userdata = this.userformData[this.userFormId]
              if (userdata[i].properties.GroupID === this.selectedGroup[k]) {
                selectedSelect.push(i)
              }
            }
          }
        } else {
          selectedSelect.push(this.selectedGroup[k])
        }
      }
      return selectedSelect
    } else {
      return this.selectedControls[this.userFormId].selected
    }
  }

  /**
   * @description To get the controls to be removed from the  selected container
   * @function fromContainerControls
   */
  get fromContainerControls () {
    const fromContainerControls = [...this.userformData[this.userFormId][this.selectedContainer].controls]
    for (let i = 0; i < this.selectedSelect.length; i++) {
      let tragetId: undefined | string = this.selectedSelect[i]
      let targetIndex = fromContainerControls.findIndex((id) => id === tragetId)
      if (targetIndex !== -1) {
        fromContainerControls.splice(targetIndex, 1)
      }
    }
    return fromContainerControls
  }

  /**
   * @description To remove chilControls of selected Container
   * @function removeChildControl
   * @param selectedSelect  - control array to be deleted
   */
  removeChildControl (id: string, controls: string[]) {
    const userData = this.userformData[this.userFormId]
    const beforeControls = userData[id].controls
    const deleteControls = beforeControls.filter(x => !controls.includes(x))
    for (const key of deleteControls) {
      this.deleteZIndex(key)
      this.deleteTabIndex(key)
    }

    this.setChildControls({
      userFormId: this.userFormId,
      containerId: id,
      targetControls: controls
    })
  }

  /**
   * @description To add chilControls of selected Container
   * @function addChildControl
   * @param selectedSelect  - control array to be added
   */
  addChildControl (selectedSelect: string[]) {
    const userData = this.userformData[this.userFormId]
    for (const control of selectedSelect) {
      if (!userData[this.containerId].controls.includes(control)) {
        this.addChildControls({
          userFormId: this.userFormId,
          containerId: this.containerId,
          targetControls: [control]
        })
        this.updateTabIndexValue(control)
        this.updateZIndexValue(control)
      }
    }
  }

  /**
   * @description To update Properties of Control
   * @function updateControlProp
   * @param id  - selcted controlId
   * @param propName  -  selected control property Name
   * @param propName  -  selected control property Value
   */
  updateControlProp (id: string, propName: keyof controlProperties, propValue: number| string) {
    this.updateControl({
      userFormId: this.userFormId,
      controlId: id,
      propertyName: propName,
      value: propValue
    })
  }

  /**
   * @description To update the selectedControls in main data
   * @function updatedSelect
   * @param updatedSelect  - selcted ContainerId
   * @param selArry  - selcted controlList
   */
  updatedSelect (conatiner: string[], selArry: string[]) {
    this.selectControl({
      userFormId: this.userFormId,
      select: {
        container: conatiner,
        selected: selArry
      }
    })
  }

  /**
   * @description If control inside the group is selected dropped into other container
   * @function updateGroupControl
   * @param mainSelectGroup  - selected group
   */
  updateGroupControl (mainSelectGroup: string) {
    const presenetControl: string[] = []
    if (mainSelectGroup && mainSelectGroup !== '') {
      for (let control in this.userformData[this.userFormId]) {
        const controlGroupId = this.userformData[this.userFormId][control].properties.GroupID!
        if (controlGroupId && controlGroupId === mainSelectGroup) {
          presenetControl.push(control)
        }
      }
    }
    if (presenetControl.length === 1) {
      const groupArray: string[] = [...this.groupedControls[this.userFormId]!.groupArray!]
      const index = groupArray.findIndex((val) => val === mainSelectGroup)
      groupArray.splice(index, 1)
      this.updateGroup({
        userFormId: this.userFormId,
        groupArray: groupArray
      })
      this.updateControlProp(presenetControl[0], 'GroupID', '')
    }
  }
  /**
   * @description to drag and drop the control and group into respective container
   * @function onMouseUp
   * @param event  - it is of type MouseEvent
   * @event mouseup
   */
  onMouseUp (event: MouseEvent) {
    if (document.onmousemove && document.onmouseup && (this.handler === 'drag' || this.handler === 'frameDrag' || this.grouphandler === 'groupdrag')) {
      const userData = this.userformData[this.userFormId]
      const containerType = userData[this.containerId].type === 'Page' && userData[this.getContainerList(this.containerId)[0]].properties.Value === -1
      if (!containerType) {
        let moveValueX: number = 0
        let moveValueY: number = 0
        let mainSelect: string = ''
        let parentConatiner = ''
        let count = 0
        let tempEvent = {}
        this.selectedGroup = this.selectedControls[this.userFormId].selected
        if (this.grouphandler === 'groupdrag') {
          EventBus.$emit(
            'getGroupMoveValue',
            (offsetX: number, offsetY: number, id: string, tempEventObj: MouseEvent) => {
              moveValueX = offsetX
              moveValueY = offsetY
              tempEvent = Object.keys(tempEventObj).length === 0 ? tempEvent : tempEventObj
            }
          )
          mainSelect = this.getSelectedControlsDatas![0]
        } else if (this.handler === 'drag') {
          EventBus.$emit(
            'getMoveValue',
            (offsetX: number, offsetY: number, id: string) => {
              moveValueX = offsetX
              moveValueY = offsetY
              mainSelect = id
            }
          )
        } else if (this.handler === 'frameDrag') {
          EventBus.$emit(
            'getMoveValue',
            (offsetX: number, offsetY: number, id: string, parentControl: string) => {
              moveValueX = offsetX
              moveValueY = offsetY
              mainSelect = id
              parentConatiner = parentControl
            }
          )
        }
        const isPageSelected = !(userData[this.containerId].type === 'Page' && this.getSelectedControlsDatas!.includes(this.getContainerList(this.containerId)[0]))
        if (userData[mainSelect].type !== 'Userform' && mainSelect && !this.getSelectedControlsDatas!.includes(this.containerId) && isPageSelected && !this.mouseUpOnPageTab) {
          count = count + 1
          let frameCondition: boolean = false
          if (this.handler === 'frameDrag') {
            const isChild = this.getChildControl(mainSelect).includes(this.containerId) || this.containerId === mainSelect
            frameCondition = (isChild === false && parentConatiner === this.containerId) ||
          (isChild === false && this.selectedControls[this.userFormId].selected.includes(mainSelect)) ||
          (isChild === false && count === 1)
          }
          if ((this.handler === 'frameDrag' && frameCondition) || this.handler === 'drag' || this.grouphandler === 'groupdrag') {
            const currentControlsData = this.userformData[this.userFormId]
            const mainSelectData = currentControlsData[mainSelect]
            const mainSelectX = mainSelectData.properties.Left
            const mainSelectY = mainSelectData.properties.Top
            const containerX = event.clientX - this.$el.getClientRects()[0].x
            const containerY = event.clientY - this.$el.getClientRects()[0].y
            const mainSelectGroup: string = mainSelectData.properties.GroupID!
            const selectedSelect = this.handler === 'frameDrag' ? (this.selectedSelect.includes(mainSelect) ? this.selectedSelect : [mainSelect]) : this.selectedSelect
            if (typeof mainSelectX === 'number' && typeof mainSelectY === 'number') {
              if ((this.handler === 'frameDrag' || this.handler === 'drag')) {
                selectedSelect.forEach((id) => {
                  const targetData = currentControlsData[id].properties
                  const targetLeft = targetData.Left
                  const targetTop = targetData.Top
                  const containerProp = userData[this.containerId].properties
                  if (typeof targetTop === 'number' && typeof targetLeft === 'number') {
                    const leftValue = containerProp.ScrollLeft! > 0 ? (containerX + targetLeft - mainSelectX - moveValueX) + containerProp.ScrollLeft! : containerX + targetLeft - mainSelectX - moveValueX
                    const topValue = containerProp.ScrollTop! > 0 ? (containerY + targetTop - mainSelectY - moveValueY) + containerProp.ScrollTop! : containerY + targetTop - mainSelectY - moveValueY
                    this.updateControlProp(id, 'Left', leftValue)
                    this.updateControlProp(id, 'Top', topValue)
                    if (this.handler === 'drag') {
                      if (mainSelectGroup !== '' && this.selectedContainer !== this.containerId) {
                        this.updateControlProp(id, 'GroupID', '')
                        this.updateGroupControl(mainSelectGroup)
                      }
                    }
                  }
                })
              } else if (this.grouphandler === 'groupdrag' && this.selectedContainer === this.containerId) {
                EventBus.$emit('getClientValue', 'same')
              }
            }
            if (this.handler === 'frameDrag' && this.userformData[this.userFormId][this.containerId].controls.includes(mainSelect)) {
              event.stopPropagation()
              document.onmouseup(event)
            } else {
              if (this.selectedContainer !== this.containerId) {
                const mainSelContainer = this.getContainerList(mainSelect)[0]
                if (this.selectedControls[this.userFormId].selected.includes(mainSelect) || this.grouphandler === 'groupdrag') {
                  this.removeChildControl(this.selectedContainer, this.fromContainerControls)
                  this.addChildControl(selectedSelect)
                } else {
                  const controls = this.userformData[this.userFormId][mainSelContainer].controls
                  const removeControl = controls.filter(e => e !== mainSelect)
                  this.removeChildControl(mainSelContainer, removeControl)
                  this.addChildControl([mainSelect])
                }
                if (this.grouphandler === 'groupdrag') {
                  for (let k = 0; k < this.selectedGroup.length; k++) {
                    if (this.selectedGroup[k].startsWith('group')) {
                      this.createGroup({ groupId: this.selectedGroup[k], containerId: this.containerId })
                    }
                  }
                }

                if (this.grouphandler === 'groupdrag') {
                  if (this.grouphandler === 'groupdrag' && this.selectedContainer !== this.containerId) {
                    EventBus.$emit('getClientValue', 'different', containerX, containerY, event, this.containerId, tempEvent)
                  }
                  const selected = this.selectedControls[this.userFormId].selected
                  this.updatedSelect(this.getContainerList(selected[0]), selected)
                } else {
                  this.updatedSelect(this.getContainerList(this.selectedSelect[0]), this.selectedControls[this.userFormId].selected)
                }
              }
              event.stopPropagation()
              document.onmouseup(event)
            }
          }
        }
      } else {
        event.stopPropagation()
        document.onmouseup(event)
      }
    }
    EventBus.$emit('mouseUpOnPageTab', false)
  }

  /**
   * @description style object to dynamically changing the styles of  the contextMenu component based on propControlData
   * @function styleObject
   *
   */
  get filterSelected () {
    const result =
      this.currentSelectedGroup === ''
        ? this.selectedControls[this.userFormId].selected.filter((Id) => {
          if (typeof Id === 'string') {
            return Id.startsWith('group')
          }
        })
        : [this.currentSelectedGroup]
    return result
  }
  createGroup (groupObj: any) {
    if (groupObj.containerId === this.containerId) {
      this.groupRef.groupStyle(groupObj.groupId)
    }
  }
  muldragControl (val: IDragResizeGroup) {
    this.groupRef.handleMouseDown(val.event, val.handler)
  }
  dragControl (event: MouseEvent) {
    this.groupRef.handleMouseDown(event, 'drag')
  }
  /**
   * @description style object to dynamically changing the styles of  the darg-selctor component based on propControlData
   * @function dragSelectorStyle
   *
   */
  get fitPictureSize () {
    const type = this.propControlData.type
    if (type === 'Userform') {
      return 32
    } else {
      return 0
    }
  }
  get dragSelectorStyle () {
    const controlProp = this.propControlData.properties
    const type = this.propControlData.type
    const ph = type && type === 'Page' ? this.height! : this.propControlData.properties.Height! - this.fitPictureSize!
    const pw = type && type === 'Page' ? this.width! : this.propControlData.properties.Width!
    return {
      height: ph + this.updatedDragHeight + 'px',
      width: pw + this.updatedDragWidth + 'px',
      cursor: this.toolBoxSelect !== 'Select' ? 'crosshair !important' : ''
    }
  }
  get pictureChildDiv () {
    const controlProp = this.propControlData.properties
    let backgroundStyle = {}
    if (controlProp.Picture !== '' && controlProp.ScrollBars! > 0) {
      backgroundStyle = {}
    } else {
      backgroundStyle = {
        backgroundImage: this.getSampleDotPattern.backgroundImage,
        backgroundSize: this.getSampleDotPattern.backgroundSize,
        backgroundRepeat: 'repeat',
        backgroundPosition: this.getSampleDotPattern.backgroundPosition
      }
    }
    return {
      ...backgroundStyle,
      width: '100%',
      height: '100%'
    }
  }
  get childDiv () {
    const controlProp = this.propControlData.properties
    const type = this.propControlData.type
    const ph = type && type === 'Page' ? this.height! : this.propControlData.properties.Height! - this.fitPictureSize!
    const pw = type && type === 'Page' ? this.width! : this.propControlData.properties.Width!
    return {
      height: (controlProp.ScrollHeight === 0 || controlProp.ScrollHeight! < ph) ? ph + this.updatedDragHeight + 'px' : controlProp.ScrollHeight! + 'px',
      width: (controlProp.ScrollWidth === 0 || controlProp.ScrollWidth! < pw) ? pw + this.updatedDragWidth + 'px' : controlProp.ScrollWidth! + 'px',
      backgroundImage: controlProp.Picture === ''
        ? this.getSampleDotPattern.backgroundImage
        : this.createBackgroundString,
      backgroundSize: controlProp.Picture === ''
        ? this.getSampleDotPattern.backgroundSize
        : this.getSizeMode,
      backgroundColor: controlProp.Picture !== '' ? '' : controlProp.BackColor,
      backgroundRepeat: this.getRepeatData,
      backgroundPosition: controlProp.Picture !== ''
        ? this.getPosition
        : this.getSampleDotPattern.backgroundPosition,
      opactity: controlProp.Picture === '' ? '0' : '1'
    }
  }
  /**
   * @description propControlData is abstract class providing implementation in FDContainer by passing
   * userFormId and controlId which is taken as props from parent Component
   * @function propControlData
   *
   */
  get propControlData (): controlData {
    return this.userformData[this.userFormId][this.controlId]
  }

  /**
   * @description To display contextmenu of control
   * @function openContextMenu
   * @param e it is type of mouseEvent
   * @param parentID is the UserFormId in which the control resides
   * @param controlId is the selected control of which context has to be displayed
   */
  openContextMenu (e: MouseEvent, parentID: string, controlID: string, type: string, mode: boolean) {
    EventBus.$emit('contextMenuDisplay', event, parentID, controlID, type, mode)
  }
  created () {
    EventBus.$on('handleName', (handler: string) => {
      this.handler = handler
    })
    EventBus.$on('groupDrag', (handler: string) => {
      this.grouphandler = handler
    })
    EventBus.$on('createGroup', (groupId: string) => {
      this.createGroup(groupId)
    })
    EventBus.$on('updateIsControlMove', (val: boolean) => {
      this.updateIsControlMove(val)
    })
    EventBus.$on('afterPaste', () => {
      if (this.selectedControls[this.userFormId].container[0] === this.containerId) {
        this.isControlPasted = true
      }
    })
    EventBus.$on('mouseUpOnPageTab', (val: boolean) => {
      this.mouseUpOnPageTab = val
    })
  }
  destroyed () {
    // EventBus.$off('handleName')
    // EventBus.$off('groupDrag')
    EventBus.$off('afterPaste')
    // EventBus.$off('mouseUpOnPageTab')
  }
  @Watch('selectedControls', { deep: true })
  updateGroupStyle () {
    if (this.selectedContainer === this.containerId) {
      EventBus.$emit('groupArray', this.groupRef.divStyleArray)
      this.groupStyleArray = [...this.groupRef.divStyleArray]
    }
  }
  get checkIsEditMode () {
    const selected = this.selectedControls[this.userFormId].selected
    const container = this.selectedControls[this.userFormId].container[0]
    if ((selected.length === 1 && (this.propControlData.type === 'Frame' || this.propControlData.type === 'Page' || this.propControlData.type === 'Userform')) || (selected.length > 1 && container === this.propControlData.properties.ID)) {
      return true
    } else {
      return false
    }
  }
  get parentDiv () {
    return {
      width: '100%',
      height: '100%',
      position: 'absolute',
      overflowX: this.getScrollBarX,
      overflowY: this.getScrollBarY
    }
  }
  @Watch('propControlData.properties.ScrollLeft')
  updateScrollLeft () {
    this.parentDivRef.scrollLeft = this.propControlData.properties.ScrollLeft!
  }

  @Watch('propControlData.properties.ScrollTop')
  updateScrollTop () {
    this.parentDivRef.scrollTop = this.propControlData.properties.ScrollTop!
  }
  @Emit('deActiveControl')
  deActiveControl (event: MouseEvent) {
    return event
  }
  @Emit('dragSelectorControl')
  dragSelectorControl (event: MouseEvent) {
    return event
  }
  @Emit('addControlObj')
  addControlObj (event: MouseEvent) {
    return event
  }
  updateIsControlMove (val: boolean) {
    this.isControlMove = val
  }
  @Watch('propControlData.properties.ScrollWidth')
  updateChildWidth () {
    if (this.propControlData.properties.ScrollWidth! < this.propControlData.properties.ScrollLeft!) {
      this.updateControl({
        userFormId: this.userFormId,
        controlId: this.controlId,
        propertyName: 'ScrollLeft',
        value: 0
      })
    }
  }
  @Watch('propControlData.properties.ScrollHeight')
  updateChildHeight () {
    if (this.propControlData.properties.ScrollHeight! < this.propControlData.properties.ScrollTop!) {
      this.updateControl({
        userFormId: this.userFormId,
        controlId: this.controlId,
        propertyName: 'ScrollTop',
        value: 0
      })
    }
  }
}
</script>

<style scoped>
:focus {
  outline: none;
}
.dragSelector {
  visibility: hidden;
}
.dragSelector > .resize {
  visibility: visible;
}
.dragSelector > .group {
  visibility: visible;
}
</style>
