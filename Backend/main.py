from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from Database import db_get_telescopes, db_get_params_by_telescope_name

#notiz: ich implementiere das jz schon so, dass ich von hier aus erstmal die service funktionen rufe,
#obwohl die ja theoretisch noch nicht da sind 
from Service import{
    service_get_params_by_telescope_name,
    service_get_telescopes,
}

from Database import print_client

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
    response = await service_get_params_by_telescope_name(telName)
    if response:
        return response
    raise HTTPException(404, f"couldn't find Telescope Parameters")

@app.get("/Telescopes")
async def api_get_telescopes():
    response = await service_get_telescopes()
    if response:
        return response
    raise HTTPException(404, f"couldn't find Telescope")

# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)