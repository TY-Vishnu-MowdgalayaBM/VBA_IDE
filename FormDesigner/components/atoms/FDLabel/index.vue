<template>
  <label
    class="label"
    ref="componentRef"
    :style="cssStyleProperty"
    :name="properties.Name"
    :tabindex="properties.TabIndex"
    :title="properties.ControlTipText"
    @mousedown="addEventCustomCallback"
    @keydown.enter.prevent="setContentEditable($event, true)"
    @click="labelClick"
    @mouseover="updateMouseCursor"
    @contextmenu="isEditMode ? openTextContextMenu($event): parentConextMenu($event)"
  >
    <div id="logo" ref="logoRef" :style="reverseStyle">
    <img v-if="properties.Picture" id="img" :src="properties.Picture" draggable="false" :style="[imageProperty,imagePos]" ref="imageRef">
    <div v-if="!syncIsEditMode" id="label" ref="textSpanRef" :style="labelStyle" >
       <span :style="spanStyleObj">{{ computedCaption.afterbeginCaption }}</span>
          <span class="spanClass" :style="spanClassStyleObj">{{
            computedCaption.acceleratorCaption
          }}</span>
          <span :style="spanStyleObj">{{ computedCaption.beforeendCaption }}</span>
    </div>
    <FDEditableText
      v-else
      id="label"
      ref="editableTextRef"
      :editable="isRunMode === false && syncIsEditMode"
      :style="labelStyle"
      :caption="properties.Caption"
      @updateCaption="updateCaption"
      @releaseEditMode="releaseEditMode"
    >
    </FDEditableText>
    </div>
  </label>
</template>
<script lang="ts">
import { Component, Watch, Mixins, Emit, Ref } from 'vue-property-decorator'
import FDEditableText from '@/FormDesigner/components/atoms/FDEditableText/index.vue'
import FdControlVue from '@/api/abstract/FormDesigner/FdControlVue'
import Vue from 'vue'

