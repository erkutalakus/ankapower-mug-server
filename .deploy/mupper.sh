#!/usr/bin/env bash
echo "*****************************"
echo "*---------Mupper.sh-----moi-*"
echo "*****************************"

if [ -z $1 ]; then
    echo "Command me!"
fi

if [ $1 = "deploy" ]; then
    echo "Deploying..."
    mup.cmd deploy --verbose
elif [ $1 = "setup" ]; then
    echo "Initializing server..."
    mup.cmd setup --verbose
elif [ $1 = "install" ]; then
    echo "Installing mup..."
    npm install -g npm@latest && npm i -g mup
else
    echo "Invalid argument."
fi
