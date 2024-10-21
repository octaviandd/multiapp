#!/bin/bash

echo "Current directory:  $(pwd)" 
# Make scripts executable
chmod +x /home/ec2-user/multiapp/scripts/*.sh

# Ensure the correct ownership of files
sudo chown -R ec2-user:ec2-user /home/ec2-user/multiapp

# Navigate to the backend root (multiapp)
cd /home/ec2-user/multiapp

# Install dependencies for Node.js backend
npm install

# Navigate to React client folder (relative path since you're in multiapp)
cd client

# Install dependencies for React frontend
npm install

# Run the production build for React frontend
npm run build
