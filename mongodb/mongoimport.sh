#!/bin/sh
mongoimport --db test --collection grades --file ./sample-grades.json --jsonArray
mongoimport --db test --collection diagnostics --file ./sample-diagnostics.json --jsonArray
