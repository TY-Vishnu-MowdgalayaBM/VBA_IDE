<template>
  <div class="inner-userform-window" :style="innerWindowStyle">
    <div class="inner-userform-header">
      <div class="innerWindowHeaderStyle" :style="innerWindowHeaderStyle">
          {{ properties.Caption }}
      </div>
      <div>
        <button class="ui-btn close closeButton">
          <FDSVGImage name="close-button.svg" />
        </button>
      </div>
    </div>
    <div :style="innerWindowBody">
    <div
      class="inner-window-content"
      :style="innerWindowBodyStyle"
      @contextmenu.stop="showContextMenu($event, userFormId, controlId, 'container')"
      ref="innerUserForm"
      @scroll="updateScrollingLeftTop"
    >
      <Container
        class="container"
        :style="containerStyleObj"
        :userFormId="userFormId"
        :controlId="controlId"
        :containerId="controlId"
        :isEditMode="true"
        :getScrollBarX="getScrollBarX"
        :getScrollBarY="getScrollBarY"
        ref="containerRef"
        :mouseCursorData="getMouseCursorData"
        :getSampleDotPattern="getSampleDotPattern"
        :createBackgroundString="createBackgroundString"
        :getSizeMode="getSizeMode"
        :getRepeatData="getRepeatData"
        :getPosition="getPosition"
        @deActiveControl="deActControl"
        @dragSelectorControl="dragSelectorControl"
        @addControlObj="addContainerControl"
      >
      </Container>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Ref, Watch, Mixins } from 'vue-property-decorator'
import Container from '@/FormDesigner/components/organisms/FDContainer/index.vue'
import { State, Action } from 'vuex-class'
import FDSVGImage from '@/FormDesigner/components/atoms/FDSVGImage/index.vue'
import { controlProperties } from '@/FormDesigner/controls-properties'
import FdContainerVue from '@/api/abstract/FormDesigner/FdContainerVue'
import { IupdateControl } from '@/storeModules/fd/actions'
import { EventBus } from '@/FormDesigner/event-bus'
@Component({
  name: 'UserForm',
  components: {
    FDSVGImage,
    Container
  }
})
export default class UserForm extends FdContainerVue {
  @Ref('containerRef') readonly containerRef!: Container;
  @Ref('innerUserForm') readonly innerUserForm!: HTMLDivElement;
  @Action('fd/updateControl') updateControl!: (payload: IupdateControl) => void;

  innerWindowFocused: boolean = false;
  innerWindowFocus (value: boolean) {
    this.innerWindowFocused = value
  }
  mounted () {
    this.scrollLeftTop(this.data)
  }
  @Watch('properties.ScrollLeft', { deep: true })
  updateScrollLeft () {
    this.scrollLeftTop(this.data)
  }

  @Watch('properties.ScrollTop', { deep: true })
  updateScrollTop () {
    this.scrollLeftTop(this.data)
  }

  /**
   * @description Returns string value for CSS background style
   * @function createBackgroundString
   *
   */
  protected get createBackgroundString () {
    return `url(${this.properties.Picture})`
  }

  protected get getSampleDotPattern () {
    const dotSize = 13
    const dotSpace = 9
    return {
      backgroundPosition: `${dotSize}px ${dotSize}px`,
      backgroundImage: `radial-gradient(${this.properties.ForeColor} 11%, transparent 10%)`,
      backgroundSize: `${dotSpace}px ${dotSpace}px`
    }
  }

  /**
   * @description sets scrollbar left and top position
   * @function scrollLeftTop
   * @param controlData propControlData passed as input
   */
  scrollLeftTop (controlData: controlData) {
    const refName: IScrollRef = this.innerUserForm
    const scrollLeft: number = this.properties.ScrollLeft!
    const scrollTop: number = this.properties.ScrollTop!
    if (scrollLeft > 0) {
      refName.scrollLeft = scrollLeft
    }
    if (scrollTop > 0) {
      refName.scrollTop = scrollTop
    }
  }
  /**
   * @description style object to dynamically changing the styles of the component based on propControlData
   * @function innerWindowStyle
   *
   */
  protected get innerWindowStyle (): Partial<CSSStyleDeclaration> {
    return {
      margin: '5px',
      left: `${this.properties.Left}px`,
      width: `${this.properties.Width}px`,
      height: `${this.properties.Height}px`,
      top: `${this.properties.Top}px`
    }
  }
  protected get innerWindowBody (): Partial<CSSStyleDeclaration> {
    return {
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundColor: this.properties.BackColor
    }
  }

