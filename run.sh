#!/bin/bash

PID=$(pm2 pid server);

# Check if service is already running
if [ -z "$PID" ]; then
    echo "Starting service.";
    
    # Moving into working directory and starting
    cd "server/";
    pm2 start "server.js";
    
    exit 0;
fi

# Restart service
echo "Restarting service.";
pm2 restart server;
