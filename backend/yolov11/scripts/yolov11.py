from ultralytics import YOLO
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)
model = YOLO("models/yolo11n.pt")

class_mapping = {
    0: "illegal",
    14: "illegal",
    15: "illegal",
    16: "illegal",
    17: "illegal",
    18: "illegal",
    19: "illegal",
    20: "illegal",
    21: "illegal",
    22: "illegal",
    23: "illegal",
    34: "illegal",
    **{i: "legal" for i in range(80) if i not in [0, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 34]}
}

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    temp_path = "temp_image.jpg"
    file.save(temp_path)
    
    results = model.predict(source=temp_path, conf=0.25)
    
    detections = []
    for result in results:
        for box in result.boxes:
            class_id = int(box.cls[0])
            confidence = float(box.conf[0])
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            
            mapped_class = class_mapping[class_id]
            detection = {
                "class": mapped_class,
                "confidence": confidence,
                "bbox": [x1, y1, x2, y2]
            }
            detections.append(detection)

    if os.path.exists(temp_path):
        os.remove(temp_path)
    
    return jsonify({"detections": detections})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)