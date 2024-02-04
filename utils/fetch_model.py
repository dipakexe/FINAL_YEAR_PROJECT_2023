from utils.download_model import download_pretrained_model_file_from_github


model_dir = "models/"  # Directory to store the pre-trained model.
output_filename = "lung_disease_model.h5"  # The filename for the model.
model_url = "https://raw.githubusercontent.com/dipakexe/lung-disease-detection-models/main/lung_disease_model.h5"  # The URL were the model is stored.


import os


def fetch_model():
    # This will make sure if model file is downloaded, Otherwise it will download it.

    if not os.path.exists(model_dir):
        os.makedirs(model_dir)

    dest = os.path.join(model_dir, output_filename)

    if not os.path.exists(dest):
        dest = download_pretrained_model_file_from_github(
            model_url=model_url,
            destination_dir=model_dir,
            output_filename=output_filename,
        )

    return dest
