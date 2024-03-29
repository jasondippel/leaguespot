/**
 * Generic Webpack file for building prod files
 * Borrowed from https://github.com/learncodeacademy/react-js-tutorials/tree/master/2-react-router
 */

var debug = process.env.NODE_ENV === 'development';
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname, '.'),
  devtool: debug ? 'inline-sourcemap' : null,
  devServer: {
    inline: true
  },
  entry: './src/pages/app.jsx',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      },
      {
        test: /\.less?$/,
        exclude: /(node_modules)/,
        loader: 'style!css!less'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader?name=/public/images/[name].[ext]'
      }
    ]
  },
  output: {
    path: __dirname + '/dev/',
    publicPath: '/dev/',
    filename: 'app.min.js'
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
  ],
};
