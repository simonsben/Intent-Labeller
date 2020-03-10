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
./install_sqlite.sh

# Generate database
./make_database.sh

# Generate keys
./generate_keys.sh

echo "Setup complete."
