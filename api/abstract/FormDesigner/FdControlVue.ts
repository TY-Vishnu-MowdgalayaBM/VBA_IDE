import { controlProperties } from '@/FormDesigner/controls-properties'
import {
  PositionXYData,
  ScrollBarData
} from '@/FormDesigner/controls-properties-types'
import { PropType } from 'vue'
import { Component, Emit, Prop, PropSync, Vue, Watch } from 'vue-property-decorator'
import { EventBus } from '@/FormDesigner/event-bus'
import FDEditableText from '@/FormDesigner/components/atoms/FDEditableText/index.vue'

@Component({
  name: 'FdControlVue'
})
export default class FdControlVue extends Vue {
  @Prop({ required: true, type: Boolean }) public isRunMode!: boolean
  @Prop({ required: true, type: Boolean }) public isEditMode!: boolean
  @PropSync('isEditMode') public syncIsEditMode!: boolean
  @Prop() toolBoxSelectControl: string

  @Prop({ required: true, type: Object as PropType<controlData> }) public data! : controlData
  @Prop({ required: true, type: String }) public controlId! : string
  @Prop({ default: false }) isActivated: boolean
  isContentEditable: boolean = false
  selectionData :Array<string> = [];
  matchEntry: Array<number> = [];
  matchIndex = -1;
  isDropdownVisible: boolean = true;
  isItalic: boolean = false;
  tempWeight: string = '400';
  tempStretch: string = 'normal';
  isVisible: boolean = false;
  tempListBoxComboBoxEvent: Event;
  labelStyle = {}
  reverseStyle = {
    display: '',
    flexDirection: '',
    justifyItems: '',
    position: '',
    justifyContent: 'center',
    alignItems: '',
    alignSelf: '',
    width: ''
  }
  imageProperty={
    height: 'fit-content',
    width: '',
    filter: ''
  }
  imagePos={
    alignSelf: ''
  }
  isSpinButtonScrollBarMouseDown: boolean = false
  spinButtonScrollBarDelayInterval: number = 0
  spinButtonScrollBarTimeout: number = 0
  spinButtonScrollBarClickCount: number = 0
  getSelectionStart: number = 0
  getSelectionEnd: number = 0
  controlCursor: string = 'context-menu'
   // global variable to keep track of TripleState when enabled
   protected tripleState:number = 0

  // dynamic ref form textbox component
  protected autoSizeTextarea: HTMLLabelElement

  // dynamic ref from checkbox component
  protected autoSizecheckbox: HTMLDivElement

  // dynamic ref from optionButton component
  protected autoSizeOptionButton! : HTMLDivElement

  // ref of respective components
  protected checkboxRef: HTMLDivElement
  protected optionBtnRef: HTMLDivElement
  protected textareaRef: HTMLTextAreaElement

  protected textSpanRef!: HTMLSpanElement
  protected imageRef: HTMLImageElement
  protected logoRef: HTMLSpanElement
  protected componentRef : HTMLSpanElement
  protected editableTextRef: FDEditableText

  preventClickOnce: boolean = false
  addEventCustomCallback (e: CustomMouseEvent) {
    this.controlEditMode(e)
    const self = this
    e.customCallBack = () => {
      self.preventClickOnce = true
    }
  }

  selectedItem (event: Event) {
    if (this.preventClickOnce) {
      this.preventClickOnce = false
    } else {
      this.emitSelectedItem(event)
    }
  }

  @Emit('selectedItem')
  emitSelectedItem (event: Event) {
    return event
  }

  @Emit('dragGroup')
  dragGroup (event: Event) {
    return event
  }

  @Emit('deleteItem')
  deleteItem (event: Event) {
    return event
  }

  @Emit('setEditMode')
  setEditMode (contentEditable: boolean) {
    return contentEditable
  }

  @Emit('controlEditMode')
  controlEditMode (event: MouseEvent) {
    return event
  }

  updateCaption (updateValue : string) {
    this.updateDataModel({ propertyName: 'Caption', value: updateValue })
  }

  /**
   * @description userFormId and controlId which is taken as props from parent Component
   * @abstract propControlData
   */
  public get properties () :controlProperties {
    return this.data.properties
  }

  public get extraDatas () : extraDatas {
    return this.data.extraDatas!
  }
  public get controls () : string[] {
    return this.data.controls
  }

