## FINAL YEAR PROJECT 2023 (RE-CREATION)
- This project is the **reconstruction** of my final year project for the Bachelor of Science in Computer Science.
- During the initial development for the final year project work assessment, Transfer Learning technique was not considered for the Model Building process.
- Through experimentation, I discovered that Transfer Learning is a great choice, enabling the use of pre-trained weights for DenseNet-121 trained on a vast ImageNet Dataset.
- I utilized the pre-trained weights of DenseNet-121 trained on ImageNet dataset to speeds up the development process and enhances the accuracy of the solution based on our problem statement.
- The primary goal is to incorporate the **recommendations** provided by the esteemed Examiner after the presentation of the original final year project.

### RUN LOCALLY

- Simply run `gunicorn app:app`, It will automatically download the the pre-trained model from [here](https://github.com/dipakexe/lung-disease-detection-models) and save it to`models/` directory. Then It will start the server. (Optionally) You can also train the model of your own if you want. 

> For production use `gunicorn -b 0.0.0.0 wsgi:app`

### TROUBLESHOOTING

- Make sure python (>3.10) and flask is installed properly.
- Make sure the latest version of tensorflow and keras is installed.
- Make sure the the pre-trained model file is in the supported file extension.