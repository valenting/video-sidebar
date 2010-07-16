	
       var mainWindow = null;
	   

	   
function startup() {
  mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                     .getInterface(Components.interfaces.nsIWebNavigation)
                     .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
                     .rootTreeItem
                     .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                     .getInterface(Components.interfaces.nsIDOMWindow);

  // Sidebar is loaded and mainwindow is ready 
  var vol = document.getElementById("volumeSelect");
  vol.value = "100";
  
  //modifyvolume(100);
}

window.addEventListener("load", startup, false);

	   var vlc = document.getElementById("vlc");
	   
	   var items_list=new Array();
	   var items_tags=new Array();
	   var items_count=0;
	   
       function mute(){
          vlc.audio.toggleMute();
       }
	   
	   function modifyvolume(value)
	   {
			
			vlc.audio.volume = parseInt(value);
			
			var statusbar = null;
			statusbar = mainWindow.document.getElementById("status-bar");
			
			var volumeselecter = null;
			volumeselecter = statusbar.ownerDocument.getElementById("volumeSelecter");
			
			volumeselecter.value = -parseInt(value);
		
	   }
	   
	   function modifyvolume2(){
			modifyvolume(document.getElementById("vol").value);
		}
       function play(){
	   
          vlc.playlist.play();
		  
          intval = setInterval(uptime, 250);
		  
		  var hidden = document.getElementById("length");
		  
		  hidden.value = 0;
		  
       }
	   function fullscreen(){
          vlc.video.toggleFullscreen();
       }
       function stop(){
          vlc.playlist.stop();
		  clearInterval(intval); // Stop nu merge fara play inainte
          
       }
       function pause(){   
          vlc.playlist.togglePause();
       }
       
	   
       function seek(value){
		  var vlc = document.getElementById("vlc");
          //alert(value);
		  
          vlc.input.time = value*1000;
		  
          //return true;
       }
	   
       function backof(value){
          var vlc = document.getElementById("vlc");
          vlc.input.time = vlc.input.time - parseInt(value)*1000;
          //alert(vlc.input.state);
          //return true;
       }
	   
	   function next()
       {
                vlc.playlist.next();
       }
	   
	   function previous()
	   {
			vlc.playlist.prev();
	   }
	   
	   function getplaylist()
       {
				var playlist=document.getElementById("playlist");
				playlist.innerHTML = vlc.playlist.items.count+"<br/>";
				var i=0;
				for (i=0;i<items_count;i++) {
					playlist.innerHTML+=items_list[i]+"<br/>";
				}
       }
	   
       /*function createplaylist()
       {
                var id1 = vlc.playlist.add("file:///home/stefan/Desktop/test/test.avi");
                var id2 = vlc.playlist.add("file:///home/stefan/Desktop/test/test2.avi");
                vlc.playlist.playItem(id1);
       }*/
	   
	   function addToPlaylist(link) {
			var id=vlc.playlist.add('file:///'+link);
			//vlc.playlist.playItem(id);
			items_list[items_count] = id;
			items_tags[items_count] = link;
			items_count++;
			
			//playMov(link);
	   }
	   
	   function playMov(item) {
			var i;
			//alert(items_count);
			for (i=0;i<items_count;i++) {
				//alert(items_tags[i]);
				//alert(item);
				if (items_tags[i]==item) {
					vlc.playlist.playItem(items_list[i]);
					 intval = setInterval(uptime, 250);
					var hidden = document.getElementById("length");
					hidden.value = 0;
					break;
				}
			}
	   }


       function uptime()
	   {
		  var x = parseInt(vlc.input.time);
		  var slider = null;
		  slider = document.getElementById("your_display_id");
		  var pos =  parseInt((x * 100) / parseInt(vlc.input.length));
		  
		  var p = parseInt(slider.style.left);
		  
		  if (p != pos){
		    carpeLeft("your_slider_id", pos);
			var statusbar = null;
		    statusbar = mainWindow.document.getElementById("status-bar");
			
		    var statusbarseek = null;
		    statusbarseek = statusbar.ownerDocument.getElementById("statusBarSeek");
			
		    statusbarseek.value = pos;
		  }
		  
		  slider.value = pos;
		  
		  document.getElementById("nowt").innerHTML = vlc.input.time/1000;
		  
		  var hidden = document.getElementById("length");
		  if (hidden.value == 0)
			hidden.value = parseInt(vlc.input.length/1000);
		  //alert(hidden.value);
		  
		  
       }
	  
       function else_r(){
          oi = document.getElementById("txtout");
          oi.value = '';
          oi.value += vlc.versionInfo() +"\n";
          oi.value += "VLC position " + vlc.input.position +"\n";
          oi.value += "VLC length " + vlc.input.length +"\n";
          oi.value += "VLC rate " + vlc.input.rate +"\n";
          oi.value += "VLC is Playing " + vlc.playlist.isPlaying +"\n";
       }
	   
	   function minimize() {
           var mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
 .getInterface(Components.interfaces.nsIWebNavigation)
 .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
 .rootTreeItem
 .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
 .getInterface(Components.interfaces.nsIDOMWindow);
 mainWindow.document.getElementById("sidebar-box").width=5;
		document.getElementById("minimize").style.visibility = "hidden";
		document.getElementById("maximize").style.visibility = "visible";
		//document.getElementById("sidebar-box").style.opacity = "0.1";
       }
       
       function maximize() {
           var mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
 .getInterface(Components.interfaces.nsIWebNavigation)
 .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
 .rootTreeItem
 .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
 .getInterface(Components.interfaces.nsIDOMWindow);
 mainWindow.document.getElementById("sidebar-box").width=320;
		document.getElementById("maximize").style.visibility = "hidden";
		document.getElementById("minimize").style.visibility = "visible";
       }
	   
