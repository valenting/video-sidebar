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
			if(sidebar.location.href == "chrome://video-sidebar/content/ff-sidebar.xul")
			{
				if(vlc == null)
				{
					vlc = sidebar.content.document.getElementById("vlc");
				}
				var volumeSelecter = null;
				volumeSelecter = sidebar.content.document.getElementById("volumeSelect");		
				
				
				if (volumeSelecter){
					
					volumeSelecter.value = val;
					volumeSelecter.focus();
					volumeSelecter.blur();
				}
				
				
				volumeSelecter.focus();
			}
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