@Component({
  name: 'FDLabel',
  components: {
    FDEditableText
  }
})
export default class FDLabel extends Mixins(FdControlVue) {
  $el!: HTMLLabelElement;
  @Ref('componentRef') componentRef: HTMLLabelElement
  @Ref('textSpanRef') textSpanRef!: HTMLDivElement
  @Ref('imageRef') imageRef: HTMLImageElement
  @Ref('logoRef') logoRef : HTMLDivElement
  @Ref('editableTextRef') editableTextRef!: FDEditableText
  /**
   * @description style object is passed to :style attribute in label tag
   * dynamically changing the styles of the component based on propControlData
   * @function cssStyleProperty
   *
   */
  protected get cssStyleProperty () {
    const controlProp = this.properties
    this.reverseStyle.justifyContent = 'center'
    if (!controlProp.Picture) {
      this.reverseStyle.justifyContent =
    controlProp.TextAlign === 0 ? 'flex-start' : controlProp.TextAlign === 1 ? 'center' : 'flex-end'
    }
    const font: font = controlProp.Font
      ? controlProp.Font
      : {
        FontName: 'Arial',
        FontSize: 10,
        FontItalic: true,
        FontBold: true,
        FontUnderline: true,
        FontStrikethrough: true
      }
    let display = ''
    if (this.isRunMode) {
      display = controlProp.Visible ? controlProp.Width === 0 || controlProp.Height === 0 ? 'none' : 'inline-block' : 'none'
    } else {
      display = controlProp.Width === 0 || controlProp.Height === 0 ? 'none' : 'inline-block'
    }
    const labelAlignItems = 'inherit'
    if (controlProp.Picture) {
      display = 'flex'
      Vue.nextTick(() => {
        this.labelAlignment()
      })
    }
    let borderStyles = {}
    if (controlProp.SpecialEffect !== 0) {
      borderStyles = {
        borderStyle: controlProp.SpecialEffect === 3 || controlProp.SpecialEffect === 4 ? 'solid' : controlProp.SpecialEffect === 1 ? 'outset' : controlProp.SpecialEffect === 2 ? 'inset' : '',
        borderLeftColor: controlProp.SpecialEffect === 1 ? 'white' : controlProp.SpecialEffect === 3 ? 'gray' : controlProp.SpecialEffect === 4 ? 'gray' : '',
        borderTopColor: controlProp.SpecialEffect === 1 ? 'white' : controlProp.SpecialEffect === 3 ? 'gray' : controlProp.SpecialEffect === 4 ? 'gray' : '',
        borderRightColor: controlProp.SpecialEffect === 2 ? 'white' : controlProp.SpecialEffect === 3 ? 'gray' : controlProp.SpecialEffect === 4 ? 'gray' : '',
        borderBottomColor: controlProp.SpecialEffect === 2 ? 'white' : controlProp.SpecialEffect === 3 ? 'gray' : controlProp.SpecialEffect === 4 ? 'gray' : '',
        borderLeftWidth: controlProp.SpecialEffect === 1 ? '2px' : controlProp.SpecialEffect === 2 ? '3px' : controlProp.SpecialEffect === 3 ? '2px' : controlProp.SpecialEffect === 4 ? '0.5px' : '',
        borderTopWidth: controlProp.SpecialEffect === 1 ? '2px' : controlProp.SpecialEffect === 2 ? '3px' : controlProp.SpecialEffect === 3 ? '2px' : controlProp.SpecialEffect === 4 ? '0.5px' : '',
        borderRightWidth: controlProp.SpecialEffect === 2 ? '2px' : controlProp.SpecialEffect === 1 ? '3px' : controlProp.SpecialEffect === 3 ? '0.5px' : controlProp.SpecialEffect === 4 ? '2px' : '',
        borderBottomWidth: controlProp.SpecialEffect === 2 ? '2px' : controlProp.SpecialEffect === 1 ? '3px' : controlProp.SpecialEffect === 3 ? '0.5px' : controlProp.SpecialEffect === 4 ? '2px' : ''
      }
    } else if (controlProp.BorderStyle !== 0) {
      borderStyles = {
        borderLeft: controlProp.BorderStyle === 1 ? '1px solid ' + controlProp.BorderColor : '',
        borderRight: controlProp.BorderStyle === 1 ? '1px solid ' + controlProp.BorderColor : '',
        borderTop: controlProp.BorderStyle === 1 ? '1px solid ' + controlProp.BorderColor : '',
        borderBottom: controlProp.BorderStyle === 1 ? '1px solid ' + controlProp.BorderColor : ''
      }
    }
    return {
      ...(!controlProp.AutoSize && this.renderSize),
      ...this.baseStyle,
      left: `${controlProp.Left}px`,
      width: `${controlProp.Width}px`,
      height: `${controlProp.Height}px`,
      top: `${controlProp.Top}px`,
      backgroundColor: controlProp.BackStyle ? controlProp.BackColor : 'transparent',
      borderColor: controlProp.BorderStyle === 1 ? controlProp.BorderColor : '',
      textAlign:
        controlProp.TextAlign === 0
          ? 'left'
          : controlProp.TextAlign === 1
            ? 'center'
            : 'right',
      borderImage: '',
      ...borderStyles,
      whiteSpace: controlProp.WordWrap ? 'pre-wrap' : 'pre',
      wordBreak: controlProp.WordWrap ? 'break-all' : 'normal',
      color:
        controlProp.Enabled === true ? controlProp.ForeColor : this.getEnabled,
      cursor: this.controlCursor,
      fontFamily: (font.FontStyle! !== '') ? this.setFontStyle : font.FontName!,
      fontSize: `${font.FontSize}px`,
      fontStyle: font.FontItalic || this.isItalic ? 'italic' : '',
      textDecoration:
        font.FontStrikethrough === true && font.FontUnderline === true
          ? 'underline line-through'
          : font.FontUnderline
            ? 'underline'
            : font.FontStrikethrough
              ? 'line-through'
              : '',
      textDecorationSkipInk: 'none',
      fontWeight: font.FontBold ? 'bold' : (font.FontStyle !== '') ? this.tempWeight : '',
      fontStretch: (font.FontStyle !== '') ? this.tempStretch : '',
      display: display,
      alignItems: labelAlignItems
    }
  }

  /**
   * @description watches changes in propControlData to set autoset when true
   * @function autoSize
   * @param oldVal previous propControlData data
   * @param newVal  new/changed propControlData data
   */
  @Watch('properties.AutoSize', { deep: true })
  autoSize () {
    this.updateAutoSize()
  }

