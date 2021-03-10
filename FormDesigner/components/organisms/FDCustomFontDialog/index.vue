<template>
  <div class="custom-fontDialog-outer">
    <label class="custom-label-ele">{{propertyName}}</label>
     <div class="box grid-design">
      <input type="text" name="Font" class="font-input"
      :value="propertyValue.FontName" disabled="true"
      />
        <button
          class="fontButtonStyle"
          @click="setFontDialogVisiblilty(true)"
        >
          ...
        </button>
    </div>
    <FontDialog :fontPropValue="propertyValue" v-if="isOpen"
    :isOpen="isOpen" @setFontDialogVisiblilty="setFontDialogVisiblilty"
    @emitFont="emitFont" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import FontDialog from '@/FormDesigner/components/organisms/FDFontDialog/index.vue'
import { EventBus } from '@/FormDesigner/event-bus'
@Component({
  name: 'FDCustomFontDialog',
  components: {
    FontDialog
  }
})
export default class FDCustomFontDialog extends Vue {
  @Prop({ }) propertyData! : tableData
  @Prop({ default: 'default' }) propertyName!: string
  isOpen: boolean = false
  get propertyValue () {
    return this.propertyData.value
  }
  @Emit('emitFont')
  emitFont (tempVal: font) {
    return tempVal
  }

  setFontDialogVisiblilty (value: boolean) {
    if (value === false) {
      EventBus.$emit('focusUserForm')
    }
    this.isOpen = value
  }
}
</script>

<style scoped>
.fontButtonStyle {
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
.custom-fontDialog-outer {
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
  width: calc(100%);
}
.font-input {
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
</style>
