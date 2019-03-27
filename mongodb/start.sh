#!/bin/sh
touch mongo.log
mkdir -p mongodb
mongod --fork --config mongo.conf
echo "mongodb running on 27017"
