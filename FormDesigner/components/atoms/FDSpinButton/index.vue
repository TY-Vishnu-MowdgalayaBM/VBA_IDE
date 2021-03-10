<template>
  <div
  @mousedown="controlEditMode"
  :tabindex="properties.TabIndex"
  @keydown.enter="setContentEditable($event, true)"
  @keydown.esc="setContentEditable($event, false)"
  v-on="eventStoppers()"
  >
<div
      class="outerSpinDiv"
      :class="classStyle"
      :style="styleObj"
      :title="properties.ControlTipText"
      @click="spinButtonClick"
    >
      <div
        @mousedown="
          !getDisableValue
            ? checkOtherOrientations()
              ? increaseTheValue((isClicked = true))
              : decreaseTheValue((isClicked = true))
            : ''
        "
        @mouseup="setIsSpinButtonScrollBarMouseDown"
        @mouseout="setIsSpinButtonScrollBarMouseDown"
      >
        <button
          class="button-element-top"
          :style="styleButton"
          :runmode="getDisableValue"
          @blur="isClicked = false"
          @mouseover="updateMouseCursor"
        >
          <div v-if="checkOtherOrientations()" :style="svgOuterDivObj">
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" :style="svgStyleObj" :height="(properties.Height/2 > 60 && properties.Height < 850) ? properties.Height/2 - 45 : properties.Height >= 850 ? 425 : 15" :width="(properties.Width/2 > 60 && properties.Width < 850) ? properties.Width/2 - 45  : properties.Width >= 850 ? 425 : 15"
        viewBox="0 0 810.000000 460.000000"
        preserveAspectRatio="xMidYMid meet">
          <g :fill="properties.Enabled?properties.ForeColor:'rgb(200,200,200)'"
          transform="translate(0.000000,460.000000) scale(0.100000,-0.100000)"
          stroke="none">
          <path d="M2055 2320 c-1089 -1254 -1980 -2288 -1980 -2298 0 -16 213 -17 3975
          -17 3525 0 3975 2 3977 15 5 23 -3942 4574 -3969 4578 -19 2 -357 -382 -2003
          -2278z"/>
          </g>
      </svg>
          </div>
          <div v-else :style="svgDivObj">
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" :style="svgStyleObj" id="la" class="leftRightArrow"
        viewBox="0 0 460.000000 810.000000"  :height="(properties.Height/2 > 60 && properties.Height < 850) ? properties.Height/2 - 45 : properties.Height >= 850 ? 425 : 15" :width="(properties.Width/2 > 60 && properties.Width < 850) ? properties.Width/2 - 45  : properties.Width >= 850 ? 425 : 15"
        preserveAspectRatio="xMidYMid meet">
          <g :fill="properties.Enabled?properties.ForeColor:'rgb(200,200,200)'"
          transform="translate(0.000000,810.000000) scale(0.100000,-0.100000)"
          stroke="none">
            <path d="M2285 6055 c-1874 -1623 -2280 -1980 -2280 -2000 0 -20 408 -378
             2280 -2005 1254 -1089 2287 -1979 2295 -1977 13 2 15 452 15 3977 0 3525 -2
             3975 -15 3977 -8 2 -1041 -886 -2295 -1972z"/>
          </g>
        </svg>
          </div>
        </button>
      </div>
      <div
        @mousedown="
          !getDisableValue
            ? checkOtherOrientations()
              ? decreaseTheValue((isClicked = true))
              : increaseTheValue((isClicked = true))
            : ''
        "
        @mouseup="setIsSpinButtonScrollBarMouseDown"
        @mouseout="setIsSpinButtonScrollBarMouseDown"
      >
        <button
          class="button-element-bottom"
          :style="styleButton"
          :runmode="getDisableValue"
          @blur="isClicked = false"
          @mouseover="updateMouseCursor"
        >
          <div v-if="checkOtherOrientations()" :style="svgOuterDivObj">
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" :style="svgStyleObj" :height="(properties.Height/2 > 60 && properties.Height < 850) ? properties.Height/2 - 45 : properties.Height >= 850 ? 425 : 15" :width="(properties.Width/2 > 60 && properties.Width < 850) ? properties.Width/2 - 45  : properties.Width >= 850 ? 425 : 15"
        viewBox="0 0 810.000000 460.000000"
        preserveAspectRatio="xMidYMid meet">
          <g :fill="properties.Enabled?properties.ForeColor:'rgb(200,200,200)'"
          transform="translate(0.000000,460.000000) scale(0.100000,-0.100000)"
          stroke="none">
          <path d="M74 4585 c-4 -8 0 -23 7 -32 8 -9 897 -1036 1977 -2282 1612 -1862
          1967 -2266 1987 -2266 20 0 378 408 2005 2280 1089 1254 1979 2287 1977 2295
          -2 13 -453 15 -3975 18 -3540 2 -3973 0 -3978 -13z"/>
          </g>
      </svg>
          </div>
          <div v-else :style="svgDivObj">
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" :style="svgStyleObj" id="ra" class="leftRightArrow" :height="(properties.Height/2 > 60 && properties.Height < 850) ? properties.Height/2 - 45 : properties.Height >= 850 ? 425 : 15" :width="(properties.Width/2 > 60 && properties.Width < 850) ? properties.Width/2 - 45  : properties.Width >= 850 ? 425 : 15"
        viewBox="0 0 460.000000 810.000000"
        preserveAspectRatio="xMidYMid meet">
          <g :fill="properties.Enabled?properties.ForeColor:'rgb(200,200,200)'"
          transform="translate(0.000000,810.000000) scale(0.100000,-0.100000)"
          stroke="none">
            <path d="M5 8018 c-3 -7 -4 -1797 -3 -3978 3 -3515 5 -3965 18 -3967 8 -2
            1041 886 2295 1972 1874 1623 2280 1980 2280 2000 0 20 -408 378 -2280 2004
            -1254 1090 -2286 1981 -2293 1981 -7 0 -15 -6 -17 -12z"/>
            </g>
      </svg>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Emit, Mixins } from 'vue-property-decorator'
