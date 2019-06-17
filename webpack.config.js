const Webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

const UglifyPlugin = new UglifyJsWebpackPlugin({
  exclude: [/\.min\.js$/gi] // skip pre-minified libs
});

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
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
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.(jpg|gif|png)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/images/[name].[ext]",
            }
          },
        ]
      },
    ]
  },
  plugins: [htmlPlugin, UglifyPlugin]
};
