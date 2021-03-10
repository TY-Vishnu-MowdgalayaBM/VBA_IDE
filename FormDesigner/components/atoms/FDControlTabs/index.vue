<template>
  <div>
    <input
      :name="pageData.Name"
      type="radio"
      :checked="
        indexValue === data.properties.Value ? setValueEmit(indexValue) : false
      "
    />
    <label
      @mousedown="
        !getDisableValue(pageData.Enabled) && isChecked(indexValue, pageValue)
      "
      @keydown.delete.exact.stop="deleteMultiPageControl"
      :tabindex="0"
      :class="[
        data.properties.Style === 1
          ? data.properties.TabOrientation === 2
            ? indexValue === data.properties.Value
              ? 'active-item-button'
              : 'forLeft forButton'
            : indexValue === data.properties.Value
            ? 'active-item-button'
            : 'forButton'
          : data.properties.Style === 0
          ? data.properties.TabOrientation === 2
            ? indexValue === data.properties.Value
              ? 'active-item-tab-left'
              : 'forLeft'
            : indexValue === data.properties.Value
            ? 'active-item-tab'
            : 'forTab'
          : '',
      ]"
      :for="pageData.ID"
      :title="
        data.type === 'TabStrip' ? pageData.ToolTip : pageData.ControlTipText
      "
      :style="[
        styleLabelObj,
        {
          color:
            data.type !== 'TabStrip'
              ? setForeColor(pageData.Enabled)
              : setForeColor(data.properties.Enabled),
          display: data.type !== 'TabStrip' ? setVisible(pageData.Visible) : '',
        },
      ]"
    >
      <span v-if="pageData.Caption === ''" :style="emptyTabWidth"
        ><p></p
      ></span>
      <span class="caption-span" v-else-if="pageData.Accelerator === ''"
        >{{ pageData.Caption }}
      </span>
      <span class="caption-span" v-else
        ><span>{{
          pageData.Caption | afterbeginCaption(pageData.Accelerator)
        }}</span>
        <span class="spanClass">{{
          pageData.Caption | acceleratorCaption(pageData.Accelerator)
        }}</span>
        <span>{{
          pageData.Caption | beforeendCaption(pageData.Accelerator)
        }}</span></span
      >
    </label>
  </div>
</template>

<script lang="ts">
import { controlProperties } from '@/FormDesigner/controls-properties'
import {
  Component,
  Prop,
  Vue,
  Emit
} from 'vue-property-decorator'

@Component({
  name: 'FDControlTabs',
  filters: {
    afterbeginCaption (value: string, acc: string = '') {
      if (acc !== '') {
        acc = acc[0]
      } else {
        return undefined
      }
      const data = controlProperties.acceleratorProp(value, acc)
      return data.afterbeginCaption
    },
    acceleratorCaption (value: string, acc: string = '') {
      if (acc !== '') {
        acc = acc[0]
      } else {
        return undefined
      }
      const data = controlProperties.acceleratorProp(value, acc)
      return data.acceleratorCaption
    },
    beforeendCaption (value: string, acc: string = '') {
      if (acc !== '') {
        acc = acc[0]
      } else {
        return undefined
      }
      const data = controlProperties.acceleratorProp(value, acc)
      return data.beforeendCaption
    }
  }
})
export default class FDControlTabs extends Vue {
  @Prop() data: controlData;
  @Prop() pageValue: string;
  @Prop() indexValue: number;
  @Prop() pageData: controlData;
  @Prop() isRunMode: boolean;
  @Prop() isEditMode: boolean;
  @Prop() isItalic: boolean;
  @Prop() tempStretch: string;
  @Prop() controlCursor: string;
  @Prop() tempWeight: string;
  @Prop() getMouseCursorData: string;
  @Prop() setFontStyle: string;
  @Prop() tempWidth: number;

  /**
   * @description getDisableValue checks for the RunMode of the control and then returns after checking for the Enabled
   * and the Locked property
   * @function getDisableValue
   */
  getDisableValue (enabledValue: boolean) {
    if (this.isRunMode) {
      if (!this.data.properties.Enabled) {
        return true
      } else {
        return !enabledValue
      }
    } else if (this.isEditMode) {
      return false
    }
  }

  @Emit('setValue')
  setValueEmit (indexValue: number) {
    return indexValue
  }

  @Emit('isChecked')
  isChecked (indexValue: number, pageValue: string) {
    return {
      indexValue,
      pageValue
    }
  }

  @Emit('emitRef')
  emitRef (indexValue: number) {
    return indexValue
  }

  /**
   * @description setVisible checks for the RunMode of the control and then returns after checking for the Visible property
   * @function setVisible
   */
  setVisible (visibleValue: boolean) {
    if (this.isRunMode) {
      if (visibleValue) {
        return 'flex'
      } else {
        return 'none'
      }
    } else {
      return 'flex'
    }
  }

