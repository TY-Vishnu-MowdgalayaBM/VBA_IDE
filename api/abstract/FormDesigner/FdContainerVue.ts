import { Component, Prop, Vue } from 'vue-property-decorator'
import { controlProperties } from '@/FormDesigner/controls-properties'
import FdControlVue from './FdControlVue'
import { Action, State } from 'vuex-class'
import { IaddControl, IchangeToolBoxSelect, IdeleteControl, IselectControl, IupdateControl, IupdateControlExtraData, IupdateCopyControlList, IupdateGroup } from '@/storeModules/fd/actions'

import { controlContextMenu } from '@/FormDesigner/models/controlContextMenuData'
import { userformContextMenu } from '@/FormDesigner/models/userformContextMenuData'
import { ControlPropertyData } from '@/FormDesigner/models/ControlsTableProperties/ControlPropertyData.ts'
import { EventBus } from '@/FormDesigner/event-bus'
@Component({
  name: 'FdContainerVue'
})
export default class FdContainerVue extends FdControlVue {
  @Prop({ required: true, type: String }) public readonly userFormId!: string
  @Prop({ required: true, type: String }) public readonly containerId!: string
  @State((state: rootState) => state.fd.toolBoxSelect) toolBoxSelect!: fdState['toolBoxSelect'];
  @State((state) => state.fd.copyControlList) copyControl!: copyControl;
  @State((state) => state.fd.userformData) userformData!: userformData;
  @State((state) => state.fd.selectedControls) selectedControls!: fdState['selectedControls'];
  @State(state => state.fd.groupedControls) groupedControls!: fdState['groupedControls']
  @State((state) => state.fd.copiedControl) copiedControl!: userformData;

  @Action('fd/changeToolBoxSelect') changeToolBoxSelect!: (payload: IchangeToolBoxSelect) => void;
  @Action('fd/selectControl') selectControl!: (payload: IselectControl) => void;
  @Action('fd/addControl') addControl!: (payload: IaddControl) => void;
  @Action('fd/updateCopyControlList') updateCopyControlList!: (payload: IupdateCopyControlList) => void
  @Action('fd/deleteControl') deleteControl!: (payload: IdeleteControl) => void
  @Action('fd/updateGroup') updateGroup!: (payload: IupdateGroup) => void
  @Action('fd/updateControl') updateControl!: (payload: IupdateControl) => void;
  @Action('fd/updateControlExtraData') updateControlExtraData!: (payload: IupdateControlExtraData) => void;

  controlContextMenu: Array<IcontextMenu> = controlContextMenu;
  userformContextMenu: Array<IcontextMenu> = userformContextMenu;
  selectedControlArray: Array<string> = [];
  selectedAreaStyle: ISelectedArea | undefined
  selMultipleCtrl: boolean = false
  activateCtrl: boolean = false
  backColorProp = ['Frame', 'CheckBox', 'OptionButton', 'Label', 'MultiPage']
  foreColorProp = ['Frame', 'CheckBox', 'OptionButton', 'Label', 'MultiPage', 'TabStrip']
  fontProp = ['Frame', 'CheckBox', 'OptionButton', 'Label', 'MultiPage', 'TabStrip', 'ToggleButton', 'CommandButton', 'TextBox', 'ListBox', 'ComboBox']

