const { resolve } = require("path");
const root = resolve(__dirname, "..");

require("dotenv").config({ path: resolve(__dirname, ".env") });

const {
  HTML_Raw,
  SASS,
  JS_Babel,
  SourceMap_Dev,
  Plugin_HTML,
  Plugins_HotReload,
  define,
} = require("./webpack-blocks");

const config = {
  mode: "development",
  context: root,
  entry: [
    "webpack-hot-middleware/client",
    "react-hot-loader/patch",
    resolve(root, "src/index.js"),
  ],
  output: {
    path: resolve(root, "dist"), // Folder to store generated bundle
    filename: "bundle.js", // Name of generated bundle after build
    publicPath: "/", // public URL of the output directory when referenced in a browser
  },
  devtool: SourceMap_Dev,
  module: {
    rules: [HTML_Raw, SASS, JS_Babel],
  },
  plugins: [
    define({ API_KEY: process.env.API_KEY }),
    Plugin_HTML,
    ...Plugins_HotReload,
  ],
};

module.exports = config;
