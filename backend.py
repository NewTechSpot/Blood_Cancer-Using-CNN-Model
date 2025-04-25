from flask import Flask, request, render_template, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
import os

app = Flask(__name__)
model = tf.keras.models.load_model("final_model.h5")

IMG_SIZE = 224
CLASS_NAMES = ["Eosinophil", "Lymphocyte", "Monocyte", "Neutrophil"]  # Replace with your actual class labels

def preprocess_image(image):
    image = image.resize((IMG_SIZE, IMG_SIZE))
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)
    return image

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['image']
    image = Image.open(file.stream)
    image = preprocess_image(image)
    
    prediction = model.predict(image)
    class_index = np.argmax(prediction)
    confidence = float(np.max(prediction))
    
    return jsonify({
        'prediction': CLASS_NAMES[class_index],
        'confidence': f"{confidence:.2f}"
    })

if __name__ == '__main__':
    app.run(debug=True)
