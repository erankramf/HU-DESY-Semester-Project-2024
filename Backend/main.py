from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

from fastapi.openapi.utils import get_openapi
import uvicorn, yaml, os, logging
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

#this is stuff for the list-parameter in the swagger ui, to make sure we can receive it correctly
#it looks like we wont need this now but i'll still leave it here for now
cd = os.path.dirname(os.path.abspath(__file__))
yaml_path = os.path.join(cd, "swagger_list.yaml")

with open(yaml_path, "r") as file:
    openapi_spec = yaml.safe_load(file)

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

@app.get("/Telescopes/{tel_name}/{param}")
async def get_telescope_versions(tel_name: str, param: str):
    response = await serv_get_versions_by_telescope_and_param(tel_name, param)
    return response

@app.get("/Telescopes/{telName}/{param}/{Versions}")
async def get_data(telName: str, param: str, Versions: str):
    versions_list = Versions.split(",")
    response = await serv_get_data(telName, param, versions_list)
    return response

#Press the green button in the gutter to run the script.
if __name__ == '__main__':
    uvicorn.run(app, host="127.0.0.1", port=8000)