//---------------------------------+
//  CARPE  S l i d e r      1.5.1  |
//  2008 - 07 - 09                 |
//  By Tom Hermansson Snickars     |
//  Copyright CARPE Design         |
//  http://carpe.ambiprospect.com/ |
//---------------------------------+

// Global vars. You don't need to make changes here to change your sliders.
// Changing the attributes in your (X)HTML file is enough.
var carpemouseover                = false;
var carpeDefaultSliderLength      = 100;
var carpeSliderDefaultOrientation = 'horizontal';
var carpeSliderClassName          = 'carpe_slider';
var carpeSliderDisplayClassName   = 'carpe_slider_display';
var carpesliders                  = [];
var carpedisplays                 = [];
var carpeslider                   = {};
var carpedisplay                  = {};

// carpeAddLoadEvent
function carpeAddLoadEvent(func)
{
		var oldonload = window.onload;
		if (typeof window.onload != 'function') {
			window.onload = func;
		}
		else {
			window.onload = function() {
				oldonload();
				func();
			};
		}
}
// carpeGetElementsByClass: Cross-browser function that returns
// an array with all elements that have a class attribute that
// contains className
function carpeGetElementsByClass(className)
{
	var classElements = new Array();
	var els = document.getElementsByTagName("*");
	var elsLen = els.length;
	var pattern = new RegExp("\\b" + className + "\\b");
	for (var i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}
// carpeLeft: Cross-browser version of "element.style.left"
// Returns or sets the horizontal position of an element.
function carpeLeft(elmnt, pos)
{
	if (!(elmnt = document.getElementById(elmnt))) {
		alert("error");
		return 0;
	}
	if (elmnt.style && (typeof(elmnt.style.left) == 'string')) {
		if (typeof(pos) == 'number') elmnt.style.left = pos + 'px';
		else {
			pos = parseInt(elmnt.style.left);
			if (isNaN(pos)) pos = 0;
		}
	}
	else if (elmnt.style && elmnt.style.pixelLeft) {
		if (typeof(pos) == 'number') elmnt.style.pixelLeft = pos;
		else pos = elmnt.style.pixelLeft;
	}
	
	return pos;
}
// carpeTop: Cross-browser version of "element.style.top"
// Returns or sets the vertical position of an element.
function carpeTop(elmnt, pos)
{
	if (!(elmnt = document.getElementById(elmnt))) return 0;
	if (elmnt.style && (typeof(elmnt.style.top) == 'string')) {
		if (typeof(pos) == 'number') elmnt.style.top = pos + 'px';
		else {
			pos = parseInt(elmnt.style.top);
			if (isNaN(pos)) pos = 0;
		}
	}
	else if (elmnt.style && elmnt.style.pixelTop) {
		if (typeof(pos) == 'number') elmnt.style.pixelTop = pos;
		else pos = elmnt.style.pixelTop;
	}
	return pos;
}
// moveSlider: Handles slider and display while dragging
function moveSlider(evnt)
{
	var evnt = (!evnt) ? window.event : evnt; // The mousemove event
	if (carpemouseover) { // Only if slider is dragged
		carpeslider.x = carpeslider.startOffsetX + evnt.screenX; // Horizontal mouse position relative to allowed slider positions
		carpeslider.y = carpeslider.startOffsetY + evnt.screenY; // Horizontal mouse position relative to allowed slider positions
		if (carpeslider.x > carpeslider.xMax) carpeslider.x = carpeslider.xMax; // Limit horizontal movement
		if (carpeslider.x < 0) carpeslider.x = 0; // Limit horizontal movement
		if (carpeslider.y > carpeslider.yMax) carpeslider.y = carpeslider.yMax; // Limit vertical movement
		if (carpeslider.y < 0) carpeslider.y = 0; // Limit vertical movement
		carpeLeft(carpeslider.id, carpeslider.x);  // move slider to new horizontal position
		carpeTop(carpeslider.id, carpeslider.y); // move slider to new vertical position
		var sliderVal = carpeslider.x + carpeslider.y; // pixel value of slider regardless of orientation
		var sliderPos = (carpeslider.distance / carpedisplay.valuecount) * 
			Math.round(carpedisplay.valuecount * sliderVal / carpeslider.distance);
		var v = Math.round((sliderPos * carpeslider.scale + carpeslider.from) * // calculate display value
			Math.pow(10, carpedisplay.decimals)) / Math.pow(10, carpedisplay.decimals);
		carpedisplay.value = v; // put the new value in the slider display element
		if(carpeslider==carpesliders[0]){
			vlc.input.time = v * vlc.input.length / 100;
			var statusbar = null;
		    statusbar = mainWindow.document.getElementById("status-bar");
			
		    var statusbarseek = null;
		    statusbarseek = statusbar.ownerDocument.getElementById("statusBarSeek");
			
		    statusbarseek.value = v;
		}
		else
			modifyvolume(v);
		return false;
	}
	return
}
// slide: Handles the start of a slider move.
function slide(evnt)
{
	if (!evnt) evnt = window.event; // Get the mouse event causing the slider activation.
	carpeslider = (evnt.target) ? evnt.target : evnt.srcElement; // Get the activated slider element.
	var dist = parseInt(carpeslider.getAttribute('distance')); // The allowed slider movement in pixels.
	carpeslider.distance = dist ? dist : carpeDefaultSliderLength; // Deafault distance from global var.
	var ori = carpeslider.getAttribute('orientation'); // Slider orientation: 'horizontal' or 'vertical'.
	var orientation = ((ori == 'horizontal') || (ori == 'vertical')) ? ori : carpeSliderDefaultOrientation;
		// Default orientation from global variable.
	var displayId = carpeslider.getAttribute('display'); // ID of associated display element.
	carpedisplay = document.getElementById(displayId); // Get the associated display element.
	carpedisplay.sliderId = carpeslider.id; // Associate the display with the correct slider.
	var dec = parseInt(carpedisplay.getAttribute('decimals')); // Number of decimals to be displayed.
	carpedisplay.decimals = dec ? dec : 0; // Default number of decimals: 0.
	var val = parseInt(carpedisplay.getAttribute('valuecount'))  // Allowed number of values in the interval.
	carpedisplay.valuecount = val ? val : carpeslider.distance + 1 // Default number of values: the sliding distance.
	var from = parseFloat(carpedisplay.getAttribute('from')) // Min/start value for the display.
	from = from ? from : 0 // Default min/start value: 0.
	var to = parseFloat(carpedisplay.getAttribute('to')) // Max value for the display.
	to = to ? to : carpeslider.distance // Default number of values: the sliding distance.
	carpeslider.scale = (to - from) / carpeslider.distance // Slider-display scale [value-change per pixel of movement].
	if (orientation == 'vertical') { // Set limits and scale for vertical sliders.
		carpeslider.from = to // Invert for vertical sliders. "Higher is more."
		carpeslider.xMax = 0
		carpeslider.yMax = carpeslider.distance
		carpeslider.scale = -carpeslider.scale // Invert scale for vertical sliders. "Higher is more."
	}
	else { // Set limits for horizontal sliders.
		carpeslider.from = from;
		carpeslider.xMax = carpeslider.distance;
		carpeslider.yMax = 0;
	}
	carpeslider.startOffsetX = carpeLeft(carpeslider.id) - evnt.screenX; // Slider-mouse horizontal offset at start of slide.
	carpeslider.startOffsetY = carpeTop(carpeslider.id) - evnt.screenY; // Slider-mouse vertical offset at start of slide.
	carpemouseover = true;
	document.onmousemove = moveSlider; // Start the action if the mouse is dragged.
	document.onmouseup = sliderMouseUp; // Stop sliding.
	return false;
}
// sliderMouseUp: Handles the mouseup event after moving a slider.
// Snaps the slider position to allowed/displayed value. 
function sliderMouseUp()
{
	if (carpemouseover) {
		var v = (carpedisplay.value) ? carpedisplay.value : 0 // Find last display value.
		var pos = (v - carpeslider.from)/(carpeslider.scale) // Calculate slider position (regardless of orientation).
		if (carpeslider.yMax == 0) {
			pos = (pos > carpeslider.xMax) ? carpeslider.xMax : pos;
			pos = (pos < 0) ? 0 : pos;
			carpeLeft(carpeslider.id, pos); // Snap horizontal slider to corresponding display position.
		}
		if (carpeslider.xMax == 0) {
			pos = (pos > carpeslider.yMax) ? carpeslider.yMax : pos;
			pos = (pos < 0) ? 0 : pos;
			carpeTop(carpeslider.id, pos); // Snap vertical slider to corresponding display position.
		}
		if (document.removeEventListener) { // Remove event listeners from 'document' (W3C).
			document.removeEventListener('mousemove', moveSlider, false);
			document.removeEventListener('mouseup', sliderMouseUp, false);
		}
		else if (document.detachEvent) { // Remove event listeners from 'document' (IE).
			document.detachEvent('onmousemove', moveSlider);
			document.detachEvent('onmouseup', sliderMouseUp);
			document.releaseCapture();
		}
	}
	carpemouseover = false; // Stop the sliding.
}
function focusDisplay(evnt)
{
	if (!evnt) evnt = window.event; // Get the mouse event causing the display activation.
	var carpedisplay = (evnt.target) ? evnt.target : evnt.srcElement; // Get the activated display element.
	var lock = carpedisplay.getAttribute('typelock'); // Is the user allowed to type into the display?
	if (lock == 'on') {
		carpedisplay.blur();
	}
	return;
}
function carpeInit() // Set up the sliders and the displays.
{
	carpesliders = carpeGetElementsByClass(carpeSliderClassName) // Find the horizontal sliders.
	for (var i = 0; i < carpesliders.length; i++) {
		carpesliders[i].onmousedown = slide; // Attach event listener.
	}
	carpedisplays = carpeGetElementsByClass(carpeSliderDisplayClassName) // Find the displays.
	for (var i = 0; i < carpedisplays.length; i++) {
		carpedisplays[i].value = carpedisplays[i].defaultValue; // Resets display on page reload.
		carpedisplays[i].onfocus = focusDisplay; // Attach event listener.
	}
}
carpeAddLoadEvent(carpeInit);
