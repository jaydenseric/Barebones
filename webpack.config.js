const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: [
    './components/app/index.js',
    './components/app/index.css'
  ],
  output: {
    path: './bundle',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            {
              loader: 'css-loader',
              query: {
                importLoaders: 1,
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      sourceMap: true
    }),
    new ExtractTextPlugin('bundle.css')
  ]
}
