from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Cardiovascular Disease Predictor API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model
MODEL_PATH = "../models/cardiovascular_model_logistic.joblib"

try:
    if os.path.exists(MODEL_PATH):
        model = joblib.load(MODEL_PATH)
        print(f"Model loaded successfully from {MODEL_PATH}")
    else:
        print(f"Model not found at {MODEL_PATH}")
        model = None
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

class InputData(BaseModel):
    age: int  # in days? Notebook showed 50, but usually cardio datasets are in days. Let's check notebook again if needed.
              # Wait, notebook output showed age 50. Let's assume years for now or check if preprocessing is needed.
              # Looking at the notebook snippet: "age 50". It seems the dataset might have age in years or it was converted.
              # Actually, standard cardio dataset (kaggle) often has age in days.
              # Let's look at the notebook snippet again.
              # Row 0: age 50. Row 1: age 55.
              # It seems the "cardio_processed_data.csv" might have age in years.
    gender: int
    height: int
    weight: float
    ap_hi: int
    ap_lo: int
    cholesterol: int
    gluc: int
    smoke: int
    alco: int
    active: int

    # Note: The notebook showed 'bmi' in the head(), but usually BMI is calculated from height and weight.
    # If the model expects BMI, we should calculate it.
    # Notebook head: age, gender, height, weight, bmi, ap_hi, ap_lo, cholesterol, gluc, smoke, alco, active, cardio
    # The model likely was trained on these features (excluding cardio).
    # So we need to calculate BMI.

@app.get("/")
def read_root():
    return {"message": "Cardiovascular Disease Predictor API is running"}

@app.post("/predict")
def predict(data: InputData):
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")

    # Calculate BMI for response (informational)
    height_m = data.height / 100
    bmi = data.weight / (height_m ** 2)

    # Calculate Pulse Pressure for response (informational)
    pulse_pressure = data.ap_hi - data.ap_lo

    # Prepare input dataframe
    # The model was trained with only 7 features: gender, height, weight, ap_hi, ap_lo, cholesterol, gluc
    input_df = pd.DataFrame([{
        'gender': data.gender,
        'height': data.height,
        'weight': data.weight,
        'ap_hi': data.ap_hi,
        'ap_lo': data.ap_lo,
        'cholesterol': data.cholesterol,
        'gluc': data.gluc
    }])
    
    # Ensure correct column order to match training data
    expected_cols = ['gender', 'height', 'weight', 'ap_hi', 'ap_lo', 'cholesterol', 'gluc']
    input_df = input_df[expected_cols]



    try:
        prediction = model.predict(input_df)
        probability = model.predict_proba(input_df) if hasattr(model, 'predict_proba') else None
        
        result = int(prediction[0])
        prob = probability[0].tolist() if probability is not None else None

        return {
            "prediction": result,
            "probability": prob,
            "bmi": round(bmi, 2),
            "pulse_pressure": pulse_pressure,
            "message": "High risk of cardiovascular disease" if result == 1 else "Low risk of cardiovascular disease"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
