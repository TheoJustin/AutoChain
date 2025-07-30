from ultralytics import YOLO
import os

try:
    model = YOLO("models/yolo11n.pt")
except Exception as e:
    print(f"Error loading model: {e}")
    exit()

class_mapping = {i: "illegal" for i in range(80)}
class_mapping[2] = "legal"

def perform_detection(image_path, conf_threshold=0.25):
    results = model.predict(source=image_path, conf=conf_threshold)
    
    detections = []
    
    if not results:
        return detections

    result = results[0]
    for box in result.boxes:
        class_id = int(box.cls[0])
        confidence = float(box.conf[0])
        x1, y1, x2, y2 = map(int, box.xyxy[0])
        
        mapped_class = class_mapping.get(class_id, "unknown") 
        
        detection_data = {
            "class": mapped_class,
            "confidence": confidence,
            "bbox": [x1, y1, x2, y2]
        }
        detections.append(detection_data)
        
    return detections