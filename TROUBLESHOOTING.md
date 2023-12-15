## TROUBLESHOOTING

### Issues with `keras.models.load_model`

`ValueError: Layer 'conv1/conv' expected 1 variables, but received 0 variables during loading. Expected: ['conv1/conv/kernel:0']`

This will occur when you will try to load a `.keras` model with a certain version of keras. The simplest solution is to use `.h5` model format. You can downgrade the keras version that is compatible with `.h5` model files.
