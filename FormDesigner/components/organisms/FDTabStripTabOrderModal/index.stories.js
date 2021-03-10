/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import store from '@/store/index.ts'
import { EventBus } from '@/FormDesigner/event-bus'

import FDTabStripTabOrderModal from '.'
import SpecNote from './index.spec.md'

const wrapper = {
  store
}

storiesOf('dialogs|FDTabStripTabOrderModal', module).add(
  'tabStripTabOrderModal',
  () => ({
    ...wrapper,
    components: { FDTabStripTabOrderModal },
    props: {
    },
    template: `
        <div :style="styled">
          <FDTabStripTabOrderModal />
          <div style="position: absolute; bottom: 0;">
          <button @click="openTabOrder">
            Show Tab Order
          </button>
          </div>
        </div>
      `,
    methods: {
      openTabOrder () {
        EventBus.$emit('tabStripTabOrder', 'ID_USERFORM1', 'ID_TabStrip1')
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
