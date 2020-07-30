
//

function table_calc() {
  var h_start = Number(document.getElementById('h_start').value);
  var h_end = Number(document.getElementById('h_end').value);
  var v_start = Number(document.getElementById('v_start').value);
  var v_end = Number(document.getElementById('v_end').value);
  var matrix = {};
  var horz = h_start;
  var vert = v_start;
  
  
  if (h_start < -50 || h_end > 50 || v_start < -50 || v_end > 50) {
    alert("Please input a number between -50 and 50.");
    return;

 
  // Switch numbers if end is bigger 
	if (h_start > h_end) {
		var tmp = h_start;
		h_start = h_end;
		h_end = tmp;
	}
	if (v_start > v_end) {
		var tmp = v_start;
		v_start = v_end;
		v_end = tmp;
	}

  }
     //I used stackoverflow to help with setting up a matrix for the multiplication
	//and to help me conceptualize a bit
   //https://stackoverflow.com/questions/27205018/multiply-2-matrices-in-javascript
  // Flip inputs around if end is less than start.
  var rows = Math.abs(h_end - h_start);
  var columns = Math.abs(v_end - v_start);
  for (var x = 0; x <= columns; x++) {
    arr = [];

    for (var y = 0; y <= rows; y++) {
      var calc = horz * vert;
      arr[y] = calc;
      horz++;
    }

    // Save the current row in the object.
    matrix["row" + x] = arr;

    horz = h_start;        // Reset each pass since we're moving down a row.
    vert++;
  }

  table_fill(matrix);
  return false;
}



function table_fill(matrix) {
	
  var h_start = Number(document.getElementById('h_start').value);
  var h_end = Number(document.getElementById('h_end').value);
  var v_start = Number(document.getElementById('v_start').value);
  var v_end = Number(document.getElementById('v_end').value);
  var content = "";

  if (h_start > h_end) {
    var num = h_start;
    h_start = h_end;
    h_end = num;
  }
  if (v_start > v_end) {
    var num = v_start;
    v_start = v_end;
    v_end = num;
  }
  // I used this to help me with my multiplication table 
 // https://stackoverflow.com/questions/41465569/multiplication-table-in-javascript

  var rows = Math.abs(h_end - h_start);
  var columns = Math.abs(v_end - v_start);
  content += "<table>";
  content += "<tr><td></td>";
  for (var a = h_start; a <= h_end; a++) {
    content += "<td>" + a + "</td>";
  }
  content += "</tr>";
  var vert = v_start;
  for (var x = 0; x <= columns; x++) {
    content += "<tr><td>" + vert + "</td>";
    for (var y = 0; y <= rows; y++) {
      content += "<td>" + matrix["row" + x][y] + "</td>";
    }
    vert++;
    content += "</tr>";
  }
  content += "</table>";

  $("#multiplication_table").html(content);
}
