function setKeys() {
	var id                  = null;
    var key                 = null;
    var keyPreference       = null;
    var keys                = null;
    var keysLength          = null;
    var mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                     .getInterface(Components.interfaces.nsIWebNavigation)
                     .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
                     .rootTreeItem
                     .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                     .getInterface(Components.interfaces.nsIDOMWindow);

	// Sidebar is loaded and mainwindow is ready
	var keySet = mainWindow.document.getElementById("mainKeyset");
	alert("hello");
	if(keySet)
	{
		keys       = keySet.childNodes;
		keysLength = keys.length;

		// Loop through the keys
		for(var i = 0; i < keysLength; i++)
		{
			key = keys.item(i);
			//alert(key.getAttribute("id"));
			// If the key has an id starting with webdeveloper
			if(key.hasAttribute("id") && key.getAttribute("id").indexOf("key_openSidebar_video-sidebar") == 0)
			{
				alert("spuf0");
				keyPreference = "p";//Preferences.get("extensions.video-sidebar.stringpref");
				key.setAttribute("key", keyPreference);
                //alert("spuf1");
            }
        }
	}
}

function loadKeys() {
	 var mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                     .getInterface(Components.interfaces.nsIWebNavigation)
                     .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
                     .rootTreeItem
                     .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                     .getInterface(Components.interfaces.nsIDOMWindow);
	var keyset = null;
	keyset = mainWindow.document.getElementById("mainKeyset");
	//alert(keyset);
	var keyelem = mainWindow.document.createElement('key');
	keyelem.setAttribute('id', 'key_openSidebar_video-sidebar');
	keyelem.setAttribute('command', 'viewSidebar_video-sidebar');
	//alert("hello");
	var key;
	
	var prefManager = Components.classes["@mozilla.org/preferences-service;1"]
                                .getService(Components.interfaces.nsIPrefBranch);
	key = prefManager.getCharPref("extensions.video-sidebar.stringpref");
	
	//alert("hello2");
	keyelem.setAttribute('key', key);
	keyelem.setAttribute('modifiers','control alt');
	//alert("hello3");
	keyset.appendChild(keyelem);
	//alert("zbuf");
}
