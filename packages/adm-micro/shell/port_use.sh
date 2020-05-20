#!/usr/bin/env bash

PIDS=$(lsof -t -i:5001)
for PID in $PIDS
do
  ps -p $PID -o comm=
done
