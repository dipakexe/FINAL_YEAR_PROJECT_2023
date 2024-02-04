from PIL import Image
import tensorflow as tf
from flask import Blueprint, jsonify, request


# When the app is initialized the model will be loaded in the memory
lung_disease_classifier = None

from utils.fetch_model import fetch_model
from utils.preprocess_image import preprocess_image


def is_valid_image(image_file):
    try:
        Image.open(image_file.stream)
        return True
    except Exception as e:
        return False


def load_model_for_inference():
    """
    This makes sure the model is loaded into memory.
    """

    global lung_disease_classifier

    model_path = fetch_model()

    if not lung_disease_classifier:
        print("Model is not loaded.. loading model...")
        lung_disease_classifier = tf.keras.models.load_model(model_path)
        print("Model Loaded into memory.")

    else:
        print("Model was already loaded into memory.")


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
    elif lung_disease_classifier == None:
        return 0


load_model_for_inference()

classify_blueprint = Blueprint("classify", __name__)


@classify_blueprint.post("/classify")
def classify():
    """
    This is the API for the frontend.

    The client application will send an image of a x-ray.
    The x-ray sent by the client will be processed and passed through
    the model for making inference. The model is trained to find the
    probability of pneumonia from the x-rays.

    Finally the result of the inference will be sent back to the client application to display it to the front user.
    """

    image_file = request.files.get("input-image-file", None)

    if not is_valid_image(image_file):
        response_for_client = jsonify(
            {
                "result_found": "false",
                "reason": "No image file provided.",
            }
        )
    else:
        print(
            f"Making inference on/detecting pneumonia from image file {image_file.filename}..."
        )
        inference_result = classify_image(image_file=image_file)
        response_for_client = jsonify(
            {
                "result_found": "true",
                "pneumonia_percentage": str(inference_result),
            }
        )

    print("Sending response to client...")
    return response_for_client
