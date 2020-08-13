/*
    Name: Alp Yuksektepe
    GUI Programming 1 
	HW8
	
	This is the JS code for the scrabble game. 
	-Tiles can be dragged and dropped only on board spots
	-Included the entire scrabble board with bonus tiles
	-Scores get saved and tallied
	-Board is cleared after each round (mostly because I couldnt figure out how to save all words played)
	-Doesn't check to see if words are in the dictionary or not
	

   
*/

/*
The 4 variables below represent the tiles left in the game, the current score, the current word score and the current word.
*/
var tilesLeft = 100;
var currentScore = 0;
var currentWordScore = 0;
var currentWord = "";

/*
Below is an array that holds all the letters, their amount, as well as their value in game based on pieces.json file given
*/
var ScrabbleTiles = [];
ScrabbleTiles["A"] = { "value": 1, "amount": 9, "remaining": 9, "image": "images/Scrabble_Tile_A.jpg" };
ScrabbleTiles["B"] = { "value": 3, "amount": 2, "remaining": 2, "image": "images/Scrabble_Tile_B.jpg" };
ScrabbleTiles["C"] = { "value": 3, "amount": 2, "remaining": 2, "image": "images/Scrabble_Tile_C.jpg" };
ScrabbleTiles["D"] = { "value": 2, "amount": 4, "remaining": 4, "image": "images/Scrabble_Tile_D.jpg" };
ScrabbleTiles["E"] = { "value": 1, "amount": 12, "remaining": 12, "image": "images/Scrabble_Tile_E.jpg" };
ScrabbleTiles["F"] = { "value": 4, "amount": 2, "remaining": 2, "image": "images/Scrabble_Tile_F.jpg" };
ScrabbleTiles["G"] = { "value": 2, "amount": 3, "remaining": 3, "image": "images/Scrabble_Tile_G.jpg" };
ScrabbleTiles["H"] = { "value": 4, "amount": 2, "remaining": 2, "image": "images/Scrabble_Tile_H.jpg" };
ScrabbleTiles["I"] = { "value": 1, "amount": 9, "remaining": 9, "image": "images/Scrabble_Tile_I.jpg" };
ScrabbleTiles["J"] = { "value": 8, "amount": 1, "remaining": 1, "image": "images/Scrabble_Tile_J.jpg" };
ScrabbleTiles["K"] = { "value": 5, "amount": 1, "remaining": 1, "image": "images/Scrabble_Tile_K.jpg" };
ScrabbleTiles["L"] = { "value": 1, "amount": 4, "remaining": 4, "image": "images/Scrabble_Tile_L.jpg" };
ScrabbleTiles["M"] = { "value": 3, "amount": 2, "remaining": 2, "image": "images/Scrabble_Tile_M.jpg" };
ScrabbleTiles["N"] = { "value": 1, "amount": 6, "remaining": 6, "image": "images/Scrabble_Tile_N.jpg" };
ScrabbleTiles["O"] = { "value": 1, "amount": 8, "remaining": 8, "image": "images/Scrabble_Tile_O.jpg" };
ScrabbleTiles["P"] = { "value": 3, "amount": 2, "remaining": 2, "image": "images/Scrabble_Tile_P.jpg" };
ScrabbleTiles["Q"] = { "value": 10, "amount": 1, "remaining": 1, "image": "images/Scrabble_Tile_Q.jpg" };
ScrabbleTiles["R"] = { "value": 1, "amount": 6, "remaining": 6, "image": "images/Scrabble_Tile_R.jpg" };
ScrabbleTiles["S"] = { "value": 1, "amount": 4, "remaining": 4, "image": "images/Scrabble_Tile_S.jpg" };
ScrabbleTiles["T"] = { "value": 1, "amount": 6, "remaining": 6, "image": "images/Scrabble_Tile_T.jpg" };
ScrabbleTiles["U"] = { "value": 1, "amount": 4, "remaining": 4, "image": "images/Scrabble_Tile_U.jpg" };
ScrabbleTiles["V"] = { "value": 4, "amount": 2, "remaining": 2, "image": "images/Scrabble_Tile_V.jpg" };
ScrabbleTiles["W"] = { "value": 4, "amount": 2, "remaining": 2, "image": "images/Scrabble_Tile_W.jpg" };
ScrabbleTiles["X"] = { "value": 8, "amount": 1, "remaining": 1, "image": "images/Scrabble_Tile_X.jpg" };
ScrabbleTiles["Y"] = { "value": 4, "amount": 2, "remaining": 2, "image": "images/Scrabble_Tile_Y.jpg" };
ScrabbleTiles["Z"] = { "value": 10, "amount": 1, "remaining": 1, "image": "images/Scrabble_Tile_Z.jpg" };
ScrabbleTiles["_"] = { "value": 0, "amount": 2, "remaining": 2, "image": "images/Scrabble_Tile_Blank.jpg" };

 /*
 Function updateCurrentWord is the function that looks at the word the user created, then updates the current word's score and value at the bottom of the screen.
 */
