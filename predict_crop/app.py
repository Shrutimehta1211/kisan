import numpy as np
from flask import Flask, request, jsonify, render_template
import pickle

app = Flask(__name__)
model = pickle.load(open('model.pkl', 'rb'))

str=" "

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict',methods=['POST'])
def predict():
    '''
    For rendering results on HTML GUI
    '''
    json_data = request.get_json()
    if request.method == 'POST':
        if not json_data:
            return jsonify({'success': False}), 400
    N = int(json_data.get('nitrogen'))
    P = int(json_data.get('phosphorus'))
    K = int(json_data.get('potassium'))
    temperature = float(json_data.get('temperature'))
    humidity = float(json_data.get('humidity'))
    ph = float(json_data.get('ph'))
    rainfall = float(json_data.get('rainfall'))
    water = float(json_data.get('water'))
    final_features =  np.array([[N, P, K, temperature, humidity, ph, rainfall, water]])
    prediction = model.predict(final_features)

    s= str.join(prediction)

    # output = round(prediction[0], 2)

    return jsonify({'message': 'The predicted crop is {}'.format(s)})


if __name__=="__main__":
    app.run(debug=True)
