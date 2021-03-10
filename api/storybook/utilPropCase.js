
import { textAlign, mousePointer, specialEffect, backStyle, borderStyle, picturePosition, dragBehavior, alignment,
  buttonSpecialEffect, cycle, dropButtonStyle, enterFieldBehavior, imeMode, keepScrollBarsVisible,
  listStyle, matchEntry, multiSelect, orientation, pictureAlignment, pictureSizeMode, scrollBars, startUpPosition,
  style, styleOfTabs, tabOrientation, showDropButtonWhen, styleOfComboBox
} from '../../FormDesigner/controls-select-types'
import { GROUPID_1, GROUPID_2, GROUPID_3, GROUPID_4, GROUPID_5, GROUPID_6, GROUPID_7, GROUPID_8 } from '../../FormDesigner/controls-group-types'
import { text, number, boolean, select, color, files } from '@storybook/addon-knobs'

const imageDefaultValue = []
const textDefaultValue = ''

export default function getStoryFunction (propName, ControlId) {
  let result = () => {}
  switch (propName) {
    case 'Font':
      result = (value) => {
        value.FontName ? text('FontName', value.FontName, GROUPID_3) : text('FontName', value.FontName, GROUPID_3)
        value.FontSize ? number('FontSize', value.FontSize, textDefaultValue, GROUPID_3) : number('FontSize', value.FontSize, textDefaultValue, GROUPID_3)
        value.FontBold ? boolean('FontBold', value.FontBold, GROUPID_3) : boolean('FontBold', value.FontBold, GROUPID_3)
        value.FontItalic ? boolean('FontItalic', value.FontItalic, GROUPID_3) : boolean('FontItalic', value.FontItalic, GROUPID_3)
        value.FontUnderline ? boolean('FontUnderline', value.FontUnderline, GROUPID_3) : boolean('FontUnderline', value.FontUnderline, GROUPID_3)
        value.FontStrikethrough ? boolean('FontStrikethrough', value.FontStrikethrough, GROUPID_3) : boolean('FontStrikethrough', value.FontStrikethrough, GROUPID_3)
        value.FontStyle ? text('FontStyle', value.FontStyle, GROUPID_3) : text('FontStyle', value.FontStyle, GROUPID_3)
      }
      break
    case 'Accelerator':
      result = (value) => { text('Accelerator', value, GROUPID_4) }
      break
    case 'Alignment':
      result = (value) => { select('Alignment', alignment, value, GROUPID_4) }
      break
    case 'AutoSize':
      result = (value) => { boolean('AutoSize', value, GROUPID_2) }
      break
    case 'AutoTab':
      result = (value) => { boolean('AutoTab', value, GROUPID_2) }
      break
    case 'AutoWordSelect':
      result = (value) => { boolean('AutoWordSelect', value, GROUPID_2) }
      break
    case 'BackColor':
      result = (value) => { color('BackColor', value, GROUPID_1) }
      break
    case 'BackStyle':
      result = (value) => { select('BackStyle', backStyle, value, GROUPID_1) }
      break
    case 'BorderColor':
      result = (value) => { color('BorderColor', value, GROUPID_1) }
      break
    case 'BorderStyle':
      result = (value) => { select('BorderStyle', borderStyle, value, GROUPID_1) }
      break
    case 'BoundColumn':
      result = (value) => { number('BoundColumn', value, GROUPID_1) }
      break
    case 'Cancel':
      result = (value) => { boolean('Cancel', value, GROUPID_2) }
      break
    case 'Cycle':
      result = (value) => { select('Cycle', cycle, value, GROUPID_2) }
      break
    case 'Caption':
      result = (value) => { text('Caption', value, GROUPID_1) }
      break
    case 'ColumnCount':
      result = (value) => { number('ColumnCount', value, GROUPID_8) }
      break
    case 'ColumnHeads':
      result = (value) => { boolean('ColumnHeads', value, GROUPID_8) }
      break
    case 'ColumnWidths':
      result = (value) => { text('ColumnWidths', value, GROUPID_8) }
      break
    case 'ControlSource':
      result = (value) => { text('ControlSource', value, GROUPID_8) }
      break
    case 'ControlTipText':
      result = (value) => { text('ControlTipText', value, GROUPID_1) }
      break
    case 'Default':
      result = (value) => { boolean('Default', value, GROUPID_2) }
      break
    case 'Delay':
      result = (value) => { number('Delay', value) }
      break
    case 'DragBehavior':
      result = (value) => { select('DragBehavior', dragBehavior, value, GROUPID_4) }
      break
    case 'DrawBuffer':
      result = (value) => { number('DrawBuffer', value, GROUPID_4) }
      break
    case 'DropButtonStyle':
      result = (value) => { select('DropButtonStyle', dropButtonStyle, value, GROUPID_1) }
      break
    case 'Enabled':
      result = (value) => { boolean('Enabled', value, GROUPID_2) }
      break
    case 'EnterFieldBehavior':
      result = (value) => { select('EnterFieldBehavior', enterFieldBehavior, value, GROUPID_4) }
      break
    case 'EnterKeyBehavior':
      result = (value) => { boolean('EnterKeyBehavior', value, GROUPID_2) }
      break
    case 'ForeColor':
      result = (value) => { color('ForeColor', value, GROUPID_1) }
      break
    case 'GroupName':
      result = (value) => { text('GroupName', value, GROUPID_4) }
      break
    case 'Height':
      result = (value) => { number('Height', value, textDefaultValue, GROUPID_6) }
      break
    case 'HelpContextID':
      result = (value) => { number('HelpContextID', value, textDefaultValue, GROUPID_4) }
      break
    case 'HideSelection':
      result = (value) => { boolean('HideSelection', value, GROUPID_2) }
      break
    case 'IMEMode':
      result = (value) => { select('IMEMode', imeMode, value, GROUPID_4) }
      break
    case 'IntegralHeight':
      result = (value) => { boolean('IntegralHeight', value, GROUPID_2) }
      break
    case 'KeepScrollBarsVisible':
      result = (value) => { select('KeepScrollBarsVisible', keepScrollBarsVisible, value, GROUPID_7) }
      break
    case 'LargeChange':
      result = (value) => { number('LargeChange', value) }
      break
    case 'Left':
      result = (value) => { number('Left', value, textDefaultValue, GROUPID_6) }
      break
    case 'ListRows':
      result = (value) => { number('ListRows', value, textDefaultValue, GROUPID_8) }
      break
    case 'ListStyle':
      result = (value) => { select('ListStyle', listStyle, value, GROUPID_4) }
      break
    case 'ListWidth':
      result = (value) => { text('ListWidth', value, GROUPID_8) }
      break
    case 'Locked':
      result = (value) => { boolean('Locked', value, GROUPID_2) }
      break
    case 'MatchEntry':
      result = (value) => { select('MatchEntry', matchEntry, value, GROUPID_2) }
      break
    case 'MatchRequired':
      result = (value) => { boolean('MatchRequired', value, GROUPID_2) }
      break
    case 'Max':
      result = (value) => { number('Max', value) }
      break
    case 'MaxLength':
      result = (value) => { number('MaxLength', value, textDefaultValue, GROUPID_2) }
      break
    case 'Min':
      result = (value) => { number('Min', value) }
      break
    case 'MouseIcon':
      result = (value) => { files('MouseIcon', '.ico', imageDefaultValue, GROUPID_4) }
      break
    case 'MousePointer':
      result = (value) => { select('MousePointer', mousePointer, value, GROUPID_4) }
      break
    case 'MultiLine':
      result = (value) => { boolean('MultiLine', value, GROUPID_2) }
      break
    case 'MultiRow':
      result = (value) => { boolean('MultiRow', value) }
      break
    case 'MultiSelect':
      result = (value) => { select('MultiSelect', multiSelect, value, GROUPID_2) }
      break
    case 'Name':
      result = (value) => { text('Name', value, GROUPID_4) }
      break
    case 'Orientation':
      result = (value) => { select('Orientation', orientation, value, GROUPID_1) }
      break
    case 'ID':
      result = (value) => { text('ID', value) }
      break
    case 'PasswordChar':
      result = (value) => { text('PasswordChar', value, GROUPID_1) }
      break
    case 'Picture':
      result = (value) => { files('Picture', '.jpg, .jpeg, .png, .ico', value, GROUPID_5) }
      break
    case 'PictureAlignment':
      result = (value) => { select('PictureAlignment', pictureAlignment, value, GROUPID_5) }
      break
    case 'PictureSizeMode':
      result = (value) => { select('PictureSizeMode', pictureSizeMode, value, GROUPID_5) }
      break
    case 'PictureTiling':
      result = (value) => { boolean('PictureTiling', value, GROUPID_5) }
      break
    case 'PicturePosition':
      result = (value) => { select('PicturePosition', picturePosition, value, GROUPID_5) }
      break
    case 'ProportionalThumb':
      result = (value) => { boolean('ProportionalThumb', value, GROUPID_1) }
      break
    case 'RightToLeft':
      result = (value) => { boolean('RightToLeft', value, GROUPID_2) }
      break
    case 'RowSource':
      result = (value) => { text('RowSource', value, GROUPID_8) }
      break
    case 'ScrollBars':
      result = (value) => { select('ScrollBars', scrollBars, value, GROUPID_7) }
      break
    case 'ScrollHeight':
      result = (value) => { number('ScrollHeight', value, GROUPID_7) }
      break
    case 'ScrollLeft':
      result = (value) => { number('ScrollLeft', value, GROUPID_7) }
      break
    case 'ScrollTop':
      result = (value) => { number('ScrollTop', value, GROUPID_7) }
      break
    case 'ScrollWidth':
      result = (value) => { number('ScrollWidth', value, GROUPID_7) }
      break
    case 'ShowDropButtonWhen':
      result = (value) => { select('ShowDropButtonWhen', showDropButtonWhen, value, GROUPID_1) }
      break
    case 'ShowModal':
      result = (value) => { boolean('ShowModal', value, GROUPID_2) }
      break
    case 'SmallChange':
      result = (value) => { number('SmallChange', value) }
      break
    case 'SelectionMargin':
      result = (value) => { boolean('SelectionMargin', value, GROUPID_2) }
      break
    case 'SpecialEffect':
      result = (value) => {
        if (ControlId.includes('CheckBox') || ControlId.includes('OptionButton')) {
          select('SpecialEffect', buttonSpecialEffect, value, GROUPID_1)
        } else {
          select('SpecialEffect', specialEffect, value, GROUPID_1)
        }
      }
      break
    case 'Style':
      result = (value) => {
        if (ControlId.includes('ComboBox')) {
          select('Style', styleOfComboBox, value, GROUPID_1)
        } else {
          select('Style', styleOfTabs, value, GROUPID_1)
        }
      }
      break
    case 'StartUpPosition':
      result = (value) => { select('StartUpPosition', startUpPosition, value, GROUPID_4) }
      break
    case 'TabFixedHeight':
      result = (value) => { number('TabFixedHeight', value) }
      break
    case 'TabFixedWidth':
      result = (value) => { number('TabFixedWidth', value) }
      break
    case 'TabIndex':
      result = (value) => { number('TabIndex', value, textDefaultValue, GROUPID_4) }
      break
    case 'TabOrientation':
      result = (value) => { select('TabOrientation', tabOrientation, value) }
      break
    case 'TabKeyBehavior':
      result = (value) => { boolean('TabKeyBehavior', value, GROUPID_2) }
      break
    case 'TabStop':
      result = (value) => { boolean('TabStop', value, GROUPID_4) }
      break
    case 'TakeFocusOnClick':
      result = (value) => { boolean('TakeFocusOnClick', value, GROUPID_2) }
      break
    case 'Tag':
      result = (value) => { text('Tag', value, GROUPID_4) }
      break
    case 'Text':
      result = (value) => { text('Text', value, GROUPID_8) }
      break
    case 'TextAlign':
      result = (value) => { select('TextAlign', textAlign, value, GROUPID_2) }
      break
    case 'TextColumn':
      result = (value) => { number('TextColumn', value, textDefaultValue, GROUPID_8) }
      break
    case 'Top':
      result = (value) => { number('Top', value, textDefaultValue, GROUPID_6) }
      break
    case 'TopIndex':
      result = (value) => { number('TopIndex', value, textDefaultValue, GROUPID_8) }
      break
    case 'TripleState':
      result = (value) => { boolean('TripleState', value, GROUPID_2) }
      break
    case 'Value':
      result = (value) => {
        if (typeof value === 'string') {
          text('Value', value, GROUPID_1)
        } else if (typeof value === 'boolean') {
          boolean('Value', value, GROUPID_2)
        } else {
          number('Value', value)
        }
      }
      break
    case 'Visible':
      result = (value) => { boolean('Visible', value, GROUPID_1) }
      break
    case 'Width':
      result = (value) => { number('Width', value, textDefaultValue, GROUPID_6) }
      break
    case 'WordWrap':
      result = (value) => { boolean('WordWrap', value, GROUPID_2) }
      break
    case 'WhatsThisButton':
      result = (value) => { boolean('WhatsThisButton', value, GROUPID_4) }
      break
    case 'WhatsThisHelp':
      result = (value) => { boolean('WhatsThisHelp', value, GROUPID_4) }
      break
    case 'Zoom':
      result = (value) => { number('Zoom', value, GROUPID_4) }
      break
  }

  return result
}
