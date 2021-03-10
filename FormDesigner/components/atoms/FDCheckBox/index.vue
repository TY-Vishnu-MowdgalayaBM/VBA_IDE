<template>
  <div
    :title="properties.ControlTipText"
    ref="componentRef"
    class="outer-check"
    :style="cssStyleProperty"
    @click="checkBoxClick"
    @mouseover="updateMouseCursor"
    @keydown.enter.prevent="setContentEditable($event, true)"
    :tabindex="properties.TabIndex"
    @mousedown="controlEditMode"
    @contextmenu="isEditMode ? openTextContextMenu($event): parentConextMenu($event)"
  >
    <label class="control" :style="controlStyleObj">
      <input
        @change="handleChange($event, checkboxInput)"
        ref="checkboxInput"
        :name="properties.Name"
        :tabindex="properties.TabIndex"
        :disabled="getDisableValue"
        type="checkbox"
        class="control-input visually-hidden" />
      <span
        :class="['control-indicator', getCheckStyle]"
        :style="controlIndicatorStyleObj"
        ref="spanRef"
      ></span
    ></label>
      <div id="logo" ref="logoRef" :style="logoStyleObj">
      <img id="img" v-if="properties.Picture" :src="properties.Picture" draggable="false" :style="[imageProperty,imagePos]" ref="imageRef">
        <div ref="textSpanRef"
          v-if="!syncIsEditMode || isRunMode"
          @click="isRunMode && makeChecked($event)"
          :style="labelStyle"
        >
          <span :style="spanStyleObj">{{ computedCaption.afterbeginCaption }}</span>
          <span class="spanClass" :style="spanClassStyleObj">{{
            computedCaption.acceleratorCaption
          }}</span>
          <span :style="spanStyleObj">{{ computedCaption.beforeendCaption }}</span>
        </div>
        <FDEditableText
          v-else
          ref="editableTextRef"
          :editable="isRunMode === false && syncIsEditMode"
          :caption="properties.Caption"
          :style="[labelStyle, {color: !properties.Enabled ? 'gray' : ''}]"
          @updateCaption="updateCaption"
          @releaseEditMode="releaseEditMode"
        >
        </FDEditableText>
      </div>
    </div>
</template>

<script lang="ts">
import { Component, Ref, Mixins, Watch, Vue } from 'vue-property-decorator'
import FdControlVue from '@/api/abstract/FormDesigner/FdControlVue'
import FDEditableText from '@/FormDesigner/components/atoms/FDEditableText/index.vue'

@Component({
  name: 'FDCheckBox',
  components: {
    FDEditableText
  }
})
export default class FDCheckBox extends Mixins(FdControlVue) {
  @Ref('componentRef') componentRef: HTMLDivElement
  @Ref('checkboxInput') checkboxInput!: HTMLInputElement;
  @Ref('spanRef') spanRef!: HTMLSpanElement;
  @Ref('textSpanRef') textSpanRef!: HTMLDivElement;
  @Ref('imageRef') imageRef: HTMLImageElement
  @Ref('logoRef') logoRef : HTMLDivElement
  @Ref('editableTextRef') editableTextRef!: FDEditableText
  $el: HTMLDivElement
  alignItem: boolean = false

  get getCheckStyle () {
    if (this.properties.Enabled) {
      if (this.properties.Value === 'True') {
        return 'trueImage'
      } else if (this.properties.Value === '') {
        return 'disabledImage'
      }
    } else {
      if ((this.properties.Value === 'True') || (this.properties.Value === '')) {
        return 'disabledImage'
      }
    }
  }

  get logoStyleObj (): Partial<CSSStyleDeclaration> {
    if (!this.properties.Picture) {
      return {
        ...this.reverseStyle,
        display: 'flex',
        alignSelf: this.properties.WordWrap ? (this.alignItem ? 'baseline' : 'center') : 'center'
      }
    } else {
      return {
        ...this.reverseStyle
      }
    }
  }

  get controlStyleObj () {
    const controlProp = this.properties
    const a = ['left', 'right']
    let leftRightStyle = {}
    if (controlProp.Alignment === 1) {
      leftRightStyle = { [a[0]]: '1px' }
    } else if (controlProp.Alignment === 0) {
      leftRightStyle = { [a[1]]: '0px' }
    }
    return {
      order: controlProp.Alignment === 1 ? '0' : '1',
      position: 'sticky',
      top: `${(controlProp.Height! - 10) / 2}px`,
      ...leftRightStyle
    }
  }
  /**
   * @description  watches Enabled property and the sets the backgroundColor
   * @function checkEnabled
   */
  @Watch('properties.Enabled', {
    deep: true
  })
  checkEnabled (newVal: boolean, oldVal: boolean) {
    this.editableTextVerify()
    if (!this.properties.Enabled) {
      this.spanRef.style.backgroundColor = 'rgba(220, 220, 220, 1)'
      this.imageProperty.filter = 'sepia(0) grayscale(1) blur(3px) opacity(0.2)'
    } else {
      this.spanRef.style.backgroundColor = 'white'
      this.imageProperty.filter = ''
    }
  }

