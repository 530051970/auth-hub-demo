import json
import logging.config
from mangum import Mangum
from fastapi import FastAPI

logger = logging.getLogger(__name__)

bizApp = FastAPI()

@bizApp.get("/biz")
async def root():
    return {"message": "Welcome to Biz API!"}

@bizApp.get("/biz/summary")
async def summary():
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
        },
        'body': {"message": "This is your summary"}
    }

handler = Mangum(bizApp)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(bizApp, host="127.0.0.1", port=3999)
