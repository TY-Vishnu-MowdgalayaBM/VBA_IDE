<template>
  <div>
    <div class="outercontext-div">
      <div class="wrapper-context" v-for="(value, i) in values" :key="i">
        <button
          class="wrapper1-context"
          v-if="value.values.length === 0"
          :style="{
            border: value.text === 'none' ? '0.3px solid white' : '',
            background: value.text === 'none' ? 'white' : '',
            height: value.text === 'none' ? '4px' : '',
            'padding-top': value.text === 'none' ? '0px' : '',
            outline: value.text === 'none' ? 'none' : '',
          }"
          @mousedown.stop="value.disabled === false ? controlAction($event,value.id) : controlDisable($event)"
        >
          <div>
            <FDSVGImage v-if="value.icon" :name="value.icon" />
          </div>
          <span v-if="value.text === 'none'">
            <hr />
          </span>
          <span
            v-else
            class="set-context"
            v-html="value.text"
            :style="{ opacity: value.disabled ? 0.5 : 1 }"
            >{{ value.text }}
          </span>
        </button>
        <button class="wrapper1-context wrapper21" v-else>
          <div></div>
          <ul class="set-context top-level-menu">
            <li>
              <a href="#" v-html="value.text"  @mousedown.prevent.stop>{{ value.text }}</a>
              <ul class="third-level-menu">
                <li
                  class="wrapper1-context"
                  v-for="(subVal, i) in value.values"
                  :key="i"
                  :style="{
                    border: subVal.text === 'none' ? '0.3px solid white' : '',
                    background: subVal.text === 'none' ? 'white' : '',
                    height: subVal.text === 'none' ? '4px' : '',
                    'padding-top': subVal.text === 'none' ? '0px' : '',
                    outline: subVal.text === 'none' ? 'none' : '',
                  }"
                  @mousedown.stop="subVal.disabled === false ? controlAction($event,value.id, subVal.id): controlDisable($event)"
                >
                  <div>
                    <FDSVGImage v-if="subVal.icon" :name="subVal.icon" />
                  </div>
                  <a v-if="subVal.text === 'none'">
                    <hr />
                  </a>
                  <a
                    v-else
                    href="#"
                    v-html="subVal.text"
                    :style="{ opacity: subVal.disabled ? 0.5 : 1 }"
                    >{{ subVal.text }}</a
                  >
                </li>
              </ul>
            </li>
          </ul>
          <div style="margin-top: 2px;">
          <div class="triangle-right"></div>
          </div>
        </button>
      </div>
    </div>
    <div></div>
    <div></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import FDSVGImage from '@/FormDesigner/components/atoms/FDSVGImage/index.vue'
import { ControlPropertyData } from '@/FormDesigner/models/ControlsTableProperties/ControlPropertyData.ts'

import { Action, State } from 'vuex-class'
import {
  IaddChildControls,
  IaddControl,
  IdeleteControl,
  IselectControl,
  IsetChildControls,
  IupdateControl,
  IupdateControlExtraData,
  IupdateCopyControlList,
  IupdateGroup
} from '@/storeModules/fd/actions'
import { EventBus } from '@/FormDesigner/event-bus'
import FDCommonMethod from '@/api/abstract/FormDesigner/FDCommonMethod'

@Component({
  name: 'ContextMenu',
  components: {
    FDSVGImage
  }
})
export default class ContextMenu extends FDCommonMethod {
  @Prop() values: Array<IControlContextMenu>;
  @Prop() userFormId: string;
  @Prop() containerId: string;
  @Prop() keyEventName: string;
  @Prop() controlId: string;
  @Prop() selectedTab: number;
  @Prop() data: controlData;
  @Prop() groupStyleArray: Array<IGroupStyle>
  @Prop() contextMenutype: string
  @Prop() editTextRef: HTMLSpanElement | HTMLTextAreaElement
  @Prop() copiedText: string
  @Prop() textMenu: boolean

  @State((state) => state.fd.selectedControls)
  selectedControls!: fdState['selectedControls'];
  @State((state: rootState) => state.fd.copyControlList)
  copyControlList!: fdState['copyControlList'];
  @State((state) => state.fd.userformData) userformData!: userformData;
  @State((state) => state.fd.copiedControl) copiedControl!: userformData;
  @State((state) => state.fd.groupedControls)
  groupedControls!: fdState['groupedControls'];

  @Action('fd/deleteControl') deleteControl!: (payload: IdeleteControl) => void;
  @Action('fd/deleteCopiedControl') deleteCopiedControl!: (payload: IdeleteControl) => void;
  @Action('fd/updateCopyControlList') updateCopyControlList!: (
    payload: IupdateCopyControlList
  ) => void;
  @Action('fd/addControl') addControl!: (payload: IaddControl) => void;
  @Action('fd/addCopiedControl') addCopiedControl!: (
    payload: IaddControl
  ) => void;
  @Action('fd/selectControl') selectControl!: (payload: IselectControl) => void;
  @Action('fd/updateGroup') updateGroup!: (payload: IupdateGroup) => void;
  @Action('fd/updateControlExtraData') updateControlExtraData!: (
    payload: IupdateControlExtraData
  ) => void;
  @Action('fd/updateControl') updateControl!: (payload: IupdateControl) => void;
  @Action('fd/setChildControls') setChildControls!: (
    payload: IsetChildControls
  ) => void;
  @Action('fd/addChildControls') addChildControls!: (
    payload: IaddChildControls
  ) => void;
  controlAction (event: Event, controlActionName: string, subVal: string) {
    if (this.textMenu === false) {
      if (controlActionName === 'ID_COPY') {
        this.copyControl('copy')
      } else if (controlActionName === 'ID_DELETE') {
        this.clickDelete()
      } else if (controlActionName === 'ID_PASTE') {
        this.pasteControl()
      } else if (controlActionName === 'ID_CUT') {
        this.cutControl()
      } else if (controlActionName === 'ID_SELECTALL') {
        this.selectAll()
      } else if (controlActionName === 'ID_GROUP') {
        this.groupControl()
      } else if (controlActionName === 'ID_UNGROUP') {
        this.unGroupControl()
      } else if (controlActionName === 'ID_NEWPAGE') {
        this.addNewPage()
      } else if (controlActionName === 'ID_DELETEPAGE') {
        this.deleteCurrentPage()
      } else if (controlActionName === 'ID_CONTROLFORWARD') {
        this.bringForward()
      } else if (controlActionName === 'ID_CONTROLBACKWARD') {
        this.bringBackward()
      } else if (controlActionName === 'ID_OBJECTPROP') {
        this.displayProp()
      } else if (controlActionName === 'ID_RENAME') {
        const selectedPageID = this.selectedControls[this.userFormId].selected[0]
        EventBus.$emit(
          'renamePage',
          this.userFormId,
          selectedPageID,
          this.selectedTab,
          this.userformData[this.userFormId][selectedPageID].type
        )
      } else if (controlActionName === 'ID_MOVE') {
        const type = this.userformData[this.userFormId][this.controlId].type
        const selectedPageID = this.selectedControls[this.userFormId].selected[0]
        if (type === 'MultiPage') {
          const value = this.userformData[this.userFormId][this.controlId].properties.Value
          EventBus.$emit('userFormTabOrder', this.userFormId, this.controlId, type, value, selectedPageID)
        } else {
          const value = this.userformData[this.userFormId][this.controlId].properties.Value
          EventBus.$emit('tabStripTabOrder', this.userFormId, this.controlId, type, value)
        }
      } else if (controlActionName === 'ID_TABORDER') {
        EventBus.$emit('userFormTabOrder', this.userFormId, this.containerId, '', -1, '')
      } else if (
        controlActionName === 'ID_ALIGN' ||
      controlActionName === 'ID_MAKESAMESIZE'
      ) {
        this.controlAlignMent(subVal)
      }
    } else {
      if (controlActionName === 'ID_COPY') {
        this.copyText()
      } else if (controlActionName === 'ID_DELETE') {
        this.deleteText()
      } else if (controlActionName === 'ID_PASTE') {
        if (event instanceof MouseEvent) {
          this.pasteText(event)
        }
      } else if (controlActionName === 'ID_CUT') {
        this.cutText()
      } else if (controlActionName === 'ID_OBJECTPROP') {
        this.displayProp()
      }
    }
    this.closeMenu()
  }
  cutText () {
    document.execCommand('cut')
  }
  deleteText () {
    document.execCommand('delete')
  }
  copyText () {
    document.execCommand('copy')
  }
  pasteText (event: MouseEvent) {
    const controlType = this.userformData[this.userFormId][this.controlId].type
    const position = this.getCursorPos(event)
    const length = position.endPosition - position.startPosition
    let baseValue = this.editTextRef.innerText.split('')
    baseValue.splice(position.startPosition, length)
    const updateValue = baseValue.slice(0, position.startPosition).join('') + this.copiedText + baseValue.slice(position.startPosition).join('')
    EventBus.$emit('updateText', updateValue)
  }
  getCursorPos (event: MouseEvent) {
    let startPosition = 0
    let endPosition = 0
    const isSupported = typeof window.getSelection !== 'undefined'
    if (isSupported) {
      const selection = window.getSelection()!
      if (selection.anchorOffset > selection.focusOffset) {
        startPosition = selection.focusOffset
        endPosition = selection.anchorOffset
      } else if (selection.anchorOffset === selection.focusOffset) {
        startPosition = selection.focusOffset
        endPosition = selection.focusOffset
      } else {
        startPosition = selection.anchorOffset
        endPosition = selection.focusOffset
      }
    }
    return { startPosition: startPosition, endPosition: endPosition }
  }
  created () {
    EventBus.$on('groupControl', (value: string) => {
      if (value === 'group') {
        this.groupControl()
      } else if (value === 'ungroup') {
        this.unGroupControl()
      }
    })
  }
  // destroyed () {
  //   EventBus.$off('groupControl')
  // }
  @Emit('closeMenu')
  closeMenu () {
    return 0
  }

