<template>
  <div>
    <div class="outer-toolbox-div" :style="outerToolboxDivStyleObj">
      <div class="toolbox-header">
        <div>
          <span class="spanClass">ToolBox</span>
        </div>
        <div>
          <span class="closeButton">
            <img
              class="close"
              src="https://img.icons8.com/fluent/48/000000/close-window.png"
            />
          </span>
        </div>
      </div>
      <div class="toolbox-body">
        <div>
          <Button class="toolbox-tab">Controls</Button>
        </div>
        <div class="toolbox-icons">
          <div
            v-for="(value, i) in toolBox"
            :key="i"
            :title="value.name"
            class="container"
            @click="clickIcon(value.name)"
            :id="value.name"
            ref="icons"
          >
            <UseSvgImage :name="value.icon" />
            <div class="overlay">
              <div class="text"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { toolBox } from '../../../models/toolBox'
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import UseSvgImage from '../../atoms/FDSVGImage/index.vue'
import { IchangeToolBoxSelect } from '../../../../storeModules/fd/actions'
import { Payload } from 'vuex'
interface IToolbox {
  name: string;
  icon: string;
}
interface IRef {
  [icons: string]: [];
}
interface Istyle {
  id: string;
  style: {
    borderRight: string;
    borderBottom: string;
    borderWidth: string;
    borderStyle: string;
  };
}
@Component({
  name: 'ToolBox',
  components: {
    UseSvgImage
  }
})
export default class ToolBox extends Vue {
  @State((state:rootState) => state.fd.toolBoxSelect) toolBoxSelect!: fdState['toolBoxSelect']
  @Action('fd/changeToolBoxSelect') changeToolBoxSelect!: (payload: IchangeToolBoxSelect) => void
  @Ref('icons') icons: HTMLDivElement[]

  toolBox: Array<IToolbox> = toolBox;
  zIndexChange: number = 0;
  mounted () {
    // this.selectedControl(toolBox[0].name)
    this.changeToolBoxSelect(toolBox[0].name)
  }

  clickIcon (value: string) {
    this.changeToolBoxSelect(value)
  }

  @Watch('toolBoxSelect')
  selectedControl (value: string) {
    for (let index = 0; index < this.icons.length; index++) {
      const element: HTMLDivElement = this.icons[index]
      if (value.includes(element.id)) {
        element.style.borderRight = '2px solid white'
        element.style.borderBottom = '2px solid white'
        element.style.borderWidth = '2px'
        element.style.borderStyle = 'inset'
      } else {
        element.style.borderStyle = ''
      }
    }
  }
  get outerToolboxDivStyleObj () {
    return { zIndex: this.zIndexChange }
  }
}
</script>

<style scoped>
.outer-toolbox-div {
  border: 0.1px solid gray;
  background-color: rgb(238, 238, 238);
  min-height: 26px;
  box-shadow: 2px 2px lightgrey;
  height: 540px;
  min-width: 26px;
  width: 100%;
  position: relative;
  left: 0px;
  top: 0px;
}
.toolbox-header {
  display: grid;
  grid-template-columns: 90% 10%;
  height: 26px;
  width: 100%;
  background-color: white;
  padding-top: 3px;
}
.toolbox-body {
  position: absolute;
  background-color: rgb(238, 238, 238);
  width: 100%;
  bottom: 34px;
  top: 29px;
}
.toolbox-tab {
  padding-bottom: 4px;
  border-color: gray;
  box-shadow: 1px 0px grey;
  border-bottom-width: 0px;
  border-top-color: white;
  border-left-color: white;
  border-top-width: 0.3px;
  border-left-width: 0.3px;
  border-right-width: 0.1px;
  margin-left: 5px;
  margin-top: 6px;
}
.toolbox-icon-border {
  margin: 4px;
  margin-top: 0px;
  border-top: 1px solid white;
  border-left: 1px solid white;
  box-shadow: 1px 1px grey;
  height: auto;
}
.toolbox-icons {
  position: relative;
  display: grid;
  overflow: auto;
  grid-template-columns: repeat(auto-fill, minmax(24px, auto));
  grid-auto-rows: minmax(min-content, max-content);
  margin: 4px;
  margin-top: 0px;
  border-top: 1px solid white;
  border-left: 1px solid white;
  box-shadow: 1px 1px grey;
  height: 100%;
}
.toolbox-icon {
  width: 24px;
  height: 24px;
}
.container {
  position: relative;
  width: 18px;
  margin: 7px;
}
.image {
  display: block;
  width: 17px;
  height: 17px;
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 18px;
  width: 18px;
  opacity: 0;
  transition: 0.5s ease;
}
.container:hover .overlay {
  opacity: 0.5;
}

.text {
  color: white;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
}
.close {
  height: 26px;
}
.closeButton {
  position: relative;
  right: 0px;
  float: right;
  cursor: pointer;
}
.spanClass {
  margin-left: 5px;
}
</style>
