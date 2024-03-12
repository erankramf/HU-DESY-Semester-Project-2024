from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi
from fastapi.responses import JSONResponse
from bson import ObjectId


from Logger import Log, LogLevel



uri = "DATABASE_CONNECTION_STRING"

client = AsyncIOMotorClient(uri, server_api=ServerApi('1'))
# Not quite sure these are what we need, but we can work with that and maybe change later.
db = client["CTA-Simulation-Model"]
telescopes_collection = db["telescopes"]

class DbException(Exception):
    pass

async def ping_server():
  # Send a ping to confirm a successful connection
  try:
    await client["CTA-Simulation-Model"].command('ping')  
    print("Pinged your deployment. You successfully connected to MongoDB!")
    return "Pinged your deployment. You successfully connected to MongoDB!"
  except Exception as e:
    Log(LogLevel.Critical,e)
    raise DbException(e)


async def print_client() -> str:
  return await ping_server()
  
async def db_get_params_by_telescope_name(TelName : str) -> list[str]:
  try:
    params = await telescopes_collection.aggregate(  [
      { '$match': { 'Telescope': TelName } },
      { '$group': { '_id': '$Parameter' } }
    ]).to_list(None)
    return list(map(lambda tel: tel["_id"],params))
  except Exception as e:
    Log(e)
    raise DbException(LogLevel.Critical,e)

  
async def db_get_telescopes() -> list[str]:
  try:

    telescopes = await telescopes_collection.aggregate([
      {
        '$group': {
              '_id': '$Telescope'
          },
      }, {
          '$sort': {
              'Telescope': 1
          }
      }
    ]).to_list(None)
    return list(map(lambda tel: tel["_id"],telescopes))
  except Exception as e:
    Log(e)
    raise DbException(LogLevel.Critical,e)

async def db_get_versions_by_telescope_and_param(TelName: str, Param: str) -> list[str]:
    try:
      versions = await telescopes_collection.aggregate([
          { '$match': { 'Telescope': TelName, 'Parameter': Param } },
          { '$group': { '_id': '$Version' } }
      ]).to_list(None)
      return list(map(lambda tel: tel["_id"], versions))
    except Exception as e:
      Log(e)
      raise DbException(LogLevel.Critical,e)

async def db_get_data(TelName : str, Param : str, Versions : list[str]) -> list[dict[str,any]]:
  try:
    data = telescopes_collection.find({'Telescope' : TelName, 'Parameter' : Param, 'Version': {'$in': Versions}})

    all_data = await data.to_list(length = None)

    for data in all_data:
      data['_id'] = str(data['_id'])

    return JSONResponse(content=all_data)
  except Exception as e:
    Log(e)
    raise DbException(LogLevel.Critical,e)

