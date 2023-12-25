from scripts.download_model import (
    download_pretrained_model_file_from_github,
    model_dir,
    model_url,
    output_filename,
)


import os


def fetch_model():
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