  get selConatiner () {
    return this.selectedControls[this.userFormId].container
  }
  /**
 * @description  To get the selected ContainerList
 * @function getContainerList
 * @param selectTarget  - selcted control or group
 */
  getContainerList (selectTarget: string) {
    const containerList: string[] = []
    const controlContainer = (selectTarget: string) => {
      for (let i in this.userformData[this.userFormId]) {
        const controlData = this.userformData[this.userFormId][i]
        if (
          controlData.controls.length > 0 &&
          controlData.controls.includes(selectTarget)
        ) {
          containerList.push(i)
          controlContainer(i)
        }
      }
    }
    const getControlId = (selectTarget: string) => {
      const userData = this.userformData[this.userFormId]
      for (let i in userData) {
        const controlData = userData[i]
        if (controlData.properties.GroupID === selectTarget) {
          return i
        }
      }
    }
    if (selectTarget) {
      const controlId = selectTarget.startsWith('group') ? getControlId(selectTarget) : selectTarget
      if (controlId) {
        controlContainer(controlId)
      }
    }
    return containerList.length > 0 ? containerList : [this.userFormId]
  }
  generateUniqueName (controlName: string) {
    let lastControlId = 0
    const userformControlIds = Object.keys(this.userformData[this.userFormId])
    for (let i = 0; i < userformControlIds.length; i++) {
      const ctrlProp = this.userformData[this.userFormId][userformControlIds[i]].properties
      if (ctrlProp.Name!.indexOf(controlName) !== -1) {
        const IdNum =
        ctrlProp.Name!.split(controlName).pop() || '-1'
        const pasreId = parseInt(IdNum, 10)
        if (!isNaN(pasreId) && lastControlId < pasreId) {
          lastControlId = pasreId
        }
      }
    }
    return `${controlName}${lastControlId + 1}`
  }
  generateControlId (controlName: string) {
    let lastControlId = 0
    const userformControlIds = Object.keys(this.userformData[this.userFormId])
    for (let i = 0; i < userformControlIds.length; i++) {
      if (userformControlIds[i].indexOf(controlName) !== -1) {
        const IdNum =
          userformControlIds[i].split(controlName).pop() || '-1'
        const pasreId = parseInt(IdNum, 10)
        if (!isNaN(pasreId) && lastControlId < pasreId) {
          lastControlId = pasreId
        }
      }
    }
    const controlPropData = new ControlPropertyData()
    let controlObj = controlName.startsWith('Page') ? controlPropData.data['Page'] : controlPropData.data[controlName]
    const item = JSON.parse(JSON.stringify(controlObj!))
    lastControlId += 1
    item.properties.ID = `ID_${controlName}${lastControlId}`
    item.properties.Caption = `${controlName}${lastControlId}`
    item.properties.Name = this.generateUniqueName(controlName)
    return item
  }

