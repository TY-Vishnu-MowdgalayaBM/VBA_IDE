export class PropertyListDefine {
  data: {
    [controlName: string]: {
      [propName: string]: { category: string; type: string; values?: string[] };
    };
  };
  constructor () {
    this.data = {
      Userform: {
        Name: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        BackColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        BorderColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        BorderStyle: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'array',
          values: ['0 - fmBorderStyleNone', '1 - fmBorderStyleSingle']
        },
        Caption: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        ControlTipText: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        Cycle: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'array',
          values: [
            '0 - fmCycleAllForms',
            '2 - fmCycleCurrentForms'
          ]
        },
        DrawBuffer: {
          category: 'ID_CATEGORY_MISC',
          type: 'number'
        },
        Enabled: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        Font: {
          category: 'ID_CATEGORY_FONT',
          type: 'font'
        },
        ForeColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        Height: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        HelpContextID: {
          category: 'ID_CATEGORY_MISC',
          type: 'number'
        },
        KeepScrollBarsVisible: {
          category: 'ID_CATEGORY_SCROLLING',
          type: 'array',
          values: [
            '0 - fmScrollBarsNone',
            '1 - fmScrollBarsHorizontal',
            '2 - fmScrollBarsVertical',
            '3 - fmScrollBarsBoth'
          ]
        },
        Left: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        MouseIcon: {
          category: 'ID_CATEGORY_MISC',
          type: 'file'
        },
        MousePointer: {
          category: 'ID_CATEGORY_MISC',
          type: 'array',
          values: [
            '0 - fmMousePointerDefault',
            '1 - fmMousePointerArrow',
            '2 - fmMousePointerCross',
            '3 - fmMousePointerIBeam',
            '6 - fmMousePointerNESW',
            '7 - fmMousePointerNS',
            '8 - fmMousePointerNWSE',
            '9 - fmMousePointerWE',
            '10 - fmMousePointerUpArrow',
            '11 - fmMousePointerHourGlass',
            '12 - fmMousePointerNoDrop',
            '13 - fmMousePointerAppStarting',
            '14 - fmMousePointerHelp',
            '15 - fmMousePointerSizeAll',
            '99 - fmMousePointerCustom'
          ]
        },
        Picture: {
          category: 'ID_CATEGORY_PICTURE',
          type: 'file'
        },
        PictureAlignment: {
          category: 'ID_CATEGORY_PICTURE',
          type: 'array',
          values: [
            '0 - fmPictureAlignmentTopLeft',
            '1 - fmPictureAlignmentTopRight',
            '2 - fmPictureAlignmentCenter',
            '3 - fmPictureAlignmentBottomLeft',
            '4 - fmPictureAlignmentBottomRight'
          ]
        },
        PictureSizeMode: {
          category: 'ID_CATEGORY_PICTURE',
          type: 'array',
          values: [
            '0 - fmPictureSizeModeClip',
            '1 - fmPictureSizeModeStretch',
            '3 - fmPictureSizeModeZoom'
          ]
        },
        PictureTiling: {
          category: 'ID_CATEGORY_PICTURE',
          type: 'Boolean'
        },
        RightToLeft: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        ScrollBars: {
          category: 'ID_CATEGORY_SCROLLING',
          type: 'array',
          values: [
            '0 - fmScrollBarsNone',
            '1 - fmScrollBarsHorizontal',
            '2 - fmScrollBarsVertical',
            '3 - fmScrollBarsBoth'
          ]
        },
        ScrollHeight: {
          category: 'ID_CATEGORY_SCROLLING',
          type: 'number'
        },
        ScrollLeft: {
          category: 'ID_CATEGORY_SCROLLING',
          type: 'number'
        },
        ScrollTop: {
          category: 'ID_CATEGORY_SCROLLING',
          type: 'number'
        },
        ScrollWidth: {
          category: 'ID_CATEGORY_SCROLLING',
          type: 'number'
        },
        ShowModal: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        SpecialEffect: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'array',
          values: [
            '0 - fmSpecialEffectFlat',
            '1 - fmSpecialEffectRaised',
            '2 - fmSpecialEffectSunken',
            '3 - fmSpecialEffectEtched',
            '6 - fmSpecialEffectBump'
          ]
        },
        StartUpPosition: {
          category: 'ID_CATEGORY_POSITION',
          type: 'array',
          values: [
            '0 - Manual',
            '1 - CenterOwner',
            '2 - CenterScreen',
            '3 - Windows Default'
          ]
        },
        Tag: {
          category: 'ID_CATEGORY_MISC',
          type: 'String'
        },
        Top: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        WhatsThisButton: {
          category: 'ID_CATEGORY_MISC',
          type: 'Boolean'
        },
        WhatsThisHelp: {
          category: 'ID_CATEGORY_MISC',
          type: 'Boolean'
        },
        Width: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        Zoom: {
          category: 'ID_CATEGORY_MISC',
          type: 'number'
        }
      },
      Label: {
        Name: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        Accelerator: {
          category: 'ID_CATEGORY_MISC',
          type: 'String'
        },
        AutoSize: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        BackColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        BackStyle: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'array',
          values: ['0 - fmBackStyleTransparent', '1 - fmBackStyleOpaque']
        },
        BorderColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        BorderStyle: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'array',
          values: ['0 - fmBorderStyleNone', '1 - fmBorderStyleSingle']
        },
        Caption: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        ControlTipText: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        Enabled: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        Font: {
          category: 'ID_CATEGORY_FONT',
          type: 'font'
        },
        ForeColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        Height: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        HelpContextID: {
          category: 'ID_CATEGORY_MISC',
          type: 'number'
        },
        Left: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        MouseIcon: {
          category: 'ID_CATEGORY_MISC',
          type: 'file'
        },
        MousePointer: {
          category: 'ID_CATEGORY_MISC',
          type: 'array',
          values: [
            '0 - fmMousePointerDefault',
            '1 - fmMousePointerArrow',
            '2 - fmMousePointerCross',
            '3 - fmMousePointerIBeam',
            '6 - fmMousePointerNESW',
            '7 - fmMousePointerNS',
            '8 - fmMousePointerNWSE',
            '9 - fmMousePointerWE',
            '10 - fmMousePointerUpArrow',
            '11 - fmMousePointerHourGlass',
            '12 - fmMousePointerNoDrop',
            '13 - fmMousePointerAppStarting',
            '14 - fmMousePointerHelp',
            '15 - fmMousePointerSizeAll',
            '99 - fmMousePointerCustom'
          ]
        },
        Picture: {
          category: 'ID_CATEGORY_PICTURE',
          type: 'file'
        },
        PicturePosition: {
          category: 'ID_CATEGORY_PICTURE',
          type: 'array',
          values: [
            '0 - fmPicturePositionLeftTop',
            '1 - fmPicturePositionLeftCenter',
            '2 - fmPicturePositionLeftBottom',
            '3 - fmPicturePositionRightTop',
            '4 - fmPicturePositionRightCenter',
            '5 - fmPicturePositionRightBottom',
            '6 - fmPicturePositionAboveLeft',
            '7 - fmPicturePositionAboveCenter',
            '8 - fmPicturePositionAboveRight',
            '9 - fmPicturePositionBelowLeft',
            '10 - fmPicturePositionBelowCenter',
            '11 - fmPicturePositionBelowRight',
            '12 - fmPicturePositionCenter'
          ]
        },
        SpecialEffect: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'array',
          values: [
            '0 - fmSpecialEffectFlat',
            '1 - fmSpecialEffectRaised',
            '2 - fmSpecialEffectSunken',
            '3 - fmSpecialEffectEtched',
            '6 - fmSpecialEffectBump'
          ]
        },
        TabIndex: {
          category: 'ID_CATEGORY_MISC',
          type: 'number'
        },
        TabStop: {
          category: 'ID_CATEGORY_MISC',
          type: 'Boolean'
        },
        Tag: {
          category: 'ID_CATEGORY_MISC',
          type: 'String'
        },
        TextAlign: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'array',
          values: [
            '1 - fmTextAlignLeft',
            '2 - fmTextAlignCenter',
            '3 - fmTextAlignRight'
          ]
        },
        Top: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        Visible: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'Boolean'
        },
        Width: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        WordWrap: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        }
      },
      CommandButton: {
        Name: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        Accelerator: {
          category: 'ID_CATEGORY_MISC',
          type: 'String'
        },
        AutoSize: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        BackColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        BackStyle: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'array',
          values: ['0 - fmBackStyleTransparent', '1 - fmBackStyleOpaque']
        },
        Cancel: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        Caption: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        ControlTipText: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        Default: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        Enabled: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        Font: {
          category: 'ID_CATEGORY_FONT',
          type: 'font'
        },
        ForeColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        Height: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        HelpContextID: {
          category: 'ID_CATEGORY_MISC',
          type: 'number'
        },
        Left: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        Locked: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        MouseIcon: {
          category: 'ID_CATEGORY_MISC',
          type: 'file'
        },
        MousePointer: {
          category: 'ID_CATEGORY_MISC',
          type: 'array',
          values: [
            '0 - fmMousePointerDefault',
            '1 - fmMousePointerArrow',
            '2 - fmMousePointerCross',
            '3 - fmMousePointerIBeam',
            '6 - fmMousePointerNESW',
            '7 - fmMousePointerNS',
            '8 - fmMousePointerNWSE',
            '9 - fmMousePointerWE',
            '10 - fmMousePointerUpArrow',
            '11 - fmMousePointerHourGlass',
            '12 - fmMousePointerNoDrop',
            '13 - fmMousePointerAppStarting',
            '14 - fmMousePointerHelp',
            '15 - fmMousePointerSizeAll',
            '99 - fmMousePointerCustom'
          ]
        },
        Picture: {
          category: 'ID_CATEGORY_PICTURE',
          type: 'file'
        },
        PicturePosition: {
          category: 'ID_CATEGORY_PICTURE',
          type: 'array',
          values: [
            '0 - fmPicturePositionLeftTop',
            '1 - fmPicturePositionLeftCenter',
            '2 - fmPicturePositionLeftBottom',
            '3 - fmPicturePositionRightTop',
            '4 - fmPicturePositionRightCenter',
            '5 - fmPicturePositionRightBottom',
            '6 - fmPicturePositionAboveLeft',
            '7 - fmPicturePositionAboveCenter',
            '8 - fmPicturePositionAboveRight',
            '9 - fmPicturePositionBelowLeft',
            '10 - fmPicturePositionBelowCenter',
            '11 - fmPicturePositionBelowRight',
            '12 - fmPicturePositionCenter'
          ]
        },
        TabIndex: {
          category: 'ID_CATEGORY_MISC',
          type: 'number'
        },
        TabStop: {
          category: 'ID_CATEGORY_MISC',
          type: 'Boolean'
        },
        Tag: {
          category: 'ID_CATEGORY_MISC',
          type: 'String'
        },
        TakeFocusOnClick: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        Top: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        Visible: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'Boolean'
        },
        Width: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        WordWrap: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        }
      },
      OptionButton: {
        Name: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        Accelerator: {
          category: 'ID_CATEGORY_MISC',
          type: 'String'
        },
        Alignment: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'array',
          values: ['0 - fmAlignmentLeft', '1 - fmAlignmentRight']
        },
        AutoSize: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        BackColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        BackStyle: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'array',
          values: ['0 - fmBackStyleTransparent', '1 - fmBackStyleOpaque']
        },
        Caption: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        ControlSource: {
          category: 'ID_CATEGORY_DATA',
          type: 'String'
        },
        ControlTipText: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        Enabled: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        Font: {
          category: 'ID_CATEGORY_FONT',
          type: 'font'
        },
        ForeColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        GroupName: {
          category: 'ID_CATEGORY_MISC',
          type: 'String'
        },
        Height: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        HelpContextID: {
          category: 'ID_CATEGORY_MISC',
          type: 'number'
        },
        Left: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        Locked: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        MouseIcon: {
          category: 'ID_CATEGORY_MISC',
          type: 'file'
        },
        MousePointer: {
          category: 'ID_CATEGORY_MISC',
          type: 'array',
          values: [
            '0 - fmMousePointerDefault',
            '1 - fmMousePointerArrow',
            '2 - fmMousePointerCross',
            '3 - fmMousePointerIBeam',
            '6 - fmMousePointerNESW',
            '7 - fmMousePointerNS',
            '8 - fmMousePointerNWSE',
            '9 - fmMousePointerWE',
            '10 - fmMousePointerUpArrow',
            '11 - fmMousePointerHourGlass',
            '12 - fmMousePointerNoDrop',
            '13 - fmMousePointerAppStarting',
            '14 - fmMousePointerHelp',
            '15 - fmMousePointerSizeAll',
            '99 - fmMousePointerCustom'
          ]
        },
        Picture: {
          category: 'ID_CATEGORY_PICTURE',
          type: 'file'
        },
        PicturePosition: {
          category: 'ID_CATEGORY_PICTURE',
          type: 'array',
          values: [
            '0 - fmPicturePositionLeftTop',
            '1 - fmPicturePositionLeftCenter',
            '2 - fmPicturePositionLeftBottom',
            '3 - fmPicturePositionRightTop',
            '4 - fmPicturePositionRightCenter',
            '5 - fmPicturePositionRightBottom',
            '6 - fmPicturePositionAboveLeft',
            '7 - fmPicturePositionAboveCenter',
            '8 - fmPicturePositionAboveRight',
            '9 - fmPicturePositionBelowLeft',
            '10 - fmPicturePositionBelowCenter',
            '11 - fmPicturePositionBelowRight',
            '12 - fmPicturePositionCenter'
          ]
        },
        SpecialEffect: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'array',
          values: [
            '0 - fmButtonEffectFlat',
            '2 - fmButtonEffectSunken'
          ]
        },
        TabIndex: {
          category: 'ID_CATEGORY_MISC',
          type: 'number'
        },
        TabStop: {
          category: 'ID_CATEGORY_MISC',
          type: 'Boolean'
        },
        Tag: {
          category: 'ID_CATEGORY_MISC',
          type: 'String'
        },
        TextAlign: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'array',
          values: [
            '1 - fmTextAlignLeft',
            '2 - fmTextAlignCenter',
            '3 - fmTextAlignRight'
          ]
        },
        Top: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        TripleState: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        Value: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        Visible: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'Boolean'
        },
        Width: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        WordWrap: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        }
      },
      CheckBox: {
        Name: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        Accelerator: {
          category: 'ID_CATEGORY_MISC',
          type: 'String'
        },
        Alignment: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'array',
          values: ['0 - fmAlignmentLeft', '1 - fmAlignmentRight']
        },
        AutoSize: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        BackColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        BackStyle: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'array',
          values: ['0 - fmBackStyleTransparent', '1 - fmBackStyleOpaque']
        },
        Caption: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        ControlSource: {
          category: 'ID_CATEGORY_DATA',
          type: 'String'
        },
        ControlTipText: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        Enabled: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        Font: {
          category: 'ID_CATEGORY_FONT',
          type: 'font'
        },
        ForeColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        GroupName: {
          category: 'ID_CATEGORY_MISC',
          type: 'String'
        },
        Height: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        HelpContextID: {
          category: 'ID_CATEGORY_MISC',
          type: 'number'
        },
        Left: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        Locked: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        MouseIcon: {
          category: 'ID_CATEGORY_MISC',
          type: 'file'
        },
        MousePointer: {
          category: 'ID_CATEGORY_MISC',
          type: 'array',
          values: [
            '0 - fmMousePointerDefault',
            '1 - fmMousePointerArrow',
            '2 - fmMousePointerCross',
            '3 - fmMousePointerIBeam',
            '6 - fmMousePointerNESW',
            '7 - fmMousePointerNS',
            '8 - fmMousePointerNWSE',
            '9 - fmMousePointerWE',
            '10 - fmMousePointerUpArrow',
            '11 - fmMousePointerHourGlass',
            '12 - fmMousePointerNoDrop',
            '13 - fmMousePointerAppStarting',
            '14 - fmMousePointerHelp',
            '15 - fmMousePointerSizeAll',
            '99 - fmMousePointerCustom'
          ]
        },
        Picture: {
          category: 'ID_CATEGORY_PICTURE',
          type: 'file'
        },
        PicturePosition: {
          category: 'ID_CATEGORY_PICTURE',
          type: 'array',
          values: [
            '0 - fmPicturePositionLeftTop',
            '1 - fmPicturePositionLeftCenter',
            '2 - fmPicturePositionLeftBottom',
            '3 - fmPicturePositionRightTop',
            '4 - fmPicturePositionRightCenter',
            '5 - fmPicturePositionRightBottom',
            '6 - fmPicturePositionAboveLeft',
            '7 - fmPicturePositionAboveCenter',
            '8 - fmPicturePositionAboveRight',
            '9 - fmPicturePositionBelowLeft',
            '10 - fmPicturePositionBelowCenter',
            '11 - fmPicturePositionBelowRight',
            '12 - fmPicturePositionCenter'
          ]
        },
        SpecialEffect: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'array',
          values: [
            '0 - fmButtonEffectFlat',
            '2 - fmButtonEffectSunken'
          ]
        },
        TabIndex: {
          category: 'ID_CATEGORY_MISC',
          type: 'number'
        },
        TabStop: {
          category: 'ID_CATEGORY_MISC',
          type: 'Boolean'
        },
        Tag: {
          category: 'ID_CATEGORY_MISC',
          type: 'String'
        },
        TextAlign: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'array',
          values: [
            '1 - fmTextAlignLeft',
            '2 - fmTextAlignCenter',
            '3 - fmTextAlignRight'
          ]
        },
        Top: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        TripleState: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        Value: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        Visible: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'Boolean'
        },
        Width: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        WordWrap: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        }
      },
      ScrollBar: {
        Name: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        BackColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        ControlSource: {
          category: 'ID_CATEGORY_DATA',
          type: 'String'
        },
        ControlTipText: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        Delay: {
          category: 'ID_CATEGORY_SCROLLING',
          type: 'number'
        },
        Enabled: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        ForeColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        Height: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        HelpContextID: {
          category: 'ID_CATEGORY_MISC',
          type: 'number'
        },
        LargeChange: {
          category: 'ID_CATEGORY_SCROLLING',
          type: 'number'
        },
        Left: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        Max: {
          category: 'ID_CATEGORY_SCROLLING',
          type: 'number'
        },
        Min: {
          category: 'ID_CATEGORY_SCROLLING',
          type: 'number'
        },
        MouseIcon: {
          category: 'ID_CATEGORY_MISC',
          type: 'file'
        },
        MousePointer: {
          category: 'ID_CATEGORY_MISC',
          type: 'array',
          values: [
            '0 - fmMousePointerDefault',
            '1 - fmMousePointerArrow',
            '2 - fmMousePointerCross',
            '3 - fmMousePointerIBeam',
            '6 - fmMousePointerNESW',
            '7 - fmMousePointerNS',
            '8 - fmMousePointerNWSE',
            '9 - fmMousePointerWE',
            '10 - fmMousePointerUpArrow',
            '11 - fmMousePointerHourGlass',
            '12 - fmMousePointerNoDrop',
            '13 - fmMousePointerAppStarting',
            '14 - fmMousePointerHelp',
            '15 - fmMousePointerSizeAll',
            '99 - fmMousePointerCustom'
          ]
        },
        Orientation: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'array',
          values: [
            '-1 - fmOrientationAuto',
            '0 - fmOrientationVertical',
            '1 - fmOrientationHorizontal'
          ]
        },
        ProportionalThumb: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'Boolean'
        },
        SmallChange: {
          category: 'ID_CATEGORY_SCROLLING',
          type: 'number'
        },
        TabIndex: {
          category: 'ID_CATEGORY_MISC',
          type: 'number'
        },
        TabStop: {
          category: 'ID_CATEGORY_MISC',
          type: 'Boolean'
        },
        Tag: {
          category: 'ID_CATEGORY_MISC',
          type: 'String'
        },
        Top: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        Value: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'number'
        },
        Visible: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'Boolean'
        },
        Width: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        }
      },
      SpinButton: {
        Name: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        BackColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        ControlSource: {
          category: 'ID_CATEGORY_DATA',
          type: 'String'
        },
        ControlTipText: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        Delay: {
          category: 'ID_CATEGORY_SCROLLING',
          type: 'number'
        },
        Enabled: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        ForeColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        Height: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        HelpContextID: {
          category: 'ID_CATEGORY_MISC',
          type: 'number'
        },
        Left: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        Max: {
          category: 'ID_CATEGORY_SCROLLING',
          type: 'number'
        },
        Min: {
          category: 'ID_CATEGORY_SCROLLING',
          type: 'number'
        },
        MouseIcon: {
          category: 'ID_CATEGORY_MISC',
          type: 'file'
        },
        MousePointer: {
          category: 'ID_CATEGORY_MISC',
          type: 'array',
          values: [
            '0 - fmMousePointerDefault',
            '1 - fmMousePointerArrow',
            '2 - fmMousePointerCross',
            '3 - fmMousePointerIBeam',
            '6 - fmMousePointerNESW',
            '7 - fmMousePointerNS',
            '8 - fmMousePointerNWSE',
            '9 - fmMousePointerWE',
            '10 - fmMousePointerUpArrow',
            '11 - fmMousePointerHourGlass',
            '12 - fmMousePointerNoDrop',
            '13 - fmMousePointerAppStarting',
            '14 - fmMousePointerHelp',
            '15 - fmMousePointerSizeAll',
            '99 - fmMousePointerCustom'
          ]
        },
        Orientation: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'array',
          values: [
            '-1 - fmOrientationAuto',
            '0 - fmOrientationVertical',
            '1 - fmOrientationHorizontal'
          ]
        },
        SmallChange: {
          category: 'ID_CATEGORY_SCROLLING',
          type: 'number'
        },
        TabIndex: {
          category: 'ID_CATEGORY_MISC',
          type: 'number'
        },
        TabStop: {
          category: 'ID_CATEGORY_MISC',
          type: 'Boolean'
        },
        Tag: {
          category: 'ID_CATEGORY_MISC',
          type: 'String'
        },
        Top: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        Value: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'number'
        },
        Visible: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'Boolean'
        },
        Width: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        }
      },
      TabStrip: {
        Name: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        BackColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        ControlTipText: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        Enabled: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        Font: {
          category: 'ID_CATEGORY_FONT',
          type: 'font'
        },
        ForeColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        Height: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        HelpContextID: {
          category: 'ID_CATEGORY_MISC',
          type: 'number'
        },
        Left: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        MouseIcon: {
          category: 'ID_CATEGORY_MISC',
          type: 'file'
        },
        MousePointer: {
          category: 'ID_CATEGORY_MISC',
          type: 'array',
          values: [
            '0 - fmMousePointerDefault',
            '1 - fmMousePointerArrow',
            '2 - fmMousePointerCross',
            '3 - fmMousePointerIBeam',
            '6 - fmMousePointerNESW',
            '7 - fmMousePointerNS',
            '8 - fmMousePointerNWSE',
            '9 - fmMousePointerWE',
            '10 - fmMousePointerUpArrow',
            '11 - fmMousePointerHourGlass',
            '12 - fmMousePointerNoDrop',
            '13 - fmMousePointerAppStarting',
            '14 - fmMousePointerHelp',
            '15 - fmMousePointerSizeAll',
            '99 - fmMousePointerCustom'
          ]
        },
        MultiRow: {
          category: 'ID_CATEGORY_TABS',
          type: 'Boolean'
        },
        Style: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'array',
          values: [
            '0 - fmTabStyleTabs',
            '1 - fmTabStyleButtons',
            '2 - fmTabStyleNone'
          ]
        },
        TabFixedHeight: {
          category: 'ID_CATEGORY_TABS',
          type: 'number'
        },
        TabFixedWidth: {
          category: 'ID_CATEGORY_TABS',
          type: 'number'
        },
        TabIndex: {
          category: 'ID_CATEGORY_MISC',
          type: 'number'
        },
        TabOrientation: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'array',
          values: [
            '0 - fmTabOrientationTop',
            '1 - fmTabOrientationBottom',
            '2 - fmTabOrientationLeft',
            '3 - fmTabOrientationRight'
          ]
        },
        TabStop: {
          category: 'ID_CATEGORY_MISC',
          type: 'Boolean'
        },
        Tag: {
          category: 'ID_CATEGORY_MISC',
          type: 'String'
        },
        Top: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        Value: {
          category: 'ID_CATEGORY_TABS',
          type: 'number'
        },
        Visible: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'Boolean'
        },
        Width: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        }
      },
      MultiPage: {
        Name: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        BackColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        ControlTipText: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        Enabled: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        Font: {
          category: 'ID_CATEGORY_FONT',
          type: 'font'
        },
        ForeColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        Height: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        HelpContextID: {
          category: 'ID_CATEGORY_MISC',
          type: 'number'
        },
        Left: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        MultiRow: {
          category: 'ID_CATEGORY_TABS',
          type: 'Boolean'
        },
        Style: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'array',
          values: [
            '0 - fmTabStyleTabs',
            '1 - fmTabStyleButtons',
            '2 - fmTabStyleNone'
          ]
        },
        TabFixedHeight: {
          category: 'ID_CATEGORY_TABS',
          type: 'number'
        },
        TabFixedWidth: {
          category: 'ID_CATEGORY_TABS',
          type: 'number'
        },
        TabIndex: {
          category: 'ID_CATEGORY_MISC',
          type: 'number'
        },
        TabOrientation: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'array',
          values: [
            '0 - fmTabOrientationTop',
            '1 - fmTabOrientationBottom',
            '2 - fmTabOrientationLeft',
            '3 - fmTabOrientationRight'
          ]
        },
        TabStop: {
          category: 'ID_CATEGORY_MISC',
          type: 'Boolean'
        },
        Tag: {
          category: 'ID_CATEGORY_MISC',
          type: 'String'
        },
        Top: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        Value: {
          category: 'ID_CATEGORY_MISC',
          type: 'number'
        },
        Visible: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'Boolean'
        },
        Width: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        }
      },
      FDImage: {
        Name: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        AutoSize: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        BackColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        BackStyle: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'array',
          values: ['0 - fmBackStyleTransparent', '1 - fmBackStyleOpaque']
        },
        BorderColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        BorderStyle: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'array',
          values: ['0 - fmBorderStyleNone', '1 - fmBorderStyleSingle']
        },
        ControlTipText: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        Enabled: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        Height: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        Left: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        MouseIcon: {
          category: 'ID_CATEGORY_MISC',
          type: 'file'
        },
        MousePointer: {
          category: 'ID_CATEGORY_MISC',
          type: 'array',
          values: [
            '0 - fmMousePointerDefault',
            '1 - fmMousePointerArrow',
            '2 - fmMousePointerCross',
            '3 - fmMousePointerIBeam',
            '6 - fmMousePointerNESW',
            '7 - fmMousePointerNS',
            '8 - fmMousePointerNWSE',
            '9 - fmMousePointerWE',
            '10 - fmMousePointerUpArrow',
            '11 - fmMousePointerHourGlass',
            '12 - fmMousePointerNoDrop',
            '13 - fmMousePointerAppStarting',
            '14 - fmMousePointerHelp',
            '15 - fmMousePointerSizeAll',
            '99 - fmMousePointerCustom'
          ]
        },
        Picture: {
          category: 'ID_CATEGORY_PICTURE',
          type: 'file'
        },
        PictureAlignment: {
          category: 'ID_CATEGORY_PICTURE',
          type: 'array',
          values: [
            '0 - fmPictureAlignmentTopLeft',
            '1 - fmPictureAlignmentTopRight',
            '2 - fmPictureAlignmentCenter',
            '3 - fmPictureAlignmentBottomLeft',
            '4 - fmPictureAlignmentBottomRight'
          ]
        },
        PictureSizeMode: {
          category: 'ID_CATEGORY_PICTURE',
          type: 'array',
          values: [
            '0 - fmPictureSizeModeClip',
            '1 - fmPictureSizeModeStretch',
            '3 - fmPictureSizeModeZoom'
          ]
        },
        PictureTiling: {
          category: 'ID_CATEGORY_PICTURE',
          type: 'Boolean'
        },
        SpecialEffect: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'array',
          values: [
            '0 - fmSpecialEffectFlat',
            '1 - fmSpecialEffectRaised',
            '2 - fmSpecialEffectSunken',
            '3 - fmSpecialEffectEtched',
            '6 - fmSpecialEffectBump'
          ]
        },
        Tag: {
          category: 'ID_CATEGORY_MISC',
          type: 'String'
        },
        Top: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        Visible: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'Boolean'
        },
        Width: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        }
      },
      ToggleButton: {
        Name: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        Accelerator: {
          category: 'ID_CATEGORY_MISC',
          type: 'String'
        },
        AutoSize: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        BackColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        BackStyle: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'array',
          values: ['0 - fmBackStyleTransparent', '1 - fmBackStyleOpaque']
        },
        Caption: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        ControlSource: {
          category: 'ID_CATEGORY_DATA',
          type: 'String'
        },
        ControlTipText: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        Enabled: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        Font: {
          category: 'ID_CATEGORY_FONT',
          type: 'font'
        },
        ForeColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        Height: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        HelpContextID: {
          category: 'ID_CATEGORY_MISC',
          type: 'number'
        },
        Left: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        Locked: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        MouseIcon: {
          category: 'ID_CATEGORY_MISC',
          type: 'file'
        },
        MousePointer: {
          category: 'ID_CATEGORY_MISC',
          type: 'array',
          values: [
            '0 - fmMousePointerDefault',
            '1 - fmMousePointerArrow',
            '2 - fmMousePointerCross',
            '3 - fmMousePointerIBeam',
            '6 - fmMousePointerNESW',
            '7 - fmMousePointerNS',
            '8 - fmMousePointerNWSE',
            '9 - fmMousePointerWE',
            '10 - fmMousePointerUpArrow',
            '11 - fmMousePointerHourGlass',
            '12 - fmMousePointerNoDrop',
            '13 - fmMousePointerAppStarting',
            '14 - fmMousePointerHelp',
            '15 - fmMousePointerSizeAll',
            '99 - fmMousePointerCustom'
          ]
        },
        Picture: {
          category: 'ID_CATEGORY_PICTURE',
          type: 'file'
        },
        PicturePosition: {
          category: 'ID_CATEGORY_PICTURE',
          type: 'array',
          values: [
            '0 - fmPicturePositionLeftTop',
            '1 - fmPicturePositionLeftCenter',
            '2 - fmPicturePositionLeftBottom',
            '3 - fmPicturePositionRightTop',
            '4 - fmPicturePositionRightCenter',
            '5 - fmPicturePositionRightBottom',
            '6 - fmPicturePositionAboveLeft',
            '7 - fmPicturePositionAboveCenter',
            '8 - fmPicturePositionAboveRight',
            '9 - fmPicturePositionBelowLeft',
            '10 - fmPicturePositionBelowCenter',
            '11 - fmPicturePositionBelowRight',
            '12 - fmPicturePositionCenter'
          ]
        },
        TabIndex: {
          category: 'ID_CATEGORY_MISC',
          type: 'number'
        },
        TabStop: {
          category: 'ID_CATEGORY_MISC',
          type: 'Boolean'
        },
        Tag: {
          category: 'ID_CATEGORY_MISC',
          type: 'String'
        },
        TextAlign: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'array',
          values: [
            '1 - fmTextAlignLeft',
            '2 - fmTextAlignCenter',
            '3 - fmTextAlignRight'
          ]
        },
        Top: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        TripleState: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        Value: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        Visible: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'Boolean'
        },
        Width: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        WordWrap: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        }
      },
      Frame: {
        Name: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        BackColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        BorderColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        BorderStyle: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'array',
          values: ['0 - fmBorderStyleNone', '1 - fmBorderStyleSingle']
        },
        Caption: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        ControlTipText: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        Cycle: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'array',
          values: [
            '0 - fmCycleAllForms',
            '2 - fmCycleCurrentForms'
          ]
        },
        Enabled: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        Font: {
          category: 'ID_CATEGORY_FONT',
          type: 'font'
        },
        ForeColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        Height: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        HelpContextID: {
          category: 'ID_CATEGORY_MISC',
          type: 'number'
        },
        KeepScrollBarsVisible: {
          category: 'ID_CATEGORY_SCROLLING',
          type: 'array',
          values: [
            '0 - fmScrollBarsNone',
            '1 - fmScrollBarsHorizontal',
            '2 - fmScrollBarsVertical',
            '3 - fmScrollBarsBoth'
          ]
        },
        Left: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        MouseIcon: {
          category: 'ID_CATEGORY_MISC',
          type: 'file'
        },
        MousePointer: {
          category: 'ID_CATEGORY_MISC',
          type: 'array',
          values: [
            '0 - fmMousePointerDefault',
            '1 - fmMousePointerArrow',
            '2 - fmMousePointerCross',
            '3 - fmMousePointerIBeam',
            '6 - fmMousePointerNESW',
            '7 - fmMousePointerNS',
            '8 - fmMousePointerNWSE',
            '9 - fmMousePointerWE',
            '10 - fmMousePointerUpArrow',
            '11 - fmMousePointerHourGlass',
            '12 - fmMousePointerNoDrop',
            '13 - fmMousePointerAppStarting',
            '14 - fmMousePointerHelp',
            '15 - fmMousePointerSizeAll',
            '99 - fmMousePointerCustom'
          ]
        },
        Picture: {
          category: 'ID_CATEGORY_PICTURE',
          type: 'file'
        },
        PictureAlignment: {
          category: 'ID_CATEGORY_PICTURE',
          type: 'array',
          values: [
            '0 - fmPictureAlignmentTopLeft',
            '1 - fmPictureAlignmentTopRight',
            '2 - fmPictureAlignmentCenter',
            '3 - fmPictureAlignmentBottomLeft',
            '4 - fmPictureAlignmentBottomRight'
          ]
        },
        PictureSizeMode: {
          category: 'ID_CATEGORY_PICTURE',
          type: 'array',
          values: [
            '0 - fmPictureSizeModeClip',
            '1 - fmPictureSizeModeStretch',
            '3 - fmPictureSizeModeZoom'
          ]
        },
        PictureTiling: {
          category: 'ID_CATEGORY_PICTURE',
          type: 'Boolean'
        },
        ScrollBars: {
          category: 'ID_CATEGORY_SCROLLING',
          type: 'array',
          values: [
            '0 - fmScrollBarsNone',
            '1 - fmScrollBarsHorizontal',
            '2 - fmScrollBarsVertical',
            '3 - fmScrollBarsBoth'
          ]
        },
        ScrollHeight: {
          category: 'ID_CATEGORY_SCROLLING',
          type: 'number'
        },
        ScrollLeft: {
          category: 'ID_CATEGORY_SCROLLING',
          type: 'number'
        },
        ScrollTop: {
          category: 'ID_CATEGORY_SCROLLING',
          type: 'number'
        },
        ScrollWidth: {
          category: 'ID_CATEGORY_SCROLLING',
          type: 'number'
        },
        SpecialEffect: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'array',
          values: [
            '0 - fmSpecialEffectFlat',
            '1 - fmSpecialEffectRaised',
            '2 - fmSpecialEffectSunken',
            '3 - fmSpecialEffectEtched',
            '6 - fmSpecialEffectBump'
          ]
        },
        TabIndex: {
          category: 'ID_CATEGORY_MISC',
          type: 'number'
        },
        TabStop: {
          category: 'ID_CATEGORY_MISC',
          type: 'Boolean'
        },
        Tag: {
          category: 'ID_CATEGORY_MISC',
          type: 'String'
        },
        Top: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        Visible: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'Boolean'
        },
        Width: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        Zoom: {
          category: 'ID_CATEGORY_MISC',
          type: 'number'
        }
      },
      ComboBox: {
        Name: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        AutoSize: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        AutoTab: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        AutoWordSelect: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        BackColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        BackStyle: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'array',
          values: ['0 - fmBackStyleTransparent', '1 - fmBackStyleOpaque']
        },
        BorderColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        BorderStyle: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'array',
          values: ['0 - fmBorderStyleNone', '1 - fmBorderStyleSingle']
        },
        BoundColumn: {
          category: 'ID_CATEGORY_DATA',
          type: 'number'
        },
        ColumnCount: {
          category: 'ID_CATEGORY_DATA',
          type: 'number'
        },
        ColumnHeads: {
          category: 'ID_CATEGORY_DATA',
          type: 'Boolean'
        },
        ColumnWidths: {
          category: 'ID_CATEGORY_DATA',
          type: 'String'
        },
        ControlSource: {
          category: 'ID_CATEGORY_DATA',
          type: 'String'
        },
        ControlTipText: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        DragBehavior: {
          category: 'ID_CATEGORY_MISC',
          type: 'array',
          values: [
            '0 - fmDragBehaviorDisabled',
            '1 - fmDragBehaviorEnabled'
          ]
        },
        DropButtonStyle: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'array',
          values: [
            '0 - fmDropButtonStylePlain',
            '1 - fmDropButtonStyleArrow',
            '2 - fmDropButtonStyleEllipsis',
            '3 - fmDropButtonStyleReduce'
          ]
        },
        Enabled: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        EnterFieldBehavior: {
          category: 'ID_CATEGORY_MISC',
          type: 'array',
          values: [
            '0 - fmEnterFieldBehaviorSelectAll',
            '1 - fmEnterFieldBehaviorRecallSelection'
          ]
        },
        Font: {
          category: 'ID_CATEGORY_FONT',
          type: 'font'
        },
        ForeColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        Height: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        HelpContextID: {
          category: 'ID_CATEGORY_MISC',
          type: 'number'
        },
        HideSelection: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        IMEMode: {
          category: 'ID_CATEGORY_MISC',
          type: 'array',
          values: [
            '0 - fmIMEModeNoControl'
          ]
        },
        Left: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        ListRows: {
          category: 'ID_CATEGORY_DATA',
          type: 'number'
        },
        ListStyle: {
          category: 'ID_CATEGORY_DATA',
          type: 'array',
          values: [
            '0 - fmListStylePlain',
            '1 - fmListStyleOption'
          ]
        },
        ListWidth: {
          category: 'ID_CATEGORY_DATA',
          type: 'String'
        },
        Locked: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        MatchEntry: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'array',
          values: [
            '0 - fmMatchEntryFirstLetter',
            '1 - fmMatchEntryComplete',
            '2 - fmMatchEntryNone'
          ]
        },
        MatchRequired: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        MaxLength: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'number'
        },
        MouseIcon: {
          category: 'ID_CATEGORY_MISC',
          type: 'file'
        },
        MousePointer: {
          category: 'ID_CATEGORY_MISC',
          type: 'array',
          values: [
            '0 - fmMousePointerDefault',
            '1 - fmMousePointerArrow',
            '2 - fmMousePointerCross',
            '3 - fmMousePointerIBeam',
            '6 - fmMousePointerNESW',
            '7 - fmMousePointerNS',
            '8 - fmMousePointerNWSE',
            '9 - fmMousePointerWE',
            '10 - fmMousePointerUpArrow',
            '11 - fmMousePointerHourGlass',
            '12 - fmMousePointerNoDrop',
            '13 - fmMousePointerAppStarting',
            '14 - fmMousePointerHelp',
            '15 - fmMousePointerSizeAll',
            '99 - fmMousePointerCustom'
          ]
        },
        RowSource: {
          category: 'ID_CATEGORY_DATA',
          type: 'String'
        },
        SelectionMargin: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        ShowDropButtonWhen: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'array',
          values: [
            '0 - fmShowDropButtonNever',
            '1 - fmShowDropButtonFocus',
            '2 - fmShowDropButtonAlways'
          ]
        },
        SpecialEffect: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'array',
          values: [
            '0 - fmSpecialEffectFlat',
            '1 - fmSpecialEffectRaised',
            '2 - fmSpecialEffectSunken',
            '3 - fmSpecialEffectEtched',
            '6 - fmSpecialEffectBump'
          ]
        },
        Style: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'array',
          values: [
            '0 - fmStyleDropDownCombo',
            '2 - fmStyleDropDownList'
          ]
        },
        TabIndex: {
          category: 'ID_CATEGORY_MISC',
          type: 'number'
        },
        TabStop: {
          category: 'ID_CATEGORY_MISC',
          type: 'Boolean'
        },
        Tag: {
          category: 'ID_CATEGORY_MISC',
          type: 'String'
        },
        Text: {
          category: 'ID_CATEGORY_DATA',
          type: 'String'
        },
        TextAlign: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'array',
          values: [
            '1 - fmTextAlignLeft',
            '2 - fmTextAlignCenter',
            '3 - fmTextAlignRight'
          ]
        },
        TextColumn: {
          category: 'ID_CATEGORY_DATA',
          type: 'number'
        },
        Top: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        TopIndex: {
          category: 'ID_CATEGORY_DATA',
          type: 'number'
        },
        Value: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        Visible: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'Boolean'
        },
        Width: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        }
      },
      ListBox: {
        Name: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        BackColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        BorderColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        BorderStyle: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'array',
          values: ['0 - fmBorderStyleNone', '1 - fmBorderStyleSingle']
        },
        BoundColumn: {
          category: 'ID_CATEGORY_DATA',
          type: 'number'
        },
        ColumnCount: {
          category: 'ID_CATEGORY_DATA',
          type: 'number'
        },
        ColumnHeads: {
          category: 'ID_CATEGORY_DATA',
          type: 'Boolean'
        },
        ColumnWidths: {
          category: 'ID_CATEGORY_DATA',
          type: 'String'
        },
        ControlSource: {
          category: 'ID_CATEGORY_DATA',
          type: 'String'
        },
        ControlTipText: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        Enabled: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        Font: {
          category: 'ID_CATEGORY_FONT',
          type: 'font'
        },
        ForeColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        Height: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        HelpContextID: {
          category: 'ID_CATEGORY_MISC',
          type: 'number'
        },
        IMEMode: {
          category: 'ID_CATEGORY_MISC',
          type: 'array',
          values: [
            '0 - fmIMEModeNoControl'
          ]
        },
        IntegralHeight: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        Left: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        ListStyle: {
          category: 'ID_CATEGORY_DATA',
          type: 'array',
          values: [
            '0 - fmListStylePlain',
            '1 - fmListStyleOption'
          ]
        },
        Locked: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        MatchEntry: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'array',
          values: [
            '0 - fmMatchEntryFirstLetter',
            '1 - fmMatchEntryComplete',
            '2 - fmMatchEntryNone'
          ]
        },
        MouseIcon: {
          category: 'ID_CATEGORY_MISC',
          type: 'file'
        },
        MousePointer: {
          category: 'ID_CATEGORY_MISC',
          type: 'array',
          values: [
            '0 - fmMousePointerDefault',
            '1 - fmMousePointerArrow',
            '2 - fmMousePointerCross',
            '3 - fmMousePointerIBeam',
            '6 - fmMousePointerNESW',
            '7 - fmMousePointerNS',
            '8 - fmMousePointerNWSE',
            '9 - fmMousePointerWE',
            '10 - fmMousePointerUpArrow',
            '11 - fmMousePointerHourGlass',
            '12 - fmMousePointerNoDrop',
            '13 - fmMousePointerAppStarting',
            '14 - fmMousePointerHelp',
            '15 - fmMousePointerSizeAll',
            '99 - fmMousePointerCustom'
          ]
        },
        MultiSelect: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'array',
          values: [
            '0 - fmMultiSelectSingle',
            '1 - fmMultiSelectMulti',
            '2 - fmMultiSelectExtended'
          ]
        },
        RowSource: {
          category: 'ID_CATEGORY_DATA',
          type: 'String'
        },
        SpecialEffect: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'array',
          values: [
            '0 - fmSpecialEffectFlat',
            '1 - fmSpecialEffectRaised',
            '2 - fmSpecialEffectSunken',
            '3 - fmSpecialEffectEtched',
            '6 - fmSpecialEffectBump'
          ]
        },
        TabIndex: {
          category: 'ID_CATEGORY_MISC',
          type: 'number'
        },
        TabStop: {
          category: 'ID_CATEGORY_MISC',
          type: 'Boolean'
        },
        Tag: {
          category: 'ID_CATEGORY_MISC',
          type: 'String'
        },
        Text: {
          category: 'ID_CATEGORY_DATA',
          type: 'String'
        },
        TextAlign: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'array',
          values: [
            '1 - fmTextAlignLeft',
            '2 - fmTextAlignCenter',
            '3 - fmTextAlignRight'
          ]
        },
        TextColumn: {
          category: 'ID_CATEGORY_DATA',
          type: 'number'
        },
        Top: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        TopIndex: {
          category: 'ID_CATEGORY_DATA',
          type: 'number'
        },
        Value: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        Visible: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'Boolean'
        },
        Width: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        }
      },
      TextBox: {
        Name: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        AutoSize: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        AutoTab: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        AutoWordSelect: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        BackColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        BackStyle: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'array',
          values: ['0 - fmBackStyleTransparent', '1 - fmBackStyleOpaque']
        },
        BorderColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        BorderStyle: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'array',
          values: ['0 - fmBorderStyleNone', '1 - fmBorderStyleSingle']
        },
        ControlSource: {
          category: 'ID_CATEGORY_DATA',
          type: 'String'
        },
        ControlTipText: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        DragBehavior: {
          category: 'ID_CATEGORY_MISC',
          type: 'array',
          values: [
            '0 - fmDragBehaviorDisabled',
            '1 - fmDragBehaviorEnabled'
          ]
        },
        Enabled: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        EnterFieldBehavior: {
          category: 'ID_CATEGORY_MISC',
          type: 'array',
          values: [
            '0 - fmEnterFieldBehaviorSelectAll',
            '1 - fmEnterFieldBehaviorRecallSelection'
          ]
        },
        EnterKeyBehavior: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        Font: {
          category: 'ID_CATEGORY_FONT',
          type: 'font'
        },
        ForeColor: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'color'
        },
        Height: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        HelpContextID: {
          category: 'ID_CATEGORY_MISC',
          type: 'number'
        },
        HideSelection: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        IMEMode: {
          category: 'ID_CATEGORY_MISC',
          type: 'array',
          values: [
            '0 - fmIMEModeNoControl'
          ]
        },
        IntegralHeight: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        Left: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        Locked: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        MaxLength: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'number'
        },
        MouseIcon: {
          category: 'ID_CATEGORY_MISC',
          type: 'file'
        },
        MousePointer: {
          category: 'ID_CATEGORY_MISC',
          type: 'array',
          values: [
            '0 - fmMousePointerDefault',
            '1 - fmMousePointerArrow',
            '2 - fmMousePointerCross',
            '3 - fmMousePointerIBeam',
            '6 - fmMousePointerNESW',
            '7 - fmMousePointerNS',
            '8 - fmMousePointerNWSE',
            '9 - fmMousePointerWE',
            '10 - fmMousePointerUpArrow',
            '11 - fmMousePointerHourGlass',
            '12 - fmMousePointerNoDrop',
            '13 - fmMousePointerAppStarting',
            '14 - fmMousePointerHelp',
            '15 - fmMousePointerSizeAll',
            '99 - fmMousePointerCustom'
          ]
        },
        MultiLine: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        PasswordChar: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        ScrollBars: {
          category: 'ID_CATEGORY_SCROLLING',
          type: 'array',
          values: [
            '0 - fmScrollBarsNone',
            '1 - fmScrollBarsHorizontal',
            '2 - fmScrollBarsVertical',
            '3 - fmScrollBarsBoth'
          ]
        },
        SelectionMargin: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        SpecialEffect: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'array',
          values: [
            '0 - fmSpecialEffectFlat',
            '1 - fmSpecialEffectRaised',
            '2 - fmSpecialEffectSunken',
            '3 - fmSpecialEffectEtched',
            '6 - fmSpecialEffectBump'
          ]
        },
        TabIndex: {
          category: 'ID_CATEGORY_MISC',
          type: 'number'
        },
        TabKeyBehavior: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        TabStop: {
          category: 'ID_CATEGORY_MISC',
          type: 'Boolean'
        },
        Tag: {
          category: 'ID_CATEGORY_MISC',
          type: 'String'
        },
        Text: {
          category: 'ID_CATEGORY_DATA',
          type: 'String'
        },
        TextAlign: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'array',
          values: [
            '1 - fmTextAlignLeft',
            '2 - fmTextAlignCenter',
            '3 - fmTextAlignRight'
          ]
        },
        Top: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        Value: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        Visible: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'Boolean'
        },
        Width: {
          category: 'ID_CATEGORY_POSITION',
          type: 'number'
        },
        WordWrap: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        }
      },
      Page: {
        Name: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        Accelerator: {
          category: 'ID_CATEGORY_MISC',
          type: 'String'
        },
        Caption: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        ControlTipText: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'String'
        },
        Cycle: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'array',
          values: [
            '0 - fmCycleAllForms',
            '2 - fmCycleCurrentForms'
          ]
        },
        Enabled: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'Boolean'
        },
        Index: {
          category: 'ID_CATEGORY_TABS',
          type: 'number'
        },
        KeepScrollBarsVisible: {
          category: 'ID_CATEGORY_SCROLLING',
          type: 'array',
          values: [
            '0 - fmScrollBarsNone',
            '1 - fmScrollBarsHorizontal',
            '2 - fmScrollBarsVertical',
            '3 - fmScrollBarsBoth'
          ]
        },
        Picture: {
          category: 'ID_CATEGORY_PICTURE',
          type: 'file'
        },
        PictureAlignment: {
          category: 'ID_CATEGORY_PICTURE',
          type: 'array',
          values: [
            '0 - fmPictureAlignmentTopLeft',
            '1 - fmPictureAlignmentTopRight',
            '2 - fmPictureAlignmentCenter',
            '3 - fmPictureAlignmentBottomLeft',
            '4 - fmPictureAlignmentBottomRight'
          ]
        },
        PictureSizeMode: {
          category: 'ID_CATEGORY_PICTURE',
          type: 'array',
          values: [
            '0 - fmPictureSizeModeClip',
            '1 - fmPictureSizeModeStretch',
            '3 - fmPictureSizeModeZoom'
          ]
        },
        PictureTiling: {
          category: 'ID_CATEGORY_PICTURE',
          type: 'Boolean'
        },
        ScrollBars: {
          category: 'ID_CATEGORY_SCROLLING',
          type: 'array',
          values: [
            '0 - fmScrollBarsNone',
            '1 - fmScrollBarsHorizontal',
            '2 - fmScrollBarsVertical',
            '3 - fmScrollBarsBoth'
          ]
        },
        ScrollHeight: {
          category: 'ID_CATEGORY_SCROLLING',
          type: 'number'
        },
        ScrollLeft: {
          category: 'ID_CATEGORY_SCROLLING',
          type: 'number'
        },
        ScrollTop: {
          category: 'ID_CATEGORY_SCROLLING',
          type: 'number'
        },
        ScrollWidth: {
          category: 'ID_CATEGORY_SCROLLING',
          type: 'number'
        },
        Tag: {
          category: 'ID_CATEGORY_MISC',
          type: 'String'
        },
        TransitionEffect: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'array',
          values: [
            '0 - fmTransitionEffectNone',
            '1 - fmTransitionEffectCoverUp',
            '2 - fmTransitionEffectCoverRightUp',
            '3 - fmTransitionEffectCoverRight',
            '4 - fmTransitionEffectCoverRightDown',
            '5 - fmTransitionEffectCoverDown',
            '6 - fmTransitionEffectCoverLeftDown',
            '7 - fmTransitionEffectCoverLeftUp',
            '8 - fmTransitionEffectPushUp',
            '9 - fmTransitionEffectPushRight',
            '10 - fmTransitionEffectPushDown',
            '11 - fmTransitionEffectPushLeft'
          ]
        },
        TransitionPeriod: {
          category: 'ID_CATEGORY_BEHAVIOR',
          type: 'number'
        },
        Visible: {
          category: 'ID_CATEGORY_APPEARANCE',
          type: 'Boolean'
        },
        Zoom: {
          category: 'ID_CATEGORY_MISC',
          type: 'number'
        }
      }
    }
  }
}
