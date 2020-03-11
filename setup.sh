#!/bin/bash

echo "Running setup script"

# Install dependencies and build site
echo "Installing dependencies"
npm install "package.json"
npm install -g pm2

echo "Building site."
npm run build

# Move into utilities
cd "server/database_utilities"

# Install sqlite3
CURRENT_SQLITE=$(which sqlite3)
if [ -z "$CURRENT_SQLITE" ]; then
    bash "install_sqlite.sh";
fi

# Generate database
bash "make_database.sh";

# Generate keys
bash "generate_keys.sh";

echo "Setup complete."
