# app/model.py
import joblib
import numpy as np
import pandas as pd
from pathlib import Path

# ---- Define absolute paths relative to this file ----
BASE_DIR = Path(__file__).resolve().parent.parent  # project root (backend/)
MODEL_PATH = BASE_DIR / "shrimp_yield_model.pkl"
FEATURES_PATH = BASE_DIR / "feature_columns.pkl"

# ---- Load model and feature columns once ----
model = joblib.load(MODEL_PATH)
feature_columns = joblib.load(FEATURES_PATH)

REQUIRED_KEYS = [
    "prawn_density_per_m2",
    "feed_quality_index",
    "water_exchange_per_month",
    "DO_mg_L",
    "temperature_C",
    "pH",
    "ammonia_mg_L",
    "nitrite_mg_L",
    "H2S_mg_L",
    "turbidity_cm",
    "salinity_ppt",
    "pond_size_ha",
    "recycling_efficiency_pct",
]

# ---- Prediction function ----
def predict_yield(input_data: dict) -> float:
    # basic validation for required keys
    for key in REQUIRED_KEYS:
        if key not in input_data:
            raise ValueError(f"Missing required feature: {key}")

    df = pd.DataFrame([input_data])

    # interaction features (must match training logic)
    df["density_x_lowDO"] = df["prawn_density_per_m2"] * np.maximum(
        0, 5 - df["DO_mg_L"]
    )
    df["ammonia_x_nitrite"] = df["ammonia_mg_L"] * df["nitrite_mg_L"]

    # reorder columns to match training
    df = df.reindex(columns=feature_columns, fill_value=0)

    prediction = model.predict(df)[0]
    return round(float(prediction), 2)
