import json
import logging.config
from mangum import Mangum
from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware

logger = logging.getLogger(__name__)

bizApp = FastAPI()

# 设置 CORS 中间件
# bizApp.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # 允许所有域名访问，可以根据需要调整
#     allow_credentials=True,
#     allow_methods=["*"],  # 允许所有方法（GET, POST, OPTIONS等）
#     allow_headers=["*"],  # 允许所有请求头
# )

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
    # return {"message": "This is your summary"}

# 使用 Mangum 处理 AWS Lambda 请求
handler = Mangum(bizApp)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(bizApp, host="127.0.0.1", port=3999)
