<template>
<div ref="componentRef" :tabindex="properties.TabIndex" @mouseover="updateMouseCursor">
  <button
    class="commandbutton"
    :style="styleObj"
    :name="properties.Name"
    :tabindex="properties.TabIndex"
    :title="properties.ControlTipText"
    :runmode="getDisableValue"
    @blur="
      () => {
        isClicked = false;
      }
    "
    @mousedown="controlEditMode"
    @keydown.enter.prevent="setContentEditable($event, true)"
    @click="commandButtonClick"
    @contextmenu="isEditMode ? openTextContextMenu($event): parentConextMenu($event)"
  >
  <div id="logo" ref="logoRef" :style="reverseStyle">
    <img v-if="properties.Picture" id="img" :src="properties.Picture" draggable="false" :style="[imageProperty,imagePos]" ref="imageRef">
    <div v-if="!syncIsEditMode || isRunMode" :style="labelStyle"  ref="textSpanRef">
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
import { Component, Emit, Mixins, Prop, Watch, Ref } from 'vue-property-decorator'
import FdControlVue from '@/api/abstract/FormDesigner/FdControlVue'
import FDEditableText from '@/FormDesigner/components/atoms/FDEditableText/index.vue'
import Vue from 'vue'

@Component({
  name: 'FDCommandButton',
  components: {
    FDEditableText
  }
})
export default class FDCommandButton extends Mixins(FdControlVue) {
  $el!: HTMLDivElement;
  isClicked: boolean = false;
  isContentEditable: boolean = false;
  @Ref('textSpanRef') textSpanRef!: HTMLDivElement
  @Ref('imageRef') imageRef: HTMLImageElement
  @Ref('logoRef') logoRef : HTMLDivElement
  @Ref('componentRef') componentRef: HTMLDivElement
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

  /**
   * @description commandButtonClick is a method to check the check the clicked functionality of the button tag.
   * Also It sets the variable isClicked based on the Locked property
   * @function commandButtonClick
   *
   */
  commandButtonClick (e: Event) {
    if (this.toolBoxSelectControl === 'Select') {
      e.stopPropagation()
      if (this.isActivated) {
        if (this.properties.Locked) {
          this.isClicked = false
        } else {
          this.isClicked = true
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
   */
  protected get styleObj () {
    const controlProp = this.properties
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
    this.reverseStyle.justifyContent = 'center'
    const aignItems = 'inherit'
    if (controlProp.Picture) {
      display = 'flex'
      Vue.nextTick(() => {
        this.labelAlignment()
      })
    }
    return {
      ...(!controlProp.AutoSize && this.renderSize),
      ...this.baseStyle,
      left: `${controlProp.Left}px`,
      width: `${controlProp.Width}px`,
      height: `${controlProp.Height}px`,
      top: `${controlProp.Top}px`,
      borderTopColor: controlProp.Default ? 'black' : 'white',
      borderBottomColor: controlProp.Default ? 'black' : 'lightgray',
      borderLeftColor: controlProp.Default ? 'black' : 'white',
      borderRightColor: controlProp.Default ? 'black' : 'lightgray',
      outline: controlProp.Enabled
        ? controlProp.TakeFocusOnClick && this.isClicked
          ? '1px dotted black'
          : 'none'
        : 'none',
      outlineOffset:
        controlProp.TakeFocusOnClick && this.isClicked ? '-5px' : '0px',
      display: display,
      backgroundColor: controlProp.BackStyle ? controlProp.BackColor : 'transparent',
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
      whiteSpace: controlProp.WordWrap ? 'pre-wrap' : 'pre',
      wordBreak: controlProp.WordWrap ? 'break-all' : 'normal',
      paddingLeft: controlProp.AutoSize ? '0px' : '0px',
      paddingRight: controlProp.WordWrap ? '0px' : '0px',
      alignItems: aignItems
    }
  }

  /**
   * @description watches changes in propControlData to set autoset when true
   * @function autoSize
   * @param oldVal previous propControlData data
   * @param newVal  new/changed propControlData data
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
.commandbutton {
  overflow: hidden;
  display: inline-block;
  box-sizing: border-box;
  width: 0px;
  height: 0px;
  left: 0px;
  top: 0px;
  align-items: center;
  justify-content: center;
}
.commandbutton[runmode]:active {
  border-style: outset !important;
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
