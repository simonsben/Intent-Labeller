#!/bin/bash

# Move back up
cd ../

KEY_NAME="auth/auth_key"

# Make auth directory for keys
if [ ! -d "auth/" ]; then
    echo "Creating a directory for the auth keys";
    mkdir auth;
fi

# Generate key
echo "Generating authentication key."
ssh-keygen -q -t rsa -b 4096 -f "$KEY_NAME" -C "data_labeller" -N ''

# Clipping start and end of key
tail -n +2 "$KEY_NAME" | head -n -1 > "auth/private.key"
rm "$KEY_NAME"

mv "auth/auth_key.pub" "auth/public.key"