function updateCurrentWord() {
  var hWord = ""; // horizontal word temp value
  var vWord = ""; // vertical word temp value
  var multH = 1; //multiplier values for horizontal and veritical words
  var multV = 1;
  var tempLScore = 0; //temp value for the score of the letter that's placed on the board
  var tempHWScore = 0; // temp scores for horizontal and veritical words
  var tempVWScore = 0;
  for (var x = 1; x < 16; x++) { 
    for (var y = 1; y < 16; y++) {
      var lh = $("#line" + x).find("#space" + y).find(".game_tile").attr("letter");
      var lv = $("#line" + y).find("#space" + x).find(".game_tile").attr("letter");
      if (lh == undefined) {
        //space is set to a emtpy value if nothing is placed on a space.
        lh = " ";
      } else {
        /*
        This sets our temporary letter score to the value of the letter that is placed.
        */
        tempLScore = ScrabbleTiles[lh]["value"];
        /*
        check to see if you land on a special tile
        */
        if ($("#line" + x).find("#space" + y).attr("effect") ==  "tw") {
          multH = 3;
        } else
        if ($("#line" + x).find("#space" + y).attr("effect") =="dw") {
          multH = 2;
        } else
        if ($("#line" + x).find("#space" + y).attr("effect") == "tl") {
          tempLScore = 3 * tempLScore;
        } else
        if ($("#line" + x).find("#space" + y).attr("effect") =="dl") {
          tempLScore = 2 * tempLScore;
        }
		tempHWScore += tempLScore;
      }
      //This is the same as above.
      if (lv == undefined) {
        lv = " ";
      } else {
        tempLScore = ScrabbleTiles[lv]["value"];
        if ($("#line" + y).find("#space" + x).attr("effect") == "tw") {
          multV = 3;
        } else
        if ($("#line" + y).find("#space" + x).attr("effect") == "dw") {
          multV = 2;
        } else
        if ($("#line" + y).find("#space" + x).attr("effect") == "tl") {
          tempLScore = 3 * tempLScore;
        } else
        if ($("#line" + y).find("#space" + x).attr("effect") == "dl") {
          tempLScore = 2 * tempLScore;
        }
        tempVWScore += tempLScore;
      }
      /*
       This adds another letter on to the word that is being made.
      */
      hWord += lh;
      vWord += lv;
    }
    /*
     This adds a space at the end of each line so there is no overflow of words.
    */
    hWord += " ";
    vWord += " ";
  }
  /*
   This is to take the white space off
  */
  hWord = $.trim(hWord);
  vWord = $.trim(vWord);
  if(!hWord.includes(" ") && hWord.length > 1) {
    $("#currentWord").html("Word: " + hWord);
    $("#currentWord2").html("Word Score: 0" + multH * tempHWScore);
    currentWord = hWord;
    currentWordScore = multH * tempHWScore;
  } else
  
  if(!vWord.includes(" ") && vWord.length > 1) {
    $("#currentWord").html("Word: " + vWord);
    $("#currentWord2").html("Word Score: 0" + multV * tempVWScore);
    currentWord = vWord;
    currentWordScore = multV * tempVWScore;
  } 
  else {
    $("#currentWord").html("Word:");
    $("#currentWord2").html("Word Score: 0");
    currentWord = "";
    currentWordScore = 0;
  }
}

