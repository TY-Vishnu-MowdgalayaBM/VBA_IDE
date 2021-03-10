<template>
  <div>
    <div class="buttonIn grid-design">
      <input
        type="text"
        :name="name"
        class="color-input"
        :value="value"
        disabled= "true"
      />
      <button
        id="clear"
        :style="colorPalettesStyleObj"
        @mousedown.prevent="openColorPalette"
        @click="changeCount()"
      >
        _
      </button>
    </div>
    <div class="grid-design1">
      <div></div>
      <div class="outer-border">
        <div :style="colorPallete"
          class="tabs"
          ref="colorPalleteRef"
          tabindex="1"
          v-if="isVisible"
          @blur="hideColorPallete"
        >
          <div class="tab">
            <input
              class="tabinput"
              type="radio"
              id="color-1"
              name="tab-color-1"
              checked
            />
            <label for="color-1">Palette</label>
            <div class="content">
              <div class="grid-container">
                <div
                  class="grid-item1"
                  v-for="(color, i) in colors"
                  :key="i"
                  @click="selectColor(color)"
                  :style="selectedPallete(color.value)"
                ><div class="grid-inner"></div></div>
              </div>
            </div>
          </div>
          <div class="tab">
            <input
              class="tabinput"
              type="radio"
              id="color-2"
              name="tab-color-1"
              @click="handleDiv(divContainer)"
            />
            <label for="color-2">System</label>
            <div class="content">
              <div class="gridcontainer"
              ref="divContainer"
              @scroll="getScrollTop(divContainer)"
              >
                <div
                  class="gridcontainerStyle"
                  v-for="(color, i) in colorSystem"
                  :key="i"
                  :style="selectedColor(color.value)"
                  @click="selectColor(color, divContainer)"
                >
                  <span
                    class="griditem1"
                    :style="{ backgroundColor: color.value }"
                  ></span
                  > <div class="displayNameClass">{{ color.displayName }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { colors } from '../../../models/colors'
import { colorSystem } from '../../../models/colorSystem'
import { Component, Prop, Vue, Emit, Ref } from 'vue-property-decorator'
interface IColors {
  name: string;
  value: string;
}
interface ISelectedValue {
  name: string;
  value: string;
  displayName: string;
}
@Component({
  name: 'FDColorPalettes'
})
export default class FDColorPalettes extends Vue {
  @Prop() value: string;
  @Prop() name: string;
  @Ref('colorPalleteRef') readonly colorPalleteRef!: HTMLDivElement;
  @Ref('divContainer') readonly divContainer!: HTMLDivElement;

  private isVisible = false;
  top: number = 0
  left: number = 0
  colors: Array<IColors> = colors;
  colorSystem: Array<ISelectedValue> = colorSystem;
  selectedValue: ISelectedValue

  openColorPalette (event: MouseEvent) {
    this.top = event.y
    this.left = event.x
    if (this.isVisible === true) {
      this.isVisible = false
    } else if (this.isVisible === false) {
      this.isVisible = true
    }
    if (this.isVisible) {
      this.$nextTick(function () {
        this.colorPalleteRef.focus()
      })
    }
  }
  divscrollTop = 0
  count = 1
  handleDiv (divContainer: HTMLDivElement) {
    if (divContainer) {
      divContainer.scrollTop = this.divscrollTop
    }
  }
  getScrollTop (divContainer: HTMLDivElement) {
    if (divContainer) {
      this.divscrollTop = divContainer.scrollTop
    }
  }
  changeCount () {
    console.log(this.count)
  }
  selectedPallete (palleteColor: string) {
    if (this.value === palleteColor) {
      return {
        backgroundColor: palleteColor,
        border: '0.5px solid white',
        outline: '1px solid black'
      }
    } else {
      console.log('else of the selected color')
      return {
        backgroundColor: palleteColor
      }
    }
  }
  selectedColor (val: string) {
    let bgColor = ''
    let textColor = ''
    if (this.value === val) {
      bgColor = 'rgb(15 121 206)'
      textColor = 'white'
    } else {
      bgColor = ''
      textColor = ''
    }
    return {
      backgroundColor: bgColor,
      color: textColor
    }
  }

  selectColor (data: ISelectedValue) {
    this.selectedValue = data
    this.emitColorPalette(this.selectedValue.value, this.name)
    this.isVisible = !this.isVisible
  }

  hideColorPallete () {
    this.isVisible = false
  }

  @Emit('colorPalette')
  emitColorPalette (selectedValue: string, name: string) {
    return { propertyName: name, propertyValue: selectedValue }
  }
  get colorPalettesStyleObj () {
    return {
      height: '17px',
      width: '17px',
      padding: '0px',
      paddingLeft: '1px',
      paddingRight: '1px',
      border: '1px solid white',
      borderRightColor: 'gray',
      borderBottomColor: 'gray',
      borderLeftColor: 'lightgray',
      borderTopColor: 'lightgray',
      outline: 'none',
      marginLeft: '-2px'
    }
  }
  get colorPallete () {
    const height = 174
    const colorPalleteTop = window.innerHeight > (this.top + height + 12) ? this.top + 12 : this.top - height - 12
    const colorPaletteLeft = (this.left - 195) > 0 ? this.left - 195 : 0
    return {
      top: `${colorPalleteTop}px`,
      left: `${colorPaletteLeft}px`
    }
  }
}
</script>

<style scoped>
.grid-design {
  overflow: hidden;
  float: right;
  width: 100%;
  height: 17px;
}
.grid-design1 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: rgb(238, 238, 238);
  position: relative;
}
.color-input {
  border: none;
  outline: none;
  height: 14px;
  width: calc(100% - 20px);
}
.tabs {
  position: fixed;
  min-height: 174px;
  width: 204px;
  border: 1px solid gray;
  background-color: rgb(240, 240, 240);
  clear: both;
  z-index: 400;
  outline: none;
}
.tab {
  float: left;
}
.tab label {
  background: rgb(238, 238, 238);
  height: 12px;
  border: 1px solid lightgray;
  margin-left: -1px;
  position: relative;
  left: 1px;
  padding: 3px;
}
.tab [type="radio"] {
  display: none;
}
.content {
  position: absolute;
  top: 18px;
  left: 0;
  background: rgb(238, 238, 238);
  width: 200px;
  height: 152px;
  border: 1px solid rgb(238, 238, 238);
  box-shadow: 1px 1px gray;
  margin-top: 1px;
}
[type="radio"]:checked ~ label {
  background: white;
  border: 2px solid lightgray;
  z-index: 2;
}
[type="radio"]:unchecked ~ label {
  border: 0.5px solid white;
}
[type="radio"]:checked ~ label ~ .content {
  z-index: 1;
}
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto auto;
  width: 10px;
  padding: 10px;
}
.grid-item1 {
  border: 1px solid rgba(0, 0, 0, 0.8);
  width: 14px;
  height: 14px;
}
.grid-inner{
  width: 13px;
  height: 13px;
  border: 0.5px solid black;
}
.gridcontainer {
  height: 150px;
  border: 1px solid gray;
  overflow-y: scroll;
  font-size: 12px;
}
.griditem1 {
  border: 1px solid rgba(0, 0, 0, 0.8);
  width: 14px;
  height: 14px;
  text-align: center;
  vertical-align: middle;
  margin: 1px;
  display: inline-block;
  cursor: context-menu;
}
.gridcontainerStyle {
  cursor: "context-menu";
  vertical-align: super;
  display: grid;
  grid-template-columns: 20px auto;
}
.displayNameClass {
  position: relative;
  top: 2px;
}
</style>