  displayProp () {
    EventBus.$emit('dispProp', false)
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
    const pageList: string[] = []
    for (const pageId of this.userformData[this.userFormId][container].controls) {
      pageList.push(this.userformData[this.userFormId][pageId].properties.Name!)
    }
    const name = this.createPageName(pageList)
    return name
  }

  addNewPage () {
    const type = this.userformData[this.userFormId][this.controlId].type
    if (type === 'TabStrip') {
      const tabControlData = JSON.parse(
        JSON.stringify(this.userformData[this.userFormId][this.controlId])
      ).extraDatas.Tabs
      let prevTabId = -1
      const initialTabData: tabsItems = {
        Name: '',
        Caption: '',
        ToolTip: '',
        Accelerator: ''
      }
      if (tabControlData.length > 0) {
        for (let i = 0; i < tabControlData.length; i++) {
          const id = tabControlData[i].Name.split('Tab').pop() || '-1'
          const parseId = parseInt(id, 10)
          if (!isNaN(parseId) && prevTabId < parseId) {
            prevTabId = parseId
          }
        }
        prevTabId += 1
        initialTabData.Name = `Tab${prevTabId}`
        initialTabData.Caption = `Tab${prevTabId}`
      } else {
        initialTabData.Name = `Tab${1}`
        initialTabData.Caption = `Tab${1}`
      }
      tabControlData.push(initialTabData)
      this.updateControlExtraData({
        userFormId: this.userFormId,
        controlId: this.controlId,
        propertyName: 'Tabs',
        value: tabControlData
      })
      this.updateControl({
        userFormId: this.userFormId,
        controlId: this.controlId,
        propertyName: 'Value',
        value: prevTabId - 1
      })
    } else if (type === 'MultiPage') {
      const parentId = this.controlId.split('MultiPage').pop()
      const controlName = `Page${parentId}_`

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
      let controlObj = controlPropData.data['Page']
      const item = JSON.parse(JSON.stringify(controlObj!))
      lastControlId += 1
      item.properties.ID = `ID_${controlName}${lastControlId}`
      const count = this.getPageCount(this.controlId)
      item.properties.Caption = `Page${count}`
      item.properties.Name = `Page${count}`
      item.properties.Index = this.userformData[this.userFormId][this.controlId].controls.length
      this.addControl({
        userFormId: this.userFormId,
        controlId: this.controlId,
        addId: item.properties.ID,
        item: item
      })
      this.updateControl({
        userFormId: this.userFormId,
        controlId: this.controlId,
        propertyName: 'Value',
        value: item.properties.Index
      })
      this.selectControl({
        userFormId: this.userFormId,
        select: {
          container: this.getContainerList(item.properties.ID),
          selected: [item.properties.ID]
        }
      })
      EventBus.$emit('updateMultiPageValue')
    }
  }
  bringForward () {
    const userData = this.userformData[this.userFormId]
    const highProrControl = []
    const lowProrControl = []
    const container = this.getContainerList(this.getSelectedControlsDatas![0])[0]
    const containerControls = this.userformData[this.userFormId][container].controls
    for (const index in containerControls) {
      const cntrlData = this.userformData[this.userFormId][containerControls[index]]
      if (cntrlData.type === 'MultiPage' || cntrlData.type === 'Frame' || cntrlData.type === 'ListBox') {
        highProrControl.push(containerControls[index])
      } else {
        lowProrControl.push(containerControls[index])
      }
    }
    let nextSelctedSeries: string[] = []
    let nextHighControlSeries: string[] = []
    const getSelControl = [...this.getSelectedControlsDatas!]
    getSelControl.sort((a, b) => {
      return userData[a].extraDatas!.zIndex! - userData[b].extraDatas!.zIndex!
    })
    for (const selControl of getSelControl!) {
      const type = userData[selControl].type
      const tempZIndex = userData[selControl].extraDatas!.zIndex!
      const controlIndex = Object.keys(userData).findIndex((val: string, index: number) => {
        return 'zIndex' in userData[val].extraDatas! && (userData[val].extraDatas!.zIndex === tempZIndex + 1)
      })
      const nextSelectedControl = controlIndex !== -1 ? Object.keys(userData)[controlIndex] : ''
      if (nextSelectedControl !== '' && !highProrControl.includes(nextSelectedControl)) {
        if (getSelControl!.includes(nextSelectedControl)) {
          if (!nextSelctedSeries.includes(selControl)) {
            nextSelctedSeries.push(selControl)
          }
          if (!nextSelctedSeries.includes(nextSelectedControl)) {
            nextSelctedSeries.push(nextSelectedControl)
          }
        } else {
          if (Object.keys(nextSelctedSeries).length !== 0) {
            const tempExchageIndex = userData[nextSelctedSeries[0]].extraDatas!.zIndex!
            const swapTabIndex = userData[nextSelectedControl].extraDatas!.zIndex!
            if (swapTabIndex <= userData[container].controls.length /* && swapTabIndex > 0 */) {
              const index = userData[container].controls.findIndex(
                (val) => userData[val].extraDatas!.zIndex === swapTabIndex
              )
              this.updateExtraDatas(userData[container].controls[index], 'zIndex', tempExchageIndex)
              this.updateExtraDatas(nextSelctedSeries[0], 'zIndex', swapTabIndex - (nextSelctedSeries!.length - 1))
            }
            for (let j = 1; j < nextSelctedSeries.length; j++) {
              const updateIndex = userData[nextSelctedSeries[j]].extraDatas!.zIndex! + 1
              this.updateExtraDatas(nextSelctedSeries[j], 'zIndex', updateIndex)
            }
            nextSelctedSeries = []
          } else {
            const swapTabIndex = userData[nextSelectedControl].extraDatas!.zIndex!
            if (swapTabIndex <= userData[container].controls.length /* && swapTabIndex > 0 */) {
              const index = userData[container].controls.findIndex(
                (val) => userData[val].extraDatas!.zIndex === swapTabIndex
              )
              this.updateExtraDatas(selControl, 'zIndex', swapTabIndex)
              this.updateExtraDatas(nextSelectedControl, 'zIndex', tempZIndex)
            }
          }
        }
      } else {
        if (getSelControl!.includes(nextSelectedControl) && (type === 'Frame' || type === 'MultiPage' || type === 'ListBox')) {
          if (!nextHighControlSeries.includes(selControl)) {
            nextHighControlSeries.push(selControl)
          }
          if (!nextHighControlSeries.includes(nextSelectedControl)) {
            nextHighControlSeries.push(nextSelectedControl)
          }
        } else if (type === 'Frame' || type === 'MultiPage' || type === 'ListBox') {
          if (Object.keys(nextHighControlSeries).length !== 0) {
            const tempExchageIndex = userData[nextHighControlSeries[0]].extraDatas!.zIndex!
            const swapTabIndex = userData[nextSelectedControl].extraDatas!.zIndex!
            if (swapTabIndex <= userData[container].controls.length) {
              const index = userData[container].controls.findIndex(
                (val) => userData[val].extraDatas!.zIndex === swapTabIndex
              )
              this.updateExtraDatas(userData[container].controls[index], 'zIndex', tempExchageIndex)
              this.updateExtraDatas(nextHighControlSeries[0], 'zIndex', swapTabIndex - (nextHighControlSeries!.length - 1))
            }
            for (let j = 1; j < nextHighControlSeries.length; j++) {
              const updateIndex = userData[nextHighControlSeries[j]].extraDatas!.zIndex! + 1
              this.updateExtraDatas(nextHighControlSeries[j], 'zIndex', updateIndex)
            }
            nextHighControlSeries = []
          } else {
            const swapTabIndex = userData[nextSelectedControl].extraDatas!.zIndex!
            if (swapTabIndex <= userData[container].controls.length /* && swapTabIndex > 0 */) {
              const index = userData[container].controls.findIndex(
                (val) => userData[val].extraDatas!.zIndex === swapTabIndex
              )
              this.updateExtraDatas(selControl, 'zIndex', swapTabIndex)
              this.updateExtraDatas(nextSelectedControl, 'zIndex', tempZIndex)
            }
          }
        }
      }
    }
  }
  bringBackward () {
    const userData = this.userformData[this.userFormId]
    const highProrControl = []
    const lowProrControl = []
    const container = this.getContainerList(this.getSelectedControlsDatas![0])[0]
    const containerControls = this.userformData[this.userFormId][container].controls
    for (const index in containerControls) {
      const cntrlData = this.userformData[this.userFormId][containerControls[index]]
      if (cntrlData.type === 'MultiPage' || cntrlData.type === 'Frame' || cntrlData.type === 'ListBox') {
        highProrControl.push(containerControls[index])
      } else {
        lowProrControl.push(containerControls[index])
      }
    }
    let nextSelctedSeries: string[] = []
    let nextHighControlSeries: string[] = []
    const getSelControl = [...this.getSelectedControlsDatas!]
    getSelControl.sort((a, b) => {
      return userData[a].extraDatas!.zIndex! - userData[b].extraDatas!.zIndex!
    })
    for (const selControl of getSelControl) {
      const type = userData[selControl].type
      const tempZIndex = userData[selControl].extraDatas!.zIndex!
      const controlIndex = Object.keys(userData).findIndex((val: string, index: number) => {
        return 'zIndex' in userData[val].extraDatas! && (userData[val].extraDatas!.zIndex === tempZIndex - 1)
      })
      const nextSelectedControl = controlIndex !== -1 ? Object.keys(userData)[controlIndex] : ''
      if (nextSelectedControl !== '' && !highProrControl.includes(selControl)) {
        if (getSelControl!.includes(nextSelectedControl)) {
          if (!nextSelctedSeries.includes(selControl)) {
            nextSelctedSeries.push(selControl)
          }
          if (!nextSelctedSeries.includes(nextSelectedControl)) {
            nextSelctedSeries.push(nextSelectedControl)
          }
        } else {
          if (Object.keys(nextSelctedSeries).length !== 0) {
            const tempExchageIndex = userData[nextSelctedSeries[0]].extraDatas!.zIndex!
            const swapTabIndex = userData[nextSelectedControl].extraDatas!.zIndex!
            if (swapTabIndex <= userData[container].controls.length && swapTabIndex > 0) {
              const index = userData[container].controls.findIndex(
                (val) => userData[val].extraDatas!.zIndex === swapTabIndex
              )
              this.updateExtraDatas(userData[container].controls[index], 'zIndex', tempExchageIndex)
              this.updateExtraDatas(nextSelctedSeries[0], 'zIndex', (nextSelctedSeries!.length + 1) - swapTabIndex)
            }
            for (let j = 1; j < nextSelctedSeries.length; j++) {
              const updateIndex = userData[nextSelctedSeries[j]].extraDatas!.zIndex! - 1
              this.updateExtraDatas(nextSelctedSeries[j], 'zIndex', updateIndex)
            }
            nextSelctedSeries = []
          } else {
            const swapTabIndex = userData[nextSelectedControl].extraDatas!.zIndex!
            if (swapTabIndex <= userData[container].controls.length && swapTabIndex > 0) {
              const index = userData[container].controls.findIndex(
                (val) => userData[val].extraDatas!.zIndex === swapTabIndex
              )
              this.updateExtraDatas(selControl, 'zIndex', swapTabIndex)
              this.updateExtraDatas(nextSelectedControl, 'zIndex', tempZIndex)
            }
          }
        }
      } else if (!lowProrControl.includes(nextSelectedControl) && (type === 'Frame' || type === 'MultiPage' || type === 'ListBox')) {
        if (getSelControl!.includes(nextSelectedControl)) {
          if (!nextHighControlSeries.includes(selControl)) {
            nextHighControlSeries.push(selControl)
          }
          if (!nextHighControlSeries.includes(nextSelectedControl)) {
            nextHighControlSeries.push(nextSelectedControl)
          }
        } else {
          if (Object.keys(nextHighControlSeries).length !== 0) {
            const tempExchageIndex = userData[nextHighControlSeries[0]].extraDatas!.zIndex!
            const swapTabIndex = userData[nextSelectedControl].extraDatas!.zIndex!
            if (swapTabIndex <= userData[container].controls.length) {
              const index = userData[container].controls.findIndex(
                (val) => userData[val].extraDatas!.zIndex === swapTabIndex
              )
              this.updateExtraDatas(userData[container].controls[index], 'zIndex', tempExchageIndex)
              this.updateExtraDatas(nextHighControlSeries[0], 'zIndex', (nextHighControlSeries!.length + 1) - swapTabIndex)
            }
            for (let j = 1; j < nextHighControlSeries.length; j++) {
              const updateIndex = userData[nextHighControlSeries[j]].extraDatas!.zIndex! - 1
              this.updateExtraDatas(nextHighControlSeries[j], 'zIndex', updateIndex)
            }
            nextHighControlSeries = []
          } else {
            const swapTabIndex = userData[nextSelectedControl].extraDatas!.zIndex!
            if (swapTabIndex <= userData[container].controls.length && swapTabIndex > 0) {
              const index = userData[container].controls.findIndex(
                (val) => userData[val].extraDatas!.zIndex === swapTabIndex
              )
              this.updateExtraDatas(selControl, 'zIndex', swapTabIndex)
              this.updateExtraDatas(nextSelectedControl, 'zIndex', tempZIndex)
            }
          }
        }
      }
    }
  }
  deletePageIndex (id: string) {
    const userData = this.userformData[this.userFormId]
    const container = this.selectedControls[this.userFormId].container[0]
    const tempIndex = userData[id].properties!.Index!
    for (const key in userData[container].controls) {
      const controlZIndex = userData[userData[container].controls[key]].properties!.Index!
      if (controlZIndex > tempIndex) {
        this.updateControl({
          userFormId: this.userFormId,
          controlId: userData[container].controls[key],
          propertyName: 'Index',
          value: controlZIndex - 1
        })
      }
    }
  }
  deleteCurrentPage () {
    const type = this.userformData[this.userFormId][this.controlId].type
    if (type === 'TabStrip') {
      const tabControlData = JSON.parse(
        JSON.stringify(this.userformData[this.userFormId][this.controlId])
      ).extraDatas.Tabs
      if (tabControlData && tabControlData.length > 0) {
        tabControlData.splice(this.selectedTab, 1)
        this.updateControlExtraData({
          userFormId: this.userFormId,
          controlId: this.controlId,
          propertyName: 'Tabs',
          value: tabControlData
        })
        this.updateTabStripValue(this.selectedTab! - 1)
      }
    } else if (type === 'MultiPage') {
      const controls = this.userformData[this.userFormId][this.controlId].controls
      if (controls.length > 0) {
        this.deletePageIndex(this.selectedControls[this.userFormId].selected[0])
        const index = this.userformData[this.userFormId][this.selectedControls[this.userFormId].selected[0]].properties.Index
        this.deleteControl({
          userFormId: this.userFormId,
          parentId: this.selectedControls[this.userFormId].container[0],
          targetId: this.selectedControls[this.userFormId].selected[0]
        })
        this.updateIndex(index! - 1)
      }
      EventBus.$emit('updateMultiPageValue')
    }
  }
  updateTabStripValue (index: number) {
    const userData = this.userformData[this.userFormId]
    const tabs = userData[this.controlId].extraDatas!.Tabs!
    const tabIndex = tabs.findIndex((val, key) => key === index + 1)
    if (tabIndex !== -1) {
      const value = index + 1
      this.updateControlProperty('Value', value, this.controlId)
    } else if (tabIndex === -1 && index !== -1) {
      const value = index
      this.updateControlProperty('Value', value, this.controlId)
    } else {
      this.updateControlProperty('Value', -1, this.controlId)
    }
  }
  changeSelect (control: string) {
    this.selectControl({
      userFormId: this.userFormId,
      select: {
        container: this.getContainerList(control),
        selected: [control]
      }
    })
  }
  updateIndex (index: number) {
    const userData = this.userformData[this.userFormId]
    const controls = userData[this.controlId].controls
    const pageIndex = controls.findIndex(val => userData[val].properties.Index === index + 1)
    if (pageIndex !== -1) {
      const value = userData[controls[pageIndex]].properties.Index!
      this.updateControlProperty('Value', value, this.controlId)
      this.changeSelect(controls[pageIndex])
    } else if (pageIndex === -1 && index !== -1) {
      const updateIndex = controls.findIndex(val => userData[val].properties.Index === index)
      const value = userData[controls[updateIndex]].properties.Index!
      this.updateControlProperty('Value', value, this.controlId)
      this.changeSelect(controls[updateIndex])
    } else {
      this.updateControlProperty('Value', -1, this.controlId)
      this.changeSelect(this.controlId)
    }
  }
  updateControlProperty (
    propertyName: keyof controlProperties,
    propertyValue: number | string,
    controlId: string
  ) {
    this.updateControl({
      userFormId: this.userFormId,
      controlId: controlId,
      propertyName: propertyName,
      value: propertyValue
    })
  }

