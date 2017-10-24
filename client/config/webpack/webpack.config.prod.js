const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const clientPath = path.resolve(__dirname, "..", "..");
const sourcePath = path.resolve(clientPath, "src");
const distPath = path.resolve(clientPath, "dist");

module.exports = {
  context: sourcePath,
  entry: {
    app: [
      "./index.tsx"
    ],
    vendor: [
      "classnames",
      "is-relative-url",
      "react",
      "react-dom",
      "react-redux",
      "react-router",
      "react-router-dom",
      "redux",
      "redux-actions",
      "redux-thunk"
    ]
  },
  output: {
    path: distPath,
    filename: "js/client.bundle.js"
  },
  resolve: {
    extensions: [".css", ".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          emitErrors: true,
          failOnHint: false
        }
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          "awesome-typescript-loader",
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: "[path][name]__[local]--[hash:base64:5]"
              }
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: [
                  require('postcss-import')(),
                  require('postcss-url')(),
                  require('postcss-cssnext')(),
                ]
              }
            }
          ]
        })
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: 'url-loader?limit=100000&name=./fonts/[name].[ext]'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
      }
    }),
    new ExtractTextPlugin("css/main.css"),
    new webpack.optimize.CommonsChunkPlugin({ names: ["vendor"], filename: 'js/[name].bundle.js' }),
    new UglifyJSPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    }),
    new CleanWebpackPlugin([distPath], {
      root: clientPath
    }),
    new CopyWebpackPlugin([
      // Relative to context path (src) in this case
      { from: '../node_modules/gentelella/vendors/jquery/dist/jquery.min.js', to: 'js/jquery.min.js' },
      { from: '../node_modules/gentelella/vendors/bootstrap/dist/js/bootstrap.min.js', to: 'js/bootstrap.min.js' },
      { from: '../node_modules/gentelella/build/js/custom.min.js', to: 'js/custom.min.js' },

      { from: '../node_modules/gentelella/vendors/bootstrap/dist/css/bootstrap.min.css', to: 'css/bootstrap.min.css' },
      { from: '../node_modules/gentelella/vendors/bootstrap/dist/css/bootstrap.min.css.map', to: 'css/bootstrap.min.css.map' },
      { from: '../node_modules/gentelella/vendors/font-awesome/css/font-awesome.min.css', to: 'css/font-awesome.min.css' },
      { from: '../node_modules/gentelella/vendors/nprogress/nprogress.css', to: 'css/nprogress.css' },
      { from: '../node_modules/gentelella/vendors/iCheck/skins/flat/green.css', to: 'css/green.css' },
      { from: '../node_modules/gentelella/vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css', to: 'css/bootstrap-progressbar-3.3.4.min.css' },
      { from: '../node_modules/gentelella/vendors/jqvmap/dist/jqvmap.min.css', to: 'css/jqvmap.min.css' },
      { from: '../node_modules/gentelella/vendors/bootstrap-daterangepicker/daterangepicker.css', to: 'css/daterangepicker.css' },
      { from: '../node_modules/gentelella/build/css/custom.min.css', to: 'css/custom.min.css' },
      { from: '../node_modules/bootstrap-social/bootstrap-social.css', to: 'css/bootstrap-social.css' },

      { from: '../node_modules/gentelella/vendors/font-awesome/fonts/fontawesome-webfont.*', to: 'fonts/[name].[ext]' },
      { from: '../node_modules/gentelella/vendors/bootstrap/dist/fonts/glyphicons-halflings-regular.*', to: 'fonts/[name].[ext]' },
    ]),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: [
        'css/bootstrap.min.css',
        'css/font-awesome.min.css',
        'css/nprogress.css',
        'css/green.css',
        'css/bootstrap-progressbar-3.3.4.min.css',
        'css/jqvmap.min.css',
        'css/daterangepicker.css',
        'css/custom.min.css',
        'css/bootstrap-social.css'
      ],
      append: false
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: [
        'js/jquery.min.js',
        'js/bootstrap.min.js'
      ],
      append: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'ENVIROMENT': JSON.stringify('PRODUCTION'),
        'PORT': JSON.stringify(''),

        // Social App Ids
        'FACEBOOK_APP_ID': JSON.stringify('1762885930450916'),
        'GOOGLE_APP_ID': JSON.stringify('984254288650-r5hivgg7sj5ab0eksuf968vmrqu969t8.apps.googleusercontent.com')
      }
    })
  ]
}