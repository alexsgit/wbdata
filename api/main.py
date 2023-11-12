from functools import lru_cache

from fastapi import FastAPI
import os
import pandas as pd
app = FastAPI()


@app.middleware("http")
async def add_cors_header(request, call_next):
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response


@lru_cache()
def load_data():
    # get current directory
    return pd.read_csv(os.path.join(os.getcwd(), "notebooks/wb_data.csv"))

@app.get("/data")
async def get_data():
    df = load_data()
    return df.to_dict(orient='records')
