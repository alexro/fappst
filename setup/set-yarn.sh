#!/usr/bin/env bash

yarn add -W --dev \
babel-eslint \
concurrently  \
eslint \
eslint-config-prettier \
eslint-import-resolver-webpack \
eslint-loader \
eslint-plugin-chai-friendly \
eslint-plugin-import \
eslint-plugin-jsx-a11y \
eslint-plugin-react \
lerna \
prettier

yarn add -W express

cp .eslintrc.js ../packages/adm
cp .prettierignore ../packages/adm
cp prettier.config.js ../packages/adm