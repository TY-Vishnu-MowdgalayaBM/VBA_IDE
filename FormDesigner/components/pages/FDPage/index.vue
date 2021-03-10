<template>
  <div id="app" tabindex="0" @focus="updatefocus" @contextmenu.stop="preventcontextMenu" @keydown.esc="closeMenu">
    <div
      id="right-click-menu"
      :style="contextMenuStyle"
      ref="contextmenu"
      tabindex="0"
      @blur.stop="closeMenu"
    >
      <ContextMenu
        ref="mainConextMenu"
        :userFormId="userFormId"
        :containerId="containerId"
        :controlId="controlId"
        :values="contextMenuValue"
        @closeMenu="closeMenu"
        :selectedTab="updatedValue"
        :data="tabData !== undefined ? tabData : '' "
        :groupStyleArray="groupStyleArray"
         @createGroup="createGroup"
        :editTextRef="labelArea"
        :copiedText="copiedText"
        :textMenu="textMenu"
      />
    </div>
    <div class="container">
      <div class="header">
        <Header :userFormId="userFormId" />
      </div>
      <div class="mainbody">
        <Split class="outersplit" @onDrag="onDrag">
          <SplitArea :size="20" class="splitleft">
            <Split :direction="vertical" @onDrag="onDrag">
              <SplitArea class="innersplit">
                <div v-if="hideShowTree === false">
                  <div class="sideheader">
                    <span class="sideheader1">
                      <span>Project - VBAProject</span>
                      <div id="mdiv" v-on:click="hideShowTreeBrowser">
                        <div class="mdiv">
                          <div class="md"></div>
                        </div>
                      </div>
                    </span>
                  </div>

                  <div>
                    <ViewCodeLogo class="icon-style" />
                    <ViewObject class="icon-style" />
                    <CloseFolderLogo class="icon-style" />
                  </div>
                  <hr />
                  <div>
                    <div
                      v-for="(userform, userformId) in userformData"
                      :key="userformId"
                      @click="setUserForm(userformId)"
                    >
                      <p>{{ userformId }}</p>
                    </div>
                  </div>
                </div>
              </SplitArea>
              <SplitArea class="innersplit">
                <PropertiesList
                :userFormId="userFormId"/>
                <!-- <label>Prop Name</label>
                <input type="text" v-model="testPropName" />
                <br />
                <label>Prop Value</label>
                <input type="text" v-model="testPropValue" />
                <br />
                <button @click="clickUpdate">Update selected Control</button>
                <br /><br />
                <button @click="clickDelete">Delete selected Control</button> -->
              </SplitArea>
            </Split>
          </SplitArea>
          <SplitArea :size="80" class="splitAreaClass">
            <div class="splitAreaDiv">
              <ResizeUserForm
                :userFormId="userFormId"
                :controlId="userFormId"
                :containerId="userFormId"
              />
            </div>
          </SplitArea>
        </Split>
      </div>
      <div class="fixedSide">
        <ToolBox />
      </div>
      <div>
        <UserformTabOrder @getFocusElement="getFocusElement" ref="userformTabOrderRef"/>
        <TabStripTabOrder @getFocusElement="getFocusElement" ref="tabstripTabOrderRef"/>
        <RenameMultiPageDialog @getFocusElement="getFocusElement" ref="renameDialogRef"/>
        <ErrorPopup />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator'
import ToolBox from '@/FormDesigner/components/organisms/FDToolBox/index.vue'
import ResizeUserForm from '@/FormDesigner/components/organisms/FDResizeUserForm/index.vue'
import PropertiesList from '@/FormDesigner/components/organisms/FDPropertyList/index.vue'
import TreeBrowser from '@/FormDesigner/components/organisms/FDTreeBrowser/index.vue'
import Header from '@/FormDesigner/components/organisms/FDHeader/index.vue'
import UserformTabOrder from '@/FormDesigner/components/molecules/FDUserformTabOrder/index.vue'
import TabStripTabOrder from '@/FormDesigner/components/organisms/FDTabStripTabOrderModal/index.vue'
import RenameMultiPageDialog from '@/FormDesigner/components/organisms/FDRenameMultiPageDialog/index.vue'
import ErrorPopup from '@/FormDesigner/components/atoms/FDErrorPopup/index.vue'
import ContextMenu from '@/FormDesigner/components/atoms/FDContextMenu/index.vue'