  /**
   * @description  watches Value property and the sets the checked
   * @function verifyValue
   */
  @Watch('properties.Value', {
    deep: true
  })
  verifyValue () {
    this.editableTextVerify()
    if (this.isRunMode) {
      if (this.properties.Enabled && !this.properties.Locked) {
        this.handleValue(this.properties.Value! as string)
      }
    } else {
      this.handleValue(this.properties.Value! as string)
    }
  }
  @Watch('isEditMode')
  setCaretPositionInEditMode () {
    if (this.isEditMode) {
      this.setCaretPosition()
    }
  }
  handleValue (newVal: string) {
    let tempValue = newVal.toLowerCase()
    const checkDiv = this.checkboxInput
    if (!isNaN(parseInt(newVal))) {
      if (parseInt(newVal) === 0) {
        this.spanRef.style.backgroundColor = 'white'
        checkDiv.checked = false
      } else {
        this.spanRef.style.backgroundColor = 'white'
        checkDiv.checked = true
      }
    } else if (tempValue === 'true') {
      this.spanRef.style.backgroundColor = 'white'
      checkDiv.checked = true
    } else if (tempValue === 'false') {
      this.spanRef.style.backgroundColor = 'white'
      checkDiv.checked = false
    } else {
      checkDiv.checked = true
      this.spanRef.style.backgroundColor = 'rgba(220, 220, 220, 1)'
    }
  }
  /**
   * @description  makeChecked controls the checked of the control in RunMode
   * @function makeChecked
   */
  makeChecked () {
    if (!this.getDisableValue) {
      this.tripleState += 1
      const checkDiv = this.checkboxInput
      if (!this.properties.TripleState) {
        checkDiv.checked = !checkDiv.checked
        const tempval = checkDiv.checked
        this.updateDataModel({ propertyName: 'Value', value: tempval })
      } else {
        if (this.tripleState % 3 === 0) {
          checkDiv.checked = true
          this.spanRef.style.backgroundColor = 'rgba(220, 220, 220, 1)'
        } else {
          this.spanRef.style.backgroundColor = 'white'
          checkDiv.checked = !checkDiv.checked
          this.updateDataModel({
            propertyName: 'Value',
            value: checkDiv.checked
          })
        }
      }
    }
  }

  /**
   * @description getDisableValue checks for the RunMode of the control and then returns after checking for the Enabled
   * and the Locked property
   * @function getDisableValue
   */
  get getDisableValue () {
    if (this.isRunMode) {
      return this.properties.Enabled === false || this.properties.Locked
    } else {
      return true
    }
  }

  /**
   * @description style object is passed to :style attribute in span tag
   * dynamically changing the styles of the component based on properties
   * @function controlIndicatorStyleObj
   *
   */
  get controlIndicatorStyleObj () {
    const controlProp = this.properties
    return {
      boxShadow:
      controlProp.SpecialEffect === 0 ? '' : '-1px -1px gray',
      border: controlProp.SpecialEffect === 0 ? '2px solid gray' : ''
    }
  }

  /**
   * @description style object is passed to :style attribute in label tag
   * dynamically changing the styles of the component based on properties
   * @function cssStyleProperty
   *
   */
  get cssStyleProperty () {
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
        FontSize: 20,
        FontItalic: true,
        FontBold: true,
        FontUnderline: true,
        FontStrikethrough: true
      }
    let display = ''
    if (this.isRunMode) {
      display = controlProp.Visible ? controlProp.Width === 0 || controlProp.Height === 0 ? 'none' : 'grid' : 'none'
    } else {
      display = controlProp.Width === 0 || controlProp.Height === 0 ? 'none' : 'grid'
    }
    const alignItems = controlProp.Picture ? 'inherit' : 'center'
    if (controlProp.Picture) {
      Vue.nextTick(() => {
        this.labelAlignment()
      })
    }

