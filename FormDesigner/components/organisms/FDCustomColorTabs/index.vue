<template>
  <div class="custom-colortabs-outer">
    <label class="custom-label-ele">{{ propertyName }}</label>
    <div class="custom-div-ele">
      <ColorPalettes :name="propertyName" :value="propertyValue" @colorPalette="colorPaletteEmit"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import ColorPalettes from '../../organisms/FDColorPalettes/index.vue'

@Component({
  name: 'CustomColorTabs',
  components: { ColorPalettes }
})
export default class CustomColorTabs extends Vue {
  @Prop() name: string;
  @Prop() data: object;

  @Prop({ }) propertyData: tableData
  @Prop({ default: 'default' }) propertyName!: string

  get propertyValue () {
    return this.propertyData.value
  }

  @Emit('colorPaletteProp')
  colorPaletteEmit (selectedValue: ISelectedColoPaletteValue) {
    return selectedValue
  }
}
</script>

<style scoped>
.custom-colortabs-outer {
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
</style>
