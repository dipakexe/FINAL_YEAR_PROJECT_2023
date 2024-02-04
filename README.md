# FINAL YEAR PROJECT 2023 (RE-CREATION)

## About

- The main objective of this project is to **classify between normal and pneumonia affected chest x-rays**.
- This project is the **reconstruction** of my final year project for the Bachelor of Science in Computer Science.
- During the initial development for the final year project work assessment, Transfer Learning technique was not considered for the Model Building process.
- Through experimentation, I discovered that Transfer Learning is a great choice. I decided to use the pre-trained weights for DenseNet-121 trained on a vast ImageNet Dataset.
- I used pre-trained DenseNet-121 weights from the ImageNet dataset for the fast development to the solution. I used the newly built model on the labeled chest x-ray dataset for the detection of pneumonia in chest x-rays.
- The primary goal is to incorporate the **recommendations** provided by the esteemed Examiner after the presentation of the original final year project.

## Try it

- Clone this repository

```bash
git clone https://github.com/dipakexe/FINAL_YEAR_PROJECT_2023.git
```

- Build the frontend

```bash
npm run build
```

- Run the server

```bash
python app.py
```

> It will automatically download the the pre-trained model from [here](https://github.com/dipakexe/lung-disease-detection-models) and save it to`models/` directory. Then It will start the server.
