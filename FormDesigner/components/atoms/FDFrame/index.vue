<template>
<div :style="outerDivStyle" class="outerDivClass">
  <fieldset
    class="fieldset"
    :style="cssStyleProperty"
    @mouseover="updateMouseCursor"
    :title="properties.ControlTipText"
    :tabindex="properties.TabIndex"
    @keydown.ctrl.exact.stop="selectMultipleCtrl($event,true)"
    @keydown.ctrl.stop="handleKeyDown"
    @keydown.shift.exact.stop="selectMultipleCtrl($event,true)"
    @keydown.delete.stop.exact="deleteFrame"
    @keydown.enter.exact="setContentEditable($event, true)"
    @contextmenu="showContextMenu($event, controlId, controlId, 'container', isEditMode)"
    @keyup.stop="selectMultipleCtrl($event, false)"
  >
    <legend ref="fieldsetRef" :style="legendCssStyleProperty">{{ properties.Caption }}</legend>
    <div :style="scrollSize" ref="frame" >
      <div>
      <Container
      :style="frameContainerStyleObj"
      :userFormId="userFormId"
      :controlId="controlId"
      :containerId="controlId"
      :isEditMode="isEditMode"
      :getSampleDotPattern="getSampleDotPattern"
      :getScrollBarX="getScrollBarX"
      :getScrollBarY="getScrollBarY"
      ref="containerRef"
      :createBackgroundString="createBackgroundString"
      :getSizeMode="getSizeMode"
      :getRepeatData="getRepeatData"
      :getPosition="getPosition"
      @deActiveControl="deActControl"
      @dragSelectorControl="dragSelectorControl"
      @addControlObj="addContainerControl"
      />
      </div>
  </div>
  </fieldset>
</div>
</template>

<script lang="ts">
import { Component, Emit, Mixins, Prop, Ref, Watch } from 'vue-property-decorator'
import FdControlVue from '@/api/abstract/FormDesigner/FdControlVue'
import { Action } from 'vuex-class'
import Vue from 'vue'
import FdContainerVue from '@/api/abstract/FormDesigner/FdContainerVue'
import Container from '@/FormDesigner/components/organisms/FDContainer/index.vue'
import { controlProperties } from '@/FormDesigner/controls-properties'
import { EventBus } from '@/FormDesigner/event-bus'
@Component({
  name: 'FDFrame',
  components: {
    Container: () =>
      import('@/FormDesigner/components/organisms/FDContainer/index.vue')
  }
})
export default class FDFrame extends Mixins(FdContainerVue) {
  @Ref('containerRef') readonly containerRef!: Container;
  @Ref('frame') readonly frame!: HTMLDivElement;
  @Ref('fieldsetRef') fieldsetRef: HTMLLegendElement;
  captionHeight: number = 0;

  /**
   * @description Returns string value for CSS background style
   * @function createBackgroundString
   */
  protected get createBackgroundString () {
    return `url(${this.properties.Picture})`
  }
  /**
   * @description Returns string value for CSS background style for dotted patten
   * @function getSampleDotPattern
   */
  protected get getSampleDotPattern () {
    const dotSize = 13
    const dotSpace = 9
    return {
      backgroundPosition: `${dotSize}px ${dotSize}px`,
      backgroundImage: `radial-gradient(${this.properties.ForeColor} 11%, transparent 10%)`,
      backgroundSize: `${dotSpace}px ${dotSpace}px`
    }
  }
  protected get frameContainerStyleObj (): Partial<CSSStyleDeclaration> {
    const scale = (this.properties.Zoom!) / 100
    return {
      transform: `scale(${scale})`,
      transformOrigin: `top left`
    }
  }

  mounted () {
    // this.scrollLeftTop(this.data)
    this.scrollTopCalculate()
    if (this.fieldsetRef) {
      this.captionHeight = this.fieldsetRef.offsetHeight!
    }
  }

  @Watch('properties.Caption')
  captionValidate () {
    this.scrollTopCalculate()
    Vue.nextTick(() => {
      if (this.properties.Caption === '') {
        this.captionHeight = 0
      } else {
        this.captionHeight = this.fieldsetRef.offsetHeight!
      }
    })
  }

