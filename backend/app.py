from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import numpy as np
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for all domains

# Load model and scalers
try:
    import os
    base_dir = os.path.dirname(os.path.dirname(__file__))
    model = joblib.load(os.path.join(base_dir, 'rf_model.joblib'))
    feature_columns = joblib.load(os.path.join(base_dir, 'feature_columns.joblib'))
    scaler_amount = joblib.load(os.path.join(base_dir, 'scaler_amount.joblib'))
    scaler_time = joblib.load(os.path.join(base_dir, 'scaler_time.joblib'))
    logger.info("Model and scalers loaded successfully")
except Exception as e:
    logger.error(f"Error loading model: {e}")
    model = None
    feature_columns = None
    scaler_amount = None
    scaler_time = None

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'features_count': len(feature_columns) if feature_columns else 0
    })

@app.route('/api/features', methods=['GET'])
def get_features():
    """Get list of required features"""
    if feature_columns is None:
        return jsonify({'error': 'Features not loaded'}), 500
    
    return jsonify({
        'features': feature_columns.tolist(),
        'total_features': len(feature_columns)
    })

@app.route('/api/predict', methods=['POST'])
def predict():
    """Predict fraud for a single transaction"""
    try:
        if model is None:
            return jsonify({'error': 'Model not loaded'}), 500
        
        data = request.json
        
        # Extract V1-V28 features
        feature_vector = []
        for feature in feature_columns:
            feature_vector.append(float(data.get(feature.lower(), 0)))
        
        # Make prediction
        prediction = model.predict([feature_vector])[0]
        probability = model.predict_proba([feature_vector])[0]
        
        # Get confidence scores
        fraud_probability = float(probability[1])
        normal_probability = float(probability[0])
        
        result = {
            'prediction': int(prediction),
            'is_fraud': bool(prediction == 1),
            'fraud_probability': fraud_probability,
            'normal_probability': normal_probability,
            'confidence': max(fraud_probability, normal_probability),
            'risk_level': get_risk_level(fraud_probability)
        }
        
        logger.info(f"Prediction made: {result}")
        return jsonify(result)
        
    except Exception as e:
        logger.error(f"Error in prediction: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/predict/batch', methods=['POST'])
def predict_batch():
    """Predict fraud for multiple transactions"""
    try:
        if model is None:
            return jsonify({'error': 'Model not loaded'}), 500
        
        data = request.json
        transactions = data.get('transactions', [])
        
        if not transactions:
            return jsonify({'error': 'No transactions provided'}), 400
        
        results = []
        for i, transaction in enumerate(transactions):
            try:
                # Extract V1-V28 features
                feature_vector = []
                for feature in feature_columns:
                    feature_vector.append(float(transaction.get(feature.lower(), 0)))
                
                # Make prediction
                prediction = model.predict([feature_vector])[0]
                probability = model.predict_proba([feature_vector])[0]
                
                results.append({
                    'transaction_id': i,
                    'prediction': int(prediction),
                    'is_fraud': bool(prediction == 1),
                    'fraud_probability': float(probability[1]),
                    'normal_probability': float(probability[0]),
                    'risk_level': get_risk_level(float(probability[1]))
                })
                
            except Exception as e:
                results.append({
                    'transaction_id': i,
                    'error': str(e)
                })
        
        return jsonify({'results': results})
        
    except Exception as e:
        logger.error(f"Error in batch prediction: {e}")
        return jsonify({'error': str(e)}), 500

def get_risk_level(fraud_probability):
    """Determine risk level based on fraud probability"""
    if fraud_probability >= 0.8:
        return 'HIGH'
    elif fraud_probability >= 0.5:
        return 'MEDIUM'
    elif fraud_probability >= 0.2:
        return 'LOW'
    else:
        return 'VERY_LOW'

if __name__ == '__main__':
    print("Starting Flask application...")
    print(f"Model loaded: {model is not None}")
    print(f"Features loaded: {feature_columns is not None}")
    app.run(debug=True, host='127.0.0.1', port=5000)
