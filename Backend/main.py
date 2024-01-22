from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from Database import print_client
from Service import serv_get_telescopes, serv_get_params_by_telescope_name, serv_get_versions_by_telescope_and_param, serv_get_data

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
    response = await serv_get_params_by_telescope_name(telName)
    return response

@app.get("/Telescopes")
async def api_get_telescopes():
    response = await serv_get_telescopes()
    return response

@app.get("/Telescopes/{telName}/{param}")
async def get_telescope_versions(tel_name: str, param: str):
    response = await serv_get_versions_by_telescope_and_param(tel_name, param)
    return response

@app.get("/Telescopes/{telName}/{param}/{version}")
async def get_data(telName: str, param: str, version: str):
    response = await serv_get_data(telName, param, version)
    if response:
        return response
    else:
        raise HTTPException(404, f"couldn't find Document")


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)