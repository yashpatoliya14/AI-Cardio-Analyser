import pandas as pd
import joblib
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_curve, auc
import os

# Define paths
DATA_PATH = "./data/cardio_cleaned.csv"
MODEL_PATH = "./models/cardiovascular_model_logistic.joblib"
OUTPUT_PATH = "./frontend/public/ROC.png"

# Load data
print("Loading data...")
try:
    df = pd.read_csv(DATA_PATH)
except FileNotFoundError:
    # Try different path if running from subdir?
    if os.path.exists("../data/cardio_cleaned.csv"):
        df = pd.read_csv("../data/cardio_cleaned.csv")
    else:
        raise

# Select features and target
# Based on inspection: ['gender', 'height', 'weight', 'ap_hi', 'ap_lo', 'cholesterol', 'gluc']
# And target 'cardio'
features = ['gender', 'height', 'weight', 'ap_hi', 'ap_lo', 'cholesterol', 'gluc']
target = 'cardio'

X = df[features]
y = df[target]

# Load model
print(f"Loading model from {MODEL_PATH}...")
model = joblib.load(MODEL_PATH)

# Split data (using same random_state as notebook for consistency)
print("Splitting data...")
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=2, test_size=0.3)

# Predict probabilities
print("Predicting probabilities...")
y_prob = model.predict_proba(X_test)[:, 1]

# Compute ROC curve
print("Computing ROC curve...")
fpr, tpr, thresholds = roc_curve(y_test, y_prob)
roc_auc = auc(fpr, tpr)
print(f"AUC: {roc_auc}")

# Plotting
print("Generating plot...")
plt.figure(figsize=(10, 6), dpi=120)
plt.style.use('seaborn-v0_8-whitegrid') # Clean style

# Plot ROC
plt.plot(fpr, tpr, color='#0d9488', lw=2.5, label=f'Logistic Regression (AUC = {roc_auc:.2f})')
plt.plot([0, 1], [0, 1], color='#94a3b8', lw=1.5, linestyle='--')

# Styling
plt.xlim([-0.01, 1.0])
plt.ylim([0.0, 1.02])
plt.xlabel('False Positive Rate', fontsize=11, fontweight='500', color='#334155')
plt.ylabel('True Positive Rate', fontsize=11, fontweight='500', color='#334155')
plt.title('ROC-AUC Curve Analysis', fontsize=14, fontweight='bold', color='#0f172a', pad=15)
plt.legend(loc="lower right", frameon=True, framealpha=0.9, edgecolor='#cbd5e1')
plt.grid(color='#e2e8f0', linestyle='--', linewidth=0.5, alpha=0.7)

# Remove top/right spines
plt.gca().spines['top'].set_visible(False)
plt.gca().spines['right'].set_visible(False)
plt.gca().spines['left'].set_color('#cbd5e1')
plt.gca().spines['bottom'].set_color('#cbd5e1')

# Save
if not os.path.exists("./frontend/public"):
    os.makedirs("./frontend/public")
    
plt.savefig(OUTPUT_PATH, bbox_inches='tight')
print(f"Successfully saved ROC curve to {OUTPUT_PATH}")
