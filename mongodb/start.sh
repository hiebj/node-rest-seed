#!/bin/sh
touch mongo.log
mkdir  mongodb
mongod --config mongo.conf
echo "mongodb running on 27017"