import FdControlVue from '@/api/abstract/FormDesigner/FdControlVue'
import { controlProperties } from '@/FormDesigner/controls-properties'
export interface IOrientationvalues {
  orientation?: number;
  width?: number;
  height?: number;
}

@Component({
  name: 'FDSpinButton',
  components: {
  }
})
export default class FDSpinButton extends Mixins(FdControlVue) {
  getForeColor: string = '';
  isClicked: boolean = false;
  classStyle: string = 'spin';
  orientedValue: boolean = true;
  svgWidth: number = 0;
  $el: HTMLDivElement
  get svgStyleObj () {
    const controlProp = this.properties
    return {
      position: 'relative',
      // top: !this.checkOtherOrientations ? '-' + this.svgHeightCalculate() + 'px' : '',
      width: this.svgWidthCalculate + 'px',
      height: this.svgHeightCalculate + 'px',
      minHeight: controlProp.Height! >= 5 ? '3px' : '0px'
    }
  }
  get svgOuterDivObj () {
    return {
      height: '21px'
    }
  }
  get svgDivObj () {
    const controlProp = this.properties
    return {
      position: 'relative',
      top: !this.checkOtherOrientations() ? this.svgDivTopCalculate + 'px' : '',
      height: this.checkOtherOrientations() ? this.svgDivHeightCalculate + 'px' : ''
    }
  }

  get svgDivHeightCalculate () {
    const controlProp = this.properties
    if (controlProp.Height! < 46) {
      return controlProp.Height! / 2
    }
  }
  get svgDivTopCalculate () {
    const controlProp = this.properties
    if (controlProp.Height! < 15) {
      return -2
    } else {
      return 0
    }
  }

  get svgWidthCalculate () {
    const controlProp = this.properties
    if (this.checkOtherOrientations()) {
      if (controlProp.Width! < 20 && controlProp.Width! > 5) {
        return controlProp.Width! - 5
      } else {
        return 15
      }
    } else {
      if (controlProp.Width! < 70 && controlProp.Width! > 15) {
        return controlProp.Width! / 5
      } else if (controlProp.Width! <= 15 && controlProp.Width! >= 10) {
        return 1
      } else if (controlProp.Width! < 10) {
        return 0
      } else {
        return 15
      }
    }
  }

  get svgHeightCalculate () {
    const controlProp = this.properties
    if (this.checkOtherOrientations()) {
      if (controlProp.Height! < 46 && controlProp.Height! > 15) {
        return controlProp.Height! / 5
      } else if (controlProp.Height! <= 15 && controlProp.Height! >= 10) {
        return 1
      } else if (controlProp.Height! < 10) {
        return 0
      } else {
        return 15
      }
    } else {
      if (controlProp.Height! < 25) {
        return controlProp.Height! - 10
      } else {
        return 15
      }
    }
  }

  /**
   * @description getDisableValue checks for the RunMode or the EditMode of the control and then returns after checking for the Enabled  property
   * @function getDisableValue
   */
  get getDisableValue () {
    if (this.isRunMode) {
      return this.properties.Enabled === false
    } else if (this.isActivated || this.isEditMode) {
      return false
    } else {
      return true
    }
  }

