from functools import lru_cache

from fastapi import FastAPI
import pandas as pd
app = FastAPI()


@lru_cache()
async def load_data():
    return pd.read_csv('../notebooks/wb_data.csv')

@app.get("/data")
async def get_data():
    return load_data().to_dict(orient='records')
