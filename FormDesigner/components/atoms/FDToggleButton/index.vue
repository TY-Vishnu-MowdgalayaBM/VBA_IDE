<template>
<div ref="componentRef" :tabindex="properties.TabIndex" :style="outerDivStyleObj" @mouseover="updateMouseCursor">
  <button
    class="toggle-button"
    :style="styleObj"
    :name="properties.Name"
    :tabindex="properties.TabIndex"
    :title="properties.ControlTipText"
    :runmode="getDisableValue"
    @mousedown="controlEditMode"
    @keydown.enter.prevent="setContentEditable($event, true)"
    @blur="
      () => {
        isClicked = false;
        isFocus = false;
      }
    "
    @click="toggleButtonClick"
    @contextmenu="isEditMode ? openTextContextMenu($event): parentConextMenu($event)"
  >
    <div id="logo" ref="logoRef" :style="reverseStyle">
    <img v-if="properties.Picture" id="img" :src="properties.Picture" draggable="false" :style="[imageProperty,imagePos]" ref="imageRef">
    <div v-if="!syncIsEditMode || isRunMode" :style="labelStyle" ref="textSpanRef">
      <span :style="spanStyleObj">{{ computedCaption.afterbeginCaption }}</span>
          <span class="spanClass" :style="spanClassStyleObj">{{
            computedCaption.acceleratorCaption
          }}</span>
          <span :style="spanStyleObj">{{ computedCaption.beforeendCaption }}</span>
    </div>
    <FDEditableText
      v-else
      :editable="isRunMode === false && syncIsEditMode"
      :style="labelStyle"
      ref="editableTextRef"
      :caption="properties.Caption"
      @updateCaption="updateCaption"
      @releaseEditMode="releaseEditMode"
    >
    </FDEditableText>
    </div>
  </button>
</div>
</template>

<script lang="ts">
import { Component, Mixins, Ref, Watch } from 'vue-property-decorator'
import FdControlVue from '@/api/abstract/FormDesigner/FdControlVue'
import FDEditableText from '@/FormDesigner/components/atoms/FDEditableText/index.vue'
import Vue from 'vue'

@Component({
  name: 'FDToggleButton',
  components: {
    FDEditableText
  }
})
export default class FDToggleButton extends Mixins(FdControlVue) {
  $el!: HTMLDivElement;
  isClicked: boolean = true;
  isFocus: boolean = false;
  clickCount: number = 0;
  @Ref('componentRef') componentRef: HTMLSpanElement
  @Ref('textSpanRef') textSpanRef!: HTMLSpanElement
  @Ref('imageRef') imageRef: HTMLImageElement
  @Ref('logoRef') logoRef : HTMLSpanElement
  @Ref('editableTextRef') editableTextRef!: FDEditableText
  /**
   * @description getDisableValue checks for the RunMode of the control and then returns after checking for the Enabled
   * and the Locked property
   * @function getDisableValue
   */
  get getDisableValue () {
    if (this.isRunMode) {
      return (
        this.properties.Enabled === false || this.properties.Locked === true
      )
    } else {
      return true
    }
  }
  get outerDivStyleObj () {
    return {
      backgroundColor: this.properties.BackStyle === 1 ? this.properties.Value !== 'False' ? 'white' : 'transparent' : 'transparent',
      width: 'fit-content'
    }
  }
  /**
   * @description toggleButtonClick is a method to check the check the clicked functionality of the button tag.
   * Also It sets the variables isClicked and isFocus based on the Locked property
   * @function toggleButtonClick
   * @param MouseEvent
   */
  toggleButtonClick (e: MouseEvent) {
    if (this.toolBoxSelectControl === 'Select') {
      e.stopPropagation()
      if (this.isRunMode) {
        this.clickCount = this.clickCount + 1
        if (this.properties.Locked === false) {
          this.isFocus = true
          this.isClicked = !this.isClicked
          if (this.properties.TripleState) {
            if (this.clickCount % 3 === 0) {
              this.updateDataModel({ propertyName: 'Value', value: '' })
            } else if (this.isClicked) {
              this.updateDataModel({ propertyName: 'Value', value: 'True' })
            } else {
              this.updateDataModel({ propertyName: 'Value', value: 'False' })
            }
          } else if (this.isClicked) {
            this.updateDataModel({ propertyName: 'Value', value: 'True' })
          } else {
            this.updateDataModel({ propertyName: 'Value', value: 'False' })
          }
        } else {
          this.isClicked = false
        }
      }
      if (this.isEditMode) {
        (this.editableTextRef.$el as HTMLSpanElement).focus()
      }
    }
  }

