#!/bin/sh
touch mongo.log
mkdir mongodb
mongod --fork --config mongo.conf
echo "mongodb running on 27017"
