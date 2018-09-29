#!/bin/sh
mongoimport --db test --collection grades --file ./sample-grades.json --jsonArray
