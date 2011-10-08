video__sidebar.onFirefoxLoad = function(event) {
  document.getElementById("contentAreaContextMenu")
          .addEventListener("popupshowing", function (e){ video__sidebar.showFirefoxContextMenu(e); }, false);
};

video__sidebar.showFirefoxContextMenu = function(event) {
  // show or hide the menuitem based on what the context menu is on
  document.getElementById("context-video-sidebar").hidden = gContextMenu.onImage;
};

window.addEventListener("load", video__sidebar.onFirefoxLoad, false);
