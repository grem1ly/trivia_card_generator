/* Trivia Card Generation Options */

// Display options for trivia card generation: either upload your own cards (i.e. questions, options, answers) or manually create your own
function prompt_card_generation(){

  var screen_size_match = window.matchMedia("(max-width: 600px)");

  if (screen_size_match.matches) {
    var format_screen = document.getElementById("format_sidenav");
    format_screen.style.height = "0";
    format_screen.style.transition = "all 0.5s";
    setTimeout(function(){
      document.getElementById("continue_button_wrap").style.display = "none";
    }, 325);
  }
  else {
    document.getElementById("continue_button_wrap").style.display = "none";
    var format_screen = document.getElementById("format_sidenav");
    format_screen.style.width = "0";
    format_screen.style.transition = "width 0.5s";

  }

  setTimeout(function() { document.getElementById("card_generator_wrap").style.display = "flex" }, 525);
  document.getElementById("template").style.display = "none";
  animate_card();
}

// Enable animation delays for specific text areas and iterations
function animate_card(){
  var text_divs = document.querySelectorAll("div.card-animation > p");

  text_divs.forEach((text_div, i) => {
      setTimeout(() => {
        automate_text(text_div, i);
      }, i * 3500);
  });

  // Work around for text-automation wrapping (i.e. center text within the div after typing it on single line)
  setTimeout(function() {
    text_divs[0].style.whiteSpace = "normal";
  }, 3250);

  setTimeout(function() {
    for(var i = 0; i < text_divs.length; i++){
      text_divs[i].style.width = "0";
      text_divs[i].style.whiteSpace = "nowrap";
    };
    animate_card();
  }, 20000);
}

// Set animation specifications and animate each text area
function automate_text(text_div, i) {

  text_div.style.width = "auto";

  var keyframes = [{
    maxWidth: "0",
    borderRight: "transparent",
    opacity: 1,
  }, {
    maxWidth: "0",
    borderRight: ".15em solid black",
    opacity: 1,
  }, {
    maxWidth: "100%",
    borderRight: ".15em solid black",
    opacity: 1,
  }, {
    maxWidth: "100%",
    borderRight: "transparent",
    opacity: 1,
  }, {
    maxWidth: "100%",
    borderRight: "transparent",
    opacity: 1,
  }, {
    maxWidth: "100%",
    borderRight: "transparent",
    opacity: 1,
  }, {
    maxWidth: "100%",
    borderRight: "transparent",
    opacity: 1,
  }, {
    maxWidth: "100%",
    borderRight: "transparent",
    opacity: 1,
  }, {
    maxWidth: "100%",
    borderRight: "transparent",
    opacity: 1,
  }, {
    maxWidth: "100%",
    borderRight: "transparent",
    opacity: 1,
  }, {
    maxWidth: "100%",
    borderRight: "transparent",
    opacity: 1,
  }];

  var options = {
    duration: 15000,
    iterations: 1,
    easing: "steps(225, end)",
    fill: "forwards",
  }

  text_div.animate(keyframes, options);
}

// Alter display based on upload trivia card selection
function upload_content() {
  document.getElementById("manual_content").style.display = "none";
  var upload_selection = document.getElementById("upload_content");
  upload_selection.style.width = "75%";
  upload_selection.style.background = "whitesmoke";
  upload_selection.classList.add("nohover");
  upload_selection.style.cursor = "default";

  var screen_size_match = window.matchMedia("(max-width: 600px)");
  if (screen_size_match.matches) {
    upload_selection.style.top = "50%";
    upload_selection.style.left = "50%";
    upload_selection.style.height = "80%";
    upload_selection.style.position = "absolute";
    upload_selection.style.transform = "translate(-50%, -50%)";
    upload_selection.style.overflow = "hidden";
    document.querySelector("#upload_content div:nth-child(2)").style.padding = "10px";
  }

  document.getElementById("upload_file").style.display = "flex";
}

// Alter display based on manual entry selection
function manual_entry() {
  document.getElementById("card_generator_wrap").style.display = "none";
  document.getElementById("trivia_cards").style.display = "flex";
  new_card("", new Array(3).fill(""), "")

}
