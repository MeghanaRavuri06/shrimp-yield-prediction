import joblib
import pandas as pd
import numpy as np

MODEL_PATH = "shrimp_yield_model.pkl"
FEATURES_PATH = "feature_columns.pkl"

model = joblib.load(MODEL_PATH)
feature_columns = joblib.load(FEATURES_PATH)

def preprocess_input(data: dict) -> pd.DataFrame:
    df = pd.DataFrame([data])

    # Interaction features (MUST match training)
    df["density_x_lowDO"] = (
        df["prawn_density_per_m2"] *
        np.maximum(0, 5 - df["DO_mg_L"])
    )

    df["ammonia_x_nitrite"] = (
        df["ammonia_mg_L"] *
        df["nitrite_mg_L"]
    )

    # Ensure correct feature order
    df = df[feature_columns]

    return df

def predict_yield(data: dict) -> float:
    df = preprocess_input(data)
    prediction = model.predict(df)[0]

    return round(float(prediction), 2)
