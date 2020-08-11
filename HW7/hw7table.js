



var tabIndex = 1;

/*
    This function tries to submit the form. It will only submit if the form is valid.
    It gets called on various events:
    - on page load 
    - on keyup
    - on slide
*/
function auto_submit() {
  // If the form is valid
  if( $("form#mult_form").valid() == true ) {
    $("form#mult_form").submit();
  }
}


//Saves tables
function save_tab() {
  
  // only allows 5 tabs
  // delete open tabs to make new ones
  // URL: https://stackoverflow.com/questions/605969/jquery-count-number-of-list-elements
  var tabCount = $("#tabs li").length + 1;
  console.log("Current tab count is: " + tabCount);

  if(tabCount > 5) {
    alert("Only 5 may be saved at the same time. Delete a table to save a new one.");
    return false;
  }

  // This should initialize the jQuery UI tabs.
  $( "#tabs" ).tabs();

  // Get the dimensions of the current table
  var h_start = Number(document.getElementById('horiz_start').value);
  var h_end = Number(document.getElementById('horiz_end').value);
  var v_start = Number(document.getElementById('v_start').value);
  var v_end = Number(document.getElementById('v_end').value);

  tabIndex++;   // Increment the index each time we add a new tab.

  // Create the title bar
  var title = "<li class='tab'><a href='#tab-" + tabIndex + "'>" + h_start +
              " to " + h_end + " by " + v_start + " to " + v_end + "</a>" +
              "<span class='ui-icon ui-icon-close' role='presentation'></span>" + "</li>";

  // Add a new Title bar.
  $( "div#tabs ul" ).append( title );

  // Add the current multiplication table.
  $( "div#tabs" ).append('<div id="tab-' + tabIndex + '">' + $("#multiplication_table").html() + '</div>');

  // Refresh the tabs div so that the new tab shows up.
  $( "#tabs" ).tabs("refresh");

  // Make the new tab active, so that the user knows it updated.
  $( "#tabs" ).tabs("option", "active", -1);

  // Adding a remove button from jQuery UI's webpage: https://jqueryui.com/tabs/#manipulation
  $( "#tabs" ).delegate( "span.ui-icon-close", "click", function() {
      var panelID = $( this ).closest( "li" ).remove().attr( "aria-controls" );
      $( "#" + panelID ).remove();

      // Refresh the tabs!
      // Using try / catch to prevent exceptions from appearing in the console.
      // I think the destroy kind of breaks some of the jQuery UI stuff but
      // it
      try {
        $( "#tabs" ).tabs("refresh");
      }
      catch (e) {
		//console.log(e) for testing purposes
      }

      // If this is the last tab, let's reset the page to way it was before.
      // URL: https://api.jqueryui.com/tabs/#method-destroy
      if( $('div#tabs ul li.tab').length == 0) {
        try {
          $("#tabs").tabs("destroy");
        }
        catch (e) {
          //console.log(e); for testing purposes
        }

        return false;  
      }
  });
}

//Slider funtion

function slider() {

  // The slider code is based off of jQuery's UI page.
  // URL: https://jqueryui.com/slider/#hotelrooms

  // Horizontal Start Slider
  $("#slider_h_start").slider({
    min: -20,
    max: 20,
    slide: function(event, ui) {
      $("#horiz_start").val(ui.value);
      auto_submit();  // Call the auto submit function on slide.
    }
  });
  $("#horiz_start").on("keyup", function() {
    $("#slider_h_start").slider("value", this.value);
    auto_submit();  // Call the auto submit function on keyup as well.
  });

  // Horizontal End Slider
  $("#slider_h_end").slider({
    min: -20,
    max: 20,
    slide: function(event, ui) {
      $("#horiz_end").val(ui.value);
      auto_submit();  // Call the auto submit function on slide.
    }
  });
  $("#horiz_end").on("keyup", function() {
    $("#slider_h_end").slider("value", this.value);
    auto_submit();  // Call the auto submit function on keyup 
  });

  // Vertical Start Slider
  $("#slider_v_start").slider({
    min: -20,
    max: 20,
    slide: function(event, ui) {
      $("#v_start").val(ui.value);
      auto_submit();  // Call the auto submit function on slide.
    }
  });
  $("#v_start").on("keyup", function() {
    $("#slider_v_start").slider("value", this.value);
    auto_submit();  // Call the auto submit function on keyup
  });

  // Vertical End Slider
  $("#slider_v_end").slider({
    min: -20,
    max: 20,
    slide: function(event, ui) {
      $("#v_end").val(ui.value);
      auto_submit();  // Call the auto submit function on slide.
    }
  });
  $("#v_end").on("keyup", function() {
    $("#slider_v_end").slider("value", this.value);
    auto_submit();  // Call the auto submit function on keyup
  });
}


