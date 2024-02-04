from Database import db_get_telescopes, db_get_params_by_telescope_name, db_get_versions_by_telescope_and_param, db_get_data

async def serv_get_telescopes():
    telescopes = await db_get_telescopes()
    return telescopes


async def serv_get_params_by_telescope_name(telescope_name: str):
    params = await db_get_params_by_telescope_name(telescope_name)
    return params


async def serv_get_versions_by_telescope_and_param(telescope_name: str, param: str ):
    versions = await db_get_versions_by_telescope_and_param(telescope_name, param)
    return versions


async def serv_get_data(telescope_name: str, param: str , version: str):
    data = await db_get_data(telescope_name, param, version)
    return data
