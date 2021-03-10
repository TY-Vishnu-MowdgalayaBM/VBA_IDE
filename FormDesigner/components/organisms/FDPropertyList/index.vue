<template>
  <div v-if="isTableVisible===false">
    <div>
      <div class="sideheader">
        <span class="sideheader1">
          <span>Properties - {{displayName ? userformData[userFormId][getSelectedControlsDatas[0]].properties.Name : userformData[userFormId][userFormId].properties.Name }}</span>
          <div id="mdiv" v-on:click="hideShowTable">
            <div class="mdiv">
              <div class="md"></div>
            </div>
          </div>
        </span>
      </div>
    </div>
    <div class="form-group">
       <select
        class="form-control"
        name="selectedUserForm"
        id="selectedUserForm"
        ref="selectedUserForm"
        v-if="userFormId"
        v-model="selected"
        @change="updateSelected($event)"
      >
      <template v-if="displayName">
        <option
          :value="containerData.properties.ID"
        >{{displayName ? containerData.properties.Name + ' '+ containerData.type : ''}}</option>
      </template>
        <template v-if="displayName">
         <option  v-for="control in containerDataControl" :value="control" :key="userData[control].properties.Name">
          <b>{{displayName ?  userData[control].properties.Name + ' ' + userData[control].type : ''}}</b>
        </option>
        </template>
      </select>

    </div>
    <FDTable v-if="selectedSelect.length > 0" :tableData="propertyTableData"
      :userFormId="userFormId"
      :getSelectedControlsDatas="getSelectedControlsDatas"
      :resultArray="resultArray" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue, Watch } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'
import FDTable from '@/FormDesigner/components/organisms/FDTable/index.vue'
import { PropertyListDefine } from '@/FormDesigner/models/ControlsTableProperties/propertyList'
import { IselectControl } from '@/storeModules/fd/actions'
import FDCommonMethod from '@/api/abstract/FormDesigner/FDCommonMethod'
import { EventBus } from '@/FormDesigner/event-bus'

@Component({
  name: 'PropertiesList',
  components: {
    FDTable
  }
})
export default class PropertiesList extends FDCommonMethod {
  @State(state => state.fd.userformData) userformData!: userformData
  @State((state) => state.fd.selectedControls) selectedControls!: fdState['selectedControls'];
  @Prop({ required: true, type: String }) public readonly userFormId! : string
  @Action('fd/selectControl') selectControl!: (payload: IselectControl) => void;

  propList = new PropertyListDefine();
  selected: string | number | font | null | undefined = null
  resultArray: boolean[] = []

  isTableVisible = false;
  hideShowTable () {
    this.isTableVisible = true
  }

  selectedOption: Object= {}
  ctrlEditMode: boolean = false

