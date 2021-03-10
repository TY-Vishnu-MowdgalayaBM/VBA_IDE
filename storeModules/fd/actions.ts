import { ActionTree } from 'vuex'
import { FdMutations } from './mutations'

export type IchangeToolBoxSelect = string

export interface IaddControl {
  userFormId: string
  controlId: string
  addId: string
  item: controlData
}
export interface IaddUserform {
  target: any
  key: string
  value: any
}

export interface IupdateControl {
  userFormId: string
  controlId: string
  propertyName: keyof controlProperties
  value: any
}

export interface IupdatedSelectedControl extends IupdateControl {
  target: any
}

export interface IupdateControlExtraData {
  userFormId: string
  controlId: string
  propertyName: keyof extraDatas
  value: any
}

export interface IupdateUserform {
  userFormId: string
  controlId: string
  propertyName: keyof controlProperties
  value: any
}

export interface IdeleteControl {
  userFormId: string
  parentId: string
  targetId: string
}

export interface IsetChildControls {
  userFormId: string
  containerId: string
  targetControls: string[]
}

export interface IaddChildControls {
  userFormId: string
  containerId: string
  targetControls: string[]
}

export interface IupdateCopyControlList {
  userFormId: string
  parentId: string
  targetId: Array<string>
  type: string
}

// export interface IselectControl extends selectedControls {}
export interface IselectControl {
  userFormId: string
  select: selectedControls
}
export interface IupdateGroup {
  userFormId: string
  groupArray: string[]
}

export interface IfdEmitAction {
  actionId: string
  actionArg: any
}

export interface IideEmitAction {
  actionId: string
  actionArg: any
}

export interface IupdatePosition {
  userFormId: string
  controlId: string
  value: {
    Top: number
    Left: number
    Width: number
    Height: number
  }
}

type AugmentedActionContext = {
  commit<K extends keyof FdMutations>(
    key: K,
    payload: Parameters<FdMutations[K]>[1]
  ): ReturnType<FdMutations[K]>
}

interface FdActions {
  addControl(context: AugmentedActionContext, payload: IaddControl): void
  addCopiedControl(context: AugmentedActionContext, payload: IaddControl): void
  addUserform(context: AugmentedActionContext, payload: IaddUserform): void
  updateControl(context: AugmentedActionContext, payload: IupdateControl): void
  updateControlExtraData(context: AugmentedActionContext, payload: IupdateControlExtraData): void
  updateUserFormProp(context: AugmentedActionContext, payload: IupdateUserform): void
  deleteControl(context: AugmentedActionContext, payload: IdeleteControl): void
  deleteCopiedControl(context: AugmentedActionContext, payload: IdeleteControl): void
  setChildControls(state: AugmentedActionContext, payload: IsetChildControls): void;
  addChildControls(state: AugmentedActionContext, payload: IaddChildControls): void;
  selectControl(context: AugmentedActionContext, payload: IselectControl): void
  updateGroup(context: AugmentedActionContext, payload: IupdateGroup): void
  fdEmitAction(context: AugmentedActionContext, payload: IfdEmitAction): void
  ideEmitAction(context: AugmentedActionContext, payload: IideEmitAction): void
  changeToolBoxSelect(context: AugmentedActionContext, payload: IchangeToolBoxSelect): void
  updateCopyControlList(context: AugmentedActionContext, payload: IupdateCopyControlList): void
  updatePosition(context: AugmentedActionContext, payload: IupdatePosition): void
  changeRunMode(context: AugmentedActionContext, payload: boolean): void
}

const actions: ActionTree<fdState, rootState> & FdActions = {
  fdActionSample (context, payload) {
    context.commit('fdActionSample', payload)
  },
  addControl (context, payload) {
    context.commit('addControl', payload)
  },
  addCopiedControl (context, payload) {
    context.commit('addCopiedControl', payload)
  },
  updateUserFormProp (context, payload) {
    context.commit('updateUserFormProp', payload)
  },
  addUserform (context, payload) {
    context.commit('addUserform', payload)
  },
  updateControl (context, payload) {
    context.commit('updateControl', payload)
  },
  updateControlExtraData (context, payload) {
    context.commit('updateControlExtraData', payload)
  },
  deleteControl (context, payload) {
    context.commit('deleteControl', payload)
  },
  deleteCopiedControl (context, payload) {
    context.commit('deleteCopiedControl', payload)
  },
  setChildControls (context, payload) {
    context.commit('setChildControls', payload)
  },
  addChildControls (context, payload) {
    context.commit('addChildControls', payload)
  },
  selectControl (context, payload) {
    context.commit('selectControl', payload)
  },
  fdEmitAction (context, payload) {
    context.commit('fdEmitAction', payload)
  },
  ideEmitAction (context, payload) {
    context.commit('ideEmitAction', payload)
  },
  changeToolBoxSelect (context, payload) {
    context.commit('changeToolBoxSelect', payload)
  },
  updateCopyControlList (context, payload) {
    context.commit('updateCopyControlList', payload)
  },
  updateGroup (context, payload) {
    context.commit('updateGroup', payload)
  },
  updatePosition (context, payload) {
    context.commit('updateControl', {
      userFormId: payload.userFormId,
      controlId: payload.controlId,
      propertyName: 'Top',
      value: payload.value.Top })
    context.commit('updateControl', {
      userFormId: payload.userFormId,
      controlId: payload.controlId,
      propertyName: 'Left',
      value: payload.value.Left })
    context.commit('updateControl', {
      userFormId: payload.userFormId,
      controlId: payload.controlId,
      propertyName: 'Width',
      value: payload.value.Width })
    context.commit('updateControl', {
      userFormId: payload.userFormId,
      controlId: payload.controlId,
      propertyName: 'Height',
      value: payload.value.Height })
  },
  changeRunMode (context, payload) {
    context.commit('changeRunMode', payload)
  }
}

export default actions