  setSvgWidth () {
    if (this.properties.Width! / this.properties.Height! < 6) {
      this.svgWidth = this.properties.Width! / 10
      return this.svgWidth - 20
    } else {
      return this.svgWidth - 20
    }
  }

  /**
   * @description style object is passed to :style attribute in div tag
   * dynamically changing the styles of the component based on properties
   * @function styleObj
   *
   */
  protected get styleObj (): Partial<CSSStyleDeclaration> {
    const controlProp = this.properties
    let display = ''
    if (this.isRunMode) {
      display = controlProp.Visible ? controlProp.Width === 0 || controlProp.Height === 0 ? 'none' : '' : 'none'
    } else {
      display = controlProp.Width === 0 || controlProp.Height === 0 ? 'none' : ''
    }
    return {
      ...this.baseStyle,
      overflow: 'hidden',
      left: `${controlProp.Left}px`,
      width: `${controlProp.Width}px`,
      height: `${controlProp.Height}px`,
      top: `${controlProp.Top}px`,
      backgroundColor: controlProp.BackColor,
      display: display
    }
  }

  /**
   * @description style object is passed to :style attribute in button tag
   * dynamically changing the styles of the component based on properties
   * @function styleButton
   *
   */
  protected get styleButton (): Partial<CSSStyleDeclaration> {
    const controlProp = this.properties
    return {
      ...this.baseStyle,
      backgroundColor: controlProp.BackColor,
      overflow: 'hidden',
      cursor: this.controlCursor,
      display:
        controlProp.Visible && this.isRunMode
          ? 'flex'
          : controlProp.Visible === false && this.isRunMode
            ? 'none'
            : 'flex',
      outline: controlProp.Enabled
        ? this.isClicked
          ? '1px solid black'
          : 'none'
        : 'none',
      outlineOffset: this.isClicked ? '-5px' : '-5px',
      width: '100%',
      height: !this.checkOtherOrientations() ? `${controlProp.Height}px` : `${controlProp.Height! / 2}px`,
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0px'
    }
  }

  /**
   * @description changes the syling of the SpinButton based on the values of the getter orientedValues
   * @function checkOrientation
   *
   */
  @Watch('orientationValues', { deep: true })
  checkOrientation (newVal: IOrientationvalues, oldVal: IOrientationvalues) {
    if (newVal.orientation === 1) {
      this.classStyle = 'spin'
    } else if (newVal.orientation === 2) {
      this.classStyle = 'spin-oriented'
    } else {
      this.orientedValue = this.checkOtherOrientations()
      if (this.orientedValue) {
        this.classStyle = 'spin'
      } else {
        this.classStyle = 'spin-oriented'
      }
    }
  }

  /**
   * @description checkOtherOrientations returns string value from
   * controlProperties.controlsOrientationProp
   * @function checkOtherOrientations
   * @returns boolean value
   * @override
   */
  checkOtherOrientations (): boolean {
    return controlProperties.controlsOrientationProp(this.data)
  }

  /**
   * @description orientationValues is the getter used for all the values that affect the Orientation property
   *  @function orientationValues
   */
  get orientationValues () {
    return {
      orientation: this.properties.Orientation,
      width: this.properties.Width,
      height: this.properties.Height
    }
  }

  mounted () {
    this.$el.focus()
    if (this.properties.Orientation === 0) {
      this.orientationValues.orientation = 0
      this.orientationValues.width = 0
      this.orientationValues.height = 0
      const newValues:IOrientationvalues = this.orientationValues
      this.checkOrientation(newValues, this.orientationValues)
    }
  }
  eventStoppers () {
    const eventStop = (event: Event) => event.stopPropagation()
    return this.isEditMode === false ? null : {
      keydown: eventStop
    }
  }
  spinButtonClick (event: MouseEvent) {
    if (this.toolBoxSelectControl === 'Select') {
      event.stopPropagation()
    }
  }
}
</script>

<style lang="scss" scoped>
.spin {
  display: grid;
  grid-template-columns: 1fr;
  box-sizing: border-box;
}
.spin-oriented {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.outerSpinDiv {
  width: 0px;
  height: 0px;
  left: 0px;
  top: 0px;
}
.button-element-top {
  border-color: lightgrey;
}

.button-element-bottom {
  border-color: lightgrey;
}
:focus {
  outline: none;
}
.button-element-top[runmode]:active {
  border-style: outset !important;
}
.button-element-bottom[runmode]:active {
  border-style: outset !important;
}
</style>
