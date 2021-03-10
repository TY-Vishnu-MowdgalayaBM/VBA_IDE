/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { text, number, boolean } from '@storybook/addon-knobs'
import { changeMode } from '@/stories/util'

import UseButton from '.'
import SpecNote from './index.spec.md'

storiesOf('atoms/UseButton', module)
  .add('기본', () => ({
    components: { UseButton },
    props: {
      caption: {
        default: text('Text', 'Hello Button')
      },
      tabIndex: {
        default: number('TabIndex', -1)
      },
      disabled: {
        default: boolean('Disabled', false)
      },
      id: {
        default: text('ID', 'Hello')
      },
      outline: {
        default: boolean('Outline', false)
      },
      check: {
        default: boolean('Check', false)
      },
      mode: {
        default: () => {
          const resut = boolean('Mode', false)
          return changeMode(resut)
        }
      }
    },
    template: `
      <div :style="styled">
        <use-button 
          v-model="checked"
          @click="action"
          :id="id"
          :tabIndex="tabIndex"
          :outline="outline"
          :check="check"
          :disabled="disabled">{{ caption }}</use-button>
      </div>`,
    methods: {
      action: action('clicked')
    },
    data () {
      return {
        checked: false
      }
    },
    computed: {
      styled: (vueObj) => {
        return {
          width: '100px',
          height: '23px'
        }
      }
    }
  }),
  {
    notes: { markdown: SpecNote },
    info: {}
  })
