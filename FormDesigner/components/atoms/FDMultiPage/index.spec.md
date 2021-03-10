# FDMultiPage Spec

<h3><b>Description:</b></h3>
<h4>Multiple controls are placed inside the MultiPage control to create an independent space.
In the case of an option button, the group is set through what is in the MultiPage control.
	<ul>
    <li>You can also use a MultiPage to group controls with closely related contents.For example, in an application that processes customer orders, you might use a MultiPage to group the name, address, and account number of customers.</li>
    <li>You can also use a MultiPage to create a group of ToggleButton controls</li>
    </ul>
</h4>

<span>1: Unimplemented properties.</span>

<span>2: Properties which will be implemented in main app.</span>

<span>3: Properties which are not exactly working as same as excel.</span>

<span>4: Properties need clarification.</span>

<span>5: Extra properties added.</span>

<span style='color:red'>Red numbers in parentheses indicate status of properties</span>

<h3><b>Control Properties:</b></h3>

<h4>BackColor</h4>
<span>Control's background color - Color table appears when the button is clicked sets the selected color to MultiPage</span>

<h4>ControlTipText</h4>
<span>Control tooltip text, text that appears when the mouse is hovered over the control</span>

<h4>Enabled</h4>
<span>Indicates activation/deactivation of MultiPage</span>

<h4>Font</h4>
<span>1. Supports Fonts (Arial, Algerian, Banschrift)
2. Supports Font styles (Bold, Itallic,...)
3. Supports Font size <span style='color:red'>(3)</span>
4. Supports Font effects (Underline, StrikeThrough)</span>

<h4>ForeColor</h4>
<span>Control's Fore color - Color table appears when the button is clicked sets the selected color to control's text</span>

<h4>Height </h4>
<span>Set height of the control </span>

<h4>HelpContextID <span style='color:red'>(3)</span></h4>
<span> Opens the file designated as HelpFile and shows the item set as HelpContextID</span>

<h4>Left</h4>
<span>movement in X coordinate</span>

<h4>MultiRow</h4>
<span>If True, Enables the tabs to have multiple lines else, All the tabs have to occupy in a single line</span>

<h4>Style</h4>
<span>Determines the style of the tabs whether it must look like a tab or like a button</span>

<h4>TabFixedHeight</h4>
<span>Specifies the Height of the tabs alone and will be same for all the tabs in the control</span>

<h4>TabFixedWidth</h4>
<span>Specifies the Width of the tabs alone and will be same for all the tabs in the control</span>

<h4>TabIndex <span style="color:red;">(2)</span></h4>
<span>Tab order of the control, focus order of the control when changing focus with the tab key</span>

<h4>TabOrientation </h4>
<span>Specifies the appearance of the tab,The tabs appear at the top, left, bottom or right of the control based on its values</span>

<h4>TabStop <span style="color:red;">(2)</span></h4>
<span>Decide whether to bring focus to the control with the tab key </span>

<h4>Tag </h4>
<span>User-defined value, user-defined value stored in the control and used in code </span>
 
<h4>Top</h4>
<span>Move's away from the top of the UserForm (Y coordinate)</span>

<h4>Visible</h4>
<span>Whether it is visible or invisible when running UserForm</span>

<h4>Width </h4>
<span>The width of the control</span>