# MSME Pulse 🇮🇳
## India's First Real-Time MSME Economic Stress Intelligence System

[![Live Demo](https://img.shields.io/badge/Live%20Demo-msme--pulse.netlify.app-blue)](https://msme-pulse.netlify.app)

## Key Results
- **Model AUC: 0.9853** — exceptional predictive accuracy
- **Lead Time: 6.8 months** — predicts stress before banks detect it
- **330,048 rows** of multi-source data
- **50+ Indian districts** covered

## What It Does
Predicts MSME financial distress 6-8 months before it appears in bank NPA data by fusing:
- NASA VIIRS nighttime satellite imagery
- MCA21 company filing data
- GST compliance signals

## Tech Stack
- **Data**: NASA Earth Engine, MCA21, GST
- **ML**: XGBoost, Python, pandas
- **Frontend**: React, Recharts
- **Backend**: FastAPI, AWS
- **Cloud**: AWS S3

## Live Dashboard
Visit: https://msme-pulse.netlify.app

## Project Structure
- /dashboard — React frontend
- msme_api.py — FastAPI backend
- feature_engineering.py — 49 feature engineering pipeline
- ee_download.py — NASA satellite data pipeline
- build_master.py — Master dataset builder
- npa_validation.py — NPA backtest validation

## Results
| Metric | Value |
|--------|-------|
| AUC-ROC | 0.9853 |
| Lead Time | 6.8 months |
| Detection Rate | 100% |
| Dataset Size | 330,048 rows |

## Built By
Krish Makhija | MSME Pulse v1.0
