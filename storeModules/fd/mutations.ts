import { MutationTree } from 'vuex'
import { checkPropertyValue } from './checkValidation'
import Vue from 'vue'

type IMchangeToolBoxSelect = string

interface IMaddControl {
  userFormId: string
  controlId: string
  addId: string
  item: controlData
}
interface IMaddUserform {
  target: FdControlVue;
  key: string;
  value: any;
}

interface IMupdateControl {
  userFormId: string
  controlId: string
  propertyName: keyof controlProperties
  value: any
}

interface IMupdateControlExtraData {
  userFormId: string
  controlId: string
  propertyName: keyof extraDatas;
  value: any;
}

interface IMupdateUserform {
  userFormId: string
  controlId: string
  propertyName: keyof controlProperties
  value: any
}

interface IMdeleteControl {
  userFormId: string
  parentId: string
  targetId: string
}

/* set child controls on data model */
interface IMsetChildControls {
  userFormId: string
  containerId: string
  targetControls: string[]
}

interface IMaddChildControls {
  userFormId: string
  containerId: string
  targetControls: string[]
}

// interface IMselectControl extends selectedControls {}
interface IMselectControl {
  userFormId: string
  select: selectedControls
}
interface IMupdateGroup {
  userFormId: string
  groupArray: string[]
}

interface IMfdEmitAction {
  actionId: string;
  actionArg: any;
}

interface IMupdateCopyControlList{
  userFormId: string
  parentId: string
  targetId: Array<string>
  type: string
}
interface IMideEmitAction {
  actionId: string;
  actionArg: any;
}

export type FdMutations<S = fdState> = {
  addUserform(state: S, payload: IMaddUserform): void;
  addControl(state: S, payload: IMaddControl): void;
  addCopiedControl(state: S, payload: IMaddControl): void;
  updateControl(state: S, payload: IMupdateControl): void;
  updateControlExtraData(state: S, payload: IMupdateControlExtraData): void;
  deleteControl(state: S, payload: IMdeleteControl): void;
  deleteCopiedControl(state: S, payload: IMdeleteControl): void;
  setChildControls(state: S, payload: IMsetChildControls): void;
  addChildControls(state: S, payload: IMaddChildControls): void;
  selectControl(state: S, payload: IMselectControl): void;
  fdEmitAction(state: S, payload: IMfdEmitAction): void;
  ideEmitAction(state: S, payload: IMideEmitAction): void;
  updateUserFormProp(state: S, payload: IMupdateUserform): void;
  updateCopyControlList(state: S, payload: IMupdateCopyControlList): void;
  changeToolBoxSelect(context: S, payload: IMchangeToolBoxSelect): void
  updateGroup(context: S, payload: IMupdateGroup): void
  changeRunMode(context: S, payload: boolean): void
};

