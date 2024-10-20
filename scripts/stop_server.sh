#!/bin/bash

rm -rf /home/ec2-user/multiapp/*

# Stop Node.js backend and React frontend
pm2 stop my-node-backend || true
pm2 stop my-react-client || true