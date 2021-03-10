<template>
  <div @keydown.enter="updateFont"
    @keydown.esc="setFontDialogVisiblilty(false)"
    tabindex="1"
    ref="fontDialogRef">
    <div class="overlay" :style="fontStyleObj">
      <div
        class="font-div popup"
        :style="tabOrderDialogInitialStyle"
      >
        <div class="font-header" @mousedown.stop="dragTabOrderDialog">
          <span class="span-style">Font</span>
          <button class="ui-btn close" @click="setFontDialogVisiblilty(false)">
           <svg viewBox="0 0 10 10">
              <polygon
                points="10.2,0.7 9.5,0 5.1,4.4 0.7,0 0,0.7 4.4,5.1 0,9.5 0.7,10.2 5.1,5.8 9.5,10.2 10.2,9.5 5.8,5.1"
              />
            </svg>
          </button>
        </div>
        <hr class="hr" />
        <div class="font-body">
          <div class="wrapper">
            <div class="wrapper-1">
              <div>
                Font:
                <br />
                <input type="text" class="font-input-1" :value="this.font" @input="setFont"/>
                <br />
                <div class="font-first-frame">
                  <div
                    v-for="(value, i) of newFont"
                    :key="i"
                    @click="changeFont(i)"
                    :style="{
                      'font-family': i,
                      cursor: 'context-menu',
                      backgroundColor: font === i ? '#0000ff' : '',
                      color: font === i ? 'white' : 'black',
                    }"
                  >
                    {{ i }}
                  </div>
                </div>
              </div>
              <div>
                <div class="fieldset fieldDiv1">
                  <h1>
                    <span>Effects</span>
                  </h1>
                  <input
                    type="checkbox"
                    class="checkboxClass"
                    id="checkbox1"
                    name="StrikeOut"
                    value="StrikeOut"
                    @change="fontEffects"
                    v-model="isFontStrikeOut"
                  />
                  <label for="checkbox1">StrikeOut</label>
                  <br />
                  <input
                    type="checkbox"
                    id="checkbox2"
                    class="inputClass"
                    name="Underline"
                    value="Underline"
                    @change="fontEffects"
                    v-model="isFontUnderline"
                  />
                  <label for="checkbox2">Underline</label>
                </div>
              </div>
            </div>
            <div class="wrapper-2">
              <div class="wrapper-20">
                <div>
                  Font Style:
                  <br />
                  <input type="text" class="font-input-2" :value="fontStyle" @input="setFontStyle"/>
                  <br />
                  <div class="font-second-frame">
                    <div
                      v-for="(value, i) of temp"
                      :key="i"
                      :style="{
                        backgroundColor: fontStyle === value ? '#0000ff' : '',
                        color: fontStyle === value ? 'white' : 'black',
                        cursor: 'context-menu',
                        'font-family': font,
                        'font-weight': value.includes('Bold')
                          ? 'bold'
                          : value.includes('Black')
                          ? '900'
                          : value.includes('Light')
                          ? 'lighter'
                          : value.includes('SemiLight')
                          ? '300'
                          : value.includes('SemiBold')
                          ? '600'
                          : '',
                        'font-style': value.includes('Italic') ? 'italic' : '',
                        'font-stretch': value.includes('Narrow')
                          ? 'ultra-condensed'
                          : value.includes('SemiCondensed')
                          ? 'semi-condensed'
                          : value.includes('Condensed')
                          ? 'condensed'
                          : '',
                      }"
                      :ref="'fontStyleRef'.concat(value)"
                      :id="value"
                      @click="changeStyle(value)"
                    >
                      {{ value }}
                    </div>
                  </div>
                </div>
                <div>
                  Size:
                  <br />
                  <input type="number" class="font-input-3" :value="this.size" @keydown="validateELetter" @input="setFontSize"/>
                  <br />
                  <div class="font-third-frame">
                    <div v-for="size11 in size1" :key="size11">
                      <div
                        @click="sizeValue(size11)"
                        :style="{
                          backgroundColor: size === size11 ? '#0000ff' : '',
                          color: size === size11 ? 'white' : 'black',
                          cursor: 'context-menu',
                        }"
                      >
                        {{ size11 }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="wrapper-21">
                <div class="outerSample">
                <div class="fieldset fieldsetDiv">
                  <h1>
                    <span>Sample</span>
                  </h1>
                  <div class="SampleDiv">
                    <div class="sampleStyle" :style="sampleStyleObj">
                      AaBbYyZz
                    </div>
                  </div>
                </div>
              </div>
              </div>
              <div class="wrapper22">
                Script:
                <select class="scriptClass">
                  <option value="western">Western</option>
                  <option value="greek">Greek</option>
                  <option value="turkish">Turkish</option>
                  <option value="baltic">Baltic</option>
                  <option value="centralEuropean">CentralEuropean</option>
                  <option value="cyrillic">Cyrillic</option>
                  <option value="vietnamese">Vietnamese</option>
                </select>
              </div>
            </div>

            <div class="nested">
              <div class="blank-div"></div>
              <div class="nestedDivStyle">
                <button class="nestedButtonClass" @click="updateFont">
                  OK
                </button>
              </div>
              <div>
                <button
                  class="nestedButtonClass"
                  @click="setFontDialogVisiblilty(false)"
                >
                  Cancel
                </button>
              </div>
              <div class="blank-div"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { newFont } from '../../../models/newFont'
import { Component, Vue, Prop, Emit, Ref } from 'vue-property-decorator'
import FDSVGImage from '@/FormDesigner/components/atoms/FDSVGImage/index.vue'
import FdDialogDragVue from '@/api/abstract/FormDesigner/FdDialogDragVue'
import { EventBus } from '@/FormDesigner/event-bus'

export interface INewFont {
  [key: string]: string[];
}
@Component({
  name: 'FDFontDialog',
  components: {
    FDSVGImage,
    FdDialogDragVue
  }
})
export default class FDFontDialog extends FdDialogDragVue {
  @Prop() fontPropValue: font;
  @Prop() isOpen: boolean;
  @Ref('fontDialogRef') fontDialogRef!: HTMLDivElement;

  isFontStrikeOut: boolean = false;
  isFontUnderline: boolean = false;
  tabOrderDialogInitialStyle: ITabOrderDialogInitialStyle = {
    left: '450px',
    top: '20px'
  };
  size: number = 8;
  font: string = ''
  fontWeight: string = 'normal';
  fontStyle: string | undefined = 'Regular';
  fontStyle1: string = '';
  fontStretch: string = 'condensed';
  dataDecorator: string = '';
  size1: Array<number> = [
    8,
    10,
    11,
    12,
    14,
    16,
    18,
    20,
    22,
    24,
    26,
    28,
    36,
    48,
    72
  ];
  newFont: INewFont = newFont;
  temp: Array<string> = newFont.Arial;
  tempVal: font = {
    FontName: 'Arial',
    FontSize: 10,
    FontBold: false,
    FontItalic: false,
    FontUnderline: false,
    FontStrikethrough: false,
    FontStyle: 'Arial Narrow Italic'
  };
  validateELetter (event : KeyboardEvent) {
    if (['e', '-', '+'].includes(event.key)) {
      event.preventDefault()
    }
  }
  setFontSize (event : KeyboardEvent) {
    if (event.target instanceof HTMLInputElement) {
      if (event.target.value) {
        if (event.target.value.length > 5) {
          event.target.value = this.tempVal.FontSize!.toString()
        } else {
          const val = parseFloat(event.target.value)
          if (val !== 0) { this.sizeValue(val) }
        }
      }
    }
  }
  setFontStyle (event : KeyboardEvent) {
    if (event.target instanceof HTMLInputElement) {
      const val = event.target.value
      if (val) {
        for (let fontStyleValue of this.temp) {
          if (val === fontStyleValue) {
            this.tempVal.FontStyle = fontStyleValue
            this.changeStyle(val)
          }
        }
      }
    }
  }
  setFont (event : KeyboardEvent) {
    if (event.target instanceof HTMLInputElement) {
      const val = event.target.value
      if (val) {
        for (let fontNameValue in newFont) {
          if (val === fontNameValue) {
            this.tempVal.FontName = fontNameValue
            this.temp = this.newFont[val]
            this.changeStyle(this.newFont[val][0])
            this.changeFont(val)
          }
        }
      }
    }
  }
  sizeValue (data: number) {
    this.size = data
    this.tempVal.FontSize = this.size
  }
  fontEffects () {
    if (this.isFontStrikeOut === true && this.isFontUnderline === true) {
      this.dataDecorator = 'underline line-through'
    } else if (this.isFontStrikeOut === true) {
      this.dataDecorator = 'line-through'
    } else if (this.isFontUnderline === true) {
      this.dataDecorator = 'underline'
    } else {
      this.dataDecorator = ''
    }
    this.tempVal.FontStrikethrough = this.isFontStrikeOut
    this.tempVal.FontUnderline = this.isFontUnderline
  }
  changeFont (i: string) {
    this.temp = this.newFont[i]
    this.font = i
    this.tempVal.FontStyle = this.newFont[i][0]
    this.changeStyle(this.newFont[i][0])
  }
  changeStyle (value: string) {
    const refName = 'fontStyleRef'.concat(value)
    this.$nextTick(() => {
      const targetRef = this.$refs[refName]
      let fontRef = null
      if (targetRef instanceof Array) {
        fontRef = targetRef[0]
        if (fontRef instanceof HTMLDivElement) {
          this.fontStyle = value
          this.fontStyle1 = fontRef.style.fontStyle
          this.fontWeight = fontRef.style.fontWeight
          this.fontStretch = fontRef.style.fontStretch
          this.tempVal.FontName = fontRef.style.fontFamily
          this.tempVal.FontStyle = this.fontStyle
        } else {
          throw new Error('Expected div element but found different element')
        }
      } else {
        return undefined
      }
    })
  }
  validateFontSize (val: number) {
    if (val) {
      if (isNaN(val) || val.toString().indexOf('.') > -1) {
        EventBus.$emit('showErrorPopup', true, 'info', `Size must be a number.`)
        return false
      } else if (val < 0) {
        this.sizeValue(429466)
      } else if (val > 0 && val <= 429466) {
        this.sizeValue(val)
      }
    } else {
      this.tempVal.FontSize = this.tempVal.FontSize
    }
    return true
  }
  updateFont () {
    if (this.validateFontSize(this.tempVal.FontSize!)) {
      if (!this.tempVal.FontName) {
        this.tempVal.FontName = this.newFont[0][0]
      }
      if (!this.tempVal.FontStyle) {
        this.tempVal.FontStyle = this.newFont[this.tempVal.FontName][0]
      }
      if (this.fontWeight === 'bold' && this.fontStyle1 === 'italic') {
        this.tempVal.FontBold = true
        this.tempVal.FontItalic = true
      } else if (this.fontStyle1 === 'italic') {
        this.tempVal.FontBold = false
        this.tempVal.FontItalic = true
      } else if (this.fontWeight === 'bold') {
        this.tempVal.FontBold = true
        this.tempVal.FontItalic = false
      } else {
        this.tempVal.FontBold = false
        this.tempVal.FontItalic = false
      }
      this.emitFont(this.tempVal)
      this.setFontDialogVisiblilty(false)
    }
  }
  @Emit('emitFont')
  emitFont (tempVal: font) {
    return tempVal
  }

  @Emit('setFontDialogVisiblilty')
  setFontDialogVisiblilty (isFontDialogVisible: boolean) {
    return isFontDialogVisible
  }
  get fontStyleObj () {
    return {
      opacity: this.isOpen === true ? '1' : '0',
      visibility: this.isOpen === true ? 'visible' : 'hidden'
    }
  }
  get sampleStyleObj () {
    return {
      'font-family': `${this.font}`,
      'font-size': `${this.size}` + 'px',
      'font-style': `${this.fontStyle1}`,
      'font-weight': `${this.fontWeight}`,
      'font-stretch': `${this.fontStretch}`,
      'text-decoration': `${this.dataDecorator}`
    }
  }
  mounted () {
    this.tempVal = { ...this.fontPropValue }
    this.font = this.tempVal.FontName
    this.fontStyle = this.tempVal.FontStyle
    this.isFontStrikeOut = this.tempVal.FontStrikethrough!
    this.isFontUnderline = this.tempVal.FontUnderline!
    this.size = this.tempVal.FontSize!
    this.temp = this.newFont[this.font]
    this.fontEffects()
    this.fontDialogRef.focus()
  }
}
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-size: cover;
  height: 100vh;
}
.font-input {
  border: none;
  outline: none;
  height: 14px;
  width: calc(100% - 20px);
}
h1 {
  text-align: center;
  font-family: Tahoma, Arial, sans-serif;
  color: #06d85f;
  margin: 80px 0;
}

