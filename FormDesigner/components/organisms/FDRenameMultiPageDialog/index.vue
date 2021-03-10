<template>
  <div id="popup1" class="overlay" :style="tabOrderStyleObj"
  @keydown.enter="updateChanges"
    @keydown.esc="closeDialog()"
    tabindex="0"
    ref="renameDialogRef">
    <div class="rename-div-1 popup" :style="tabOrderDialogInitialStyle">
      <div class="remane-header-div" @mousedown.stop="dragTabOrderDialog">
        Rename
          <button class="ui-btn close" @click="closeDialog">
            <svg viewBox="0 0 10 10">
              <polygon
                points="10.2,0.7 9.5,0 5.1,4.4 0.7,0 0,0.7 4.4,5.1 0,9.5 0.7,10.2 5.1,5.8 9.5,10.2 10.2,9.5 5.8,5.1"
              />
            </svg>
          </button>
      </div>
      <hr class="hr" />
      <br />
      <div class="wrapper">
        <span>Caption:</span>
        <div>
          <input
            name="Caption"
            type="text"
            class="btn-outline"
            @input="handleRename"
            :value="selectedTabData.Caption"
          />
        </div>
        <span>Accelerator Key:</span>
        <div>
          <input
            name="Accelerator"
            class="btn-outline inputClass"
            type="text"
            @input="updateAccelerator"
            :value="selectedTabData.Accelerator"
          />
        </div>
        <span>Control Tip Text:</span>
        <div>
          <input
            name='ToolTip'
            class="btn-outline"
            type="text"
            @input="handleTip"
            :value="selectedTabData.ToolTip"
          />
        </div>
        <div></div>
        <div>
          <button  class="inputTwoClass"
            @click="updateChanges()">OK</button>
          <button
            class="inputTwoClass cancelButtonStyle"
            @click="closeDialog"
          >Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IupdateControlExtraData, IupdateControl } from '@/storeModules/fd/actions'
import { Component, Vue, Ref, Emit, Mixins } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import { EventBus } from '@/FormDesigner/event-bus'
import FdDialogDragVue from '@/api/abstract/FormDesigner/FdDialogDragVue'

@Component({
  name: 'FDRenameMultiPageDialog'
})
export default class FDRenameMultiPageDialog extends Mixins(FdDialogDragVue) {
  userFormId: string;
  controlId: string;
  @Action('fd/updateControlExtraData') updateControlExtraData!: (
    payload: IupdateControlExtraData
  ) => void;
  @Action('fd/updateControl') updateControl!: (payload: IupdateControl) => void;
  @State((state) => state.fd.userformData) userformData!: userformData;
  @Ref('renameDialogRef') renameDialogRef!: HTMLDivElement;
  tabOrderList: tabsItems[];
  selectedTabData: tabsItems = {
    Name: '',
    Caption: '',
    ToolTip: '',
    Accelerator: ''
  };
  controlType: string = ''
  handleRename (e: KeyboardEvent) {
    if (e.target instanceof HTMLInputElement) {
      this.selectedTabData.Caption = e.target.value
    } else {
      throw new Error('Expected HTMLInputElement but found different element')
    }
  }

