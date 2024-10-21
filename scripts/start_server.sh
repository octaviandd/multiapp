#!/bin/bash

echo "Current directory:  $(pdw)" 
# Start the Node.js backend using PM2
cd /home/ec2-user/multiapp

# Build the TypeScript project and start using PM2
npm install
npm run build:prod
/usr/local/bin/pm2 start dist/index.js --name my-node-backend