const CopyWebpackPlugin = require('copy-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const clientPath = path.resolve(__dirname, "..", "..");
const sourcePath = path.resolve(clientPath, "src");

module.exports = {
  context: sourcePath,
  entry: {
    app: [
      "react-hot-loader/patch",
      "./index.tsx"
    ]
  },
  output: {
    filename: "client.bundle.js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".css", ".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          "react-hot-loader/webpack",
          "awesome-typescript-loader",
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
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
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "index.html"
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    }),
    new CopyWebpackPlugin([
      // Relative to context path (src) in this case
      { from: '../node_modules/jquery/dist/jquery.min.js', to: 'js/jquery.min.js' },
      { from: '../node_modules/gentelella/vendors/bootstrap/dist/js/bootstrap.min.js', to: 'js/bootstrap.min.js' },
      { from: '../node_modules/gentelella/build/js/custom.min.js', to: 'js/custom.min.js' },

      { from: '../node_modules/gentelella/vendors/bootstrap/dist/css/bootstrap.min.css', to: 'css/bootstrap.min.css' },
      { from: '../node_modules/gentelella/vendors/font-awesome/css/font-awesome.min.css', to: 'css/font-awesome.min.css' },
      { from: '../node_modules/gentelella/vendors/nprogress/nprogress.css', to: 'css/nprogress.css' },
      { from: '../node_modules/gentelella/vendors/iCheck/skins/flat/green.css', to: 'css/green.css' },
      { from: '../node_modules/gentelella/vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css', to: 'css/bootstrap-progressbar-3.3.4.min.css' },
      { from: '../node_modules/gentelella/vendors/jqvmap/dist/jqvmap.min.css', to: 'css/jqvmap.min.css' },
      { from: '../node_modules/gentelella/vendors/bootstrap-daterangepicker/daterangepicker.css', to: 'css/daterangepicker.css' },
      { from: '../node_modules/gentelella/build/css/custom.min.css', to: 'css/custom.min.css' },

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
        'css/custom.min.css'
      ],
      append: false
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: [
        'js/jquery.min.js',
        'js/bootstrap.min.js',
        'js/custom.min.js'
      ],
      append: true
    }),
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp 
      exclude: /node_modules/,
      // add errors to webpack instead of warnings 
      failOnError: true
    })
  ],
  devServer: {
    hot: true,
    inline: true,
    contentBase: clientPath,
    open: true,
    historyApiFallback: true
  }
}