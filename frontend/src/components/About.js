import React from 'react';
import { FaBrain, FaTree, FaChartLine, FaDatabase } from 'react-icons/fa';

const About = () => {
  return (
    <div className="card">
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
        About Credit Card Fraud Detection
      </h2>
      
      <div className="grid grid-2" style={{ marginBottom: '30px' }}>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <FaBrain style={{ fontSize: '4rem', color: '#667eea', marginBottom: '20px' }} />
          <h3>Machine Learning Powered</h3>
          <p>
            This system uses advanced machine learning algorithms to detect fraudulent 
            credit card transactions with high accuracy and minimal false positives.
          </p>
        </div>
        
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <FaTree style={{ fontSize: '4rem', color: '#51cf66', marginBottom: '20px' }} />
          <h3>Random Forest Algorithm</h3>
          <p>
            Built using Random Forest Classifier, which combines multiple decision trees 
            to provide robust and reliable fraud detection capabilities.<br />
            <strong>Note:</strong> The model uses only anonymized PCA features V1-V28 for prediction.
          </p>
        </div>
      </div>
      
      <div className="alert alert-warning">
        <h3><FaDatabase style={{ marginRight: '10px' }} />Dataset Information</h3>
        <p>
          The model is trained on a comprehensive dataset of credit card transactions.<br />
          <strong>Features used:</strong> Only V1-V28 (PCA transformed, anonymized).<br />
          Amount and Time are not used directly; all input features are anonymized for privacy.
        </p>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <h3><FaChartLine style={{ marginRight: '10px' }} />How It Works</h3>
        
        <div className="grid grid-1" style={{ gap: '20px', marginTop: '20px' }}>
          <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <h4>1. Data Input</h4>
            <p>
              Enter the 28 PCA-transformed features (V1-V28) which represent anonymized 
              transaction characteristics. You can analyze single transactions or upload CSV files for batch processing.
            </p>
          </div>
          
          <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <h4>2. Feature Processing</h4>
            <p>
              The system uses only the anonymized PCA features (V1-V28) for prediction.<br />
              No direct scaling of amount or time is performed.
            </p>
          </div>
          
          <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <h4>3. Prediction & Risk Assessment</h4>
            <p>
              The Random Forest model analyzes the transaction and provides a prediction along 
              with probability scores and risk levels (VERY_LOW, LOW, MEDIUM, HIGH).
            </p>
          </div>
          
          <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <h4>4. Result Interpretation</h4>
            <p>
              Results include fraud probability, confidence scores, and visual indicators 
              to help you make informed decisions about transaction legitimacy.
            </p>
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#e7f3ff', borderRadius: '8px' }}>
        <h3>Features & Benefits</h3>
        <div className="grid grid-2" style={{ marginTop: '15px' }}>
          <div>
            <h4>✅ Real-time Analysis</h4>
            <p>Get instant fraud detection results for individual transactions</p>
          </div>
          <div>
            <h4>✅ Batch Processing</h4>
            <p>Process multiple transactions simultaneously via CSV upload</p>
          </div>
          <div>
            <h4>✅ High Accuracy</h4>
            <p>Trained on comprehensive datasets for reliable predictions</p>
          </div>
          <div>
            <h4>✅ Risk Scoring</h4>
            <p>Detailed probability scores and risk level classification</p>
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#fff3cd', borderRadius: '8px' }}>
        <h3>⚠️ Important Notes</h3>
        <ul style={{ marginTop: '10px' }}>
          <li>This is a demonstration system for educational purposes</li>
          <li>Always verify suspicious transactions through additional security measures</li>
          <li>The model's performance may vary with different data distributions</li>
          <li>Regular model updates and retraining are recommended for production use</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
