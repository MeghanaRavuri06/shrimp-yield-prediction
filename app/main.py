from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from app.schemas import ShrimpInput
from app.model import predict_yield

app = FastAPI(title="Shrimp Yield Prediction API")

# -----------------------------
# Serve templates and static files
# -----------------------------
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")

# -----------------------------
# Root endpoint to serve HTML
# -----------------------------
@app.get("/")
def home(request: Request):
    return templates.TemplateResponse(
        "index.html",
        {"request": request}  # No prediction initially
    )

# -----------------------------
# Predict endpoint (JSON)
# -----------------------------
@app.post("/predict")
def predict(shrimp: ShrimpInput):
    prediction = predict_yield(shrimp.dict())
    return {"prediction": float(prediction)}  # Return JSON for JS fetch
