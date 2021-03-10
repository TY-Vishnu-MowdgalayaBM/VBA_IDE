<template>
  <label
    class="label"
    :style="styleObj"
    :tabindex="properties.TabIndex"
    :title="properties.ControlTipText"
    @click.stop="selectedItem"
    @keydown.delete="deleteItem"
  >
    <span v-if="properties.Accelerator ===''">
      {{properties.Caption}}
    </span>
    <span v-else v-html="getAccelerator"/>
  </label>
</template>

<script lang="ts">
import { Component, Prop, Model, Emit } from 'vue-property-decorator'
import FdControlVue from '@/api/abstract/FormDesigner/FdControlVueSample'

@Component({
  name: 'FDLabelSample'
})
export default class FDLabelSample extends FdControlVue {
  protected get styleObj () :Partial<CSSStyleDeclaration> {
    const controlProp = this.properties
    const font: font = controlProp.Font ? controlProp.Font : {
      FontName: 'Arial',
      FontSize: 10
    }
    return {
      ...!controlProp.AutoSize && this.renderSize,
      ...this.baseStyle,
      borderColor: controlProp.BorderColor,
      textAlign: controlProp.TextAlign === 0 ? 'left' : controlProp.TextAlign === 1 ? 'center' : 'right',
      border: this.changeBorderStyle,
      backgroundColor: controlProp.BackStyle ? controlProp.BackColor : 'transparent',
      boxShadow: (controlProp.SpecialEffect! > 0) ? this.getSpecialEffectData : 'none',
      whiteSpace: controlProp.WordWrap ? 'normal' : 'nowrap',
      wordBreak: controlProp.WordWrap ? 'break-word' : 'normal',
      color: (controlProp.Enabled === true) ? controlProp.ForeColor : this.getEnabled,
      cursor: (controlProp.MousePointer !== 0 || controlProp.MouseIcon !== '') ? this.getMouseCursorData : 'default',
      // Fix Font.FontSize, Font.FontItalic ...
      fontFamily: font.FontStyle ? font.FontStyle : font.FontName,
      fontSize: `${font.FontSize}px`,
      fontStyle: font.FontItalic ? 'italic' : '',
      textDecoration: (font.FontStrikethrough === true && font.FontUnderline === true) ? 'underline line-through' : font.FontUnderline ? 'underline' : font.FontStrikethrough ? 'line-through' : '',
      //  position: 'relative',
      backgroundImage: `url(${controlProp.Picture})`,
      backgroundRepeat: this.getRepeat,
      backgroundPosition: this.getPosition,
      backgroundPositionX: this.getPositionX,
      backgroundPositionY: this.getPositionY
    }
  }
}
</script>

<style scoped>
.label {
  float: left;
  padding-left: 2px;
  overflow: hidden;
  outline: none;
  box-sizing: border-box;
}
</style>
