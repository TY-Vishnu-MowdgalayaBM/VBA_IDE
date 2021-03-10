# FDFrame Spec

<h3><b>Description:</b></h3>
<h4>Multiple controls are placed inside the Frame control to create an independent space.
In the case of an option button, the group is set through what is in the frame control.
	<ul>
    <li>You can also use a Frame to group controls with closely related contents.For example, in an application that processes customer orders, you might use a Frame to group the name, address, and account number of customers.</li>
    <li>You can also use a Frame to create a group of ToggleButton controls</li>
    </ul>
</h4>

<span>1: Unimplemented properties.</span>

<span>2: Properties which will be implemented in main app.</span>

<span>3: Properties which are not exactly working as same as excel.</span>

<span>4: Properties need clarification.</span>

<span>5: Extra properties added.</span>

<span style='color:red'>Red numbers in parentheses indicate status of properties</span>

<h3><b>Control Properties:</b></h3>

<h4>BackColor </h4>
<span>Control's background color - Color table appears when the button is clicked sets the selected color to Frame</span>

<h4>BorderColor</h4>
<span>Control's Border color - Color table appears when the button is clicked sets the selected color to Frame border</span>

<h4>BorderStyle </h4>
<span>When set to '0 - fmBordersStyleNone' , the Border style changes to none</span>

<h4>Caption </h4>
<span>Text information that appears in the control</span>

<h4>ControlTipText</h4>
<span>Control tooltip text, text that appears when the mouse is hovered over the control</span>

<h4>Cycle <span style='color:red'>(1)</span></h4>
<span>Whether focus cycles within the frame with tabs</span>

<h4>Enabled</h4>
<span>Indicates activation/deactivation of Frame</span>

<h4>Font</h4>
<span>1. Supports Fonts (Arial, Algerian, Banschrift)
2. Supports Font styles (Bold, Itallic,...)
3. Supports Font size <span style='color:red'>(3)</span>
4. Supports Font effects (Underline, StrikeThrough)</span>

<h4>ForeColor</h4>
<span>Control's Fore color - Color table appears when the button is clicked sets the selected color to control's text</span>

<h4>Height</h4>
<span>Set height of the control </span>

<h4>HelpContextID <span style='color:red'>(4)</span></h4>
<span> Opens the file designated as HelpFile and shows the item set as HelpContextID</span>

<h4>KeepScrollBarsVisible</h4>
<span>Whether to make the scroll bar always visible</span>

<h4>Left</h4>
<span>movement in X coordinate</span>

<h4>MouseIcon</h4>
<span>Set *.ico files, etc. and change the mouse cursor to the corresponding icon when the mouse is hovered over the control</span>

<h4>MousePointer</h4>
<span>Changes the shape of the mouse cursor when the mouse is over the control </span>

<h4>Picture</h4>
<span>Insert an image into the frame control</span>

<h4>PictureAlignment</h4>
<span>Set the position of the image inserted in the frame control</span>

<h4>PictureSizeMode</h4>
<span>Set to increase the size of an image inserted in the frame control</span>

<h4>PictureTiling</h4>
<span>If set to True, Show images in checkerboard format</span>

<h4>ScrollBars</h4>
<span>Whether to show a scrollBars</span>

<h4>ScrollHeight <span style='color:red'>(1)</span></h4>
<span>Total scrollable height of the scroll bar</span>

<h4>ScrollLeft <span style='color:red'>(1)</span></h4>
<span>The horizontal position of the scroll bar (x-coordinate)</span>

<h4>ScrollTop <span style='color:red'>(1)</span></h4>
<span>If set to True, Show images in checkerboard format</span>

<h4>ScrollWidth <span style='color:red'>(1)</span></h4>
<span>The total scrollable width of the scroll bar</span>

<h4>SpecilalEffect</h4>
<span>Control showing effect on frame control</span>

<h4>Tag </h4>
<span>User-defined value, user-defined value stored in the control and used in code </span>

<h4>Top</h4>
<span>Move's away from the top of the UserForm (Y coordinate)</span>

<h4>TabIndex <span style='color:red'>(2)</span></h4>
<span>Tab order of the control, focus order of the control when changing focus with the tab key</span>

<h4>TabStop <span style='color:red'>(2)</span></h4>
<span>Decide whether to bring focus to the control with the tab key </span>

<h4>Visible</h4>
<span>Whether it is visible or invisible when running UserForm</span>

<h4>Width </h4>
<span>The width of the control</span>

<h4>Zoom <span style='color:red'>(3)</span> </h4>
<span>Expand or reduce the content in Frame according to the set value ratio</span>
