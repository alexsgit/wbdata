from pydantic import BaseModel


class IndicatorDataResponse(BaseModel):
    indicator_id: str
    historical_data: dict
    predicted_data: dict