  get emptyTabWidth () {
    const controlProp = this.data.properties
    return {
      width: controlProp.TabOrientation === 2 || controlProp.TabOrientation === 3 ? this.tempWidth + 'px' : ''
    }
  }
  /**
   * @description setVisible checks for the RunMode of the control and then returns after checking for the Enabled property
   * @function setForeColor
   */
  setForeColor (enabledValue: boolean) {
    if (this.isRunMode) {
      if (this.data.properties.Enabled) {
        if (enabledValue) {
          return this.data.properties.ForeColor
        } else {
          return 'rgba(220, 220, 220, 1)'
        }
      } else {
        return 'rgba(220, 220, 220, 1)'
      }
    } else {
      if (enabledValue) {
        return this.data.properties.ForeColor
      } else {
        return 'rgba(220, 220, 220, 1)'
      }
    }
  }

  /**
   * @description style object is passed to :style attribute in div tag
   * dynamically changing the styles of the component based on data
   * @function styleLabelObj
   *
   */
  protected get styleLabelObj () {
    const controlProp = this.data.properties
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
    return {
      height:
        controlProp.TabFixedHeight! > 0
          ? controlProp.TabFixedHeight + 'px'
          : '',
      width:
        controlProp.TabFixedWidth! > 0
          ? controlProp.TabFixedWidth + 'px'
          : controlProp.TabOrientation === 2 || controlProp.TabOrientation === 3
            ? this.tempWidth + 'px'
            : '',
      minWidth: controlProp.TabOrientation === 2 || controlProp.TabOrientation === 3 ? controlProp.TabFixedWidth !== 0 ? '0px' : '30px' : '0px',
      top: controlProp.TabOrientation === 1 ? '5px' : '0px',
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
      direction: 'ltr',
      fontStretch: font.FontStyle !== '' ? this.tempStretch : '',
      cursor: this.controlCursor,
      backgroundColor:
        this.indexValue === this.data.properties.Value!
          ? controlProp.Style === 1
            ? 'gray'
            : ''
          : '',
      paddingTop: controlProp.TabFixedHeight! > 0 && controlProp.TabOrientation === 1 ? (this.indexValue === this.data.properties.Value ? '15px' : '11px') : controlProp.TabFixedHeight! > 0 && controlProp.TabOrientation !== 0 ? (this.indexValue === this.data.properties.Value ? '0px' : '4px') : this.indexValue === this.data.properties.Value ? '5px' : '1px',
      paddingBottom: controlProp.Style !== 1 ? controlProp.TabFixedHeight! > 0 ? '0px' : '9px' : '',
      marginTop:
        this.data.properties.TabOrientation === 1
          ? this.indexValue === this.data.properties.Value
            ? ''
            : '0px'
          : this.data.properties.TabOrientation === 0
            ? this.indexValue === this.data.properties.Value
              ? ''
              : '5px'
            : '',
      borderTop: '2px solid white',
      borderRight:
        this.data.properties.TabOrientation === 2 ? '0px' : '2px solid gray',
      borderBottom:
        this.data.properties.TabOrientation === 2 ||
        this.data.properties.TabOrientation === 3
          ? '2px solid gray'
          : this.data.properties.TabOrientation === 1
            ? this.data.type === 'TabStrip'
              ? '6px solid gray'
              : '2px solid gray'
            : 'none',
      marginBottom:
        this.data.type === 'MultiPage'
          ? this.data.properties.TabOrientation === 1
            ? this.indexValue === this.data.properties.Value
              ? '4px'
              : '6px'
            : ''
          : '',
      borderRadius: '3px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }
  @Emit('deleteMultiPageControl')
  deleteMultiPageControl (event: KeyboardEvent) {
    return event
  }
}
</script>

<style>
.forButton {
  margin: 3px;
  border-radius: 3px;
  z-index: 2;
  border: 2px outset !important;
  overflow: hidden;
}
.page [type="radio"]:checked ~ label.forButton {
  margin: 3px;
  border-right: 2px solid gray;
  border-bottom: none;
  border-radius: 3px;
  z-index: 2;
  background: gray;
}
.active-item-button {
  margin: 3px;
  margin-bottom: 6px !important;
  border-right: 2px solid gray;
  border-bottom: none;
  border-radius: 3px;
  z-index: 2;
  background-color: gray;
  border: 2px inset !important;
  overflow: hidden;
}
.forLeft {
  border-bottom: none;
  border-radius: 3px;
  width: fit-content;
  overflow: hidden;
  padding-top: 8px;
  padding-bottom: 0px;
}
.page [type="radio"]:checked ~ label.forLeft {
  border-bottom: 2px solid gray;
  border-radius: 3px;
  z-index: 2;
}
.forTab {
  border-bottom: none;
  border-radius: 3px;
  overflow: hidden;
}
.page [type="radio"]:checked ~ label.forTab {
  border-right: 2px solid gray;
  border-bottom: none;
  border-radius: 3px;
  z-index: 2;
}
.page label {
  background-color: rgb(238, 238, 238);
  display: flex;
  padding: 5px 5px 5px 5px;
  cursor: default;
  position: relative;
  top: 0px;
}
.active-item-tab {
  border-right: 2px solid gray;
  border-bottom: none;
  border-radius: 3px;
  overflow: hidden;
}
.active-item-tab-left {
  border-bottom: 2px solid gray;
  border-radius: 3px;
  z-index: 2;
  overflow: hidden;
}
.page [type="radio"]:checked ~ label ~ .content {
  z-index: 1;
}
.page [type="radio"] {
  display: none;
}
.spanClass {
  text-decoration: underline;
}
:focus {
  outline: none;
}
.caption-span {
  white-space: pre;
}
</style>
