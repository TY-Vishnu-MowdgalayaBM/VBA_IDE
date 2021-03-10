<template>
  <div class="custom-dropdown-outer">
    <label class="custom-label-ele">{{propertyName}}</label>
    <div class="custom-div-ele">
      <div class="select-editable" style="width: 100%; height: 17px;">
        <select
        :name="propertyName"
        @change="updateAppearance"
        v-if="propertyType==='Boolean'"
        :value="propertyValue"
        v-model="selected"
        >
          <option value='true'>True</option>
           <option value='false'>False</option>
        </select>
        <select
        :name="propertyName"
        @change="updateAppearance"
        :id="propertyValues.indexOf(propertyValues[propertyValue])"
        v-if="propertyType==='array'"
        v-model="selected"
        >
        <option v-for="(propValue, index) in propertyValues" :key="propValue" :value="index">{{propValue}}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component({
  name: 'FDCustomDropDown',
  components: {}
})
export default class FDCustomDropDown extends Vue {
  @Prop({ }) propertyData! : tableData
  @Prop({ default: 'default' }) propertyName!: string

  selected: string | number | font | null | undefined | boolean= null

  get propertyType () {
    return this.propertyData.type
  }

  get propertyValue () {
    Vue.nextTick(() => {
      this.selected = this.propertyData.value
    })
    return this.propertyData.value
  }

  get propertyValues () {
    return this.propertyData.values
  }
  @Emit('updateAppearance')
  updateAppearance (e: Event) {
    return e
  }
}
</script>

<style scoped>
.custom-dropdown-outer {
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: 118px 1fr;
}
.custom-label-ele {
  outline: none;
  border: 0.1px solid lightgray;
  font-size: 12px;
  position: inherit;
}
.custom-div-ele {
  border: 0.1px solid lightgray;
  outline: none;
  font-size: 12px;
}
.select-editable {
  position: relative;
  background-color: white;
}

.select-editable select {
  position: absolute;
  top: 0px;
  left: 0px;
  font-size: 14px;
  border: none;
  width: 100%;
  height: 100%;
  margin: 0;
  appearance: none;
}

.select-editable input {
  position: absolute;
  top: 0px;
  left: 0px;
  width: calc(100% - 14px);
  height: calc(100% - 2px);
  padding: 1px;
  font-size: 12px;
  border: none;
}

.select-editable select:focus,
.select-editable input:focus {
  outline: none;
}

.select-editable:before {
  content: "";
  position: absolute;
  right: 0px;
  width: 15px;
  height: -webkit-fill-available;
  float: right;
  border: 1px solid lightgrey;
  border-right-color: gray;
  border-bottom-color: gray;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="50" border="1px solid red"><polygon points="0,0 100,0 50,50" style="fill:%23666666;stroke-width:3;stroke:rgb(0,0,250)" /></svg>');
  background-color: rgb(238, 238, 238);
  background-size: 50%;
  background-position: center;
  background-repeat: no-repeat;
  pointer-events: none;
  z-index: 1;
}
</style>
