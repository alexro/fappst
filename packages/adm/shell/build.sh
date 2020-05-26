#!/usr/bin/env bash

export APP_PATH=${APP_PATH:=$PWD/app} \
&& export APP_HASH=$(git rev-parse --short HEAD) \
&& export LOG_PATH=${LOG_PATH:=$PWD/logs} \
&& yarn run webpack --config=$PWD/app/webpack.config.js
