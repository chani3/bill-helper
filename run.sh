#!/bin/bash
#run the app, and open any other tools I need.

node app.js &
nodePid=$!
echo pid is $nodePid
trap "echo killing node...; kill $nodePid" EXIT
#TODO get port from config
firefox --new-window http://localhost:3001/
wait $nodePid