  protected get renderSize () :Partial<CSSStyleDeclaration> {
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

  /**
   * @description getSpecialEffectData returns string value from
   * controlProperties.specialEffectProp
   * @function getSpecialEffectData
   * @returns string value
   */
  protected get getSpecialEffectData (): string {
    return controlProperties.specialEffectProp(this.data)
  }
  /**
   * @description getBorderStyle returns string value from
   * controlProperties.borderStyleProp
   * @function getBorderStyle
   * @returns string value
   */
  protected get getBorderStyle (): string {
    return controlProperties.borderStyleProp(this.data)
  }
  /**
   * @description getMouseCursorData returns string value from
   * controlProperties.mousePointerProp
   * @function getMouseCursorData
   * @returns string value
   */
  protected get getMouseCursorData (): string {
    return controlProperties.mousePointerProp(this.data)
  }
  /**
   * @description getEnabled returns string value from
   * controlProperties.enabledProp
   * @function getEnabled
   * @returns string value
   */
  protected get getEnabled (): string {
    return controlProperties.enabledProp(this.data)
  }
  /**
   * @description getRepeat returns string value from
   * controlProperties.extraDataRepeatProp
   * @function getRepeat
   * @returns string value
   */
  protected get getRepeat (): string {
    return controlProperties.extraDataRepeatProp(this.data)
  }
  /**
   * @description getPosition returns string value from
   * controlProperties.picturePositionProp
   * @function getPosition
   * @returns string value
   */
  protected get getPosition (): string {
    return controlProperties.picturePositionProp(this.data)
  }
  /**
   * @description getPositionX returns string value from
   * controlProperties.pictureXYPositionProp
   * @function getPositionX
   * @returns string value
   */
  protected get getPositionX (): string {
    const posX: PositionXYData = controlProperties.pictureXYPositionProp(
      this.data
    )
    return posX.backgroundPositionX
  }
  /**
   * @description getPositionY returns string value from
   * controlProperties.pictureXYPositionProp
   * @function getPositionY
   * @returns string value
   */
  protected get getPositionY (): string {
    const posY: PositionXYData = controlProperties.pictureXYPositionProp(
      this.data
    )
    return posY.backgroundPositionY
  }
  /**
   * @description getSizeMode returns string value from
   * controlProperties.pictureSizeModeProp
   * @function getSizeMode
   * @returns string value
   */
  protected get getSizeMode (): string {
    return controlProperties.pictureSizeModeProp(this.data)
  }
  /**
   * @description getScrollBarX returns string value from
   * controlProperties.scrollBarProp / controlProperties.scrollBarTextBoxProp
   * @function getScrollBarX
   * @returns string value
   */
  protected get getScrollBarX (): string {
    if (this.data.type === 'TextBox') {
      if (this.isEditMode) {
        const scrollXData = controlProperties.scrollBarTextBoxProp(this.data)
        return scrollXData.overflowX
      }
    }
    const scrollX: ScrollBarData = controlProperties.scrollBarProp(
      this.data
    )
    return scrollX.overflowX
  }

  /**
   * @description getScrollBarY returns string value from
   * controlProperties.scrollBarProp / controlProperties.scrollBarTextBoxProp
   * @function getScrollBarY
   * @returns string value
   */
  protected get getScrollBarY (): string {
    if (this.data.type === 'TextBox') {
      const scrollYData = controlProperties.scrollBarTextBoxProp(this.data)
      return scrollYData.overflowY
    }
    const scrollY: ScrollBarData = controlProperties.scrollBarProp(
      this.data
    )
    return scrollY.overflowY
  }
  /**
   * @description getScrollingHeight returns string value from
   * controlProperties.scrollBarWidthAndHeightProp
   * @function getScrollingHeight
   * @returns string value
   */
  protected get getScrollingHeight (): string {
    const scrollingHeight = controlProperties.scrollBarWidthAndHeightProp(
      this.data
    )
    return scrollingHeight.scrollHeight
  }
  /**
   * @description getScrollingWidth returns string value from
   * controlProperties.scrollBarWidthAndHeightProp
   * @function getScrollingWidth
   * @returns string value
   */
  protected get getScrollingWidth (): string {
    const scrollingWidth = controlProperties.scrollBarWidthAndHeightProp(
      this.data
    )
    return scrollingWidth.scrollWidth
  }

  /**
   * @description checkOtherOrientations returns string value from
   * controlProperties.controlsOrientationProp
   * @function checkOtherOrientations
   * @returns boolean value
   */
  protected checkOtherOrientations () : boolean {
    throw new Error('checkOtherOrientations Not Implemented')
  }

  /**
   * @description getForeColorValue returns string value from
   * controlProperties.getForeColor
   * @function getForeColorValue
   * @returns string value
   */
  protected get getForeColorValue () : string {
    return controlProperties.getForeColor(this.data)
  }

  protected increaseTheValueAfterDelay () {
    if (this.isSpinButtonScrollBarMouseDown) {
      this.spinButtonScrollBarClickCount = this.spinButtonScrollBarClickCount + 1
      let tempVal, tempMax
      if (this.properties.Max! >= 0 && this.properties.Min! >= 0) {
        if (this.properties.Max! < this.properties.Min!) {
          tempMax = this.properties.Max!
          if (this.properties.Value! < this.properties.Max! && this.properties.Value! > this.properties.Min!) {
            this.updateDataModel({ propertyName: 'Value', value: this.properties.Min })
          }
          tempVal = this.properties.Value! as number
          if (
            tempVal >= tempMax &&
              tempVal - tempMax > this.properties.SmallChange!
          ) {
            tempVal = tempVal - this.properties.SmallChange!
          } else if (tempVal >= tempMax) {
            tempVal = tempMax
          } else {
            tempVal = tempMax
          }
        } else {
          tempMax = this.properties.Max!
          if (this.properties.Value! > this.properties.Max! && this.properties.Value! < this.properties.Min!) {
            this.updateDataModel({ propertyName: 'Value', value: this.properties.Min })
          }
          tempVal = this.properties.Value! as number
          if (
            tempVal <= tempMax &&
        tempMax - tempVal > this.properties.SmallChange!
          ) {
            tempVal = tempVal + this.properties.SmallChange!
          } else if (tempVal <= tempMax) {
            tempVal = tempMax
          } else {
            tempVal = tempMax
          }
        }
        this.updateDataModel({ propertyName: 'Value', value: tempVal })
      } else if (this.properties.Max! < 0 && this.properties.Min! < 0) {
        if (this.properties.Max! > this.properties.Min!) {
          tempMax = this.properties.Max!
          if (this.properties.Value! > this.properties.Max! && this.properties.Value! < this.properties.Min!) {
            this.updateDataModel({ propertyName: 'Value', value: this.properties.Max })
          }
          tempVal = this.properties.Value! as number
          if (
            tempVal <= tempMax &&
          Math.abs(tempVal) - Math.abs(tempMax) > this.properties.SmallChange!
          ) {
            tempVal = Math.abs(tempVal) - this.properties.SmallChange!
          } else if (tempVal <= tempMax) {
            tempVal = Math.abs(tempMax)
          } else {
            tempVal = Math.abs(tempMax)
          }
        } else {
          tempMax = Math.abs(this.properties.Max!)
          if (this.properties.Value! < this.properties.Max! && this.properties.Value! > this.properties.Min!) {
            this.updateDataModel({ propertyName: 'Value', value: this.properties.Min })
          }
          tempVal = Math.abs(this.properties.Value! as number)
          if (
            tempVal <= tempMax &&
        tempMax - tempVal > this.properties.SmallChange!
          ) {
            tempVal = tempVal + this.properties.SmallChange!
          } else if (tempVal <= tempMax) {
            tempVal = tempMax
          } else {
            tempVal = tempMax
          }
        }
        this.updateDataModel({ propertyName: 'Value', value: '-' + tempVal })
      } else if (this.properties.Max! < this.properties.Min!) {
        tempMax = this.properties.Max!
        if (this.properties.Value! > this.properties.Min! && this.properties.Value! < this.properties.Max!) {
          this.updateDataModel({ propertyName: 'Value', value: this.properties.Max })
        }
        tempVal = this.properties.Value as number
        if (
          tempVal >= tempMax &&
        tempVal - tempMax >= this.properties.SmallChange!
        ) {
          tempVal = tempVal - this.properties.SmallChange!
        } else if (tempVal <= tempMax) {
          tempVal = tempMax
        } else {
          tempVal = tempMax
        }
        this.updateDataModel({ propertyName: 'Value', value: tempVal })
      } else {
        tempMax = this.properties.Max!
        if (this.properties.Value! > this.properties.Max! && this.properties.Value! < this.properties.Min!) {
          this.updateDataModel({ propertyName: 'Value', value: this.properties.Min })
        }
        tempVal = this.properties.Value as number
        if (
          tempVal <= tempMax &&
        tempMax - tempVal > this.properties.SmallChange!
        ) {
          tempVal = tempVal + this.properties.SmallChange!
        } else if (tempVal <= tempMax) {
          tempVal = tempMax
        } else {
          tempVal = tempMax
        }
        this.updateDataModel({ propertyName: 'Value', value: tempVal })
      }
    }
  }
  /**
   * @description increaseTheValue calls Vuex Actions to update object and Value Property
   * @function increaseTheValue
   */
  protected increaseTheValue () {
    this.isSpinButtonScrollBarMouseDown = true
    if (this.getSpinButtonScrollBarClickCount === 0) {
      this.increaseTheValueAfterDelay()
    }
    if (this.getSpinButtonScrollBarClickCount === 1 && this.isSpinButtonScrollBarMouseDown) {
      this.spinButtonScrollBarTimeout = setTimeout(() => {
        this.increaseTheValueAfterDelay()
        if (this.getSpinButtonScrollBarClickCount === 2 && this.isSpinButtonScrollBarMouseDown) {
          this.spinButtonScrollBarDelayInterval = setInterval(() => {
            this.increaseTheValueAfterDelay()
          }, this.properties.Delay!)
        }
      }, this.properties.Delay! * 5)
    }
  }
  protected decreaseTheValueAfterDelay () {
    if (this.isSpinButtonScrollBarMouseDown) {
      this.spinButtonScrollBarClickCount = this.spinButtonScrollBarClickCount + 1
      let tempVal, tempMin
      if (this.properties.Max! >= 0 && this.properties.Min! >= 0) {
        if (this.properties.Max! < this.properties.Min!) {
          tempMin = this.properties.Min!
          if (this.properties.Value! < this.properties.Max! && this.properties.Value! > this.properties.Min!) {
            this.updateDataModel({ propertyName: 'Value', value: this.properties.Min })
          }
          tempVal = this.properties.Value! as number
          if (
            tempVal <= tempMin &&
          tempMin - tempVal > this.properties.SmallChange!
          ) {
            tempVal = tempVal + this.properties.SmallChange!
          } else if (tempVal <= tempMin) {
            tempVal = tempMin
          } else {
            tempVal = tempMin
          }
        } else {
          tempMin = this.properties.Min!
          if (this.properties.Value! > this.properties.Max! && this.properties.Value! < this.properties.Min!) {
            this.updateDataModel({ propertyName: 'Value', value: this.properties.Min })
          }
          tempVal = this.properties.Value! as number
          if (
            tempVal >= tempMin &&
            tempVal - tempMin > this.properties.SmallChange!
          ) {
            tempVal = tempVal - this.properties.SmallChange!
          } else if (tempVal >= tempMin) {
            tempVal = tempMin
          } else {
            tempVal = tempMin
          }
        }
        this.updateDataModel({ propertyName: 'Value', value: tempVal })
      } else if (this.properties.Max! < 0 && this.properties.Min! < 0) {
        if (this.properties.Max! > this.properties.Min!) {
          tempMin = this.properties.Min!
          if (this.properties.Value! > this.properties.Max! && this.properties.Value! < this.properties.Min!) {
            this.updateDataModel({ propertyName: 'Value', value: this.properties.Min })
          }
          tempVal = this.properties.Value! as number
          if (
            tempVal >= tempMin &&
          Math.abs(tempMin) - Math.abs(tempVal) > this.properties.SmallChange!
          ) {
            tempVal = Math.abs(tempVal) + this.properties.SmallChange!
          } else if (tempVal <= tempMin) {
            tempVal = Math.abs(tempMin)
          } else {
            tempVal = Math.abs(tempMin)
          }
        } else {
          tempMin = Math.abs(this.properties.Min!)
          if (this.properties.Value! < this.properties.Max! && this.properties.Value! > this.properties.Min!) {
            this.updateDataModel({ propertyName: 'Value', value: this.properties.Min })
          }
          tempVal = Math.abs(this.properties.Value! as number)
          if (
            tempVal >= tempMin &&
            tempVal - tempMin > this.properties.SmallChange!
          ) {
            tempVal = tempVal - this.properties.SmallChange!
          } else if (tempVal >= tempMin) {
            tempVal = tempMin
          } else {
            tempVal = tempMin
          }
        }
        this.updateDataModel({ propertyName: 'Value', value: '-' + tempVal })
      } else if (this.properties.Max! < this.properties.Min!) {
        tempMin = this.properties.Min!
        if (this.properties.Value! > this.properties.Min! && this.properties.Value! < this.properties.Max!) {
          this.updateDataModel({ propertyName: 'Value', value: this.properties.Max })
        }
        tempVal = this.properties.Value as number
        if (
          tempVal <= tempMin &&
            tempMin - tempVal > this.properties.SmallChange!
        ) {
          tempVal = tempVal + this.properties.SmallChange!
        } else if (tempVal >= tempMin) {
          tempVal = tempMin
        } else {
          tempVal = tempMin
        }
        this.updateDataModel({ propertyName: 'Value', value: tempVal })
      } else {
        tempMin = this.properties.Min!
        if (this.properties.Value! > this.properties.Max! && this.properties.Value! < this.properties.Min!) {
          this.updateDataModel({ propertyName: 'Value', value: this.properties.Min })
        }
        tempVal = this.properties.Value as number
        if (
          tempVal >= tempMin &&
            tempVal - tempMin > this.properties.SmallChange!
        ) {
          tempVal = tempVal - this.properties.SmallChange!
        } else if (tempVal >= tempMin) {
          tempVal = tempMin
        } else {
          tempVal = tempMin
        }
        this.updateDataModel({ propertyName: 'Value', value: tempVal })
      }
    }
  }
  /**
   * @description decreaseTheValue calls Vuex Actions to update object and Value Property
   * @function decreaseTheValue
   */
  protected decreaseTheValue () {
    this.isSpinButtonScrollBarMouseDown = true
    if (this.getSpinButtonScrollBarClickCount === 0) {
      this.decreaseTheValueAfterDelay()
    }
    if (this.getSpinButtonScrollBarClickCount === 1 && this.isSpinButtonScrollBarMouseDown) {
      this.spinButtonScrollBarTimeout = setTimeout(() => {
        this.decreaseTheValueAfterDelay()
        if (this.getSpinButtonScrollBarClickCount === 2 && this.isSpinButtonScrollBarMouseDown) {
          this.spinButtonScrollBarDelayInterval = setInterval(() => {
            this.decreaseTheValueAfterDelay()
          }, this.properties.Delay!)
        }
      }, this.properties.Delay! * 5)
    }
  }
  get getSpinButtonScrollBarClickCount () {
    return this.spinButtonScrollBarClickCount
  }
  setIsSpinButtonScrollBarMouseDown () {
    this.isSpinButtonScrollBarMouseDown = false
    this.spinButtonScrollBarClickCount = 0
    clearTimeout(this.spinButtonScrollBarTimeout)
    clearInterval(this.spinButtonScrollBarDelayInterval)
  }
  /**
   * @description transformScrollButtonStyle returns string value from
   * knobProperties.transformScrollButtonStyle
   * @function transformScrollButtonStyle
   * @returns string value
   */
  protected get transformScrollButtonStyle () : string {
    return controlProperties.transformScrollButtonStyle(this.data)
  }

  /**
  * @description update the isContentEditable to make the Button content editable
  * or noneditable on click of enter key
  * @function setContentEditable
  * @param event
  * @param contentEditable
  */
  setContentEditable (event : KeyboardEvent, contentEditable : boolean) {
    if (this.data.type === 'TextBox' || this.data.type === 'ComboBox') {
      event.preventDefault()
      this.setEditMode(contentEditable)
      Vue.nextTick(() => {
        this.textareaRef.focus()
        this.textareaRef.setSelectionRange(this.getSelectionStart, this.getSelectionEnd)
      })
    } else {
      event.preventDefault()
      this.setEditMode(contentEditable)
    }
  }

  /**
   * @description  sets Styles to checkbox/optionButton and label based on control Value property
   * @function setStyle
   *@param ref
   *@param checked
   *@param disabled
   *@param bgColor
   */
  setStyle (ref:HTMLInputElement, checked:boolean, disabled:boolean, bgColor:string) {
    if (ref) {
      ref.checked = checked;
      ((ref.parentNode as HTMLLabelElement).childNodes[1] as HTMLSpanElement).style.backgroundColor = bgColor
      ref.disabled = disabled
    }
  }

  /**
   * @description  style object is passed to :style attribute in span tag in checkbox/OptionButton
   * dynamically changing the styles of the component based on properties
   * @function styleForBtn
   *
   */
  get styleForBtn () {
    const style = { border: '1px inset grey', backgroundColor: 'inherit', top: '0px', position: 'relative' }
    if (!this.properties.Enabled) {
      style.backgroundColor = 'rgba(220, 220, 220, 1)'
    }
    if (this.properties.SpecialEffect === 0) {
      return style
    } else {
      style.border = '2px groove grey'
      return style
    }
  }

  /**
   * @description  sets controlSource if present and updates Value property
   * @function controlSource
   */
  @Watch('properties.ControlSource', { deep: true })
  controlSource () {
    const propData: controlData = this.data
    if (this.data.type === 'SpinButton' || this.data.type === 'ScrollBar') {
      if (propData.properties.ControlSource && propData.extraDatas) {
        if (propData.extraDatas.ControlSourceValue !== null && propData.extraDatas.ControlSourceValue !== undefined) {
          const a = propData.extraDatas.ControlSourceValue
          if (parseInt(a) <= propData.properties.Max! && parseInt(a) >= propData.properties.Min!) {
            this.updateDataModel({ propertyName: 'Value', value: propData.extraDatas!.ControlSourceValue })
          }
        }
      };
    } else if (propData.properties.ControlSource) {
      const controlSourceValue = propData.extraDatas!.ControlSourceValue!.toLowerCase()
      const isBoolean:boolean | string = (controlSourceValue === 'true') ? true : (controlSourceValue === 'false') ? false : ''
      this.updateDataModel({ propertyName: 'Value', value: isBoolean.toString() })
    }
  }
  /**
   * @description  update the value of control properties
   * @function updateDataModel
   * @param updateData
   */
  @Emit('updateModel')
  updateDataModel (updateData: IupdateDataModel) {
    return updateData
  }

  /**
   * @description  update the value of control extraDatas properties
   * @function updateDataModelExtraData
   * @param updateData
   */
  @Emit('updateModelExtraData')
  updateDataModelExtraData (updateData: IupdateDataModelExtraData) {
    return updateData
  }

  /**
  * @description watches text properties
  * @function valueUpdateProp
  * @param oldVal previous string value
  * @param newVal  new/changed string value
  */
 @Watch('properties.Text', { deep: true })
  valueUpdateProp (newVal:string, oldVal:string) {
    if (this.data.type!.includes('TextBox') || this.data.type === 'ComboBox') {
      const propData: controlProperties = this.properties
      this.updateDataModel({ propertyName: 'Value', value: newVal })
    }
  }

 /**
  * @description watches text and value properties are same when component is mounted/changed
  * @function textAndValueUpdateProp
  * @param oldVal previous properties data
  * @param newVal  new/changed properties data
  */
 @Watch('properties.Value', { deep: true })
 textAndValueUpdateProp (newVal:string, oldVal:string) {
   if (this.data.type!.includes('TextBox')) {
     const propData: controlProperties = this.properties
     if (propData.Text !== propData.Value && propData.ControlSource === '') {
       const propText: number = propData.Text!.length
       const propValue: number = (propData.Value as string).length
       this.updateDataModel({ propertyName: 'Text',
         value: this.properties.Value! })
     }
   } else if (this.data.type!.includes('CheckBox') || this.data.type!.includes('OptionButton')) {
     const value = this.properties.Value
     const valueType:boolean | string = typeof value
     let isBoolean:boolean | string = ''
     if (valueType === 'boolean') {
       isBoolean = (value as boolean)
     } else if (valueType === 'string') {
       isBoolean = ((value as string).toLowerCase() === 'true') ? true : ((value as string).toLowerCase() === 'false') ? false : ''
     }
     const ref = this.data.type!.includes('CheckBox') ? this.checkboxRef : this.optionBtnRef
     if (isBoolean !== '') {
       if (isBoolean) {
         this.setStyle((ref as HTMLInputElement), (isBoolean as boolean), !(isBoolean as boolean), 'white')
       } else {
         this.setStyle((ref as HTMLInputElement), false, false, 'white')
       }
     } else {
       this.setStyle((ref as HTMLInputElement), true, true, 'rgba(220, 220, 220, 1)')
     }
   }
 }

 /**
  * @description changing width and height of textarea tag by replicating style of
  * textarea with label tag to making the property work in textarea
  * @function updateAutoSize
  * @param oldVal previous properties data
  * @param newVal  new/changed properties data
  */
 updateAutoSize (newVal:boolean, oldVal:boolean) {
   throw new Error('updateAutosize Not Implemented')
 }
 /**
   * @description  sets checked or unchecked when checkbox is clicked
   * if TripleState is True, Null state will be visible
   * @function handleChange
   * @param event it is of type MouseEvent
   */
 handleChange (event: MouseEvent, targetRef: HTMLInputElement) {
   if (event.target instanceof HTMLInputElement) {
     const el = event.target.checked
     if (this.properties.TripleState) {
       this.tripleState++
       if (this.tripleState % 3 === 0) {
         this.setStyle(targetRef, true, false, 'rgba(220, 220, 220, 1)')
       } else {
         this.setStyle(targetRef, el, false, 'white')
         this.updateDataModel({ propertyName: 'Value', value: el })
       }
     } else {
       this.tripleState++
       this.updateDataModel({ propertyName: 'Value', value: el })
       this.setStyle(targetRef, el, false, 'white')
     }
   }
 }
 /**
   * @description getRepeat returns string value from
   * controlProperties.extraDataRepeatProp
   * @function getRepeat
   */
 protected get getRepeatData (): string {
   //  if (this.properties.Picture === '') {
   return controlProperties.extraDataRepeatProp(this.data)
   //  } else {
   //    return controlProperties.pictureTilingProp(this.data)
   //  }
 }
 /**
   * @description computedCaption returns object value from
   * with acceleratorCaption, afterbeginCaption, beforeendCaption values
   * @function computedCaption
   * @returns object value
   */
 protected get computedCaption () {
   let accelerator = ''
   if (this.properties.Accelerator) {
     accelerator = this.properties.Accelerator!.charAt(0)
   }
   return controlProperties.acceleratorProp(this.properties.Caption!, accelerator)
 }
 updateColumnWidths (index: number, height: number) {
   const controlProp = this.properties
   const updateColWidth = controlProp.ColumnWidths!.split(';')
   const colChangeCheck: boolean = controlProp.ColumnCount! - 1 < index
   return {
     position: 'relative',
     display: 'inline-block',
     textAlign: controlProp.TextAlign === 0 ? 'left' : controlProp.TextAlign === 2 ? 'right' : 'center',
     width: controlProp.ColumnCount! === -1 ? (updateColWidth[index] ? parseInt(updateColWidth[index]) + 'px' : '100px') : colChangeCheck ? '0px' : ((updateColWidth[index]) ? parseInt(updateColWidth[index]) + 'px' : controlProp.ColumnCount! > index ? '100px' : '0px'),
     overflow: 'hidden',
     paddingBottom: this.data.properties.Font!.FontSize! > 48 ? '10px' : '5px'
   }
 }
 updateColHeads (index: number) {
   const controlProp = this.properties
   const updateColWidth = controlProp.ColumnWidths!.split(';')
   return {
     textAlign: controlProp.TextAlign === 0 ? 'left' : controlProp.TextAlign === 2 ? 'right' : 'center',
     borderRight: (index < controlProp.ColumnCount! - 1) ? '1px solid' : '',
     width: controlProp.ColumnCount! === -1 ? parseInt(updateColWidth[index]) + 'px' : (updateColWidth[index]) ? parseInt(updateColWidth[index]) + 'px' : '100px',
     overflow: 'hidden'
   }
 }

/**
 * @description watches changes in properties for TextColumn
 * @function textColumnChange
 * @param oldVal previous properties data
 * @param newVal  new/changed properties data
 */
@Watch('properties.TextColumn', { deep: true })
 textColumnChange (newVal:number, oldVal:number) {
   if (newVal > 0 && newVal < this.extraDatas.RowSourceData!.length) {
     let tempData = [...this.extraDatas.RowSourceData!]
     let tempValue = tempData![0][newVal - 1]
     this.updateDataModel({ propertyName: 'Text', value: tempValue })
   } else {
     this.updateDataModel({ propertyName: 'Text', value: '' })
   }
 }

/**
 * @description watches changes in properties for TopIndex
 * @function topIndexCheck
 * @param oldVal previous properties data
 * @param newVal  new/changed properties data
 */
@Watch('properties.TopIndex', { deep: true })
topIndexCheck (newVal:number, oldVal:number) {
  if (this.extraDatas.RowSourceData!.length === 0) {
    this.updateDataModel({ propertyName: 'TopIndex', value: -1 })
  } else {
    this.updateDataModel({ propertyName: 'TopIndex', value: 0 })
  }
}

/**
 * @description updates the dataModel listBox object properties when user clicks
 * @function handleMultiSelect
 * @param event its of type MouseEvent
 * @event click
 *
 */
handleMultiSelect (e: MouseEvent) {
  if (e.target instanceof HTMLTableCellElement || e.target instanceof HTMLTableRowElement || e.target instanceof HTMLDivElement) {
    this.tempListBoxComboBoxEvent = e
    const targetElement = e.target
    const tempData = targetElement.parentElement!.children[0] as HTMLDivElement
    const tempDataOption = targetElement.parentElement!.children[1] as HTMLDivElement
    const tempPath = e.composedPath()
    targetElement.focus()
    let data = targetElement.innerText
    let splitData = data.replace(/\t/g, ' ').split(' ')
    if (this.data.properties.ListStyle === 0) {
      this.selectionData[0] = tempData.innerText
    } else {
      this.selectionData[0] = tempDataOption.innerText
    }
    if (this.properties.Enabled && this.properties.Locked === false) {
      if (this.properties.MultiSelect === 0) {
        if (this.properties.ControlSource !== '') {
          this.updateDataModel({ propertyName: 'Text', value: this.selectionData[0] })
          this.updateDataModel({ propertyName: 'Value', value: this.selectionData[0] })
        }
        this.clearOptionBGColorAndChecked(e)
        this.setOptionBGColorAndChecked(e)
        let isListStyle = 0
        if (this.properties.TextColumn === -1 || this.properties.TextColumn === 1) {
        // 0th index is empty string
          if (this.properties.ListStyle === 0) {
            isListStyle = -1
          }
          this.updateDataModel({ propertyName: 'Text', value: splitData[1 - isListStyle] })
          this.updateDataModel({ propertyName: 'Value', value: splitData[1 - isListStyle] })
        } else if (this.properties.TextColumn === 0) {
          this.updateDataModel({ propertyName: 'Text', value: splitData[2 - isListStyle] })
          this.updateDataModel({ propertyName: 'Value', value: splitData[1 - isListStyle] })
        } else {
          this.updateDataModel({ propertyName: 'Text', value: splitData[this.properties.TextColumn!] })
          this.updateDataModel({ propertyName: 'Value', value: splitData[1 - isListStyle] })
        }
      } else if (this.properties.MultiSelect === 1) {
        if (targetElement.tagName === 'INPUT') {
          this.setOptionBGColorAndChecked(e)
        } else {
          this.setOptionBGColorAndChecked(e)
        }
      } else if (this.properties.MultiSelect === 2) {
        if (e.ctrlKey === true) {
          if (targetElement.tagName === 'INPUT') {
            this.setOptionBGColorAndChecked(e)
          } else {
            this.setOptionBGColorAndChecked(e)
          }
        } else if (e.shiftKey === true && this.properties.Value !== '') {
          let startPoint = 0
          let endPoint = 0
          for (let i = 0; i < tempPath.length; i++) {
            const ele = tempPath[i] as HTMLDivElement
            if (ele.className === 'table-body') {
            // extend points start and end
              for (let j = 0; j < ele.childNodes.length; j++) {
                const cd = ele.childNodes[j] as HTMLDivElement
                if (cd.innerText === this.properties.Value) {
                  startPoint = j + 1
                }
                if (cd.innerText === targetElement.innerText) {
                  endPoint = j
                }
              }
              // upward selection start and end swap
              if (startPoint > endPoint) {
                let temp = startPoint
                startPoint = endPoint
                endPoint = temp
              }
              // setting selection
              for (let k = startPoint; k <= endPoint; k++) {
                const node = ele.childNodes[k] as HTMLDivElement
                const tempNode = node.childNodes[0].childNodes[0] as HTMLInputElement
                node.style.backgroundColor = 'rgb(59, 122, 231)'
                if (
                  this.properties.ListStyle === 1 &&
             !tempNode.checked
                ) {
                // tempNode.checked = !tempNode.checked
                  tempNode.checked = true
                }
              }
              break
            }
          }
        } else {
          this.clearOptionBGColorAndChecked(e)
          this.setOptionBGColorAndChecked(e)
          this.updateDataModel({ propertyName: 'Value', value: targetElement.innerText })
        }
      } else {
        if (this.properties.ControlSource !== '') {
          this.updateDataModel({ propertyName: 'Text', value: this.selectionData[0] })
          this.updateDataModel({ propertyName: 'Value', value: this.selectionData[0] })
        }
        this.clearOptionBGColorAndChecked(e)
        this.setOptionBGColorAndChecked(e)
        let isListStyle = 0
        if (this.properties.TextColumn === -1 || this.properties.TextColumn === 1) {
          if (this.properties.ListStyle === 0) {
            isListStyle = -1
          }
          this.updateDataModel({ propertyName: 'Text', value: splitData[1 - isListStyle] })
          this.updateDataModel({ propertyName: 'Value', value: splitData[1 - isListStyle] })
        } else if (this.properties.TextColumn === 0) {
          this.updateDataModel({ propertyName: 'Text', value: splitData[2 - isListStyle] })
          this.updateDataModel({ propertyName: 'Value', value: splitData[1 - isListStyle] })
        } else {
          this.updateDataModel({ propertyName: 'Text', value: splitData[this.properties.TextColumn!] })
          this.updateDataModel({ propertyName: 'Value', value: splitData[1 - isListStyle] })
        }
      }
    }
  } else {
    if (this.properties.MultiSelect !== 1) {
      this.clearOptionBGColorAndChecked(e)
    }
    this.setOptionBGColorAndChecked(e)
  }
  const a = e.currentTarget! as HTMLDivElement
  this.selectionData[0] = a.innerText
  this.updateDataModel({ propertyName: 'Value', value: a.innerText[0] })
  this.updateDataModel({ propertyName: 'Text', value: a.innerText[0] })
}
/**
 * @description updates the dataModel listBox object properties when keydown
 * @function handleExtendArrowKeySelect
 * @param event its of type KeyboardEvent
 * @event keydown
 *
 */
handleExtendArrowKeySelect (e: KeyboardEvent) {
  const x = e.key.toUpperCase().charCodeAt(0)
  const tempPath = e.composedPath()
  const eventTarget = e.target as HTMLTableRowElement
  const nextSiblingEvent = eventTarget.nextSibling as HTMLDivElement
  const prevSiblingEvent = eventTarget.previousSibling as HTMLDivElement
  if (
   this.properties.MatchEntry! === 0 &&
   x >= 48 && x <= 90
  ) {
    this.matchEntry = []
    const prevMatchData =
   this.extraDatas.MatchData === '' ? e.key : this.extraDatas.MatchData
    this.updateDataModelExtraData({ propertyName: 'MatchData', value: prevMatchData !== e.key ? e.key : prevMatchData })

    for (let index = 0; index < tempPath.length; index++) {
      const element = tempPath[index] as HTMLDivElement
      if (element.className === 'table-body') {
        for (let index = 0; index < element.childNodes.length; index++) {
          const ei = element.childNodes[index] as HTMLDivElement
          let splitData = ei.innerText.replace(/\t/g, ' ').split(' ')
          let si = 0
          if (this.properties.ListStyle === 0) {
            si = -1
          }
          if (splitData[si + 1][0].includes(this.extraDatas.MatchData!)) {
            this.matchEntry.push(index)
          }
        }

        if (
         this.extraDatas.MatchData![0] !== undefined &&
         this.extraDatas.MatchData![0] === e.key &&
         this.extraDatas.MatchData!.length > 0
        ) {
          const tempChildNode = element.childNodes[this.matchEntry[this.matchIndex]] as HTMLDivElement
          this.matchIndex++
          if (
            this.matchIndex === this.matchEntry.length &&
           prevMatchData === this.extraDatas.MatchData
          ) {
            this.matchIndex = 0
            this.clearOptionBGColorAndChecked(e)
            this.setBGandCheckedForMatch(
              tempChildNode
            )
            break
          } else if (prevMatchData !== this.extraDatas.MatchData) {
            this.matchIndex = 0
            this.clearOptionBGColorAndChecked(e)
            this.setBGandCheckedForMatch(
              tempChildNode
            )
            break
          } else {
            if (this.matchEntry.length === 0) {
              this.matchEntry.push(0)
              this.matchIndex = 0
            }
            this.clearOptionBGColorAndChecked(e)
            this.setBGandCheckedForMatch(
              tempChildNode
            )
            break
          }
        }
        break
      }
    }
  } else if (
    this.properties.MatchEntry === 1 &&
    x >= 48 && x <= 90
  ) {
    let temp = this.extraDatas.MatchData + e.key
    this.updateDataModelExtraData({ propertyName: 'MatchData', value: temp })

    for (let point = 0; point < tempPath.length; point++) {
      const tbody = tempPath[point] as HTMLDivElement
      if (tbody.className === 'table-body') {
        this.matchEntry = []
        for (let p = 0; p < tbody.childNodes.length; p++) {
          const ei = tbody.childNodes[p] as HTMLDivElement
          let matchEntryComplete = ei.innerText
            .replace(/\t/g, ' ')
            .split(' ')
          let sii = 0
          if (this.properties.ListStyle === 0) {
            sii = -1
          }
          if (
            matchEntryComplete[sii + 1][0].includes(this.extraDatas.MatchData!) &&
           this.extraDatas.MatchData!.length < 2
          ) {
            this.matchEntry.push(p)
          } else if (
            matchEntryComplete[sii + 1].includes(this.extraDatas.MatchData!) &&
           this.extraDatas.MatchData!.length > 1
          ) {
            this.matchEntry.push(p)
          }
        }

        if (this.extraDatas.MatchData!.length <= 1) {
          let singleMatch = tbody.childNodes[this.matchEntry[0]] as HTMLDivElement
          this.clearOptionBGColorAndChecked(e)
          this.setBGandCheckedForMatch(singleMatch)
          break
        } else if (
         this.extraDatas.MatchData!.length > 1 &&
         this.matchEntry.length !== 0
        ) {
          let completeAutoMatch = tbody.childNodes[this.matchEntry[0]] as HTMLDivElement
          this.clearOptionBGColorAndChecked(e)
          this.setBGandCheckedForMatch(completeAutoMatch)
        }
        break
      }
    }
  }
  if (
    e.key === 'ArrowDown' &&
   e.shiftKey === true &&
   (nextSiblingEvent !== null || prevSiblingEvent.nextSibling !== null)
  ) {
    let currentElement: HTMLDivElement
    if (nextSiblingEvent === null) {
      currentElement = prevSiblingEvent.nextSibling! as HTMLDivElement
    } else {
      currentElement = nextSiblingEvent
    }
    if (this.properties.MultiSelect === 2) {
      if (eventTarget.style.backgroundColor !== 'rgb(59, 122, 231)') {
        this.setOptionBGColorAndChecked(e)
      } else if (
        eventTarget.style.backgroundColor === 'rgb(59, 122, 231)' &&
        currentElement!.style.backgroundColor !== ''
      ) {
        this.setOptionBGColorAndChecked(e)
      } else if (eventTarget.nextSibling!.nextSibling !== null) {
        this.setBGColorForNextSibling(e)
      } else if (
      eventTarget.nextSibling!.nextSibling === null &&
      currentElement!.style.backgroundColor !== 'rgb(59, 122, 231)'
      ) {
        this.setBGColorForNextSibling(e)
      }
        currentElement!.focus()
    }
  } else if (
    e.key === 'ArrowUp' &&
   e.shiftKey === true &&
   (prevSiblingEvent !== null || nextSiblingEvent.previousSibling !== null)
  ) {
    let currentElement: HTMLDivElement
    if (prevSiblingEvent === null) {
      currentElement = nextSiblingEvent.previousSibling! as HTMLDivElement
    } else {
      currentElement = prevSiblingEvent
    }
    if (this.properties.MultiSelect === 2) {
      if (
        eventTarget.style.backgroundColor === 'rgb(59, 122, 231)' &&
        currentElement.style.backgroundColor !== ''
      ) {
        this.setOptionBGColorAndChecked(e)
      } else if (eventTarget.previousSibling!.previousSibling !== null) {
        this.setBGColorForPreviousSibling(e)
      } else if (
        eventTarget.previousSibling!.previousSibling === null &&
        currentElement.style.backgroundColor !== 'rgb(59, 122, 231)'
      ) {
        this.setBGColorForPreviousSibling(e)
      }
      currentElement.focus()
    }
  }
  // }
}

/**
* @description updates the dataModel listBox object properties when mouseenter
* @function handleDrag
* @param event its of type MouseEvent
* @event mouseenter
*
*/
handleDrag (e: MouseEvent) {
  const etarget = e.target as HTMLDivElement
  if (this.properties.MultiSelect === 2) {
    if (e.which === 1) {
      if (etarget.style.backgroundColor === 'rgb(59, 122, 231)') {
        this.unselectBGColorAndchecked(e)
      } else {
        this.setOptionBGColorAndChecked(e)
      }
    }
   window.getSelection()!.removeAllRanges()
  }
}

/**
* @description set Background Color for next siblings
* @function setBGColorForNextSibling
* @param event its of type MouseEvent or KeyboardEvent
*/
setBGColorForNextSibling (e: MouseEvent | KeyboardEvent) {
  if (e.target instanceof HTMLTableCellElement || e.target instanceof HTMLDivElement) {
    const targetEvent = e.target
    const nextSiblingEvent = targetEvent.nextSibling as HTMLDivElement
    const nextSiblingCheckedEvent = nextSiblingEvent.children[0].childNodes[0] as HTMLInputElement
    nextSiblingEvent.style.backgroundColor =
   nextSiblingEvent.style.backgroundColor === 'rgb(59, 122, 231)'
     ? ''
     : 'rgb(59, 122, 231)'
    if (
      this.properties.ListStyle === 1 &&
   this.properties.MultiSelect === 2
    ) {
      nextSiblingCheckedEvent.checked = !nextSiblingCheckedEvent.checked
    }
  }
}

/**
* @description set Background Color foe previous siblings
* @function setBGColorForPreviousSibling
* @param event its of type MouseEvent or KeyboardEvent
*/
setBGColorForPreviousSibling (e: KeyboardEvent) {
  if (e.target instanceof HTMLTableCellElement || e.target instanceof HTMLTableRowElement || e.target instanceof HTMLDivElement) {
    const targetEvent = e.target
    const prevSiblingEvent = targetEvent.previousSibling as HTMLDivElement
    const prevSiblingCheckedEvent = prevSiblingEvent.children[0].childNodes[0] as HTMLInputElement
    prevSiblingEvent.style.backgroundColor =
   prevSiblingEvent.style.backgroundColor === 'rgb(59, 122, 231)'
     ? ''
     : 'rgb(59, 122, 231)'
    if (
      this.properties.ListStyle === 1 &&
   this.properties.MultiSelect === 2
    ) {
      prevSiblingCheckedEvent.checked = !prevSiblingCheckedEvent.checked
    }
  }
}

/**
* @description clear selected option for SingleSelection
* @function clearOptionBGColorAndChecked
* @param event
*/
clearOptionBGColorAndChecked (e: any) {
  if (this.data.type === 'ComboBox') {
    for (let i = 0; i < e.path.length; i++) {
      if (e.path[i].className === 'tBodyStyle') {
        for (let j = 0; j < e.path[i].children.length; j++) {
          e.path[i].children[j].style.backgroundColor = ''
        }
      }
    }
  }
  const tempPath = e.path
  if (tempPath && tempPath.length > 0) {
    for (let index = 0; index < tempPath.length; index++) {
      const element = tempPath[index] as HTMLDivElement
      if (element.className === 'table-body') {
        for (
          let childIndex = 0;
          childIndex < element.childNodes.length;
          childIndex++
        ) {
          const childNode = element.childNodes[childIndex] as HTMLDivElement
          childNode.style.backgroundColor = ''
          for (let i = 0; i < childNode.children.length; i++) {
            const a = childNode.children[i] as HTMLDivElement
            a.style.backgroundColor = ''
          }
          const ChildChecked = childNode.childNodes[0].childNodes[0] as HTMLInputElement
          if (ChildChecked && this.properties.ListStyle === 1) {
            ChildChecked.checked = false
          }
        }
        break
      }
    }
  }
}

/**
* @description handle setting backgroundColor and option checked/not
* @function setOptionBGColorAndChecked
* @param event KeyboardEvent or MouseEvent
*/
setOptionBGColorAndChecked (e: KeyboardEvent | MouseEvent) {
  const currentTargetElement = e.currentTarget as HTMLDivElement
  const childNodeChecked = currentTargetElement.children[0].childNodes[0] as HTMLInputElement
  if (this.data.type === 'ComboBox') {
    currentTargetElement.style.backgroundColor =
   currentTargetElement.style.backgroundColor === 'rgb(59, 122, 231)'
     ? ''
     : 'rgb(59, 122, 231)'
  }
  if (this.data.type === 'ComboBox') {
    childNodeChecked.checked = !childNodeChecked.checked
  }
  if ((e.target instanceof HTMLDivElement || e.target instanceof HTMLTableCellElement || e.target instanceof HTMLTableRowElement || e.target instanceof HTMLInputElement)) {
    const targetEvent = e.target
    if (this.data.type === 'ComboBox') {
      currentTargetElement.style.backgroundColor = ''
    }
    if (
      this.properties.ListStyle === 1 &&
   this.properties.MultiSelect === 0
    ) {
      childNodeChecked.checked = !childNodeChecked.checked
      if (childNodeChecked.checked === true) {
        currentTargetElement.style.backgroundColor = 'rgb(59, 122, 231)'
      } else {
        currentTargetElement.style.backgroundColor = ''
      }
    } else {
      childNodeChecked.checked = !childNodeChecked.checked
      if (this.properties.MultiSelect === 0) {
        currentTargetElement.style.backgroundColor = 'rgb(59, 122, 231)'
        if (this.properties.ListStyle === 1) {
          if (childNodeChecked.checked) {
            currentTargetElement.style.backgroundColor = 'rgb(59, 122, 231)'
          }
        }
      } else if (this.properties.MultiSelect === 1) {
        if (currentTargetElement.style.backgroundColor === 'rgb(59, 122, 231)') {
          currentTargetElement.style.backgroundColor = ''
          if (this.properties.ListStyle === 1) {
            if (childNodeChecked.checked) {
              currentTargetElement.style.backgroundColor = 'rgb(59, 122, 231)'
            } else {
              currentTargetElement.style.backgroundColor = ''
            }
          }
        } else {
          currentTargetElement.style.backgroundColor = 'rgb(59, 122, 231)'
          if (this.properties.ListStyle === 1) {
            if (childNodeChecked.checked) {
              currentTargetElement.style.backgroundColor = 'rgb(59, 122, 231)'
            }
          }
        }
      } else if (this.properties.MultiSelect === 2) {
        childNodeChecked.checked = true
        currentTargetElement.style.backgroundColor = 'rgb(59, 122, 231)'
      }
    }
  }
}

unselectBGColorAndchecked (e: KeyboardEvent | MouseEvent) {
  const currentTargetElement = e.currentTarget as HTMLDivElement
  const childNodeChecked = currentTargetElement.children[0].childNodes[0] as HTMLInputElement
  if (this.properties.MultiSelect === 2) {
    childNodeChecked.checked = false
    currentTargetElement.style.backgroundColor = ''
  }
}

/**
* @description set BGColor and Checked matchEntry
* @function setBGandCheckedForMatch
* @param singleMatch which is an HTMLDivElement
*/
setBGandCheckedForMatch (singleMatch: HTMLDivElement) {
  if (singleMatch !== undefined) {
    singleMatch.style.backgroundColor = 'rgb(59, 122, 231)'
    if ((this.properties.ListStyle === 1)) {
      const tempNode = singleMatch.childNodes[0].childNodes[0] as HTMLInputElement
      tempNode.checked = !tempNode.checked
    }
  }
}

get setFontStyle () {
  const tempFontStyle = this.properties.Font!.FontStyle!.toLowerCase()
  if (tempFontStyle.includes(this.properties.Font!.FontName!.toLowerCase())) {
    if (tempFontStyle.includes('italic')) {
      this.isItalic = true
    } else {
      this.isItalic = false
    }
    if (tempFontStyle.split(' ').indexOf('bold') > -1) {
      this.tempWeight = 'bold'
    } else if (tempFontStyle.includes('black')) {
      this.tempWeight = '900'
    } else if (tempFontStyle.split(' ').indexOf('light') > -1) {
      this.tempWeight = 'lighter'
    } else if (tempFontStyle.includes('semibold')) {
      this.tempWeight = '540'
    } else if (tempFontStyle.includes('semilight')) {
      this.tempWeight = '300'
    } else {
      this.tempWeight = '400'
    }
    if (tempFontStyle.split(' ').indexOf('condensed') > -1) {
      this.tempStretch = 'condensed'
    } else if (tempFontStyle.includes('semicondensed')) {
      this.tempStretch = 'semi-condensed'
    } else if (tempFontStyle.includes('narrow')) {
      this.tempStretch = 'ultra-condensed'
    } else {
      this.tempStretch = 'normal'
    }
    return this.properties.Font!.FontName!
  } else {
    this.isItalic = false
    this.tempWeight = '400'
    this.tempStretch = 'normal'
    return this.properties.Font!.FontName!
  }
}
@Emit('parentConextMenu')
parentConextMenu (event: MouseEvent) {
  return event
}
openTextContextMenu (event: MouseEvent) {
  EventBus.$emit('openTextContextMenu', event, this.controlId)
}
get spanStyleObj () {
  const controlProp = this.properties
  const font: font = controlProp.Font
    ? controlProp.Font
    : {
      FontName: 'Arial',
      FontSize: 20,
      FontItalic: true,
      FontBold: true,
      FontUnderline: true,
      FontStrikethrough: true
    }
  return {
    textDecoration:
      font.FontStrikethrough === true && font.FontUnderline === true
        ? 'underline line-through'
        : font.FontUnderline
          ? 'underline'
          : font.FontStrikethrough
            ? 'line-through'
            : '',
    color: !this.properties.Enabled ? 'gray' : ''
  }
}

get spanClassStyleObj () {
  const controlProp = this.properties
  const font: font = controlProp.Font
    ? controlProp.Font
    : {
      FontName: 'Arial',
      FontSize: 20,
      FontItalic: true,
      FontBold: true,
      FontUnderline: true,
      FontStrikethrough: true
    }
  return {
    textDecoration:
      font.FontStrikethrough === true && font.FontUnderline === true
        ? 'underline line-through'
        : font.FontUnderline === true
          ? 'underline'
          : font.FontStrikethrough === true && controlProp.Accelerator !== ''
            ? 'line-through underline'
            : font.FontStrikethrough === true ? 'line-through' : '',
    color: !this.properties.Enabled ? 'gray' : ''
  }
}

positionLogo (value:any) {
  let style = {
    order: Number(),
    alignItems: '',
    transform: '',
    top: '',
    left: '',
    position: '',
    display: 'inline-flex',
    width: '',
    justifyContent: '',
    overflow: ''
  }
  this.reverseStyle = {
    display: '',
    flexDirection: '',
    justifyItems: '',
    position: '',
    justifyContent: 'center',
    alignItems: '',
    width: '',
    alignSelf: 'center'
  }
  this.imagePos.alignSelf = ''
  this.reverseStyle.display = 'flex'
  switch (value) {
    case 0: break
    case 1: style.alignItems = 'center'
      this.imagePos.alignSelf = 'center'
      break
    case 2: style.alignItems = 'flex-end'
      this.reverseStyle.alignItems = 'flex-end'
      break
    case 3: this.reverseStyle.flexDirection = 'row-reverse'
      break
    case 4: this.reverseStyle.flexDirection = 'row-reverse'
      style.alignItems = 'center'
      this.imagePos.alignSelf = 'center'
      break
    case 5: this.reverseStyle.flexDirection = 'row-reverse'
      style.alignItems = 'flex-end'
      this.reverseStyle.alignItems = 'flex-end'
      break
    case 6: this.reverseStyle.display = 'grid'
      break
    case 7: this.reverseStyle.display = 'grid'
      this.reverseStyle.justifyItems = 'center'
      break
    case 8: this.reverseStyle.display = 'grid'
      this.reverseStyle.justifyItems = 'end'
      break
    case 9: this.reverseStyle.display = 'grid'
      style.order = -1
      style.overflow = 'hidden'
      break
    case 10: this.reverseStyle.display = 'grid'
      this.reverseStyle.justifyItems = 'center'
      style.order = -1
      style.overflow = 'hidden'
      break
    case 11: this.reverseStyle.display = 'grid'
      this.reverseStyle.justifyItems = 'end'
      style.order = -1
      style.overflow = 'hidden'
      break
    case 12: this.reverseStyle.position = 'relative'
      this.reverseStyle.width = '100%'
      style.position = 'absolute'
      style.top = '50%'
      style.left = '50%'
      style.transform = 'translate(-50%, -50%)'
      style.justifyContent = 'center'
      style.width = 'fit-content'
      break
    default:
  }
  this.labelStyle = style
}
pictureSize () {
  const imgStyle = {
    width: 'fit-content',
    height: 'fit-content',
    filter: '',
    maxWidth: '100%'
  }
  if (this.properties.Picture) {
    Vue.nextTick(() => {
      imgStyle.width = this.properties.Width! <= this.imageRef!.naturalWidth ? `${this.properties.Width}px` : 'fit-content'
      imgStyle.height = this.properties.Height! <= this.imageRef!.naturalHeight ? `${this.properties.Height}px` : 'fit-content'
      if (this.properties.PicturePosition === 9 || this.properties.PicturePosition === 10 || this.properties.PicturePosition === 11) {
        this.imageRef.scrollIntoView(true)
      }
      imgStyle.filter = !this.properties.Enabled ? 'sepia(0) grayscale(1) blur(3px) opacity(0.2)' : ''
    })
  }
  this.imageProperty = imgStyle
}
onPictureLoad () {
  const imgStyle = {
    width: 'auto',
    height: 'auto',
    filter: ''
  }
  this.imageProperty = imgStyle
  this.pictureSize()
}
labelAlignment () {
  let { picPosLeftRight, picPosTopBottom, imgHeight, labelHeight } = this.setHeightWidthVariable()
  let totalHeight = {
    height: 0
  }

  if (picPosLeftRight.includes(this.properties.PicturePosition!)) {
    totalHeight.height = labelHeight
  } else if (picPosTopBottom.includes(this.properties.PicturePosition!)) {
    totalHeight.height = imgHeight + labelHeight
  } else if (this.properties.PicturePosition! === 12) {
    totalHeight.height = imgHeight >= labelHeight ? imgHeight : labelHeight
  }

  this.reverseStyle.alignSelf = 'inherit'
  if (this.imageRef && this.imageRef.naturalHeight > this.properties.Height!) {
    this.reverseStyle.alignSelf = 'inherit'
  } else {
    let logoProp = this.logoRef
    if (this.properties.Width! > logoProp!.clientWidth && this.properties.Height! > totalHeight.height && ((this.imageRef && this.imageRef.naturalHeight) < this.properties.Height! || (this.imageRef && this.imageRef.naturalWidth) < this.properties.Width!)) {
      this.reverseStyle.alignSelf = 'center'
    }
  }
}
getWidthHeight () {
  let widthHeightData = {
    width: 0,
    height: 0
  }
  let { picPosLeftRight, picPosTopBottom, controlWidthIncrease, imgHeight, imgWidth, labelHeight, labelWidth } = this.setHeightWidthVariable()
  let componentRef = this.componentRef
  if (this.properties.Picture) {
    if (picPosLeftRight.includes(this.properties.PicturePosition!)) {
      if (imgHeight >= labelHeight) {
        widthHeightData.height = imgHeight
      } else {
        widthHeightData.height = labelHeight
      }
      widthHeightData.width = (imgWidth + labelWidth)
    } else if (picPosTopBottom.includes(this.properties.PicturePosition!)) {
      if (imgWidth >= labelWidth) {
        widthHeightData.width = imgWidth
      } else {
        widthHeightData.width = labelWidth
      }
      widthHeightData.height = imgHeight + labelHeight
    } else if (this.properties.PicturePosition! === 12) {
      widthHeightData.width = imgWidth >= labelWidth ? imgWidth : labelWidth
      widthHeightData.height = imgHeight >= labelHeight ? imgHeight : labelHeight
    }
  } else {
    widthHeightData.width = labelWidth + 5
    widthHeightData.height = labelHeight
  }
  if (this.checkForWidthIncrease(controlWidthIncrease)) {
    if (this.properties.Picture) {
      widthHeightData.width = widthHeightData.width + 20
    } else {
      widthHeightData.width = widthHeightData.width + 15
    }
  } else if (this.properties.WordWrap) {
    widthHeightData.width = (((widthHeightData.width + 20) < componentRef!.clientWidth) || (imgWidth > componentRef!.clientWidth)) ? widthHeightData.width : componentRef!.clientWidth
  }
  return widthHeightData
}
checkForWidthIncrease (controlArr:Array<string>) {
  for (let val of controlArr) {
    if (this.properties.Name!.toLowerCase().includes(val)) {
      return true
    }
  }
  return false
}

setHeightWidthVariable () {
  const picPosLeftRight = [0, 1, 2, 3, 4, 5]
  const picPosTopBottom = [6, 7, 8, 9, 10, 11]
  const controlWidthIncrease = ['optionbutton', 'checkbox', 'commandbutton', 'togglebutton']
  const imgHeight = this.imageRef && this.imageRef.naturalHeight
  const imgWidth = this.imageRef && this.imageRef.naturalWidth
  let labelHeight = 0
  let labelWidth = 0
  // calcluate text height
  if (this.textSpanRef && this.textSpanRef.offsetHeight) {
    labelHeight = this.textSpanRef.offsetHeight
  } else if ((this.editableTextRef && this.editableTextRef.$el as HTMLSpanElement) && (this.editableTextRef && this.editableTextRef.$el as HTMLSpanElement).offsetHeight) {
    labelHeight = (this.editableTextRef.$el as HTMLSpanElement).offsetHeight
  }
  // calcuate text width
  if (this.textSpanRef && this.textSpanRef.offsetWidth) {
    labelWidth = this.textSpanRef.offsetWidth
  } else if ((this.editableTextRef && this.editableTextRef.$el as HTMLSpanElement) && (this.editableTextRef && this.editableTextRef.$el as HTMLSpanElement).offsetWidth) {
    labelWidth = (this.editableTextRef.$el as HTMLSpanElement).scrollWidth
  }
  return { picPosLeftRight, picPosTopBottom, controlWidthIncrease, imgHeight, imgWidth, labelHeight, labelWidth }
}
setCaretPosition () {
  Vue.nextTick(() => {
    (this.editableTextRef.$el as HTMLSpanElement).focus()
    const el = this.editableTextRef.$el
    const range = document.createRange()
    const sel = window.getSelection()!
    if (el.childNodes[0]) {
      range.setStart(el.childNodes[0], this.properties.Caption!.length)
      range.collapse(true)
      sel.removeAllRanges()
      sel.addRange(range)
    }
  })
}
updateMouseCursor () {
  const controlProp = this.properties
  if (this.data.type === 'Page' || this.data.type === 'MultiPage') {
    EventBus.$emit('getMouseCursor', this.properties.ID, (pointer: string) => {
      if (controlProp.ID === this.controlId) {
        this.controlCursor = pointer
      }
    })
  } else {
    if (controlProp.MousePointer !== 0 || controlProp.MouseIcon !== '') {
      this.controlCursor = this.getMouseCursorData
    } else if (controlProp.MousePointer === 0) {
      EventBus.$emit('getMouseCursor', this.properties.ID, (pointer: string) => {
        if (controlProp.ID === this.controlId) {
          this.controlCursor = pointer
        }
      })
    } else {
      this.controlCursor = 'default'
    }
  }
}
}
