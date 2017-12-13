/*jshint esversion: 6 */
(function () {
  "use strict";
  const path = require("path");
  const webpack = require("webpack");
  const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
  const CopyWebpackPlugin = require("copy-webpack-plugin");
  const HtmlWebpackPlugin = require("html-webpack-plugin");

  const config = {
    entry: {
      app: './src/js/app.js'
    },
    output: {
      filename: '[name].build.js',
      path: path.resolve(__dirname + '/build')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        },
        {
          test: /\.css$/,
          use: 'css-loader'
        },
        {
          test: /\.(scss|sass)$/,
          use: ExtractTextWebpackPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader", "sass-loader"],
          })
        },
        { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "url-loader?limit=10000&mimetype=application/font-woff",
          options: {
            name: "fonts/[name].[ext]"
          }
        },
        { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "file-loader",
          options: {
            name: "fonts/[name].[ext]"
          }
        },
        {
          test: /\.(png|jpg|jpeg|gif)/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "img/[name].[ext]",
              }
            }
          ]
        }
      ]
    },
    watch: true,
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      }),
      new ExtractTextWebpackPlugin("css/app.build.css"),
      new HtmlWebpackPlugin({
        title: 'Index',
        filename: 'index.html',
        template: 'src/index.html'
      }),
      new HtmlWebpackPlugin({
        title: 'About',
        filename: 'about.html',
        template: 'src/about.html'
      }),
      new HtmlWebpackPlugin({
        title: 'Clients',
        filename: 'clients.html',
        template: 'src/clients.html'
      }),
      new HtmlWebpackPlugin({
        title: 'Projects',
        filename: 'projects.html',
        template: 'src/projects.html'
      }),
      new HtmlWebpackPlugin({
        title: 'Cart',
        filename: 'cart.html',
        template: 'src/cart.html'
      }),
      new CopyWebpackPlugin([
        {
          from: './src/img',
          to: 'img'
        },
        {
          from: './src/media',
          to: 'media'
        }
      ])
    ]
  };

  module.exports = config;
}());
