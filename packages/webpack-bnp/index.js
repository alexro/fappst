/* eslint-env node */
const webpack = require('webpack');

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

const ejs = (options) => ({
  test: /\.ejs$/,
  use: {
    loader: 'ejs-compiled-loader',
    options: options,
  },
});

const json = () => ({
  test: /\.json$/,
  use: 'json-loader',
});

const html = (options) => ({
  test: /\.html/,
  use: {
    loader: 'html-loader',
    options: options,
  },
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

const raw = () => ({
  test: /\.(xml|txt|md)$/,
  use: 'raw-loader',
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

const prodPlugins = () => {
  const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
  return [new UglifyJSPlugin()];
};

const define = (options) => new webpack.DefinePlugin(options);
const provide = (options) => new webpack.ProvidePlugin(options);

// const DevServer = {
//   contentBase: resolve(root, 'public'),
//   port: 7700,
//   compress: true,
//   progress: true,
//   hot: true,
//   watchContentBase: true,
// };

module.exports = {
  rules: { babelJS, eslintJS, ejs, json, html, css, scss, fontEOT, fontWOFF, fontOTTF, img, imgSVG, raw },
  sourceMaps: { sourceMapDev, sourceMapProd },
  plugins: {
    copyPlugin,
    htmlPlugin,
    hotReloadPlugins,
    define,
    provide,
  },
};