  updateAccelerator (e: KeyboardEvent) {
    if (e.target instanceof HTMLInputElement) {
      this.selectedTabData.Accelerator = e.target.value
    } else {
      throw new Error('Expected HTMLInputElement but found different element')
    }
  }
  handleTip (e: KeyboardEvent) {
    if (e.target instanceof HTMLInputElement) {
      this.selectedTabData.ToolTip = e.target.value
    } else {
      throw new Error('Expected HTMLInputElement but found different element')
    }
  }
  updateChanges () {
    if (this.selectedTabData.Accelerator) {
      this.selectedTabData.Accelerator = this.selectedTabData.Accelerator[0]
    } else {
      console.error('Accelerator value empty')
    }
    if (this.controlType === 'Page') {
      this.updateControl({
        userFormId: this.userFormId,
        controlId: this.controlId,
        propertyName: 'Caption',
        value: this.selectedTabData.Caption
      })
      this.updateControl({
        userFormId: this.userFormId,
        controlId: this.controlId,
        propertyName: 'Accelerator',
        value: this.selectedTabData.Accelerator
      })
      this.updateControl({
        userFormId: this.userFormId,
        controlId: this.controlId,
        propertyName: 'ControlTipText',
        value: this.selectedTabData.ToolTip
      })
    } else {
      this.updateControlExtraData({
        userFormId: this.userFormId,
        controlId: this.controlId,
        propertyName: 'Tabs',
        value: this.tabOrderList
      })
    }
    // this.isTabOrderOpen = false
    this.closeDialog()
  }
  @Emit('getFocusElement')
  getFocusElement (val: boolean) {
    return { val: val, dialogType: 'renameDialog' }
  }
  created () {
    EventBus.$on(
      'renamePage',
      (userFormId: string, controlId: string, selectedTab: number, type: string) => {
        this.getFocusElement(true)
        this.controlType = type
        if (this.controlType === 'Page') {
          const selectedPageData = this.userformData[userFormId][controlId]
          this.selectedTabData.Name = selectedPageData.properties.Name!
          this.selectedTabData.Caption = selectedPageData.properties.Caption!
          this.selectedTabData.ToolTip = selectedPageData.properties.ControlTipText!
          this.selectedTabData.Accelerator = selectedPageData.properties.Accelerator!
        } else {
          const tabOrderControlData = this.userformData[userFormId][controlId]
            .extraDatas!.Tabs!
          if (tabOrderControlData.length > 0) {
            this.tabOrderList = JSON.parse(JSON.stringify(tabOrderControlData))
            this.selectedTabData = this.tabOrderList[selectedTab]
          }
        }
        this.isTabOrderOpen = true
        this.userFormId = userFormId
        this.controlId = controlId
        Vue.nextTick(() => {
          this.renameDialogRef.focus()
        })
      }
    )
  }
  destroyed () {
    EventBus.$off('renamePage')
  }
  closeDialog () {
    this.isTabOrderOpen = false
    this.getFocusElement(false)
  }
}
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-size: cover;
  height: 100vh;
}

h1 {
  text-align: center;
  font-family: Tahoma, Arial, sans-serif;
  color: #06d85f;
  margin: 80px 0;
}

.span-style {
  position: absolute;
  left: 6px;
  top: 6px;
}

.box {
  background: rgba(255, 255, 255, 0.2);
  text-align: right;
}

.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  visibility: hidden;
  opacity: 0;
  z-index: 110;
}
.overlay:target {
  visibility: visible;
  opacity: 1;
}

.popup {
  margin: 70px auto;
  /* padding: 20px; */
  background: #fff;
  border-radius: 5px;
  width: 30%;
  position: relative;
}

.popup h2 {
  margin-top: 0;
  color: #333;
  font-family: Tahoma, Arial, sans-serif;
}
.popup .close {
  position: absolute;
  /* top: 20px; */
  right: 0px;
  /* font-size: 30px; */
  font-weight: bold;
  text-decoration: none;
  color: #333;
}
.popup .close:hover {
  color: #06d85f;
}
.popup .content {
  max-height: 30%;
  overflow: auto;
}

@media screen and (max-width: 700px) {
  .box {
    width: 70%;
  }
  .popup {
    width: 70%;
  }
}
.wrapper {
  display: grid;
  grid-template-columns: 50% 50%;
  /* grid-gap: 1em; */
  grid-row-gap: 1em;
}

.rename-div-1 {
  border: 1px solid gray;
  height: 180px;
  width: 270px;
  background-color: rgb(238, 238, 238);
}

.remane-header-div {
  height: 20px;
  background-color: white;
  font-size: 13px;
  padding-left: 5px;
}

.wrapper > span {
  font-size: 12px;
  font-family: courier;
  padding-left: 5px;
}

.wrapper > div > input {
  width: 120px;
  border: none;
  box-shadow: -1px -1px;
}

.ui-btn {
  margin: 0;
  width: 28px;
  height: 21px;
  border: 0;
  float: right;
  outline: 0;
}
.ui-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}
.ui-btn.close {
  background: white;
}
.ui-btn:hover {
  background: #e81123;
  color: white;
}
.ui-btn svg path,
.ui-btn svg rect,
.ui-btn svg polygon {
  fill: white;
}
.ui-btn svg {
  width: 10px;
  height: 10px;
  stroke: gray;
}
.ui-btn svg:hover {
  width: 10px;
  height: 10px;
  stroke: white;
}
.btn-outline {
  outline: none;
}

.hr {
  margin: 1px;
}
.inputClass {
  width: 10% !important;
}
.inputTwoClass {
  width: 55px !important;
  height: 23px;
  font-family: "Candara";
  font-weight: bold;
  font-size: 13px;
  box-shadow: 1px 1px;
  border-top-color: rgb(238, 238, 238);
  border-bottom-color: rgb(238, 238, 238);
  border-left-color: rgb(238, 238, 238);
  border-right-color: rgb(238, 238, 238);
  white-space: pre;
}
.inputTwoClass:focus{
  outline:1px solid black;
}
.cancelButtonStyle {
  margin-left: 10px;
}
</style>
