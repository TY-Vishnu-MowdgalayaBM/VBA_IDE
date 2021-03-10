/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { text, number, boolean, select, color } from '@storybook/addon-knobs'

import { changeMode } from '@/stories/util'
import FdSvgImage from '.'
import SpecNote from './index.spec.md'

storiesOf('Atoms|FDSvgImage', module)
  .add('기본', () => ({
    components: { FdSvgImage },
    props: {
      tabIndex: {
        default: number('TabIndex', -1)
      },
      name: {
        default: select('Name',
          [
            'image.svg'
          ],
          'image.svg')
      },
      color: {
        default: color('Color', '#ff0000')
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
        <fd-svg-image 
          :tabIndex="tabIndex"
          :name="name"></fd-svg-image>
      </div>`,
    computed: {
      styled: (vueObj) => {
        return {
          backgroundColor: 'var(--window-default-bg)',
          color: vueObj.color,
          width: vueObj.size,
          height: vueObj.size
        }
      }
    }
  }),
  {
    notes: { markdown: SpecNote },
    info: {}
  })
