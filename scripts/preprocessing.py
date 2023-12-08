from scripts.logging import log_message
import numpy as np
from PIL import Image
import tensorflow as tf


def preprocess_image(image_file):
    """
    Steps:
        - Load the image file into a Pillow Image
        - Convert the image object to immage array for processing
        - Resize the image to 224x224 so that the model can take it as input
        - Normalize the pixel intensities to from 0-255 to 0.0-1.0
        - Reshape the single image as batch of (None, 224, 224, 3). This is the expected input for the model.
    """

    log_message("Pre-processing the image...")

    img_array = np.array(Image.open(image_file.stream).convert("RGB"))

    img_array = tf.image.resize(img_array, (224, 224))
    img_array = tf.keras.preprocessing.image.img_to_array(img_array)

    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    return img_array
