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
	   }
       function play(){
          vlc.playlist.play();
          intval = setInterval(uptime, 250);
       }
	   function fullscreen(){
          vlc.video.toggleFullscreen();
       }
       function stop(){
          //clearInterval(intval); // Stop nu merge fara play inainte
          vlc.playlist.stop();

       }
       function pause(){   
          vlc.playlist.togglePause();
       }
       function c_time(){
          return eval(vlc.input.time / 1000);
       }
       function seek(value){
       var vlc = document.getElementById("vlc");
          //alert(value);
          vlc.input.time = eval(value*1000)
          //return true;
       }
	   
       function backof(value){
       var vlc = document.getElementById("vlc");
          vlc.input.time = vlc.input.time - eval(value*1000);
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
					break;
				}
			}
	   }


       function uptime(){
          document.getElementById("nowt").innerHTML = eval(vlc.input.time/1000);
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
 mainWindow.document.getElementById("sidebar-box").width=10;

       }
       
       function maximize() {
           var mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
 .getInterface(Components.interfaces.nsIWebNavigation)
 .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
 .rootTreeItem
 .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
 .getInterface(Components.interfaces.nsIDOMWindow);
 mainWindow.document.getElementById("sidebar-box").width=320;

       }
