# Data labeller

Project built to host a light-weight site for data labelling to support natural language research.
The intent is to enable people to load the site then be able to label the text as containing intent and/or being abusive.

## Setup

To setup the site:

* Clone the repo
* Install npm
* Install the dependencies from `package.json`
* Install SQLite with `server/database_utilities/install_sqlite.sh`
* Build the database with `server/database_utilities/make_database.sh`
* Generate encryption keys with `server/database_utilities/generate_keys.sh`
* Build the site with `npm run build`

## Usage

Start the server with `node server.js`.  
NOTE: by default it will run on port 8080 unless you set the environment variable PORT to something else.