function validate() {

 //I used https://jqueryvalidation.org/validate/ to create the validation plugin as well as
//https://www.youtube.com/watch?v=xNSQ3i-BWMo to help me out.
  $("#mult_form").validate({
    // Rules for validating the form.
    rules: {
      horiz_start: {
        number: true,
        min: -20,
        max: 20,
        required: true
      },
      horiz_end: {
        number: true,
        min: -20,
        max: 20,
        required: true
      },
      v_start: {
        number: true,
        min: -20,
        max: 20,
        required: true
      },
      v_end: {
        number: true,
        min: -20,
        max: 20,
        required: true
      }
    },

    // Messages that appear if a rule isn't valid.
    messages: {
      horiz_start: {
            number:" Invalid number<br/>Enter a number between -20 and 20.",
			min:" Invalid number<br/>Enter a number between -20 and 20.",
			max:" Invalid number<br/>Enter a number between -20 and 20.",
			required:" Invalid number<br/>Enter a number between -20 and 20."
      },
      horiz_end: {
            number:" Invalid number<br/>Enter a number between -20 and 20.",
			min:" Invalid number<br/>Enter a number between -20 and 20.",
			max:" Invalid number<br/>Enter a number between -20 and 20.",
			required:" Invalid number<br/>Enter a number between -20 and 20."
      },
      v_start: {
        number:" Invalid number<br/>Enter a number between -20 and 20.",
			min:" Invalid number<br/>Enter a number between -20 and 20.",
			max:" Invalid number<br/>Enter a number between -20 and 20.",
			required:" Invalid number<br/>Enter a number between -20 and 20."
      },
      v_end: {
        number:" Invalid number<br/>Enter a number between -20 and 20.",
			min:" Invalid number<br/>Enter a number between -20 and 20.",
			max:" Invalid number<br/>Enter a number between -20 and 20.",
			required:" Invalid number<br/>Enter a number between -20 and 20."
      }
    },

    submitHandler: function() {
      table_calc();
      return false;
    },

    invalidHandler: function() {
     
      $("#warning_msg").empty();
      $("#multiplication_table").empty();
    },

    
    errorElement: "div",
    errorPlacement: function(error, element) {
      error.insertAfter(element);
    },

    onkeyup: function( element, event ) {
      auto_submit();
    }
  });
}


function table_calc() {
  
  var h_start = Number(document.getElementById('horiz_start').value);
  var h_end = Number(document.getElementById('horiz_end').value);
  var v_start = Number(document.getElementById('v_start').value);
  var v_end = Number(document.getElementById('v_end').value);


  
  $("#warning_msg").empty();

  //Switch numberrs if end is bigger
  if (h_start > h_end) {

 
    $("#warning_msg").append("<p class='warning_class'>Swapping the Horizontal start and Horizontal end.</p>");

    var tmp_num = h_start;
    h_start = h_end;
    h_end = tmp_num;
  }

  
  if (v_start > v_end) {

   
    $("#warning_msg").append("<p class='warning_class'>Swapping the Vertical start and Vertical end.</p>");

    var tmp_num = v_start;
    v_start = v_end;
    v_end = tmp_num;
  }

 
  var matrix = {};
  //I used stackoverflow to help with setting up a matrix for the multiplication
	//and to help me conceptualize a bit
   //https://stackoverflow.com/questions/27205018/multiply-2-matrices-in-javascript
   
   
  // Flip inputs around if end is less than start.
  var rows = Math.abs(h_end - h_start);
  var columns = Math.abs(v_end - v_start);
  var horz = h_start;
  var vert = v_start;

 
  for (var x = 0; x <= columns; x++) {
    var tmp_arr = [];

    for (var y = 0; y <= rows; y++) {
  
      var calc = horz * vert;
      tmp_arr[y] = calc;
      horz++;
    }

   
    matrix["row" + x] = tmp_arr;

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