  protected get containerStyleObj (): Partial<CSSStyleDeclaration> {
    const scale = (this.properties.Zoom!) / 100
    return {
      width: 'calc(100% - 2px)',
      height: 'calc(100% - 2px)',
      borderLeft: this.data.properties.BorderStyle === 1 ? '1px solid ' + this.data.properties.BorderColor : this.data.properties.SpecialEffect === 2 ? '2px solid gray' : this.data.properties.SpecialEffect === 3 ? '1.5px solid gray' : this.data.properties.SpecialEffect === 4 ? '0.5px solid gray' : '',
      borderRight: this.data.properties.BorderStyle === 1 ? '1px solid ' + this.data.properties.BorderColor : this.data.properties.SpecialEffect === 1 ? '2px solid gray' : this.data.properties.SpecialEffect === 4 ? '1.5px solid gray' : this.data.properties.SpecialEffect === 3 ? '0.5px solid gray' : '',
      borderTop: this.data.properties.BorderStyle === 1 ? '1px solid ' + this.data.properties.BorderColor : this.data.properties.SpecialEffect === 2 ? '2px solid gray' : this.data.properties.SpecialEffect === 3 ? '1.5px solid gray' : this.data.properties.SpecialEffect === 4 ? '0.5px solid gray' : '',
      borderBottom: this.data.properties.BorderStyle === 1 ? '1px solid ' + this.data.properties.BorderColor : this.data.properties.SpecialEffect === 1 ? '2px solid gray' : this.data.properties.SpecialEffect === 4 ? '1.5px solid gray' : this.data.properties.SpecialEffect === 3 ? '0.5px solid gray' : '',
      borderColor: this.data.properties.BorderStyle === 1 ? this.data.properties.BorderColor : '',
      transform: `scale(${scale})`,
      transformOrigin: `top left`
    }
  }
  protected get innerWindowBodyStyle (): Partial<CSSStyleDeclaration> {
    const font: font = this.properties.Font
      ? this.properties.Font
      : {
        FontName: 'Arial',
        FontSize: 10
      }
    const scale = (this.properties.Zoom! * 10) / 100
    const controlProp = this.properties
    return {
      cursor:
        this.properties.MousePointer !== 0 || this.properties.MouseIcon !== ''
          ? `${this.getMouseCursorData} !important`
          : 'default !important',
      fontFamily: font.FontStyle ? font.FontStyle : font.FontName,
      fontSize: `${font.FontSize}px`,
      fontStyle: font.FontItalic ? 'italic' : '',
      textDecoration:
        font.FontStrikethrough === true && font.FontUnderline === true
          ? 'underline line-through'
          : font.FontUnderline
            ? 'underline'
            : font.FontStrikethrough
              ? 'line-through'
              : '',
      fontWeight: font.FontBold ? 'bold' : ''
    }
  }

  updateScrollingLeftTop (e: MouseEvent) {
    const refName = this.innerUserForm
    this.updateControl({
      userFormId: this.userFormId,
      controlId: this.controlId,
      propertyName: 'ScrollLeft',
      value: refName.scrollLeft
    })
    this.updateControl({
      userFormId: this.userFormId,
      controlId: this.controlId,
      propertyName: 'ScrollTop',
      value: refName.scrollTop
    })
  }

  dragSelectorControl (event: MouseEvent) {
    this.selectedControlArray = []
    this.selectedAreaStyle = this.containerRef.dragSelector.selectAreaStyle
    this.calSelectedAreaStyle(event, this.data)
  }

  showContextMenu (e: MouseEvent, parentID: string, controlID: string, type: string, mode: boolean) {
    EventBus.$emit('contextMenuDisplay', event, parentID, controlID, type, mode)
  }
  created () {
    EventBus.$on('selectMultipleCtrl', (val: boolean) => {
      this.selMultipleCtrl = val
    })
    EventBus.$on('actMultipleCtrl', (val: boolean) => {
      this.activateCtrl = val
    })
  }
  destroyed () {
    EventBus.$off('selectMultipleCtrl')
    EventBus.$off('actMultipleCtrl')
  }
  get innerWindowHeaderStyle () {
    return {
      textAlign: this.properties.RightToLeft ? 'right' : 'left',
      direction: this.properties.RightToLeft ? 'rtl' : 'ltr'
    }
  }
  deActControl () {
    this.deActiveControl()
  }
  addContainerControl (event: MouseEvent) {
    this.addControlObj(event, this.controlId)
  }
}
</script>

<style scoped>
.inner-userform-window {
  display: flex;
  flex-direction: column;
  outline: 1px solid lightslategray;
  outline-style: auto;
  position: relative;
  border: 5px solid rgba(153,180,209);
  border-radius: 5px;
  overflow: hidden;
  top: -5px !important;
  left: -5px !important;
  user-select: none;
}
.inner-window-border {
  --border-width: 8;
  --stripe-distance: 1px;
  position: absolute;
  border: calc(var(--border-width) * 1px) solid transparent;
  border-image: repeating-linear-gradient(
      -18deg,
      black,
      transparent 0.1px,
      transparent var(--stripe-distance),
      black calc(var(--stripe-distance) + 0.9px)
    )
    var(--border-width);
}
.inner-userform-header {
  display: grid;
  grid-template-columns: auto 30px ;
  width: 100%;
  height: 30px;
  background-color: rgba(153,180,209);
}
.inner-window-content {
  flex: 1;
  left: 0px;
  background-position: 9px 9px;
}
.inner-window-content:focus {
  outline: none;
}

.ui-btn {
  margin: 2px;
  background: #7e7ea666;
  border: 1px solid #7e7ea666;
  height: 18px;
  width: 30px;
  border-radius: 2px;
}
.ui-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}
.ui-btn.close {
  background: #c42a37;
}
.ui-btn svg path,
.ui-btn svg rect,
.ui-btn svg polygon {
  fill: white;
}
.ui-btn svg {
  width: 10px;
  height: 10px;
  stroke: white;
  stroke-width: 2px;
}
.closeButton {
  float: right;
}
.outer-window-button {
  padding-right: 10px;
}
.ui-titlecontrols {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.mainDiv {
  position: absolute;
  --border-width: 5;
  --stripe-distance: 2px;
  border: calc(var(--border-width) * 1px) solid transparent;
  border-image: repeating-linear-gradient(
      -110deg,
      black,
      transparent 1px,
      transparent var(--stripe-distance),
      black calc(var(--stripe-distance) + 0.2px)
    )
    var(--border-width);
}
.mainDiv1 {
  position: absolute;
}

:focus {
  outline: none;
}
.container{
  width:100%;
  height: 100%;
}
.innerWindowHeaderStyle{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre;
}
</style>
