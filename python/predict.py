
"""
PredIT ML Model Prediction Service
Loads trained sklearn models and makes predictions
"""

import json
import pickle
import sys
from pathlib import Path
import numpy as np
from http.server import HTTPServer, BaseHTTPRequestHandler
import urllib.parse
import os

# Get the path to the model directory
MODEL_DIR = Path(__file__).parent / "models"

class ModelPredictor:
    def __init__(self):
        self.model = None
        self.scaler = None
        self.school_encoder = None
        self.gender_encoder = None
        self.feature_columns = None
        self.label_map = None
        self.load_models()
    
    def load_models(self):
        """Load all pickle files from the model directory"""
        try:
            # Load main model
            with open(MODEL_DIR / "model.pkl", "rb") as f:
                self.model = pickle.load(f)
            
            # Load scaler
            with open(MODEL_DIR / "scaler.pkl", "rb") as f:
                self.scaler = pickle.load(f)
            
            # Load encoders
            with open(MODEL_DIR / "school_encoder.pkl", "rb") as f:
                self.school_encoder = pickle.load(f)
            
            with open(MODEL_DIR / "gender_encoder.pkl", "rb") as f:
                self.gender_encoder = pickle.load(f)
            
            # Load feature columns
            with open(MODEL_DIR / "feature_columns.pkl", "rb") as f:
                self.feature_columns = pickle.load(f)
            
            # Load label map
            with open(MODEL_DIR / "label_map.json", "r") as f:
                self.label_map = json.load(f)
            
            print("✓ All models loaded successfully")
            return True
        except FileNotFoundError as e:
            print(f"✗ Error loading models: {e}")
            return False
    
    def predict(self, input_data):
        """
        Make a prediction using the loaded model
        
        Args:
            input_data: dict with all the required features
        
        Returns:
            dict with prediction and confidence
        """
        try:
            # Prepare the feature array
            features = self._prepare_features(input_data)
            
            # Scale features
            features_scaled = self.scaler.transform([features])
            
            # Make prediction
            prediction = self.model.predict(features_scaled)[0]
            prediction_proba = self.model.predict_proba(features_scaled)[0]
            
            # Get confidence
            confidence = float(max(prediction_proba) * 100)
            
            # Return result
            return {
                "score": int(prediction),
                "confidence": round(confidence, 1),
                "status": "success"
            }
        except Exception as e:
            return {
                "error": str(e),
                "status": "error"
            }
    
    def _prepare_features(self, input_data):
        """Prepare input data into the format expected by the model"""
        features = []
        
        for col in self.feature_columns:
            if col in input_data:
                value = input_data[col]
                
                # Handle encoded categorical features
                if col == "School" and hasattr(self, 'school_encoder'):
                    value = self.school_encoder.transform([value])[0]
                elif col == "Gender" and hasattr(self, 'gender_encoder'):
                    value = self.gender_encoder.transform([value])[0]
                elif isinstance(value, str) and value in self.label_map:
                    value = self.label_map[value]
                
                features.append(float(value))
            else:
                # Default value for missing features
                features.append(0.0)
        
        return features


# Initialize the predictor
predictor = ModelPredictor()


class PredictionHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        """Handle POST requests for predictions"""
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length).decode("utf-8")
        
        try:
            data = json.loads(body)
            result = predictor.predict(data)
            
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps(result).encode())
        except json.JSONDecodeError:
            self.send_response(400)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"error": "Invalid JSON"}).encode())
    
    def do_OPTIONS(self):
        """Handle CORS preflight requests"""
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
    
    def log_message(self, format, *args):
        """Suppress default logging"""
        pass


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8001))
    server = HTTPServer(("localhost", port), PredictionHandler)
    print(f"Prediction server running on port {port}")
    server.serve_forever()
