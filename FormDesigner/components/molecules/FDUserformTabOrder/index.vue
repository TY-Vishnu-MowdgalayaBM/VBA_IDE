<template>
  <div id="popup1" class="overlay" :style="tabOrderStyleObj"
  tabindex="0"
  @keydown.enter="updateControlData"
  @keydown.esc="closeDialog()"
  >
    <div class="outer-taborder-div popup" :style="tabOrderDialogInitialStyle">
      <div class="taborder-header-div" @mousedown.stop="dragTabOrderDialog">
        <div class="taborder-header-innerdiv">
          <a>{{controlType === 'MultiPage' ? 'Page Order' : 'Tab Order'}}</a>
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
          <span class="inner-header">{{controlType === 'MultiPage' ? 'Page Order' : 'Tab Order'}}</span>
          <div class="frame">
            <div v-for="(value, index) in tabOrderList" :key="value.controlId">
              <button
                class="inside-frame"
                :class="{ 'active-item': currentIndex === index }"
                @click="selectedTab(index)"
              >
                {{ value.name }}
              </button>
            </div>
          </div>
        </div>
        <div class="wrapper2">
          <div class="wrapper2Div1"></div>
          <div class="wrapper21">
            <button class="taborder-buttons" @click="updateControlData">
              OK
            </button>
            <button class="taborder-buttons" @click="closeDialog">
              Cancel
            </button>
          </div>
          <div class="wrapper2Div2"></div>
          <div class="wrapper21">
            <button :disabled="buttonDisabled" class="taborder-buttons" @click="moveControlUp()">
              Move Up
            </button>
            <button :disabled="buttonDisabled" class="taborder-buttons" @click="moveControlDown()">
              Move Down
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Emit } from 'vue-property-decorator'
import { EventBus } from '@/FormDesigner/event-bus'
import { State, Action } from 'vuex-class'
import { IupdateControl, IsetChildControls } from '@/storeModules/fd/actions'
import FdDialogDragVue, {
  localTabOrderItem
} from '@/api/abstract/FormDesigner/FdDialogDragVue'

@Component({
  name: 'FDUserformTabOrder'
})
export default class FDUserformTabOrder extends FdDialogDragVue {
  @State((state) => state.fd.userformData) userformData!: userformData;
  @Action('fd/updateControl') updateControl!: (payload: IupdateControl) => void;
  @Action('fd/setChildControls') setChildControls!: (
    payload: IsetChildControls
  ) => void;
  isTabOrderOpen: boolean = false;
  userFormId: string = '';
  currentIndex: number = -1;
  tabOrderList: localTabOrderItem[] = [];
  controlType: string = ''
  containerId: string = ''
  selectedPageID: string = ''
  get buttonDisabled () {
    return !(this.tabOrderList.length > 1)
  }
  updateControlData () {
    const controlNum = this.tabOrderList.length
    let propertyName: keyof controlProperties = this.controlType === 'MultiPage' ? 'Index' : 'TabIndex'
    const controlsArray = []
    for (let tabIndex = 0; controlNum > tabIndex; tabIndex++) {
      if (this.controlType === 'MultiPage') {
        controlsArray.push(this.tabOrderList[tabIndex].controlId)
      }
      this.updateControl({
        userFormId: this.userFormId,
        controlId: this.tabOrderList[tabIndex].controlId,
        propertyName: propertyName,
        value: tabIndex
      })
    }
    if (this.controlType === 'MultiPage') {
      this.setChildControls({
        userFormId: this.userFormId,
        containerId: this.containerId,
        targetControls: controlsArray
      })
      if (this.selectedPageID) {
        const index = controlsArray.indexOf(this.selectedPageID)
        this.updateControl({
          userFormId: this.userFormId,
          controlId: this.containerId,
          propertyName: 'Value',
          value: index
        })
      }
    }
    this.closeDialog()
  }
  closeDialog () {
    this.selectedPageID = ''
    this.isTabOrderOpen = false
    this.getFocusElement(false)
  }
  @Emit('getFocusElement')
  getFocusElement (val: boolean) {
    return { val: val, dialogType: 'userformTaborder' }
  }
  created () {
    EventBus.$on(
      'userFormTabOrder',
      (userFormId: string, controlId: string, type: string, selectedPageValue: number, selectedPageID: string) => {
        this.getFocusElement(true)
        this.controlType = type
        const tabOrderControlData = JSON.parse(JSON.stringify(this.userformData[userFormId][controlId]))
        const tabOrderControls = tabOrderControlData.controls.filter((val: string) => {
          return (this.userformData[userFormId][val].type !== 'FDImage')
        })
        this.tabOrderList = Array(tabOrderControls.length)

        if (tabOrderControls.length > 0) {
          for (let control of tabOrderControls) {
            const targetData = this.userformData[userFormId][control]
            if (targetData) {
              let targetTabIndex
              let targetTabName
              if (this.controlType === 'MultiPage') {
                targetTabIndex = targetData.properties.Index
                targetTabName = targetData.properties.Caption
              } else {
                targetTabIndex = targetData.properties.TabIndex
                targetTabName = targetData.properties.Name
              }
              if (targetTabIndex !== undefined && targetTabName !== undefined) {
                this.tabOrderList[targetTabIndex] = {
                  controlId: control,
                  name: targetTabName
                }
              }
            }
          }
          this.currentIndex = 0
        }
        this.isTabOrderOpen = true
        this.userFormId = userFormId
        this.containerId = controlId
        if (selectedPageValue >= 0) {
          this.selectedPageID = selectedPageID
        }
      }
    )
  }
  destroyed () {
    EventBus.$off('userFormTabOrder')
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
  right: 0px;
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
.wrapper2Div1 {
  height: 3px;
}
.wrapper2Div2 {
  height: 35px;
}
</style>
