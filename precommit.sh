#!/bin/sh
set -e
changedFiles=$(git diff --cached --name-only --diff-filter=ACM | grep '\.m\?[tj]sx\?$' | tr '\n' ' ')
[ -z "$changedFiles" ] && exit 0

echo "$changedFiles" | xargs ./node_modules/.bin/prettier --write
echo "$changedFiles" | xargs git add
