const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const atImport = require('postcss-import')
const cssnext = require('postcss-cssnext')
const reporter = require('postcss-reporter')

module.exports = {
  entry: [
    path.join(__dirname, 'components/app/index.js'),
    path.join(__dirname, 'components/app/index.css')
  ],
  output: {
    path: path.join(__dirname, 'bundle'),
    publicPath: '/bundle/',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css!postcss')
    }]
  },
  postcss: function (webpack) {
    return [
      atImport({addDependencyTo: webpack}),
      cssnext,
      reporter({clearMessages: true})
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new ExtractTextPlugin('bundle.css')
  ]
}
