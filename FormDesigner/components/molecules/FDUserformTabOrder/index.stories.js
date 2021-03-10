/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import store from '@/store/index.ts'
import { EventBus } from '@/FormDesigner/event-bus'

import FDUserformTabOrder from '.'
import SpecNote from './index.spec.md'

const wrapper = {
  store
}

storiesOf('dialogs|FDUserformTabOrder', module).add(
  'userformTabOrder',
  () => ({
    ...wrapper,
    components: { FDUserformTabOrder },
    props: {
    },
    template: `
        <div :style="styled">
          <FDUserformTabOrder />
          <div style="position: absolute; bottom: 0;">
          <button @click="openTabOrder">
            Show Tab Order
          </button>
          </div>
        </div>
      `,
    methods: {
      openTabOrder () {
        EventBus.$emit('userFormTabOrder', 'ID_USERFORM1', 'ID_USERFORM1')
      }
    },
    computed: {
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
    notes: { markdown: SpecNote },
    info: {}
  }
)
