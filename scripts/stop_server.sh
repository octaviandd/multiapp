#!/bin/bash

rm -rf /home/ec2-user/multiapp/*

chmod +x scripts/clean_old_files.sh

# Stop Node.js backend and React frontend
pm2 stop my-node-backend || true
pm2 stop my-react-client || true