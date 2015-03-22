var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    test: './bin/tests/test.js'
  },
  output: {
    publicPath: '',
    path: path.join(__dirname, '/bin/tests/.tmp/public/'),
    filename: '[name].js'
  },
  resolveLoader: {
    modulesDirectories: [
      'web_modules',
      'node_modules'
    ]
  },
  resolve: {
    extensions: ['','.js']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel']
      }
    ]
  }
};
