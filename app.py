__todo__ = """

Use a WSGI server in production environment.

TODO: 

- Separate the server and inference logic completely.
- Split the functions into smaller functions for better readability.

"""

from scripts.fetch_model import fetch_model
from scripts.preprocess_image import preprocess_image


from flask import Flask, request, render_template, jsonify, send_file


import os
from io import BytesIO

os.environ[
    "TF_CPP_MIN_LOG_LEVEL"
] = "3"  # 3 - don't display tf messages only fatal errors.

import numpy as np
from PIL import Image
import tensorflow as tf


app = Flask(__name__)
lung_disease_classifier = None


def load_model_for_inference():
    global lung_disease_classifier

    # This will make sure if model file is downloaded, Otherwise it will download it.
    model_path = fetch_model()

    if not lung_disease_classifier:
        print("Model is not loaded.. loading model...")
        lung_disease_classifier = tf.keras.models.load_model(model_path)
        print("Model Loaded into memory.")

    else:
        print("Model was already loaded into memory.")


# When the app is initialized the model will be loaded in the memory
load_model_for_inference()


def convert_probability_to_percentage(x):
    return round(x * 100, 2)


def classify_image(image_file):
    """
    - Apply pre-processing to the image.
    - Make the inference from the model.
    - Calculate the probability of pneumonia.
    - Return as a percentage
    """

    processed_image = preprocess_image(image_file=image_file)

    if lung_disease_classifier:
        prediction = lung_disease_classifier.predict(processed_image, verbose=0)
        return convert_probability_to_percentage(prediction[0][0])
    else:
        return 0


@app.post("/classify")
def classify():
    # API for the frontend

    image_file = request.files.get("input-image-file", None)

    print(f"Received image file {image_file.filename}")

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

    print("Sending response to client.")

    return response_for_client


@app.get("/")
def home_page():
    load_model_for_inference()  # This will load the model into the memory if not loaded.
    return render_template("index.html")


@app.get("/favicon.ico")
def favicon():
    return send_file("favicon.ico", as_attachment=True)
