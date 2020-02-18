#!/bin/bash

MODEL_PATH="database_model.sql"
DATABASE_PATH="labelling_database.sdb"

if [ -f "$DATABASE_PATH" ]; then
    echo "Clearing old."
    rm "$DATABASE_PATH"
fi

sqlite3 "$DATABASE_PATH" < "$MODEL_PATH"

echo "Filling database."
node load_data.js
