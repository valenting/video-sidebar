testaddon7.onFirefoxLoad = function(event) {
  document.getElementById("contentAreaContextMenu")
          .addEventListener("popupshowing", function (e){ testaddon7.showFirefoxContextMenu(e); }, false);
};

testaddon7.showFirefoxContextMenu = function(event) {
  // show or hide the menuitem based on what the context menu is on
  document.getElementById("context-testaddon7").hidden = gContextMenu.onImage;
};

window.addEventListener("load", testaddon7.onFirefoxLoad, false);