  @Watch('properties.Font', { deep: true })
  updateFont () {
    this.scrollTopCalculate()
    Vue.nextTick(() => {
      this.captionHeight = this.fieldsetRef.offsetHeight!
    })
  }
  @Watch('properties.Visible')
  updateViisible () {
    this.updateEditMode(false)
  }

  @Emit('updateEditMode')
  updateEditMode (val: boolean) {
    return val
  }
  /**
   * @description style object is passed to :style attribute in div tag
   * dynamically changing the styles of the component based on propControlData
   * @function outerDivStyle
   *
   */
  protected get outerDivStyle (): Partial<CSSStyleDeclaration> {
    const controlProp = this.data.properties
    return {
      backgroundColor: controlProp.BackColor,
      width: `${controlProp.Width}px`,
      height: `${controlProp.Height}px`,
      overflow: 'hidden'
    }
  }

  /**
   * @description style object is passed to :style attribute in fieldset tag
   * dynamically changing the styles of the component based on propControlData
   * @function cssStyleProperty
   *
   */
  protected get cssStyleProperty (): Partial<CSSStyleDeclaration> {
    const controlProp = this.data.properties
    const font: font = this.properties.Font
      ? this.properties.Font
      : {
        FontName: 'Arial',
        FontSize: 10,
        FontItalic: true,
        FontBold: true,
        FontUnderline: true,
        FontStrikethrough: true,
        FontStyle: 'Arial'
      }
    let display = ''
    if (this.isRunMode) {
      display = controlProp.Visible ? controlProp.Width === 0 || controlProp.Height === 0 ? 'none' : 'block' : 'none'
    } else {
      display = controlProp.Width === 0 || controlProp.Height === 0 ? 'none' : 'block'
    }
    return {
      position: 'relative',
      width: `${controlProp.Width! - 4}px`,
      height: `${controlProp.Height}px`,
      padding: '0px',
      outline: 'none',
      cursor: this.controlCursor,
      fontFamily: font.FontStyle! !== '' ? this.setFontStyle : font.FontName!,
      fontSize: `${font.FontSize}px`,
      fontStyle: font.FontItalic || this.isItalic ? 'italic' : '',
      textDecoration: font.FontStrikethrough === true && font.FontUnderline === true
        ? 'underline line-through'
        : font.FontUnderline
          ? 'underline'
          : font.FontStrikethrough
            ? 'line-through'
            : '',
      fontWeight: font.FontBold ? 'bold'
        : font.FontStyle !== ''
          ? this.tempWeight
          : '',
      color:
        controlProp.Enabled === true ? controlProp.ForeColor : this.getEnabled,
      fontStretch: font.FontStyle !== '' ? this.tempStretch : '',
      borderColor: controlProp.BorderStyle === 1 ? controlProp.BorderColor : '',
      borderLeft: controlProp.BorderStyle === 1 ? '1px solid ' + controlProp.BorderColor : controlProp.SpecialEffect === 2 ? '2px solid gray' : controlProp.SpecialEffect === 3 ? '1.5px solid gray' : controlProp.SpecialEffect === 4 ? '0.5px solid gray' : 'none',
      borderRight: controlProp.BorderStyle === 1 ? '1px solid ' + controlProp.BorderColor : controlProp.SpecialEffect === 1 ? '2px solid gray' : controlProp.SpecialEffect === 4 ? '1.5px solid gray' : controlProp.SpecialEffect === 3 ? '0.5px solid gray' : 'none',
      borderTop: controlProp.BorderStyle === 1 ? '1px solid ' + controlProp.BorderColor : controlProp.SpecialEffect === 2 ? '2px solid gray' : controlProp.SpecialEffect === 3 ? '1.5px solid gray' : controlProp.SpecialEffect === 4 ? '0.5px solid gray' : 'none',
      borderBottom: controlProp.BorderStyle === 1 ? '1px solid ' + controlProp.BorderColor : controlProp.SpecialEffect === 1 ? '2px solid gray' : controlProp.SpecialEffect === 4 ? '1.5px solid gray' : controlProp.SpecialEffect === 3 ? '0.5px solid gray' : 'none',
      backgroundColor: controlProp.BackColor,
      display: display,
      // zoom: `${controlProp.Zoom}%`,
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      maxWidth: `${controlProp.Width!}px`
    }
  }
  /**
   * @description style object is passed to :style attribute in legend tag
   * dynamically changing the styles of the component based on propControlData
   * @function legendCssStyleProperty
   *
   */
  protected get legendCssStyleProperty (): Partial<CSSStyleDeclaration> {
    const controlProp = this.data.properties
    return {
      position: 'sticky',
      top: '0px',
      color:
        controlProp.Enabled === true ? controlProp.ForeColor : this.getEnabled,
      background: controlProp.BackColor,
      whiteSpace: 'pre',
      wordBreak: 'normal',
      overflow: 'hidden',
      maxWidth: `${controlProp.Width! - 20}px`,
      zIndex: '1'
    }
  }
  get scrollSize () {
    const controlProp = this.data.properties!
    return {
      width: `${controlProp.Width! - 3}px`,
      height: this.fieldsetRef ? (controlProp.Height! - (this.captionHeight / 2) - 2) + 'px' : '100%',
      position: 'relative',
      top: this.scrollTopCalculate()
    }
  }

