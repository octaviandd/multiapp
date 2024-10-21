#!/bin/bash

# Start the Node.js backend using PM2
cd /home/ec2-user/multiapp

# Build the TypeScript project and start using PM2
npm run build:prod
pm2 start dist/index.js --name my-node-backend 

# Serve the React app (assuming it’s already built)
cd /home/ec2-user/multiapp/client

npm run build