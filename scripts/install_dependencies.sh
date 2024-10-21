#!/bin/bash

chmod +x /home/ec2-user/multiapp/scripts/*.sh
sudo chown -R ec2-user:ec2-user /home/ec2-user/multiapp
find /home/ec2-user/multiapp -type d -exec chmod 755 {} \;
find /home/ec2-user/multiapp -type f -exec chmod 644 {} \;

# Navigate to the backend root (where the index.ts and package.json are)
cd /home/ec2-user/multiapp

# Install dependencies for Node.js backend
npm install

# Navigate to React client folder and install dependencies
cd /home/ec2-user/multiapp/client
npm install

# Build the React app
npm run build