  unGroupControl () {
    const isGroup = this.selectedControls[this.userFormId].selected[0].startsWith('group')
    const selControl = this.selectedControls[this.userFormId].selected[0]
    const selected = isGroup
      ? selControl
      : this.userformData[this.userFormId][selControl].properties.GroupID!

    const controlList = []
    for (const key in this.userformData[this.userFormId]) {
      const type = this.userformData[this.userFormId][key].type
      if (
        type !== 'Userform' &&
        this.userformData[this.userFormId][key].properties.GroupID === selected
      ) {
        controlList.push(key)
      }
    }
    const groupArray = [...this.groupedControls[this.userFormId]!.groupArray!]
    this.updateControlGroupID(selected, '')
    const index = this.groupedControls[this.userFormId]!.groupArray!.findIndex(
      (val) => val === selected
    )
    groupArray.splice(index, 1)
    this.updateGroup({ userFormId: this.userFormId, groupArray: groupArray })
    this.selectControl({
      userFormId: this.userFormId,
      select: {
        container: isGroup
          ? this.getContainerList(controlList[0])
          : this.getContainerList(selControl[0]),
        selected: isGroup ? controlList : [selControl]
      }
    })
  }

  /**
   * @description To generate new GroupID
   * @function createGroupId
   */
  createGroupId () {
    let lastControlId = 0
    for (let i of this.groupedControls[this.userFormId]!.groupArray!) {
      if (i.indexOf('group') !== -1) {
        const IdNum = i.split('group').pop() || '-1'
        const pasreId = parseInt(IdNum, 10)
        if (!isNaN(pasreId) && lastControlId < pasreId) {
          lastControlId = pasreId
        }
      }
    }
    return `group${lastControlId + 1}`
  }

