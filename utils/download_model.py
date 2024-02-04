# This script downloads and saves the model at location 'models/lung_disease_model.keras'.

import os
import requests
from tqdm import tqdm


def download_pretrained_model_file_from_github(
    model_url, destination_dir, output_filename
):
    """
    This function takes 3 parameters:
        - model_url: It is the github url of the model file
        - destination_dir: The folder to save the model
        - output_filename: The name to store the model as
    """

    try:
        # URL to download the model and path to save the model
        model_url = model_url
        destination_path = os.path.join(destination_dir, output_filename)

        if os.path.exists(destination_path):
            print(
                f"Model file '{output_filename}' already exists at {destination_dir}. Skipping download."
            )
            return

        # Request the resource
        response = requests.get(model_url, stream=True)

        if response.status_code == 200:
            # Start the progress bar if file is found in the source repository.
            print(
                "Model file was not found at specified location. Started downloading..."
            )
            total_size = int(response.headers.get("content-length", 0))
            progress_bar = tqdm(total=total_size, unit="B", unit_scale=True)
        elif response.status_code == 404:
            # Exit the program if file is not found
            print("File not found at specified url.")
            return

        # Start downloading the file.
        with open(destination_path, "wb") as f:
            # Download the file in parts
            for chunk in response.iter_content(chunk_size=1024):
                if chunk:
                    f.write(chunk)
                    # Update the progress bar
                    progress_bar.update(len(chunk))

        # Stop the progress bar when the file is downloaded.
        progress_bar.close()

        print(f"Pretrained model file saved to {destination_path}")
        return destination_path

    except Exception as e:
        # In case of connection is not established.
        print(f"Can't download model file: {e}")
