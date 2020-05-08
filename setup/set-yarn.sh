#!/usr/bin/env bash

yarn add -W --dev \
@babel/core \
@babel/preset-env \
@babel/preset-react \
@babel/plugin-proposal-class-properties \
@babel/runtime \
babel-eslint \
babel-loader \
concurrently  \
dotenv \
eslint \
eslint-config-prettier \
eslint-import-resolver-webpack \
eslint-loader \
eslint-plugin-chai-friendly \
eslint-plugin-import \
eslint-plugin-jsx-a11y \
eslint-plugin-react \
lerna \
prettier \
webpack \
webpack-dev-middleware \
webpack-hot-middleware \
webpack-cli



yarn add -W \
express \
express-http-proxy \
express-session



cp .eslintrc.js ../packages/adm
cp .prettierignore ../packages/adm
cp prettier.config.js ../packages/adm