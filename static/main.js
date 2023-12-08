/**
 * This code is basically handles the image selector
 **/

const $ = (selector) => window.document.querySelectorAll(selector);

const image_container = $("#image-container")[0];
const input_image_file = $("#input-image-file")[0];
const input_image_element = $("img")[0];
const select_image_label = $("#select-image-label")[0];

var is_valid_image_selected = false;

function change_label(file) {
  const extention = file.name.split(".").pop().toLowerCase();

  switch (extention) {
    case "jpg":
    case "jpeg":
    case "png":
      is_valid_image_selected = true;
      break;
    default:
      is_valid_image_selected = false;
      break;
  }

  if (!is_valid_image_selected) {
    select_image_label.classList.remove("hidden");
  } else {
    select_image_label.classList.add("hidden");
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

const submit_button = $('button[type="submit"]')[0];
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

      if (json_data["result"] === "true") {
        // valid response
      } else {
        // invalid response
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
