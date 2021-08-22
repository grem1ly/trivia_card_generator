/* Event Listeners */

// Information Button: Enable the display of information for how to make your own trivia cards
document.querySelector(".fa").addEventListener("mouseover", function() { info("display") });
document.querySelector(".fa").addEventListener("mouseout", function() { info("hide") });

// Start Button: Promp formatting of trivia cards
document.getElementById("start_button").addEventListener("click", start);

// Input Hex Field: Input your own trivia card colors
var input_hex = document.getElementById("input_hex");
input_hex.addEventListener("change", function() { display_color(input_hex.value) });

// Reset Button: Reset trivia card color
document.getElementById("reset_button").addEventListener("click", function() { set_color('rgb(225,43,42)') });

// Continue Button: Prompt trivia card generation (upload cards or manually create)
document.getElementById("continue_button").addEventListener("click", prompt_card_generation);

// Create Trivia Card Buttons: Enable a choice of either uploading trivia content or manual entry
document.getElementById("upload_content").addEventListener("click", upload_content);
document.getElementById("manual_content").addEventListener("click", manual_entry);

// Upload Trivia Card Content Button: arrange question, options, and answer in tsv format
document.getElementById("upload_file_button").addEventListener("change", function() {
  parse(this.files[0]).then(file => {
    read_trivia_content2(file);
  });
});
