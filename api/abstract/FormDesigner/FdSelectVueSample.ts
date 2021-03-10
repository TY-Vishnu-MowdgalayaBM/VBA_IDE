import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { IupdatePosition } from '@/storeModules/fd/actions'
import { State, Action } from 'vuex-class'
@Component({
  name: 'FdSelectVueSample'
})
export default class FdSelectVueSample extends Vue {
  @Prop() isSelected: boolean
  @Prop({ required: true, type: String }) public controlId! : string
  @Prop({ required: true, type: String }) public userFormId! : string

  @Action('fd/updatePosition') updatePosition!: (payload: IupdatePosition) => void;
  @State(state => state.fd.userformData) userformData!: userformData
  @State(state => state.fd.selectedControls) selectedControls!: fdState['selectedControls']

  @Emit('selectedItem')
  private selectedItem (event: MouseEvent) {
    return {
      event,
      item: this
    }
  }

  @Emit('deleteItem')
  private deleteItem (event: MouseEvent) {
    return {
      event,
      item: this
    }
  }

  @Emit('changeResize')
  private changeResize (value: IResizeValueSample) {
    const type = value.type
    for (let i of this.selectedControls[this.userFormId].selected) {
      const dragResizeControl: controlProperties = this.userformData[this.userFormId][i].properties
      if (dragResizeControl) {
        let cX = dragResizeControl.Left ? dragResizeControl.Left : 0
        let cY = dragResizeControl.Top ? dragResizeControl.Top : 0
        let cW = dragResizeControl.Width ? dragResizeControl.Width : 0
        let cH = dragResizeControl.Height ? dragResizeControl.Height : 0
        let cR = cX + cW
        let cB = cY + cH

        switch (type) {
          case 'drag': // drag
            cX += value.X
            cY += value.Y
            break
          case 'nw': // tl
            cX += value.X
            cY += value.Y
            cW = cR - cX
            cH = cB - cY
            break
          case 'ne': // tr
            cW += value.X
            cY += value.Y
            cH = cB - cY
            break
          case 'n-resize': // tm
            cY += value.Y
            cH = cB - cY
            break
          case 'w-resize': // ml
            cX += value.X
            cW = cR - cX
            break
          case 'e-resize': // mr
            cW += value.X
            break
          case 's-resize': // bm
            cH += value.Y
            break
          case 'sw': // bl
            cX += value.X
            // cY += value.Y
            cW = cR - cX
            cH += value.Y
            break
          default:
            cW += value.X
            cH += value.Y
            break
        }
        this.updatePosition({
          userFormId: this.userFormId,
          controlId: this.controlId,
          value: {
            Top: cY > 0 ? cY : 0,
            Left: cX > 0 ? cX : 0,
            Width: cW,
            Height: cH
          }
        })
        // this.updateControl({
        //   userFormId: this.userFormId,
        //   controlId: this.controlId,
        //   propertyName: 'Top',
        //   value: cY > 0 ? cY : 0
        // })

        // this.updateControl({
        //   userFormId: this.userFormId,
        //   controlId: this.controlId,
        //   propertyName: 'Left',
        //   value: cX > 0 ? cX : 0
        // })

        // this.updateControl({
        //   userFormId: this.userFormId,
        //   controlId: this.controlId,
        //   propertyName: 'Width',
        //   value: cW
        // })

        // this.updateControl({
        //   userFormId: this.userFormId,
        //   controlId: this.controlId,
        //   propertyName: 'Height',
        //   value: cH
        // })
      }
    }
    return value
  }
}
