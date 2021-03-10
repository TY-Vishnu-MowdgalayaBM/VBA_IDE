// @ts-nocheck
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

import { controlProperties } from '@/FormDesigner/controls-properties'
import { PositionXYData } from '../../../FormDesigner/controls-properties-types'
import { PropType } from 'vue'

@Component({
  name: 'FdControlVueSample'
})
export default class FdControlVueSample extends Vue {
  @Prop({ required: true, type: Object as PropType<controlData> }) public data! : controlData
  @Prop({ required: true, type: String }) public controlId! : string

  @Emit('selectedItem')
  selectedItem (event: Event) {
    return event
  }

  @Emit('deleteItem')
  deleteItem (event: Event) {
    return event
  }

  public get properties () :controlProperties {
    return this.data.properties
  }

  protected get renderSize () : Partial<CSSStyleDeclaration> {
    return {
      width: `${this.properties.Width}px`,
      height: `${this.properties.Height}px`
    }
  }

  protected get baseStyle () :Partial<CSSStyleDeclaration> {
    return {
      backgroundColor: this.properties.BackColor,
      display: 'block'
    }
  }

  protected get changeBorderStyle () {
    return controlProperties.borderStyleProp(this.data)
  }

  protected get getSpecialEffectData () {
    return controlProperties.specialEffectProp(this.data)
  }

  protected get getMouseCursorData () {
    return controlProperties.mousePointerProp(this.data)
  }

  protected get getEnabled () {
    return controlProperties.enabledProp(this.data)
  }

  protected get getRepeat () {
    return controlProperties.extraDataRepeatProp(this.data)
  }

  protected get getPosition () {
    return controlProperties.picturePositionProp(this.data)
  }

  protected get getPositionX () {
    const posX: PositionXYData = controlProperties.pictureXYPositionProp(this.data)
    return posX.backgroundPositionX
  }

  protected get getPositionY () {
    const posY : PositionXYData = controlProperties.pictureXYPositionProp(this.data)
    return posY.backgroundPositionY
  }

  protected get getAccelerator () {
    return controlProperties.acceleratorProp(this.data)
  }
}
