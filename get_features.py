import joblib
try:
    model = joblib.load("models/cardiovascular_model_logistic.joblib")
    if hasattr(model, "feature_names_in_"):
        with open('features.txt', 'w') as f:
            f.write(str(list(model.feature_names_in_)))
    else:
        # Pipeline case: getting feature names can be tricky if not passed through.
        # But usually 'steps' -> 'model'
        final_estimator = model.named_steps['model']
        if hasattr(final_estimator, "feature_names_in_"):
             with open('features.txt', 'w') as f:
                f.write(str(list(final_estimator.feature_names_in_)))
        else:
             with open('features.txt', 'w') as f:
                f.write("No feature names found on final estimator")
except Exception as e:
    with open('features.txt', 'w') as f:
        f.write(str(e))
