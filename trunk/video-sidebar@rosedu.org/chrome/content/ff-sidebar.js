var mainWindow = null;

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
		  var sidebar = null;
		  sidebar = mainWindow.document.getElementById("sidebar").contentWindow;		
		  if (sidebar.location.href == "chrome://video-sidebar/content/ff-sidebar.xul") {
			alert("this is vlc sidebar");
			
			var playbutton = mainWindow.document.getElementById("sidebar").contentDocument.getElementById("sidebar_browser").contentDocument.getElementById("play");
			alert( mainWindow.document.getElementById("sidebar").contentDocument.getElementById("sidebar_browser").contentDocument.location.href);
			
			playbutton.click();
			
		  }
       }
	   function selectVolume(val)
	   {
			var sidebar = mainWindow.document.getElementById("sidebar").contentWindow;
			var newval = Math.abs(val);
			
			if(sidebar.location.href == "chrome://video-sidebar/content/ff-sidebar.xul")
			{
				var volumeValue = null;
				volumeValue = mainWindow.document.getElementById("sidebar").contentDocument.getElementById("sidebar_browser").contentDocument.getElementById("vol");	
				
				var volumeButton = null;
				volumeButton = mainWindow.document.getElementById("sidebar").contentDocument.getElementById("sidebar_browser").contentDocument.getElementById("volbutton");		
				
				volumeValue.value = newval;
				
				volumeButton.click();
				
			}
	   }
	   
	    
	   
       function stop(){
          var sidebar = mainWindow.document.getElementById("sidebar").contentWindow;		
		  if (sidebar.location.href == "chrome://video-sidebar/content/ff-sidebar.xul") {
			//alert("this is vlc sidebar");
			
			
				stopbutton = mainWindow.document.getElementById("sidebar").contentDocument.getElementById("sidebar_browser").contentDocument.getElementById("stop");
				stopbutton.click();
			
		  }
       }
       function pause(){   
		  var sidebar = mainWindow.document.getElementById("sidebar").contentWindow;		
		  if (sidebar.location.href == "chrome://video-sidebar/content/ff-sidebar.xul") {
			//alert("this is vlc sidebar");
			
			
				pausebutton = mainWindow.document.getElementById("sidebar").contentDocument.getElementById("sidebar_browser").contentDocument.getElementById("pause");
				pausebutton.click();
			
		  }
       }
	   
	   function next(){
			var sidebar = mainWindow.document.getElementById("sidebar").contentWindow;		
		  if (sidebar.location.href == "chrome://video-sidebar/content/ff-sidebar.xul") {
			//alert("this is vlc sidebar");
			
			
				nextbutton = mainWindow.document.getElementById("sidebar").contentDocument.getElementById("sidebar_browser").contentDocument.getElementById("next");
				nextbutton.click();
			
		  }
		}
		
		function previous(){
		  var sidebar = mainWindow.document.getElementById("sidebar").contentWindow;		
		  if (sidebar.location.href == "chrome://video-sidebar/content/ff-sidebar.xul") {
			//alert("this is vlc sidebar");
			
			
				prevbutton = mainWindow.document.getElementById("sidebar").contentDocument.getElementById("sidebar_browser").contentDocument.getElementById("prev");
				prevbutton.click();
			
		  }
		}
		
		function seek(pos){
			  var sidebar = mainWindow.document.getElementById("sidebar").contentWindow;		
			  if (sidebar.location.href == "chrome://video-sidebar/content/ff-sidebar.xul") {
				//alert("this is vlc sidebar");
				//alert(pos);
				
				var length = null;
				length = mainWindow.document.getElementById("sidebar").contentDocument.getElementById("sidebar_browser").contentDocument.getElementById("length");
				//alert(length.value);
				
				var seekto = null;
				seekto = mainWindow.document.getElementById("sidebar").contentDocument.getElementById("sidebar_browser").contentDocument.getElementById("seekbutton");
				
				var seektext = mainWindow.document.getElementById("sidebar").contentDocument.getElementById("sidebar_browser").contentDocument.getElementById("seekto");
				
				var x = (parseInt(pos) * parseInt(length.value)) / 100;
				seektext.value = x;
				seekto.click();
				seektext.value = 0;
				
			  }	
		}
		
		