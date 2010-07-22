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
	  //el.type = 'text';
	  //el.name = 'txtRow' + iteration;
	  el.id = 'txtRow' + file;
	  el.setAttribute('class', 'ui-state-default');
	  el.setAttribute('onDblclick', 'javascript:playMov("' + file.replace(/\\/g,"\\\\") + '")');
	  //el.setAttribute('onclick', );
	  //el.size = 40;
	  var textLink = document.createTextNode(file);
	  el.appendChild(textLink);
	  
	  //el.onkeypress = keyPressTest;
	  tbl.appendChild(el);
	  f.value='';
	  addToPlaylist(file);
	}
}