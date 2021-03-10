/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { text, withKnobs } from '@storybook/addon-knobs'
import { mapState } from 'vuex'
import { sampleStore, updateVuexCallback, initUpdate } from '@/api/storybook/utilReactivity.js'

import FdResizeControl from '.'

const commonMixin = {
  store: sampleStore,
  components: { FdResizeControl },
  template: `
      <div :style="styled">
        <fd-resize-control
          :controlId="ControlId"
          :userFormId="UserFormId"
          :containerId="UserFormId"
          />
      </div>
    `,
  methods: {
  },
  created () {
    initUpdate(sampleStore, this)
  },
  computed: {
    ...mapState({
      userformData: state => state.fd.userformData
    }),
    controlData () {
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
}

const labelObj = {
  ...commonMixin,
  data () {
    return {
      UserFormId: text('UserFormId', 'ID_USERFORM1'),
      ControlId: text('ControlId', 'ID_Label1')
    }
  }
}
const commandButtonObj = {
  ...commonMixin,
  data () {
    return {
      UserFormId: text('UserFormId', 'ID_USERFORM1'),
      ControlId: text('ControlId', 'ID_CommandButton1')
    }
  }
}
const checkboxObj = {
  ...commonMixin,
  data () {
    return {
      UserFormId: text('UserFormId', 'ID_USERFORM1'),
      ControlId: text('ControlId', 'ID_CheckBox1')
    }
  }
}
storiesOf('Test|Resize&Select', module).addDecorator(withKnobs({
  callback: updateVuexCallback(sampleStore)
}))
  .add(
    'label',
    () => {
      return { ...labelObj }
    }
  )
  .add(
    'commandbutton',
    () => {
      return { ...commandButtonObj }
    }
  )
  .add(
    'checkbox',
    () => {
      return { ...checkboxObj }
    }
  )
