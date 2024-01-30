from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi
from fastapi.responses import JSONResponse
from bson import ObjectId



uri = "mongodb://read:XgFXpjCQZznKddf4KvtW@cta-simpipe-protodb.zeuthen.desy.de/?authMechanism=DEFAULT&authSource=admin&tls=true"

client = AsyncIOMotorClient(uri, server_api=ServerApi('1'))
# Not quite sure these are what we need, but we can work with that and maybe change later.
db = client["CTA-Simulation-Model"]
telescopes_collection = db["telescopes"]

async def ping_server():
  # Send a ping to confirm a successful connection
  try:
    await client["CTA-Simulation-Model"].command('ping')  
    print("Pinged your deployment. You successfully connected to MongoDB!")
    return "Pinged your deployment. You successfully connected to MongoDB!"
  except Exception as e:
    print(e)
    return repr(e)


async def print_client() -> str:
  return await ping_server()
  
async def db_get_params_by_telescope_name(TelName : str) -> list[str]:
  params = await telescopes_collection.aggregate(  [
    { '$match': { 'Telescope': TelName } },
    { '$group': { '_id': '$Parameter' } }
  ]).to_list(None)
  return list(map(lambda tel: tel["_id"],params))

  
async def db_get_telescopes() -> list[str]:
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

async def db_get_versions_by_telescope_and_param(TelName: str, Param: str) -> list[str]:
    versions = await telescopes_collection.aggregate([
        { '$match': { 'Telescope': TelName, 'Parameter': Param } },
        { '$group': { '_id': '$Version' } }
    ]).to_list(None)
    return list(map(lambda tel: tel["_id"], versions))

# old db_get_data function
async def db_get_data_old(TelName : str, Param : str, Version : str) -> dict:
  data = await telescopes_collection.find_one({'Telescope': TelName, 'Parameter': Param, 'Version': Version})
  # Convert ObjectId to string for JSON serialization
  data['_id'] = str(data['_id'])
  return JSONResponse(content=data)

async def db_get_data(TelName : str, Param : str, Versions : list[str] ) -> list[dict[str, any]]:
  all_data = []
  for version in Versions:
    data = await telescopes_collection.find_one({'Telescope' : TelName, 'Parameter' : Param, 'Version' : version})
    all_data.append(data)

  for data in all_data:
    data['_id'] = str(data['_id'])
  
  return JSONResponse(content=all_data)