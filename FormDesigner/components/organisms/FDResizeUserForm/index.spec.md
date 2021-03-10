# FDUserform Spec

<h3><b>Description:</b></h3>
<h4>Allows you to create the windows or dialog boxes in your project. You draw and view controls on a form
	<ul>
    <li>Use the buttons in the Toolbox to draw controls on the form</li>
    <li>Each form window has a Maximize, Minimize, and Close button</li>
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
<span>Control's background color - Color table appears when the button is clicked sets the selected color to userform</span>

<h4>BorderColor</h4>
<span>Control's Border color - Color table appears when the button is clicked sets the selected color to userform border</span>

<h4>BorderStyle</h4>
<span>When set to '0 - fmBordersStyleNone' , the Border style changes to none</span>

<h4>Caption</h4>
<span>Text information that appears in the control</span>

<h4>Cycle <span style="color:red;">(4)</span></h4>
<span>Whether focus cycles within the frame with tabs</span>

<h4>DrawBuffer <span style="color:red;">(3)</span></h4>
<span>Number of pixels in the buffer where the form is drawn</span>

<h4>Enabled <span style="color:red;">(3)</span></h4>
<span>Indicates activation/deactivation of UserForm</span>

<h4>Font<span style="color:red;">(3)</span></h4>
<span>1. Supports Fonts (Arial, Algerian, Banschrift) <span style="color:red;">(3)</span>
2. Supports Font styles (Bold, Itallic,...)
3. Supports Font size
4. Supports Font effects (Underline, StrikeThrough) <span style="color:red;">(3)</span></span>

<h4>ForeColor</h4>
<span>Control's Fore color - Color table appears when the button is clicked sets the selected color to control's text</span>

<h4>Height</h4>
<span>Set height of the control </span>

<h4>HelpContextID<span style="color:red;">(3)</span></h4>
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
<span>Insert an image into the userform control</span>

<h4>PictureAlignment</h4>
<span>Set the position of the image inserted in the userform control</span>

<h4>PictureSizeMode</h4>
<span>Set to increase the size of an image inserted in the userform control</span>

<h4>PictureTiling</h4>
<span>If set to True, Show images in checkerboard format</span>

<h4>RightToLeft</h4>
<span>If set to True, the corresponding Form will be changed to RTL format.</span>


<h4>ScrollBars</h4>
<span>Whether to show a scrollBars</span>

<h4>ScrollHeight<span style="color:red;">(1)</span></h4>
<span>Total scrollable height of the scroll bar</span>

<h4>ScrollLeft<span style="color:red;">(3)</span></h4>
<span>The horizontal position of the scroll bar (x-coordinate)</span>

<h4>ScrollTop<span style="color:red;">(3)</span></h4>
<span>If set to True, Show images in checkerboard format</span>

<h4>ScrollWidth<span style="color:red;">(1)</span></h4>
<span>The total scrollable width of the scroll bar</span>

<h4>ShowModal<span style="color:red;">(3)</span></h4>
<span>Set whether to display the user form in Modal or Modaless format</span>

<h4>SpecilalEffect</h4>
<span>Control showing effect on label control</span>

<h4>StartUpPosition<span style="color:red;">(3)</span></h4>
<span>specifying the position of a UserForm when it first appears. </span>

<h4>Tag </h4>
<span>User-defined value, user-defined value stored in the control and used in code </span>

<h4>Top</h4>
<span>Move's away from the top of the UserForm (Y coordinate)</span>

<h4>WhatsThisButton <span style="color:red;">(3)</span></h4>
<span>At the top? Make a button, press the? Button to enter the cursor state, and press a control in this state to open the help file associated with the control.</span>

<h4>WhatsThisHelp <span style="color:red;">(3)</span></h4>
<span>Press F1 on the focused control to open the help file associated with the control</span>

<h4>Width</h4>
<span>The width of the control</span>

<h4>Zoom <span style="color:red;">(3)</span></h4>
<span>Expand or reduce the content in UserForm according to the set value ratio</span>

-<span style="color:red;">(*): This function is not implemented in this control.</span>