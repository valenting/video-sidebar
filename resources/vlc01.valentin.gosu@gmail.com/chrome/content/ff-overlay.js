Vali-test.onFirefoxLoad = function(event) {
  document.getElementById("contentAreaContextMenu")
          .addEventListener("popupshowing", function (e){ Vali-test.showFirefoxContextMenu(e); }, false);
};

Vali-test.showFirefoxContextMenu = function(event) {
  // show or hide the menuitem based on what the context menu is on
  document.getElementById("context-Vali-test").hidden = gContextMenu.onImage;
};

window.addEventListener("load", Vali-test.onFirefoxLoad, false);