import ViewCodeLogo from '../../../../assets/view-code.svg'
import ViewObject from '../../../../assets/view-object.svg'
import CloseFolderLogo from '../../../../assets/close-folder.svg'
import { State, Action } from 'vuex-class'
import { Payload } from 'vuex'
import {
  IupdateControl,
  IdeleteControl,
  IupdateControlExtraData,
  IselectControl
} from '../../../../storeModules/fd/actions'
import { EventBus } from '@/FormDesigner/event-bus'
import FDCommonMethod from '@/api/abstract/FormDesigner/FDCommonMethod'
import { userformContextMenu } from '@/FormDesigner/models/userformContextMenuData'
import { controlContextMenu } from '@/FormDesigner/models/controlContextMenuData'
import { tabsContextMenu } from '../../../models/tabsContextMenu'
interface IDialog
{
  dialogType: string
  val: boolean
}
@Component({
  name: 'FDPage',
  components: {
    ToolBox,
    ResizeUserForm,
    TreeBrowser,
    PropertiesList,
    Header,
    ViewCodeLogo,
    ViewObject,
    CloseFolderLogo,
    UserformTabOrder,
    TabStripTabOrder,
    RenameMultiPageDialog,
    ErrorPopup,
    ContextMenu
  }
})
export default class FDPage extends Vue {
  @State((state) => state.fd.userformData) userformData!: userformData;
  @State((state) => state.fd.copiedControl) copiedControl!: userformData;
  @Ref('contextmenu') contextmenu: HTMLDivElement
  @Ref('mainConextMenu') mainConextMenu: ContextMenu
  @Ref('renameDialogRef') renameDialogRef: RenameMultiPageDialog
  @Ref('userformTabOrderRef') userformTabOrderRef: UserformTabOrder
  @Ref('tabstripTabOrderRef') tabstripTabOrderRef: TabStripTabOrder
  containerId: string = ''
  controlId: string = ''
  copiedText = ''
  labelArea: any = {}
  textMenu: boolean = false

  vertical: string = 'vertical';
  renameDialog: boolean = false
  tabstripTabOrder: boolean = false
  display: string = '';
  hideShowTree: boolean = false;
  viewContextMenu: boolean = false
  hideShowTreeBrowser () {
    this.hideShowTree = true
  }
  userFormId: string = 'ID_USERFORM1';
  @State((state: rootState) => state.fd.selectedControls)
  selectedControls!: fdState['selectedControls'];
  @Action('fd/updateControl') updateControl!: (payload: IupdateControl) => void;
  @Action('fd/updateControlExtraData') updateControlExtraData!: (payload: IupdateControlExtraData) => void;
  @Action('fd/deleteControl') deleteControl!: (payload: IdeleteControl) => void;
  @Action('fd/selectControl') selectControl!: (payload: IselectControl) => void;
  testPropName: keyof controlProperties = 'Width';
  testPropValue = '100';
  top = 0;
  left = 0;
  userformTabOrder: boolean = false
  contextMenuType: boolean = false;
  viewMenu: boolean = false
  controlContextMenu: Array<IcontextMenu> = controlContextMenu;
  userformContextMenu: Array<IcontextMenu> = userformContextMenu;
  contextMenuValue: Array<IcontextMenu> = tabsContextMenu;
  contextMenuHeight: number = 84
  groupStyleArray: Array<IGroupStyle> = []
  updatedValue: number = 0
  tabData: controlData
  tabstripContextMenu: boolean = false

