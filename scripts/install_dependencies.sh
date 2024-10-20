#!/bin/bash

# Navigate to the backend root (where the index.ts and package.json are)
cd /home/ec2-user/multiapp

# Install dependencies for Node.js backend
npm install

# Navigate to React client folder and install dependencies
cd /home/ec2-user/multiapp/client
npm install

# Build the React app
npm run build