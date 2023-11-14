from functools import lru_cache
import os
import json
from enum import Enum

WB_DATA = 'wb_data.json'
PREDICTION_DATA = 'predicted_wb_data.json'

indicators = {
    'NY.GDP.MKTP.CD': 'GDP (current US$)',
    'SP.POP.TOTL': 'Population, total',
    'NE.EXP.GNFS.CD': 'Exports of goods and services (current US$)',
    'BX.KLT.DINV.CD.WD': 'Foreign direct investment, net inflows (BoP, current US$)',
    'FP.CPI.TOTL.ZG': 'Inflation, consumer prices (annual %)',
    'NY.GDP.MKTP.KD.ZG': 'GDP growth (annual %)'
}

@lru_cache()
def load_data(file: str):
    with open(os.path.join(os.getcwd(), "notebooks", file)) as f:
        data = json.load(f)
    return data


async def get_indicators():
    return indicators


async def get_countries():
    data = load_data(WB_DATA)
    return list(data['SP.POP.TOTL'].keys())


async def get_indicator_data(indicator: str):
    data = load_data(WB_DATA)
    indicator_data = data[indicator]
    print("historical indicator_data type", type(indicator_data))
    return indicator_data


async def get_prediction_data(indicator: str):
    data = load_data(PREDICTION_DATA)
    indicator_data = data[indicator]
    print("predicted indicator_data type", type(indicator_data))
    return indicator_data
