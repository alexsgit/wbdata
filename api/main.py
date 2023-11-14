from fastapi import FastAPI
from .data_loader import get_indicators, get_indicator_data, get_prediction_data
from .schemas import IndicatorDataResponse
app = FastAPI()


@app.middleware("http")
async def add_cors_header(request, call_next):
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response


@app.get("/indicators")
async def get_indicators_endpoint():
    return await get_indicators()


@app.get("/indicators/{indicator}", response_model=IndicatorDataResponse)
async def get_indicator_endpoint(indicator: str):
    historical_data = await get_indicator_data(indicator)
    predicted_data = await get_prediction_data(indicator)
    print("main his data type", type(historical_data))
    print("main pred data type", type(predicted_data))
    return IndicatorDataResponse(
        indicator_id=indicator,
        historical_data=historical_data,
        predicted_data=predicted_data
    )

