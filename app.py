import os
import numpy as np
from PIL import Image
import tensorflow as tf

from flask import Flask, request, render_template, jsonify, send_file

from utils.fetch_model import fetch_model
from utils.preprocess_image import preprocess_image

from routes.classifier_route import classify_blueprint
from routes.home_route import home_blueprint


os.environ["TF_CPP_MIN_LOG_LEVEL"] = (
    "3"  # 3 - don't display tf messages only fatal errors.
)


app = Flask(__name__)


app.register_blueprint(classify_blueprint)
app.register_blueprint(home_blueprint)

if __name__ == "__main__":
    app.run(debug=False)
