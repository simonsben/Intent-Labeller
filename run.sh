#!/bin/bash

PID=$(pm2 pid production_app);

# Check if service is already running
if [ -z "$PID" ]; then
    echo "Starting service.";
    
    # Moving into working directory and starting
    cd "server/";
    pm2 start "production_app.js";
    
    exit 0;
fi

# Restart service
echo "Restarting service.";
pm2 restart production_app;
