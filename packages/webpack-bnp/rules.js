/* eslint-env node */
const js = {
  test: /\.(js|cjs|mjs|jsx)$/,
  exclude: [/node_modules/],
  loader: 'babel-loader',
};

const js_eslint = {
  enforce: 'pre',
  test: /\.(js|cjs|mjs|jsx)$/,
  exclude: [/node_modules/],
  loader: 'eslint-loader',
};

const ts = {
  test: /\.(ts|tsx)$/,
  exclude: [/node_modules/],
  loader: 'babel-loader',
};

const json = {
  test: /\.json$/,
  loader: 'json-loader',
};

const ejs = {
  test: /\.ejs$/,
  loader: 'ejs-compiled-loader',
};

const html = {
  test: /\.html/,
  loader: 'html-loader',
};

const parse_styles = {
  // creates style nodes from JS strings
  loader: 'style-loader',
};

const parse_css = {
  // translates CSS into CommonJS
  loader: 'css-loader',
  options: { importLoaders: 1 },
};

const parse_postcss = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: [
      //require('postcss-normalize')(/* pluginOptions */)
      require('postcss-import'),
      require('tailwindcss')(`${process.env.APP_PATH}/tailwind.config.js`),
      require('postcss-nesting'),
      require('postcss-custom-properties'),
      require('autoprefixer'),
      ...(process.env.NODE_ENV === 'production' ? [require('cssnano')] : []),
    ],
  },
};

const parse_sass = {
  // compiles Sass to CSS
  loader: 'sass-loader',
};

const css = {
  test: /\.css$/,
  use: [parse_styles, parse_css, parse_postcss],
};

const sass = {
  test: /\.(sass)$/,
  use: [parse_styles, parse_css, parse_postcss, parse_sass],
};

const scss = {
  test: /\.(scss)$/,
  use: [parse_styles, parse_css, parse_postcss, parse_sass],
};

const font_eot = {
  test: /\.eot(\?v=\d+.\d+.\d+)?$/, //
  use: 'url-loader?limit=15000&mimetype=application/vnd.ms-fontobject',
};

const font_otf = {
  test: /\.otf(\?v=\d+.\d+.\d+)?$/, //
  use: 'url-loader?limit=15000&mimetype=application/x-font-opentype',
};

const font_ttf = {
  test: /\.ttf(\?v=\d+.\d+.\d+)?$/, //
  use: 'url-loader?limit=15000&mimetype=application/x-font-truetype',
};

const font_woff = {
  test: /\.woff?(\?v=[0-9]\.[0-9]\.[0-9])?$/, //
  use: 'url-loader?limit=15000&mimetype=application/font-woff',
};

const font_woff2 = {
  test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, //
  use: 'url-loader?limit=15000&mimetype=application/font-woff2',
};

const img = {
  test: /\.(png|jpg|gif)$/,
  use: 'url-loader?limit=15000&name=[name]-[hash].[ext]',
};

const svg = {
  test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
  oneOf: [
    {
      // foo.svg?inline
      resourceQuery: /inline/,
      loader: 'raw-loader',
    },
    {
      loader: 'url-loader?limit=15000&name=[name]-[hash].[ext]&mimetype=image/svg+xml',
    },
  ],
};

const raw = {
  test: /\.(xml|txt|md)$/,
  use: 'raw-loader',
};

module.exports = {
  js,
  js_eslint,
  ts,
  json,
  ejs,
  html,
  css,
  sass,
  scss,
  font_eot,
  font_otf,
  font_ttf,
  font_woff,
  font_woff2,
  img,
  svg,
  raw,
};
