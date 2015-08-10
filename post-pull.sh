#!/bin/bash
#a little script for the things I'll forget after a new checkout.
npm install
if [ -e settings.json ]; then
    nodemon app.js
else
    echo "remember to restore settings.json"
fi