  updateNewControl (parentId: string, newControlId: string, newControlData: controlData) {
    this.addControl({
      userFormId: this.userFormId,
      controlId!: parentId,
      addId: newControlId,
      item: newControlData
    })
  }
  getLowestIndex (tempControls: string[], controlLength: number, propertyType: boolean) {
    let lastControlId = controlLength
    const userData = this.userformData[this.userFormId]
    for (let i = 0; i < tempControls.length; i++) {
      const propetyName = propertyType ? userData[tempControls[i]].extraDatas!.zIndex! : userData[tempControls[i]].extraDatas!.TabIndex!
      if (propetyName !== -1) {
        const IdNum = propetyName
        if (!isNaN(IdNum) && lastControlId > IdNum) {
          lastControlId = IdNum
        }
      }
    }
    return lastControlId
  }
  updateZIndexValue (id: string) {
    const userData = this.userformData[this.userFormId]
    const container = this.getContainerList(id)[0]
    const containerControls = this.userformData[this.userFormId][container].controls
    const controlType = userData[id].type
    if (controlType === 'MultiPage' || controlType === 'Frame' || controlType === 'ListBox') {
      this.updateExtraDatas(id, 'zIndex', userData[container].controls.length)
    } else {
      const tempControls = []
      for (const index in containerControls) {
        const cntrlData = this.userformData[this.userFormId][containerControls[index]]
        if (cntrlData.type === 'MultiPage' || cntrlData.type === 'Frame' || cntrlData.type === 'ListBox') {
          tempControls.push(containerControls[index])
        }
      }
      const lastControlId = tempControls.length > 0 ? this.getLowestIndex(tempControls, userData[container].controls.length, true)
        : this.userformData[this.userFormId][container].controls.length
      this.updateExtraDatas(id, 'zIndex', lastControlId)
      for (const index of tempControls) {
        const cntrlZIndex = this.userformData[this.userFormId][index].extraDatas!.zIndex!
        this.updateExtraDatas(index, 'zIndex', cntrlZIndex + 1)
      }
    }
  }
  updateTabIndexValue (id: string) {
    const userData = this.userformData[this.userFormId]
    const container = this.getContainerList(id)[0]
    const containerControls = this.userformData[this.userFormId][container].controls
    const controlType = userData[id].type
    if (controlType === 'FDImage') {
      this.updateExtraDatas(id, 'TabIndex', userData[container].controls.length - 1)
    } else {
      const tempControls = []
      for (const index in containerControls) {
        const cntrlData = this.userformData[this.userFormId][containerControls[index]]
        if (cntrlData.type === 'FDImage') {
          tempControls.push(containerControls[index])
        }
      }
      const lastControlId = tempControls.length > 0 ? this.getLowestIndex(tempControls, userData[container].controls.length - 1, false)
        : this.userformData[this.userFormId][container].controls.length - 1
      this.updateTabIndex(id, lastControlId)
      for (const index of tempControls) {
        const cntrlTabIndex = this.userformData[this.userFormId][index].extraDatas!.TabIndex!
        this.updateExtraDatas(index, 'TabIndex', cntrlTabIndex + 1)
      }
    }
  }
  updateExtraDatas (id: string, propertyName: keyof extraDatas, value: number) {
    this.updateControlExtraData({
      userFormId: this.userFormId,
      controlId: id,
      propertyName: propertyName,
      value: value
    })
  }
  updateTabIndex (id: string, value: number) {
    this.updateControl({
      userFormId: this.userFormId,
      controlId: id,
      propertyName: 'TabIndex',
      value: value
    })
  }
  /**
   * @description  add the control to its respective  container
   * @function addControlObj
   * @param event  - it is of type MouseEvent
   * @param userFormId - selected Userform
   * @event click
   */
  addControlObj (e: MouseEvent, pageId: string) {
    if (this.toolBoxSelect !== 'Select' && this.toolBoxSelect !== '') {
      const container = this.userformData[this.userFormId][this.controlId]
      const containerProp = container.properties
      const type = this.userformData[this.userFormId][this.controlId].type
      const item = this.generateControlId(this.toolBoxSelect)
      const sw = parseInt(this.selectedAreaStyle!.width!)
      const sh = parseInt(this.selectedAreaStyle!.height)

      item.properties.Left = (isNaN(sw!) || sw! === 0) ? e.offsetX : parseInt(this.selectedAreaStyle!.left)
      item.properties.Top = (isNaN(sh!) || sh! === 0) ? e.offsetY : parseInt(this.selectedAreaStyle!.top)
      item.properties.Width = (isNaN(sw!) || sw! === 0) ? item.properties.Width : sw
      item.properties.Height = (isNaN(sh!) || sh! === 0) ? item.properties.Height : sh
      if (container.type === 'Userform' || container.type === 'Frame') {
        item.properties.BackColor = this.backColorProp.includes(item.type) ? containerProp.BackColor : item.properties.BackColor
        item.properties.ForeColor = this.foreColorProp.includes(item.type) ? containerProp.ForeColor : item.properties.ForeColor
        item.properties.Font = this.fontProp.includes(item.type) ? { ...containerProp.Font } : { ...item.properties.Font }
      }
      const controls = item.controls
      item.controls = item.type === 'MultiPage' ? [] : item.controls
      const newControlId = type === 'MultiPage' ? pageId : this.controlId
      this.updateNewControl(newControlId, item.properties.ID, item)
      this.updateTabIndexValue(item.properties.ID)
      this.updateZIndexValue(item.properties.ID)

      if (item.type === 'MultiPage' && controls.length > 0) {
        for (let i = 0; i < controls.length; i++) {
          const parentId = item.properties.ID.split('MultiPage').pop()
          const controlName = `Page${parentId}_`
          const pageObj = this.generateControlId(controlName)
          const count = this.getPageCount(item.properties.ID)
          pageObj.properties.Caption = `Page${count + i}`
          pageObj.properties.Name = `Page${count + i}`
          pageObj.properties.Index = i
          this.updateNewControl(item.properties.ID, pageObj.properties.ID, pageObj)
        }
      }
      this.selectControl({
        userFormId: this.userFormId,
        select: {
          container: this.getContainerList(item.properties.ID),
          selected: [item.properties.ID]
        }
      })
    }
    this.changeToolBoxSelect('Select')
    if (this.activateCtrl) {
      const type = this.userformData[this.userFormId][this.controlId].type
      const userData = this.userformData[this.userFormId]
      const controlData: controlData = type === 'MultiPage' ? userData[pageId] : this.data
      if (controlData.properties.ID === this.selectedControls[this.userFormId].container[0]) {
        let left = 0
        let right = 0
        let top = 0
        let bottom = 0
        if (this.activateCtrl) {
          let mainSelected = this.selectedControls[this.userFormId].selected[0]
          let divstyle: Array<IGroupStyle> = []
          if (mainSelected.startsWith('group') || userData[this.controlId].properties.GroupID !== '') {
            EventBus.$emit('getGroupSize', (divstayleArray: Array<IGroupStyle>) => {
              divstyle = divstayleArray
            })
          }
          let mainCtrl: controlProperties = { ID: '' }
          if (mainSelected.startsWith('group')) {
            const getIndex = divstyle.findIndex(val => val.groupName === mainSelected)
            mainCtrl = {
              Left: parseInt(divstyle[getIndex].left!),
              Top: parseInt(divstyle[getIndex].top!),
              Width: parseInt(divstyle[getIndex].width!),
              Height: parseInt(divstyle[getIndex].height!),
              ID: ''
            }
          } else {
            mainCtrl = userData[mainSelected].properties
            if (this.selectedControls[this.userFormId].selected.length === 1) {
              const selType = this.userformData[this.userFormId][mainSelected].type
              if (selType === 'Userform' || selType === 'Frame' || selType === 'Page' || selType === 'MultiPage') {
                mainSelected = ''
              }
            }
          }
          if (mainSelected !== '') {
            let sideCtrl = {
              Left: e.offsetX,
              Top: e.offsetY,
              Width: 0,
              Height: 0,
              ID: ''
            }
            const selectedSize = {
              Left: mainCtrl.Left! < sideCtrl.Left! ? mainCtrl.Left! : sideCtrl.Left!,
              Top: mainCtrl.Top! < sideCtrl.Top! ? mainCtrl.Top! : sideCtrl.Top!,
              Width: (mainCtrl.Left! + mainCtrl.Width!) > (sideCtrl.Left! + sideCtrl.Width!) ? mainCtrl.Left! + mainCtrl.Width! : sideCtrl.Left! + sideCtrl.Width!,
              Height: (mainCtrl.Top! + mainCtrl.Height!) > (sideCtrl.Top! + sideCtrl.Height!) ? mainCtrl.Top! + mainCtrl.Height! : sideCtrl.Top! + sideCtrl.Height!
            }
            left = selectedSize.Left
            top = selectedSize.Top
            right = selectedSize.Width
            bottom = selectedSize.Height
          }
        } else {
          left = parseInt(this.selectedAreaStyle!.left)
          right =
          parseInt(this.selectedAreaStyle!.left) +
          parseInt(this.selectedAreaStyle!.width)
          top = parseInt(this.selectedAreaStyle!.top)
          bottom =
          parseInt(this.selectedAreaStyle!.top) +
          parseInt(this.selectedAreaStyle!.height)
        }
        const leftArray: Array<number> = []
        if (left !== right || top !== bottom) {
          this.selectedControlArray = []
          for (let i in controlData.controls) {
            const key: string = controlData.controls[i]
            const controlProp: controlProperties = this.userformData[this.userFormId][key].properties
            if (
              left <= controlProp!.Left! + controlProp!.Width! &&
              right >= controlProp!.Left! &&
              top <= controlProp!.Top! + controlProp!.Height! &&
              bottom >= controlProp!.Top!
            ) {
              if (!this.selectedControlArray.includes(key)) { this.selectedControlArray.push(key) }
            }
          }
          const selectedGroup: string[] = []
          for (const val of this.selectedControlArray) {
            const controlGroupId: string = this.userformData[this.userFormId][val]
              .properties.GroupID!
            if (controlGroupId && controlGroupId !== '') {
              !selectedGroup.includes(controlGroupId)! &&
                selectedGroup.push(controlGroupId)
            } else {
              selectedGroup.push(val)
            }
          }
          if (this.selectedControlArray.length !== 0) {
            this.selectControl({
              userFormId: this.userFormId,
              select: {
                container: this.getContainerList(selectedGroup[0]),
                selected: [...selectedGroup]
              }
            })
          }
        }
      }
    }
    EventBus.$emit('getCtrlEditMode', this.isEditMode)
  }
  createPageName (pageList: string[]) {
    let lastControlId = 0
    for (let i of pageList) {
      if (i.indexOf('Page') !== -1) {
        const IdNum = i.split('Page').pop() || '-1'
        const pasreId = parseInt(IdNum, 10)
        if (!isNaN(pasreId) && lastControlId < pasreId) {
          lastControlId = pasreId
        }
      }
    }
    return lastControlId + 1
  }
  getPageCount (container: string) {
    const containerList = this.getContainerList(container)
    const pageList: string[] = []
    for (const id of containerList) {
      const type = this.userformData[this.userFormId][id].type
      if (type === 'MultiPage') {
        for (const pageId of this.userformData[this.userFormId][id].controls) {
          pageList.push(this.userformData[this.userFormId][pageId].properties.Name!)
        }
      }
    }
    const name = this.createPageName(pageList)
    return name
  }

