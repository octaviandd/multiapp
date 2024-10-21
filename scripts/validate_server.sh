#!/bin/bash
# Simple health check (adjust as needed)
echo "Current directory:  $(pdw)" 
curl -f http://localhost:8000/  # Replace with your app's port

curl -f http://localhost || exit 1