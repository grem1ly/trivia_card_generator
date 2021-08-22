/* Trivia Card Information and Formatting */

// Display/hide the information panel if the information icon is clicked
function info(option) {
  var trivia_info = document.getElementById("trivia_info");
  var card_template = document.getElementById("template");

  if (option == "display") { set_display(card_template, trivia_info) }
  else { set_display(trivia_info, card_template) }
}

function set_display(hide, reveal) {
  hide.style.opacity = "0";
  setTimeout(function() {
    hide.style.display = "none";
    reveal.style.display = "flex";
    reveal.style.opacity = "1";
  }, 300);
}

// Display the formatting screen: customize the look of the trivia cards
  // Only color can be changed at this time (the development of more customization privledges are underway)
function start(){
  display_color_options();

  document.getElementById("homepage_title").style.display = "none";
  document.getElementById("start_button_wrap").style.display = "none";

  var screen_size_match = window.matchMedia("(max-width: 600px)");

  if (screen_size_match.matches) {
    var format_screen = document.getElementById("format_sidenav");
    format_screen.style.height = "42%";
    format_screen.style.transition = "all 0.5s";

    var template = document.getElementById("template");
    template.style.top = "0";
    template.style.marginTop = "10px";
    template.style.transform = "translateX(50%)";
    template.style.transition = "all 0.5s";
    document.getElementById("continue_button_wrap").style.display = "flex";
  }
  else {
    var format_screen = document.getElementById("format_sidenav");
    format_screen.style.width = "35%";
    format_screen.style.transition = "width 0.5s";

    var template = document.getElementById("template");
    template.style.width = "65%";
    template.style.right = "0%";
    template.style.transform = "translateY(-50%)"
    template.style.transition = "width 0.5s";

    setTimeout(function() {   document.getElementById("continue_button_wrap").style.display = "flex"; }, 500);
  }
}

// Present pre-selected colors for the trivia cards
var hex_codes = ["#537E90", "#F3AD2C", "#FFCCDD", "#B08EA2", "#3F6C51", "#48C9B0", "#D35400", "#EC7063", "#3498DB", "#17202A"];

function display_color_options() {
  for(var i=0; i < hex_codes.length; i++) { display_color([hex_codes[i]]) };
}

var div_clicked; // tracks the color that has immediately been clicked

// Create the buttons for the pre-selected colors (and those added through the input_hex feature)
function display_color(hex){
  if (is_valid(hex) == true || document.getElementsByClassName("color_palette_square").length < hex_codes.length){
    var color_div = document.createElement("input");
    color_div.className = "color_palette_square";
    color_div.type = "button";
    color_div.style.background = hex;
    color_div.onclick = function(){
      set_color(hex);
      return div_clicked = hex;
     };
    color_div.onmouseover = function(){ set_color(hex) };
    color_div.onmouseout = function(){
      if (div_clicked == null) { set_color('rgb(225,43,42)') }
      else { set_color(div_clicked) }
    };
    document.getElementById("color_palette_squares").appendChild(color_div);
  }
}

// Check the validity of the inserted color
  // At the moment this controls for empty and duplicate inputs (more criteria will be added)
function is_valid(hex){
  if (hex == ""){ return false }
  else if (hex_codes.includes(hex)) {
    alert("You already have this color. Input another one.");
    return false;
  }
  hex_codes << hex;
  document.getElementById("input_hex").value = "";
  return true;
}

// Set the color of the template depending on selection
function set_color(hex){
  var front = document.getElementsByClassName("front_template");
  var back = document.getElementsByClassName("back_template");
  var option = document.getElementsByClassName("option");
  var answer = document.getElementsByClassName("answer");

  change_color(front, hex, "full");
  change_color(option, hex, "full");
  change_color(back, hex, "full");
  change_color(answer, hex, "partial");

}

// Change the color of the template depending on selection
function change_color(class_elements, hex, color_fill){

  for (var i = 0; i < class_elements.length; i++){
    if (color_fill != "partial"){
      class_elements[i].style.backgroundColor = hex;
    }
    class_elements[i].style.borderStyle = "solid";
    class_elements[i].style.borderWidth = "2px";
    class_elements[i].style.borderColor = hex;
  }
}