.span-style {
  position: absolute;
  left: 6px;
  top: 6px;
}

.box {
  overflow: hidden;
  float: right;
  width: 100%;
}

.outerSample {
  overflow: hidden;
}

.button {
  font-size: 1em;
  padding: 10px;
  color: #fff;
  border: 2px solid #06d85f;
  border-radius: 20px/50px;
  text-decoration: none;
  cursor: pointer;
}
.button:hover {
  background: #06d85f;
}

.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  visibility: hidden;
  opacity: 0;
  z-index: 110;
}
.overlay:target {
  visibility: visible;
  opacity: 1;
}

.popup {
  margin: 70px auto;
  background: #fff;
  border-radius: 5px;
  width: 30%;
  position: relative;
}

.popup h2 {
  margin-top: 0;
  color: #333;
  font-family: Tahoma, Arial, sans-serif;
}
.popup .close {
  position: absolute;
  right: 0px;
  font-weight: bold;
  text-decoration: none;
  color: #333;
}
.popup .close:hover {
  color: #06d85f;
}
.popup .content {
  max-height: 30%;
  overflow: auto;
}

@media screen and (max-width: 700px) {
  .box {
    width: 70%;
  }
  .popup {
    width: 70%;
  }
}

.wrapper {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-gap: 1em;
  padding-left: 10px;
  padding-top: 20px;
}
.wrapper-1 {
  margin-left: 0px;
  grid-template-columns: 1fr;
  font-style: bold;
}
.wrapper2 {
  grid-template-columns: 1fr 1fr;
  display: grid;
  /* grid-template-columns: repeat(2, 1fr); */
}