  closeMenu (event: MouseEvent) {
    this.textMenu = false
    this.viewMenu = false
    EventBus.$emit('focusUserForm')
  }
  onDrag () {
    (this.$el as HTMLDivElement).focus()
  }
  created () {
    this.tabData = this.userformData[this.userFormId][this.userFormId]
    EventBus.$on('contextMenuDisplay', (event: MouseEvent, containerId: string, controlId: string, type: string, mode: boolean) => {
      this.tabstripContextMenu = false
      this.containerId = containerId
      this.controlId = controlId
      this.openMenu(event, containerId, controlId, type, mode)
    })
    EventBus.$on('groupArray', (array: Array<IGroupStyle>) => {
      this.groupStyleArray = [...array]
    })
    EventBus.$on('editModeContextMenu', (e:MouseEvent, controlId: string, data: controlData, mode: boolean, selected: number) => {
      this.controlId = controlId
      this.tabData = data
      this.updatedValue = selected
      this.tabstripContextMenu = true
      this.editModeContextMenu(e, mode, data)
    })
    EventBus.$on('openTextContextMenu', (event: MouseEvent, controlId: string) => {
      this.tabstripContextMenu = false
      this.labelArea = (event.target as HTMLSpanElement)
      this.controlId = controlId
      this.openTextContextMenu(event)
    })
    EventBus.$on('handleKeyDown', (event: KeyboardEvent, containerId: string) => {
      this.containerId = containerId
      this.handleKeyDown(event)
    })
  }
  destroyed () {
    EventBus.$off('contextMenuDisplay')
    EventBus.$off('groupArray')
    EventBus.$off('editModeContextMenu')
    EventBus.$off('openTextContextMenu')
    EventBus.$off('handleKeyDown')
  }

  editModeContextMenu (e: MouseEvent, mode: boolean, data: controlData) {
    if (mode) {
      e.preventDefault()
      e.stopPropagation()
      this.top = e.y
      this.left = e.x
      this.contextMenuValue = tabsContextMenu
      this.contextMenuHeight = 84
      if (data.type === 'TabStrip') {
        for (const val of this.contextMenuValue) {
          if (val.id === 'ID_DELETEPAGE' || val.id === 'ID_RENAME') {
            val.disabled = data.extraDatas!.Tabs!.length === 0
          } else if (val.id === 'ID_MOVE') {
            val.disabled = data.extraDatas!.Tabs!.length <= 1
          }
        }
      }
      if (data.type === 'MultiPage') {
        for (const val of this.contextMenuValue) {
          if (val.id === 'ID_DELETEPAGE' || val.id === 'ID_RENAME') {
            val.disabled = data.controls.length === 0
          } else if (val.id === 'ID_MOVE') {
            val.disabled = data.controls.length <= 1
          }
        }
      }
      this.viewMenu = true
      Vue.nextTick(() => this.contextmenu.focus())
    } else {
      return undefined
    }
  }

