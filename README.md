## FINAL YEAR PROJECT 2023 (RE-CREATION)

- This project is the **reconstruction** of my final year project for the Bachelor of Science in Computer Science.
- When we're creating the project for the final year project work assessment I didn't thought of Transfer Learning technique for the Model Building process.
- I continued with the experimentation and found that Transfer Learning would be a great choice and help us to build a more accurate solution according to our problem statement.
- Building the same model on the top of pre-trained weights saves a lot of time usually consumed when training a model from scratch.

### MOTIVATION AND GOAL

- The primary aim of this project is to incorporate the **recommendations** provided by the esteemed Examiner after the presentation of the original project.

### RUN LOCALLY

- Simply run `gunicorn app:app`, It will automatically download the the pre-trained model from [here](https://github.com/dipakexe/lung-disease-detection-models) and save it to`models/` directory. Then It will start the server. (Optionally) You can also train the model of your own if you want. 

> For production use `gunicorn -b 0.0.0.0 wsgi:app`

### TROUBLESHOOTING

- Make sure python (>3.10) and flask is installed properly.
- Make sure the latest version of tensorflow and keras is installed.
- Make sure the the pre-trained model file is in the supported file extension.