.wrapper-3 {
  margin-right: 10px;
}
.wrapper-20 {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 1em;
}
.wrapper-21 {
  grid-row: 2/3;
  margin-top: 33px;
}
.nested {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 12px 29px;
  margin-right: 10px;
}
.nested > button {
  height: 25px;
}
.font-div {
  position: absolute;
  height: 360px;
  width: 480px;
  border: 1px solid gray;
  background: rgb(238, 238, 238);
}
.font-header {
  background-color: rgb(255, 255, 255);
  height: 25px;
}
.font-body {
  font-size: 12px;
}
.font-input-1 {
  height: 13px;
  width: 147px;
  border: 1px solid white;
  box-shadow: -1px -1px grey;
  margin-left: 1px;
  margin-bottom: 3px;
  outline: none;
}
.font-input-2 {
  width: 127px;
  height: 13px;
  border: 1px solid white;
  box-shadow: -1px -1px grey;
  margin-left: 1px;
  margin-bottom: 3px;
  outline: none;
}
.font-input-3 {
  width: 60px;
  height: 13px;
  border: 1px solid white;
  box-shadow: -1px -1px grey;
  margin-left: 1px;
  margin-bottom: 3px;
  outline: none;
}
.font-first-frame {
  width: 150px;
  border: 1px solid white;
  box-shadow: -1px -1px grey;
  background: white;
  height: 88px;
  overflow-y: scroll;
  margin-left: 1px;
}
.font-second-frame {
  width: 130px;
  border: 1px solid white;
  box-shadow: -1px -1px grey;
  background: white;
  height: 88px;
  overflow-y: scroll;
  margin-left: 1px;
}
.font-third-frame {
  width: 63px;
  border: 1px solid white;
  box-shadow: -1px -1px grey;
  background: white;
  height: 88px;
  overflow-y: scroll;
  margin-left: 1px;
}

