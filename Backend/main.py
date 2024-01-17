from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from Database import db_get_telescopes, print_client, db_get_params_by_telescope_name,db_get_versions_by_telescope_and_param

app = FastAPI()

origins = ['https://localhost:3000','http://localhost:5173']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

@app.get("/PingDatabase")
async def getter():
    response = await print_client()
    return response

@app.get("/Telescopes/{telName}")
async def api_get_params(telName:str):
    response = await db_get_params_by_telescope_name(telName)
    return response

@app.get("/Telescopes")
async def api_get_telescopes():
    response = await db_get_telescopes()
    return response

@app.get("/Versions/{telName}/{param}")
async def get_telescope_versions(tel_name: str, param: str):
    response = await db_get_versions_by_telescope_and_param(tel_name, param)
    return response

# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)