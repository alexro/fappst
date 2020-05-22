#!/usr/bin/env bash

rm ../server
ln -s -r ../../admserver ../server

yarn run lerna add @clich/webpack-bnp --scope=adm
