from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from recommendation.scripts.app import CarRecommender 

app = Flask(__name__)
CORS(app)

TEMP_DIR = "temp_uploads"
if not os.path.exists(TEMP_DIR):
    os.makedirs(TEMP_DIR)
    
SAVED_MODEL_DIR = './recommendation/models'
recommender = CarRecommender()

if not recommender.load_model(SAVED_MODEL_DIR):
    print("⚠️ Recommender endpoints will be disabled.")
    recommender = None
    
@app.route('/api', methods=['GET'])
def hello():
    return jsonify({"Success": "API is working"})

@app.route('/api/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided in the request"}), 400
    
    file = request.files['image']
    
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400
    
    if file:
        temp_path = os.path.join(TEMP_DIR, file.filename)
        file.save(temp_path)
        
        try:
            detections = [{"error": "Object detection logic not connected"}]
        except Exception as e:
            if os.path.exists(temp_path):
                os.remove(temp_path)
            return jsonify({"error": f"An error occurred during prediction: {e}"}), 500

        if os.path.exists(temp_path):
            os.remove(temp_path)
        
        return jsonify({"detections": detections})
        
    return jsonify({"error": "Invalid file"}), 400

@app.route('/api/recommend/<int:car_id>', methods=['GET'])
def recommend_by_id(car_id):
    if recommender is None:
        return jsonify({"error": "Recommendation model is not available. Check server logs."}), 503
    try:
        recommendations_df = recommender.get_recommendations_by_id(car_id, num_recommendations=5)
        if isinstance(recommendations_df, str):
             return jsonify({"error": recommendations_df}), 404
        result = recommendations_df.to_dict(orient='records')
        return jsonify({"recommendations": result})
    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {e}"}), 500

@app.route('/api/recommend/by-features', methods=['POST'])
def recommend_by_features():
    if recommender is None:
        return jsonify({"error": "Recommendation model is not available. Check server logs."}), 503
    
    features = request.get_json()
    if not features:
        return jsonify({"error": "No features provided in the request body."}), 400
    try:
        recommendations_df = recommender.get_recommendations_by_features(features, num_recommendations=5)
        result = recommendations_df.to_dict(orient='records')
        return jsonify({"recommendations": result})
    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {e}"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)