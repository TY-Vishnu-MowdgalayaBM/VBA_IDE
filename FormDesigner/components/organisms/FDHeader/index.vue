<template>
  <div>
    <div class="firstrow">
      <div class="ui-titlebar">
        <div class="ui-titletext">Visual Basic for Applications - Book1</div>
        <div class="ui-titlecontrols">
          <!-- fixed svg issue -->
          <button class="ui-btn minimize">
            <FDSVGImage name="minimize.svg" />
          </button>
          <button class="ui-btn maximize">
            <FDSVGImage name="maximize.svg" />
          </button>
          <button class="ui-btn close">
            <FDSVGImage name="close-button.svg" />
          </button>
        </div>
      </div>
    </div>

    <div class="secondrow">
      <i class="material-icons material-float">&#xe5d4;</i>
      <div class="menu-bar">
        <ul>
          <li><u>F</u>ile</li>
          <li><u>E</u>dit</li>
          <li @click="subMenuDisplay">
            <u>V</u>iew
            <div class="sub-menu-1" v-if="displaySubMenu === true">
              <ul class="sub-menu-ul">
                <li class="sub-menu-li">
                  <CodeLogo class="fa padding" />
                  <span><u>C</u>ode</span>
                </li>
                <li class="sub-menu-li">
                  <ObjectLogo class="fa padding" />
                  <span>O<u>b</u>ject</span>
                </li>
                <hr />
                <li class="sub-menu-li">
                  <ObjBrowserLogo class="fa padding" />
                  <span><u>O</u>bject Browser</span>
                </li>
                <hr />
                <li class="sub-menu-li">
                  <span></span>
                  <span><u>I</u>mmediate Window</span>
                </li>
                <li class="sub-menu-li">
                  <span></span>
                  <span>Local<u>s</u> Window</span>
                </li>
                <hr />
                <li class="sub-menu-li">
                  <span></span>
                  <span>Watc<u>h</u> Window</span>
                </li>
                <li class="sub-menu-li">
                  <span></span>
                  <span>Call Stac<u>k</u></span>
                </li>
                <hr />
                <li class="sub-menu-li">
                  <PjExplorerLogo class="fa padding" />
                  <span><u>P</u>roject Explorer</span>
                </li>
                <li class="sub-menu-li">
                  <PjPropertyLogo class="fa padding" />
                  <span>Properties <u>W</u>indow</span>
                </li>
                <hr />
                <li class="sub-menu-li">
                  <ToolBoxLogo class="fa padding" />
                  <span>ToolBo<u>x</u></span>
                </li>
                <li class="sub-menu-li">
                  <span></span>
                  <span>T<u>a</u>b Order</span>
                </li>
                <hr />
                <li class="sub-menu-li">
                  <span></span>
                  <span>Microscoft Excel</span>
                </li>
              </ul>
            </div>
          </li>
          <li @click="subMenuDisplay">
            <u>I</u>nsert
            <div class="sub-menu-1" v-if="displaySubMenu === true">
              <ul class="sub-menu-ul">
                <li class="sub-menu-li">
                  <span></span>
                  <span><u>P</u>rocedure</span>
                </li>
                <li class="sub-menu-li" @click="insertUserForm()">
                  <UserFormLogo class="fa padding" />
                  <span><u>U</u>serform</span>
                </li>
                <li class="sub-menu-li">
                  <span></span>
                  <span><u>M</u>odule</span>
                </li>
                <li class="sub-menu-li">
                  <span></span>
                  <span><u>C</u>lass Module</span>
                </li>
                <hr />
                <li class="sub-menu-li">
                  <span></span>
                  <span>F<u>i</u>le</span>
                </li>
              </ul>
            </div>
          </li>
          <li @click="subMenuDisplay" @mouseover="getEditMode" @mouseleave="updateCtrlEditMode">
            <u>F</u>ormat
            <div class="sub-menu-1" v-if="displaySubMenu === true">
              <ul class="sub-menu-ul">
                <li class="sub-menu-li">
                  <span></span>
                  <span><u>A</u>lign</span>
                </li>
                <li class="sub-menu-li">
                  <UserFormLogo class="fa padding" />
                  <span><u>M</u>ake Same Size</span>
                </li>
                <hr />
                <li
                  class="sub-menu-li"
                  :style="{ opacity: getdisableStyle('sizeToFit') ? 0.5 : 1 }"
                  @click="getdisableStyle('sizeToFit') ? '' : sizeToFit()"
                >
                  <span></span>
                  <span>Size to <u>F</u>it</span>
                </li>
                <li class="sub-menu-li"
                 :style="{ opacity: getdisableStyle('sizeToGrid') ? 0.5 : 1 }"
                  @click="getdisableStyle('sizeToGrid') ? '' : sizeToGrid()"
                >
                  <span></span>
                  <span>Size to Gri<u>d</u></span>
                </li>
                <hr />
                <li class="sub-menu-li">
                  <span></span>
                  <span><u>H</u>orizontal Spacing</span>
                </li>
                <li class="sub-menu-li"
                :style="{ opacity: getdisableStyle('makeEqual') ? 0.5 : 1 }"
                @click="getdisableStyle('makeEqual') ? '' : makeEqual('Left')"
                >
                  <span></span>
                  <span>Make <u>E</u>qual</span>
                </li>
                <li class="sub-menu-li"
                :style="{ opacity: getdisableStyle('incDecspacing') ? 0.5 : 1 }"
                @click="getdisableStyle('incDecspacing') ? '' : incDecspacing('Left', gridSize)"
                >
                  <span></span>
                  <span><u>I</u>ncrease</span>
                </li>
                <li class="sub-menu-li"
                :style="{ opacity: getdisableStyle('incDecspacing') ? 0.5 : 1 }"
                @click="getdisableStyle('incDecspacing') ? '' : incDecspacing('Left', -gridSize)"
                >
                  <span></span>
                  <span><u>D</u>ecrease</span>
                </li>
                <li class="sub-menu-li"
                :style="{ opacity: getdisableStyle('removeSpace') ? 0.5 : 1 }"
                @click="getdisableStyle('removeSpace') ? '' : removeSpace('Left')"
                >
                  <span></span>
                  <span><u>R</u>emove</span>
                </li>
                <hr />
                <li class="sub-menu-li">
                  <span></span>
                  <span><u>V</u>ertical Spacing</span>
                </li>
                <li class="sub-menu-li"
                :style="{ opacity: getdisableStyle('makeEqual') ? 0.5 : 1 }"
                @click="getdisableStyle('makeEqual') ? '' : makeEqual('Top')"
                >
                  <span></span>
                  <span>Make <u>E</u>qual</span>
                </li>
                <li class="sub-menu-li"
                :style="{ opacity: getdisableStyle('incDecspacing') ? 0.5 : 1 }"
                @click="getdisableStyle('incDecspacing') ? '' : incDecspacing('Top', gridSize)"
                >
                  <span></span>
                  <span><u>I</u>ncrease</span>
                </li>
                <li class="sub-menu-li"
                :style="{ opacity: getdisableStyle('incDecspacing') ? 0.5 : 1 }"
                @click="getdisableStyle('incDecspacing') ? '' : incDecspacing('Top', -gridSize)"
                >
                  <span></span>
                  <span><u>D</u>ecrease</span>
                </li>
                <li class="sub-menu-li"
                :style="{ opacity: getdisableStyle('removeSpace') ? 0.5 : 1 }"
                @click="getdisableStyle('removeSpace') ? '' : removeSpace('Top')"
                >
                  <span></span>
                  <span><u>R</u>emove</span>
                </li>
                <hr />
                <li class="sub-menu-li">
                  <span></span>
                  <span><u>C</u>enter in Form</span>
                </li>
                <li class="sub-menu-li"
                :style="{ opacity: getdisableStyle('centreInForm') ? 0.5 : 1 }"
                @click="getdisableStyle('centreInForm') ? '' : centreInForm('horizontal')"
                >
                  <span></span>
                  <span><u>H</u>orizontally</span>
                </li>
                <li class="sub-menu-li"
                :style="{ opacity: getdisableStyle('centreInForm') ? 0.5 : 1 }"
                @click="getdisableStyle('centreInForm') ? '' : centreInForm('vertical')"
                >
                  <span></span>
                  <span><u>V</u>ertically</span>
                </li>
                <hr />
                <li class="sub-menu-li">
                  <span></span>
                  <span>A<u>r</u>range Buttons</span>
                </li>
                <li class="sub-menu-li"
                :style="{ opacity: getdisableStyle('arrangeButton') ? 0.5 : 1 }"
                @click="getdisableStyle('arrangeButton') ? '' : arrangeButton('right')"
                >
                  <span></span>
                  <span><u>R</u>ight</span>
                </li>
                <li class="sub-menu-li"
                :style="{ opacity: getdisableStyle('arrangeButton') ? 0.5 : 1 }"
                @click="getdisableStyle('arrangeButton') ? '' : arrangeButton('bottom')"
                >
                  <span></span>
                  <span><u>B</u>ottom</span>
                </li>
                <hr />
                <li
                  class="sub-menu-li"
                  :style="{ opacity: getdisableStyle('group') ? 0.5 : 1 }"
                  @click="getdisableStyle('group') ? '' : groupControl()"
                >
                  <span></span>
                  <span><u>G</u>roup</span>
                </li>
                <li
                  class="sub-menu-li"
                  :style="{ opacity: getdisableStyle('unGroup') ? 0.5 : 1 }"
                  @click="getdisableStyle('unGroup') ? '' : unGroupControl()"
                >
                  <span></span>
                  <span><u>U</u>nGroup</span>
                </li>
                <hr />
                <li class="sub-menu-li">
                  <span></span>
                  <span><u>O</u>rder</span>
                </li>
                <li class="sub-menu-li"
                :style="{ opacity: getdisableStyle('order') ? 0.5 : 1 }"
                @click="getdisableStyle('order') ? '' : bringFront()"
                >
                  <span></span>
                  <span><u>B</u>ring to Front</span>
                </li>
                <li class="sub-menu-li"
                :style="{ opacity: getdisableStyle('order') ? 0.5 : 1 }"
                @click="getdisableStyle('order') ? '' : sendBack()"
                >
                  <span></span>
                  <span><u>S</u>end to Back</span>
                </li>
                <li class="sub-menu-li"
                :style="{ opacity: getdisableStyle('order') ? 0.5 : 1 }"
                @click="getdisableStyle('order') ? '' : bringForward()"
                >
                  <span></span>
                  <span><u>B</u>ring Forward</span>
                </li>
                <li class="sub-menu-li"
                :style="{ opacity: getdisableStyle('order') ? 0.5 : 1 }"
                @click="getdisableStyle('order') ? '' : sendBackward()"
                >
                  <span></span>
                  <span><u>S</u>end Backward</span>
                </li>
              </ul>
            </div>
          </li>
          <li><u>D</u>ebug</li>
          <li @click="clickChangeMode"><u>R</u>un</li>
          <li><u>T</u>ools</li>
          <li><u>A</u>dd-Ins</li>
          <li><u>W</u>indow</li>
          <li><u>H</u>elp</li>
        </ul>
      </div>
    </div>

    <div class="thirdrow">
      <i class="material-icons">&#xe5d4;</i>
      <FileSaveLogo class="fa" />
      <CutLogo class="fa" />
      <CopyLogo class="fa" />
      <PasteLogo class="fa" />
      <FindLogo class="fa" />
      <UndoLogo class="fa" />
      <RedoLogo class="fa" />
      <DesignModeLogo class="fa" />
      <PjExplorerLogo class="fa" />
      <PjPropertyLogo class="fa" />
      <ObjBrowserLogo class="fa" />
      <ToolBoxLogo class="fa" />
      <HelpLogo class="fa" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import {
  IaddUserform,
  IupdateControlExtraData
} from '@/storeModules/fd/actions'
import { ControlPropertyData } from '@/FormDesigner/models/ControlsTableProperties/ControlPropertyData'
import CutLogo from '../../../../assets/cut.svg'
import FileSaveLogo from '../../../../assets/file-save.svg'
import CopyLogo from '../../../../assets/copy.svg'
import PasteLogo from '../../../../assets/paste.svg'
import FindLogo from '../../../../assets/find.svg'
import UndoLogo from '../../../../assets/undo.svg'
import RedoLogo from '../../../../assets/redo.svg'
import DesignModeLogo from '../../../../assets/design-mode.svg'
import PjExplorerLogo from '../../../../assets/pj-explorer.svg'
import PjPropertyLogo from '../../../../assets/pj-property.svg'
import ObjBrowserLogo from '../../../../assets/obj-browser.svg'
import ToolBoxLogo from '../../../../assets/tool-box.svg'
import UserFormLogo from '../../../../assets/user-from.svg'
import HelpLogo from '../../../../assets/help.svg'
import CodeLogo from '../../../../assets/view-code.svg'
import ObjectLogo from '../../../../assets/view-object.svg'
import FDSVGImage from '@/FormDesigner/components/atoms/FDSVGImage/index.vue'
import { EventBus } from '@/FormDesigner/event-bus'
import FDCommonMethod from '@/api/abstract/FormDesigner/FDCommonMethod'
import { controlProperties } from '@/FormDesigner/controls-properties'

