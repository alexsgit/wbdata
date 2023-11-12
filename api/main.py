from functools import lru_cache

from fastapi import FastAPI
import os
import pandas as pd
app = FastAPI()


@lru_cache()
def load_data():
    # get current directory
    return pd.read_csv(os.path.join(os.getcwd(), "notebooks/wb_data.csv"))

@app.get("/data")
async def get_data():
    df = load_data()
    return df.to_dict(orient='records')