    return {
      left: `${controlProp.Left}px`,
      width: `${controlProp.Width}px`,
      height: `${controlProp.Height}px`,
      top: `${controlProp.Top}px`,
      backgroundColor: controlProp.BackStyle
        ? controlProp.BackColor
        : 'transparent',
      borderColor: controlProp.BorderColor,
      textAlign:
        controlProp.TextAlign === 0
          ? 'left'
          : controlProp.TextAlign === 1
            ? 'center'
            : 'right',
      border: this.getBorderStyle,
      whiteSpace: controlProp.WordWrap ? 'pre-wrap' : 'pre',
      wordBreak: controlProp.WordWrap ? 'break-all' : 'normal',
      color:
        controlProp.Enabled === true ? controlProp.ForeColor : this.getEnabled,
      cursor: this.controlCursor,
      fontFamily: font.FontStyle! !== '' ? this.setFontStyle : font.FontName!,
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
      fontWeight: font.FontBold
        ? 'bold'
        : font.FontStyle !== ''
          ? this.tempWeight
          : '',
      fontStretch: font.FontStyle !== '' ? this.tempStretch : '',

      display: display,
      overflow: 'hidden',
      gridTemplateColumns: controlProp.Alignment === 1 ? '12px ' + `${controlProp.Width! - 12}px` : `${controlProp.Width! - 12}px` + ' 12px',
      gridTemplateRows: '100%',
      gap: '2px',
      alignContent: 'center',
      boxShadow: 'none',
      alignItems: alignItems
    }
  }

  get setAlignment () {
    return {
      editMode: this.isEditMode,
      caption: this.properties.Caption
    }
  }

  @Watch('setAlignment', { deep: true })
  editableTextVerify () {
    Vue.nextTick(() => {
      if (this.editableTextRef) {
        if (this.editableTextRef.$el.clientHeight > this.properties.Height!) {
          this.alignItem = true
        } else {
          this.alignItem = false
        }
      } else if (this.textSpanRef) {
        if (this.textSpanRef.clientHeight > this.properties.Height!) {
          this.alignItem = true
        } else {
          this.alignItem = false
        }
      } else {
        this.alignItem = false
      }
    })
  }

  /**
   * @override
   */
  @Watch('properties.AutoSize', { deep: true })
  autoSize () {
    this.editableTextVerify()
    this.updateAutoSize()
  }

  @Watch('properties.Font.FontSize', { deep: true })
  autoSizeValidateOnFontChange () {
    this.editableTextVerify()
    if (this.properties.AutoSize) {
      this.updateAutoSize()
    }
  }

  @Watch('properties.WordWrap', { deep: true })
  autoSizeValidateOnWordWrapChange () {
    this.editableTextVerify()
    if (this.properties.AutoSize) {
      this.updateAutoSize()
    }
  }

  @Watch('properties.Caption', { deep: true })
  autoSizeValidateOnCaptionChange () {
    this.editableTextVerify()
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
    this.editableTextVerify()
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
      this.editableTextVerify()
      if (this.properties.Picture) {
        this.positionLogo(this.properties.PicturePosition)
        this.pictureSize()
      }
    }
  @Watch('properties.Width')
  updateImageSizeWidth () {
    this.editableTextVerify()
    if (this.properties.Picture) {
      this.positionLogo(this.properties.PicturePosition)
      this.pictureSize()
    }
  }
  @Watch('properties.PicturePosition')
  updatePicturePosition () {
    this.editableTextVerify()
    if (this.properties.Picture) {
      this.positionLogo(this.properties.PicturePosition)
      if (this.properties.AutoSize) {
        this.updateAutoSize()
      }
    }
  }
  @Watch('properties.TextAlign')
  autoSizeOnTextAlignment () {
    this.editableTextVerify()
    if (this.properties.AutoSize) {
      this.updateAutoSize()
    }
  }
  @Watch('properties.BorderStyle')
  autoSizeOnBorderStyleChange () {
    this.editableTextVerify()
    if (this.properties.AutoSize) {
      this.updateAutoSize()
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
        if (this.properties.Caption === '') {
          this.updateDataModel({
            propertyName: 'Height',
            value: this.properties.Font!.FontSize! + 5
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
   * @description  sets controlSource if present and updates Value property
   * @function controlSource
   */
  mounted () {
    this.verifyValue()
    this.$el.focus()
    this.controlSource()
    if (this.properties.Picture) {
      this.positionLogo(this.properties.PicturePosition)
      this.pictureSize()
    }
  }
  releaseEditMode (event: KeyboardEvent) {
    this.$el.focus()
    this.setContentEditable(event, false)
  }
  checkBoxClick (event: MouseEvent) {
    if (this.toolBoxSelectControl === 'Select') {
      event.stopPropagation()
      if (this.isEditMode) {
        (this.editableTextRef.$el as HTMLSpanElement).focus()
      }
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.outer-check {
  height: 0px;
  width: 0px;
  left: 0px;
  top: 0px;
  background-color: rgb(238, 238, 238);
  box-shadow: -1px -1px gray;
  overflow: hidden;
  align-items: center;
  box-sizing: border-box;
}

.visually-hidden {
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

.control {
  display: inline-flex;
  position: sticky;
  top: 47%;
  align-self: center;
}

.control-indicator {
  width: 10px;
  height: 10px;
  margin: 1px;
  background-color: white;
  border: 1px inset grey;
}

 .trueImage {
  background-image: url(../../../../assets/checkmark.png);
  background-size: 8px;
  background-position: center;
  background-repeat: no-repeat;
 }

 .disabledImage {
  background-image: url(../../../../assets/checkmarkdisabled.png);
  background-size: 8px;
  background-position: center;
  background-repeat: no-repeat;
 }
.spanStyle {
  text-decoration: underline;
  text-underline-position: under;
}

.menu {
  width: 10%;
  margin: 0 auto;
}

.main {
  width: 90%;
  margin: 0 auto;
}

#logo{
 position: relative;
 display: inline-flex;
 justify-content: center;
 overflow: hidden;
}
#logo-main{
  display: flex;
  justify-content: center;
}
.spanClass {
  text-decoration: underline;
  text-decoration-skip-ink: none;
}
</style>
