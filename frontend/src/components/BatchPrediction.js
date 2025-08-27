import React, { useState } from 'react';
import api from '../api';
import toast from 'react-hot-toast';
import { FaUpload, FaDownload, FaSpinner, FaFileExcel } from 'react-icons/fa';

const BatchPrediction = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setResults(null);
    } else {
      toast.error('Please select a valid CSV file');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Parse CSV and convert to JSON for API
      const text = await file.text();
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      
      const transactions = [];
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim()) {
          const values = lines[i].split(',');
          const transaction = {};
          headers.forEach((header, index) => {
            transaction[header] = parseFloat(values[index]) || 0;
          });
          transactions.push(transaction);
        }
      }

      const response = await api.post('/api/predict/batch', { transactions });
      setResults(response.data.results);
      toast.success(`Processed ${response.data.results.length} transactions`);
      
      // Scroll to results after successful batch prediction
      setTimeout(() => {
        const resultElement = document.querySelector('.card:last-child');
        if (resultElement) {
          resultElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }, 100);
    } catch (error) {
      console.error('Batch prediction error:', error);
      toast.error('Failed to process file. Please check the format.');
    } finally {
      setLoading(false);
    }
  };

  const downloadResults = () => {
    if (!results) return;

    const csvContent = [
      'Transaction_ID,Prediction,Is_Fraud,Fraud_Probability,Normal_Probability,Risk_Level',
      ...results.map(result => 
        `${result.transaction_id},${result.prediction},${result.is_fraud},${result.fraud_probability},${result.normal_probability},${result.risk_level}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'fraud_detection_results.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const generateSampleCSV = () => {
    const sampleData = [
      'v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11,v12,v13,v14,v15,v16,v17,v18,v19,v20,v21,v22,v23,v24,v25,v26,v27,v28',
      '-1.358354,-0.072781,2.536787,1.378155,-0.338321,0.462388,0.239599,0.098698,0.363787,0.090794,-0.551600,-0.617801,-0.991390,-0.311169,1.468177,-0.470401,0.207971,0.025791,0.403993,0.251412,-0.018307,0.277838,-0.110474,0.066928,0.128539,-0.189115,0.133558,-0.021053',
      '1.191857,0.266151,0.166480,0.448154,0.060018,-0.082361,-0.078803,0.085102,-0.255425,-0.166974,1.612727,1.065235,0.489095,-0.143772,0.635558,0.463917,-0.114805,-0.183361,-0.145783,-0.069083,-0.225775,-0.638672,0.101288,-0.339846,0.167170,0.125895,-0.008983,0.014724',
      '-1.387024,-0.054952,1.682061,1.378967,-0.338625,0.462347,0.239593,0.098703,0.363789,0.090800,-0.551580,-0.617805,-0.991412,-0.311167,1.468191,-0.470400,0.207975,0.025792,0.403993,0.251409,-0.018309,0.277837,-0.110472,0.066927,0.128538,-0.189113,0.133561,-0.021053'
    ].join('\n');

    const blob = new Blob([sampleData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'sample_transactions.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const renderResults = () => {
    if (!results) return null;

    const fraudCount = results.filter(r => r.is_fraud).length;
    const safeCount = results.length - fraudCount;

    return (
      <div className="card">
        <h3 style={{ textAlign: 'center', marginBottom: '25px', color: '#333' }}>
          Analysis Results
        </h3>
        
        <div className="grid grid-3" style={{ marginBottom: '30px' }}>
          <div className="alert alert-success">
            <h4>Safe Transactions</h4>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{safeCount}</div>
          </div>
          
          <div className="alert alert-danger">
            <h4>Fraud Detected</h4>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{fraudCount}</div>
          </div>
          
          <div className="alert alert-warning">
            <h4>Total Processed</h4>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{results.length}</div>
          </div>
        </div>

        <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '20px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>ID</th>
                <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Result</th>
                <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Fraud %</th>
                <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Risk Level</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td style={{ padding: '10px', border: '1px solid #dee2e6', textAlign: 'center' }}>
                    {result.transaction_id}
                  </td>
                  <td style={{ 
                    padding: '10px', 
                    border: '1px solid #dee2e6', 
                    textAlign: 'center',
                    color: result.is_fraud ? '#dc3545' : '#28a745',
                    fontWeight: 'bold'
                  }}>
                    {result.is_fraud ? 'FRAUD' : 'SAFE'}
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #dee2e6', textAlign: 'center' }}>
                    {(result.fraud_probability * 100).toFixed(2)}%
                  </td>
                  <td style={{ 
                    padding: '10px', 
                    border: '1px solid #dee2e6', 
                    textAlign: 'center',
                    fontWeight: 'bold'
                  }}>
                    {result.risk_level}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button className="btn btn-success" onClick={downloadResults}>
            <FaDownload style={{ marginRight: '8px' }} />
            Download Results
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="card">
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
          Batch Transaction Analysis
        </h2>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '20px' }}>
            Upload a CSV file with transaction data to analyze multiple transactions at once.
          </p>
          
          <div style={{ marginBottom: '20px' }}>
            <button className="btn" onClick={generateSampleCSV}>
              <FaFileExcel style={{ marginRight: '8px' }} />
              Download Sample CSV
            </button>
          </div>
          
          <div className="form-group">
            <label htmlFor="csvFile" style={{ fontSize: '1.1rem' }}>Choose CSV File</label>
            <input
              type="file"
              id="csvFile"
              accept=".csv"
              onChange={handleFileChange}
              className="form-control"
              style={{ maxWidth: '400px', margin: '0 auto' }}
            />
          </div>
          
          {file && (
            <div style={{ margin: '20px 0' }}>
              <p style={{ color: '#28a745', fontWeight: 'bold' }}>
                Selected: {file.name}
              </p>
            </div>
          )}
          
          <button
            className="btn"
            onClick={handleUpload}
            disabled={!file || loading}
          >
            {loading ? (
              <>
                <FaSpinner style={{ marginRight: '8px', animation: 'spin 1s linear infinite' }} />
                Processing...
              </>
            ) : (
              <>
                <FaUpload style={{ marginRight: '8px' }} />
                Analyze Transactions
              </>
            )}
          </button>
        </div>
        
        <div className="alert alert-warning">
          <h4>CSV Format Requirements:</h4>
          <ul style={{ textAlign: 'left', marginTop: '10px' }}>
            <li>First row should contain column headers</li>
            <li>Required columns: v1, v2, v3, ..., v28 (PCA transformed features)</li>
            <li>All values should be numeric</li>
            <li>No missing values allowed</li>
          </ul>
        </div>
      </div>
      
      {renderResults()}
    </div>
  );
};

export default BatchPrediction;
