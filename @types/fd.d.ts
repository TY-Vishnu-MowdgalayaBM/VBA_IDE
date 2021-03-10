interface fdState {
  // selectedControls: selectedControls
  selectedControls: {
    [UserFromId: string]: selectedControls
  }
  userformData: userformData
  toolBoxSelect: string
  copyControlList: copyControl
  groupedControls: {
    [UserFromId: string]: groupedControls
  },
  isRunMode: boolean
  copiedControl: userformData
}

interface userformData {
  [UserFormId: string] : {
    [ControlId: string] : controlData
  }
}
interface copyControl {
  userFormId: string,
  parentId: string,
  targetId: Array<string>
  type: string
}
interface controlData {
  properties: controlProperties,
  controls: string[],
  extraDatas: extraDatas | null,
  type: string
}

interface selectedControls {
  container: string[],
  selected: string[]
}

interface selectedTab {
  indexValue: number,
  pageValue: string
}

interface groupedControls
{
   groupArray: string[]
}

// type fix for updateProperty method in FDPropertyList
interface updatedSelectedControls extends selectedControls {
  main: any;
}

interface controlProperties {
    Accelerator?: string,
    Alignment?: number,
    AutoSize?: boolean,
    AutoTab?: boolean,
    AutoWordSelect?: boolean,
    BackColor?: string,
    BackStyle?: number,
    BorderColor?: string,
    BorderStyle?: number,
    BoundColumn?: number,
    Cancel?: boolean,
    Caption?: string,
    ColumnCount?: number,
    ColumnHeads?: boolean,
    ColumnWidths?: string,
    ControlSource?: string | number,
    ControlTipText?: string,
    CursorEndPosition?: string|number,
    CursorStartPosition?: number|string,
    Cycle?: number,
    Default?: boolean,
    Delay?: number,
    DragBehavior?: number,
    DrawBuffer?: number,
    DropButtonStyle?: number,
    Enabled?: boolean,
    EnterFieldBehavior?: number,
    EnterKeyBehavior?:boolean,
    Font?: font,
    ForeColor?: string,
    GroupName?: string,
    Height?: number,
    HelpContextID?: number,
    HideSelection?: boolean,
    ID: string,
    IMEMode?: number,
    Index?: number,
    IntegralHeight?: boolean,
    KeepScrollBarsVisible?: number,
    LargeChange?: number,
    Left?: number,
    ListRows?: number,
    ListStyle?: number,
    ListWidth?: string,
    Locked?: boolean,
    MatchEntry?: number,
    MatchRequired?: boolean,
    Max?: number,
    MaxLength?: number,
    Min?: number,
    MouseIcon?: string,
    MousePointer?: number,
    MultiLine?: boolean,
    MultiRow?: boolean,
    MultiSelect?: number,
    Name?: string,
    Orientation?: number,
    PasswordChar?: string,
    Picture?: string,
    PictureAlignment?: number,
    PicturePosition?: number,
    PictureSizeMode?: number,
    PictureTiling?: boolean,
    ProportionalThumb?: boolean,
    RightToLeft?: boolean,
    RowSource?: string,
    ScrollBars?: number,
    ScrollHeight?: number,
    ScrollLeft?: number,
    ScrollTop?: number,
    ScrollWidth?: number,
    SelectionMargin?: boolean,
    ShowDropButtonWhen?: number,
    ShowModal?: boolean,
    SmallChange?: number,
    SpecialEffect?: number,
    StartUpPosition?: number,
    Style?: number,
    TabFixedHeight?: number,
    TabFixedWidth?: number,
    TabIndex?: number,
    TabKeyBehavior?: boolean,
    TabOrientation?: number,
    TabStop?: boolean,
    Tag?: string,
    TakeFocusOnClick?: boolean,
    Text?: string,
    TextAlign?: number,
    TextColumn?: number,
    Top?: number,
    TopIndex?: number,
    TransitionEffect?: number,
    TransitionPeriod?: number,
    TripleState?: boolean,
    Value?: null | boolean | number | string,
    Visible?: boolean,
    WhatsThisButton?: boolean,
    WhatsThisHelp?: boolean,
    Width?: number,
    WordWrap?: boolean,
    Zoom?: number,
    GroupID?: string,
}

interface extraDatas {
  // CursorEndPosition?: string|number;
  // CursorStartPosition?: number|string;
  Active?: boolean,
  BoxShadow?: string,
  WhiteSpace?: string,
  WordBreak?: string,
  backgroundPositionX?: string,
  backgroundPositionY?: string,
  autoSizeWidth?: string,
  autoSizeHeight?: string,
  acceleratorValue?: string,
  display?: string,
  GroupID?: number| string
  Tabs?: Array < tabsItems >,
  ControlSourceValue?: string,
  ColumnHeadsValues?: Array <string>,
  RowSourceData?: Array <Array<string>>,
  MatchData? : string,
  zIndex?: number,
  TabIndex?: number
}

interface tabsItems {
  Name: string,
  Caption: string,
  ToolTip: string,
  Accelerator: string
}

interface font {
  FontName: string,
  FontSize?: number,
  FontBold?: boolean,
  FontItalic?: boolean,
  FontUnderline?: boolean,
  FontStrikethrough?: boolean,
  FontStyle?: string
}

interface IResizeValueSample
{
  X: number
  Y: number
  type: string
}
interface IControlContextMenu {
  icon: string,
  text: string,
  values: Array<IControlContextMenu>,
  disabled: boolean
}
interface IMousePosition {
  clientX: number
  clientY: number
  movementX: number
  movementY: number
  offsetX?: number
  offsetY?: number
}
interface IMouseHandler {
  [x: string] : number
}
interface IResizeValue{
x: number,
y: number,
handler: string
}
interface IcontextMenu {
  id?: string
  icon: string;
  text: string;
  values: Array<IcontextMenu>;
  disabled: boolean;
}
interface ISelectedArea {
  left: string;
  width: string;
  height: string;
  top: string;
}
interface IGroupStyle
{
  left?: string,
  top?: string,
  width?: string,
  height?: string,
  display?: string,
  groupName?: string
}
interface IdragResizeRef
{
[RefName: string]: []
}
interface IdragResizeRefStyle{
  offsetTop?: number
  offsetLeft?: number
}
interface IupdateDataModel {
  propertyName: keyof controlProperties
  value: any
}

interface IupdateDataModelExtraData {
  propertyName: keyof extraDatas
  value: any
}

interface IDragResizeGroup{
  event: MouseEvent
  handler: string
  controlId: string
}
interface ITabOrderDialogInitialStyle {
  left: string;
  top: string;
}
interface CustomMouseEvent extends MouseEvent{
  customCallBack?: Function
}
interface IScrollRef{
  scrollLeft?: number
  scrollTop?: number
}
interface Iscrolling {
  [scrolling: string]: {
    offsetWidth?: number;
    offsetHeight?: number;
    scrollWidth?: number;
    scrollLeft?: number;
    scrollTop?: number;
  };
}
interface ISelectedColoPaletteValue {
  propertyName: string;
  propertyValue: string;
}
interface tableData {
  value: number | string | null | undefined | font | boolean,
  type: string,
  category: string,
  values?: Array<string>
}
interface tableDatas {
  [propName: string]: tableData
}
interface ICommonProp {
  [propName: string]: any
}

interface ICommonPropVal {
  [propName: string]: string | number
}
interface IErrorRange {
  from : number
  to : number
}