/*
This makes the game tiles draggable, they revert to their old spot if not placed correctly.
*/
$(function () {
  $(".game_tile").draggable({
    snap: ".board_tile,.game_tile_holder",
    snapmode: "both",
    revert: "invalid"
  });

  /*
  This makes the tiles drag and droppable
 */
  $(".game_tile_holder").droppable({
    drop: function (event, ui) {
      // make sure there isn't already a tile on this space
      if($(this).children().length == 0){
        ui.draggable.appendTo(this).css("left", "0px").css("top", "0px")
        updateCurrentWord();
      }
    }
  });

  /*
  This makes the tile holder droppable so you can drag a tile from the board and drop it on a spot
 */
  $(".board_tile").droppable({
    drop: function (event, ui) {
      // make sure there isn't already a tile on this space
      if($(this).children().length == 0){
        ui.draggable.appendTo(this).css("left", "0px").css("top", "0px")
        updateCurrentWord();
      }
    }
  });
});

/*
 refreshTile takes in a tile parameter as an index of the 7 spots on the tile holder
 Generates a new tile for that spot based on the probability of the tiles in the array that are left
*/
function refreshTile(tile) {
  if ($("#tile" + (tile + 1)).children().length == 0) {
    var char;
    var runningCount = 0;
    var randomNum = 0;
    randomNum = Math.floor((Math.random() * tilesLeft));
    for (k = 0; k < Object.keys(ScrabbleTiles).length; k++) {
      if (k == Object.keys(ScrabbleTiles).length - 1) {
        char = "_";
      } else {
        char = String.fromCharCode(65 + k);
      }
      runningCount += ScrabbleTiles[char]["remaining"];
      if (randomNum < runningCount) {
        tilesLeft--;
        ScrabbleTiles[char]["remaining"]--;
        $("#tile" + (tile + 1)).html("");
        var newDiv = $("<div class=\"game_tile "
          + char
          + "_tile\" letter=\""
          + char
          + "\"><img src=\""
          + ScrabbleTiles[char]["image"]
          + "\"class=\"game_tile_img\"></div>")
        $("#tile" + (tile + 1)).append(newDiv);
        $(".game_tile").draggable({ snap: ".board_tile,.game_tile_holder", revert: "invalid" });
        break;
      }
    }
  }
}

/*
clears board
*/
function clearBoard() {
  var i;
  for (i = 1; i < 16; i++) {
    for (e = 1; e < 16; e++) {
      $("#line" + i).find("#space" + e).html("");
    }
  }
}

/*
Refresh tiles function
*/
$("#generate").click(function () {
  
  clearBoard();
  for (var x = 1; x <= 7; x++)
  {
    var letter = $("#tile" + x).find(".game_tile").attr("letter");
    ScrabbleTiles[letter]["remaining"]++;
    tilesLeft++;
    $("#tile" + x).html("");
  }
  for (x = 0; x < 7; x++)
  {
    refreshTile(x);
  }
});



/*
This button is for the user to submit their current word on the board for scoring.
I didn't check it with actual dictionary words, so for now, it only checks if you enter at least 2+ letters
*/
$("#save").click(function () {
  if (currentWord == "") {
    $( "#message" ).dialog( "open" );
    return;
  }

  currentScore += currentWordScore;
  clearBoard();
  for (var x = 0; x < 7; x++)
  {
    refreshTile(x);
  }
  $("#currentScore").html("Score: " + currentScore)
  $("#tileCount").html("Tiles Left: " + tilesLeft)
  $("#currentWord").html("Word: N/a");
  $("#currentWord2").html("Word Score: 0");
  currentWordScore = 0;
  currentWord = "";
});



/*
Error message
*/
$( function() {
  $( "#message" ).dialog({
    modal: true,
    autoOpen: false,
    buttons: {
      Ok: function() {
        $( this ).dialog( "close" );
      }
    }
  });
});

$(document).ready(function () {
  var i;
  for (i = 0; i < 7; i++)
  {
    refreshTile(i);
  }
  $("#tileCount").html("Tiles Left: " + tilesLeft)
});
