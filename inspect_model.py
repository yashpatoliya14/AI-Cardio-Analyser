import joblib
import pandas as pd

try:
    model = joblib.load("models/cardiovascular_model_logistic.joblib")
    print("Model loaded successfully.")
    
    if hasattr(model, "feature_names_in_"):
        print("Feature names in model:")
        print(model.feature_names_in_)
    else:
        print("Model does not have feature_names_in_ attribute.")
        
except Exception as e:
    print(f"Error loading model: {e}")
