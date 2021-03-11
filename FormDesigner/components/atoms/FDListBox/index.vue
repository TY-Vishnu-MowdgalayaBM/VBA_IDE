<template>
<div class="outerListBoxDiv" :style="outerListBoxStyleObj" @mouseover="updateMouseCursor" @keydown="forMatchEntry" v-on="eventStoppers()" :tabindex="properties.TabIndex" @keydown.esc="setContentEditable($event, false)">
  <div
    class="listStyle"
    ref="listStyleOuterRef"
    :style="listStyleObj"
    :title="properties.ControlTipText"
    @click="listBoxClick"
    :tabindex="properties.TabIndex"
    @mousedown="controlEditMode"
    @scroll="updateScrollLeft"
  >
    <div class="table-style" :style="tableStyleObj" ref="listBoxTableRef" v-if="properties.RowSource !== ''">
      <div v-if="properties.ColumnHeads === true" class="theadClass">
        <div class="thead" :style="colHeadsStyle">
          <template
            :style="tdStyleObj"
            v-if="properties.ListStyle === 1"
            class="tdClass"
          ></template>
          <template v-for="(a, columnIndex) in extraDatas.ColumnHeadsValues">
            <div
              v-if="
                columnIndex < properties.ColumnCount ||
                properties.ColumnCount === -1
              "
              :key="columnIndex"
              :style="updateColumnHeads(columnIndex)"
              class="colHeadsClass"
            >
              {{ a }}
            </div>
          </template>
        </div>
        <hr v-if="properties.ColumnHeads" class="hrStyle" :style="hrStyleObj"/>
      </div>
      <div class="table-body">
        <div
          :tabindex="index"
          class="tr"
          ref="listStyleRef"
          v-for="(item, index) of extraDatas.RowSourceData"
          :key="index"
          @mouseenter.stop="handleDrag"
          @keydown.esc="releaseEditMode"
          @blur.stop="clearMatchEntry"
          @keydown.stop="handleExtendArrowKeySelect"
          @mousedown="
            isRunMode || isEditMode ? handleMousedown($event) : ''
          "
        >
          <div
            :style="tdStyleObj"
            class="tdClassIn"
            v-if="
              (properties.ListStyle === 1 && properties.ColumnCount > 0) ||
              (properties.ListStyle === 1 && properties.ColumnCount === -1)
            "
          >
            <input
              :name="properties.MultiSelect === 2 ? 'checkbox' : 'radio'"
              :type="
                properties.MultiSelect === 1 || properties.MultiSelect === 2
                  ? 'checkbox'
                  : 'radio'
              "
              @click.prevent
              class="inputClass"
            />
          </div>
          <div
            class="column-item"
            v-for="(i, index) in item"
            :key="index"
            :style="[columnItemObj(index),styleColumnObj]"
          >
            <template
              v-if="
                index < properties.ColumnCount || properties.ColumnCount === -1
              "
              >{{ i }}</template
            >
          </div>
        </div>
      </div>
    </div>
    <div v-else :style="{cursor: controlCursor}">
        <div v-if="properties.ColumnHeads === true" class="theadClass">
                <div
                  v-if="properties.RowSource === '' && properties.ColumnCount !== -1"
                  :style="emptyColHeads"
                >
                <div v-if="properties.ListStyle === 1" :style="{display:'inline-block', width:'20px'}">
                  <span class="bar" :style="{float:'right', color: properties.ForeColor}">|</span>
                </div>
                <div v-for="(a, i) in properties.ColumnCount" :key="i" :style="{display:'inline-block', width:'100px'}">
                  <span v-if="a>1" class="bar" :key="i" :style="{color: properties.ForeColor}">|</span>
                </div>
                </div>
                <div v-else-if="properties.ColumnCount === -1">
                <div v-for="i in 10" :key="i" :style="{display:'inline-block', width:'100px'}">
                  <span v-if="i < 10" class="bar" :key="i" :style="{float:'right', color: properties.ForeColor}">|</span>
                </div>
                </div>
        <hr v-if="properties.ColumnHeads && properties.ColumnCount !== 0" class="hrStyle" :style="hrStyleObj"/>
        <div></div>
      </div>
    </div>
  </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Mixins,
  Watch,
  Ref
} from 'vue-property-decorator'
import FdControlVue from '@/api/abstract/FormDesigner/FdControlVue'
import { EventBus } from '@/FormDesigner/event-bus'

@Component({
  name: 'FDListBox'
})
export default class FDListBox extends Mixins(FdControlVue) {
  @Ref('listStyleRef') listStyleRef: HTMLDivElement[];
  @Ref('listBoxTableRef') listBoxTableRef!: HTMLDivElement;
  @Ref('listStyleOuterRef') listStyleOuterRef!: HTMLDivElement;
  @Prop() isActivated: boolean;
  @Prop() toolBoxSelectControl: string
  checkedvalue: boolean;
  $el: HTMLDivElement;

  get emptyColHeads () {
    return {
      height: '15px'
    }
  }
  updateColumnHeads (index: number) {
    const controlProp = this.properties
    return {
      textAlign: controlProp.TextAlign === 0 ? 'left' : controlProp.TextAlign === 2 ? 'right' : 'center',
      borderRight: index >= this.extraDatas.ColumnHeadsValues!.length - 1 ? '' : (index < controlProp.ColumnCount! - 1) ? '1px solid' : controlProp.ColumnCount === -1 ? (index < this.extraDatas.RowSourceData![0].length - 1) ? '1px solid' : '' : '',
      borderRightColor: controlProp.ForeColor,
      overflow: 'hidden'
    }
  }

  get hrStyleObj () {
    const controlProp = this.properties
    return {
      borderTop: '1px solid' + controlProp.ForeColor
    }
  }

  protected get colHeadsStyle (): Partial<CSSStyleDeclaration> {
    const controlProp = this.properties
    this.updateColumns()
    return {
      backgroundColor: controlProp.BackColor,
      width: '100%'
    }
  }

  @Watch('properties.ListStyle')
  listStyleValidate () {
    this.updateColumns()
  }
  @Watch('properties.ColumnWidths')
  columnWidthsValidate () {
    this.updateColumns()
  }
  @Watch('properties.ColumnCount')
  columnCountValidate () {
    this.updateColumns()
  }
  @Watch('properties.ColumnHeads')
  columnHeadsValidate () {
    // this.updateColumns()
    Vue.nextTick(() => {
      if (this.properties.ColumnHeads && this.listBoxTableRef) {
        if (this.listBoxTableRef.children[0]) {
          const header = this.listBoxTableRef.children[0] as HTMLDivElement
          if (this.listBoxTableRef.children[1] && this.listBoxTableRef.children[1].children[0]) {
            const body = this.listBoxTableRef.children[1].children[0] as HTMLDivElement
            let totalWidth = 0
            for (let j = 0; j < body.children.length; j++) {
              totalWidth += body.children[j].clientWidth
            }
            header.style.width = (totalWidth - 3) + 'px'
          }
        }
      }
    })
  }

