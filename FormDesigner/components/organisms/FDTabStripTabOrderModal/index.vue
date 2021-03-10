<template>
  <div id="popup1" class="overlay" :style="tabOrderStyleObj"
  tabindex="0"
  @keydown.enter="updateControlData"
  @keydown.esc="closeDialog()">
    <div class="outer-taborder-div popup" :style="tabOrderDialogInitialStyle">
      <div class="taborder-header-div" @mousedown.stop="dragTabOrderDialog">
        <div class="taborder-header-innerdiv">
          <a>Page Order</a>
        </div>
        <button class="ui-btn close" @click="closeDialog">
          <svg viewBox="0 0 10 10">
            <polygon
              points="10.2,0.7 9.5,0 5.1,4.4 0.7,0 0,0.7 4.4,5.1 0,9.5 0.7,10.2 5.1,5.8 9.5,10.2 10.2,9.5 5.8,5.1"
            />
          </svg>
        </button>
      </div>
      <div class="wrapper">
        <div class="wrapper1">
          <span class="inner-header">Page Order</span>
          <div class="frame">
            <div v-for="(value, index) in tabOrderList" :key="value.Name">
              <button
                class="inside-frame"
                :class="{ 'active-item': currentIndex === index }"
                @click="selectedTab(index)"
              >
                {{ value.Caption }}
              </button>
            </div>
          </div>
        </div>
        <div class="wrapper2">
          <div class="wrapperDiv1"></div>
          <div class="wrapper21">
            <button class="taborder-buttons" @click="updateControlData">
              OK
            </button>
            <button class="taborder-buttons" @click="closeDialog">
              Cancel
            </button>
          </div>
          <div class="wrapperDiv2"></div>
          <div class="wrapper21">
            <button class="taborder-buttons" @click="moveControlUp()">
              Move Up
            </button>
            <button class="taborder-buttons" @click="moveControlDown()">
              Move Down
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { EventBus } from '@/FormDesigner/event-bus'
import { State, Action } from 'vuex-class'
import { IupdateControlExtraData, IupdateControl } from '@/storeModules/fd/actions'
import FdDialogDragVue from '@/api/abstract/FormDesigner/FdDialogDragVue'

@Component({
  name: 'TabStripTabOrderModal'
})
export default class TabStripTabOrderModal extends FdDialogDragVue {
  @State((state) => state.fd.userformData) userformData!: userformData;
  @Action('fd/updateControl') updateControl!: (payload: IupdateControl) => void;
  @Action('fd/updateControlExtraData') updateControlExtraData!: (
    payload: IupdateControlExtraData
  ) => void;

  isTabOrderOpen: boolean = false;
  userFormId: string = '';
  controlId: string = '';
  currentIndex: number = -1;
  tabOrderList: tabsItems[] = [];
  selectedTabData: tabsItems = {
    Name: '',
    Caption: '',
    ToolTip: '',
    Accelerator: ''
  }

  updateControlData () {
    this.updateControlExtraData({
      userFormId: this.userFormId,
      controlId: this.controlId,
      propertyName: 'Tabs',
      value: this.tabOrderList
    })
    if (this.selectedTabData.Name) {
      const index = this.tabOrderList.findIndex(data => {
        return data.Name === this.selectedTabData.Name
      })
      this.updateControl({
        userFormId: this.userFormId,
        controlId: this.controlId,
        propertyName: 'Value',
        value: index
      })
    }
    this.closeDialog()
  }
  closeDialog () {
    this.selectedTabData = {
      Name: '',
      Caption: '',
      ToolTip: '',
      Accelerator: ''
    }
    this.isTabOrderOpen = false
    this.getFocusElement(false)
  }
  @Emit('getFocusElement')
  getFocusElement (val: boolean) {
    return { val: val, dialogType: 'tabstripTabOrder' }
  }

  created () {
    EventBus.$on(
      'tabStripTabOrder',
      (userFormId: string, controlId: string, type: string, selectedTabIndex: number) => {
        this.getFocusElement(true)

        const tabOrderControlData = this.userformData[userFormId][controlId]
          .extraDatas!.Tabs!

        if (tabOrderControlData.length > 0) {
          this.tabOrderList = JSON.parse(JSON.stringify(tabOrderControlData))
          this.currentIndex = 0
        } else {
          console.error('Empty Tab data')
        }
        this.isTabOrderOpen = true
        this.userFormId = userFormId
        this.controlId = controlId
        if (selectedTabIndex >= 0) {
          this.selectedTabData = { ...tabOrderControlData[selectedTabIndex] }
        }
      }
    )
  }
  destroyed () {
    EventBus.$off('tabStripTabOrder')
  }
}
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  /*   background: url(http://www.shukatsu-note.com/wp-content/uploads/2014/12/computer-564136_1280.jpg) no-repeat; */
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

.button {
  font-size: 1em;
  padding: 10px;
  color: #fff;
  border: 2px solid #06d85f;
  border-radius: 20px/50px;
  text-decoration: none;
  cursor: pointer;
}
.button:hover {
  background: #06d85f;
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
  grid-template-columns: 65% 35%;
  padding-left: 10px;
  padding-top: 22px;
  grid-row-gap: 1em;
  grid-column-gap: 1em;
  margin-bottom: 2em;
}
.wrapper1 {
  grid-gap: 1em;
}
.wrapper2 {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1em;
  grid-column-gap: 3em;
  height: 16px;
}
.wrapper21 {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0.5em;
  height: 16px;
}
.frame {
  width: 200px;
  height: 150px;
  background-color: white;
  box-shadow: -1px -1px gray;
  overflow-y: auto;
  overflow-x: hidden;
}
.inside-frame {
  /* border: 1px solid black; */
  border: none;
  background-color: white;
  text-align: left;
  outline: none;
  width: 100%;
  height: 14px;
  font-family: "SESimplex";
  font-weight: 500;
  font-size: 11px;
  padding-left: 2px;
}
.active-item {
  background-color: rgb(2, 84, 207);
  color: white;
}
.taborder-header-div {
  display: grid;
  grid-template-columns: 90% 10%;
  height: 25px;
  background-color: white;
  font-size: 13px;
}
.taborder-header-innerdiv {
  padding-left: 7px;
  padding-top: 6px;
}
.outer-taborder-div {
  border: 0.3px solid gray;
  height: 235px;
  width: 330px;
  background-color: rgb(238, 238, 238);
}
.inner-header {
  font-family: "SESimplex";
  font-weight: 500;
  font-size: 12px;
}
.taborder-buttons {
  width: 90px;
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
.taborder-buttons:focus{
  outline:1px solid black;
}
.ui-btn {
  /* margin: 2px; */
  margin: 0;
  width: 33px;
  height: 25px;
  border: 0;
  outline: 0;
  background: transparent;
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
.wrapperDiv1 {
  height: 3px;
}
.wrapperDiv2 {
  height: 35px;
}
</style>
