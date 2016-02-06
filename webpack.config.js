var path = require('path');
var webpack = require('webpack');
var getEntries = require('./webpack.entries').getEntries;

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: getEntries("dev"),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/static/'
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    "lodash": "_"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx?/,
      loaders: ['babel'],
      include: path.join(__dirname, 'client')
    }, {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    }]
  }
};