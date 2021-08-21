/* Trivia Card Generator */

// Set count to establish unique ids for each card - necessary for retroactive changes
var count = 1;

// Enable the reading of a tsv file for content extraction (assume tsv format: question option1 option2 option3 answer)
  // Enable work around for fake filepath: strip path to file name (assume specified directory location - for now it's just the same as the index.html)
async function get_questions(trivia_card_upload){

  document.getElementById("card_generator_wrap").style.display = "none";
  document.getElementById("trivia_cards").style.display = "flex";

  trivia_card_upload = trivia_card_upload.toString().split("\\").pop();
  let trivia_questions = await read_trivia_content("./data/" + trivia_card_upload);

  for (var i = 0; i < trivia_questions.length; i++){
    let question = trivia_questions[i][0];
    let options = trivia_questions[i].slice(1, 4);
    let answer = trivia_questions[i][4]

    new_card(question, options, answer);
  }
}

// Enable retroactive changes for each generated trivia card
  // Current options: Alter text and font size
function fill(id, selection) {

  if (document.getElementById(id).innerHTML.length > 3) {
    var ask = confirm("Keep as is?");
    if (ask) {
      var size = confirm("Keep same size?");
      if (size) {
      }
      else {
        var font_size = prompt("Enter size");
        document.getElementById(id).style.fontSize = font_size + "px";
      }
    }
    else {
      var change = prompt("Edit", document.getElementById(id).innerHTML);
        document.getElementById(id).innerHTML = change;
    }
  }
  else {
    if (selection == "question"){
      var insert = prompt("Enter question");
    }
    else if (selection == "option"){
      var insert = prompt("Enter option");
    }
    else{
      var insert = prompt("Enter answer");
    }
    document.getElementById(id).innerHTML += insert;
  }
}

// Generate each trivia card and set to color specified during formatting stage
function new_card(question, options, answer) {

  var color = window.getComputedStyle(document.querySelector(".front_template")).backgroundColor;

  var main_front = document.getElementById("card_fronts");
  var main_back = document.getElementById("card_backs");

  if (document.getElementsByClassName("new_card_button").length > 0){
    var initial_button = document.getElementsByClassName("new_card_button");
    initial_button[initial_button.length - 1].style.visibility = "hidden";
  }

  var new_front = document.createElement('div');
  new_front.className = "front_template";

  var back_container = document.createElement('div');
  back_container.style.display = "flex";
  back_container.style.flexDirection = "column";
  back_container.style.gap = "10px";
  back_container.style.alignItems = "center";

  var new_back = document.createElement('div');
  new_back.className = "back_template";
  var back_insert = document.createElement('div');
  back_insert.className = "inner_rect";

  var question_div = document.createElement('div');
  question_div.className = "question";
  question_div.id = "question_" + count;
  question_div.innerHTML = question;
  question_div.onclick = function(){fill(question_div.id, "question")};

  var option1_div = document.createElement('div');
  option1_div.className = "option";
  option1_div.id = "option1_" + count;
  option1_div.innerHTML = options[0];
  option1_div.onclick = function(){fill(option1_div.id, "option")};
  var option2_div = document.createElement('div');
  option2_div.className = "option";
  option2_div.id = "option2_" + count;
  option2_div.innerHTML = options[1];
  option2_div.onclick = function(){fill(option2_div.id, "option")};
  var option3_div = document.createElement('div');
  option3_div.className = "option";
  option3_div.id = "option3_" + count;
  option3_div.innerHTML = options[2];
  option3_div.onclick = function(){fill(option3_div.id, "option")};

  var answer_div = document.createElement('div');
  answer_div.className = "answer";
  answer_div.id = "answer_" + count;
  answer_div.innerHTML = answer;
  answer_div.onclick = function(){fill(answer_div.id, "answer")};

  // Randomize the location of the answer div for diversity
  var my_array = [1,2,3,4];
  var temp1 = Math.floor(Math.random() * 4) + 1;
  x1 = my_array.indexOf(temp1);
  my_array.splice(x1, 1);
  var temp2 = my_array[Math.floor(my_array.length * Math.random())];
  x2 = my_array.indexOf(temp2);
  my_array.splice(x2, 1);
  var temp3 = my_array[Math.floor(my_array.length * Math.random())];
  x3 = my_array.indexOf(temp3);
  my_array.splice(x3, 1);
  var temp4 = my_array[0];

  back_insert.appendChild(question_div);

  for (var i = 1; i < 5; i++) {

    var letter = (i + 9).toString(14).toUpperCase();

    if (temp1 == i) {
      option1_div.innerHTML = letter + ". " + option1_div.innerHTML;
      back_insert.appendChild(option1_div);
    }
    else if (temp2 == i) {
      option2_div.innerHTML = letter + ". " + option2_div.innerHTML;
      back_insert.appendChild(option2_div);
    }
    else if (temp3 == i) {
      option3_div.innerHTML = letter + ". " + option3_div.innerHTML;
      back_insert.appendChild(option3_div);
    }
    else if (temp4 == i) {
      answer_div.innerHTML = letter + ". " + answer_div.innerHTML;
      back_insert.appendChild(answer_div);
    }
  }

  new_back.appendChild(back_insert);
  back_container.appendChild(new_back);

  var button = document.createElement('input');
  button.type = "button";
  button.onclick = function(){new_card("", new Array(3).fill(""), "", color)};
  button.className = "new_card_button";
  button.value = "Add Card";
  button.style.position = "relative";
  button.style.zIndex = "50";
  back_container.appendChild(button);
  main_back.appendChild(back_container);

  set_color(color);

  count++;
}
