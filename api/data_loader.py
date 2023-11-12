from functools import lru_cache
import os
import json
from enum import Enum

indicators = {
    'NY.GDP.MKTP.CD': 'GDP (current US$)',
    'SP.POP.TOTL': 'Population, total',
    'NE.EXP.GNFS.CD': 'Exports of goods and services (current US$)',
    'BX.KLT.DINV.CD.WD': 'Foreign direct investment, net inflows (BoP, current US$)',
    'FP.CPI.TOTL.ZG': 'Inflation, consumer prices (annual %)',
    'NY.GDP.MKTP.KD.ZG': 'GDP growth (annual %)'
}

@lru_cache()
def load_data():
    with open(os.path.join(os.getcwd(), "notebooks/wb_data.json")) as f:
        data = json.load(f)
    return data


async def get_indicators():
    return indicators


async def get_countries():
    data = load_data()
    return list(data['SP.POP.TOTL'].keys())


async def get_indicator_data(indicator: str):
    data = load_data()
    return data[indicator]
