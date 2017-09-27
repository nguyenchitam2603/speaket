const fs = require("fs");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

const serverPath = path.resolve(__dirname, "..", "..");
const sourcePath = path.resolve(serverPath, "src");
const distPath = path.resolve(serverPath, "dist");

var nodeModules = {};
fs.readdirSync("node_modules")
  .filter(function (x) {
    return [".bin"].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = "commonjs " + mod;
  });

module.exports = {
  target: "node",
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
        enforce: "pre",
        loader: "tslint-loader",
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
    ]),
    new webpack.DefinePlugin({
      "process.env": {
        // Environment
        "ENVIRONMENT": JSON.stringify("PROD"),

        // Server config variables
        "PORT": "process.env.PORT"
      }
    })
  ]
}
