export interface PositionProp {
[index:number]:{
    [backgroundPositionX:string]:string,
    backgroundPositionY:string
}
}
export interface PositionXYData {
    [backgroundPositionX:string]:string,
    backgroundPositionY:string
}
export interface KeyValueProp {
    [key: number]:string
}
export interface KeyValueStringProp {
    [key: string]:string
}

export interface ScrollBarProp {
    [type:string]:{
        [overflowX:string]:string,
        overflowY:string
    }
}
export interface ScrollBarData {
    [overflowX:string]:string,
    overflowY:string
}
