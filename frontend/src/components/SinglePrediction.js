import React, { useState } from 'react';
import api from '../api';
import toast from 'react-hot-toast';
import { FaExclamationTriangle, FaCheckCircle, FaSpinner } from 'react-icons/fa';

const SinglePrediction = () => {
  const [formData, setFormData] = useState({
    v1: '', v2: '', v3: '', v4: '', v5: '', v6: '', v7: '', v8: '', v9: '', v10: '',
    v11: '', v12: '', v13: '', v14: '', v15: '', v16: '', v17: '', v18: '', v19: '', v20: '',
    v21: '', v22: '', v23: '', v24: '', v25: '', v26: '', v27: '', v28: ''
  });
  
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleV1Paste = (e) => {
    // Get the pasted text
    const pastedText = (e.clipboardData || window.clipboardData).getData('text');
    
    // Check if the pasted text contains multiple numbers (comma or space separated)
    if (pastedText.includes(',') || pastedText.includes(' ')) {
      // Split by comma or space and clean up
      const values = pastedText.split(/[,\s]+/).map(v => v.trim()).filter(v => v !== '');
      
      // If we have exactly 28 values, populate all fields
      if (values.length === 28) {
        e.preventDefault(); // Prevent the default paste behavior
        
        const newFormData = {};
        for (let i = 1; i <= 28; i++) {
          newFormData[`v${i}`] = values[i - 1];
        }
        setFormData(prev => ({
          ...prev,
          ...newFormData
        }));
        
        // Move focus to the submit button
        setTimeout(() => {
          const submitButton = document.querySelector('button[type="submit"]');
          if (submitButton) {
            submitButton.focus();
          }
        }, 100);
        
        toast.success('All 28 values populated automatically!');
      } else if (values.length > 0) {
        toast.error(`Expected 28 values, but got ${values.length}. Please check your input.`);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);

    try {
      const response = await api.post('/api/predict', formData);
      setPrediction(response.data);
      
      if (response.data.is_fraud) {
        toast.error('🚨 Fraud Detected!');
      } else {
        toast.success('✅ Transaction appears safe');
      }
      
      // Scroll to results after successful prediction
      setTimeout(() => {
        const resultElement = document.querySelector('.result-card');
        if (resultElement) {
          resultElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }, 100);
      
    } catch (error) {
      console.error('Prediction error:', error);
      toast.error('Failed to get prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      v1: '', v2: '', v3: '', v4: '', v5: '', v6: '', v7: '', v8: '', v9: '', v10: '',
      v11: '', v12: '', v13: '', v14: '', v15: '', v16: '', v17: '', v18: '', v19: '', v20: '',
      v21: '', v22: '', v23: '', v24: '', v25: '', v26: '', v27: '', v28: ''
    });
    setPrediction(null);
    
    // Scroll to top when form is reset
    setTimeout(() => {
      window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      });
    }, 100);
  };

  const fillSampleData = () => {
    setFormData({
      v1: '-1.358354', v2: '-0.072781', v3: '2.536787', v4: '1.378155', v5: '-0.338321',
      v6: '0.462388', v7: '0.239599', v8: '0.098698', v9: '0.363787', v10: '0.090794',
      v11: '-0.551600', v12: '-0.617801', v13: '-0.991390', v14: '-0.311169', v15: '1.468177',
      v16: '-0.470401', v17: '0.207971', v18: '0.025791', v19: '0.403993', v20: '0.251412',
      v21: '-0.018307', v22: '0.277838', v23: '-0.110474', v24: '0.066928', v25: '0.128539',
      v26: '-0.189115', v27: '0.133558', v28: '-0.021053'
    });
    toast.success('Sample data filled! You can also copy this data and paste it in V1 field to test the auto-fill feature.');
  };

  const renderPredictionResult = () => {
    if (!prediction) return null;

    const { is_fraud, fraud_probability, normal_probability, risk_level } = prediction;

    return (
      <div className={`result-card ${is_fraud ? 'result-fraud' : 'result-safe'}`}>
        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>
          {is_fraud ? <FaExclamationTriangle /> : <FaCheckCircle />}
        </div>
        
        <h2 style={{ marginBottom: '20px', fontSize: '2rem' }}>
          {is_fraud ? 'FRAUD DETECTED' : 'TRANSACTION SAFE'}
        </h2>
        
        <div style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
          Risk Level: <strong>{risk_level}</strong>
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span>Fraud Probability:</span>
            <span><strong>{(fraud_probability * 100).toFixed(2)}%</strong></span>
          </div>
          <div className="probability-bar">
            <div 
              className="probability-fill" 
              style={{ 
                width: `${fraud_probability * 100}%`,
                backgroundColor: is_fraud ? '#fff' : 'rgba(255, 255, 255, 0.8)'
              }}
            />
          </div>
        </div>
        
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span>Normal Probability:</span>
            <span><strong>{(normal_probability * 100).toFixed(2)}%</strong></span>
          </div>
          <div className="probability-bar">
            <div 
              className="probability-fill" 
              style={{ 
                width: `${normal_probability * 100}%`,
                backgroundColor: is_fraud ? 'rgba(255, 255, 255, 0.8)' : '#fff'
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
        Single Transaction Analysis
      </h2>
      
      <form onSubmit={handleSubmit}>
        <h3 style={{ margin: '20px 0', color: '#555' }}>PCA Components (V1-V28)</h3>
        <p style={{ marginBottom: '20px', color: '#666', fontSize: '0.9rem' }}>
          These are PCA-transformed features that include transaction amount, time, and other anonymized variables.
        </p>
        <div style={{ 
          backgroundColor: '#e3f2fd', 
          border: '1px solid #2196f3', 
          borderRadius: '4px', 
          padding: '10px', 
          marginBottom: '20px',
          fontSize: '0.9rem',
          color: '#1976d2'
        }}>
          💡 <strong>Quick Fill:</strong> Paste 28 comma or space-separated values in the V1 field to auto-populate all fields instantly!
        </div>
        <div className="grid grid-4">
          {Array.from({ length: 28 }, (_, i) => (
            <div key={i} className="form-group">
              <label htmlFor={`v${i + 1}`}>V{i + 1}</label>
              <input
                type="number"
                id={`v${i + 1}`}
                name={`v${i + 1}`}
                className="form-control"
                value={formData[`v${i + 1}`]}
                onChange={handleInputChange}
                onPaste={i === 0 ? handleV1Paste : undefined}
                step="any"
                required
                placeholder={i === 0 ? "0.0 or paste 28 values here" : "0.0"}
              />
            </div>
          ))}
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '15px', 
          justifyContent: 'center', 
          marginTop: '30px',
          flexWrap: 'wrap'
        }}>
          <button
            type="button"
            className="btn"
            onClick={fillSampleData}
            disabled={loading}
            style={{ minWidth: '140px' }}
          >
            Fill Sample Data
          </button>
          
          <button
            type="submit"
            className="btn"
            disabled={loading}
            style={{ minWidth: '160px' }}
          >
            {loading ? (
              <>
                <FaSpinner style={{ marginRight: '8px', animation: 'spin 1s linear infinite' }} />
                Analyzing...
              </>
            ) : (
              'Analyze Transaction'
            )}
          </button>
          
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleReset}
            disabled={loading}
            style={{ minWidth: '100px' }}
          >
            Reset Form
          </button>
        </div>
      </form>

      {renderPredictionResult()}
    </div>
  );
};

export default SinglePrediction;