const mutations: MutationTree<fdState> & FdMutations = {
  fdActionSample (state, payload) {},
  addControl (state, payload) {
    const userFormData = state.userformData[payload.userFormId]
    const targetData = userFormData[payload.controlId]
    const targetDataControls = [...targetData.controls]
    if (Object.keys(userFormData).includes(payload.addId) === false) {
      targetDataControls.push(payload.addId)
      targetData.controls = targetDataControls
      Vue.set(userFormData, payload.addId, payload.item)
    } else {
      console.warn('duplicated control Id: ', payload.addId)
    }
  },
  addCopiedControl (state, payload) {
    const userFormData = state.copiedControl[payload.userFormId]
    const targetData = userFormData[payload.controlId]
    const targetDataControls = [...targetData.controls]
    if (Object.keys(userFormData).includes(payload.addId) === false) {
      targetDataControls.push(payload.addId)
      targetData.controls = targetDataControls
      Vue.set(userFormData, payload.addId, payload.item)
    } else {
      console.warn('duplicated control Id: ', payload.addId)
    }
  },

  addUserform (state, payload) {
    const targetData = payload.target.propControlData
    Vue.set(targetData, payload.key, payload.value)
    /*  const targetData = payload.target.propControlData
    targetData.controls.push(payload.key) */
  },
  updateControl (state, payload) {
    const userFormData = state.userformData[payload.userFormId]
    const targetData = userFormData[payload.controlId]
    const propName = payload.propertyName
    const setValue = payload.value
    if (propName && targetData.properties) {
      if (checkPropertyValue(propName, setValue)) {
        if (propName.match(/font*/i)) {
          if (payload.propertyName === 'Font') {
            Vue.set(targetData.properties, payload.propertyName, payload.value)
          } else {
          // @ts-ignore
            targetData.properties['Font'][propName] = setValue
          }
        } else {
          // @ts-ignore
          targetData.properties[propName] = setValue
        }
      } else {
        throw new Error(`Unable to set the ${propName} property. The Value is ${setValue}`)
      }
    }
  },
  updateControlExtraData (state, payload) {
    if (payload.userFormId && payload.controlId) {
      const userFormData = state.userformData[payload.userFormId]
      const targetData = userFormData[payload.controlId]
      if (payload.propertyName && targetData.extraDatas) {
        targetData.extraDatas[payload.propertyName] = payload.value
      }
    }
  },
  updateUserFormProp (state, payload) {
    if (payload.userFormId && payload.controlId) {
      const userFormData = state.userformData[payload.userFormId]
      const targetData = userFormData[payload.controlId]
      if (payload.propertyName && targetData.properties) {
        // @ts-ignore
        targetData.properties[payload.propertyName] = payload.value
      }
    }
  },
  deleteControl (state, payload) {
    const userFormData = state.userformData[payload.userFormId]
    const parentData = userFormData[payload.parentId]
    const selectedControl = state.selectedControls.selected
    const deleteAll = function (daTarget: string) {
      const daTargetControls = userFormData[daTarget].controls
      if (daTargetControls.length > 0) {
        for (let i = 0, limit = daTargetControls.length; i < limit; i++) {
          deleteAll(daTargetControls[i])
          delete userFormData[daTargetControls[i]]
        }
      }
    }
    for (let i = 0, limit = parentData.controls.length; i < limit; i++) {
      if (payload.targetId === parentData.controls[i]) {
        deleteAll(payload.targetId)
        parentData.controls.splice(i, 1)
        delete userFormData[payload.targetId]
      }
    }
  },
  deleteCopiedControl (state, payload) {
    const userFormData = state.copiedControl[payload.userFormId]
    const parentData = userFormData[payload.parentId]
    const deleteAll = function (daTarget: string) {
      const daTargetControls = userFormData[daTarget].controls
      if (daTargetControls.length > 0) {
        for (let i = 0, limit = daTargetControls.length; i < limit; i++) {
          deleteAll(daTargetControls[i])
          delete userFormData[daTargetControls[i]]
        }
      }
    }
    for (let i = 0, limit = parentData.controls.length; i < limit; i++) {
      if (payload.targetId === parentData.controls[i]) {
        deleteAll(payload.targetId)
        parentData.controls.splice(i, 1)
        delete userFormData[payload.targetId]
      }
    }
  },
  setChildControls (state, payload) {
    const userFormData = state.userformData[payload.userFormId]
    userFormData[payload.containerId].controls = payload.targetControls
  },
  addChildControls (state, payload) {
    const userFormData = state.userformData[payload.userFormId]
    const containerData = userFormData[payload.containerId]
    containerData.controls = containerData.controls.concat(payload.targetControls)
  },
  updateCopyControlList (state, payload) {
    state.copyControlList.userFormId = payload.userFormId
    state.copyControlList.parentId = payload.parentId
    state.copyControlList.targetId = payload.targetId
    state.copyControlList.type = payload.type
  },
  /**
   * case 1: normal select
   * case 2: ctrl select
   * case 3: change main
   * case 4: update all
   * current func implements only case 4
   */
  selectControl (state, payload) {
    // state.selectedControls.container = payload.container
    // state.selectedControls.selected = payload.selected
    if (state.selectedControls[payload.userFormId]) {
      state.selectedControls[payload.userFormId].container = payload.select.container
      state.selectedControls[payload.userFormId].selected = payload.select.selected
    } else {
      throw Error(`"${payload.userFormId}" not exist at selectedControls of vuex state`)
    }
  },
  updateGroup (state, payload) {
    if (state.groupedControls[payload.userFormId]) {
      state.groupedControls[payload.userFormId].groupArray = payload.groupArray
    } else {
      throw Error(`"${payload.userFormId}" not exist at groupedControls of vuex state`)
    }
  },
  fdEmitAction (state, payload) {},
  ideEmitAction (state, payload) {},
  changeToolBoxSelect (state, payload) {
    state.toolBoxSelect = payload
  },
  changeRunMode (state, payload) {
    state.isRunMode = payload
  }
}

export default mutations
