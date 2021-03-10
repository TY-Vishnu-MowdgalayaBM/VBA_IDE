interface dragselector extends Vue {
    selectAreaStyle?: {
        left: string
        top: string
        width: string
        height: string
        zIndex: string
    },
    parentElement?:{
        scrollLeft:number
        scrollTop:number
    }
}

declare module 'vue-drag-selector'
