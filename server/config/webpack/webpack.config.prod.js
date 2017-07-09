var fs = require('fs');
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const serverPath = path.resolve(__dirname, "..", "..");
const sourcePath = path.resolve(serverPath, "src");
const distPath = path.resolve(serverPath, "dist");

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  target: 'node',
  context: sourcePath,
  entry: "./server.ts",
  output: {
    filename: "js/server.bundle.js",
    path: distPath
  },
  externals: nodeModules,
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts)?$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          emitErrors: true,
          failOnHint: false
        }
      },
      {
        test: /\.ts$/,
        use: [
          "awesome-typescript-loader",
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([distPath], {
      root: serverPath
    }),
    new CopyWebpackPlugin([
      { 
        from: path.resolve(serverPath, "package.json"),
        to: distPath
      }
    ])
  ]
}