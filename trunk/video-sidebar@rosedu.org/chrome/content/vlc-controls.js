	var mainWindow = null;

	function startup() {
	    mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor).getInterface(Components.interfaces.nsIWebNavigation).QueryInterface(Components.interfaces.nsIDocShellTreeItem).rootTreeItem.QueryInterface(Components.interfaces.nsIInterfaceRequestor).getInterface(Components.interfaces.nsIDOMWindow);

	    // Sidebar is loaded and mainwindow is ready 
	    var vol = document.getElementById("volumeSelect");
	    vol.value = "100";

	}

	window.addEventListener("load", startup, false);

	
	var vlc = document.getElementById("vlc");
	var items_list = new Array();
	var items_tags = new Array();
	var items_count = 0;
	
	function mute() {
	    vlc.audio.toggleMute();
	}

	function modifyvolume(value) {

	    vlc.audio.volume = parseInt(value);

	    var statusbar = null;
	    statusbar = mainWindow.document.getElementById("status-bar");

	    var volumeselecter = null;
	    volumeselecter = statusbar.ownerDocument.getElementById("volumeSelecter");

	    volumeselecter.value = -parseInt(value);

	}

	function modifyvolume2() {
	    var vol = document.getElementById("vol").value;
	    $("#volume-slider").slider("value", vol);
	    modifyvolume(vol);
	}

	function play() {

	    vlc.playlist.play();

	    intval = setInterval(uptime, 1000);

	    var hidden = document.getElementById("length");

	    hidden.value = 0;

	}

	function fullscreen() {
	    vlc.video.toggleFullscreen();
	}

	function stop() {
	    vlc.playlist.stop();
	    clearInterval(intval); // Stop nu merge fara play inainte
	}

	function pause() {
	    vlc.playlist.togglePause();
	}


	function seek(value) {
	    var vlc = document.getElementById("vlc");
	    //alert(value);
	    vlc.input.time = value * 1000;

	    //return true;
	}

	function backof(value) {
	    var vlc = document.getElementById("vlc");
	    vlc.input.time = vlc.input.time - parseInt(value) * 1000;
	    //alert(vlc.input.state);
	    //return true;
	}

	function next() {
	    vlc.playlist.next();
	}

	function previous() {
	    vlc.playlist.prev();
	}

	function getplaylist() {
	    var playlist = document.getElementById("playlist");
	    playlist.innerHTML = vlc.playlist.items.count + "<br/>";
	    var i = 0;
	    for (i = 0; i < items_count; i++) {
	        playlist.innerHTML += items_list[i] + "<br/>";
	    }
	}


	function addToPlaylist(link) {
	    var id = vlc.playlist.add('file:///' + link);
	    //vlc.playlist.playItem(id);
	    items_list[items_count] = id;
	    items_tags[items_count] = link;
	    items_count++;

	}

	function playMov(item) {
	    var i;
	    for (i = 0; i < items_count; i++) {
	        if (items_tags[i] == item) {
	            vlc.playlist.playItem(items_list[i]);
	            intval = setInterval(uptime, 1000);
	            var hidden = document.getElementById("length");
	            hidden.value = 0;
	            break;
	        }
	    }
	}

	

	function uptime() {
	    var x = parseInt(vlc.input.time);

	    var pos = parseInt((x * 100) / parseInt(vlc.input.length));

	    $("#seek-slider").slider("value", pos);
	    var statusbar = null;
	    statusbar = mainWindow.document.getElementById("status-bar");

	    var statusbarseek = null;
	    statusbarseek = statusbar.ownerDocument.getElementById("statusBarSeek");

	    statusbarseek.value = pos;

	    document.getElementById("nowt").innerHTML = vlc.input.time / 1000;

	    var hidden = document.getElementById("length");
	    if (hidden.value == 0) hidden.value = parseInt(vlc.input.length / 1000);
	    //alert(hidden.value);

	}
/*
	function else_r() {
	    oi = document.getElementById("txtout");
	    oi.value = '';
	    oi.value += vlc.versionInfo() + "\n";
	    oi.value += "VLC position " + vlc.input.position + "\n";
	    oi.value += "VLC length " + vlc.input.length + "\n";
	    oi.value += "VLC rate " + vlc.input.rate + "\n";
	    oi.value += "VLC is Playing " + vlc.playlist.isPlaying + "\n";
	}
*/
	function minimize() {
	    var mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor).getInterface(Components.interfaces.nsIWebNavigation).QueryInterface(Components.interfaces.nsIDocShellTreeItem).rootTreeItem.QueryInterface(Components.interfaces.nsIInterfaceRequestor).getInterface(Components.interfaces.nsIDOMWindow);
	    mainWindow.document.getElementById("sidebar-box").width = 5;
	    document.getElementById("minimize").style.visibility = "hidden";
	    document.getElementById("maximize").style.visibility = "visible";
	    //document.getElementById("sidebar-box").style.opacity = "0.1";
	}

	function maximize() {
	    var mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor).getInterface(Components.interfaces.nsIWebNavigation).QueryInterface(Components.interfaces.nsIDocShellTreeItem).rootTreeItem.QueryInterface(Components.interfaces.nsIInterfaceRequestor).getInterface(Components.interfaces.nsIDOMWindow);
	    mainWindow.document.getElementById("sidebar-box").width = 320;
	    document.getElementById("maximize").style.visibility = "hidden";
	    document.getElementById("minimize").style.visibility = "visible";
	}

