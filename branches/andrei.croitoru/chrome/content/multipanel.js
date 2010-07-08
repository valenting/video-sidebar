
var webPanel;
if(document.getElementById('web-panels-browser')) webPanel = document.getElementById('web-panels-browser');


//var aios_CONTENT = aios_APPCONTENT.childNodes[0];
var aios_CONTENT = aios_WIN.document.getElementById('content');

/*
	Initialisierung
		=> Aufruf durch onload in console.xul
*/
function aios_init() {
    // Sidebar-/Fenster-Titel setzen
    aios_setSBLabel();

    // Buttons aktivieren/deaktivieren
    aios_setOptions();

    // Listener für Browser => Quelltext aktualisieren
    if(top.gBrowser && top.gBrowser.addProgressListener) top.gBrowser.addProgressListener(aiosProgListener, Components.interfaces.nsIWebProgress.NOTIFY_STATE_DOCUMENT);

    // Default-Theme? / OS
    if(document.getElementById('webpanels-window')) {
        document.getElementById('webpanels-window').setAttribute('aios_appDefTheme', aios_WIN.aios_appDefTheme);
        document.getElementById('webpanels-window').setAttribute('aios_appOS', aios_WIN.aios_appOS);
    }

    // Fenster auf Fokus überwachen => unterschiedliche Farben für Darwin
    if(aios_appOS == "Darwin" && top.aios_notifyActive) top.aios_notifyActive();

/*
	// MultiPanel im Tab => 'load'-Funktion modifizieren, um Fehlermeldung zu vermeiden
	if(typeof load == "function") {
		var loadOld = load.toString();
		var newCmd = "if(top.toString() != '[object Window]') panelBrowser.webProgress";
		var loadNew = loadOld.replace(/panelBrowser.webProgress/g, newCmd);
		eval('load = ' + loadNew + ';');
	}
	*/
}


/*
	modifizierte Original-Überwachungsfunktion aus web-panels.js
*/
var panelProgressListener = {
    onProgressChange: function(aWebProgress, aRequest, aCurSelfProgress, aMaxSelfProgress,
        aCurTotalProgress, aMaxTotalProgress) {
    },

    onStateChange: function(aWebProgress, aRequest, aStateFlags, aStatus) {
        if(!aRequest) return;

        // Sidebar-/Fenster-Titel setzen
        aios_setSBLabel();

        // Small Screen Rendering?
        //aios_setSSR();

        // Buttons aktivieren/deaktivieren
        //aios_setOptions();

        //ignore local/resource:/chrome: files
        if(aStatus == NS_NET_STATUS_READ_FROM || aStatus == NS_NET_STATUS_WROTE_TO) return;

        const nsIWebProgressListener = Components.interfaces.nsIWebProgressListener;
        const nsIChannel = Components.interfaces.nsIChannel;

        if(aStateFlags & nsIWebProgressListener.STATE_START && aStateFlags & nsIWebProgressListener.STATE_IS_NETWORK) {
            if(window.parent.document.getElementById('sidebar-throbber'))
                window.parent.document.getElementById('sidebar-throbber').setAttribute("loading", "true");
        }
        else if(aStateFlags & nsIWebProgressListener.STATE_STOP && aStateFlags & nsIWebProgressListener.STATE_IS_NETWORK) {
            if(window.parent.document.getElementById('sidebar-throbber'))
                window.parent.document.getElementById('sidebar-throbber').removeAttribute("loading");
        }
    },

    onLocationChange: function(aWebProgress, aRequest, aLocation) {
        // Buttons aktivieren/deaktivieren
        aios_setOptions();
    },

    onStatusChange: function(aWebProgress, aRequest, aStatus, aMessage) {
        // Small Screen Rendering?
        aios_setSSR();
    },

    onSecurityChange: function(aWebProgress, aRequest, aState) {
    },

    QueryInterface: function(aIID) {
        if(aIID.equals(Components.interfaces.nsIWebProgressListener) ||
            aIID.equals(Components.interfaces.nsISupportsWeakReference) ||
            aIID.equals(Components.interfaces.nsISupports))
            return this;

        throw Components.results.NS_NOINTERFACE;
    }
};


/*
	automatische Aktualisierung
		=> Aufruf durch aiosProgListener (_common.js)
*/
function aios_onLocationChange() {
    if(document.getElementById('source-button') && aios_getBoolean('source-button', 'checked') &&
        document.getElementById('autoReload-mitem') && aios_getBoolean('autoReload-mitem', 'checked')) {
        aios_setMultiPanel('source');
    }
}


