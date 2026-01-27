# app/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .model import predict_yield

app = FastAPI(
    title="Shrimp Yield Prediction API",
    description="Predicts shrimp yield percentage from pond parameters.",
)

# CORS so React (localhost:3000) can call FastAPI
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "https://frontend-shrimp.vercel.app",  # your frontend deployed URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://frontend-shrimp.vercel.app"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)



class Features(BaseModel):
    prawn_density_per_m2: float
    feed_quality_index: float
    water_exchange_per_month: float
    DO_mg_L: float
    temperature_C: float
    pH: float
    ammonia_mg_L: float
    nitrite_mg_L: float
    H2S_mg_L: float
    turbidity_cm: float
    salinity_ppt: float
    pond_size_ha: float
    recycling_efficiency_pct: float

@app.get("/")
def root():
    return {"message": "Shrimp Yield Prediction API is running"}

@app.post("/predict")
def predict(features: Features):
    try:
        input_dict = features.dict()
        pred = predict_yield(input_dict)
        return {"prediction": pred}
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception:
        raise HTTPException(status_code=500, detail="Prediction failed")
