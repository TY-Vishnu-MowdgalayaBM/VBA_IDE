/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import store from '@/store/index.ts'

import FdFontDialog from '.'
import SpecNote from './index.spec.md'

const wrapper = {
  store
}

storiesOf('dialogs|FDFontDialog', module).add(
  'fontDialog',
  () => ({
    ...wrapper,
    components: { FdFontDialog },
    props: {
    },
    template: `
        <div :style="styled">
          <Fd-fontDialog :isOpen='isOpen' :value="fontValue">
          </Fd-fontDialog>
        </div>
      `,
    computed: {

      styled () {
        return {
          width: `400px`,
          height: `400px`,
          backgroundColor: '#ffffe0'
        }
      },
      fontValue () {
        return {
          'FontName': 'Arial',
          'FontSize': 10,
          'FontBold': true,
          'FontItalic': true,
          'FontUnderline': true,
          'FontStrikethrough': true,
          'FontStyle': 'Arial Narrow Italic'
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