/*
	Öffnet im MultiPanel die im Browser angezeigte Webseite oder den Quelltext
		=> Aufruf durch Buttons, aios_panelTab() und
			 aios_onLocationChange() wenn Quelltext autom. aktualisiert wird (aiosProgListener)
*/
function aios_setMultiPanel(aMode) {
    var label, panelLoc;

    // about:-Einträge
    if(aMode.indexOf("about:") == 0 && aMode != "about:blank") {
        panelLoc = (aMode == "about:config") ? "chrome://global/content/config.xul" : aMode;
        label = aMode;
    }
    // WebPanel - Page und Source
    else {
        try {
            panelLoc = aios_CONTENT.currentURI.spec;
            label = aios_CONTENT.selectedTab.label;
        } catch(e) { }

        // ich bin das MultiPanel im Tab
        if(top.toString() == "[object Window]" && aios_WIN.aiosLastSelTab) {
            panelLoc = aios_WIN.aiosLastSelTab.document.location.href;
        }
    }

    // wenn auf "Page" oder "Source" geklickt wird, während im Tab das MultiPanel geladen ist
    if(panelLoc == "chrome://browser/content/web-panels.xul") {
        panelLoc = aios_CONTENT.contentDocument.getElementById('web-panels-browser').getAttribute('cachedurl');
    }

    /*
	// neues Sidebar-Label zusammensetzen
	var sourceLabel = document.getElementById('source-button').getAttribute('label');
	if(aMode == "source") label = sourceLabel + ": " + panelLoc;
	var newLabel = label + " - " + mpLabel;
*/
    var newLabel = "";

    if(aMode == "source") panelLoc = "view-source:" + panelLoc;

    // MultiPanel öffnen bzw. Inhalt laden
    if(top.document.getElementById('sidebar') && top.toString() != "[object Window]")	top.openWebPanel(newLabel, panelLoc);
    else webPanel.contentDocument.location.href = panelLoc;
}


/*
	aktiviert/deaktiviert die Toolbarbuttons und Radio-Menuitems (about)
		=> Aufruf durch onLocationChange() wenn sich MultiPanel-URL ändert (panelProgressListener)
*/
function aios_setOptions() {
    var mode, i;

    var aboutGroup = document.getElementById('aboutGroup').childNodes;
    var panelLoc = webPanel.contentDocument.location.href;

    if(panelLoc != "about:blank") {
        mode = "page";
        if(panelLoc.indexOf("about:") == 0) mode = "about";
        if(panelLoc == "chrome://global/content/config.xul") mode = "about";
        if(panelLoc.indexOf("view-source") == 0) mode = "source";
    }

    if(!mode) return false;

    if(mode != "page") document.getElementById('page-button').setAttribute('checked', false);
    if(mode != "source") document.getElementById('source-button').setAttribute('checked', false);
    if(mode != "about") document.getElementById('about-button').setAttribute('checked', false);
    document.getElementById(mode + '-button').setAttribute('checked', true);

    if(mode == "page" || mode == "source") {
        for(i = 0; i < aboutGroup.length; i++) {
            if(aboutGroup[i].tagName == "menuitem") aboutGroup[i].setAttribute('checked', false);
        }
    }
    else {
        for(i = 0; i < aboutGroup.length; i++) {
            var label = aboutGroup[i].getAttribute('label');
            var isActive = label == panelLoc;
            isActive = (label == "about:config" && panelLoc == "chrome://global/content/config.xul");
            if(aboutGroup[i].tagName == "menuitem" && isActive) aboutGroup[i].setAttribute('checked', true);
        }
    }

    webPanel.setAttribute('cachedurl', panelLoc);
    document.persist('web-panels-browser', "cachedurl");

    return true;
}


