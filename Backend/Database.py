from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi
import traceback
from typing import List


uri = "mongodb://read:XgFXpjCQZznKddf4KvtW@cta-simpipe-protodb.zeuthen.desy.de/?authMechanism=DEFAULT&authSource=admin&tls=true"

client = AsyncIOMotorClient(uri, server_api=ServerApi('1'))
# Not quite sure these are what we need, but we can work with that and maybe change later.
db = client["CTA-Simulation-Model"]
telescopes_collection = db["telescopes"]

async def pingServerDb():
  # Send a ping to confirm a successful connection
  try:
    await client["CTA-Simulation-Model"].command('ping')  
    print("Pinged your deployment. You successfully connected to MongoDB!")
    return "Pinged your deployment. You successfully connected to MongoDB!"
  except Exception as e:
    print(e)
    return repr(e)

async def printClientDb() -> str:
  return await pingServerDb()
  
async def db_get_params_by_telescope_name(TelName : str) -> List[str]:
  try:
    params = await telescopes_collection.aggregate(  [
      { '$match': { 'Telescope': TelName } },
      { '$group': { '_id': '$Parameter' } }
    ]).to_list(None)
    return list(map(lambda tel: tel["_id"],params))
  except Exception as e:
        print(f"Error at Database: {e}")
        #traceback.print_exc()    Print the traceback information
        return repr(e)
  

async def db_get_telescopes() -> List[str]:
    try:
        telescopes = await telescopes_collection.aggregate([
            {'$group': {'_id': '$Telescope'}}
        ]).to_list(None)
        return list(map(lambda tel: tel["_id"], telescopes))
    except Exception as e:
        print(f"Error at Database: {e}")
        #traceback.print_exc())    Print the traceback information
        return repr(e)