  columnItemObj (index: number) {
    const controlProp = this.properties
    this.updateColumns()
    return {
      position: 'relative',
      display: 'inline-block',
      width: 'calc(100% - 3px)',
      textAlign: controlProp.TextAlign === 2 ? 'right' : controlProp.TextAlign === 1 ? 'center' : 'left',
      overflow: 'hidden',
      paddingBottom: this.data.properties.Font!.FontSize! > 48 ? '10px' : '5px'
    }
  }

  updateColumns () {
    this.columnHeadsValidate()
    if (this.properties.RowSource !== '') {
      let finalWidths:Array<number> = []
      if (this.listBoxTableRef && this.listBoxTableRef.children[0] && this.listBoxTableRef.children[0].className !== 'table-body') {
        if (this.listBoxTableRef.children[0].children[0]) {
          for (let j = 0; j < this.listBoxTableRef.children[0].children[0].children.length; j++) {
            const headWidth = this.listBoxTableRef.children[0].children[0].children[j] as HTMLDivElement
            if (this.properties.ColumnCount! === -1) {
              if (j >= 0 && j < this.extraDatas.RowSourceData!.length) {
                headWidth.style.minWidth = '100px'
              }
            }
          }
        }
      }
      if (this.properties.ColumnHeads) {
        if (this.properties.ColumnWidths === '' && this.listBoxTableRef && this.listBoxTableRef.children[1]) {
          if (this.listBoxTableRef.children[1].children[0]) {
            let tempWidth
            if (this.properties.ColumnCount! <= this.extraDatas.RowSourceData![0].length) {
              if (this.properties.Width! > 100) {
                if (this.properties.ColumnCount! === -1) {
                  tempWidth = this.properties.Width! / this.extraDatas.RowSourceData![0].length
                } else {
                  tempWidth = this.properties.Width! / this.properties.ColumnCount!
                }
              } else {
                tempWidth = 100
              }
            } else {
              if (this.properties.Width! > 100) {
                tempWidth = this.properties.Width! / this.extraDatas.RowSourceData![0].length
              } else {
                tempWidth = 100
              }
            }
            for (let i = 0; i < this.listBoxTableRef.children[1].children.length; i++) {
              if (this.properties.ListStyle === 0) {
                Vue.nextTick(() => {
                  if (this.listBoxTableRef && this.listBoxTableRef.children[0] && this.listBoxTableRef.children[0].children[0]) {
                    for (let j = 0; j < this.listBoxTableRef.children[0].children[0].children.length; j++) {
                      if (this.listBoxTableRef && this.listBoxTableRef.children[0] && this.listBoxTableRef.children[0].children[0] && this.listBoxTableRef.children[0].children[0].children[j]) {
                        const headWidth = this.listBoxTableRef.children[0].children[0].children[j] as HTMLDivElement
                        if (this.properties.ColumnCount !== -1) {
                          if (j === this.listBoxTableRef.children[0].children[0].children.length - 1) {
                            if (finalWidths[j] < 10) {
                              headWidth.style.width = finalWidths[j] + 'px'
                            } else {
                              headWidth.style.width = finalWidths[j] - 4 + 'px'
                            }
                          } else {
                            headWidth.style.width = '100px'
                          }
                        }
                      }
                    }
                  }
                })
                for (let j = 0; j < this.listBoxTableRef.children[1].children[i].children.length; j++) {
                  const width = this.listBoxTableRef.children[1].children[i].children[j] as HTMLDivElement
                  if (this.properties.ColumnCount! === -1) {
                    if (j >= 0 && j < this.extraDatas.RowSourceData!.length) {
                      if (tempWidth < 10) {
                        width.style.width = tempWidth + 'px'
                      } else {
                        width.style.width = tempWidth - 4 + 'px'
                      }
                    }
                  } else if (j + 1 > this.properties.ColumnCount!) {
                    width.style.minWidth = '0px'
                    width.style.width = '0px'
                  } else {
                    if (j < this.extraDatas.RowSourceData!.length) {
                      width.style.minWidth = '100px'
                      if (tempWidth < 10) {
                        width.style.width = tempWidth + 'px'
                      } else {
                        width.style.width = tempWidth - 4 + 'px'
                      }
                    }
                  }
                }
              } else {
                Vue.nextTick(() => {
                  if (this.listBoxTableRef && this.listBoxTableRef.children[0] && this.listBoxTableRef.children[0].children[0]) {
                    for (let j = 0; j < this.listBoxTableRef.children[0].children[0].children.length; j++) {
                      if (this.listBoxTableRef && this.listBoxTableRef.children[0] && this.listBoxTableRef.children[0].children[0] && this.listBoxTableRef.children[0].children[0].children[j]) {
                        const headWidth = this.listBoxTableRef.children[0].children[0].children[j] as HTMLDivElement
                        if (this.properties.ColumnCount !== -1) {
                          if (j === this.listBoxTableRef.children[0].children[0].children.length - 1) {
                            headWidth.style.width = finalWidths[j] - 20 + 'px'
                          } else {
                            headWidth.style.width = '100px'
                          }
                        }
                      }
                    }
                  }
                })
                for (let j = 0; j < this.listBoxTableRef.children[1].children[i].children.length; j++) {
                  const width = this.listBoxTableRef.children[1].children[i].children[j] as HTMLDivElement
                  if (this.properties.ColumnCount! === -1) {
                    if (j >= 0 && j < this.extraDatas.RowSourceData!.length) {
                      width.style.width = '100px'
                    }
                  } else if (j === 1 && this.properties.ColumnCount! === 1) {
                    width.style.width = this.properties.Width! - 20 + 'px'
                  } else if (j > this.properties.ColumnCount!) {
                    width.style.minWidth = '0px'
                    width.style.width = '0px'
                  } else {
                    if (j < this.extraDatas.RowSourceData!.length) {
                      width.style.minWidth = '100px'
                      width.style.width = (this.properties.Width! / this.properties.ColumnCount!) + 'px'
                    }
                  }
                }
              }
            }
          }
        } else if (this.listBoxTableRef && this.listBoxTableRef.children[1]) {
          finalWidths = this.calculateColumnWidths()
          if (this.listBoxTableRef.children[1].children[0]) {
            for (let i = 0; i < this.listBoxTableRef.children[1].children.length; i++) {
              if (this.properties.ListStyle === 0) {
                for (let j = 0; j < this.listBoxTableRef.children[1].children[i].children.length; j++) {
                  const width = this.listBoxTableRef.children[1].children[i].children[j] as HTMLDivElement
                  if (j >= this.properties.ColumnCount! && this.properties.ColumnCount !== -1) {
                    width.style.display = 'none'
                  } else {
                    width.style.display = 'inline-block'
                    if (this.properties.ColumnCount === 1) {
                      if (finalWidths[j] === 0) {
                        width.style.display = 'none'
                      } else if (this.properties.Width! > finalWidths[0]) {
                        if (this.properties.Width! < 10) {
                          width.style.width = this.properties.Width! + 'px'
                        } else {
                          width.style.width = this.properties.Width! - 4 + 'px'
                        }
                      } else {
                        if (finalWidths[0] < 10) {
                          width.style.width = finalWidths[0] + 'px'
                        } else {
                          width.style.width = finalWidths[0] - 4 + 'px'
                        }
                      }
                    } else {
                      width.style.minWidth = '0px'
                      if (finalWidths[j] < 10) {
                        width.style.width = finalWidths[j] + 'px'
                      } else {
                        width.style.width = finalWidths[j] - 4 + 'px'
                      }
                    }
                  }
                  if (this.listBoxTableRef && this.listBoxTableRef.children[0] && this.listBoxTableRef.children[0].children[0] && this.listBoxTableRef.children[0].children[0].children[j]) {
                    const headWidth = this.listBoxTableRef.children[0].children[0].children[j] as HTMLDivElement
                    if (this.properties.ColumnCount === -1) {
                      headWidth.style.display = 'inline-block'
                      headWidth.style.minWidth = '0px'
                      if (finalWidths[j] < 10) {
                        width.style.width = finalWidths[j] + 'px'
                      } else {
                        width.style.width = finalWidths[j] - 4 + 'px'
                      }
                    } else if (j >= this.properties.ColumnCount!) {
                      headWidth.style.display = 'none'
                    } else {
                      headWidth.style.display = 'inline-block'
                      if (this.properties.ColumnCount === 1) {
                        if (finalWidths[j] === 0) {
                          headWidth.style.display = 'none'
                        } else if (this.properties.Width! > finalWidths[0]) {
                          if (this.properties.Width! < 10) {
                            headWidth.style.width = this.properties.Width! + 'px'
                          } else {
                            headWidth.style.width = this.properties.Width! - 4 + 'px'
                          }
                        } else {
                          if (finalWidths[0] < 10) {
                            headWidth.style.width = finalWidths[0] + 'px'
                          } else {
                            headWidth.style.width = finalWidths[0] - 4 + 'px'
                          }
                        }
                      } else {
                        if (finalWidths[j] < 10) {
                          headWidth.style.width = finalWidths[j] + 'px'
                        } else {
                          headWidth.style.width = finalWidths[j] - 4 + 'px'
                        }
                      }
                    }
                  }
                }
              } else {
                for (let j = 0; j < this.listBoxTableRef.children[1].children[i].children.length; j++) {
                  const width = this.listBoxTableRef.children[1].children[i].children[j] as HTMLDivElement
                  if (j > 0) {
                    if (j > this.properties.ColumnCount! && j > this.extraDatas.RowSourceData!.length - 1) {
                      width.style.display = 'none'
                    } else {
                      width.style.display = 'inline-block'
                      if (this.properties.ColumnCount === 1) {
                        if (finalWidths[j] === 0) {
                          width.style.display = 'none'
                        } else if (this.properties.Width! > finalWidths[0]) {
                          width.style.width = this.properties.Width! - 20 + 'px'
                        } else {
                          width.style.width = finalWidths[0] - 20 + 'px'
                        }
                      } else {
                        width.style.minWidth = '0px'
                        width.style.width = finalWidths[j - 1] - 20 + 'px'
                      }
                    }
                    if (this.listBoxTableRef && this.listBoxTableRef.children[0] && this.listBoxTableRef.children[0].children[0] && this.listBoxTableRef.children[0].children[0].children[j]) {
                      const headWidth = this.listBoxTableRef.children[0].children[0].children[j] as HTMLDivElement
                      if (this.properties.ColumnCount === -1) {
                        headWidth.style.display = 'inline-block'
                        headWidth.style.minWidth = '0px'
                        headWidth.style.width = finalWidths[j] - 20 + 'px'
                      } else if (j >= this.properties.ColumnCount!) {
                        headWidth.style.display = 'none'
                      } else {
                        headWidth.style.display = 'inline-block'
                        if (this.properties.ColumnCount === 1) {
                          if (finalWidths[j] === 0) {
                            headWidth.style.display = 'none'
                          } else if (this.properties.Width! > finalWidths[0]) {
                            headWidth.style.width = this.properties.Width! - 20 + 'px'
                          } else {
                            headWidth.style.width = finalWidths[0] - 20 + 'px'
                          }
                        } else {
                          headWidth.style.width = finalWidths[j] - 20 + 'px'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } else {
        if (this.properties.ColumnWidths === '' && this.listBoxTableRef && this.listBoxTableRef.children[0]) {
          if (this.listBoxTableRef.children[0].children[0]) {
            let tempWidth
            if (this.properties.ColumnCount! <= this.extraDatas.RowSourceData![0].length) {
              if (this.properties.Width! > 100) {
                if (this.properties.ColumnCount! === -1) {
                  tempWidth = this.properties.Width! / this.extraDatas.RowSourceData![0].length
                } else {
                  tempWidth = this.properties.Width! / this.properties.ColumnCount!
                }
              } else {
                tempWidth = 100
              }
            } else {
              if (this.properties.Width! > 100) {
                tempWidth = this.properties.Width! / this.extraDatas.RowSourceData![0].length
              } else {
                tempWidth = 100
              }
            }
            for (let i = 0; i < this.listBoxTableRef.children[0].children.length; i++) {
              if (this.properties.ListStyle === 0) {
                for (let j = 0; j < this.listBoxTableRef.children[0].children[i].children.length; j++) {
                  const width = this.listBoxTableRef.children[0].children[i].children[j] as HTMLDivElement
                  if (this.properties.ColumnCount! === -1) {
                    if (j >= 0 && j < this.extraDatas.RowSourceData!.length) {
                      if (tempWidth < 10) {
                        width.style.width = tempWidth + 'px'
                      } else {
                        width.style.width = tempWidth - 4 + 'px'
                      }
                    }
                  } else if (j + 1 > this.properties.ColumnCount!) {
                    width.style.minWidth = '0px'
                    width.style.width = '0px'
                  } else {
                    if (j < this.extraDatas.RowSourceData!.length) {
                      width.style.minWidth = '100px'
                      if (tempWidth < 10) {
                        width.style.width = tempWidth + 'px'
                      } else {
                        width.style.width = tempWidth - 4 + 'px'
                      }
                    }
                  }
                }
              } else {
                for (let j = 0; j < this.listBoxTableRef.children[0].children[i].children.length; j++) {
                  const width = this.listBoxTableRef.children[0].children[i].children[j] as HTMLDivElement
                  if (this.properties.ColumnCount! === -1) {
                    if (j >= 0 && j < this.extraDatas.RowSourceData!.length) {
                      width.style.width = '100px'
                    }
                  } else if (j === 1 && this.properties.ColumnCount! === 1) {
                    width.style.width = this.properties.Width! - 20 + 'px'
                  } else if (j > this.properties.ColumnCount!) {
                    width.style.minWidth = '0px'
                    width.style.width = '0px'
                  } else {
                    if (j < this.extraDatas.RowSourceData!.length) {
                      width.style.minWidth = '100px'
                      width.style.width = (this.properties.Width! / this.properties.ColumnCount!) + 'px'
                    }
                  }
                }
              }
            }
          }
        } else if (this.listBoxTableRef && this.listBoxTableRef.children[0]) {
          finalWidths = this.calculateColumnWidths()
          if (this.listBoxTableRef.children[0].children[0]) {
            for (let i = 0; i < this.listBoxTableRef.children[0].children.length; i++) {
              if (this.properties.ListStyle === 0) {
                for (let j = 0; j < this.listBoxTableRef.children[0].children[i].children.length; j++) {
                  const width = this.listBoxTableRef.children[0].children[i].children[j] as HTMLDivElement
                  if (j >= this.properties.ColumnCount! && this.properties.ColumnCount !== -1) {
                    width.style.display = 'none'
                  } else {
                    width.style.display = 'inline-block'
                    if (this.properties.ColumnCount === 1) {
                      if (finalWidths[j] === 0) {
                        width.style.display = 'none'
                      } else if (this.properties.Width! > finalWidths[0]) {
                        if (this.properties.Width! < 10) {
                          width.style.width = this.properties.Width! + 'px'
                        } else {
                          width.style.width = this.properties.Width! - 4 + 'px'
                        }
                      } else {
                        if (finalWidths[0] < 10) {
                          width.style.width = finalWidths[0] + 'px'
                        } else {
                          width.style.width = finalWidths[0] - 4 + 'px'
                        }
                      }
                    } else {
                      width.style.minWidth = '0px'
                      if (finalWidths[j] < 10) {
                        width.style.width = finalWidths[j] + 'px'
                      } else {
                        width.style.width = finalWidths[j] - 4 + 'px'
                      }
                    }
                  }
                }
              } else {
                for (let j = 0; j < this.listBoxTableRef.children[0].children[i].children.length; j++) {
                  const width = this.listBoxTableRef.children[0].children[i].children[j] as HTMLDivElement
                  if (j > 0) {
                    if (j > this.properties.ColumnCount! && j > this.extraDatas.RowSourceData!.length - 1) {
                      width.style.display = 'none'
                    } else {
                      width.style.display = 'inline-block'
                      if (this.properties.ColumnCount === 1) {
                        if (finalWidths[j] === 0) {
                          width.style.display = 'none'
                        } else if (this.properties.Width! > finalWidths[0]) {
                          width.style.width = this.properties.Width! - 20 + 'px'
                        } else {
                          width.style.width = finalWidths[0] - 20 + 'px'
                        }
                      } else {
                        width.style.minWidth = '0px'
                        width.style.width = finalWidths[j - 1] - 20 + 'px'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  calculateColumnWidths () {
    let a = (this.properties.ColumnWidths!.split(';'))
    let b = []
    let temp = 0
    let totalWidth = this.properties.Width!
    let totalColumnWidths = 0
    let colWidths = this.properties.ColumnWidths!
    let columnWidthCount = colWidths.split(';').length
    let totalColumnCount = this.properties.ColumnCount! < this.extraDatas.RowSourceData![0].length ? this.properties.ColumnCount! : this.extraDatas.RowSourceData![0].length
    let widths = []
    let finalWidths:Array<number> = []
    let lastColumWidth = 0
    if (this.properties.ColumnCount === -1) {
      if (columnWidthCount >= this.extraDatas.RowSourceData![0].length) {
        for (let i = 0; i < this.extraDatas.RowSourceData![0].length; i++) {
          if (i < this.extraDatas.RowSourceData![0].length) {
            let tempWidth = parseInt(colWidths.split(';')[i], 10)
            totalColumnWidths += tempWidth
            widths.push(tempWidth)
          }
        }
      } else {
        let count = 0
        let colWidthCalculatedCount = 0
        let colWidth = 0
        for (let i = 0; i < this.extraDatas.RowSourceData![0].length; i++) {
          if (i < columnWidthCount) {
            widths.push(parseInt(colWidths.split(';')[i], 10))
            count = count + 1
            totalColumnWidths += parseInt(colWidths.split(';')[i], 10)
          } else {
            if (totalWidth > totalColumnWidths) {
              colWidthCalculatedCount = colWidthCalculatedCount + 1
              if (colWidthCalculatedCount === 1) {
                colWidth = ((totalWidth - totalColumnWidths) / (this.extraDatas.RowSourceData![0].length - count))
              }
              widths.push(colWidth)
              totalColumnWidths += colWidth
            } else {
              widths.push(100)
            }
          }
        }
      }
      if (totalWidth > totalColumnWidths) {
        for (let i = 0; i < widths.length; i++) {
          if (widths.length - 1 !== i) {
            lastColumWidth = totalWidth - widths[i]!
            finalWidths.push(widths[i])
            totalWidth = lastColumWidth
          } else {
            finalWidths.push(lastColumWidth)
          }
        }
      } else if (totalWidth <= totalColumnWidths) {
        for (let j = 0; j < widths.length; j++) {
          finalWidths.push(widths[j])
        }
      }
    } else {
      if (columnWidthCount >= totalColumnCount) {
        for (let i = 0; i < totalColumnCount; i++) {
          if (i < this.properties.ColumnCount!) {
            let tempWidth = parseInt(colWidths.split(';')[i], 10)
            totalColumnWidths += tempWidth
            widths.push(tempWidth)
          }
        }
      } else {
        let count = 0
        let colWidthCalculatedCount = 0
        let colWidth = 0
        for (let i = 0; i < totalColumnCount; i++) {
          if (i < columnWidthCount) {
            widths.push(parseInt(colWidths.split(';')[i], 10))
            count = count + 1
            totalColumnWidths += parseInt(colWidths.split(';')[i], 10)
          } else {
            if (totalWidth > totalColumnWidths) {
              colWidthCalculatedCount = colWidthCalculatedCount + 1
              if (colWidthCalculatedCount === 1) {
                colWidth = ((totalWidth - totalColumnWidths) / (totalColumnCount - count))
              }
              widths.push(colWidth)
              totalColumnWidths += colWidth
            } else {
              widths.push(100)
            }
          }
        }
      }
      if (totalWidth > totalColumnWidths) {
        for (let i = 0; i < widths.length; i++) {
          if (widths.length - 1 !== i) {
            lastColumWidth = totalWidth - widths[i]!
            finalWidths.push(widths[i])
            totalWidth = lastColumWidth
          } else if (widths.length === 1) {
            finalWidths.push(totalColumnWidths)
          } else {
            finalWidths.push(lastColumWidth)
          }
        }
      } else if (totalWidth <= totalColumnWidths) {
        for (let j = 0; j < widths.length; j++) {
          finalWidths.push(widths[j])
        }
      }
    }
    return finalWidths
  }
  handleMousedown (e: MouseEvent) {
    if (e.which !== 3) {
      if (this.toolBoxSelectControl === 'Select') {
        e.stopPropagation()
        if (this.properties.RowSource !== '') {
          if (
            e.target instanceof HTMLDivElement ||
      e.target instanceof HTMLTableRowElement ||
      e.target instanceof HTMLInputElement
          ) {
            this.tempListBoxComboBoxEvent = e
            const targetElement = e.target
            const tempData = targetElement!.parentElement!
              .children[0] as HTMLDivElement
            const tempDataOption = targetElement.parentElement!
              .children[1] as HTMLDivElement
            const tempPath = e.composedPath()
            targetElement.focus()
            let data = targetElement.innerText
            let splitData = data.replace(/\t/g, ' ').split(' ')

            targetElement.focus()
            if (this.isRunMode && (this.properties.Enabled && this.properties.Locked === false)) {
              if (this.properties.MultiSelect === 0) {
                this.clearOptionBGColorAndChecked(e)
                this.setOptionBGColorAndChecked(e)
              } else if (this.properties.MultiSelect === 1) {
                this.setOptionBGColorAndChecked(e)
              } else if (this.properties.MultiSelect === 2) {
                if (e.ctrlKey === true) {
                  if (targetElement.tagName === 'INPUT') {
                    this.setOptionBGColorAndChecked(e)
                  } else {
                    this.setOptionBGColorAndChecked(e)
                  }
                } else if (e.shiftKey === true && this.properties.Value !== '') {
                  let startPoint = 0
                  let endPoint = 0
                  for (let i = 0; i < tempPath.length; i++) {
                    const ele = tempPath[i] as HTMLDivElement
                    if (ele.className === 'table-body') {
                      // extend points start and end
                      for (let j = 0; j < ele.childNodes.length; j++) {
                        const cd = ele.childNodes[j] as HTMLDivElement
                        if (cd.innerText === this.properties.Value) {
                          startPoint = j + 1
                        }
                        if (cd.innerText === targetElement.innerText) {
                          endPoint = j
                        }
                      }
                      // upward selection start and end swap
                      if (startPoint > endPoint) {
                        let temp = startPoint
                        startPoint = endPoint
                        endPoint = temp
                      }
                      // setting selection
                      for (let k = startPoint; k <= endPoint; k++) {
                        const node = ele.childNodes[k] as HTMLDivElement
                        const tempNode = node.childNodes[0]
                          .childNodes[0] as HTMLInputElement
                        node.style.backgroundColor = 'rgb(59, 122, 231)'
                        if (this.properties.ListStyle === 1 && !tempNode.checked) {
                          // tempNode.checked = !tempNode.checked
                          tempNode.checked = true
                        }
                      }
                      break
                    }
                  }
                }

                if (this.properties.ControlSource !== '') {
                  if (this.properties.TextColumn === -1) {
                    this.updateDataModel({
                      propertyName: 'Text',
                      value: this.selectionData[0]
                    })
                  }
                  this.updateDataModel({
                    propertyName: 'Value',
                    value: this.selectionData[0]
                  })
                }
                this.clearOptionBGColorAndChecked(e)
                this.setOptionBGColorAndChecked(e)
              }
            } else {
              if (this.properties.MultiSelect === 0) {
                this.clearOptionBGColorAndChecked(e)
                this.setOptionBGColorAndChecked(e)
              } else if (this.properties.MultiSelect === 1) {
                this.setOptionBGColorAndChecked(e)
              } else if (this.properties.MultiSelect === 2) {
                if (e.ctrlKey === true) {
                  if (targetElement.tagName === 'INPUT') {
                    this.setOptionBGColorAndChecked(e)
                  } else {
                    this.setOptionBGColorAndChecked(e)
                  }
                } else if (e.shiftKey === true && this.properties.Value !== '') {
                  let startPoint = 0
                  let endPoint = 0
                  for (let i = 0; i < tempPath.length; i++) {
                    const ele = tempPath[i] as HTMLDivElement
                    if (ele.className === 'table-body') {
                      // extend points start and end
                      for (let j = 0; j < ele.childNodes.length; j++) {
                        const cd = ele.childNodes[j] as HTMLDivElement
                        if (cd.innerText === this.properties.Value) {
                          startPoint = j + 1
                        }
                        if (cd.innerText === targetElement.innerText) {
                          endPoint = j
                        }
                      }
                      // upward selection start and end swap
                      if (startPoint > endPoint) {
                        let temp = startPoint
                        startPoint = endPoint
                        endPoint = temp
                      }
                      // setting selection
                      for (let k = startPoint; k <= endPoint; k++) {
                        const node = ele.childNodes[k] as HTMLDivElement
                        const tempNode = node.childNodes[0]
                          .childNodes[0] as HTMLInputElement
                        node.style.backgroundColor = 'rgb(59, 122, 231)'
                        if (this.properties.ListStyle === 1 && !tempNode.checked) {
                          // tempNode.checked = !tempNode.checked
                          tempNode.checked = true
                        }
                      }
                      break
                    }
                  }
                }

                if (this.properties.ControlSource !== '') {
                  if (this.properties.TextColumn === -1) {
                    this.updateDataModel({
                      propertyName: 'Text',
                      value: this.selectionData[0]
                    })
                  }
                  this.updateDataModel({
                    propertyName: 'Value',
                    value: this.selectionData[0]
                  })
                }
                this.clearOptionBGColorAndChecked(e)
                this.setOptionBGColorAndChecked(e)
              }
            }
            if (this.properties.MultiSelect === 0) {
              for (let i = 0; i < this.extraDatas.RowSourceData!.length; i++) {
                if (this.listStyleRef[i].style.backgroundColor !== '') {
                  if (this.properties.TextColumn === -1) {
                    const text = this.extraDatas.RowSourceData![i][0]
                    this.updateDataModel({ propertyName: 'Text', value: text })
                  } else if (this.properties.TextColumn === 0) {
                    this.updateDataModel({ propertyName: 'Text', value: i })
                  } else if (this.properties.TextColumn! > 0 && this.properties.TextColumn! <= this.extraDatas.RowSourceData![0].length) {
                    const text = this.extraDatas.RowSourceData![i][this.properties.TextColumn! - 1]
                    this.updateDataModel({ propertyName: 'Text', value: text })
                  }
                  const x = this.extraDatas.RowSourceData![i][this.properties.BoundColumn! - 1]
                  this.updateDataModel({ propertyName: 'Value', value: x })
                }
              }
            } else {
              this.updateDataModel({ propertyName: 'Text', value: '' })
              this.updateDataModel({ propertyName: 'Value', value: '' })
            }
            this.getSelectedStyle()
          }
        }
      }
    }
  }
  clearMatchEntry () {
    this.updateDataModelExtraData({ propertyName: 'MatchData', value: '' })
  }

  @Watch('properties.TextColumn')
  textColumnValidate () {
    for (let i = 0; i < this.extraDatas.RowSourceData!.length; i++) {
      if (this.listStyleRef[i].style.backgroundColor !== '') {
        if (this.properties.TextColumn === -1) {
          const text = this.extraDatas.RowSourceData![i][0]
          this.updateDataModel({ propertyName: 'Text', value: text })
        } else if (this.properties.TextColumn === 0) {
          this.updateDataModel({ propertyName: 'Text', value: i })
        } else if (this.properties.TextColumn! > 0 && this.properties.TextColumn! <= this.extraDatas.RowSourceData![0].length) {
          const text = this.extraDatas.RowSourceData![i][this.properties.TextColumn! - 1]
          this.updateDataModel({ propertyName: 'Text', value: text })
        }
        const x = this.extraDatas.RowSourceData![i][this.properties.BoundColumn! - 1]
        this.updateDataModel({ propertyName: 'Value', value: x })
      }
    }
  }

  getSelectedStyle () {
    if (this.listStyleRef) {
      for (let i = 0; i < this.listStyleRef.length; i++) {
        if (this.listStyleRef[i].style.backgroundColor === 'rgb(59, 122, 231)') {
          for (let j = 0; j < this.listStyleRef[i].children.length; j++) {
            const a = this.listStyleRef[i].children[j] as HTMLDivElement
            a.style.backgroundColor = 'rgb(59, 122, 231)'
          }
        } else if (this.listStyleRef[i].style.backgroundColor === '') {
          for (let j = 0; j < this.listStyleRef[i].children.length; j++) {
            const a = this.listStyleRef[i].children[j] as HTMLDivElement
            a.style.backgroundColor = ''
          }
        }
      }
    }
  }
  get outerListBoxStyleObj () {
    return {
      cursor: this.controlCursor
    }
  }
  /**
   * @description style object is passed to :style attribute in div tag
   * dynamically changing the styles of the component based on properties
   * @function listStyleObj
   */
  protected get listStyleObj (): Partial<CSSStyleDeclaration> {
    const controlProp = this.properties
    let display = ''
    if (this.isRunMode) {
      display = controlProp.Visible ? controlProp.Width === 0 || controlProp.Height === 0 ? 'none' : 'inline-block' : 'none'
    } else {
      display = controlProp.Width === 0 || controlProp.Height === 0 ? 'none' : 'inline-block'
    }
    return {
      pointerEvents: this.isEditMode ? 'auto' : 'none',
      backgroundColor: controlProp.BackColor,
      borderColor: controlProp.BorderStyle === 1 ? controlProp.BorderColor : '',
      borderLeft:
        controlProp.BorderStyle === 1
          ? '1px solid ' + controlProp.BorderColor
          : controlProp.SpecialEffect === 2
            ? '2px solid gray'
            : controlProp.SpecialEffect === 3
              ? '1.5px solid gray'
              : controlProp.SpecialEffect === 4
                ? '0.5px solid gray'
                : '',
      borderRight:
        controlProp.BorderStyle === 1
          ? '1px solid ' + controlProp.BorderColor
          : controlProp.SpecialEffect === 1
            ? '2px solid gray'
            : controlProp.SpecialEffect === 4
              ? '1.5px solid gray'
              : controlProp.SpecialEffect === 3
                ? '0.5px solid gray'
                : '',
      borderTop:
        controlProp.BorderStyle === 1
          ? '1px solid ' + controlProp.BorderColor
          : controlProp.SpecialEffect === 2
            ? '2px solid gray'
            : controlProp.SpecialEffect === 3
              ? '1.5px solid gray'
              : controlProp.SpecialEffect === 4
                ? '0.5px solid gray'
                : '',
      borderBottom:
        controlProp.BorderStyle === 1
          ? '1px solid ' + controlProp.BorderColor
          : controlProp.SpecialEffect === 1
            ? '2px solid gray'
            : controlProp.SpecialEffect === 4
              ? '1.5px solid gray'
              : controlProp.SpecialEffect === 3
                ? '0.5px solid gray'
                : '',
      left: `${controlProp.Left}px`,
      width: `${controlProp.Width}px`,
      height: `${controlProp.Height}px`,
      top: `${controlProp.Top}px`,
      display: display,
      overflow: controlProp.RowSource === '' ? 'hidden' : this.$el && this.$el.scrollWidth > this.properties.Width! + 3 ? 'auto' : 'auto'
    }
  }

  get styleColumnObj () {
    const controlProp = this.properties
    const font: font = controlProp.Font
      ? controlProp.Font
      : {
        FontName: 'Arial',
        FontSize: 10,
        FontItalic: true,
        FontBold: true,
        FontUnderline: true,
        FontStrikethrough: true
      }
    return {
      fontFamily: font.FontStyle! !== '' ? this.setFontStyle : font.FontName!,
      fontSize: `${font.FontSize}px`,
      fontStyle: font.FontItalic || this.isItalic ? 'italic' : '',
      textDecoration:
        font.FontStrikethrough === true && font.FontUnderline === true
          ? 'underline line-through'
          : font.FontUnderline
            ? 'underline'
            : font.FontStrikethrough
              ? 'line-through'
              : '',
      textDecorationSkipInk: 'none',
      fontWeight: font.FontBold
        ? 'bold'
        : font.FontStyle !== ''
          ? this.tempWeight
          : '',
      fontStretch: font.FontStyle !== '' ? this.tempStretch : ''

    }
  }
  /**
   * @description style object is passed to :style attribute in table tag
   * dynamically changing the styles of the component based on properties
   * @function tableStyleObj
   */
  protected get tableStyleObj () {
    const controlProp = this.properties
    const font: font = controlProp.Font
      ? controlProp.Font
      : {
        FontName: 'Arial',
        FontSize: 10,
        FontItalic: true,
        FontBold: true,
        FontUnderline: true,
        FontStrikethrough: true
      }
    return {
      borderCollapse: 'collapse',
      tableLayout: 'fixed',
      color: controlProp.ForeColor,
      fontFamily: font.FontStyle! !== '' ? this.setFontStyle : font.FontName!,
      fontSize: `${font.FontSize}px`,
      fontStyle: font.FontItalic || this.isItalic ? 'italic' : '',
      textDecoration:
        font.FontStrikethrough === true && font.FontUnderline === true
          ? 'underline line-through'
          : font.FontUnderline
            ? 'underline'
            : font.FontStrikethrough
              ? 'line-through'
              : '',
      textDecorationSkipInk: 'none',
      fontWeight: font.FontBold
        ? 'bold'
        : font.FontStyle !== ''
          ? this.tempWeight
          : '',
      fontStretch: font.FontStyle !== '' ? this.tempStretch : '',
      width: '100%',
      cursor: this.controlCursor
      // display: this.properties.ColumnCount === 0 ? 'none' : ''
    }
  }

  /**
   * @description style object is passed to :style attribute in td tag
   * dynamically changing the styles of the component based on properties
   * @function tdStyleObj
   */
  protected get tdStyleObj (): Partial<CSSStyleDeclaration> {
    const controlProp = this.properties
    return {
      textAlign:
        controlProp.TextAlign === 0
          ? 'left'
          : controlProp.TextAlign === 2
            ? 'right'
            : 'center'
    }
  }

  /**
   * @description watches changes in properties for Value
   * @function ValueData
   * @param oldVal previous properties data
   * @param newVal  new/changed properties data
   */
  @Watch('properties.Value', { deep: true })
  ValueData (newVal: string) {
    if (this.properties.RowSource !== '') {
      if (newVal !== '' && this.properties.MultiSelect === 0) {
        if (
        this.properties.BoundColumn! >= 0 &&
        this.properties.BoundColumn! < this.extraDatas.RowSourceData!.length
        ) {
          if (this.properties.BoundColumn! === 0) {
            for (let i = 0; i < this.extraDatas.RowSourceData!.length; i++) {
              const x = this.listStyleRef[i] as HTMLInputElement
              if (this.listStyleRef[i].style.backgroundColor === 'rgb(59, 122, 231)') {
                this.updateDataModel({ propertyName: 'Value', value: i })
                if (this.properties.TextColumn === -1) {
                  this.updateDataModel({ propertyName: 'Text', value: this.extraDatas.RowSourceData![i][0] })
                }
              }
            }
          } else {
            let tempData = [...this.extraDatas.RowSourceData!]
            let tempBoundColumn = this.properties.BoundColumn! - 1
            for (let i = 0; i < this.extraDatas.RowSourceData!.length; i++) {
              if (tempData[i][tempBoundColumn] === newVal) {
                const x = this.listStyleRef[i] as HTMLInputElement
                x.checked = true
              } if (tempData[i][tempBoundColumn] !== newVal) {
                const x = this.listStyleRef[i] as HTMLInputElement
                x.checked = false
              }
              const x = this.listStyleRef[i] as HTMLInputElement
              if (x.checked) {
                this.listStyleRef[i].style.backgroundColor = 'rgb(59, 122, 231)'
              }
              if (!x.checked) {
                this.listStyleRef[i].style.backgroundColor = ''
                if (this.listStyleRef[i] && this.listStyleRef[i].children.length > 0) {
                  const y = this.listStyleRef[i] as HTMLDivElement
                  for (let j = 0; j < y.children.length; j++) {
                    const z = this.listStyleRef[i].children[j] as HTMLDivElement
                    z.style.backgroundColor = ''
                  }
                }
              }
            }
            if (tempData![0][this.properties.BoundColumn! - 1] === newVal) {
              this.updateDataModel({ propertyName: 'Value', value: newVal })
              if (this.properties.TextColumn === -1) {
                this.updateDataModel({ propertyName: 'Text', value: newVal })
              }
            }
          }
        } else if (this.properties.BoundColumn! > this.extraDatas.RowSourceData!.length) {
          this.updateDataModel({ propertyName: 'Value', value: '' })
        } else {
          return undefined
        }
      } else {
        this.updateDataModel({ propertyName: 'Value', value: '' })
      }
    } else {
      this.updateDataModel({ propertyName: 'Value', value: '' })
    }
  }

  @Watch('properties.BoundColumn')
  setBoundColumnValues () {
    this.ValueData(this.properties.Value! as string)
  }
  /**
   * @description mounted initializes the values which are required for the component
   */
  mounted () {
    this.$el.focus({
      preventScroll: true
    })
    var event = new MouseEvent('mousedown.stop')
    this.updateColumns()
    if (this.properties.RowSource !== '') {
      const initialRowSourceData = this.extraDatas.RowSourceData!
      this.updateDataModel({ propertyName: 'ControlSource', value: '' })
      if (initialRowSourceData && initialRowSourceData.length === 0) {
        this.updateDataModel({ propertyName: 'TopIndex', value: -1 })
      } else {
        this.updateDataModel({ propertyName: 'TopIndex', value: 0 })
      }
    }
  }

  /**
   * @description watches changes in properties for MultiSelect
   * @function multiSelectCheck
   * @param oldVal previous properties data
   * @param newVal  new/changed properties data
   */
  @Watch('properties.MultiSelect', { deep: true })
  multiSelectCheck (newVal: number, oldVal: number) {
    if (newVal === 1 || newVal === 2) {
      this.updateDataModel({ propertyName: 'Value', value: '' })
      this.updateDataModel({ propertyName: 'Text', value: '' })
    }
    if (this.tempListBoxComboBoxEvent) {
      this.clearOptionBGColorAndChecked(this.tempListBoxComboBoxEvent)
    }
  }

  /**
   * @description watches changes in properties for ListStyle
   * @function listCheck
   * @param oldVal previous properties data
   * @param newVal  new/changed properties data
   */
  @Watch('properties.ListStyle', { deep: true })
  listCheck (newVal: number, oldVal: number) {
    Vue.nextTick(() => {
      this.updateColumns()
    })
    if (this.tempListBoxComboBoxEvent) {
      this.clearOptionBGColorAndChecked(this.tempListBoxComboBoxEvent)
    }
  }

  @Watch('isEditMode', { deep: true })
  isEditCheck (newVal: boolean, oldVal: boolean) {
    if (this.isEditMode) {
      this.$el.click()
    }
  }

  forMatchEntry (event: KeyboardEvent) {
    if (event.key === 'Enter' && event.keyCode === 13) {
      this.setContentEditable(event, true)
    }
    if (this.isEditMode) {
      if (event.ctrlKey !== true) {
        if (this.listStyleRef && this.listStyleRef[0]) {
          this.listStyleRef[0].click()
        }
      } else if (event.ctrlKey === true) {
        event.stopPropagation()
      }
    }
    if (event.key === 'Escape' && event.keyCode === 27) {
      this.releaseEditMode(event)
    }
    if (event.key === 'Delete' && !this.isEditMode) {
      this.deleteItem(event)
    }
  }

  @Watch('properties.RowSource')
  rowSourceValidate () {
    if (this.properties.RowSource !== '') {
      Vue.nextTick(() => {
        this.updateColumns()
      })
      const initialRowSourceData = this.extraDatas.RowSourceData!
      this.updateDataModel({ propertyName: 'ControlSource', value: '' })
      if (initialRowSourceData && initialRowSourceData.length === 0) {
        this.updateDataModel({ propertyName: 'TopIndex', value: -1 })
      } else {
        this.updateDataModel({ propertyName: 'TopIndex', value: 0 })
      }
    }
  }

  @Watch('properties.ControlSource')
  controlSourceUpdate () {
    if (this.properties.ControlSource !== '') {
      for (let i = 0; i < this.extraDatas.RowSourceData!.length; i++) {
        this.listStyleRef[i].style.backgroundColor = ''
        if (
          this.extraDatas.RowSourceData![i][this.properties.BoundColumn! - 1] === this.extraDatas.ControlSourceValue!
        ) {
          const listRow = this.listStyleRef[i]
          listRow.style.backgroundColor = 'rgb(59, 122, 231)'
        }
      }
    }
  }
  releaseEditMode (event: KeyboardEvent) {
    this.$el.focus({
      preventScroll: true
    })
    this.setContentEditable(event, false)
  }
  eventStoppers () {
    const eventStop = (event: Event) => event.stopPropagation()
    return this.isEditMode === false
      ? null
      : {
        keydown: eventStop
      }
  }
  listBoxClick (e: MouseEvent) {
    if (this.listStyleOuterRef && !this.isEditMode) {
      this.listStyleOuterRef.scrollLeft = -1
    }
    if (this.toolBoxSelectControl === 'Select') {
      e.stopPropagation()
      if (!this.isActivated) {
        EventBus.$emit('focusUserForm')
      }
    }
  }
  updateScrollLeft (event: Event) {
    if (!this.isEditMode) {
      if (event.target instanceof HTMLDivElement) {
        event.target.scrollLeft = 0
      }
    }
  }
}
</script>

<style scoped>
.listStyle {
  background-color: lightgray;
  border: 1px solid gray;
  overflow: auto;
  box-sizing: border-box;
  white-space: normal;
}
.list-outer {
  border: 0.1px solid lightgray;
  width: 164px;
  height: 130px;
  overflow-y: auto;
  box-shadow: -1px -1px grey;
}
.tr {
  outline: none;
  display: inline-flex;
  min-width: calc(100% - 3px);
}
.ul {
  display: grid;
  grid-template-columns: 100%;
  list-style-type: none;
  margin-block-start: 0em;
  margin-block-end: 0em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
}
.li {
  /* padding: 3px; */
  margin: 1px;
  text-align: left;
  font-size: 14px;
  height: 16px;
  border: 0.5px solid white;
  cursor: pointer;
}
.li:hover {
  margin: 1px;
  border-color: rgb(52, 52, 255);
  border-radius: 2px;
  background-color: rgb(59, 122, 231);
}
.fa {
  margin-left: 4px;
  margin-top: 3px;
}
.span {
  /* margin: 4px;  */
  margin-left: 7px;
  margin-top: 0px;
  font-family: Arial, Helvetica, sans-serif;
}
.div {
  display: grid;
  grid-template-columns: 1fr;
}
.listbox {
  display: grid;
  grid-template-columns: 100%;
  height: 100px;
  width: 300px;
  background-color: lightgray;
  border: 1px solid gray;
}
.columnHeads {
  height: 19.2px;
  border: 1px solid black;
  display: grid;
  grid-template-columns: 100%;
}
.optionsItems {
  display: grid;
  grid-template-columns: 100%;
}
.table-style {
  width: 100%;
}
.theadClass {
  white-space: nowrap;
  position: sticky;
  top: 0px;
  z-index: 1;
}
.tdClass {
  width: 15px;
  border-right: 1px solid;
}
.tdClassIn {
  width: fit-content !important;
  min-width: 0px !important;
}
.inputClass {
  margin: 0;
}
.thead {
  position: sticky;
  top: 0;
  overflow: hidden;
  text-decoration: underline;
  white-space: nowrap;
}
.colHeadsClass {
  display: inline-block;
  width: 100px;
}
.hrStyle {
  display: block !important;
  margin: 0px;
  width: 100% !important;
}
.bar {
  font-size: 13px;
}
.column-item {
  white-space: pre;
}
</style>
