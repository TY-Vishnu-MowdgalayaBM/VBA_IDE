import { Vue, Component } from 'vue-property-decorator'
export interface localTabOrderItem {
    controlId: string;
    name: string;
  }
@Component({
  name: 'FdDialogDragVue'
})
export default class FdDialogDragVue extends Vue {
    protected positions: IMousePosition = {
      clientX: 0,
      clientY: 0,
      movementX: 0,
      movementY: 0
    };
     protected tabOrderDialogInitialStyle: ITabOrderDialogInitialStyle = {
       left: '0px',
       top: '50px'
     };
     isTabOrderOpen: boolean = false
     currentIndex: number = -1
     tabOrderList: localTabOrderItem[] | tabsItems[] = []
     protected dragTabOrderDialog (event: MouseEvent) {
       this.positions.clientX = event.clientX
       this.positions.clientY = event.clientY
       document.onmousemove = this.elementDrag
       document.onmouseup = this.closeDragElement
     }
     protected elementDrag (event: MouseEvent): void {
       event.preventDefault()
       this.positions.movementX = this.positions.clientX - event.clientX
       this.positions.movementY = this.positions.clientY - event.clientY
       this.positions.clientX = event.clientX
       this.positions.clientY = event.clientY
       this.tabOrderDialogInitialStyle.top =
          parseInt(this.tabOrderDialogInitialStyle.top) -
          this.positions.movementY +
          'px'
       this.tabOrderDialogInitialStyle.left =
          parseInt(this.tabOrderDialogInitialStyle.left) -
          this.positions.movementX +
          'px'
     }
     protected closeDragElement (): void {
       document.onmouseup = null
       document.onmousemove = null
     }
     protected selectedTab (data: number) {
       this.currentIndex = data
     }
     protected swapTabOrderList (aIndex: number, bIndex: number) {
       const temp = this.tabOrderList[aIndex]
       this.tabOrderList[aIndex] = this.tabOrderList[bIndex]
       this.tabOrderList[bIndex] = temp
     }
     protected moveControlUp () {
       const currentIndex = this.currentIndex
       if (currentIndex !== 0) {
         this.swapTabOrderList(currentIndex, currentIndex - 1)
         this.selectedTab(currentIndex - 1)
       }
     }

     protected moveControlDown () {
       const lastIndex = this.tabOrderList.length - 1
       const currentIndex = this.currentIndex
       if (currentIndex !== lastIndex) {
         this.swapTabOrderList(currentIndex, currentIndex + 1)
         this.selectedTab(currentIndex + 1)
       }
     }
     protected closeDialog () {
       this.isTabOrderOpen = false
     }
     get tabOrderStyleObj () {
       return {
         visibility: this.isTabOrderOpen === true ? 'visible' : 'hidden',
         opacity: this.isTabOrderOpen === true ? '1' : '0'
       }
     }
}
