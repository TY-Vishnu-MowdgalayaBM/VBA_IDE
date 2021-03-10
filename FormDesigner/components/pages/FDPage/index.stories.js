/* eslint-disable import/no-extraneous-dependencies */
import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import store from '@/store/index.ts'
import VueSplit from 'vue-split-panel'
import VueDragSelector from 'vue-drag-selector'

import FDPage from '.'

Vue.use(VueSplit)
Vue.use(VueDragSelector)
const wrapper = {
  store
}

storiesOf('Pages|FDPage', module).add(
  'page',
  () => ({
    ...wrapper,
    components: { FDPage },
    props: {
    },
    template: `
        <div :style="styled">
          <FDPage>
          </FDPage>
        </div>
      `,
    computed: {

      styled () {
        return {
          width: `100%`,
          height: `100%`
        }
      }
    }
  })
)
