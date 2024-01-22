from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from Database import db_get_telescopes, db_get_params_by_telescope_name, db_get_versions_by_telescope_and_param

app = FastAPI()


@app.get("/get_telescopes")
async def serv_get_telescopes():
    telescopes = await db_get_telescopes()
    return telescopes

@app.get("/get_params_by_telescope_name/{telescope_name}")
async def serv_get_params_by_telescope_name(telescope_name: str):
    params = await db_get_params_by_telescope_name(telescope_name)
    return params

@app.get("/get_versions_by_telescope_and_param/{telescope_name}/{param}")
async def serv_get_versions_by_telescope_and_param(telescope_name: str, param: str ):
    versions = await db_get_versions_by_telescope_and_param(telescope_name, param)
    return versions


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)