  selectOption () {
    if (this.displayName) {
      this.selected = this.selectedSelect[0]
    }
  }
  get getSelectedControlsDatas () {
    if (this.selectedSelect.length > 0 && this.selectedContainer.length > 0) {
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

  get propertyTableData () {
    let result : tableDatas = {}
    if (this.selectedSelect.length > 0 && this.selectedContainer.length > 0) {
      if (this.getSelectedControlsDatas!.length === 1) {
        const controlData: controlData = this.userformData[this.userFormId][this.getSelectedControlsDatas![0]]
        result = this.updateResult(controlData.properties)
      } else if (this.getSelectedControlsDatas!.length > 1) {
        let ctrlKeys = []
        let selCntrlType = []
        const checkValArr = [['CheckBox', 'OptionButton', 'ToggleButton'],
          ['TextBox', 'ListBox', 'ComboBox'],
          ['TabStrip', 'MultiPage', 'SpinButton', 'ScrollBar']]

        const uniqueKey = ['Name', 'TabIndex', 'Index', 'MouseIcon', 'Picture', 'Cancel', 'Default', 'Style']
        const combinedObj: ICommonProp = {}
        const commonPropValue: ICommonPropVal = {}
        this.resultArray = []

        // get array of Object which property Object of selected Controls
        for (const controlIndex in this.getSelectedControlsDatas!) {
          const controlData = this.userformData[this.userFormId][this.getSelectedControlsDatas![controlIndex]]
          const defineList = this.propList.data[controlData.type]
          selCntrlType.push(this.userformData[this.userFormId][this.getSelectedControlsDatas![controlIndex]].type)
          ctrlKeys.push(Object.keys(defineList))
        }
        const uniqueSelType = selCntrlType.filter((v, i, a) => a.indexOf(v) === i)

        for (let i = 0; i < checkValArr.length; i++) {
          this.resultArray[i] = checkValArr[i].some(item => uniqueSelType.includes(item))
        }
        if (this.resultArray.filter((x: boolean) => { return x === true }).length > 1) {
          uniqueKey.push('Value')
        }

        // get the array which include common key of selected controls
        let commonProp = ctrlKeys.reduce((a, b) => a.filter((c: string) => b.includes(c)))

        // excluding the Unique key
        commonProp = commonProp.filter((x: string) => !uniqueKey.includes(x))

        // Generating the Object of common key : value pair and Intializing value as null
        for (const propName in commonProp) {
          if (commonProp[propName] === 'Font') {
            const fontObj = {
              FontName: '',
              FontSize: '',
              FontBold: '',
              FontItalic: '',
              FontUnderline: '',
              FontStrikethrough: '',
              FontStyle: ''
            }
            Vue.set(combinedObj, commonProp[propName], fontObj)
          } else {
            Vue.set(combinedObj, commonProp[propName], '')
          }
        }

        // get the Object which include common key:[value] pair of selected control
        for (const key of this.getSelectedControlsDatas!) {
          const contolProp: controlProperties = this.userformData[this.userFormId][key].properties
          for (const propName in contolProp) {
            if (commonProp.indexOf(propName) > -1) {
              if (propName === 'Font') {
                for (const fontProp in contolProp[propName]) {
                  combinedObj[propName][fontProp] = [...combinedObj[propName][fontProp], contolProp[propName][fontProp]]
                }
              } else {
                combinedObj[propName] = [...combinedObj[propName], contolProp[propName as keyof controlProperties]]
              }
            }
          }
        }
        const allEqual = (arr: string[]): boolean => { return arr.every((v: string) => v === arr[0]) }

        // get the common value
        for (const propName in combinedObj) {
          if (propName === 'Font') {
            const fontObj = {
              FontName: '',
              FontSize: '',
              FontBold: '',
              FontItalic: '',
              FontUnderline: '',
              FontStrikethrough: '',
              FontStyle: ''
            }
            for (const fontProp in combinedObj[propName]) {
              const isSame: boolean = allEqual(combinedObj[propName][fontProp])
              fontObj[fontProp] = isSame ? combinedObj[propName][fontProp][0] : ''
            }
            commonPropValue[propName] = fontObj
          } else {
            const isSame: boolean = allEqual(combinedObj[propName])
            commonPropValue[propName] = isSame ? combinedObj[propName][0] : ''
          }
        }

        const controlData: controlData = this.userformData[this.userFormId][this.getSelectedControlsDatas![0]]
        const defineList = this.propList.data[controlData.type]
        result = this.updateResult(commonPropValue)
      }
      return result
    }
  }
  updateResult (commonPropValue: ICommonPropVal|controlProperties) {
    const result : tableDatas = {}
    const controlData: controlData = this.userformData[this.userFormId][this.getSelectedControlsDatas![0]]
    const defineList = this.propList.data[controlData.type]
    for (const propName in defineList) {
      const propValue = commonPropValue[propName as keyof controlProperties]
      if (propValue !== undefined) {
        result[propName] = {
          ...defineList[propName],
          value: propValue
        }
      }
    }
    return result
  }
  updateSelected (e: MouseEvent) {
    if (e.target instanceof HTMLSelectElement) {
      if (e.target.options.selectedIndex > -1) {
        const controlName = e.target.options[e.target.options.selectedIndex].text.split(' ')[0]
        const controlsArray = this.userformData[this.userFormId][this.selectedContainer[0]].controls
        const value = Object.keys(this.userformData[this.userFormId]).filter(val => {
          return this.userformData[this.userFormId][val].properties.Name === controlName
        })
        this.selectControl({
          userFormId: this.userFormId,
          select: {
            container: this.getContainerList(value[0]),
            selected: [value[0]]
          }
        })
      }
    }
  }
  get selectedSelect () {
    return this.selectedControls[this.userFormId].selected
  }
  get selectedContainer () {
    return this.selectedControls[this.userFormId].container
  }
  get containerData () {
    if (this.userData[this.selectedSelect[0]].type !== 'Userform' && this.ctrlEditMode) {
      if (this.userData[this.selectedSelect[0]].type === 'Frame') {
        return this.userData[this.selectedControls[this.userFormId].selected[0]]
      } else {
        const type = this.userData[this.selectedContainer[0]].type
        return type === 'Page' ? this.userData[this.selectedContainer[1]] : this.userData[this.selectedContainer[0]]
      }
    } else {
      const type = this.userData[this.selectedContainer[0]].type
      return type === 'Page' ? this.userData[this.selectedContainer[1]] : this.userData[this.selectedContainer[0]]
    }
  }
  get containerDataControl () {
    if (this.ctrlEditMode) {
      if (this.userData[this.selectedSelect[0]].type === 'Frame') {
        return this.userData[this.selectedControls[this.userFormId].selected[0]].controls.length > 0 ? this.userData[this.selectedControls[this.userFormId].selected[0]].controls : ''
      } else {
        const type = this.userData[this.selectedSelect[0]].type
        const ctrls = this.userData[this.selectedContainer[0]].controls
        const pageControls = this.userData[this.selectedSelect[0]].controls
        const combinedControl = ctrls.concat(pageControls)
        return type === 'Page' ? combinedControl : this.userData[this.selectedContainer[0]].controls
      }
    } else {
      const type = this.userData[this.selectedContainer[0]].type
      const ctrls = type === 'Page' ? this.userData[this.selectedContainer[1]].controls : []
      const pageControls = this.userData[this.selectedContainer[0]].controls
      const combinedControl = ctrls.concat(pageControls)
      return type === 'Page' ? combinedControl : this.userData[this.selectedContainer[0]].controls
    }
  }
  get userData () {
    return this.userformData[this.userFormId]
  }
  get displayName () {
    return this.selectedSelect.length === 1 && !this.selectedSelect[0].startsWith('group')
  }
  @Watch('selectedControls', { deep: true })
  updateOption () {
    this.selectOption()
  }
  getEditMode () {
    const userData = this.userformData[this.userFormId]
    const selected = this.selectedControls[this.userFormId].selected
    if (
      selected.length === 1 &&
      !selected[0].startsWith('group') &&
      userData[selected[0]].type !== 'Userform'
    ) {
      if (userData[selected[0]].type === 'Page' || userData[selected[0]].type === 'Frame' || userData[selected[0]].type === 'MultiPage') {
        EventBus.$emit('getEdiTMode', (editmode: boolean) => {
          this.ctrlEditMode = editmode
        })
      } else {
        this.ctrlEditMode = false
      }
    } else {
      this.ctrlEditMode = false
    }
  }
  created () {
    EventBus.$on('dispProp', (val: boolean) => {
      this.isTableVisible = val
    })
    EventBus.$on('getCtrlEditMode', () => {
      this.getEditMode()
    })
  }
  destroyed () {
    EventBus.$off('dispProp')
  }
}
</script>

<style scoped>
.sideheader1 {
   display: grid;
  grid-template-columns: 1fr 25px;
  background-color: rgb(142, 191, 231);
  margin-bottom: 8px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.sideheader {
  height: 22px;
  text-align: left;
  padding: 0pc;
  background-color: #99b4d1;
}
.form-control {
  float: left;
  width: 100%;
  cursor: pointer;
  background-color: white;
}
#mdiv {
  float: right;
  margin: initial;
  position: relative;
  top: 0px;
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
</style>
