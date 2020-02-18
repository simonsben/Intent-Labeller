#!/bin/bash

DATABASE_PATH="labelling_database.sdb"
BACKUP_PATH="labelling_database_backup.sdb"

# Move back up
cd ../

if [ ! -f "$DATABASE_PATH" ]; then
    echo "No database present, cannot backup.";
    exit 0;
fi

mv "$DATABASE_PATH" "$BACKUP_PATH"