  @Emit('createGroup')
  createGroup (groupId: string) {
    return { groupId: groupId, containerId: this.containerId }
  }

  updateControlGroupID (groupName: string, updateGroupId: string) {
    for (const val in this.userformData[this.userFormId]) {
      if (!val.startsWith('ID_USERFORM')) {
        const controlGrpId = this.userformData[this.userFormId][val].properties
          .GroupID
        if (controlGrpId === groupName) {
          this.updateControlProperty('GroupID', updateGroupId, val)
        }
      }
    }
  }
  /**
   * @description To update the group Information in main data
   * @function groupControl
   */
  groupControl () {
    let updateGroupId: string = ''
    const selected = this.selectedControls[this.userFormId].selected

    const selectedGroupArray = selected.filter(
      (val: string) => val.startsWith('group') && val
    )
    updateGroupId = selectedGroupArray[0]
    if (selectedGroupArray.length >= 2) {
      const groupArray = [
        ...this.groupedControls[this.userFormId]!.groupArray!
      ]
      for (let i = 0; i < groupArray.length; i++) {
        for (let j = 0; j < selectedGroupArray.length; j++) {
          if (selectedGroupArray[j] === groupArray[i]) {
            this.updateControlGroupID(groupArray[i], selectedGroupArray[0])
            groupArray.splice(i, 1)
          }
        }
      }
      this.updateGroup({
        userFormId: this.userFormId,
        groupArray: [...groupArray, selectedGroupArray[0]]
      })
      updateGroupId = selectedGroupArray[0]!
    } else if (selectedGroupArray.length === 0) {
      updateGroupId = this.createGroupId()
      const groupArray = [
        ...this.groupedControls[this.userFormId]!.groupArray!,
        updateGroupId
      ]
      this.updateGroup({ userFormId: this.userFormId, groupArray: groupArray })
    }

    for (let val of selected) {
      if (!val.startsWith('group')) {
        this.updateControlProperty('GroupID', updateGroupId, val)
      }
    }
    this.createGroup(updateGroupId)
    this.selectControl({
      userFormId: this.userFormId,
      select: {
        container: this.getContainerList(updateGroupId),
        selected: [updateGroupId]
      }
    })
  }

