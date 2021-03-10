import { Component, Prop, Vue } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'
import { IupdateControl, IupdateControlExtraData } from '@/storeModules/fd/actions'

@Component({
  name: 'FDCommonMethod'
})
export default class FDCommonMethod extends Vue {
  @Prop({ required: true, type: String }) public readonly userFormId!: string
  @State((state) => state.fd.userformData) userformData!: userformData;
  @State((state) => state.fd.selectedControls) selectedControls!: fdState['selectedControls'];
  @Action('fd/updateControl') updateControl!: (payload: IupdateControl) => void;
  @Action('fd/updateControlExtraData') updateControlExtraData!: (payload: IupdateControlExtraData) => void;

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
  deleteTabIndex (id: string) {
    const userData = this.userformData[this.userFormId]
    const container = this.selectedControls[this.userFormId].container[0]
    const type = userData[id].type
    const tempIndex: number = type === 'FDImage' ? userData[id].extraDatas!.TabIndex! : userData[id].properties!.TabIndex!
    for (const key in userData[container].controls) {
      const ctrltype = userData[userData[container].controls[key]].type
      const controlData = userData[userData[container].controls[key]]
      const controlTabIndex = ctrltype === 'FDImage' ? controlData.extraDatas!.TabIndex! : controlData.properties!.TabIndex!
      if (controlTabIndex > tempIndex && controlTabIndex - 1 > -1) {
        if (ctrltype !== 'FDImage') {
          this.updateTabIndex(userData[container].controls[key], controlTabIndex - 1)
        } else {
          this.updateExtraDatas(userData[container].controls[key], 'TabIndex', controlTabIndex - 1)
        }
      }
    }
  }
  deleteZIndex (id: string) {
    const userData = this.userformData[this.userFormId]
    const container = this.selectedControls[this.userFormId].container[0]
    const tempIndex = userData[id].extraDatas!.zIndex!
    for (const key in userData[container].controls) {
      const controlZIndex = userData[userData[container].controls[key]].extraDatas!.zIndex!
      if (controlZIndex > tempIndex) {
        this.updateExtraDatas(userData[container].controls[key], 'zIndex', controlZIndex - 1)
      }
    }
  }
  swapZIndex (tempZIndex: number) {
    const userData = this.userformData[this.userFormId]
    const container = this.selectedControls[this.userFormId].container[0]
    const selected = this.selectedControls[this.userFormId].selected[0]
    const swapTabIndex = userData[selected].extraDatas!.zIndex!
    if (tempZIndex <= userData[container].controls.length && tempZIndex > 0) {
      const index = userData[container].controls.findIndex(
        (val) => userData[val].extraDatas!.zIndex === tempZIndex
      )
      this.updateExtraDatas(userData[container].controls[index], 'zIndex', swapTabIndex)
      this.updateExtraDatas(selected, 'zIndex', tempZIndex)
    }
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
  get getSelectedControlsDatas () {
    if (this.selectedControls[this.userFormId].selected.length > 0 && this.selectedControls[this.userFormId].container.length > 0) {
      if (this.selectedControls[this.userFormId].selected.length === 1 && !this.selectedControls[this.userFormId].selected[0].startsWith('group')) {
        return this.selectedControls[this.userFormId].selected
      } else {
        const filteredSelectedControls = []
        const controls = this.userformData[this.userFormId][this.selectedControls[this.userFormId].container[0]].controls
        const selControls = this.selectedControls[this.userFormId].selected
        for (let i = 0; i < selControls.length; i++) {
          if (selControls[i].startsWith('group')) {
            for (let j = 0; j < controls.length; j++) {
              if (this.userformData[this.userFormId][controls[j]].properties.GroupID === selControls[i]) {
                filteredSelectedControls.push(controls[j])
              }
            }
          } else {
            filteredSelectedControls.push(selControls[i])
          }
        }
        return filteredSelectedControls
      }
    }
  }
  getChildControl (mainSelect: string) {
    const containerList: string[] = []
    const findControlChild = (mainSelect: string) => {
      for (let i in this.userformData[this.userFormId]) {
        if (i === mainSelect) {
          const controlData = this.userformData[this.userFormId][i]
          if (controlData.controls && controlData.controls.length > 0) {
            for (let j of controlData.controls) {
              containerList.push(j)
              findControlChild(j)
            }
          }
        }
      }
    }
    findControlChild(mainSelect)
    return containerList
  }
}
