# FDListBox Spec

<h3><b>Description:</b></h3>
<h4>ListBox control allows the user to select from a list of possible choices</br>Use to display a list of items from which the user can choose. The list can be scrolled if it has more items than can be displayed at one time
</h4>

<span>1: Unimplemented properties.</span>

<span>2: Properties which will be implemented in main app.</span>

<span>3: Properties which are not exactly working as same as excel.</span>

<span>4: Properties need clarification.</span>

<span>5: Extra properties added.</span>

<span style='color:red'>Red numbers in parentheses indicate status of properties</span>

<h4>BackColor</h4>
<span>Control's background color - Color table appears when the button is clicked sets the selected color to control</span>

<h4>BorderColor</h4>
<span>Control's Border color - Color table appears when the button is clicked sets the selected color to label border</span>

<h4>BorderStyle</h4>
<span>Assigns the value from the specified column to the control. Columns are numbered from 1 when using this property (default).</span>


<h4>BoundColumn</h4>
<span>When set to '0 - fmBordersStyleNone' , the Border style changes to none</span>

<h4>ColumnCount</h4>
<span>Specifies the number of columns, Setting ColumnCount to 0 displays zero columns,</span>

<h4>ColumnHeads</h4>
<span>Displays a single row of column headings for</span>

<h4>ColumnWidths</h4>
<span>Specifies the width of each column in a multicolumn List box</span>

<h4>ControlSource</h4>
<span>You can use the ControlSource property to specify what data appears in a control.You can display and edit data bound to a field in a table, query, or SQL statement.You can also display the result of an expression. Read/write String.</span>

<h4>ControlTipText</h4>
<span>Control tooltip text, text that appears when the mouse is hovered over the control</span>

<h4>Enabled</h4>
<span>Indicates enable/disable of control</span>

<h4>Font</h4>
<span>1. Supports Fonts (Arial, Algerian, Banschrift)
2. Supports Font styles (Bold, Itallic,...)
3. Supports Font size
4. Supports Font effects (Underline, StrikeThrough)</span>

<h4>ForeColor</h4>
<span>Control's Fore color - Color table appears when the button is clicked sets the selected color to text</span>

<h4>Height</h4>
<span>Set height of ListBox control </span>

<h4>HelpContextID <span style="color:red;">(3)</span></h4>
<span> Opens the file designated as HelpFile and shows the item set as HelpContextID</span>

<h4>IMEMode <span style="color:red;">(4)</span></h4>
<span>IMEMode (input method editor) change</span>

<h4>IntegralHeight <span style="color:red;">(4)</span></h4>
<span>Indicates whether a ListBox or TextBox displays full lines of text in a list or partial lines.</span>

<h4>Left</h4>
<span>The distance from the far left of the UserForm </span>

<h4>ListStyle</h4>
<span>Specifies the visual appearance of the list in a ListBox.</span>

<h4>Locked</h4>
<span>When set to True,The Locked property is active and you cannot edit data in a controls </span>

<h4>MatchEntry</h4>
<span>Returns or sets a value indicating how a ListBox searches its list as the user types.</span>

<h4>MouseIcon</h4>
<span>Set *.ico files, etc. and change the mouse cursor to the corresponding icon when the mouse is hovered over the control</span>

<h4>MousePointer</h4>
<span>Changes the shape of the mouse cursor when the mouse is over the control </span>

<h4>MultiSelect</h4>
<span>You can use the MultiSelect property to specify whether a user can make multiple selections in a list box on a form and how the multiple selections can be made.</span>

<h4>RowSource</h4>
<span>Insert an image into the control</span>

<h4>SpecialEffect</h4>
<span>Control showing effect on Listbox control</span>

<h4>TabIndex <span style="color:red;">(2)</span></h4>
<span>Tab order of the control, focus order of the control when changing focus with the tab key</span>

<h4>TabStop <span style="color:red;">(2)</span></h4>
<span>Decide whether to bring focus to the control with the tab key </span>

<h4>Tag</h4>
<span>User-defined value, user-defined value stored in the control and used in code </span>

<h4>Text</h4>
<span> Changes the selected row in a ListBox</span>

<h4>TextAlign</h4>
<span>Controls text alignment, left, center, right alignment</span>

<h4>TextColumn</h4>
<span>Identifies the column in a ListBox to store in the Text property when the user selects a row.</span>

<h4>Top</h4>
<span>Move's away from the top of the UserForm (Y coordinate)</span>

<h4>TopIndex</h4>
<span>Sets and returns the item that appears in the topmost position in the list.
</span>

<h4>Value</h4>
<span>Specifies the value in the BoundColumn of the currently selected rows.</span>

<h4>Visible</h4>
<span>Whether it is visible or invisible when running UserForm</span>

<h4>Width</h4>
<span>The width of the control</span>

<h4>ControlSourceValue <span style="color:red;">(5)</span></h4>
<span>Determines the value of the cell specified in the ControlSource</span>

<h4>ColumnHeadsValues <span style="color:red;">(5)</span></h4>
<span>Determines the header values of the cells specified in the RowSource</span>

<h4>RowSourceData <span style="color:red;">(5)</span></h4>
<span>Determines the values of the cells specified in the RowSource</span>

<h4>MatchData <span style="color:red;">(5)</span></h4>
<span>Determines the selected values and also stores the selected values.</span>