  /**
   * @description To select all the controls in respective container present in respective userform
   * @function selectAll
   */
  selectAll () {
    // const selecetedContainer = this.selectedControls[this.userFormId].container[0]
    const controlObjectList = [
      ...this.userformData[this.userFormId][this.containerId].controls
    ]
    const selecedGroup: string[] = []
    for (const val of controlObjectList) {
      const controlGroupId: string = this.userformData[this.userFormId][val]
        .properties.GroupID!
      if (controlGroupId && controlGroupId !== '') {
        !selecedGroup.includes(controlGroupId)! &&
          selecedGroup.push(controlGroupId)
      } else {
        selecedGroup.push(val)
      }
    }

    if (controlObjectList.length !== 0) {
      this.selectControl({
        userFormId: this.userFormId,
        select: {
          container: this.getContainerList(selecedGroup[0]),
          selected: [...selecedGroup]
        }
      })
    }
  }

  /**
   * @description To update the cutted controls in respective container present in respective userform
   * @function cutControl
   */
  cutControl () {
    this.copyControl('cut')
    this.clickDelete()
  }

  /**
   * @description To update the copied controls in respective container present in respective userform
   * @function copyControl
   */
  copyControl (type: string) {
    if (this.copiedControl[this.userFormId][this.userFormId].controls.length > 0) {
      const lengthCount = this.copiedControl[this.userFormId][this.userFormId].controls.length
      const controls = [...this.copiedControl[this.userFormId][this.userFormId].controls]
      for (let i = 0; i < lengthCount; i++) {
        this.deleteCopiedControl({
          userFormId: this.userFormId,
          parentId: this.userFormId,
          targetId: controls[i]
        })
      }
    }
    const userFormData = this.userformData[this.userFormId]
    const selContainer = this.selectedControls[this.userFormId].container[0]
    const selSelected = this.selectedControls[this.userFormId].selected
    const updateSelected = []
    for (let control of selSelected) {
      if (!control.startsWith('group') && userFormData[control].type === 'Page') {
        control = this.getContainerList(control)[0]
      }
      updateSelected.push(control)
    }
    this.updateCopyControlList({
      userFormId: this.userFormId,
      parentId: selContainer,
      targetId: updateSelected,
      type: type
    })

    const recCopyControl = (daTarget: string) => {
      const daTargetControls = userFormData[daTarget].controls
      if (daTargetControls.length > 0) {
        for (let i in daTargetControls) {
          const controlObject = JSON.parse(JSON.stringify(userFormData[daTargetControls[i]]))
          const controlArray = []
          const ctrlObj = { ...controlObject, controls: [] }
          this.addCopiedControl({
            userFormId: this.userFormId,
            controlId: daTarget,
            addId: daTargetControls[i],
            item: ctrlObj
          })
          recCopyControl(daTargetControls[i])
        }
      }
    }

    for (let key of selSelected) {
      if (!key.startsWith('group')) {
        if (userFormData[key].type === 'Page') {
          key = this.getContainerList(key)[0]
        }
        const controlObject = JSON.parse(JSON.stringify(userFormData[key]))
        const ctrlObj = { ...controlObject, controls: [] }
        this.addCopiedControl({
          userFormId: this.userFormId,
          controlId: this.userFormId,
          addId: key,
          item: ctrlObj
        })
        recCopyControl(key)
      } else {
        for (let ctrlId in userFormData) {
          const controlProp = userFormData[ctrlId].properties.GroupID
          if (controlProp) {
            if (controlProp === key) {
              const controlObject = JSON.parse(
                JSON.stringify(userFormData[ctrlId])
              )
              const ctrlObj = { ...controlObject, controls: [] }
              this.addCopiedControl({
                userFormId: this.userFormId,
                controlId: this.userFormId,
                addId: ctrlId,
                item: ctrlObj
              })
              recCopyControl(ctrlId)
            }
          }
        }
      }
    }
  }
  updateNewControl (parentId: string, ctrlId: string, ctrlObj: controlData, isParent: boolean) {
    this.addControl({
      userFormId: this.userFormId,
      controlId: parentId,
      addId: ctrlId,
      item: ctrlObj
    })
    if (isParent) {
      const newTabIndex = this.userformData[this.userFormId][parentId].controls.length
      this.updateTabIndexValue(ctrlId)
      this.updateZIndexValue(ctrlId)
    }
  }

