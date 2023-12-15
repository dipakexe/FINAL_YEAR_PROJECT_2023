/**
 * This code is basically handles the image selector
 **/

const $ = (selector) => window.document.querySelectorAll(selector);

const image_container = $("#image-container")[0];
const input_image_file = $("#input-image-file")[0];
const input_image_element = $("img")[0];
const select_image_label = $("#select-image-label")[0];
const comment_on_outcome = $(".comment-on-outcome")[0];
const submit_button = $('button[type="submit"]')[0];


submit_button.disabled = false; // the submit button will be enabled only if a valid image is selected.


var is_valid_image_selected = false;
var result_found = false;

/**
 * For Output section
 */
var pneumonia_probalibity_level_percentage_span = $(
  ".pneumonia-probalibity-level-percentage"
)[0];
var pneumonia_probalibity_level_bar_div = $(
  ".pneumonia-probalibity-level-bar"
)[0];

function update_result(percentage) {
  var current_width = 0;

  const update = () => {
    if (current_width < percentage) {
      current_width += 1;
      pneumonia_probalibity_level_bar_div.style.width = current_width + "%";
      pneumonia_probalibity_level_percentage_span.innerText = current_width;
      requestAnimationFrame(update);
    }
  };

  update();

  if (percentage < 30) {
    comment_on_outcome.innerText =
      "*Low probability of pneumonia. No prominent evidence of pneumonia.";
    pneumonia_probalibity_level_bar_div.style.backgroundColor =
      "rgb(191, 40, 148)";
  } else if (percentage < 60) {
    comment_on_outcome.innerText =
      "*Moderate probability of pneumonia. Consult a healthcare professional for further evaluation.";
    pneumonia_probalibity_level_bar_div.style.backgroundColor =
      "rgb(219, 196, 50)";
  } else if (percentage < 80) {
    comment_on_outcome.innerText =
      "*High probability of pneumonia. Need medical attention immediately.";
    pneumonia_probalibity_level_bar_div.style.backgroundColor =
      "rgb(245, 135, 25)";
  } else if (percentage > 80) {
    comment_on_outcome.innerText =
      "*Very high probability of pneumonia. An urgent medical attention is required.";
    pneumonia_probalibity_level_bar_div.style.backgroundColor =
      "rgb(240, 34, 34)";
  }
}

const output_section = $("section.output-section")[0];

function make_output_section_visible() {
  output_section.classList.remove("output-section-hidden");
}

function make_output_section_invisible() {
  output_section.classList.add("output-section-hidden");
}

function change_label(file) {
  const extention = file.name.split(".").pop().toLowerCase();

  switch (extention) {
    case "jpg":
    case "jpeg":
    case "png":
    case "webp":
      is_valid_image_selected = true;

      break;
    default:
      is_valid_image_selected = false;
      break;
  }

  if (!is_valid_image_selected) {
    select_image_label.classList.remove("hidden");
    submit_button.disabled = true;
  } else {
    select_image_label.classList.add("hidden");
    submit_button.disabled = false;
  }
}

image_container.onclick = function () {
  input_image_file.click();
};

input_image_file.onchange = (event) => {
  const file = event.target.files[0];

  if (file) {
    change_label(file);

    const reader = new FileReader();

    reader.onload = function (e) {
      input_image_element.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

/**
 *
 *  This part handles the result section.
 *
 *  1. Sends the data to the server
 *  2. Fetches the results of the model from the server
 *  3. Displays the output to the user.
 *  4. Reset the page (by reloading)
 *
 */

/**
 * Submit the user input
 */

var is_displaying_results = false;

const form = $("form")[0];

form.onsubmit = function (form_submit_event) {
  console.log("The form is submitted.");
  form_submit_event.preventDefault();
};

submit_button.onclick = function () {
  console.log("Sending data to the server...");

  const form_data = new FormData(form);

  fetch("/classify", {
    method: "POST",
    body: form_data,
  })
    .then((response) => response.json())
    .then((json_data) => {
      /**
       * Once the image is sent to the backend for making inference,
       * The backend will send the result immediatly.
       * The format of the result: Object { pneumonia_percentage: "a number", result_found: "true or false" }
       *
       */

      console.log(json_data);

      if (json_data["result"] === "true") {
        // valid response
        result_found = true;
      } else {
        result_found = false;
        // invalid response
      }

      update_result(json_data["pneumonia_percentage"]);

      if (!result_found) {
        make_output_section_visible();
      } else {
        make_output_section_invisible();
      }
    })
    .catch((error) => {
      console.error("Something went wrong when recieving JSON: ", error);
    });
};

/**
 * Handle reset
 **/

const reset_button = $('button[type="reset"]')[0];

reset_button.onclick = function () {
  window.location.reload();
};
