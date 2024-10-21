#!/bin/bash

echo "Current directory:  $(pwd)" 
sudo chown -R ec2-user:ec2-user /home/ec2-user/multiapp
sudo rm -rf /home/ec2-user/multiapp/*

# Stop Node.js backend and React frontend
pm2 stop my-node-backend || true
