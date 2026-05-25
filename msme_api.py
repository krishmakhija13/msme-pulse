from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum

app = FastAPI(title="MSME Pulse API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

stress_data = {
    "Agra": 0.999, "Bathinda": 0.999, "Kanpur": 0.998,
    "Bhopal": 0.979, "Varanasi": 0.999, "Ludhiana": 0.954,
    "Surat": 0.929, "Coimbatore": 0.899, "Kolkata": 0.983,
    "Nagpur": 0.962
}

def get_risk_level(stress):
    if stress > 0.8: return "HIGH"
    if stress > 0.6: return "MEDIUM"
    return "LOW"

@app.get("/")
def root():
    return {"message": "MSME Pulse API v1.0", "status": "live"}

@app.get("/predict")
def predict(district: str, sector: str = "All"):
    stress = stress_data.get(district, 0.75)
    return {
        "district": district,
        "sector": sector,
        "stress_probability": stress,
        "risk_level": get_risk_level(stress),
        "lead_time_months": 6.8,
        "model_auc": 0.9853
    }

@app.get("/districts")
def get_districts():
    return {
        "districts": [
            {"name": k, "stress_probability": v, "risk_level": get_risk_level(v)}
            for k, v in stress_data.items()
        ]
    }

handler = Mangum(app)
