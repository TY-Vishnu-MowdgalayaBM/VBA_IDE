/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import store from '@/store/index.ts'

import ToolBox from '.'
import SpecNote from './index.spec.md'

const wrapper = {
  store
}

storiesOf('organisms/FDToolBox', module).add(
  'toolBox',
  () => ({
    ...wrapper,
    components: { ToolBox },
    props: {
    },
    template: `
        <div :style="styled">
          <toolBox>
          </toolBox>
        </div>
      `,
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
