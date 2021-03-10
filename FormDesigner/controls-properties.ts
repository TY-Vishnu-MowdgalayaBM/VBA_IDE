import { KeyValueProp, KeyValueStringProp, PositionProp, PositionXYData, ScrollBarData, ScrollBarProp } from './controls-properties-types'

export const controlProperties = {
  /**
  * @description borderStyleProp returns border css style value
  * @function borderStyleProp
  * @param controlData propControlData passed as input
  * @returns string value
  */
  borderStyleProp: (controlData: controlData): string => {
    if (controlData.properties.BorderStyle === 1) {
      return `1px solid ${controlData.properties.BorderColor}`
    } else {
      return 'none'
    }
  },
  /**
* @description specialEffectProp returns box shadow css style value
* @function specialEffectProp
* @param controlData propControlData passed as input
* @returns string value
*/
  specialEffectProp: (controlData: controlData): string => {
    const propObject: KeyValueProp = {
      0: 'none',
      1: '1px 1px #848484',
      2: '-1px -1px #848484',
      3: '0.5px 0.5px #848484',
      4: '-0.5px -0.5px #848484'
    }
    if (propObject[controlData.properties.SpecialEffect!] !== undefined) {
      return propObject[controlData.properties.SpecialEffect!]
    }
    return 'none'
  },
  /**
* @description mousePointerProp returns cursor css style value
* @function mousePointerProp
* @param controlData propControlData passed as input
* @returns string value
*/
  mousePointerProp: (controlData: controlData): string => {
    const propObject: KeyValueProp = {
      0: 'default',
      1: 'context-menu',
      2: 'crosshair',
      3: 'text',
      4: 'nesw-resize',
      5: 'ns-resize',
      6: 'nwse-resize',
      7: 'ew-resize',
      8: 'n-resize',
      9: 'wait',
      10: 'no-drop',
      11: 'progress',
      12: 'help',
      13: 'all-scroll',
      14: `url(${controlData.properties.MouseIcon}) 50 50, auto`
    }
    const controlMousePointerData :number = controlData.properties.MousePointer!
    if (propObject[controlMousePointerData] !== undefined) {
      return propObject[controlMousePointerData!]
    }
    return propObject[0]
  },
  /**
* @description enabledProp returns color css style value
* @function mousePointerProp
* @param controlData propControlData passed as input
* @returns string value
*/
  enabledProp: (controlData: controlData): string => {
    return 'rgba(220, 220, 220, 1)'
  },
  /**
* @description extraDataRepeatProp returns background-repeat css style value
* @function extraDataRepeatProp
* @param controlData propControlData passed as input
* @returns string value
*/
  extraDataRepeatProp: (controlData: controlData): string => {
    const picture = controlData.properties.Picture!
    const pictureTiling = controlData.properties.PictureTiling!
    const pictureSizeMode = controlData.properties.PictureSizeMode!

    return controlProperties.getRepeatDataProp(picture, pictureTiling, pictureSizeMode)
  },
  getRepeatDataProp: (picture: string, pictureTiling: boolean, pictureSizeMode: number) => {
    if (picture === '') {
      if (picture !== '') {
        return 'no-repeat'
      }
      return ''
    } else {
      if (pictureTiling === true) {
        if (pictureSizeMode === 1) {
          return 'no-repeat'
        }
        return 'repeat'
      } else {
        return 'no-repeat'
      }
    }
  },
  /**
* @description picturePositionProp returns background-position css style value
* @function picturePositionProp
* @param controlData propControlData passed as input
* @returns string value
*/
  picturePositionProp: (controlData: controlData): string => {
    const picture = controlData.properties.Picture!
    const pictureAlignment = controlData.properties.PictureAlignment!
    const pictureSizeMode = controlData.properties.PictureSizeMode!
    return controlProperties.getPositionProp(picture, pictureAlignment, pictureSizeMode)
  },
  getPositionProp: (picture: string, pictureAlignment: number, pictureSizeMode: number) => {
    if (picture !== '') {
      if (pictureAlignment === 0) {
        return 'top left'
      } else if (pictureAlignment === 1) {
        return 'top right'
      } else if (pictureAlignment === 2) {
        return 'center'
      } else if (pictureAlignment === 3) {
        return 'bottom left'
      } else if (pictureAlignment === 4) {
        return 'bottom right'
      }
    }
    return ''
  },
  /**
* @description pictureXYPositionProp returns background-position-x and
*  background-position-y css style value
* @function picturePositionProp
* @param controlData propControlData passed as input
* @returns PositionXYData object value
*/
  pictureXYPositionProp: (controlData: controlData): PositionXYData => {
    const positionProp: PositionProp = {
      0: { backgroundPositionX: 'left', backgroundPositionY: 'top' },
      1: { backgroundPositionX: 'left', backgroundPositionY: 'center' },
      2: { backgroundPositionX: 'left', backgroundPositionY: 'bottom' },
      3: { backgroundPositionX: 'right', backgroundPositionY: 'top' },
      4: { backgroundPositionX: 'right', backgroundPositionY: 'center' },
      5: { backgroundPositionX: 'right', backgroundPositionY: 'bottom' },
      6: { backgroundPositionX: 'left', backgroundPositionY: 'top' },
      7: { backgroundPositionX: 'center', backgroundPositionY: 'top' },
      8: { backgroundPositionX: 'right', backgroundPositionY: 'top' },
      9: { backgroundPositionX: 'left', backgroundPositionY: 'bottom' },
      10: { backgroundPositionX: 'center', backgroundPositionY: 'bottom' },
      11: { backgroundPositionX: 'right', backgroundPositionY: 'bottom' },
      12: { backgroundPositionX: 'center', backgroundPositionY: 'center' }
    }
    if (!isNaN(controlData.properties.PicturePosition!) && (controlData.properties.PicturePosition !== undefined)) {
      return positionProp[controlData.properties.PicturePosition]
    }
    return positionProp[7]
  },
  /**
* @description pictureAlignmentProp returns background-position-x and
*  background-position-y css style value
* @function pictureAlignmentProp
* @param controlData propControlData passed as input
* @returns PositionXYData object value
*/
  pictureAlignmentProp: (controlData: controlData): PositionXYData => {
    const positionProp: PositionProp = {
      0: { backgroundPositionX: 'left', backgroundPositionY: 'top' },
      1: { backgroundPositionX: 'right', backgroundPositionY: 'top' },
      2: { backgroundPositionX: 'center', backgroundPositionY: 'center' },
      3: { backgroundPositionX: 'left', backgroundPositionY: 'bottom' },
      4: { backgroundPositionX: 'right', backgroundPositionY: 'bottom' }
    }
    if (controlData.properties.PictureAlignment !== undefined) {
      const index:number = controlData.properties.PictureAlignment!
      return positionProp[index]
    }
    return positionProp[2]
  },
  /**
* @description pictureSizeModeProp returns background-size css style value
* @function pictureSizeModeProp
* @param controlData propControlData passed as input
* @returns string value
*/
  pictureSizeModeProp: (controlData: controlData): string => {
    const index:number = controlData.properties.PictureSizeMode!
    return controlProperties.getSizeModeProp(index)
  },
  getSizeModeProp: (index: number) => {
    const propData:KeyValueProp = {
      0: 'initial',
      1: '100% 100%',
      2: 'contain'
    }
    if (index !== undefined) {
      return propData[index]
    }
    return propData[0]
  },
  /**
* @description scrollBarProp returns overflow css style value
* @function scrollBarProp
* @param controlData propControlData passed as input
* @returns ScrollBarData object value
*/
  scrollBarProp: (controlData: controlData): ScrollBarData => {
    const keepScrollBar:number = controlData.properties.KeepScrollBarsVisible!
    const scrollBar:number = controlData.properties.ScrollBars!
    return controlProperties.setScrollBarProp(keepScrollBar, scrollBar)
  },

  setScrollBarProp: (keepScrollBar:number, scrollBar:number) => {
    const propData:ScrollBarProp = {
      'hide': { overflowX: 'hidden', overflowY: 'hidden' },
      'horizontal': { overflowX: 'scroll', overflowY: 'hidden' },
      'vertical': { overflowX: 'hidden', overflowY: 'scroll' },
      'show': { overflowX: 'scroll', overflowY: 'scroll' }
    }
    if (keepScrollBar === 0 || scrollBar === 0) {
      return propData['hide']
    } else if (keepScrollBar === 1 && (scrollBar === 1 || scrollBar === 3)) {
      return propData['horizontal']
    } else if (keepScrollBar === 2 && (scrollBar === 2 || scrollBar === 3)) {
      return propData['vertical']
    } else if (keepScrollBar === 3 && scrollBar === 3) {
      return propData['show']
    } else if ((keepScrollBar === 1 || keepScrollBar === 3) && scrollBar === 1) {
      return propData['horizontal']
    } else if ((keepScrollBar === 2 || keepScrollBar === 3) && scrollBar === 2) {
      return propData['vertical']
    } else if (keepScrollBar === 0 && scrollBar === 3) {
      return propData['hide']
    }
    return propData['hide']
  },
  /**
* @description scrollBarWidthAndHeightProp returns height and width css style value
* @function scrollBarWidthAndHeightProp
* @param controlData propControlData passed as input
* @returns KeyValueStringProp object value
*/
  scrollBarWidthAndHeightProp: (controlData: controlData): KeyValueStringProp => {
    let propData:KeyValueStringProp = { scrollHeight: '0px', scrollWidth: '0px' }
    const height:number = controlData.properties.Height!
    const scrollingHeight:number = controlData.properties.ScrollHeight!
    const width:number = controlData.properties.Width!
    const scrollingWidth:number = controlData.properties.ScrollWidth!
    propData = { scrollWidth: (scrollingWidth < width) ? '100%' : `${scrollingWidth}px`, scrollHeight: (scrollingHeight < height) ? '100%' : `${scrollingHeight}px` }
    return propData
  },
  /**
* @description scrollBarTextBoxProp returns overflow-x and overflow-y css style value
* @function scrollBarTextBoxProp
* @param controlData propControlData passed as input
* @returns ScrollBarData object value
*/
  scrollBarTextBoxProp: (controlData: controlData): ScrollBarData => {
    const propData:ScrollBarProp = {
      'hide': { overflowX: 'hidden', overflowY: 'hidden' },
      'show': { overflowX: 'auto', overflowY: 'auto' },
      'horizontal': { overflowX: 'auto', overflowY: 'hidden' },
      'vertical': { overflowX: 'hidden', overflowY: 'auto' }
    }
    const scrollBar:number = controlData.properties.ScrollBars!
    if (scrollBar === 0) {
      return propData['hide']
    } else if (scrollBar === 1) {
      return propData['horizontal']
    } else if (scrollBar === 2) {
      return propData['vertical']
    } else {
      return propData['show']
    }
  },
  /**
  * @description controlsOrientationProp returns transform css style value based on the Orientation
  * @function controlsOrientationProp
  * @param controlData propControlData passed as input
  * @returns boolean value
  */
  controlsOrientationProp: (controlData: controlData): boolean => {
    if (controlData.properties.Orientation === 2) {
      return false
    } else if (controlData.properties.Orientation === 0) {
      if (controlData.properties.Height! >= controlData.properties.Width!) {
        return true
      } else {
        return false
      }
    } return true
  },
  /**
  * @description getForeColor returns color css style value based on the Enabled css property
  * @function getForeColor
  * @param controlData propControlData passed as input
  * @returns string value
  */
  getForeColor: (controlData: controlData): string => {
    if (controlData.properties.Enabled) {
      return controlData.properties.ForeColor!
    } else {
      return 'rgba(220, 220, 220, 1)'
    }
  },
  /**
  * @description transformScrollButtonStyle returns transform css style value based on the TabOrientation property
  * @function transformScrollButtonStyle
  * @param controlData propControlData passed as input
  * @returns string value
  */
  transformScrollButtonStyle: (controlData: controlData): string => {
    if (controlData.properties.TabOrientation === 3) {
      return 'rotate(90deg)'
    } else {
      return ''
    }
  },
  /**
  * @description acceleratorProp returns update Caption value with accelerator
  * @function acceleratorProp
  * @param caption
  * @param accelerator
  * @returns object with afterbeginCaption, acceleratorCaption, beforeendCaption values
  */
  acceleratorProp: (caption: string, accelerator: string) => {
    let afterbeginCaption:string = ''
    let acceleratorCaption:string = ''
    let beforeendCaption:string = ''
    let isPresent:boolean = false
    if (caption && accelerator) {
      for (var i = 0; i < caption.length; i++) {
        if (caption[i] === accelerator) {
          isPresent = true
          break
        }
      }
      if (isPresent && accelerator !== '') {
        const postion:number = caption.indexOf(accelerator)
        acceleratorCaption = accelerator
        afterbeginCaption = caption.substring(0, postion)
        beforeendCaption = caption.substring(postion + 1, caption.length)
      } else {
        afterbeginCaption = caption
      }
    } else {
      afterbeginCaption = caption!
    } if (!isPresent) {
      for (var j = 0; j < caption.length; j++) {
        if (caption[j].toLowerCase() === accelerator.toLowerCase()) {
          isPresent = true
          break
        }
      } if (isPresent && accelerator.toLowerCase() !== '') {
        const postion:number = caption.toLowerCase().indexOf(accelerator.toLowerCase())
        acceleratorCaption = caption[postion]
        afterbeginCaption = caption.substring(0, postion)
        beforeendCaption = caption.substring(postion + 1, caption.length)
      } else {
        afterbeginCaption = caption
      }
    }
    return {
      afterbeginCaption: afterbeginCaption,
      acceleratorCaption: acceleratorCaption,
      beforeendCaption: beforeendCaption
    }
  }
}
