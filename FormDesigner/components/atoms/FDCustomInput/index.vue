<template>
  <div class="custom-input-outer">
    <label class="custom-label-ele">{{propertyName}}</label>
    <div v-if="propertyType === 'file'" class="box">
      <input type="text" class="file-input"
      :value="displayValue" disabled="true"
      />
        <button
          class="file-inpu-button-style"
          @click="setInputValue()"
        >
          ...
          <input
          ref="fileInputRef"
      :name="propertyName"
      :type="propertyType"
      @change="updateAppearance"
      :accept="propertyName==='Picture'?'image/gif, image/jpeg, image/x-icon, image/jpg, image/bmp' :
      'image/gif, image/x-icon, image/bmp'"
      />
        </button>
    </div>
    <input
      v-else
      :name="propertyName"
      class="custom-input-ele"
      :value="propertyValue"
      :type="propertyType"
      @change="updateAppearance"
      @input="updateCaptionProperty"
      @keydown="validateELetter"
    />
  </div>
</template>

<script lang="ts">

import { Component, Vue, Prop, Emit, Ref } from 'vue-property-decorator'
@Component({
  name: 'FDCustomInput',
  components: {}
})
export default class FDCustomInput extends Vue {
  @Prop() propertyData! : tableData
  @Ref('fileInputRef') fileInputRef!: HTMLInputElement;

  @Prop({ default: 'default' }) propertyName!: string

  get propertyType () {
    return this.propertyData.type
  }

  get propertyValue () {
    return this.propertyData.value
  }

  get propertyValues () {
    return this.propertyData.values
  }
  get displayValue () {
    if (this.propertyValue && typeof (this.propertyValue) === 'string') {
      const type = this.propertyValue.split(';')[0].split('/')[1]
      if (type.includes('x-icon')) {
        return '(Icon)'
      } else {
        return '(Bitmap)'
      }
    } else {
      return '(None)'
    }
  }
  @Emit('updateAppearance')
  updateAppearance (e: Event) {
    return e
  }
  updateCaptionProperty (e: Event) {
    if (this.propertyName === 'Caption') {
      this.updateAppearance(e)
    } else {
      e.preventDefault()
    }
  }
  validateELetter (e: KeyboardEvent) {
    if (this.propertyType === 'number') {
      if (['e'].includes(e.key)) {
        e.preventDefault()
        if (e.target instanceof HTMLInputElement) {
          e.target.value = this.propertyValue!.toString()
        }
      }
    }
  }
  setInputValue () {
    this.fileInputRef.value = ''
    this.fileInputRef.click()
  }
}
</script>

<style scoped>
.custom-input-outer {
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
.custom-input-ele {
  border: 0.1px solid lightgray;
  outline: none;
  font-size: 12px;
}
input[type="file"] {
    display: none;
}
.file-input {
  border: none;
  outline: none;
  height: 14px;
  width: calc(100% - 20px);
}
.box {
  overflow: hidden;
  float: right;
  width: 100%;
}
.file-inpu-button-style {
  height: 20px;
  width: 17px;
  padding: 0px;
  padding-left: 1px;
  padding-right: 2px;
  border: 1px solid white;
  border-right-color: gray;
  border-bottom-color: gray;
  border-left-color: lightgray;
  border-top-color: lightgray;
  outline: none;
  margin-left: -3px;
}
</style>
