from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .model import predict_yield

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://frontend-shrimp.vercel.app"],
    allow_credentials=True,
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
    return {"message": "API running"}

@app.post("/predict")
def predict(features: Features):
    return {"prediction": predict_yield(features.dict())}