.fieldset {
  border: 0.5px groove threedface;
  border-top: none;
  padding: 0.5em;
  margin: 1em 2px;
}
.fieldset > h1 {
  font: 1em normal;
  margin: -1em -0.5em 0;
  grid-column: 2/4;
}
.fieldset > h1 > span {
  float: left;
  color: black;
}
.fieldset > h1:before {
  border-top: 2px groove threedface;
  content: " ";
  float: left;
  margin: 0.5em 2px 0 -1px;
  width: 0.75em;
}
.fieldset > h1:after {
  border-top: 2px groove threedface;
  content: " ";
  display: block;
  height: 1.5em;
  left: 2px;
  margin: 0 1px 0 0;
  overflow: hidden;
  position: relative;
  top: 0.5em;
}

.ui-btn {
  margin: 0;
  width: 33px;
  height: 25px;
  border: 0;
  outline: 0;
  background: transparent;
}
.ui-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}
.ui-btn.close {
  background: white;
}
.ui-btn:hover {
  background: #e81123;
  color: white;
}
.ui-btn svg path,
.ui-btn svg rect,
.ui-btn svg polygon {
  fill: white;
}
.ui-btn svg {
  width: 10px;
  height: 10px;
  stroke: gray;
}
.ui-btn svg:hover {
  width: 10px;
  height: 10px;
  stroke: white;
}
.sampleStyle {
  overflow: hidden;
  cursor: context-menu;
}
.hr {
  margin: 0;
}
.fieldDiv1 {
  height: 96px;
  margin-top: 33px;
}
.checkboxClass {
  width: 12px;
  margin-top: 0px;
}
.inputClass {
  width: 12px;
  margin-top: 0px;
}
.fieldsetDiv {
  width: 192px;
  height: 50px;
  margin: 0px;
  margin-top: 4px;
}
.sampleDiv {
  width: 192px;
  height: 48px;
  overflow: hidden;
}
.scriptClass {
  width: 210px;
}
.nestedDivStyle {
  height: 0px;
}
.nestedButtonClass {
  width: 100%;
  font-family: "Candara";
  font-weight: bold;
  font-size: 13px;
  box-shadow: 1px 1px;
  border-top-color: rgb(238, 238, 238);
  border-bottom-color: rgb(238, 238, 238);
  border-left-color: rgb(238, 238, 238);
  border-right-color: rgb(238, 238, 238);
  white-space: pre;
}
.nestedButtonClass {
  outline: 1px solid black;
}
</style>