/*
	Sidebar-Label einstellen
		=> Aufruf durch onload-Event und onStateChange() wenn sich MultiPanel-URL ändert (panelProgressListener)
*/
function aios_setSBLabel() {
    var newLabel = "";

    var mpLabel = aios_WIN.document.getElementById('viewWebPanelsSidebar').getAttribute('label');

    if(webPanel && webPanel.contentDocument) {
        var loc = webPanel.contentDocument.location.href;
        var sourceLabel = document.getElementById('source-button').getAttribute('label');

        if(webPanel.contentDocument.title != "") newLabel = newLabel + webPanel.contentDocument.title;
        if(loc.indexOf("view-source:") == 0 && loc != "about:blank") newLabel = sourceLabel + ": " + newLabel;
    //else if(loc.indexOf("about:") == 0 && loc != "about:blank") newLabel = loc;
    }

    if(newLabel != "") newLabel = newLabel + " - " + mpLabel;
    else newLabel = mpLabel;

    if(top.document.getElementById('sidebar-title'))
        top.document.getElementById('sidebar-title').setAttribute('value', newLabel);

    if(!top.document.getElementById('sidebar-title')) top.document.title = newLabel;
}


/*
	Small Screen Rendering ein/aus
		=> Aufruf durch onStateChange() wenn sich MultiPanel-URL ändert (panelProgressListener)
		Original-Code in Teilen von: Daniel Glazman <glazman@netscape.com>
*/
function aios_setSSR() {
    //if(!aios_getBoolean("ssr-mitem", "checked")) return false;

    var ssrURL = "chrome://aios/skin/multipanel_ssr.css";

    try {
        var doc = webPanel.contentDocument;
    //var docRoot = doc.documentElement;	// Abfrage verursacht bei einigen Seiten einen größer skalierten Text ???
    //var docRootName = docRoot.nodeName.toLowerCase();
    } catch(e) { }

    //if(!doc || !docRoot || !docRootName || !doc.body || !aios_getBoolean("page-button", "checked")) return false;
    if(!doc || !doc.body || !aios_getBoolean("page-button", "checked")) return false;

    // is the document using frames ? we don't like frames for the moment
    //if(docRootName == "html" && doc.body.nodeName.toLowerCase() == "frameset") {
    if(doc.body.nodeName.toLowerCase() == "frameset") {
        dump("Small Screen Rendering, No frames allowed");
        return false;
    }

    var styleSheets = doc.styleSheets;
    for(var i = 0; i < styleSheets.length; ++i) {
        var currentStyleSheet = styleSheets[i];

        if(/multipanel_ssr/.test(currentStyleSheet.href)) {
            currentStyleSheet.disabled = !aios_getBoolean("ssr-mitem", "checked");
            var aiosSidebar = aios_getBoolean("ssr-mitem", "checked") && aios_getBoolean("ssrSidebar-mitem", "checked");
            doc.body.setAttribute('aiosSidebar', aiosSidebar);
            return true;
        }
    }

    // we have to attach the stylesheet to the document...
    // what's the document root ? html ?
    //if(docRootName == "html" && aios_getBoolean("ssr-mitem", "checked")) {
    if(aios_getBoolean("ssr-mitem", "checked")) {
        // let's create a link element
        var headElement = doc.getElementsByTagName("head")[0];
        var linkElement = doc.createElement("link");
        linkElement.setAttribute("rel", "stylesheet");
        linkElement.setAttribute("type", "text/css");
        linkElement.setAttribute("href", ssrURL);

        headElement.appendChild(linkElement);
    }

    return true;
}


/*
	MultiPanel-Unload
*/
function aios_unloadMultiPanel() {
    if(webPanel && !aios_getBoolean("aios-remMultiPanel", "checked")) {
        webPanel.setAttribute('cachedurl', '');
        document.persist('web-panels-browser', "cachedurl");
    }
}


function aios_getPageOptions() {
    document.getElementById('ssrSidebar-mitem').setAttribute('disabled', !aios_getBoolean("ssr-mitem", "checked"));
}


function aios_getSourceOptions() {
    var wrap, highlight;

    try {
        wrap = aios_gPref.getBoolPref("view_source.wrap_long_lines");
        highlight = aios_gPref.getBoolPref("view_source.syntax_highlight");

        document.getElementById('wrap-mitem').setAttribute('checked', wrap);
        document.getElementById('highlight-mitem').setAttribute('checked', highlight);
    }
    catch(e) { }
}


function aios_setSourceOptions(aMode) {
    try {
        if(aMode == "wrap")
            aios_gPref.setBoolPref("view_source.wrap_long_lines", !aios_gPref.getBoolPref("view_source.wrap_long_lines"));
        else
            aios_gPref.setBoolPref("view_source.syntax_highlight", !aios_gPref.getBoolPref("view_source.syntax_highlight"));
    }
    catch(e) { }
}