  scrollTopCalculate () {
    if (this.fieldsetRef && this.properties.Caption !== '') {
      this.updateDataModel({ propertyName: 'Width', value: this.properties.Width! - 1 })
      this.updateDataModel({ propertyName: 'Width', value: this.properties.Width! + 1 })
      return '-' + ((this.captionHeight / 2) - 1) + 'px'
    } else {
      return ''
    }
  }
  get scrollStyle () {
    const controlProp = this.data.properties!
    return {
      height: controlProp.ScrollHeight + 'px',
      width: controlProp.ScrollWidth + 'px'
    }
  }

  showContextMenu (e: MouseEvent, parentID: string, controlID: string, type: string, mode: boolean) {
    if (this.isEditMode) {
      e.stopPropagation()
      EventBus.$emit('contextMenuDisplay', e, parentID, controlID, type, mode)
    }
  }

  dragSelectorControl (event: MouseEvent) {
    this.selectedControlArray = []
    this.selectedAreaStyle = this.containerRef.dragSelector.selectAreaStyle
    this.calSelectedAreaStyle(event, this.data)
  }

  frameMouseDown (e: MouseEvent) {
    if (e.which !== 3) {
      EventBus.$emit('isEditMode', this.isEditMode)
      const selContainer = this.selectedControls[this.userFormId].container[0]
      if (selContainer === this.controlId) {
        const previousEditMode: boolean = this.isEditMode
        const controlType: string = this.userformData[this.userFormId][this.controlId].type
        if (this.selMultipleCtrl === false && this.activateCtrl === false) {
          if (previousEditMode) {
            this.updateEditMode(previousEditMode)
          }
          this.selectControl({
            userFormId: this.userFormId,
            select: { container: controlType === 'Userform' ? [this.controlId] : this.getContainerList(this.controlId), selected: [this.controlId] }
          })
        }
      } else {
        return null
      }
    }
  }

  /**
   * @description To perform ContextMenu actions(for example: selectAll, paste etc.) on UserForm  and Control
   * @function handleKeyDown
   * @param event  - it is of type MouseEvent
   * @event keydown
   */
  handleKeyDown (event: KeyboardEvent) {
    EventBus.$emit('handleKeyDown', event, this.controlId)
  }

  deleteFrame (event: KeyboardEvent) {
    if (this.controlId === this.selectedControls[this.userFormId].selected[0]) {
      this.deleteItem(event)
    } else {
      this.handleKeyDown(event)
    }
  }
  selectMultipleCtrl (event: KeyboardEvent, val: boolean) {
    if (event.key === 'Control' && event.keyCode === 17) {
      this.selMultipleCtrl = val
      EventBus.$emit('selectMultipleCtrl', val)
    } else if (event.key === 'Shift' && event.keyCode === 16) {
      this.activateCtrl = val
      EventBus.$emit('actMultipleCtrl', val)
    }
  }
  deActControl (event: MouseEvent) {
    this.frameMouseDown(event)
  }
  addContainerControl (event: MouseEvent) {
    if (!this.isEditMode && this.selMultipleCtrl === false && this.activateCtrl === false) {
      // this.selectedItem(event)
    } else {
      this.addControlObj(event, this.controlId)
    }
  }
}
</script>

<style scoped>
.fieldset {
  box-sizing: border-box;
  margin: 0px;
  user-select: none;
}
</style>
