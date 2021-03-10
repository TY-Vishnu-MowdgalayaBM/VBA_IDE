/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { text, withKnobs } from '@storybook/addon-knobs'
import { mapState, mapActions } from 'vuex'

import { sampleStore, updateVuexCallback, initUpdate } from '@/api/storybook/utilReactivity.js'

import FdResizeControl from '@/FormDesigner/components/organisms/FDResizeControl/index.vue'
import SpecNote from './index.spec.md'

const scrollBarObj = {
  store: sampleStore,
  components: { FdResizeControl },
  props: {
  },
  template: `
    <div :style="styled">
      <fd-resize-control
        :controlId="ControlId"
        :userFormId="UserFormId"
        :containerId="UserFormId"
        />
      <div style="position: absolute; bottom: 0;">
        isRunMode: {{isRunMode}}
        <button @click="clickChangeMode">
         changeRunMode
        </button>
        <button @click="releaseSelect">
          releaseSelect
        </button>
        <br>
        <label>
          Check Value :
          <span>{{curValue}}</span>
        </label>
        <br>
        <label>
          Check Name :
          <span>{{curName}}</span>
        </label>
        <br>
      </div>
    </div>
    `,
  methods: {
    ...mapActions({
      changeMode: 'fd/changeRunMode',
      selectControl: 'fd/selectControl'
    }),
    clickChangeMode () {
      this.changeMode(!this.isRunMode)
    },
    releaseSelect () {
      this.selectControl({
        userFormId: this.UserFormId,
        select: { container: [], selected: [] }
      })
    }
  },
  created () {
    initUpdate(sampleStore, this)
  },
  curValue () {
    return this.curData[this.UserFormId][this.ControlId].properties.Value
  },
  // curText () {
  //   return this.curData[this.UserFormId][this.ControlId].properties.Text
  // },
  curName () {
    return this.curData[this.UserFormId][this.ControlId].properties.Name
  },
  // curTag () {
  //   return this.curData[this.UserFormId][this.ControlId].properties.Tag
  // },
  extraData () {
    return this.curData[this.UserFormId][this.ControlId].extraDatas
  },
  data () {
    return {
      UserFormId: text('UserFormId', 'ID_USERFORM1'),
      ControlId: text('ControlId', 'ID_ScrollBar1')
    }
  },
  computed: {
    ...mapState({
      isRunMode: state => state.fd.isRunMode,
      curData: state => state.fd.userformData
    }),
    styled () {
      return {
        width: `400px`,
        height: `400px`,
        backgroundColor: '#ffffe0'
      }
    }
  }
}

storiesOf('atoms|FdControl/FDScrollBar', module).addDecorator(withKnobs({
  callback: updateVuexCallback(sampleStore)
})).add(
  'scrollBar',
  () => {
    return { ...scrollBarObj }
  },
  {
    notes: { markdown: SpecNote },
    info: {}
  }
)
