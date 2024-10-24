#!/bin/bash

echo "Current directory:  $(pwd)" 
# Start the Node.js backend using PM2
cd /home/ec2-user/multiapp

# Build the TypeScript project and start using PM2
npm install
npm run build:prod
/usr/local/bin/pm2 start ecosystem.config.js --env production --name my-node-backend