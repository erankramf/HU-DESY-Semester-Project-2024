# from fastapi import FastAPI, HTTPException, Query
# from fastapi.middleware.cors import CORSMiddleware

# from fastapi.openapi.utils import get_openapi
import uvicorn, yaml, os, logging
# from Database import get_file, print_client
# from Service import serv_get_telescopes, serv_get_params_by_telescope_name, serv_get_versions_by_telescope_and_param, serv_get_data

# app = FastAPI()

# origins = ['https://localhost:3000','http://localhost:5173']

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=['*'],
#     allow_headers=['*']
# )

# #this is stuff for the list-parameter in the swagger ui, to make sure we can receive it correctly
# #it looks like we wont need this now but i'll still leave it here for now
# cd = os.path.dirname(os.path.abspath(__file__))
# yaml_path = os.path.join(cd, "swagger_list.yaml")
#Press the green button in the gutter to run the script.
if __name__ == '__main__':
    uvicorn.run("Controller:app", host="127.0.0.1", port=8000)