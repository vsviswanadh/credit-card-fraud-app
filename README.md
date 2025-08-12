# 💳 Credit Card Fraud Detection System

A complete full-stack web application for detecting credit card fraud using Machine Learning with a **React frontend** and **Flask backend**.

![Frontend Demo](https://img.shields.io/badge/Frontend-React-blue)
![Backend](https://img.shields.io/badge/Backend-Flask-green)
![ML Model](https://img.shields.io/badge/ML-Random%20Forest-orange)

## 🌟 Features

- **Real-time Fraud Detection**: Analyze individual transactions instantly
- **Batch Processing**: Upload CSV files to analyze multiple transactions
- **Interactive Dashboard**: Modern React UI with beautiful visualizations
- **Risk Assessment**: Detailed probability scores and risk levels (VERY_LOW, LOW, MEDIUM, HIGH)
- **RESTful API**: Clean Flask backend with comprehensive endpoints
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **CSS3** - Modern styling with gradients and animations

### Backend
- **Flask** - Python web framework
- **Flask-CORS** - Cross-origin resource sharing
- **Scikit-learn** - Machine learning library
- **Pandas** - Data manipulation
- **Joblib** - Model serialization

### Machine Learning
- **Random Forest Classifier** - Ensemble learning algorithm
- **PCA Features** - V1-V28 anonymized features
- **Standard Scaling** - Feature preprocessing

## 🚀 Quick Start

### Prerequisites
- Python 3.7+
- Node.js 14+
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/vsviswanadh/credit-card-fraud-app.git
cd credit-card-fraud-app
```

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app.py
```
Backend will run on `http://localhost:5000`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```
Frontend will run on `http://localhost:3000`

### 4. Easy Setup (Windows)
Run the batch file for automatic setup:
```bash
start_servers.bat
```

## 📊 Usage

### Single Transaction Analysis
1. Navigate to the "Single Transaction" tab
2. Fill in the V1-V28 PCA feature values
3. Click "Fill Sample Data" for quick testing
4. Click "Analyze Transaction" to get fraud prediction

### Batch Processing
1. Go to the "Batch Processing" tab
2. Download the sample CSV template
3. Upload your CSV file with transaction data
4. Get results for all transactions with download option

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/features` | Get required features |
| POST | `/api/predict` | Single transaction prediction |
| POST | `/api/predict/batch` | Batch predictions |

### API Example
```bash
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "v1": -1.358354,
    "v2": -0.072781,
    "v3": 2.536787,
    ...
    "v28": -0.021053
  }'
```

## 📁 Project Structure
```
credit-card-fraud-app/
├── backend/                    # Flask API server
│   ├── app.py                 # Main Flask application
│   └── requirements.txt       # Python dependencies
├── frontend/                  # React application
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── App.js            # Main app component
│   │   └── index.css         # Styling
│   ├── public/               # Static files
│   └── package.json          # Node dependencies
├── models/                   # Trained ML models
│   ├── rf_model.joblib       # Random Forest model
│   ├── feature_columns.joblib # Feature names
│   └── scaler_*.joblib       # Preprocessing scalers
├── start_servers.bat         # Quick start script
└── README.md                 # This file
```

## 🤖 Model Information

- **Algorithm**: Random Forest Classifier
- **Features**: 28 PCA-transformed features (V1-V28)
- **Dataset**: Credit card transactions (anonymized)
- **Performance**: High accuracy with low false positive rate

The V1-V28 features are the result of PCA transformation applied to the original features to protect sensitive customer information while maintaining predictive power.

## 🔒 Security Features

- **Data Anonymization**: All sensitive features are PCA-transformed
- **CORS Protection**: Configured for secure cross-origin requests
- **Input Validation**: Comprehensive input validation on both frontend and backend
- **Error Handling**: Robust error handling and logging

## 🌐 Deployment

### Local Development
1. Follow the Quick Start guide above
2. Both servers will run locally for development

### Production Deployment
For production deployment, consider:
- **Frontend**: Deploy to Netlify, Vercel, or AWS S3
- **Backend**: Deploy to Heroku, AWS EC2, or Google Cloud
- **Database**: Use PostgreSQL or MongoDB for transaction logs
- **Load Balancer**: Nginx for handling multiple requests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is for educational purposes. Feel free to use and modify for learning.

## 🙏 Acknowledgments

- Dataset: Credit Card Fraud Detection dataset
- UI Inspiration: Modern web design patterns
- Icons: React Icons library

## 📞 Support

If you have any questions or issues, please open an issue on GitHub or contact the repository owner.

---
Made with ❤️ for fraud detection and machine learning education
