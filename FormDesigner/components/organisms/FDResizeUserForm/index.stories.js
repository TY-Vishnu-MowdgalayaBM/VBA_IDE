/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { text, withKnobs } from '@storybook/addon-knobs'
import { mapState } from 'vuex'
import { sampleStore, updateVuexCallback, initUpdate } from '@/api/storybook/utilReactivity.js'

// import FdLabel from '.'
import FdResizeUserForm from '@/FormDesigner/components/organisms/FDResizeUserForm/index.vue'
import SpecNote from './index.spec.md'
import Vue from 'vue'
import VueDragSelector from 'vue-drag-selector'
Vue.use(VueDragSelector)

const resizeUserFormObj = {
  store: sampleStore,
  components: { FdResizeUserForm },
  props: {
  },
  template: `
  <fd-resize-user-form
    :controlId="ControlId"
    :userFormId="UserFormId"
    :containerId="UserFormId"
    />
    `,
  methods: {
  },
  created () {
    initUpdate(sampleStore, this)
  },
  data () {
    return {
      UserFormId: text('UserFormId', 'ID_USERFORM1'),
      ControlId: text('ControlId', 'ID_USERFORM1')
    }
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
storiesOf('organisms|FdControl/ResizeUserForm', module).addDecorator(withKnobs({
  callback: updateVuexCallback(sampleStore)
})).add(
  'userForm',
  () => {
    return { ...resizeUserFormObj }
  },
  {
    notes: { markdown: SpecNote },
    info: {}
  }
)