  /**
   * @description style object is passed to :style attribute in button tag
   * dynamically changing the styles of the component based on properties
   * @function styleObj
   *
   */
  protected get styleObj () {
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
    const alignItems = 'inherit'
    if (controlProp.Picture) {
      display = 'flex'
      Vue.nextTick(() => {
        this.labelAlignment()
      })
    }
    return {
      left: `${controlProp.Left}px`,
      width: `${controlProp.Width}px`,
      height: `${controlProp.Height}px`,
      top: `${controlProp.Top}px`,
      boxShadow: controlProp.Enabled
        ? controlProp.Value === 'False' || controlProp.Value === 'false'
          ? '1px 1px gray'
          : controlProp.Value === 'True' || controlProp.Value === 'true'
            ? '-1px -1px black'
            : '1px 1px gray'
        : '1px 1px gray',
      backgroundColor: controlProp.BackStyle ? controlProp.Value !== 'False' ? controlProp.BackColor : controlProp.BackColor : 'transparent',
      opacity: controlProp.BackStyle ? controlProp.Value !== 'False' ? 0.5 : 1 : 1,
      outline: controlProp.Enabled
        ? this.isFocus
          ? '1px dotted black'
          : 'none'
        : 'none',
      outlineOffset: this.isClicked ? '-5px' : '-5px',
      display: display,
      color:
        controlProp.Enabled === true &&
        (controlProp.Value === 'False' ||
          controlProp.Value === 'false' ||
          controlProp.Value === 'True' ||
          controlProp.Value === 'true')
          ? controlProp.ForeColor
          : this.getEnabled,
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
      whiteSpace: controlProp.WordWrap ? 'pre-wrap' : 'pre',
      wordBreak: controlProp.WordWrap ? 'break-all' : 'normal',
      paddingLeft: controlProp.AutoSize ? '0px' : '0px',
      paddingRight: controlProp.WordWrap ? '0px' : '6px',
      textAlign:
        controlProp.TextAlign === 0
          ? 'left'
          : controlProp.TextAlign === 1
            ? 'center'
            : 'right',
      borderLeft: controlProp.Value !== 'True' ? '1px solid' : '',
      borderTop: controlProp.Value !== 'True' ? '1px solid' : '',
      borderRight: controlProp.Value === 'True' ? '1px solid' : '',
      borderBottom: controlProp.Value === 'True' ? '1px solid' : '',
      borderTopColor: controlProp.Value !== 'True' ? 'white !important' : '',
      borderLeftColor: controlProp.Value !== 'True' ? 'white !important' : '',
      borderBottomColor: controlProp.Value === 'True' ? 'white !important' : '',
      borderRightColor: controlProp.Value === 'True' ? 'white !important' : '',
      alignItems: alignItems
    }
  }

  /**
   * @description watches changes in properties to set autoset when true
   * @function autoSize
   * @param oldVal previous properties data
   * @param newVal  new/changed properties data
   */
  @Watch('properties.AutoSize', { deep: true })
  autoSize (newVal: boolean, oldVal: boolean) {
    // if autoSize is true then height and width value will not get updated
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
  @Watch('isEditMode')
   setCaretPositionInEditMode () {
     if (this.isEditMode) {
       this.setCaretPosition()
     }
   }
  /**
   * @description updateAutoSize calls Vuex Actions to update object
   * @function updateAutoSize
   * @override
   */
  updateAutoSize () {
    if (this.properties.AutoSize === true) {
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
        if (!this.properties.Picture && this.properties.Caption === '') {
          this.updateDataModel({
            propertyName: 'Height',
            value: height + 20
          })
        } else {
          this.updateDataModel({
            propertyName: 'Height',
            value: height + 5
          })
        }
        this.updateDataModel({
          propertyName: 'Width',
          value: width
        })
      })
    } else {
      return undefined
    }
  }

  /**
   * @description mounted initializes the values which are required for the component
   */
  mounted () {
    this.$el.focus()
    this.updateAutoSize()
    if (this.properties.Picture) {
      this.positionLogo(this.properties.PicturePosition)
      this.pictureSize()
    }
  }
  releaseEditMode (event: KeyboardEvent) {
    this.$el.focus()
    this.setContentEditable(event, false)
  }
}
</script>

<style scoped>
.toggle-button {
  width: 0px;
  height: 0px;
  left: 0px;
  top: 0px;
  box-shadow: 1px 1px gray;
  border: none;
  overflow: hidden;
  outline: none;
  box-sizing: border-box;
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
