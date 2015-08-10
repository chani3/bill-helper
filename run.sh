#!/bin/bash
#run the app, and open any other tools I need.

node app.js &
nodePid=$!
echo pid is $nodePid
trap "echo killing node...; kill $nodePid" EXIT

port=$(jq '.port' settings.json)
firefox --new-window http://localhost:$port/
wait $nodePid