  /**
   * @description  deactivate the all control present in container
   * @function deActiveControl
   * @param this  - VueComponent of container
   * @event mousedown
   */
  deActiveControl () {
    const controlType: string = this.userformData[this.userFormId][this.controlId].type
    if (this.selMultipleCtrl === false && this.activateCtrl === false) {
      this.selectControl({
        userFormId: this.userFormId,
        select: { container: controlType === 'Userform' ? [this.controlId] : this.getContainerList(this.controlId), selected: [this.controlId] }
      })
    }
  }

  /**
   * @description to drag and select  the contol in container
   * @function calSelectedAreaStyle
   * @param event  - it is of type MouseEvent
   * @event mouseup
   */
  calSelectedAreaStyle (event: MouseEvent, pageData: controlData) {
    const type = this.userformData[this.userFormId][this.controlId].type
    const controlData: controlData = type === 'MultiPage' ? pageData : this.data
    const left = parseInt(this.selectedAreaStyle!.left)
    const right =
        parseInt(this.selectedAreaStyle!.left) +
        parseInt(this.selectedAreaStyle!.width)
    const top = parseInt(this.selectedAreaStyle!.top)
    const bottom =
        parseInt(this.selectedAreaStyle!.top) +
        parseInt(this.selectedAreaStyle!.height)
    const leftArray: Array<number> = []
    if (left !== right || top !== bottom) {
      for (let i in controlData.controls) {
        const key: string = controlData.controls[i]
        const controlProp: controlProperties = this.userformData[this.userFormId][key].properties
        if (
          left <= controlProp!.Left! + controlProp!.Width! &&
            right >= controlProp!.Left! &&
            top <= controlProp!.Top! + controlProp!.Height! &&
            bottom >= controlProp!.Top!
        ) {
          this.selectedControlArray.push(key)
        }
      }
      const selectedGroup: string[] = []
      for (const val of this.selectedControlArray) {
        const controlGroupId: string = this.userformData[this.userFormId][val]
          .properties.GroupID!
        if (controlGroupId && controlGroupId !== '') {
          !selectedGroup.includes(controlGroupId)! &&
              selectedGroup.push(controlGroupId)
        } else {
          selectedGroup.push(val)
        }
      }
      if (this.selectedControlArray.length !== 0) {
        if (this.selMultipleCtrl) {
          let selected = [...this.selectedControls[this.userFormId].selected]
          if (selected[0] === controlData.properties.ID) {
            selected = []
          } else {
            selected = [...selected]
          }
          let combineArray = selected.filter(x => !selectedGroup.includes(x)).concat(selectedGroup.filter(x => !selected.includes(x)))
          this.selectControl({
            userFormId: this.userFormId,
            select: {
              container: combineArray.length > 0 ? this.getContainerList(combineArray[0]) : this.selectedControls[this.userFormId].container,
              selected: combineArray.length > 0 ? combineArray : [this.selectedControls[this.userFormId].container[0]]
            }
          })
        } else {
          this.selectControl({
            userFormId: this.userFormId,
            select: {
              container: this.getContainerList(selectedGroup[0]),
              selected: [...selectedGroup]
            }
          })
        }
      }
    }
  }
}
