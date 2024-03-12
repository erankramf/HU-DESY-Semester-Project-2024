from fastapi.responses import JSONResponse
from Database import db_get_file_as_string, db_get_file_for_download, db_get_telescopes, db_get_params_by_telescope_name, db_get_versions_by_telescope_and_param, db_get_data

async def serv_get_telescopes():
    telescopes = await db_get_telescopes()
    return telescopes


async def serv_get_params_by_telescope_name(telescope_name: str):
    params = await db_get_params_by_telescope_name(telescope_name)
    return params


async def serv_get_versions_by_telescope_and_param(telescope_name: str, param: str ):
    versions = await db_get_versions_by_telescope_and_param(telescope_name, param)
    return versions


async def serv_get_data(telescope_name: str, param: str , Versions: list[str]):
    data = await db_get_data(telescope_name, param, Versions)
    for version in data:
        version['_id'] = str(version['_id'])
        # if(version["File"]):
        #     version["Value"] = str(await db_get_file_as_string(version["Value"]),'utf-8')
    output = JSONResponse(content = data)
    return output

async def serv_get_file_for_download(fileName:str):
    return await db_get_file_for_download(fileName)