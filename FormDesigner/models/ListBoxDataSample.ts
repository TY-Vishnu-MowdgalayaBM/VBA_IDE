export const ListBox = {
  properties: {
    BackColor: '#ffffff',
    BorderColor: '#ffffff',
    BorderStyle: 0,
    BoundColumn: 3,
    ColumnCount: 5,
    ColumnHeads: false,
    ColumnWidths: '30pt;50pt;100pt',
    ControlSource: 'd7',
    ControlTipText: 'helptext',
    Enabled: true,
    EnterFieldBehavior: 0,
    Font: {
      FontName: 'Arial',
      FontSize: 10,
      FontBold: false,
      FontItalic: true,
      FontUnderline: true,
      FontStrikethrough: true,
      FontStyle: 'Arial Narrow Italic'
    },
    ForeColor: '#000000',
    Height: 100,
    HelpContextID: 0,
    IMEMode: 0,
    IntegralHeight: true,
    Left: 0,
    ListStyle: 0,
    Locked: false,
    MatchEntry: 1,
    MouseIcon: '',
    MousePointer: 0,
    Name: 'ListBox1',
    ID: 'ID_ListBox1',
    RowSource: 'a2:c5',
    SpecialEffect: 0,
    TabIndex: 0,
    TabStop: true,
    Tag: '',
    Text: 'b',
    TextAlign: 1,
    TextColumn: 1,
    Top: 0,
    TopIndex: 0,
    Value: 'd4',
    Visible: true,
    Width: 72
  },
  controls: [],
  extraDatas: {
    // it can be different from value
    ControlSourceValue: 'd4',
    ColumnHeadsValues: ['a', 'f', 'a1'],
    // ListBox.List
    RowSourceData: [
      ['b', 'g', 'b2'],
      ['c', 'h', 'c3'],
      ['d', 'i', 'd4'],
      ['e', 'j', 'e5']
    ]
  },
  type: 'ListBox'
}
