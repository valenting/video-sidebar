function addRowToTable()
{
	var f=document.getElementById('add_file');
	var file = f.value;
	file = file.toLowerCase();
	if(file == "") {
		alert("Enter a file name or click BROWSE");
	}
	else {
	  var tbl = document.getElementById('playlist');
	  var lastRow = tbl.rows.length;
	  // if there's no header row in the table, then iteration = lastRow + 1
	  var iteration = lastRow;
	  var row = tbl.insertRow(lastRow);
	  
	  // left cell
	  var cellLeft = row.insertCell(0);
	  //var textNode = document.createTextNode(iteration);
	  var textNode = document.createTextNode(iteration);
	  cellLeft.appendChild(textNode);
	  
	  // right cell
	  var cellRight = row.insertCell(1);
	  var el = document.createElement('a');
	  //el.type = 'text';
	  //el.name = 'txtRow' + iteration;
	  el.id = 'txtRow' + iteration;
	  el.setAttribute('href', 'javascript:playMov("' + file.replace(/\\/g,"\\\\") + '")');
	  //el.setAttribute('onclick', );
	  //el.size = 40;
	  var textLink = document.createTextNode(file);
	  el.appendChild(textLink);
	  
	  //el.onkeypress = keyPressTest;
	  cellRight.appendChild(el);
	  f.value='';
	  addToPlaylist(file);
	}
}
function keyPressTest(e, obj)
{
  var validateChkb = document.getElementById('chkValidateOnKeyPress');
  if (validateChkb.checked) {
    var displayObj = document.getElementById('spanOutput');
    var key;
    if(window.event) {
      key = window.event.keyCode; 
    }
    else if(e.which) {
      key = e.which;
    }
    var objId;
    if (obj != null) {
      objId = obj.id;
    } else {
      objId = this.id;
    }
    displayObj.innerHTML = objId + ' : ' + String.fromCharCode(key);
  }
}
function removeRowFromTable()
{
  var tbl = document.getElementById('tblSample');
  var lastRow = tbl.rows.length;
  if (lastRow > 2) tbl.deleteRow(lastRow - 1);
}
function openInNewWindow(frm)
{
  // open a blank window
  var aWindow = window.open('', 'TableAddRowNewWindow',
   'scrollbars=yes,menubar=yes,resizable=yes,toolbar=no,width=400,height=400');
   
  // set the target to the blank window
  frm.target = 'TableAddRowNewWindow';
  
  // submit
  frm.submit();
}
function validateRow(frm)
{
  var chkb = document.getElementById('chkValidate');
  if (chkb.checked) {
    var tbl = document.getElementById('tblSample');
    var lastRow = tbl.rows.length - 1;
    var i;
    for (i=1; i<=lastRow; i++) {
      var aRow = document.getElementById('txtRow' + i);
      if (aRow.value.length <= 0) {
        alert('Row ' + i + ' is empty');
        return;
      }
    }
  }
  openInNewWindow(frm);
}
