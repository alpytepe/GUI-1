
//Jquery validation

function validate() {
	
//I used https://jqueryvalidation.org/validate/ to create the validation plugin as well as
//https://www.youtube.com/watch?v=xNSQ3i-BWMo to help me out.
	
$("#table_form").validate({
	rules: {
		
//Rules for validating the multiplication table. Entered numbers cannot be greater than 50,
//Or less than -50 on any axis. 
		h_start:  {
			number:true,
			min: -50,
			max: 50,
			required:true
		},
		
		v_start:  {
			number:true,
			min: -50,
			max: 50,
			required:true
		},
		
		h_end:  {
			number:true,
			min: -50,
			max: 50,
			required:true
		}, 
		
		v_end:  {
			number:true,
			min: -50,
			max:50,
			required:true
		}
	},
	
	
//Error messages if the input numbers are not within the specified parameters
	
	messages:  {
		
		h_start:  {
			number:" Invalid number<br/>Enter a number between -50 and 50.",
			min:" Invalid number<br/>Enter a number between -50 and 50.",
			max:" Invalid number<br/>Enter a number between -50 and 50.",
			required:" Invalid number<br/>Enter a number between -50 and 50."
		},
	
		v_start:  {
			number:" Invalid number<br/>Enter a number between -50 and 50.",
			min:" Invalid number<br/>Enter a number between -50 and 50.",
			max:" Invalid number<br/>Enter a number between -50 and 50.",
			required:" Invalid number<br/>Enter a number between -50 and 50."
		},
		
		h_end:  {
			number:" Invalid number<br/>Enter a number between -50 and 50.",
			min:" Invalid number<br/>Enter a number between -50 and 50.",
			max:" Invalid number<br/>Enter a number between -50 and 50.",
			required:" Invalid number<br/>Enter a number between -50 and 50."
		},
		
		v_end:  {
			number:" Invalid number<br/>Enter a number between -50 and 50.",
			min:" Invalid number<br/>Enter a number between -50 and 50.",
			max:" Invalid number<br/>Enter a number between -50 and 50.",
			required:" Invalid number<br/>Enter a number between -50 and 50."
		}
	},
		
		 
	submitHandler: function() {
        	table_calc();
      		return false;
    	},

		
	invalidHandler: function() {
      $("#warning_msg").empty();
      $("#mult_table").empty();
    },
errorElement: "div",
  errorPlacement: function(error, element) {
   error.insertAfter(element);
	 }
  });
}


		
		


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

  var content = "";
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
  return false;
}



