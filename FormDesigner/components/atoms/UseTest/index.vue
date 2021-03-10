<template>
  <div class='test'>
    Name : {{ propControlData.properties.Name }}
    <br/>
    ID : {{ propControlData.properties.ID }}
    <br/>
    Selected : {{selectedControlTest}}
    <br/>
    <button @click="onAdd">add</button>
    <button @click="onUpdate">update</button>
    <button @click="onDelete">delete</button>
    <button @click="onSelect">select</button>
    <use-test v-for="(key, index) in controls"
      :key="index"
      :controlId="key"
      :userFormId="userFormId"/>
  </div>
</template>

<script lang="ts">
import FdControlVue from '@/api/abstract/FormDesigner/FdControlVue'
import { Component, Prop } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import { IaddControl, IupdateControl, IdeleteControl, IselectControl, IfdEmitAction, IideEmitAction } from '@/storeModules/fd/actions'
@Component({
  name: 'UseTest'
})
export default class UseTest extends FdControlVue {
  $parent!: UseTest | Vue
  @Action('fd/fdActionSample') fdActionSample!: (payload: any) => void
  @Action('fd/addControl') addControl!: (payload: IaddControl) => void
  @Action('fd/updateControl') updateControl!: (payload: IupdateControl) => void
  @Action('fd/deleteControl') deleteControl!: (payload: IdeleteControl) => void
  @Action('fd/selectControl') selectControl!: (payload: IselectControl) => void
  @Action('fd/fdEmitAction') fdEmitAction!: (payload: IfdEmitAction) => void
  @Action('fd/ideEmitAction') ideEmitAction!: (payload: IideEmitAction) => void
  @State(state => state.fd.userformData) userformData!: userformData
  @State(state => state.fd.selectedControls) selectedControlTest!: selectedControls
  @Prop({ required: true, type: String }) public controlId! : string
  @Prop({ required: true, type: String }) public userFormId! : string

  onAdd () {
    const propData = this.propControlData.properties
    const id = propData.ID as string + 1
    const Name = propData.Name ? propData.Name : ''

    const addTarget = this
    this.addControl({
      userFormId: this.userFormId,
      controlId: this.controlId,
      addId: id,
      item: { properties: { Name: Name, ID: id }, controls: [], extraDatas: null, type: 'Label' }
    })
  }

  onUpdate () {
    this.updateControl({
      userFormId: this.userFormId,
      controlId: this.controlId,
      propertyName: 'Name',
      value: 'update'
    })
  }

  onDelete () {
    if (this.$parent instanceof UseTest) {
      this.deleteControl({
        userFormId: this.userFormId,
        parentId: this.$parent.controlId,
        targetId: this.controlId
      })
    }
  }

  onSelect () {
    this.selectControl({
      userFormId: this.userFormId,
      select: { container: [this.userFormId], selected: [this.controlId] }
    })
  }

  get propControlData () :controlData {
    return this.userformData[this.userFormId][this.controlId]
  }

  get controls () {
    return this.propControlData.controls
  }
}
</script>

<style lang="scss">
.test {
  border: 1px solid blue;
  padding-left: 10px;
}
</style>