@Component({
  name: 'Header',
  components: {
    FileSaveLogo,
    CutLogo,
    CopyLogo,
    PasteLogo,
    FindLogo,
    UndoLogo,
    RedoLogo,
    DesignModeLogo,
    PjExplorerLogo,
    PjPropertyLogo,
    ObjBrowserLogo,
    ToolBoxLogo,
    UserFormLogo,
    CodeLogo,
    ObjectLogo,
    HelpLogo,
    FDSVGImage
  }
})
export default class Header extends FDCommonMethod {
  displaySubMenu: boolean = false;
  @Action('fd/addUserform') addControl!: (payload: IaddUserform) => void;
  @Action('fd/changeRunMode') changeRunMode!: (payload: boolean) => void;

  @State((state) => state.fd.selectedControls)
  selectedControls!: fdState['selectedControls'];
  @State((state) => state.fd.userformData) userformData!: userformData;
  @State((state) => state.fd.isRunMode) isRunMode!: boolean;
  @Action('fd/updateControlExtraData') updateControlExtraData!: (
    payload: IupdateControlExtraData
  ) => void;
  propControlData = {};
  userFormId = 'ID_USERFORM1';
  controlEditMode: boolean = false
  gridSize: number = 9
  insertUserForm () {
    this.propControlData = this.userformData
    const userform = new ControlPropertyData()
    const userFormId = `ID_USERFORM${
      Object.keys(this.userformData).length + 1
    }`
    const Name = `UserForm${Object.keys(this.userformData).length + 1}`
    const Caption = `UserForm${Object.keys(this.userformData).length + 1}`
    const ID = Object.keys(this.userformData).length + 1
    this.addControl({
      target: this,
      key: userFormId,
      value: {
        properties: {
          ...userform.data.UserForm,
          Name: Name,
          ID: ID,
          Caption: Caption
        },
        controls: [],
        extraDatas: { display: 'none' },
        type: 'Userform'
      }
    })
  }
  getEditMode () {
    const selected = this.selectedControls[this.userFormId].selected
    if (selected.length === 1 && !selected[0].startsWith('group')) {
      EventBus.$emit('getEdiTMode', (editmode: boolean) => {
        this.controlEditMode = editmode
      })
    }
  }
  updateCtrlEditMode () {
    this.controlEditMode = false
  }
  subMenuDisplay () {
    this.displaySubMenu = !this.displaySubMenu
  }
  clickChangeMode () {
    this.changeRunMode(!this.isRunMode)
  }
  makeEqual (type: keyof controlProperties) {
    const usrFrmData = this.userformData[this.userFormId]
    const ctrlSel = this.selectedControls[this.userFormId].selected
    const ctrlContainer = this.selectedControls[this.userFormId].container[0]
    const controls = usrFrmData[ctrlContainer].controls
    let divstyle: Array<IGroupStyle> = []
    let getGroupIndex = -1
    EventBus.$emit('getGroupSize', (divstayleArray: Array<IGroupStyle>) => {
      divstyle = divstayleArray
    })
    if (ctrlSel[0].startsWith('group')) {
      getGroupIndex = divstyle.findIndex((val) => val.groupName === ctrlSel[0])
    }
    let propValue = 0
    const leftArray: string[] = []
    const rightArray: string[] = []
    for (let index = 1; index < ctrlSel.length; index++) {
      const selLeft = ctrlSel[0].startsWith('group')
        ? parseInt(divstyle[getGroupIndex].left!)
        : usrFrmData[ctrlSel[0]].properties.Left
      const selTop = ctrlSel[0].startsWith('group')
        ? parseInt(divstyle[getGroupIndex].top!)
        : usrFrmData[ctrlSel[0]].properties.Top
      if (!ctrlSel[index].startsWith('group')) {
        const ctrlProp = usrFrmData[ctrlSel[index]].properties
        if (type === 'Left') {
          if (ctrlProp.Left! <= selLeft!) {
            leftArray.push(ctrlSel[index])
          } else {
            rightArray.push(ctrlSel[index])
          }
        } else if (type === 'Top') {
          if (ctrlProp.Top! <= selTop!) {
            leftArray.push(ctrlSel[index])
          } else {
            rightArray.push(ctrlSel[index])
          }
        }
      } else {
        EventBus.$emit('getGroupSize', (divstayleArray: Array<IGroupStyle>) => {
          divstyle = divstayleArray
        })
        const getIndex = divstyle.findIndex(
          (val) => val.groupName === ctrlSel[index]
        )
        const groupLeft = parseInt(divstyle[getIndex].left!)
        const groupTop = parseInt(divstyle[getIndex].top!)
        const groupConrol = this.getGroupControl(ctrlSel[index])
        if (type === 'Left') {
          if (groupLeft <= selLeft!) {
            for (let ctrl of groupConrol) {
              const prop = this.userformData[this.userFormId][ctrl].properties
              if (Math.floor(prop.Left!) === groupLeft) {
                leftArray.push(ctrl)
              }
            }
          } else {
            for (let ctrl of groupConrol) {
              const prop = this.userformData[this.userFormId][ctrl].properties
              if (Math.floor(prop.Left!) === groupLeft) {
                rightArray.push(ctrl)
              }
            }
          }
        } else if (type === 'Top') {
          if (groupTop <= selTop!) {
            for (let ctrl of groupConrol) {
              const prop = this.userformData[this.userFormId][ctrl].properties
              if (Math.floor(prop.Top!) === groupTop) {
                leftArray.push(ctrl)
              }
            }
          } else {
            for (let ctrl of groupConrol) {
              const prop = this.userformData[this.userFormId][ctrl].properties
              if (Math.floor(prop.Top!) === groupTop) {
                rightArray.push(ctrl)
              }
            }
          }
        }
      }
    }
    if (ctrlSel[0].startsWith('group')) {
      const getIndex = divstyle.findIndex(
        (val) => val.groupName === ctrlSel[0]
      )
      const groupLeft = parseInt(divstyle[getIndex].left!)
      const groupTop = parseInt(divstyle[getIndex].top!)
      const groupConrol = this.getGroupControl(ctrlSel[0])
      if (type === 'Left') {
        for (let ctrl of groupConrol) {
          const prop = this.userformData[this.userFormId][ctrl].properties
          if (Math.floor(prop.Left!) === groupLeft) {
            leftArray.push(ctrl)
            rightArray.push(ctrl)
          }
        }
      } else if (type === 'Top') {
        for (let ctrl of groupConrol) {
          const prop = this.userformData[this.userFormId][ctrl].properties
          if (Math.floor(prop.Top!) === groupTop) {
            leftArray.push(ctrl)
            rightArray.push(ctrl)
          }
        }
      }
    } else {
      leftArray.unshift(ctrlSel[0])
      rightArray.push(ctrlSel[0])
    }
    if (type === 'Left') {
      leftArray.sort((a, b) => {
        return usrFrmData[a].properties.Left! - usrFrmData[b].properties.Left!
      })
      rightArray.sort((a, b) => {
        return usrFrmData[a].properties.Left! - usrFrmData[b].properties.Left!
      })
    } else if (type === 'Top') {
      leftArray.sort((a, b) => {
        return usrFrmData[a].properties.Top! - usrFrmData[b].properties.Top!
      })
      rightArray.sort((a, b) => {
        return usrFrmData[a].properties.Top! - usrFrmData[b].properties.Top!
      })
    }
    let leftControl = { ...usrFrmData[leftArray[0]].properties }
    if (leftControl.GroupID !== '') {
      const groupIndex = divstyle.findIndex(
        (val) => val.groupName === leftControl.GroupID
      )
      const groupSize = divstyle[groupIndex]
      leftControl = {
        ...leftControl,
        Width: parseInt(divstyle[groupIndex].width!),
        Height: parseInt(divstyle[groupIndex].height!),
        Left: parseInt(divstyle[groupIndex].left!),
        Top: parseInt(divstyle[groupIndex].top!)
      }
    }
    let rightControl = {
      ...usrFrmData[rightArray[rightArray.length - 1]].properties
    }
    if (rightControl.GroupID !== '') {
      const groupIndex = divstyle.findIndex(
        (val) => val.groupName === rightControl.GroupID
      )
      const groupSize = divstyle[groupIndex]
      rightControl = {
        ...leftControl,
        Width: parseInt(divstyle[groupIndex].width!),
        Height: parseInt(divstyle[groupIndex].height!),
        Left: parseInt(divstyle[groupIndex].left!),
        Top: parseInt(divstyle[groupIndex].top!)
      }
    }
    let totalSize = 0
    for (let index = 0; index < ctrlSel.length; index++) {
      if (type === 'Left') {
        if (!ctrlSel[index].startsWith('group')) {
          const ctrlProp = usrFrmData[ctrlSel[index]].properties
          totalSize = totalSize + ctrlProp.Width!
        } else {
          const groupIndex = divstyle.findIndex(
            (val) => val.groupName === ctrlSel[index]
          )
          totalSize = totalSize + parseInt(divstyle[groupIndex].width!)
        }
      } else if (type === 'Top') {
        if (!ctrlSel[index].startsWith('group')) {
          const ctrlProp = usrFrmData[ctrlSel[index]].properties
          totalSize = totalSize + ctrlProp.Height!
        } else {
          const groupIndex = divstyle.findIndex(
            (val) => val.groupName === ctrlSel[index]
          )
          totalSize = totalSize + parseInt(divstyle[groupIndex].height!)
        }
      }
    }
    let diffrence = 0
    if (type === 'Left') {
      diffrence =
        (rightControl.Left! +
          rightControl.Width! -
          leftControl.Left! -
          totalSize) /
        (ctrlSel.length - 1)
    } else if (type === 'Top') {
      diffrence =
        (rightControl.Top! +
          rightControl.Height! -
          leftControl.Top! -
          totalSize) /
        (ctrlSel.length - 1)
    }
    const unique = () => {
      var a = leftArray.concat(rightArray)
      for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
          if (a[i] === a[j]) {
            a.splice(j--, 1)
          }
        }
      }
      return a
    }
    const combineArray = unique()
    for (let index = 1; index < combineArray.length - 1; index++) {
      const prevCtrlProp = usrFrmData[combineArray[index - 1]].properties
      const ctrlProp = usrFrmData[combineArray[index]].properties
      let prevIndex = -1
      const controlPropIndex = -1
      if (type === 'Left') {
        if (prevCtrlProp.GroupID === '' && ctrlProp.GroupID === '') {
          propValue = prevCtrlProp.Left! + prevCtrlProp.Width! + diffrence
          this.updateControlProperty(type, propValue, combineArray[index])
        } else {
          if (prevCtrlProp.GroupID !== '') {
            prevIndex = divstyle.findIndex(
              (val) => val.groupName === prevCtrlProp.GroupID
            )
            propValue =
              parseInt(divstyle[prevIndex].left!) +
              parseInt(divstyle[prevIndex].width!) +
              diffrence
          } else {
            propValue = prevCtrlProp.Left! + prevCtrlProp.Width! + diffrence
          }
          if (ctrlProp.GroupID !== '') {
            const getIndex = divstyle.findIndex(
              (val) => val.groupName === ctrlProp.GroupID
            )
            EventBus.$emit('updasteGroupSize', type, propValue, getIndex)
          } else {
            this.updateControlProperty(type, propValue, combineArray[index])
          }
        }
      } else {
        if (type === 'Top') {
          if (prevCtrlProp.GroupID === '' && ctrlProp.GroupID === '') {
            propValue = prevCtrlProp.Top! + prevCtrlProp.Height! + diffrence
            this.updateControlProperty(type, propValue, combineArray[index])
          } else {
            if (prevCtrlProp.GroupID !== '') {
              prevIndex = divstyle.findIndex(
                (val) => val.groupName === prevCtrlProp.GroupID
              )
              propValue =
                parseInt(divstyle[prevIndex].top!) +
                parseInt(divstyle[prevIndex].height!) +
                diffrence
            } else {
              propValue = prevCtrlProp.Top! + prevCtrlProp.Height! + diffrence
            }
            if (ctrlProp.GroupID !== '') {
              const getIndex = divstyle.findIndex(
                (val) => val.groupName === ctrlProp.GroupID
              )
              EventBus.$emit('updasteGroupSize', type, propValue, getIndex)
            } else {
              this.updateControlProperty(type, propValue, combineArray[index])
            }
          }
        }
      }
    }
  }
  bringFront () {
    const userData = this.userformData[this.userFormId]
    const highProrControl: string[] = []
    const lowProrControl: string[] = []
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
    lowProrControl.sort((a, b) => {
      return userData[a].extraDatas!.zIndex! - userData[b].extraDatas!.zIndex!
    })
    let getLowPropHighestIndex: string = lowProrControl[lowProrControl.length - 1]
    highProrControl.sort((a, b) => {
      return userData[a].extraDatas!.zIndex! - userData[b].extraDatas!.zIndex!
    })
    let getHighPropHighestIndex = highProrControl[highProrControl.length - 1]
    const lowSeriesControl: string[] = []
    const highSeriesControl: string[] = []
    const getSelControl = [...this.getSelectedControlsDatas!]
    getSelControl.sort((a, b) => {
      return userData[a].extraDatas!.zIndex! - userData[b].extraDatas!.zIndex!
    })
    for (const selControl of getSelControl) {
      if (lowProrControl.includes(selControl)) {
        lowSeriesControl.push(selControl)
      } else {
        highSeriesControl.push(selControl)
      }
    }
    const setLowPropHighIndex = (control: string) => {
      if (lowSeriesControl.length > 0 && lowSeriesControl.includes(control)) {
        lowSeriesControl.pop()
        const Index = lowProrControl.findIndex(val => userData[getLowPropHighestIndex!].extraDatas!.zIndex! - 1 === userData[val].extraDatas!.zIndex)
        getLowPropHighestIndex = Index !== -1 ? lowProrControl[Index] : ''
        if (Index !== -1) {
          setLowPropHighIndex(getLowPropHighestIndex)
        }
      }
    }
    setLowPropHighIndex(getLowPropHighestIndex)
    lowSeriesControl.sort((a, b) => {
      return userData[a].extraDatas!.zIndex! - userData[b].extraDatas!.zIndex!
    })
    if (lowSeriesControl.length > 0) {
      const lowestZIndex = userData[lowSeriesControl[0]].extraDatas!.zIndex!
      let nextSeries: string[] = []
      let count = lowSeriesControl.length - 1
      const diff = userData[getLowPropHighestIndex].extraDatas!.zIndex! - userData[lowSeriesControl[lowSeriesControl.length - 1]].extraDatas!.zIndex!
      for (const ctrl of lowSeriesControl) {
        const nextControl = lowSeriesControl.findIndex(val => 'zIndex' in userData[val].extraDatas! && (userData[ctrl].extraDatas!.zIndex! + 1 === userData[val].extraDatas!.zIndex!))
        if (nextControl !== -1) {
          nextSeries.push(ctrl)
          count = count - 1
        } else {
          const difference = userData[getLowPropHighestIndex].extraDatas!.zIndex! - count
          this.updateExtraDatas(ctrl, 'zIndex', difference)
          if (nextSeries.length > 0) {
            for (let i = 0; i < nextSeries.length; i++) {
              const diff = userData[ctrl].extraDatas!.zIndex! - (nextSeries.length - i)
              this.updateExtraDatas(nextSeries[i], 'zIndex', diff)
            }
            nextSeries = []
          }
          count = count - 1
        }
      }
      let counter = 0
      for (const ctrl of lowProrControl) {
        if (!this.getSelectedControlsDatas!.includes(ctrl)) {
          counter = counter + 1
          this.updateExtraDatas(ctrl, 'zIndex', counter)
        }
      }
    }

    const setHighPropHighIndex = (control: string) => {
      if (highSeriesControl.length > 0 && highSeriesControl.includes(control)) {
        highSeriesControl.pop()
        const Index = highProrControl.findIndex(val => userData[getHighPropHighestIndex!].extraDatas!.zIndex! - 1 === userData[val].extraDatas!.zIndex)
        getHighPropHighestIndex = Index !== -1 ? highProrControl[Index] : ''
        if (Index !== -1) {
          setHighPropHighIndex(getHighPropHighestIndex)
        }
      }
    }
    setHighPropHighIndex(getHighPropHighestIndex)
    highSeriesControl.sort((a, b) => {
      return userData[a].extraDatas!.zIndex! - userData[b].extraDatas!.zIndex!
    })
    if (highSeriesControl.length > 0) {
      const highestZIndex = userData[highSeriesControl[0]].extraDatas!.zIndex!
      let nextSeries: string[] = []
      let count = highSeriesControl.length - 1
      const diff = userData[getHighPropHighestIndex].extraDatas!.zIndex! - userData[highSeriesControl[highSeriesControl.length - 1]].extraDatas!.zIndex!
      for (const ctrl of highSeriesControl) {
        const nextControl = highSeriesControl.findIndex(val => 'zIndex' in userData[val].extraDatas! && (userData[ctrl].extraDatas!.zIndex! + 1 === userData[val].extraDatas!.zIndex!))
        if (nextControl !== -1) {
          nextSeries.push(ctrl)
          count = count - 1
        } else {
          const difference = userData[getHighPropHighestIndex].extraDatas!.zIndex! - count
          this.updateExtraDatas(ctrl, 'zIndex', difference)
          if (nextSeries.length > 0) {
            for (let i = 0; i < nextSeries.length; i++) {
              const diff = userData[ctrl].extraDatas!.zIndex! - (nextSeries.length - i)
              this.updateExtraDatas(nextSeries[i], 'zIndex', diff)
            }
            nextSeries = []
          }
          count = count - 1
        }
      }
      let counter = 0
      for (const ctrl of highProrControl) {
        if (!this.getSelectedControlsDatas!.includes(ctrl)) {
          counter = counter + 1
          this.updateExtraDatas(ctrl, 'zIndex', counter)
        }
      }
    }
  }
  sendBack () {
    const userData = this.userformData[this.userFormId]
    const highProrControl: string[] = []
    const lowProrControl: string[] = []
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
    lowProrControl.sort((a, b) => {
      return userData[b].extraDatas!.zIndex! - userData[a].extraDatas!.zIndex!
    })
    let getLowPropHighestIndex: string = lowProrControl[lowProrControl.length - 1]
    highProrControl.sort((a, b) => {
      return userData[b].extraDatas!.zIndex! - userData[a].extraDatas!.zIndex!
    })
    let getHighPropHighestIndex = highProrControl[highProrControl.length - 1]
    const lowSeriesControl: string[] = []
    const highSeriesControl: string[] = []
    const getSelControl = [...this.getSelectedControlsDatas!]
    getSelControl.sort((a, b) => {
      return userData[a].extraDatas!.zIndex! - userData[b].extraDatas!.zIndex!
    })
    for (const selControl of getSelControl) {
      if (lowProrControl.includes(selControl)) {
        lowSeriesControl.push(selControl)
      } else {
        highSeriesControl.push(selControl)
      }
    }
    const setLowPropHighIndex = (control: string) => {
      if (lowSeriesControl.length > 0 && lowSeriesControl.includes(control)) {
        lowSeriesControl.pop()
        const Index = lowProrControl.findIndex(val => userData[getLowPropHighestIndex!].extraDatas!.zIndex! + 1 === userData[val].extraDatas!.zIndex)
        getLowPropHighestIndex = Index !== -1 ? lowProrControl[Index] : ''
        if (Index !== -1) {
          setLowPropHighIndex(getLowPropHighestIndex)
        }
      }
    }
    setLowPropHighIndex(getLowPropHighestIndex)
    if (lowSeriesControl.length > 0) {
      lowSeriesControl.sort((a, b) => {
        return userData[a].extraDatas!.zIndex! - userData[b].extraDatas!.zIndex!
      })
      let count = userData[getLowPropHighestIndex].extraDatas!.zIndex!
      for (const ctrl of lowSeriesControl) {
        this.updateExtraDatas(ctrl, 'zIndex', count)
        count = count + 1
      }
      let counter = userData[lowSeriesControl[lowSeriesControl.length - 1]].extraDatas!.zIndex!
      for (let i = lowProrControl.length - 1; i >= 0; i--) {
        if (!this.getSelectedControlsDatas!.includes(lowProrControl[i])) {
          counter = counter + 1
          this.updateExtraDatas(lowProrControl[i], 'zIndex', counter)
        }
      }
    }

    const setHighPropHighIndex = (control: string) => {
      if (highSeriesControl.length > 0 && highSeriesControl.includes(control)) {
        highSeriesControl.shift()
        const Index = highProrControl.findIndex(val => userData[getHighPropHighestIndex!].extraDatas!.zIndex! + 1 === userData[val].extraDatas!.zIndex)
        getHighPropHighestIndex = Index !== -1 ? highProrControl[Index] : ''
        if (Index !== -1) {
          setHighPropHighIndex(getHighPropHighestIndex)
        }
      }
    }
    setHighPropHighIndex(getHighPropHighestIndex)
    if (highSeriesControl.length > 0) {
      highSeriesControl.sort((a, b) => {
        return userData[a].extraDatas!.zIndex! - userData[b].extraDatas!.zIndex!
      })
      let count = userData[getHighPropHighestIndex].extraDatas!.zIndex!
      for (const ctrl of highSeriesControl) {
        this.updateExtraDatas(ctrl, 'zIndex', count)
        count = count + 1
      }
      let counter = userData[highSeriesControl[highSeriesControl.length - 1]].extraDatas!.zIndex!
      for (let i = highProrControl.length - 1; i >= 0; i--) {
        if (!this.getSelectedControlsDatas!.includes(highProrControl[i])) {
          counter = counter + 1
          this.updateExtraDatas(highProrControl[i], 'zIndex', counter)
        }
      }
    }
  }
  groupControl () {
    EventBus.$emit('groupControl', 'group')
  }
  unGroupControl () {
    EventBus.$emit('groupControl', 'ungroup')
  }
  sizeToFit () {
    const usrFrmData = this.userformData[this.userFormId]
    const ctrlSel = this.selectedControls[this.userFormId].selected
    const sizeToFitArr: string[] = []
    const sizeToFitVal: boolean[] = []
    for (let index = 0; index < ctrlSel.length; index++) {
      if (!ctrlSel[index].startsWith('group')) {
        const controlprop = usrFrmData[ctrlSel[index]].properties
        if (usrFrmData[ctrlSel[index]].type === 'SpinButton') {
          if (controlProperties.controlsOrientationProp(usrFrmData[ctrlSel[index]]) === true) {
            this.updateControlProperty('Height', 43.5, ctrlSel[index])
            this.updateControlProperty('Width', 21.6, ctrlSel[index])
          } else {
            this.updateControlProperty('Width', 52.5, ctrlSel[index])
            this.updateControlProperty('Height', 21.6, ctrlSel[index])
          }
        } else if (usrFrmData[ctrlSel[index]].type === 'ScrollBar') {
          if (controlProperties.controlsOrientationProp(usrFrmData[ctrlSel[index]]) === true) {
            this.updateControlProperty('Width', 21.6, ctrlSel[index])
          } else {
            this.updateControlProperty('Height', 21.6, ctrlSel[index])
          }
        } else if ('AutoSize' in controlprop) {
          sizeToFitArr.push(ctrlSel[index])
          sizeToFitVal.push(controlprop.AutoSize!)
          this.updateControlProperty('AutoSize', true, ctrlSel[index])
        }
      }
    }
    setTimeout(() => {
      for (let index = 0; index < sizeToFitArr.length; index++) {
        if (!sizeToFitArr[index].startsWith('group')) {
          const controlprop = usrFrmData[sizeToFitArr[index]].properties
          if ('AutoSize' in controlprop) {
            this.updateControlProperty(
              'AutoSize',
              sizeToFitVal[index],
              sizeToFitArr[index]
            )
          }
        }
      }
    }, 100)
  }
  convertToGridSize (val: number) {
    const gridSize = 9
    return Math.round(val / gridSize) * gridSize
  }
  sizeToGrid () {
    let divstyle: Array<IGroupStyle> = []
    const usrFrmData = this.userformData[this.userFormId]
    const ctrlSel = this.selectedControls[this.userFormId].selected
    let ctrlContainer = this.selectedControls[this.userFormId].container[0]
    for (let index = 0; index < ctrlSel.length; index++) {
      if (!ctrlSel[index].startsWith('group')) {
        const controlprop = usrFrmData[ctrlSel[index]].properties
        this.updateControlProperty(
          'Left',
          this.convertToGridSize(controlprop.Left!),
          ctrlSel[index]
        )
        this.updateControlProperty(
          'Top',
          this.convertToGridSize(controlprop.Top!),
          ctrlSel[index]
        )
        this.updateControlProperty(
          'Width',
          this.convertToGridSize(controlprop.Width!),
          ctrlSel[index]
        )
        this.updateControlProperty(
          'Height',
          this.convertToGridSize(controlprop.Height!),
          ctrlSel[index]
        )
      } else {
        EventBus.$emit('getGroupSize', (divstayleArray: Array<IGroupStyle>) => {
          divstyle = divstayleArray
        })
        const getIndex = divstyle.findIndex(
          (val) => val.groupName === ctrlSel[index]
        )
        EventBus.$emit('updasteGroupSize', 'GroupID', 0, getIndex)
      }
    }
  }
  incDecspacing (type: keyof controlProperties, value: number) {
    const usrFrmData = this.userformData[this.userFormId]
    const ctrlSel = this.selectedControls[this.userFormId].selected
    const ctrlContainer = this.selectedControls[this.userFormId].container[0]
    const controls = usrFrmData[ctrlContainer].controls
    let divstyle: Array<IGroupStyle> = []
    let getGroupIndex = -1
    if (ctrlSel[0].startsWith('group')) {
      EventBus.$emit('getGroupSize', (divstayleArray: Array<IGroupStyle>) => {
        divstyle = divstayleArray
      })
      getGroupIndex = divstyle.findIndex((val) => val.groupName === ctrlSel[0])
    }
    const leftArray: string[] = []
    const rightArray: string[] = []
    for (let index = 1; index < ctrlSel.length; index++) {
      const selLeft = ctrlSel[0].startsWith('group')
        ? parseInt(divstyle[getGroupIndex].left!)
        : usrFrmData[ctrlSel[0]].properties.Left
      const selTop = ctrlSel[0].startsWith('group')
        ? parseInt(divstyle[getGroupIndex].top!)
        : usrFrmData[ctrlSel[0]].properties.Top
      if (!ctrlSel[index].startsWith('group')) {
        const ctrlProp = usrFrmData[ctrlSel[index]].properties
        if (type === 'Left') {
          if (ctrlProp.Left! <= selLeft!) {
            leftArray.push(ctrlSel[index])
          } else {
            rightArray.push(ctrlSel[index])
          }
        } else if (type === 'Top') {
          if (ctrlProp.Top! <= selTop!) {
            leftArray.push(ctrlSel[index])
          } else {
            rightArray.push(ctrlSel[index])
          }
        }
      } else {
        EventBus.$emit('getGroupSize', (divstayleArray: Array<IGroupStyle>) => {
          divstyle = divstayleArray
        })
        const getIndex = divstyle.findIndex(
          (val) => val.groupName === ctrlSel[index]
        )
        const groupLeft = parseInt(divstyle[getIndex].left!)
        const groupTop = parseInt(divstyle[getIndex].top!)
        const groupConrol = this.getGroupControl(ctrlSel[index])
        if (type === 'Left') {
          if (groupLeft <= selLeft!) {
            for (let ctrl of groupConrol) {
              const prop = this.userformData[this.userFormId][ctrl].properties
              if (Math.floor(prop.Left!) === groupLeft) {
                leftArray.push(ctrl)
              }
            }
          } else {
            for (let ctrl of groupConrol) {
              const prop = this.userformData[this.userFormId][ctrl].properties
              if (Math.floor(prop.Left!) === groupLeft) {
                rightArray.push(ctrl)
              }
            }
          }
        } else if (type === 'Top') {
          if (groupTop <= selTop!) {
            for (let ctrl of groupConrol) {
              const prop = this.userformData[this.userFormId][ctrl].properties
              if (Math.floor(prop.Top!) === groupTop) {
                leftArray.push(ctrl)
              }
            }
          } else {
            for (let ctrl of groupConrol) {
              const prop = this.userformData[this.userFormId][ctrl].properties
              if (Math.floor(prop.Top!) === groupTop) {
                rightArray.push(ctrl)
              }
            }
          }
        }
      }
    }
    if (ctrlSel[0].startsWith('group')) {
      const getIndex = divstyle.findIndex(
        (val) => val.groupName === ctrlSel[0]
      )
      const groupLeft = parseInt(divstyle[getIndex].left!)
      const groupTop = parseInt(divstyle[getIndex].top!)
      const groupConrol = this.getGroupControl(ctrlSel[0])
      if (type === 'Left') {
        for (let ctrl of groupConrol) {
          const prop = this.userformData[this.userFormId][ctrl].properties
          if (Math.floor(prop.Left!) === groupLeft) {
            leftArray.push(ctrl)
            rightArray.push(ctrl)
          }
        }
      } else if (type === 'Top') {
        for (let ctrl of groupConrol) {
          const prop = this.userformData[this.userFormId][ctrl].properties
          if (Math.floor(prop.Top!) === groupTop) {
            leftArray.push(ctrl)
            rightArray.push(ctrl)
          }
        }
      }
    } else {
      leftArray.unshift(ctrlSel[0])
      rightArray.push(ctrlSel[0])
    }
    if (type === 'Left') {
      leftArray.sort((a, b) => {
        return usrFrmData[b].properties.Left! - usrFrmData[a].properties.Left!
      })
      rightArray.sort((a, b) => {
        return usrFrmData[a].properties.Left! - usrFrmData[b].properties.Left!
      })
    } else if (type === 'Top') {
      leftArray.sort((a, b) => {
        return usrFrmData[b].properties.Top! - usrFrmData[a].properties.Top!
      })
      rightArray.sort((a, b) => {
        return usrFrmData[a].properties.Top! - usrFrmData[b].properties.Top!
      })
    }
    const groupIndex: number = divstyle.findIndex(
      (val) => val.groupName === ctrlSel[0]
    )
    const isGroup = ctrlSel[0].startsWith('group')
    const ctrlProp = !isGroup && usrFrmData[ctrlSel[0]].properties
    const newObject = {
      Left:
        isGroup && groupIndex !== -1
          ? parseInt(divstyle[groupIndex].left!)
          : ctrlProp
            ? ctrlProp.Left!
            : 0,
      Top:
        isGroup && groupIndex !== -1
          ? parseInt(divstyle[groupIndex].top!)
          : ctrlProp
            ? ctrlProp.Top!
            : 0,
      Width:
        isGroup && groupIndex !== -1
          ? parseInt(divstyle[groupIndex].width!)
          : ctrlProp
            ? ctrlProp.Width!
            : 0,
      Height:
        isGroup && groupIndex !== -1
          ? parseInt(divstyle[groupIndex].height!)
          : ctrlProp
            ? ctrlProp.Height!
            : 0
    }
    let incDecValue = 0
    let propValue = 0
    for (let index = 1; index < leftArray.length; index++) {
      const ctrlProp = usrFrmData[leftArray[index]].properties
      let prevIndex = -1
      let controlPropIndex = -1
      if (type === 'Left') {
        if (ctrlProp.GroupID === '') {
          propValue = propValue + value
          incDecValue = ctrlProp.Left! - propValue
          this.updateControlProperty(type, this.convertToGridSize(incDecValue), leftArray[index])
        } else {
          if (ctrlProp.GroupID !== '') {
            controlPropIndex = divstyle.findIndex((val) => val.groupName === ctrlProp.GroupID)
            let incDecValue = 0
            propValue = propValue + value
            incDecValue = parseInt(divstyle[controlPropIndex].left!) - propValue
            EventBus.$emit(
              'updasteGroupSize',
              type,
              this.convertToGridSize(incDecValue),
              controlPropIndex
            )
          }
        }
      } else if (type === 'Top') {
        if (ctrlProp.GroupID === '') {
          propValue = propValue + value
          incDecValue = ctrlProp.Top! - propValue
          this.updateControlProperty(type, this.convertToGridSize(incDecValue), leftArray[index])
        } else {
          if (ctrlProp.GroupID !== '') {
            controlPropIndex = divstyle.findIndex((val) => val.groupName === ctrlProp.GroupID)
            let incDecValue = 0
            propValue = propValue + value
            incDecValue = parseInt(divstyle[controlPropIndex].top!) - propValue
            EventBus.$emit(
              'updasteGroupSize',
              type,
              this.convertToGridSize(incDecValue),
              controlPropIndex
            )
          }
        }
      }
    }
    propValue = 0
    for (let index = 1; index < rightArray.length; index++) {
      const ctrlProp = usrFrmData[rightArray[index]].properties
      let prevIndex = -1
      let controlPropIndex = -1
      if (type === 'Left') {
        if (ctrlProp.GroupID === '') {
          propValue = propValue + value
          incDecValue = ctrlProp.Left! + propValue
          this.updateControlProperty(type, this.convertToGridSize(incDecValue), rightArray[index])
        } else {
          if (ctrlProp.GroupID !== '') {
            controlPropIndex = divstyle.findIndex((val) => val.groupName === ctrlProp.GroupID)
            propValue = propValue + value
            incDecValue = parseInt(divstyle[controlPropIndex].left!) + propValue
            EventBus.$emit(
              'updasteGroupSize',
              type,
              this.convertToGridSize(incDecValue),
              controlPropIndex
            )
          }
        }
      } else if (type === 'Top') {
        if (ctrlProp.GroupID === '') {
          let incDecValue = 0
          propValue = propValue + value
          incDecValue = ctrlProp.Top! + propValue
          this.updateControlProperty(type, this.convertToGridSize(incDecValue), rightArray[index])
        } else {
          if (ctrlProp.GroupID !== '') {
            controlPropIndex = divstyle.findIndex((val) => val.groupName === ctrlProp.GroupID)
            let incDecValue = 0
            propValue = propValue + value
            incDecValue = parseInt(divstyle[controlPropIndex].top!) + propValue
            EventBus.$emit(
              'updasteGroupSize',
              type,
              this.convertToGridSize(incDecValue),
              controlPropIndex
            )
          }
        }
      }
    }
  }
  getGroupControl (groupName: string) {
    const ctrlContainer = this.selectedControls[this.userFormId].container[0]
    const usrFrmData = this.userformData[this.userFormId]
    const controls = []
    for (const control of usrFrmData[ctrlContainer].controls) {
      if (usrFrmData[control].properties.GroupID === groupName) {
        controls.push(control)
      }
    }
    return controls
  }
  removeSpace (type: keyof controlProperties) {
    const usrFrmData = this.userformData[this.userFormId]
    const ctrlSel = this.selectedControls[this.userFormId].selected
    const ctrlContainer = this.selectedControls[this.userFormId].container[0]
    const controls = usrFrmData[ctrlContainer].controls
    let divstyle: Array<IGroupStyle> = []
    let getGroupIndex = -1
    if (ctrlSel[0].startsWith('group')) {
      EventBus.$emit('getGroupSize', (divstayleArray: Array<IGroupStyle>) => {
        divstyle = divstayleArray
      })
      getGroupIndex = divstyle.findIndex((val) => val.groupName === ctrlSel[0])
    }
    let propValue = 0
    const leftArray: string[] = []
    const rightArray: string[] = []
    for (let index = 1; index < ctrlSel.length; index++) {
      const selLeft = ctrlSel[0].startsWith('group')
        ? parseInt(divstyle[getGroupIndex].left!)
        : usrFrmData[ctrlSel[0]].properties.Left
      const selTop = ctrlSel[0].startsWith('group')
        ? parseInt(divstyle[getGroupIndex].top!)
        : usrFrmData[ctrlSel[0]].properties.Top
      if (!ctrlSel[index].startsWith('group')) {
        const ctrlProp = usrFrmData[ctrlSel[index]].properties
        if (type === 'Left') {
          if (ctrlProp.Left! <= selLeft!) {
            leftArray.push(ctrlSel[index])
          } else {
            rightArray.push(ctrlSel[index])
          }
        } else if (type === 'Top') {
          if (ctrlProp.Top! <= selTop!) {
            leftArray.push(ctrlSel[index])
          } else {
            rightArray.push(ctrlSel[index])
          }
        }
      } else {
        EventBus.$emit('getGroupSize', (divstayleArray: Array<IGroupStyle>) => {
          divstyle = divstayleArray
        })
        const getIndex = divstyle.findIndex(
          (val) => val.groupName === ctrlSel[index]
        )
        const groupLeft = parseInt(divstyle[getIndex].left!)
        const groupTop = parseInt(divstyle[getIndex].top!)
        const groupConrol = this.getGroupControl(ctrlSel[index])
        if (type === 'Left') {
          if (groupLeft <= selLeft!) {
            for (let ctrl of groupConrol) {
              const prop = this.userformData[this.userFormId][ctrl].properties
              if (Math.floor(prop.Left!) === groupLeft) {
                leftArray.push(ctrl)
              }
            }
          } else {
            for (let ctrl of groupConrol) {
              const prop = this.userformData[this.userFormId][ctrl].properties
              if (Math.floor(prop.Left!) === groupLeft) {
                rightArray.push(ctrl)
              }
            }
          }
        } else if (type === 'Top') {
          if (groupTop <= selTop!) {
            for (let ctrl of groupConrol) {
              const prop = this.userformData[this.userFormId][ctrl].properties
              if (Math.floor(prop.Top!) === groupTop) {
                leftArray.push(ctrl)
              }
            }
          } else {
            for (let ctrl of groupConrol) {
              const prop = this.userformData[this.userFormId][ctrl].properties
              if (Math.floor(prop.Top!) === groupTop) {
                rightArray.push(ctrl)
              }
            }
          }
        }
      }
    }
    if (ctrlSel[0].startsWith('group')) {
      const getIndex = divstyle.findIndex(
        (val) => val.groupName === ctrlSel[0]
      )
      const groupLeft = parseInt(divstyle[getIndex].left!)
      const groupTop = parseInt(divstyle[getIndex].top!)
      const groupConrol = this.getGroupControl(ctrlSel[0])
      if (type === 'Left') {
        for (let ctrl of groupConrol) {
          const prop = this.userformData[this.userFormId][ctrl].properties
          if (Math.floor(prop.Left!) === groupLeft) {
            leftArray.push(ctrl)
            rightArray.push(ctrl)
          }
        }
      } else if (type === 'Top') {
        for (let ctrl of groupConrol) {
          const prop = this.userformData[this.userFormId][ctrl].properties
          if (Math.floor(prop.Top!) === groupTop) {
            leftArray.push(ctrl)
            rightArray.push(ctrl)
          }
        }
      }
    } else {
      leftArray.unshift(ctrlSel[0])
      rightArray.push(ctrlSel[0])
    }
    if (type === 'Left') {
      leftArray.sort((a, b) => {
        return usrFrmData[b].properties.Left! - usrFrmData[a].properties.Left!
      })
      rightArray.sort((a, b) => {
        return usrFrmData[a].properties.Left! - usrFrmData[b].properties.Left!
      })
    } else if (type === 'Top') {
      leftArray.sort((a, b) => {
        return usrFrmData[b].properties.Top! - usrFrmData[a].properties.Top!
      })
      rightArray.sort((a, b) => {
        return usrFrmData[a].properties.Top! - usrFrmData[b].properties.Top!
      })
    }
    for (let index = 1; index < leftArray.length; index++) {
      const prevCtrlProp = usrFrmData[leftArray[index - 1]].properties
      const ctrlProp = usrFrmData[leftArray[index]].properties
      let prevIndex = -1
      let controlPropIndex = -1
      if (type === 'Left') {
        if (prevCtrlProp.GroupID === '' && ctrlProp.GroupID === '') {
          propValue = prevCtrlProp.Left! - ctrlProp.Width!
          this.updateControlProperty(type, propValue, leftArray[index])
        } else {
          if (prevCtrlProp.GroupID !== '') {
            if (ctrlProp.GroupID === '') {
              prevIndex = divstyle.findIndex(
                (val) => val.groupName === prevCtrlProp.GroupID
              )
              propValue = parseInt(divstyle[prevIndex].left!) - ctrlProp.Width!
              this.updateControlProperty(type, propValue, leftArray[index])
            }
          }
          if (ctrlProp.GroupID !== '') {
            controlPropIndex = divstyle.findIndex(
              (val) => val.groupName === ctrlProp.GroupID
            )
            if (prevCtrlProp.GroupID === '') {
              propValue =
                prevCtrlProp.Left! -
                parseInt(divstyle[controlPropIndex].width!)
            } else {
              prevIndex = divstyle.findIndex(
                (val) => val.groupName === prevCtrlProp.GroupID
              )
              propValue =
                parseInt(divstyle[prevIndex].left!) -
                parseInt(divstyle[controlPropIndex].width!)
            }
            EventBus.$emit(
              'updasteGroupSize',
              type,
              propValue,
              controlPropIndex
            )
          }
        }
      } else if (type === 'Top') {
        if (prevCtrlProp.GroupID === '' && ctrlProp.GroupID === '') {
          propValue = prevCtrlProp.Top! - ctrlProp.Height!
          this.updateControlProperty(type, propValue, leftArray[index])
        } else {
          if (prevCtrlProp.GroupID !== '') {
            if (ctrlProp.GroupID === '') {
              prevIndex = divstyle.findIndex(
                (val) => val.groupName === prevCtrlProp.GroupID
              )
              propValue = parseInt(divstyle[prevIndex].top!) - ctrlProp.Height!
              this.updateControlProperty(type, propValue, leftArray[index])
            }
          }
          if (ctrlProp.GroupID !== '') {
            controlPropIndex = divstyle.findIndex(
              (val) => val.groupName === ctrlProp.GroupID
            )
            if (prevCtrlProp.GroupID === '') {
              propValue =
                prevCtrlProp.Top! -
                parseInt(divstyle[controlPropIndex].height!)
            } else {
              prevIndex = divstyle.findIndex(
                (val) => val.groupName === prevCtrlProp.GroupID
              )
              propValue =
                parseInt(divstyle[prevIndex].top!) -
                parseInt(divstyle[controlPropIndex].height!)
            }
            EventBus.$emit(
              'updasteGroupSize',
              type,
              propValue,
              controlPropIndex
            )
          }
        }
      }
    }
    for (let index = 1; index < rightArray.length; index++) {
      const prevCtrlProp = usrFrmData[rightArray[index - 1]].properties
      const ctrlProp = usrFrmData[rightArray[index]].properties
      let prevIndex = -1
      const controlPropIndex = -1
      if (type === 'Left') {
        if (prevCtrlProp.GroupID === '' && ctrlProp.GroupID === '') {
          propValue = prevCtrlProp.Left! + prevCtrlProp.Width!
          this.updateControlProperty(type, propValue, rightArray[index])
        } else {
          if (prevCtrlProp.GroupID !== '') {
            prevIndex = divstyle.findIndex(
              (val) => val.groupName === prevCtrlProp.GroupID
            )
            propValue =
              parseInt(divstyle[prevIndex].left!) +
              parseInt(divstyle[prevIndex].width!)
          } else {
            propValue = prevCtrlProp.Left! + prevCtrlProp.Width!
          }
          if (ctrlProp.GroupID !== '') {
            const getIndex = divstyle.findIndex(
              (val) => val.groupName === ctrlProp.GroupID
            )
            EventBus.$emit('updasteGroupSize', type, propValue, getIndex)
          } else {
            this.updateControlProperty(type, propValue, rightArray[index])
          }
        }
      } else if (type === 'Top') {
        if (prevCtrlProp.GroupID === '' && ctrlProp.GroupID === '') {
          propValue = prevCtrlProp.Top! + prevCtrlProp.Height!
          this.updateControlProperty(type, propValue, rightArray[index])
        } else {
          if (prevCtrlProp.GroupID !== '') {
            prevIndex = divstyle.findIndex(
              (val) => val.groupName === prevCtrlProp.GroupID
            )
            propValue =
              parseInt(divstyle[prevIndex].top!) +
              parseInt(divstyle[prevIndex].height!)
          } else {
            propValue = prevCtrlProp.Top! + prevCtrlProp.Height!
          }
          if (ctrlProp.GroupID !== '') {
            const getIndex = divstyle.findIndex(
              (val) => val.groupName === ctrlProp.GroupID
            )
            EventBus.$emit('updasteGroupSize', type, propValue, getIndex)
          } else {
            this.updateControlProperty(type, propValue, rightArray[index])
          }
        }
      }
    }
  }
  updatePropVal (propName: string, propValue: number) {
    const ctrlSel = this.selectedControls[this.userFormId].selected
    const usrFrmData = this.userformData[this.userFormId]
    for (let index = 0; index < ctrlSel.length; index++) {
      if (!ctrlSel[index].startsWith('group')) {
        const curProp = usrFrmData[ctrlSel[index]].properties
        if (propName === 'selCenter') {
          const curCenter = curProp.Width! / 2
          const value = propValue - curCenter
          this.updateControlProperty('Left', value, ctrlSel[index])
        }
        if (propName === 'selMiddle') {
          const curMiddle = curProp.Height! / 2
          const value = propValue - curMiddle
          this.updateControlProperty('Top', value, ctrlSel[index])
        }
      } else {
        let divstyle: Array<IGroupStyle> = []
        EventBus.$emit('getGroupSize', (divstayleArray: Array<IGroupStyle>) => {
          divstyle = divstayleArray
        })
        const groupIndex = divstyle.findIndex(
          (val) => val.groupName === ctrlSel[index]
        )
        const curProp = divstyle[groupIndex]
        const left = parseInt(curProp.left!)
        const top = parseInt(curProp.top!)
        const width = parseInt(curProp.width!)
        const height = parseInt(curProp.height!)
        let value = -1
        if (propName === 'selCenter') {
          value = propValue - width! / 2
          EventBus.$emit('updasteGroupSize', 'Left', value, groupIndex)
        }
        if (propName === 'selMiddle') {
          value = propValue - height! / 2
          EventBus.$emit('updasteGroupSize', 'Top', value, groupIndex)
        }
      }
    }
  }
  centreInForm (value: string) {
    let divstyle: Array<IGroupStyle> = []
    const mainContainer = this.selectedControls[this.userFormId].container[0]
    const usrFrmData = this.userformData[this.userFormId]
    const ctrlProp = usrFrmData[mainContainer].properties
    if (value === 'horizontal') {
      const selCenter = ctrlProp.Left! + ctrlProp.Width! / 2
      this.updatePropVal('selCenter', selCenter)
    } else if (value === 'vertical') {
      const selMiddle = ctrlProp.Top! + ctrlProp.Height! / 2
      this.updatePropVal('selMiddle', selMiddle)
    }
  }
  arrangeButton (type: string) {
    const usrFrmData = this.userformData[this.userFormId]
    const ctrlSel = this.selectedControls[this.userFormId].selected
    let ctrlContainer = this.selectedControls[this.userFormId].container[0]
    ctrlContainer =
      usrFrmData[ctrlContainer].type === 'Page'
        ? this.selectedControls[this.userFormId].container[1]
        : ctrlContainer
    const buttonArray = []
    for (let index = 0; index < ctrlSel.length; index++) {
      if (!ctrlSel[index].startsWith('group')) {
        const controlprop = usrFrmData[ctrlSel[index]]
        if (controlprop.type === 'CommandButton') {
          buttonArray.push(ctrlSel[index])
        }
      }
    }
    if (type === 'bottom') {
      buttonArray.sort((a, b) => {
        return usrFrmData[a].properties.Left! - usrFrmData[b].properties.Left!
      })
    } else if (type === 'right') {
      buttonArray.sort((a, b) => {
        return usrFrmData[a].properties.Top! - usrFrmData[b].properties.Top!
      })
    }
    const containerProp = usrFrmData[ctrlContainer].properties
    let value: number = 0
    const containerHeight = (usrFrmData[ctrlContainer].type === 'Userform')
      ? 47 : usrFrmData[ctrlContainer].type === 'Frame' ? 27
        : usrFrmData[ctrlContainer].type === 'MultiPage' ? 40 : 0
    const containerWidth = 20
    if (type === 'bottom') {
      value = (containerProp.Height! - containerHeight) - usrFrmData[buttonArray[0]].properties.Height!
      this.updateControlProperty('Top', value, buttonArray[0])
      this.updateControlProperty('Left', 30, buttonArray[0])
    } else if (type === 'right') {
      value = (containerProp.Width! - containerWidth) - usrFrmData[buttonArray[0]].properties.Width!
      this.updateControlProperty('Left', value, buttonArray[0])
      this.updateControlProperty('Top', 20, buttonArray[0])
    }

    for (let index = 1; index < buttonArray.length; index++) {
      const prevCtrlProp = usrFrmData[buttonArray[index - 1]].properties
      const ctrlProp = usrFrmData[buttonArray[index]].properties
      if (type === 'bottom') {
        let propValue = prevCtrlProp.Left! + prevCtrlProp.Width! + 10
        value =
          (containerProp.Height! - containerHeight) -
          usrFrmData[buttonArray[index]].properties.Height!
        if (propValue + ctrlProp.Width! <= containerProp.Width! - containerWidth) {
          this.updateControlProperty('Left', propValue, buttonArray[index])
          this.updateControlProperty('Top', value, buttonArray[index])
        } else {
          propValue = containerProp.Width! - containerWidth - ctrlProp.Width!
          this.updateControlProperty('Left', propValue, buttonArray[index])
          this.updateControlProperty('Top', value, buttonArray[index])
        }
      } else if (type === 'right') {
        let propValue = prevCtrlProp.Top! + prevCtrlProp.Height! + 10
        value =
          (containerProp.Width! - containerWidth) -
          usrFrmData[buttonArray[index]].properties.Width!
        if (propValue + ctrlProp.Height! <= containerProp.Height! - (containerHeight)) {
          this.updateControlProperty('Top', propValue, buttonArray[index])
          this.updateControlProperty('Left', value, buttonArray[index])
        } else {
          propValue = containerProp.Height! - containerHeight - ctrlProp.Height!
          this.updateControlProperty('Top', propValue, buttonArray[index])
          this.updateControlProperty('Left', value, buttonArray[index])
        }
      }
    }
  }
  updateControlProperty (
    propertyName: keyof controlProperties,
    propertyValue: any,
    controlId: string
  ) {
    this.updateControl({
      userFormId: this.userFormId,
      controlId: controlId,
      propertyName: propertyName,
      value: propertyValue
    })
  }
  getdisableStyle (id: string) {
    let disabled: boolean = true
    const selected = this.selectedControls[this.userFormId].selected
    const selContainer = this.selectedControls[this.userFormId].container
    const userData = this.userformData[this.userFormId]
    if (!this.controlEditMode) {
      if (id === 'unGroup') {
        let groupId: boolean = false
        const selectedGroupArray = selected.filter(
          (val: string) => val.startsWith('group') && val
        )
        if (selectedGroupArray.length === 1 && selected.length === 1) {
          disabled = false
        }
      }
      if (id === 'group') {
        disabled = selected.length <= 1
      }
      if (id === 'sizeToGrid' || id === 'centreInForm') {
        disabled = !(selected.length >= 1 && selected[0] !== selContainer[0])
      }
      if (id === 'sizeToFit') {
        const selSelected = []
        for (const control of this.selectedControls[this.userFormId].selected) {
          if (!control.startsWith('group')) {
            const type = this.userformData[this.userFormId][control].type
            if (type !== 'MultiPage' && type !== 'Frame' && type !== 'ListBox' && type !== 'Page' && type !== 'TabStrip' && type !== 'Userform') {
              selSelected.push(control)
            }
          }
        }
        disabled = !(selSelected.length >= 1)
      }
      if (id === 'order') {
        disabled = !(selected.length >= 1 && userData[selContainer[0]].controls.length >= 2)
      }
      if (id === 'makeEqual') {
        disabled = !(selected.length >= 3)
      }
      if (id === 'incDecspacing' || id === 'removeSpace') {
        disabled = !(selected.length >= 2)
      }
      if (id === 'arrangeButton') {
        const buttonArray = []
        for (let index = 0; index < selected.length; index++) {
          if (!selected[index].startsWith('group')) {
            const controlprop = userData[selected[index]]
            if (controlprop.type === 'CommandButton') {
              buttonArray.push(selected[index])
            }
          }
        }
        disabled = !(buttonArray.length >= 1)
      }
    }
    return disabled
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
      const nextControlType = userData[nextSelectedControl].type
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
  sendBackward () {
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
      const nextControlType = userData[nextSelectedControl].type
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
}
</script>

<style scoped>
.body {
  width: 100%;
  box-shadow: box-sizing;
}
.tablink {
  background-color: rgba(240, 234, 234, 0.877);
  color: rgb(17, 17, 17);
  padding: 5px;
  cursor: pointer;
  font-size: 12px;
  border: none;
  float: left;
}
.sub-menu-li {
  display: grid;
  grid-template-columns: 25px 1fr;
}
.thirdrow {
  margin-top: 5px;
}
.tablink:hover {
  background-color: #4dbce0;
}

.firstrow {
  font-size: 15px;
}
.secondrow {
  border: 1px transparent;
  padding: 5px;
  background-color: rgba(240, 234, 234, 0.877);
  height: 20px;
  display: flex;
}
.buttons {
  float: right;
  line-height: normal;
}
.min .max .close1 {
  width: 40px;
}
.close1:hover {
  background-color: red;
}
.fa {
  margin-left: 3px;
  margin-right: 3px;
}
.padding {
  padding-top: 3px;
}
.material-icons {
  size: 15px;
}
.material-float {
  float: left;
}
i:hover {
  background-color: #4dbce0;
  cursor: default;
}

.ui-titlebar {
  display: flex;
  width: 100%;
  height: 32px;
  background: #0072c6;
  user-select: none;
  cursor: default;
}
.ui-titleicon {
  flex-grow: 1;
  max-width: 32px;
  max-height: 32px;
}
.ui-titletext {
  flex-grow: 2;
  max-height: 32px;
  width: auto;
  font: 12px/32px "Segoe UI", Arial, sans-serif;
  color: #fff;
  text-indent: 10px;
}
.ui-titlecontrols {
  max-width: 144px;
  max-height: 32px;
  flex-grow: 1;
}
.ui-btn {
  margin: 0;
  width: 48px;
  height: 32px;
  border: 0;
  outline: 0;
  background: transparent;
}
.ui-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}
.ui-btn.close:hover {
  background: #e81123;
}
hr {
  margin: 0px;
}
.ui-btn svg path,
.ui-btn svg rect,
.ui-btn svg polygon {
  fill: #fff;
}
.ui-btn svg {
  width: 10px;
  height: 10px;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.tablink:hover .dropdown-content {
  display: block;
}
.dropdown {
  position: relative;
  display: inline-block;
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
.btn-style {
  border: 1px solid gray;
  border-radius: 5px;
  background-color: white;
  min-width: 50px;
  max-width: 112px;
  width: fit-content;
  height: fit-content;
  min-height: 20px;
  padding: 0px 5px 0px 5px;
  overflow: hidden;
  top: -3px;
  position: relative;
}
:focus {
  outline: none;
}
.menu-bar {
  background: rgba(240, 234, 234);
  line-height: 24px;
  cursor: context-menu;
  margin-left: 3px;
}

.menu-bar ul {
  display: inline-flex;
  list-style: none;
  margin: 0px;
}

.menu-bar ul > li {
  list-style: none;
  text-align: center;
  padding: 0px 6px;
  font-size: 12px;
}

.menu-bar ul li a {
  text-decoration: none;
  margin-left: -15px;
}
.menu-bar ul li a:visited {
  color: black;
}
.menu-bar ul {
  background-color: rgba(240, 234, 234);
  padding: 0px;
}

.active,
.menu-bar ul li:hover {
  background-color: white;
  z-index: 10;
}

.sub-menu-1 {
  display: none;
  box-shadow: 2px 2px rgba(0, 0, 0, 0.2);
}

.menu-bar ul li:hover .sub-menu-1 {
  display: block;
  position: absolute;
}

.sub-menu-1 ul li {
  text-align: left;
  border: 0.1px solid white;
  display: grid;
  grid-template-columns: 30px 150px;
  word-wrap: none;
}

.sub-menu-1 ul {
  display: grid;
  grid-template-columns: 1fr;
  background-color: white;
  width: 200px;
  padding: 0px;
  margin-left: -6px;
}

.sub-menu-1 ul li:hover {
  background-color: rgb(155, 215, 255);
  border-color: rgb(0, 153, 255);
}
</style>
