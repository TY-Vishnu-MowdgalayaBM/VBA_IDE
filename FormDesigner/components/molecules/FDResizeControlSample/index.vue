<template>
  <div class="resizelable" :style="style"
    @contextmenu.stop="onShowContextMenu">
    <div @mousedown.stop="isSelected && onDragStart($event)">
      <ResizeHandlers
        ref="resize"
        :isSelected="isSelected"
        @changeResize="changeResize"/>
      <components
        :is="propControlData.type"
        ref="control"
        :data="propControlData"
        :controlId="controlId"
        @selectedItem="selectedItem"
        @deleteItem="deleteItem"/>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Ref } from 'vue-property-decorator'
import FdSelectVue from '@/api/abstract/FormDesigner/FdSelectVueSample'
import Label from '@/FormDesigner/components/atoms/FDLabelSample/index.vue'
import ResizeHandlers from '@/FormDesigner/components/organisms/FDResizeHandlerSample/index.vue'

@Component({
  name: 'FDResizeControlSample',
  components: {
    Label,
    ResizeHandlers
  }
})
export default class FDResizeControlSample extends FdSelectVue {
  @Ref('control') readonly control! : FdControlVue
  @Ref('resize') readonly resize! : ResizeHandlers

  @Prop({ required: true, type: String }) public containerId! : string

  onDragStart (event: MouseEvent, handler: string) {
    this.resize.handleMouseDown(event, 'drag')
  }

  private isViewContextMenu = false

  onShowContextMenu (e: MouseEvent) {
    e.preventDefault()
    this.isViewContextMenu = true
  }

  onCloseContextMenu () {
    this.isViewContextMenu = false
  }

  private get propControlData (): controlData {
    return this.userformData[this.userFormId][this.controlId]
  }

  private get style () {
    let result = {}
    if (this.propControlData) {
      result = {
        left: `${this.propControlData.properties.Left}px`,
        top: `${this.propControlData.properties.Top}px`
      }
    }
    return result
  }
}
</script>

<style scoped>
.resizelable {
  position: relative;
}
.resizelable > div {
  position: absolute;
  --border-width: 5;
  --stripe-distance: 2px;
}

</style>