  @Watch('properties.Font.FontSize', { deep: true })
  autoSizeValidateOnFontChange () {
    if (this.properties.AutoSize) {
      this.updateAutoSize()
    }
  }

  @Watch('properties.WordWrap', { deep: true })
  autoSizeValidateOnWordWrapChange () {
    if (this.properties.AutoSize) {
      this.updateAutoSize()
    }
  }

  @Watch('properties.Caption', { deep: true })
  autoSizeValidateOnCaptionChange () {
    if (this.properties.Picture) {
      Vue.nextTick(() => {
        this.labelAlignment()
      })
    }
    if (this.properties.AutoSize) {
      this.updateAutoSize()
    }
  }

  @Watch('properties.Picture')
  setPictureSize () {
    if (this.properties.Picture) {
      this.$nextTick(() => {
        this.onPictureLoad()
        this.positionLogo(this.properties.PicturePosition)
        if (this.properties.AutoSize) {
          this.updateAutoSize()
        }
      })
    }
  }

  @Watch('properties.Height')
  updateImageSizeHeight () {
    if (this.properties.Picture) {
      this.positionLogo(this.properties.PicturePosition)
      this.pictureSize()
    }
  }
  @Watch('properties.Width')
  updateImageSizeWidth () {
    if (this.properties.Picture) {
      this.positionLogo(this.properties.PicturePosition)
      this.pictureSize()
    }
  }
  @Watch('properties.PicturePosition')
  updatePicturePosition () {
    if (this.properties.Picture) {
      this.positionLogo(this.properties.PicturePosition)
      if (this.properties.AutoSize) {
        this.updateAutoSize()
      }
    }
  }
  @Watch('properties.TextAlign')
  autoSizeOnTextAlignment () {
    if (this.properties.AutoSize) {
      this.updateAutoSize()
    }
  }
  @Watch('properties.BorderStyle')
  autoSizeOnBorderStyleChange () {
    if (this.properties.AutoSize) {
      this.updateAutoSize()
    }
  }

  @Watch('properties.Enabled', {
    deep: true
  })
  checkEnabled (newVal: boolean, oldVal: boolean) {
    if (!this.properties.Enabled) {
      this.imageProperty.filter = 'sepia(0) grayscale(1) blur(3px) opacity(0.2)'
    } else {
      this.imageProperty.filter = ''
    }
  }
  /**
   * @description updateAutoSize calls Vuex Actions to update object
   * @function updateAutoSize
   * @override
   */
  updateAutoSize () {
    if (this.properties.AutoSize === true) {
      if (this.componentRef) {
        const imgStyle = {
          width: 'fit-content',
          height: 'fit-content',
          filter: ''
        }
        this.imageProperty = imgStyle
        if (this.properties.Picture) {
          this.positionLogo(this.properties.PicturePosition)
        }
        this.$nextTick(() => {
          const { width, height } = this.getWidthHeight()
          if (this.properties.Caption === '') {
            this.updateDataModel({
              propertyName: 'Height',
              value: 20
            })
            this.updateDataModel({
              propertyName: 'Width',
              value: 20
            })
          } else {
            this.updateDataModel({
              propertyName: 'Height',
              value: height + 5
            })
            this.updateDataModel({
              propertyName: 'Width',
              value: width
            })
          }
        })
      }
    } else {
      return undefined
    }
  }
  mounted () {
    this.$el.focus()
    if (this.properties.Picture) {
      this.positionLogo(this.properties.PicturePosition)
      this.pictureSize()
    }
  }
  releaseEditMode (event: KeyboardEvent) {
    this.$el.focus()
    this.setContentEditable(event, false)
  }
  labelClick (event: MouseEvent) {
    if (this.toolBoxSelectControl === 'Select') {
      event.stopPropagation()
      if (this.isEditMode) {
        (this.editableTextRef.$el as HTMLSpanElement).focus()
      }
    }
  }
  @Watch('isEditMode')
  setCaretPositionInEditMode () {
    if (this.isEditMode) {
      this.setCaretPosition()
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
  width: 0px;
  height: 0px;
  left: 0px;
  top: 0px;
  align-items: center;
  justify-content: center;
}
.spanClass {
  text-decoration: underline;
  text-decoration-skip-ink: none;
}
#logo{
 display: inline-flex;
 justify-content: center;
}

</style>
