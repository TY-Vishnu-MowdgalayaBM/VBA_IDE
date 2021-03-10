/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import store from '@/store/index.ts'
import { EventBus } from '@/FormDesigner/event-bus'

import FDRenameMultiPageDialog from '.'
import SpecNote from './index.spec.md'

const wrapper = {
  store
}

storiesOf('dialogs|FDRenameMultiPageDialog', module).add(
  'renameMultiPageDialog',
  () => ({
    ...wrapper,
    components: { FDRenameMultiPageDialog },
    props: {
    },
    template: `
        <div :style="styled">
          <FDRenameMultiPageDialog />
          <div style="position: absolute; bottom: 0;">
          <button @click="openTabOrder">
            Show Rename Dialog
          </button>
          </div>
        </div>
      `,
    methods: {
      openTabOrder () {
        EventBus.$emit('renamePage', 'ID_USERFORM1', 'ID_TabStrip1', 0)
      }
    },
    computed: {

      styled () {
        return {
          width: `400px`,
          height: `400px`,
          backgroundColor: '#ffffe0'
        }
      },
      isOpen () {
        return true
      }
    }
  }),
  {
    notes: { markdown: SpecNote },
    info: {}
  }
)