  clickUpdate () {
    const selected = this.selectedControls[this.userFormId].selected
    for (let i = 0; i < selected.length; i++) {
      this.updateControl({
        userFormId: this.userFormId,
        controlId: selected[i],
        propertyName: this.testPropName,
        value: this.testPropValue
      })
    }
  }
  clickDelete () {
    const selected = this.selectedControls[this.userFormId].selected
    for (let i = 0; i < selected.length; i++) {
      this.deleteControl({
        userFormId: this.userFormId,
        parentId: this.selectedControls[this.userFormId].container[0],
        targetId: selected[i]
      })
    }
  }
  setUserForm (userformId: string) {
    this.userFormId = userformId
    this.selectControl({
      userFormId: this.userFormId,
      select: {
        container: [this.userFormId],
        selected: [this.userFormId]
      }
    })
  }
  mounted () {
    this.setUserForm(this.userFormId)
  }
  get contextMenuStyle () {
    const contextMenuTop = window.innerHeight > (this.top + this.contextMenuHeight) ? this.top : this.top - this.contextMenuHeight
    return {
      top: `${contextMenuTop}px`,
      left: `${this.left}px`,
      display: this.viewMenu ? 'block' : 'none'
    }
  }
  openMenu (e: MouseEvent, parentID: string, controlID: string, type: string, mode: boolean) {
    e.preventDefault()
    const selected = this.selectedControls[this.userFormId].selected
    const userData = this.userformData[this.userFormId]
    let groupId = ''
    if (!selected.includes(controlID)) {
      groupId = userData[controlID].type === 'MultiPage' ? selected[0] : controlID
      if ('GroupID' in userData[controlID].properties && userData[controlID].properties.GroupID !== '') {
        groupId = this.userformData[this.userFormId][controlID].properties.GroupID!
      }
      if (groupId && !selected.includes(groupId)) {
        this.selectControl({
          userFormId: this.userFormId,
          select: { container: this.getContainerList(groupId), selected: [groupId] }
        })
      }
    }
    const controlType = this.userformData[this.userFormId][controlID].type
    if (type === 'container' && !groupId.startsWith('group')) {
      this.contextMenuType = true
    } else {
      this.contextMenuType = false
    }
    this.top = e.y
    this.left = e.x
    this.contextMenuValue = this.contextMenuType ? userformContextMenu : controlContextMenu
    this.contextMenuHeight = this.contextMenuType ? 145 : 276
    this.viewMenu = true
    const controlLength = this.userformData[this.userFormId][this.containerId].controls.length
    const contextMenuData = (type === 'container' && !groupId.startsWith('group') && selected.length <= 1)
      ? this.userformContextMenu
      : this.controlContextMenu
    if ((controlType === 'SpinButton' || controlType === 'ScrollBar' || controlType === 'ListBox') && mode) {
      for (const val of contextMenuData) {
        if (val.id === 'ID_OBJECTPROP') {
          val.disabled = false
        } else if (val.id === 'ID_ALIGN' || val.id === 'ID_MAKESAMESIZE') {
          for (let index = 0; index < val.values.length; index++) {
            val.values[index].disabled = true
          }
        } else {
          val.disabled = true
        }
      }
    } else {
      for (const val of contextMenuData) {
        if (val.id === 'ID_SELECTALL') {
          val.disabled = controlLength === 0
        }
        if (val.id === 'ID_DELETE') {
          if (this.contextMenuType) {
            val.disabled = !(selected.length === 1 && !selected[0].startsWith('group') &&
            (userData[controlID].type === 'Frame' || userData[selected[0]].type === 'Page'))
          } else {
            val.disabled = !(selected.length >= 1)
          }
        }
        if (val.id === 'ID_PASTE') {
          val.disabled = Object.keys(this.copiedControl[this.userFormId]).length === 1
        }
        if (val.id === 'ID_CUT' || val.id === 'ID_COPY' || val.id === 'ID_OBJECTPROP' || val.id === 'ID_VIEWCODE') {
          val.disabled = false
        }
        if (val.id === 'ID_GROUP' || val.id === 'ID_UNGROUP') {
          const selected = this.selectedControls[this.userFormId].selected
          let groupId: boolean = false
          for (const key of selected) {
            if (!key.startsWith('group') && !key.startsWith('ID_USERFORM')) {
              groupId =
                  this.userformData[this.userFormId][key].properties.GroupID === ''
            }
          }
          const selectedGroupArray = selected.filter(
            (val: string) => val.startsWith('group') && val
          )
          if (!groupId && selectedGroupArray.length <= 1) {
            val.text = '<u>U</u>ngroup'
            val.id = 'ID_UNGROUP'
          } else {
            val.text = '<u>G</u>roup'
            val.id = 'ID_GROUP'
            val.disabled =
                this.selectedControls[this.userFormId].selected.length <= 1
          }
        }
        if (val.id === 'ID_CONTROLFORWARD' || val.id === 'ID_CONTROLBACKWARD') {
          const selectedConatiner = this.selectedControls[this.userFormId].container[0]
          val.disabled = userData[selectedConatiner].controls.length <= 1
        }
        if (val.id === 'ID_ALIGN' || val.id === 'ID_MAKESAMESIZE') {
          for (let index = 0; index < val.values.length; index++) {
            if (val.values[index].id === 'ID_GRID') {
              val.values[index].disabled = !(this.selectedControls[this.userFormId].selected.length > 0)
            } else {
              val.values[index].disabled = this.selectedControls[this.userFormId].selected.length <= 1
            }
          }
        }
      }
    }
    Vue.nextTick(() => this.contextmenu.focus())
  }
  getContainerList (selectTarget: string) {
    const containerList: string[] = []
    const controlContainer = (selectTarget: string) => {
      if (this.userformData[this.userFormId][selectTarget].type !== 'Userform') {
        for (let i in this.userformData[this.userFormId]) {
          const controlData = this.userformData[this.userFormId][i]
          if (controlData.controls.length > 0 && controlData.controls.includes(selectTarget)) {
            containerList.push(i)
            controlContainer(i)
            if (this.userformData[this.userFormId][i].type !== 'Userform') {
              break
            }
          }
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
  createGroup (groupId: string) {
    EventBus.$emit('createGroup', groupId)
  }
  openTextContextMenu (event: MouseEvent) {
    this.textMenu = true
    event.preventDefault()
    event.stopPropagation()
    navigator.clipboard.readText()
      .then(text => {
        this.copiedText = text
        this.contextMenuValue = controlContextMenu
        this.contextMenuHeight = 276
        for (const val of controlContextMenu) {
          if (val.id === 'ID_DELETE') {
            val.disabled = this.getCursorPos(event)
          } else if (val.id === 'ID_PASTE') {
            val.disabled = this.copiedText === ''
          } else if (val.id === 'ID_CUT') {
            val.disabled = this.getCursorPos(event)
          } else if (val.id === 'ID_COPY') {
            val.disabled = this.getCursorPos(event)
          } else if (val.id === 'ID_ALIGN' || val.id === 'ID_MAKESAMESIZE') {
            for (let index = 0; index < val.values.length; index++) {
              val.values[index].disabled = true
            }
          } else if (val.id === 'ID_OBJECTPROP') {
            val.disabled = false
          } else {
            val.disabled = true
          }
        }
        Vue.nextTick(() => this.contextmenu.focus())
        this.top = event.y
        this.left = event.x
        this.viewMenu = true
      })
      .catch(err => {
        console.error('Failed to read clipboard contents: ', err)
      })
  }
  getCursorPos (event: MouseEvent) {
    const controlType = this.userformData[this.userFormId][this.controlId].type
    if (controlType === 'ComboBox' || controlType === 'TextBox') {
      const eventTarget = event.target as HTMLTextAreaElement
      const difference = eventTarget.selectionEnd - eventTarget.selectionStart
      if (difference > 0) {
        return false
      } else {
        return true
      }
    } else {
      const isSupported = typeof window.getSelection !== 'undefined'
      if (isSupported) {
        const selection = window.getSelection()!
        if (selection.anchorOffset === selection.focusOffset) {
          return true
        } else {
          return false
        }
      }
      return true
    }
  }
  handleKeyDown (event: KeyboardEvent) {
    this.mainConextMenu.updateAction(event)
  }
  getFocusElement (dialogData: IDialog) {
    this.tabstripContextMenu = false
    if (dialogData.dialogType === 'userformTaborder') {
      this.userformTabOrder = dialogData.val
    } else if (dialogData.dialogType === 'renameDialog') {
      this.renameDialog = dialogData.val
    } else if (dialogData.dialogType === 'tabstripTabOrder') {
      this.tabstripTabOrder = dialogData.val
    }
    if (!dialogData.val) {
      this.updatefocus()
    }
  }
  updatefocus () {
    if (this.renameDialog) {
      Vue.nextTick(() => { (this.renameDialogRef.$el as HTMLDivElement).focus() })
    } else if (this.tabstripContextMenu && !this.tabstripTabOrder) {
      EventBus.$emit('focusTabStrip')
    } else if (this.userformTabOrder) {
      Vue.nextTick(() => { (this.userformTabOrderRef.$el as HTMLDivElement).focus() })
    } else if (this.tabstripTabOrder) {
      Vue.nextTick(() => { (this.tabstripTabOrderRef.$el as HTMLDivElement).focus() })
    } else {
      EventBus.$emit('focusUserForm')
    }
  }
  preventcontextMenu (event: MouseEvent) {
    event.preventDefault()
  }
}
</script>

<style scoped>
#app {
  font-family: Tahoma;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 14px;
}

.splitleft {
  width: auto;
  z-index: 1;
  top: 5;
  left: 5;
  background-color: white;
  overflow-x: hidden;
  border: 2px solid grey;
}
.outersplit {
  height: 83%;
  width: 85%;
  position: fixed;
}
.innersplit {
  border: 1px solid grey;
  position: relative;
  overflow: hidden;
}
.sideheader1 {
  display: grid;
  grid-template-columns: 1fr 25px;
  /* width: 250px; */
  background-color: rgb(142, 191, 231);
  margin-bottom: 8px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.sideheader {
  height: 22px;
  text-align: left;
  background-color: rgb(142, 191, 231);
}

.right {
  right: 0;
  background-color: #80888e;
  height: 100%;
  width: 75%;
  position: absolute;
  z-index: 1;
  overflow-x: hidden;
  /* padding-top: 20px; */
}
.container {
  width: 100%;
  height: 600px;
  max-height: 500px;
}
.header {
  /* height: 40px; */
  height: 10%;
  border-bottom: 1px solid #eee;
  background-color: #ffffff;
}
#mdiv {
  float: right;
  margin: auto;
  position: relative;
  top: 0px;
  left: 0px;
  width: 20px;
  height: 16px;
  background-color: lightgray;
  border: outset;
}

.mdiv {
  height: 17px;
  width: 2px;
  margin-left: 60px;
  background-color: black;
  transform: rotate(45deg);
  z-index: 1;
  position: absolute;
  right: 8px;
}

.md {
  height: 17px;
  width: 2px;
  background-color: black;
  transform: rotate(90deg);
  z-index: 2;
  position: absolute;
  right: 0px;
}
.commandbutton-element {
  border: 1px solid gray;
  border-radius: 3px;
  background-color: white;
  min-width: 50px;
  max-width: 112px;
  width: fit-content;
  height: fit-content;
  min-height: 20px;
  padding: 0px 5px 0px 5px;
  overflow: hidden;
}
.dialog-action-button {
  background-color: #f2eded;
  width: 79px;
  height: 35px;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 8px;
  padding-bottom: 8px;
  border: 1px solid gray;
  border-radius: 3px;
  overflow: hidden;
}
:focus {
  outline: none;
}
.mainbody {
  margin-top: 37px;
}
.fixedSide {
  /*  position: relative; */
  width: 13%;
  float: right;
}
.icon-style {
  margin-top: 7px;
  margin-left: 5px;
}
.splitAreaClass {
  background: gray;
  overflow: auto;
}
.splitAreaDiv {
  position: relative;
  padding: 5px;
}
#right-click-menu {
  background: #fafafa;
  list-style: none;
  margin: 0;
  padding: 0;
  /* left:100px;
  top:200px; */
  position: absolute;
  width: 100px;
  z-index: 999999;
}

#right-click-menu li {
  border-bottom: 1px solid #e0e0e0;
  margin: 0;
  padding: 5px 5px;
}

#right-click-menu li:last-child {
  border-bottom: none;
}

#right-click-menu li:hover {
  background: #1e88e5;
  color: #fafafa;
}
</style>
