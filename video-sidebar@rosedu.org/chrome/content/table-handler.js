function addRowToTable()
{
	var f=document.getElementById('add_file');
	var file = f.value;
	//file = file.toLowerCase();
	if(file == "") {
		alert("Enter a file name or click Open");
	}
	else {
	  var tbl = document.getElementById('sortable');
	  var el = document.createElement('li');
	  el.id = 'txtRow' + file;
	  el.setAttribute('class', 'ui-state-default');
	  el.setAttribute('onDblclick', 'javascript:playMov("' + file.replace(/\\/g,"\\\\") + '")');
	  var X = document.createElement('span');
	  X.setAttribute('class', 'ui-icon ui-icon-close');
	  el.appendChild(X);
	  //el.setAttribute('onclick', );
	  //el.size = 40;
<<<<<<< .mine
	  var filename = file.split('\\').pop().split('/').pop();
	  if (filename.length>30)
			filename = filename.substr(0,28)+'...';
	  var textLink = document.createTextNode(filename);
=======
	  var filename = file.split('\\').pop().split('/').pop();
	  if (filename.length>30)
		filename = filename.substr(0,28)+'...';
	  var textLink = document.createTextNode(filename);
>>>>>>> .r99
	  el.appendChild(textLink);
	  
	  //el.onkeypress = keyPressTest;
	  tbl.appendChild(el);
	  f.value='';
	  addToPlaylist(file);
	}
}