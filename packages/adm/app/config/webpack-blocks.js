/* eslint-env node */

const { resolve } = require("path");
const root = resolve(__dirname, "..");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const HTML_Raw = {
  test: /\.html/,
  loader: "raw-loader",
};

const JS_Babel = {
  test: /\.(js|jsx)$/,
  use: "babel-loader",
  exclude: [/node_modules/],
};

const JS_Eslint = {
  enforce: "pre",
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: "eslint-loader",
};

const CSS = {
  test: /\.css$/,
  use: ["style-loader", "css-loader"],
};

const SASS = {
  test: /\.(sass|scss)$/,
  use: [
    {
      loader: "style-loader", // creates style nodes from JS strings
    },
    {
      loader: "css-loader", // translates CSS into CommonJS
    },
    {
      loader: "sass-loader", // compiles Sass to CSS
    },
  ],
};

const IMG = {
  test: /\.(png|jpg|gif)$/, //
  use: "url-loader?limit=15000&name=[name]-[hash].[ext]",
};

const IMG_SVG = {
  test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,

  oneOf: [
    {
      resourceQuery: /inline/, // foo.svg?inline
      use: "raw-loader",
    },
    {
      // resourceQuery: /external/, // foo.png?external
      use: "url-loader?limit=10000&mimetype=image/svg+xml",
    },
  ],
};

const Font_EOT = {
  test: /\.eot(\?v=\d+.\d+.\d+)?$/, //
  use: "file-loader",
};

const Font_WOFF = {
  test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, //
  use: "url-loader?limit=10000&mimetype=application/font-woff",
};

const Font_OTTF = {
  test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, //
  use: "url-loader?limit=10000&mimetype=application/octet-stream",
};

const SourceMap_Dev = "cheap-module-source-map";
const SourceMap_Prod = "source-map";

const Plugin_HTML = new HtmlWebpackPlugin({
  template: resolve(root, "public/index.html"),
  inject: "body",
});

const Plugins_HotReload = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.HotModuleReplacementPlugin(),
];

const Plugins_Prod = [
  new UglifyJSPlugin(),
  // new CopyWebpackPlugin([
  //   {
  //     from: __dirname + '/src/public',
  //   },
  // ])
];

function define(obj) {
  return new webpack.DefinePlugin(obj);
}

const DevServer = {
  contentBase: resolve(root, "public"),
  port: 7700,
  compress: true,
  progress: true,
  hot: true,
  watchContentBase: true,
};

module.exports = {
  HTML_Raw,
  JS_Babel,
  CSS,
  SASS,
  IMG,
  Font_EOT,
  Font_WOFF,
  Font_OTTF,
  SourceMap_Dev,
  SourceMap_Prod,
  Plugin_HTML,
  Plugins_HotReload,
  Plugins_Prod,
  DevServer,
  define,
};
