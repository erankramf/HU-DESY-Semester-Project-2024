from Database import db_get_telescopes, db_get_params_by_telescope_name, db_get_versions_by_telescope_and_param, db_get_data,db_save_csv_data

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
    return data

async def serv_save_csv_data(file_contents: bytes, collection):
    data = await db_save_csv_data(file_contents, collection)
    return data
