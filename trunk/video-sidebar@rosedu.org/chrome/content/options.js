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
	keySet = mainWindow.document.getElementById("mainKeyset");
	
	if(keySet)
	{
		keys       = keySet.childNodes;
		keysLength = keys.length;

		// Loop through the keys
		for(var i = 0; i < keysLength; i++)
		{
			key = keys.item(i);
			// If the key has an id starting with webdeveloper
			if(key.hasAttribute("id") && key.getAttribute("id").indexOf("key_openSidebar_video-sidebar") == 0)
			{
				//alert("spuf0");
				keyPreference = Preferences.get("extensions.video-sidebar.stringpref");
				key.setAttribute("key", keyPreference);
                //alert("spuf1");
            }
        }
	}
}

//alert("hello");
setKeys();
//alert("done");