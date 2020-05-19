#!/usr/bin/env bash

rm ../server
ln -s -r ../../admserver ../server

lerna add @clich/webpack-bnp --scope=@*/appserver
