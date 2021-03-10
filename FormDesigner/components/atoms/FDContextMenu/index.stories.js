/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import store from '@/store/index.ts'
import { withKnobs } from '@storybook/addon-knobs'
import { controlContextMenu } from '@/FormDesigner/models/controlContextMenuData.ts'
import { userformContextMenu } from '@/FormDesigner/models/userformContextMenuData.ts'

import ContextMenu from '.'
import SpecNote from './index.spec.md'

const commonMixin = {
  store: store,
  components: { ContextMenu },
  template: `
    <div :style="styled">
      <ContextMenu :values="values">
      </ContextMenu>
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
}

const controlObj = {
  ...commonMixin,
  data () {
    return {
      values: controlContextMenu
    }
  }
}
const userFormObj = {
  ...commonMixin,
  data () {
    return {
      values: userformContextMenu
    }
  }
}

storiesOf('atoms|FDContextMenu', module).addDecorator(withKnobs({
}))
  .add(
    'control',
    () => {
      return { ...controlObj }
    }, {
      notes: { markdown: SpecNote },
      info: {}
    }
  )
  .add(
    'userform',
    () => {
      return { ...userFormObj }
    }, {
      notes: { markdown: SpecNote },
      info: {}
    }
  )
