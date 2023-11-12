from fastapi import FastAPI
from .data_loader import get_indicators, get_indicator_data
app = FastAPI()


@app.middleware("http")
async def add_cors_header(request, call_next):
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response


@app.get("/indicators")
async def get_indicators_endpoint():
    return await get_indicators()


@app.get("/indicators/{indicator}")
async def get_indicator_endpoint(indicator: str):
    return await get_indicator_data(indicator)

