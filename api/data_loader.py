from functools import lru_cache
import os
import json

@lru_cache()
def load_data():
    with open(os.path.join(os.getcwd(), "notebooks/wb_data.json")) as f:
        data = json.load(f)
    return data


async def get_indicators():
    data = load_data()
    return list(data.keys())


async def get_countries():
    data = load_data()
    return list(data['SP.POP.TOTL'].keys())


async def get_indicator_data(indicator: str):
    data = load_data()
    return data[indicator]
