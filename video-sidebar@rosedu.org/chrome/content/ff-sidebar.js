var mainWindow = null;

var vlc = null;

function startup() {
  mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                     .getInterface(Components.interfaces.nsIWebNavigation)
                     .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
                     .rootTreeItem
                     .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                     .getInterface(Components.interfaces.nsIDOMWindow);

  // Sidebar is loaded and mainwindow is ready
  
}

function shutdown() {
  // Sidebar is unloading
}


window.addEventListener("load", startup, false);
window.addEventListener("unload", shutdown, false);


	   
	   function alert_me(){
			alert("Play!");
		}
	   
       function mute(){
          vlc.audio.toggleMute();
       }
	   
	   
       function play(){
		  var sidebar = mainWindow.document.getElementById("sidebar").contentWindow;		
		  if (sidebar.location.href == "chrome://video-sidebar/content/ff-sidebar.xul") {
			//alert("this is vlc sidebar");
			
			
			if (vlc == null){
				vlc = sidebar.content.document.getElementById("vlc");
			}
			playbutton = sidebar.content.document.getElementById("play");
			playbutton.click();
			
		  }
       }
	   function selectVolume(val)
	   {
			var sidebar = mainWindow.document.getElementById("sidebar").contentWindow;
			var newval = Math.abs(val);
			
			if(sidebar.location.href == "chrome://video-sidebar/content/ff-sidebar.xul")
			{
				if(vlc == null)
				{
					vlc = sidebar.content.document.getElementById("vlc");
				}
				var volumeValue = null;
				volumeValue = sidebar.content.document.getElementById("vol");	
				
				var volumeButton = null;
				volumeButton = sidebar.content.document.getElementById("volbutton");	
				
				var volumeDisplay = null;
				volumeDisplay = sidebar.content.document.getElementById("your_display_id2");		
				
				carpeLeft("your_slider_id2",newval/2);
				
				volumeDisplay.value = newval;
				
				volumeValue.value = newval;
				
				volumeButton.click();
				
				/*if (volumeSelecter){
					
					volumeSelecter.value = val;
					volumeSelecter.focus();
					volumeSelecter.blur();
				}				
				volumeSelecter.focus();*/
				
				
			}
	   }
	   
	    function carpeLeft(elmnt, pos)
		{
			var sidebar = mainWindow.document.getElementById("sidebar").contentWindow;
			if (!(elmnt = sidebar.content.document.getElementById(elmnt))) {
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
			return pos+1;
		}
	   
       function stop(){
          var sidebar = mainWindow.document.getElementById("sidebar").contentWindow;		
		  if (sidebar.location.href == "chrome://video-sidebar/content/ff-sidebar.xul") {
			//alert("this is vlc sidebar");
			
			if (vlc == null){
				vlc = sidebar.content.document.getElementById("vlc");
			}
				stopbutton = sidebar.content.document.getElementById("stop");
				stopbutton.click();
			
		  }
       }
       function pause(){   
		  var sidebar = mainWindow.document.getElementById("sidebar").contentWindow;		
		  if (sidebar.location.href == "chrome://video-sidebar/content/ff-sidebar.xul") {
			//alert("this is vlc sidebar");
			
			if (vlc == null){
				vlc = sidebar.content.document.getElementById("vlc");
			}
				pausebutton = sidebar.content.document.getElementById("pause");
				pausebutton.click();
			
		  }
       }
	   
	   function next(){
			var sidebar = mainWindow.document.getElementById("sidebar").contentWindow;		
		  if (sidebar.location.href == "chrome://video-sidebar/content/ff-sidebar.xul") {
			//alert("this is vlc sidebar");
			
			if (vlc == null){
				vlc = sidebar.content.document.getElementById("vlc");
			}
				nextbutton = sidebar.content.document.getElementById("next");
				nextbutton.click();
			
		  }
		}
		
		function previous(){
		  var sidebar = mainWindow.document.getElementById("sidebar").contentWindow;		
		  if (sidebar.location.href == "chrome://video-sidebar/content/ff-sidebar.xul") {
			//alert("this is vlc sidebar");
			
			if (vlc == null){
				vlc = sidebar.content.document.getElementById("vlc");
			}
				prevbutton = sidebar.content.document.getElementById("prev");
				prevbutton.click();
			
		  }
		}
		
		function seek(pos){
			  var sidebar = mainWindow.document.getElementById("sidebar").contentWindow;		
			  if (sidebar.location.href == "chrome://video-sidebar/content/ff-sidebar.xul") {
				//alert("this is vlc sidebar");
				//alert(pos);
				var length = null;
				length = sidebar.content.document.getElementById("length");
				//alert(length.value);
				
				var seekto = null;
				seekto = sidebar.content.document.getElementById("seekbutton");
				
				var seektext = sidebar.content.document.getElementById("seekto");
				
				var x = (parseInt(pos) * parseInt(length.value)) / 100;
				seektext.value = x;
				seekto.click();
				seektext.value = 0;
				
			  }	
		}
		
		