  newPasteControlId (key: string, parentId: string) {
    const userFormData = this.userformData[this.userFormId]
    let lastControlId = 0
    const type = key in userFormData ? userFormData[key].type : ''
    const parentName = parentId !== '' ? parentId.split('MultiPage').pop() : -1
    const selectedControlName: string | undefined =
    type === 'Page'
      ? `Page${parentName}_`
      : key.replace(/[0-9]/g, '').split('_').pop()
    const userformControlIds = Object.keys(userFormData)
    for (let i = 0; i < userformControlIds.length; i++) {
      if (userformControlIds[i].indexOf(selectedControlName!) !== -1) {
        const IdNum = userformControlIds[i].split(selectedControlName!).pop() || '-1'
        const pasreId = parseInt(IdNum, 10)
        if (!isNaN(pasreId) && lastControlId < pasreId) {
          lastControlId = pasreId
        }
      }
    }
    lastControlId += 1
    const Name = `${selectedControlName}${lastControlId}`
    return Name
  }
  removeChildControl (daTarget: string, deleteControl: string) {
    const removeControl = [...this.userformData[this.userFormId][daTarget].controls]
    const removeIndex = removeControl.findIndex((val) => val === deleteControl)
    removeControl.splice(removeIndex, 1)
    this.setChildControls({
      userFormId: this.userFormId,
      containerId: daTarget,
      targetControls: removeControl
    })
  }
  getPasteControlSize () {
    const usrFrmData = this.userformData[this.userFormId]
    const pasteControls = [...this.getSelectedControlsDatas!]
    const pasteContainer = this.selectedControls[this.userFormId].container[0]
    const leftArray = [...pasteControls]
    const topArray = [...pasteControls]
    const rightArray = [...pasteControls]
    const bottomArray = [...pasteControls]
    leftArray.sort((a, b) => {
      return usrFrmData[a].properties.Left! - usrFrmData[b].properties.Left!
    })
    topArray.sort((a, b) => {
      return usrFrmData[a].properties.Top! - usrFrmData[b].properties.Top!
    })
    rightArray.sort((a, b) => {
      return (usrFrmData[b].properties.Left! + usrFrmData[b].properties.Width!) -
       (usrFrmData[a].properties.Left! + usrFrmData[a].properties.Width!)
    })
    bottomArray.sort((a, b) => {
      return (usrFrmData[b].properties.Top! + usrFrmData[b].properties.Height!) -
       (usrFrmData[a].properties.Top! + usrFrmData[a].properties.Height!)
    })
    const groupRectLeft = usrFrmData[leftArray[0]].properties.Left!
    const groupRectTop = usrFrmData[topArray[0]].properties.Top!
    const groupRectBottom = usrFrmData[bottomArray[0]].properties.Top! + usrFrmData[bottomArray[0]].properties.Height!
    const groupRectRight = usrFrmData[rightArray[0]].properties.Left! + usrFrmData[rightArray[0]].properties.Width!

    const deltaTop = (groupRectBottom - groupRectTop) / 2
    const deltaLeft = (groupRectRight - groupRectLeft) / 2

    const type = this.userformData[this.userFormId][pasteContainer].type
    const container = type === 'Page' ? usrFrmData[this.getContainerList(pasteContainer)[0]].properties : usrFrmData[pasteContainer].properties
    const containerHeight = type === 'Userform' ? container.Height! - 37 : container.Height! - 20
    const targetTop = ((containerHeight) / 2) - deltaTop
    const targetLeft = (container.Width! / 2) - deltaLeft

    const diffTop = targetTop - usrFrmData[topArray[0]].properties.Top! + usrFrmData[pasteContainer].properties.ScrollTop!
    const diffLeft = targetLeft - usrFrmData[leftArray[0]].properties.Left! + usrFrmData[pasteContainer].properties.ScrollLeft!

    for (let i = 0; i < leftArray.length; i++) {
      let left = usrFrmData[leftArray[i]].properties.Left! + diffLeft
      if (!isNaN(left)) {
        this.updateControlProperty('Left', left, leftArray[i])
      }
    }
    for (let i = 0; i < topArray.length; i++) {
      let top = usrFrmData[topArray[i]].properties.Top! + diffTop
      if (!isNaN(top)) {
        this.updateControlProperty('Top', top, topArray[i])
      }
    }
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
  /**
   * @description To paste controls in respective container present in respective userform
   * @function pasteControl
   */
  pasteControl () {
    if (this.copyControlList.type === 'copy') {
      const selContainer = this.copyControlList.parentId
      const selSelected = this.copyControlList.targetId
      const userFormData = this.userformData[this.userFormId]
      const presentGroupId: string[] = []
      const newGroupId: string[] = []
      const oldControlId: string[] = []
      const newControlId: string[] = []

      for (const key in this.copiedControl[this.userFormId]) {
        const controlProp = this.copiedControl[this.userFormId][key].properties.GroupID
        if (controlProp && !presentGroupId.includes(controlProp)) {
          presentGroupId.push(controlProp)
        }
      }
      for (let j in presentGroupId) {
        const newId = this.createGroupId()
        newGroupId.push(newId)
        let groupArray: string[] = [
          ...this.groupedControls[this.userFormId]!.groupArray!,
          newId
        ]
        this.updateGroup({
          userFormId: this.userFormId,
          groupArray: groupArray!
        })
      }
      const recCopyControl = (daTarget: string) => {
        const daTargetControls = userFormData[daTarget].controls
        if (daTargetControls && daTargetControls.length > 0) {
          for (let i = 0, limit = daTargetControls.length; i < limit; i++) {
            const key = daTargetControls[i]
            const Name = this.newPasteControlId(key, daTarget)
            const controlID:| string| undefined = `ID_${Name}`
            const controlObj = JSON.parse(JSON.stringify(this.copiedControl[this.userFormId][key]))
            let groupIdIndex = -1
            groupIdIndex = presentGroupId.findIndex((val) => val === controlObj.properties.GroupID)
            const item: controlData = {
              ...controlObj,
              properties: {
                ...controlObj.properties,
                ID: controlID!,
                GroupID: groupIdIndex !== -1 ? newGroupId[groupIdIndex] : '',
                Name: this.generateUniqueName(controlObj.properties.Name)
              }
            }
            this.removeChildControl(daTarget, key)
            this.updateNewControl(daTarget, controlID, item, false)
            recCopyControl(controlID)
          }
        }
      }

      for (const key of selSelected) {
        if (!key.startsWith('group')) {
          oldControlId.push(key)
          const Name = this.newPasteControlId(key, '')
          const controlID:| string| undefined = `ID_${Name}`
          const controlObj = JSON.parse(JSON.stringify(this.copiedControl[this.userFormId][key]))
          newControlId.push(controlID)
          let groupIdIndex = -1
          groupIdIndex = presentGroupId.findIndex(
            (val) => controlObj.properties.GroupID === val
          )
          if (selSelected.length === 1 && this.copiedControl[this.userFormId][selSelected[0]].properties.GroupID !== '') {
            groupIdIndex = -1
          }
          const item: controlData = {
            ...controlObj,
            properties: {
              ...controlObj.properties,
              ID: controlID!,
              GroupID: groupIdIndex !== -1 ? newGroupId[groupIdIndex] : '',
              Name: Name
            }
          }
          this.updateNewControl(this.containerId, controlID, item, true)
          recCopyControl(controlID)
        } else {
          for (let ctrlId in this.copiedControl[this.userFormId]) {
            const controlProp = this.copiedControl[this.userFormId][ctrlId]
              .properties.GroupID
            if (controlProp) {
              if (controlProp === key) {
                const Name = this.newPasteControlId(ctrlId, '')
                const controlID:| string| undefined = `ID_${Name}`
                const controlObj = JSON.parse(JSON.stringify(this.copiedControl[this.userFormId][ctrlId]))

                let groupIdIndex = -1
                groupIdIndex = presentGroupId.findIndex(
                  (val) => controlObj.properties.GroupID === val
                )
                const item: controlData = {
                  ...controlObj,
                  properties: {
                    ...controlObj.properties,
                    ID: controlID!,
                    GroupID: groupIdIndex !== -1 ? newGroupId[groupIdIndex] : '',
                    Name: Name
                  }
                }
                this.updateNewControl(this.containerId, controlID, item, true)
                recCopyControl(controlID)
              }
            }
          }
        }
      }
      for (let j of newGroupId) {
        this.createGroup(j)
      }
      const newSelected: string[] = []
      for (const control of selSelected) {
        if (control.startsWith('group')) {
          const index = presentGroupId.findIndex((val) => val === control)
          newSelected.push(newGroupId[index])
        } else {
          const index = oldControlId.findIndex((val) => val === control)
          newSelected.push(newControlId[index])
        }
      }
      this.selectControl({
        userFormId: this.userFormId,
        select: {
          container: this.getContainerList(newSelected[0]),
          selected: newSelected
        }
      })
    } else if (this.copyControlList.type === 'cut') {
      const selContainer = this.copyControlList.parentId
      const selSelected = this.copyControlList.targetId
      const userFormData = this.copiedControl[this.userFormId]
      const recCopyControl = (daTarget: string) => {
        const daTargetControls = userFormData[daTarget].controls
        if (daTargetControls.length > 0) {
          for (let i = 0, limit = daTargetControls.length; i < limit; i++) {
            const key = daTargetControls[i]
            const controlObj = JSON.parse(JSON.stringify(this.copiedControl[this.userFormId][key]))
            const item: controlData = {
              ...controlObj
            }
            this.removeChildControl(daTarget, key)
            this.updateNewControl(daTarget, key, item, false)
            recCopyControl(key)
          }
        }
      }
      for (const key of selSelected) {
        if (!key.startsWith('group')) {
          const controlObj = JSON.parse(
            JSON.stringify(this.copiedControl[this.userFormId][key])
          )
          if (selSelected.length === 1 && userFormData[selSelected[0]].properties.GroupID! !== '') {
            controlObj.properties.GroupID = ''
          }
          const item: controlData = {
            ...controlObj
          }
          this.updateNewControl(this.containerId, key, item, true)
          recCopyControl(key)
        } else {
          for (let ctrlId in userFormData) {
            const controlProp = userFormData[ctrlId].properties.GroupID
            if (controlProp) {
              if (controlProp === key) {
                const controlObj = JSON.parse(
                  JSON.stringify(this.copiedControl[this.userFormId][ctrlId])
                )
                const item: controlData = {
                  ...controlObj
                }
                this.updateNewControl(this.containerId, ctrlId, item, true)
                recCopyControl(ctrlId)
              }
            }
          }
        }
      }
      this.selectControl({
        userFormId: this.userFormId,
        select: {
          container: this.getContainerList(selSelected[0]),
          selected: selSelected
        }
      })
      this.updateCopyControlList({
        userFormId: this.userFormId,
        parentId: this.containerId,
        targetId: selSelected,
        type: 'copy'
      })
    }
    this.getPasteControlSize()
    const selSelected = this.selectedControls[this.userFormId].selected
    for (const control of selSelected) {
      if (control.startsWith('group')) {
        this.createGroup(control)
      }
    }
    EventBus.$emit('afterPaste')
  }

  /**
   * @description To delete controls in respective container present in respective userform
   * @function clickDelete
   */
  clickDelete () {
    const selControl = []
    const userData = this.userformData[this.userFormId]
    const selected = this.selectedControls[this.userFormId].selected
    const selContainer = this.selectedControls[this.userFormId].container
    const filterControls = []
    const controls = userData[this.selectedControls[this.userFormId].container[0]].type === 'MultiPage'
      ? userData[this.getContainerList(this.selectedControls[this.userFormId].container[0])[0]].controls
      : userData[this.selectedControls[this.userFormId].container[0]].controls
    for (const control of selected) {
      if (!control.startsWith('ID_USERFORM')) {
        if (control.startsWith('group')) {
          for (const key in userData) {
            if (
              userData[key].properties.GroupID === control
            ) {
              selControl.push(key)
            }
          }
        } else {
          selControl.push(control)
        }
      }
    }
    const selControlGroupId = !selected[0].startsWith('group')
      ? userData[selected[0]].type === 'Page'
        ? userData[this.getContainerList(selected[0])[0]].properties.GroupID!
        : userData[selected[0]].properties.GroupID!
      : ''
    if (selected.length === 1 && !selected[0].startsWith('group') && selControlGroupId !== '') {
      for (let j = 0; j < controls.length; j++) {
        if (userData[controls[j]].properties.GroupID === selControlGroupId) {
          filterControls.push(controls[j])
        }
      }
      if (filterControls.length === 2) {
        const container = userData[selected[0]].type === 'Page' ? this.getContainerList(selected[0])[0] : selected[0]
        const curSelect = filterControls[0] === container ? filterControls[1] : filterControls[0]
        this.updateControlProperty('GroupID', '', curSelect)
      }
    }
    let container: string = ''
    for (let i = 0; i < selControl.length; i++) {
      const controlId = userData[selControl[i]].type === 'Page' ? selContainer[0] : selControl[i]
      container = this.getContainerList(controlId)[0]
      this.deleteZIndex(controlId)
      this.deleteTabIndex(controlId)
      this.deleteControl({
        userFormId: this.userFormId,
        parentId: this.getContainerList(controlId)[0],
        targetId: controlId
      })
    }
    this.selectControl({
      userFormId: this.userFormId,
      select: {
        container: this.getContainerList(container),
        selected: container === '' ? [this.userFormId] : [container]
      }
    })
    EventBus.$emit('focusUserForm')
  }
  updateAction (event: KeyboardEvent) {
    let controlActionName = ''
    if (event.ctrlKey && event.code === 'KeyA') {
      controlActionName = 'ID_SELECTALL'
    } else if (event.ctrlKey && event.code === 'KeyC') {
      if (
        this.selectedControls[this.userFormId].selected[0] !== this.userFormId
      ) {
        controlActionName = 'ID_COPY'
      }
    } else if (event.keyCode === 46) {
      controlActionName = 'ID_DELETE'
    } else if (event.ctrlKey && event.code === 'KeyV') {
      controlActionName = 'ID_PASTE'
    } else if (event.ctrlKey && event.code === 'KeyX') {
      controlActionName = 'ID_CUT'
    }
    this.controlAction(event, controlActionName, '')
  }
  updatePropVal (propName: string, propValue: number) {
    const ctrlSel = this.selectedControls[this.userFormId].selected
    const usrFrmData = this.userformData[this.userFormId]
    for (let index = 1; index < ctrlSel.length; index++) {
      if (!ctrlSel[index].startsWith('group')) {
        const curProp = usrFrmData[ctrlSel[index]].properties
        if (propName === 'selRight') {
          const curRight = curProp.Width! + curProp.Left!
          const value = curProp.Left! + (propValue - curRight)
          this.updateControlProperty('Left', value, ctrlSel[index])
        } else if (propName === 'selBottom') {
          const curBottom = curProp.Height! + curProp.Top!
          const value = curProp.Top! + (propValue - curBottom)
          this.updateControlProperty('Top', value, ctrlSel[index])
        }
        if (propName === 'selCenter') {
          const curCenter = curProp.Width! / 2
          const value = propValue - curCenter
          this.updateControlProperty('Left', value, ctrlSel[index])
        }
        if (propName === 'selMiddle') {
          const curMiddle = curProp.Height! / 2
          const value = propValue - curMiddle
          this.updateControlProperty('Top', value, ctrlSel[index])
        } else {
          const propertyname: keyof controlProperties = propName as keyof controlProperties
          this.updateControlProperty(propertyname, propValue, ctrlSel[index])
        }
      } else {
        const groupIndex: number = this.groupStyleArray.findIndex(val => val.groupName === ctrlSel[index])
        const curProp = this.groupStyleArray[groupIndex]
        const left = parseInt(curProp.left!)
        const top = parseInt(curProp.top!)
        const width = parseInt(curProp.width!)
        const height = parseInt(curProp.height!)
        let value = -1
        if (propName === 'selRight') {
          value = left! + (propValue - (width! + left!))
          EventBus.$emit('updasteGroupSize', 'Left', value, groupIndex)
        } else if (propName === 'selBottom') {
          value = top! + (propValue - (height + top))
          EventBus.$emit('updasteGroupSize', 'Top', value, groupIndex)
        }
        if (propName === 'selCenter') {
          value = propValue - (width! / 2)
          EventBus.$emit('updasteGroupSize', 'Left', value, groupIndex)
        }
        if (propName === 'selMiddle') {
          value = propValue - height! / 2
          EventBus.$emit('updasteGroupSize', 'Top', value, groupIndex)
        } else {
          const propertyname: keyof controlProperties = propName as keyof controlProperties
          EventBus.$emit('updasteGroupSize', propertyname, propValue, groupIndex)
        }
      }
    }
  }
  convertToGridSize (val: number) {
    const gridSize = 9
    return Math.round(val / gridSize) * gridSize
  }
  controlAlignMent (subVal: string) {
    const mainSel = this.selectedControls[this.userFormId].selected[0]
    const isGroup = mainSel.startsWith('group')
    const usrFrmData = this.userformData[this.userFormId]
    const ctrlProp = !isGroup && usrFrmData[mainSel].properties
    const groupIndex: number = this.groupStyleArray.findIndex(val => val.groupName === mainSel)
    const newObject = {
      Left: isGroup && groupIndex !== -1 ? parseInt(this.groupStyleArray[groupIndex].left!) : ctrlProp ? ctrlProp.Left! : 0,
      Top: isGroup && groupIndex !== -1 ? parseInt(this.groupStyleArray[groupIndex].top!) : ctrlProp ? ctrlProp.Top! : 0,
      Width: isGroup && groupIndex !== -1 ? parseInt(this.groupStyleArray[groupIndex].width!) : ctrlProp ? ctrlProp.Width! : 0,
      Height: isGroup && groupIndex !== -1 ? parseInt(this.groupStyleArray[groupIndex].height!) : ctrlProp ? ctrlProp.Height! : 0
    }
    if (subVal === 'ID_ALIGNLEFT') {
      this.updatePropVal('Left', newObject.Left!)
    } else if (subVal === 'ID_ALIGNTOP') {
      this.updatePropVal('Top', newObject.Top!)
    } else if (subVal === 'ID_ALIGNRIGHT') {
      const selRight = newObject.Width! + newObject.Left!
      this.updatePropVal('selRight', selRight)
    } else if (subVal === 'ID_ALIGNBOTTOM') {
      const selBottom = newObject.Height! + newObject.Top!
      this.updatePropVal('selBottom', selBottom)
    } else if (subVal === 'ID_ALIGNCENTER') {
      const selCenter = newObject.Left! + newObject.Width! / 2
      this.updatePropVal('selCenter', selCenter)
    } else if (subVal === 'ID_ALIGNMIDDLE') {
      const selMiddle = newObject.Top! + newObject.Height! / 2
      this.updatePropVal('selMiddle', selMiddle)
    } else if (subVal === 'ID_WIDTH') {
      this.updatePropVal('Width', newObject.Width!)
    } else if (subVal === 'ID_HEIGHT') {
      this.updatePropVal('Height', newObject.Height!)
    } else if (subVal === 'ID_BOTH') {
      this.updatePropVal('Height', newObject.Height!)
      this.updatePropVal('Width', newObject.Width!)
    } else if (subVal === 'ID_GRID') {
      const ctrlSel = this.selectedControls[this.userFormId].selected
      for (let index = 0; index < ctrlSel.length; index++) {
        if (!ctrlSel[index].startsWith('group')) {
          const curProp = usrFrmData[ctrlSel[index]].properties
          this.updateControlProperty('Left', this.convertToGridSize(curProp.Left!), ctrlSel[index])
          this.updateControlProperty('Top', this.convertToGridSize(curProp.Top!), ctrlSel[index])
        } else {
          const groupIndex: number = this.groupStyleArray.findIndex(val => val.groupName === ctrlSel[index])
          const curProp = this.groupStyleArray[groupIndex]
          const left = parseInt(curProp.left!)
          const top = parseInt(curProp.top!)
          EventBus.$emit('updasteGroupSize', 'Top', this.convertToGridSize(top), groupIndex)
          EventBus.$emit('updasteGroupSize', 'Left', this.convertToGridSize(left), groupIndex)
        }
      }
    }
  }

  controlDisable (event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
  }
}
</script>

<style scoped>
.outercontext-div {
  border: 0.3px solid black;
  box-shadow: 2px 2px lightgray;
  width: 150px;
  height: auto;
  font-size: 13px;
  position: fixed;
  z-index: 1000;
}
.wrapper-context {
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  height: 100%;
}
.wrapper1-context {
  display: grid;
  grid-template-columns: 10% 90%;
  border: 0.3px solid white;
  background: white;
  height: 24px;
  padding-top: 5px;
  outline: none;
}
.wrapper1-context:hover {
  background-color: rgb(155, 215, 255);
  border: 0.3px solid rgb(0, 153, 255);
}
.wrapper21 {
  display: grid;
  grid-template-columns: 10% 85% 5%;
}
.triangle-right {
  border-top: 4px solid transparent;
  border-left: 5px solid black;
  border-bottom: 4px solid transparent;
}
.iset-context {
  text-align: left;
  padding-left: 15px;
  font-size: 12px;
}
.set-context {
  text-align: left;
  padding-left: 15px;
  font-size: 12px;
}
hr {
  margin: 0px;
}
ul {
  list-style-type: none;
  margin-block-start: 0em;
  margin-block-end: 0em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
}

/* testing submenu */

.top-level-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.top-level-menu > li {
  position: absolute;
  float: left;
  height: 30px;
  width: 143px;
}

.top-level-menu li:hover > ul {
  /* On hover, display the next level's menu */
  display: inline;
}

/* Menu Link Styles */

.top-level-menu a /* Apply to all links inside the multi-level menu */ {
  font-size: 12px;
  color: black;
  text-decoration: none;
  padding: 0 0 0 10px;
  padding-left: 15px;

  /* Make the link cover the entire list item-container */
  display: block;
}
.top-level-menu a:hover {
  color: black;
}
.third-level-menu {
  position: absolute;
  top: 0;
  right: -100px;
  width: 110px;
  list-style: none;
  padding: 0;
  margin: 0;
  display: none;
  border: 1px solid black;
  background-color: white;
}

.third-level-menu > li {
  height: 20px;
  padding-top: 5px;
  /* margin: 1px; */
}
.third-level-menu > li:hover {
  background-color: rgb(155, 215, 255);
  border: 0.2px solid rgb(0, 153, 255);
}
.top-level-menu1 {
  list-style: none;
  padding: 0;
  margin: 0;
}

.top-level-menu1 > li {
  position: absolute;
  float: left;
  height: 30px;
  width: 143px;
}

.top-level-menu1 li:hover > ul {
  /* On hover, display the next level's menu */
  display: inline;
}

/* Menu Link Styles */

.top-level-menu1 a /* Apply to all links inside the multi-level menu */ {
  font-size: 12px;
  color: black;
  text-decoration: none;
  padding: 0 0 0 10px;
  padding-left: 15px;

  /* Make the link cover the entire list item-container */
  display: block;
}
.top-level-menu1 a:hover {
  color: black;
}
.third {
  padding-left: 5px;
}
.third > a {
  padding-left: 10px;
}
.icons {
  margin-left: 3px;
}
</style>
