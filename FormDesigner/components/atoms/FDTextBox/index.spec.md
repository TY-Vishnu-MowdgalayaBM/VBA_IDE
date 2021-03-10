# FDTextBox Spec

<h3><b>Description:</b></h3>
<h4>A TextBox is the control most commonly used to display information entered by a user </h4>

<span>1: Unimplemented properties.</span>

<span>2: Properties which will be implemented in main app.</span>

<span>3: Properties which are not exactly working as same as excel.</span>

<span>4: Properties need clarification.</span>

<span>5: Extra properties added.</span>

<span style='color:red'>Red numbers in parentheses indicate status of properties</span>

<h3><b>Control Properties:</b></h3>

<h4>AutoSize </h4>
<span>When set to True, the size of the control is changed to fit the contents</span>

<h4>AutoTab <span style="color:red;">(2)</span></h4>
<span>When MaxLength property is present, hitting MaxLength will shift focus to the next control</span>

<h4>AutoWordSelect <span style="color:red;">(1)</span></h4>
<span>Specifies the default unit to use to expand a selection of words and letters.</span>

<h4>BackColor</h4>
<span>Control's background color - Color table appears when the button is clicked sets the selected color to label</span>

<h4>BackStyle</h4>
<span>The BackStyle property determines whether a control is transparent or Opaque</span>

<h4>BorderColor</h4>
<span>Control's Border color - Color table appears when the button is clicked sets the selected color to label border</span>

<h4>BorderStyle</h4>
<span>When set to '0 - fmBordersStyleNone' , the Border style changes to none</span>

<h4>ControlSource</h4>
<span>Data location to connect</span>

<h4>ControlTipText</h4>
<span>Control tooltip text, text that appears when the mouse is hovered over the control</span>

<h4>DragBehavior <span style="color:red;">(1)</span></h4>
<span>Whether to drag & drop text</span>

<h4>Enabled</h4>
<span>Indicates enable/disable of control</span>

<h4>EnterFieldBehavior <span style="color:red;">(1)</span></h4>
<span>Property about whether to select the entire text or apply the previous selection when focus comes with EnterKey or tab</span>

<h4>EnterKeyBehavior </h4>
<span>Property specifies whether to allow the behavior of EnterKey</span>

<h4>Font</h4>
<span>1. Supports Fonts (Arial, Algerian, Banschrift)
2. Supports Font styles (Bold, Itallic,...)
3. Supports Font size
4. Supports Font effects (Underline, StrikeThrough)</span>

<h4>ForeColor</h4>
<span>Control's Fore color - Color table appears when the button is clicked sets the selected color to label text</span>

<h4>Height</h4>
<span>Set height of label control </span>

<h4>HelpContextID <span style="color:red;">(3)</span></h4>
<span> Opens the file designated as HelpFile and shows the item set as HelpContextID</span>

<h4>HideSelection</h4>
<span>Whether to keep the selection even when focus goes out</span>

<h4>IMEMode <span style="color:red;">(4)</span></h4>
<span>IMEMode (input method editor) change</span>

<h4>IntegralHeight <span style="color:red;">(4)</span></h4>
<span>Indicates whether the ListBox or TextBox displays
the entire line of text in a list or partial line.</span>

<h4>Left</h4>
<span>The distance from the far left of the UserForm </span>

<h4>Locked</h4>
<span>Not selectable (not clickable) </span>

<h4>MaxLength</h4>
<span>Maximum number of texts that can be entered</span>

<h4>MouseIcon</h4>
<span>Set *.ico files, etc. and change the mouse cursor to the corresponding icon when the mouse is hovered over the control</span>

<h4>MousePointer</h4>
<span>Changes the shape of the mouse cursor when the mouse is over the control </span>

<h4>MultiLine</h4>
<span>Whether to show multiple lines</span>

<h4>PasswordChar</h4>
<span>
 When you type, it changes to the corresponding character and shows it (like entering a password)
</span>

<h4>ScrollBars</h4>
<span>Scroll bar information, setting for vertical/horizontal scroll bar</span>

<h4>SelectionMargin <span style="color:red;">(1)</span></h4>
<span>Whether or not to give a margin to the left of the text,
Clicking on the margin selects the entire text</span>

<h4>SpecialEffect</h4>
<span>Control showing effect on label control</span>

<h4>TabIndex <span style="color:red;">(2)</span></h4>
<span>Tab order of the control, focus order of the control when changing focus with the tab key</span>

<h4>TabStop <span style="color:red;">(2)</span></h4>
<span>Decide whether to bring focus to the control with the tab key </span>

<h4>Tag</h4>
<span>User-defined value, user-defined value stored in the control and used in code </span>

<h4>TextAlign</h4>
<span>Controls text alignment, left, center, right alignment</span>

<h4>Top</h4>
<span>Move's away from the top of the UserForm (Y coordinate)</span>

<h4>Value</h4>
<span>Entered text</span>

<h4>Visible</h4>
<span>Whether it is visible or invisible when running UserForm</span>

<h4>Width</h4>
<span>The width of the control</span>

<h4>WordWrap</h4>
<span>Whether to wrap text in the label control</span>

<h4>ControlSourceValue <span style="color:red;">(5)</span></h4>
<span>Determines the value of the cell specified in the ControlSource</span>

<h4>CursorStartPosition</h4>
<span>Keep tracks of key press and selectionStart</span>

<h4>CursorEndPosition</h4>
<span>Keep tracks of key press and selectionEnd</span>
