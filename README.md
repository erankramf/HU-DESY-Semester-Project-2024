# DESY

This project was developed to address the specific needs of professionals in the field, aiming to streamline their access to telescope data. The objective is to enhance the efficiency of data analysis, enabling engineers to make informed decisions and derive valuable insights within the realm of astronomy.


## Description
This application has been developed to streamline the work of engineers, providing them with a convenient way to access and analyze telescope data. Users can easily select a telescope using the search field, then specify parameter and versions. The option to choose multiple versions adds extra flexibility. After selection, engineers can view and analyze the data in a user-friendly format, significantly simplifying the process of gaining valuable insights.

![Example](./images/example.jpg)

## Technologies

- TypeScript
- React
- Python
- FastAPI
- MongoDB

## Instructions

### Backend Setup:

1. Download the MongoDB server and MongoDB Compass.
2. Install necessary tools for the backend:
    - Open the terminal.
    - Navigate to the "backend" folder.
    - Install pipenv: `pip install pipenv`.
    - Activate the virtual environment: `pipenv shell`.
    - Install dependencies: `pipenv install -r requirements.txt`.
    - Run the server with the command: `uvicorn main:app --reload`.
3. Add the proper database connection string in "Database.py"

### Frontend Setup:

1. Install necessary tools for the frontend:
    - Install Node.js.
    - Open the terminal.
    - Navigate to the "frontend" folder.
    - Run the command: `npm install`. This will install all required packages.
    - Run the frontend with the command: `npm run dev`.


## Technical Overview

The web application was implemented in Python and the so-called FARM Stack frameworks,
which include FastAPI, React, and MongoDB.

### Backend:

In terms of the architecture of the backend, 4 modules were created with their unique tasks,
namely the Controller.py module, the Main.py module, the Database.py module, and the
Service.py module. The Main file’s sole purpose is to launch the app. The Controller file is
the central entry point for the backend web app. It handles the various API endpoints of the
application, which communicate with the frontend client and show up as the URL in the
browser. This file moreover directs the incoming requests to the next responsible module.

The next responsible module is Service, which serves as the bridge between the backend API
requests in Controller, and the database queries. It is where the logic takes place, and it
invokes the fetching of the data. This file is important to have a separation of concerns and to
hinder unwanted access to the actual database.

Next, the Database module contains functions responsible for querying the MongoDB server
to get different types of data. It queries the database for telescope names, parameters
corresponding to a telescope, versions corresponding to a telescope and its parameters, and
specific data entries. The values received from the database are aggregated onto a list, making
it easier for the server to handle and return data to the client. Some data is stored in the
database as files, and in such instances, the “file” flag is set to true to allow for specific
catering. Furthermore, this module includes some error-handling mechanisms which could be
encountered during database operations.

### Frontend:

For the frontend server, much of the work resided in curating the components that would
make up the interface. This includes a component that facilitates search and selection inside a
list, a component that allows collapsing of sections, and one that helps navigate through
several types of data like telescopes and parameters. Another component displays the selected
versions in tabular form. The Material UI library was utilised to help with these components.
The interfacing between the frontend and the backend takes place in the TypeScript file
Service, which makes HTTP requests to the backend and thus fetches data. CSS is used to
adjust the visuals of the app.

## Team
This project was developed by:

[Ani](https://github.com/Ani-BB)    [Eran](https://github.com/erankramf)    [Selin](https://github.com/selinorhanlar)    [Syeda](https://github.com/bluestar04)    [Tanya](https://github.com/Tetiana2509)
