const { resolve } = require('path');
const root = resolve(__dirname, '.');

require('dotenv').config({ path: resolve(root, '.env') });

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const ENV = process.env.APP_ENV;
const isTest = ENV === 'test';
const isProd = ENV === 'prod';

function setDevTool() {
  if (isTest) {
    return 'inline-source-map';
  } else if (isProd) {
    return '(none)';
  } else {
    return 'eval-cheap-source-map';
  }
}

const config = {
  mode: 'development',
  entry: resolve(root, 'src/index.js'),
  output: {
    path: resolve(root, 'dist'), // Folder to store generated bundle
    filename: 'bundle.js', // Name of generated bundle after build
    publicPath: '/', // public URL of the output directory when referenced in a browser
  },
  devtool: setDevTool(),
  module: {
    // where we defined file patterns and their loaders
    rules: [
      {
        test: /\.html/,
        loader: 'raw-loader',
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: [/node_modules/],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      API_KEY: JSON.stringify(process.env.API_KEY),
    }),
    new HtmlWebpackPlugin({
      template: resolve(root, 'public/index.html'),
      inject: 'body',
    }),
  ],
  devServer: {
    // configuration for webpack-dev-server
    contentBase: resolve(root, 'public'), //source of static assets
    port: 7700, // port to run dev-server
    compress: true,
    progress: true,
    hot: true,
    watchContentBase: true,
  },
};

if (isProd) {
  console.log('aga - is prod!')
  config.plugins.push(
    new UglifyJSPlugin()
    // new CopyWebpackPlugin([
    //   {
    //     from: __dirname + '/src/public',
    //   },
    // ])
  );
}

module.exports = config;
