<template>
  <div>
    <div :class="[isSelected?'handle handle-tl':null]" @mousedown.stop="handleMouseDown($event,'nw')"></div>
    <div :class="[isSelected?'handle handle-tr':null]" @mousedown.stop="handleMouseDown($event,'ne')"></div>
    <div :class="[isSelected?'handle handle-tm':null]" @mousedown.stop="handleMouseDown($event,'n-resize')"></div>
    <div :class="[isSelected?'handle handle-ml':null]" @mousedown.stop="handleMouseDown($event,'w-resize')"></div>
    <div :class="[isSelected?'handle handle-mr':null]" @mousedown.stop="handleMouseDown($event,'e-resize')"></div>
    <div :class="[isSelected?'handle handle-bl':null]" @mousedown.stop="handleMouseDown($event,'sw')"></div>
    <div :class="[isSelected?'handle handle-br':null]" @mousedown.stop="handleMouseDown($event,'se')"></div>
    <div :class="[isSelected?'handle handle-bm':null]" @mousedown.stop="handleMouseDown($event,'s-resize')"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
interface IResizeValue
{
  X: number
  Y: number
  type: string
}
@Component({
  name: 'FDResizeHandlerSample'
})
export default class FDResizeHandlerSample extends Vue {
  @Prop() isSelected: boolean

  resizeDiv: string = '';
  beforeMouseEvent: MouseEvent = {} as MouseEvent

  handleMouseDown (event: MouseEvent, handler: string) {
    this.resizeDiv = handler
    document.onmousemove = this.elementDrag
    document.onmouseup = this.closeDragElement
  }

  @Emit('changeResize')
  private changeResize (value: IResizeValue) {
    return value
  }

  elementDrag (event: MouseEvent): void {
    event.preventDefault()

    // const scale: number = 1
    // const grid: Array<number> = [10, 10]
    // const x: number = Math.round((this.positions.movementX / scale) / grid[0]) * grid[0]
    // const y: number = Math.round((this.positions.movementY / scale) / grid[1]) * grid[1]

    // const diffGridX: number = x - this.positions.movementX
    // const diffGridY: number = y - this.positions.movementY

    // this.positions.clientX = event.clientX - diffGridX
    // this.positions.clientY = event.clientY - diffGridY

    if (Object.keys(this.beforeMouseEvent).length > 0) {
      let gapX = event.clientX - this.beforeMouseEvent.clientX
      let gapY = event.clientY - this.beforeMouseEvent.clientY

      this.changeResize({ X: gapX, Y: gapY, type: this.resizeDiv })
    }
    this.beforeMouseEvent = event
  }
  closeDragElement (): void {
    document.onmouseup = null
    document.onmousemove = null
    this.resizeDiv = ''
    this.beforeMouseEvent = {} as MouseEvent
  }
}
</script>

<style  scoped>
.handle {
  box-sizing: border-box;
  position: absolute;
  width: 6px;
  height: 6px;

  background: white;
  border: 1px solid #333;
}
.handleActivate {
  box-sizing: border-box;
  position: absolute;
  width: 6px;
  height: 6px;

  background: black;
  border: 1px solid white;
}
.handle-tl {
  top: -5px;
  left: -5px;
  cursor: nw-resize;
}
.handle-tm {
  top: -5px;
  left: calc(50% - 3px);
  /* left: 50%;
  margin-left: -5px; */
  cursor: n-resize;
}
.handle-tr {
  top: -5px;
  right: -5px;
  cursor: ne-resize;
}
.handle-ml {
  /*
  top: 50%;
  margin-top: -5px;
  */
  top: calc(50% - 3px);
  left: -5px;
  cursor: w-resize;
}
.handle-mr {
  top: calc(50% - 3px);
  /* top: 50%;
  margin-top: -5px; */
  right: -5px;
  cursor: e-resize;
}
.handle-bl {
  bottom: -5px;
  left: -5px;
  cursor: sw-resize;
}
.handle-bm {
  bottom: -5px;
  left: calc(50% - 3px);
  /* left: 50%;
  margin-left: -5px; */
  cursor: s-resize;
}
.handle-br {
  bottom: -5px;
  right: -5px;
  cursor: se-resize;
}
</style>
