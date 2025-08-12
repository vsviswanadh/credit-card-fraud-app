import streamlit as st
import pandas as pd
import joblib
import json

# Load model & metadata
@st.cache_resource
def load_assets():
    model = joblib.load('rf_model.joblib')
    scaler = joblib.load('amount_time_scaler.joblib')
    with open('feature_meta.json', 'r') as f:
        meta = json.load(f)
    return model, scaler, meta['features']

model, scaler, features = load_assets()

st.set_page_config(page_title="Credit Card Fraud Detector", layout="wide")
st.title("💳 Credit Card Fraud Detection App")

st.write("Enter transaction details to check if it’s **Fraud** or **Not Fraud**.")

# Single transaction input form
with st.form("single_form"):
    inputs = {}
    for feat in features:
        if feat == "Amount_scaled":
            val = st.number_input("Transaction Amount", min_value=0.0)
            inputs['Amount_scaled'] = scaler.transform([[val]])[0][0]
        elif feat == "Time_scaled":
            val = st.number_input("Transaction Time (seconds from start)", min_value=0.0)
            inputs['Time_scaled'] = scaler.transform([[val]])[0][0]
        else:
            inputs[feat] = st.number_input(feat, value=0.0)
    submitted = st.form_submit_button("Predict")

if submitted:
    df = pd.DataFrame([inputs], columns=features)
    pred = model.predict(df)[0]
    st.subheader("Prediction:")
    if pred == 1:
        st.error("🚨 Fraud Detected!")
    else:
        st.success("✅ Not Fraud")

# CSV batch predictions
st.write("---")
st.subheader("Batch Predictions via CSV")
uploaded_file = st.file_uploader("Upload CSV file with columns: Amount, Time, and other features", type=["csv"])

if uploaded_file:
    df = pd.read_csv(uploaded_file)

    # Scale Amount and Time
    if "Amount" in df.columns:
        df['Amount_scaled'] = scaler.transform(df[['Amount']])
        df.drop(columns=['Amount'], inplace=True)
    if "Time" in df.columns:
        df['Time_scaled'] = scaler.transform(df[['Time']])
        df.drop(columns=['Time'], inplace=True)

    # Reorder columns
    df = df[features]
    preds = model.predict(df)
    df['Prediction'] = ["Fraud" if p == 1 else "Not Fraud" for p in preds]
    st.write(df.head())
    st.download_button("Download Predictions", df.to_csv(index=False).encode('utf-8'), "predictions.csv")
