/* eslint-env node */
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const babelJS = () => ({
  test: /\.(js|jsx)$/,
  use: 'babel-loader',
  exclude: [/node_modules/],
});

const eslintJS = () => ({
  enforce: 'pre',
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'eslint-loader',
});

const html = () => ({
  test: /\.html/,
  loader: 'raw-loader',
});

const css = () => ({
  test: /\.css$/,
  use: [
    'style-loader',
    { loader: 'css-loader', options: { importLoaders: 1 } },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: () => [require('postcss-normalize')(/* pluginOptions */)],
      },
    },
  ],
});

const scss = () => ({
  test: /\.(sass|scss)$/,
  use: [
    {
      loader: 'style-loader', // creates style nodes from JS strings
    },
    {
      loader: 'css-loader',
      options: { importLoaders: 1 }, // translates CSS into CommonJS
    },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: () => [require('postcss-normalize')(/* pluginOptions */)],
      },
    },
    {
      loader: 'sass-loader', // compiles Sass to CSS
    },
  ],
});

const fontEOT = () => ({
  test: /\.eot(\?v=\d+.\d+.\d+)?$/, //
  use: 'file-loader',
});

const fontWOFF = () => ({
  test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, //
  use: 'url-loader?limit=10000&mimetype=application/font-woff',
});

const fontOTTF = () => ({
  test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, //
  use: 'url-loader?limit=10000&mimetype=application/octet-stream',
});

const img = () => ({
  test: /\.(png|jpg|gif)$/, //
  use: 'url-loader?limit=15000&name=[name]-[hash].[ext]',
});

const imgSVG = () => ({
  test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,

  oneOf: [
    {
      resourceQuery: /inline/, // foo.svg?inline
      use: 'raw-loader',
    },
    {
      // resourceQuery: /external/, // foo.png?external
      use: 'url-loader?limit=10000&mimetype=image/svg+xml',
    },
  ],
});

const sourceMapDev = () => 'cheap-module-eval-source-map';

const sourceMapProd = () => 'source-map';

const copyPlugin = (options) => {
  const CopyPlugin = require('copy-webpack-plugin');
  return new CopyPlugin(options);
};

const htmlPlugin = (options) => {
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  return new HtmlWebpackPlugin(options);
};

const hotReloadPlugins = () => [
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

const definePlugin = (obj) => new webpack.DefinePlugin(obj);

// const DevServer = {
//   contentBase: resolve(root, 'public'),
//   port: 7700,
//   compress: true,
//   progress: true,
//   hot: true,
//   watchContentBase: true,
// };

module.exports = {
  rules: { babelJS, eslintJS, html, css, scss, fontEOT, fontWOFF, fontOTTF, img, imgSVG },
  sourceMaps: { sourceMapDev, sourceMapProd },
  plugins: {
    copyPlugin,
    definePlugin,
    htmlPlugin,
    hotReloadPlugins,
  },
};
