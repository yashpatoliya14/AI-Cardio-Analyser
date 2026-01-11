import streamlit as st
import pandas as pd
import joblib
model = joblib.load("models/cardiovascular_model.joblib")

st.set_page_config(page_title="Cardio Disease Prediction", layout="centered")

st.title("❤️ Cardio Disease Prediction")
st.write("Fill the details below to predict the risk of cardiovascular disease.")


gender_map = {"Male": 1, "Female": 0}
yes_no_map = {"No": 0, "Yes": 1}
activity_map = {"Inactive": 0, "Active": 1}

cholesterol_map = {
    "Normal": 1,
    "Above Normal": 2,
    "Well Above Normal": 3
}

glucose_map = {
    "Normal": 1,
    "Above Normal": 2,
    "Well Above Normal": 3
}


with st.form("cardio_form"):

    age = st.number_input("Age (years)", min_value=1, max_value=120, value=40)

    gender_label = st.selectbox(
        "Gender",
        list(gender_map.keys())
    )

    height = st.number_input("Height (cm)", min_value=100, max_value=250, value=170)
    weight = st.number_input("Weight (kg)", min_value=30, max_value=200, value=70)

    ap_hi = st.selectbox(
        "Systolic BP (High)",
        [90, 100, 110, 120, 130, 140, 150, 160, 170, 180],
        index=3
    )

    ap_lo = st.selectbox(
        "Diastolic BP (Low)",
        [60, 70, 80, 90, 100, 110],
        index=2
    )

    cholesterol_label = st.selectbox(
        "Cholesterol Level",
        list(cholesterol_map.keys())
    )

    glucose_label = st.selectbox(
        "Glucose Level",
        list(glucose_map.keys())
    )

    smoke_label = st.selectbox(
        "Smoking",
        list(yes_no_map.keys())
    )

    alco_label = st.selectbox(
        "Alcohol Intake",
        list(yes_no_map.keys())
    )

    active_label = st.selectbox(
        "Physical Activity",
        list(activity_map.keys())
    )

    submit = st.form_submit_button("Predict")

if submit:

   
    bmi = round(weight / ((height / 100) ** 2), 2)
    pulse_pressure = ap_hi - ap_lo

    input_data = pd.DataFrame([{
        "age": age,
        "gender": gender_map[gender_label],
        "height": height,
        "weight": weight,
        "bmi": bmi,
        "ap_hi": ap_hi,
        "ap_lo": ap_lo,
        "cholesterol": cholesterol_map[cholesterol_label],
        "gluc": glucose_map[glucose_label],
        "smoke": yes_no_map[smoke_label],
        "alco": yes_no_map[alco_label],
        "active": activity_map[active_label],
        "pulse_pressure": pulse_pressure,
    }])

    prediction = model.predict(input_data)[0]
    probability = model.predict_proba(input_data)[0][1]

    st.subheader("Prediction Result")

    st.info(f"Calculated BMI: **{bmi}**")
    st.info(f"Pulse Pressure: **{pulse_pressure} mmHg**")

    if prediction == 1:
        st.error(f"⚠️ High Risk of Cardio Disease\n\nProbability: {probability:.2f}")
    else:
        st.success(f"✅ Low Risk of Cardio Disease\n\nProbability: {probability:.2f}")
