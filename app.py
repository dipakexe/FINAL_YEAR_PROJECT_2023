import os
from io import BytesIO

os.environ[
    "TF_CPP_MIN_LOG_LEVEL"
] = "3"  # 3 - don't display tf messages only fatal errors.

import numpy as np
from PIL import Image
import tensorflow as tf
from tensorflow.keras.models import load_model


from flask import Flask, request, render_template, jsonify, send_file

from scripts.logging import log_message
from scripts.download_model import fetch_model
from scripts.preprocessing import preprocess_image

app = Flask(__name__)

lung_disease_classifier = None


def load_model_for_inference():
    global lung_disease_classifier

    # This will make sure if model file is downloaded, Otherwise it will download it.
    model_path = fetch_model()

    if not lung_disease_classifier:
        log_message("Model is not loaded.. loading model...")
        lung_disease_classifier = tf.keras.models.load_model(model_path)
        log_message("Model Loaded into memory.")

    else:
        log_message("Model was already loaded into memory.")


# When the app is initialized the model will be loaded in the memory
load_model_for_inference()


def classify_image(image_file):
    """
    Steps:
        - apply pre-processing to the image.
        - make the inference from the model.
        - calculate the probability of pneumonia.
        - return as a percentage
    """

    # Process the image file to make inference from the model
    processed_image = preprocess_image(image_file=image_file)

    # check if the model is loaded
    if lung_disease_classifier:
        log_message("Making inference on the recieved x-ray image.")
        prediction = lung_disease_classifier.predict(processed_image, verbose=0)

        pneumonia_probability = prediction[0][0]
        pneumonia_percentage = round(pneumonia_probability * 100, 5)
        return pneumonia_percentage
    else:
        return 0


@app.route("/classify", methods=["POST"])
def classify():
    """
    API for the frontend
    """

    if request.method == "POST":
        image_file = request.files.get("input-image-file", None)

        log_message(f"Recived image file {image_file.filename}")

        if not image_file:
            response_for_client = jsonify(
                {
                    "result_found": "true",
                    "pneumonia_percentage": str(0),
                }
            )
        else:
            inference_result = classify_image(image_file=image_file)
            response_for_client = jsonify(
                {
                    "result_found": "true",
                    "pneumonia_percentage": str(inference_result),
                }
            )

        log_message("Sending response to client.")

        return response_for_client

    # Obviously it supports only POST method
    return jsonify({"error": "Method not allowed"}), 405


@app.get("/favicon.ico")
def favicon():
    return send_file("favicon.ico", as_attachment=True)


@app.get("/")
def home_page():
    """
    This is the home page.
    """

    # This will load the model into the memory if not loaded.
    load_model_for_inference()

    return render_template("index.html")


"""
use a WSGI server in production
"""
