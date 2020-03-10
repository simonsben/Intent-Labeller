#!/bin/bash

# Moving into working directory
cd server/

echo "Starting server."
pm2 start "server.js"
