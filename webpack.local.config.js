var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * This is the Webpack configuration file for local development and testing.
 * Since the HTML WebPack plugin is used, no files are actually generated;
 * everything is handled by the development server.
 * It contains local-specific configuration including:
 * - The entry point of the application
 * - Where the output file should be
 * - Which loaders to use on what files to properly transpile the source
 * For more information, see: http://webpack.github.io/docs/configuration.html
 */
module.exports = {
  devtool: 'eval-source-map',
  entry: {
    app: [
      'webpack-dev-server/client?//localhost:8000',
      'webpack/hot/only-dev-server',
      './example/index',
    ]
  },
  output: {
    publicPath: '//localhost:8000/',
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.WEB_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.BASE_URL': 'http://localhost:8000/',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  resolve: {
    modulesDirectories: ['node_modules', 'src']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel?stage=0'],
      }
    ]
  },
  devServer: {
    contentBase: './dist',
    quiet: true,
    hot: true,
    inline: true,
  }
};
