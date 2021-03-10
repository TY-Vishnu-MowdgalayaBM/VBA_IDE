/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { mapState, mapActions } from 'vuex'
import { text, number, boolean, select, color, files } from '@storybook/addon-knobs'
import { textAlign, mousePointer, specialEffect, backStyle, borderStyle, picturePosition } from '../../../controls-select-types'
import { GROUPID_1, GROUPID_2, GROUPID_3, GROUPID_4, GROUPID_5, GROUPID_6 } from '../../../controls-group-types'

// use vuex store
import store from '@/store/index.ts'

import FdDynamicControl from '.'
// import SpecNote from './index.spec.md'

const wrapper = {
  store
}
const imageDefaultValue = []
const textDefaultValue = ''

storiesOf('sample|FdControl/FDResizeControlSample', module).add(
  'FDDynamicControl',
  () => ({
    ...wrapper,
    components: { FdDynamicControl },
    props: {
    },
    template: `
        <div :style="styled">
          <fd-dynamic-control
            @mouseenter.native="ActionTest"
            @mouseleave="ActionTest2"
            :userFormId="UserFormId"
            :controlId="ControlId"
            :containerId="UserFormId"
            :isSelected="isSelected"
            @selectedItem="selectedItem"
            @deleteItem="deleteItem"
            >
          </fd-dynamic-control>
        </div>
      `,
    methods: {
      ...mapActions({
        'updateControl': 'fd/updateControl',
        'updateSelectedControlTest': 'fd/selectControl',
        'selectControl': 'fd/selectControl'
      }),
      // you could check action fuction at Action tab
      // it just sample to use action(javascript event) (by vue "native" keyword)
      ActionTest: action('MouseEnter'),
      // it vue $emit sample
      ActionTest2: action('MouseLeave'),
      selectedItem (value) {
        const objs = this.selectedControls[value.item.userFormId]
        // if (objs.selected && objs.selected.length <= 1) {
        //   this.selectControl({ container: [value.item.userFormId], selected: [value.item.controlId] })
        //   this.isSelected = true
        // }
        if (objs.selected && objs.selected.length <= 1) {
          this.selectControl({
            userFormId: value.item.userFormId,
            select: { container: [value.item.containerId], selected: [value.item.controlId] }
          })
          this.isSelected = true
        }
      },
      deleteItem (value) {
      }
    },
    created () {
      const sample = this.sampleData
      const userFormId = this.UserFormId
      const controlId = this.ControlId
      for (let propName in sample) {
        this.updateControl({
          userFormId: userFormId,
          controlId: controlId,
          propertyName: propName,
          value: sample[propName]
        })
      }
      const deleteEmpty = function (Id) {
        return Id !== ''
      }
    },
    data () {
      const sampleData = {
        // these function will be checked at Knobs tab
        Accelerator: text('Accelerator', textDefaultValue, GROUPID_4),
        AutoSize: boolean('AutoSize', false, GROUPID_2),
        BackColor: color('BackColor', '#ffffff', GROUPID_1),
        BackStyle: select('BackStyle', backStyle, 1, GROUPID_1),
        BorderColor: color('BorderColor', '#ffffff', GROUPID_1),
        BorderStyle: select('BorderStyle', borderStyle, 1, GROUPID_1),
        Caption: text('Caption', 'Label1', GROUPID_1),
        ControlTipText: text('ControlTipText', 'helptext', GROUPID_1),
        Enabled: boolean('Enabled', true, GROUPID_2),
        FontName: text('FontName', 'Arial', GROUPID_3),
        FontSize: number('FontSize', 10, textDefaultValue, GROUPID_3),
        FontBold: boolean('FontBold', false, GROUPID_3),
        FontItalic: boolean('FontItalic', false, GROUPID_3),
        FontUnderline: boolean('FontUnderline', false, GROUPID_3),
        FontStrikethrough: boolean('FontStrikethrough', false, GROUPID_3),
        FontStyle: text('FontStyle', 'Arial Narrow Italic', GROUPID_3),
        ForeColor: color('ForeColor', '#000000', GROUPID_1),
        Height: number('Height', 20, textDefaultValue, GROUPID_6),
        HelpContextID: number('HelpContextID', 0, textDefaultValue, GROUPID_4),
        Left: number('Left', 0, textDefaultValue, GROUPID_6),
        MouseIcon: files('MouseIcon', '.ico', imageDefaultValue, GROUPID_4),
        MousePointer: select('MousePointer', mousePointer, 0, GROUPID_4),
        Name: text('Name', 'Label1', GROUPID_1),
        ID: text('ID', 'ID_Label1'),
        Picture: files('Picture', '.jpg, .jpeg, .png, .ico', imageDefaultValue, GROUPID_5),
        PicturePosition: select('PicturePosition', picturePosition, 7, GROUPID_5),
        SpecialEffect: select('SpecialEffect', specialEffect, 0, GROUPID_1),
        TabIndex: number('TabIndex', 0, textDefaultValue, GROUPID_4),
        TabStop: boolean('TabStop', true, GROUPID_4),
        Tag: text('Tag', textDefaultValue, GROUPID_4),
        TextAlign: select('TextAlign', textAlign, 1, GROUPID_2),
        Top: number('Top', 0, textDefaultValue, GROUPID_6),
        Visible: boolean('Visible', true, GROUPID_1),
        Width: number('Width', 200, textDefaultValue, GROUPID_6),
        WordWrap: boolean('WordWrap', true, GROUPID_2)
      }
      return {
        // these function will be checked at Knobs tab
        sampleData: sampleData,
        UserFormId: text('UserFormId', 'ID_USERFORM1'),
        ControlId: text('ControlId', 'ID_Label1'),
        isSelected: false
      }
    },
    computed: {
      // sample data
      ...mapState({
        userformData: state => state.fd.userformData,
        selectedControls: state => state.fd.selectedControls
      }),
      controlData () {
        // return this.$store.state.fd.userformData[this.UserFormId][this.ControlId]
        return this.userformData[this.UserFormId][this.ControlId]
      },
      styled () {
        return {
          width: `400px`,
          height: `400px`,
          backgroundColor: '#ffffe0'
        }
      }
    }
  }),
  {
    // notes: { markdown: SpecNote },
    info: {}
  }
)
