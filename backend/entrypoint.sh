#!/bin/bash

echo "Entrypoint for WashTrak Backend"
echo "Script:       0.0.1"
echo "User:         '$(whoami)'"
echo "Group:        '$(id -g -n)'"
echo "Working dir:  '$(pwd)'"

# touch DB file

if [[ ! -f "database/database.db" ]]; then
    npm run setup
fi

echo "Starting Server!"
exec node server.js