const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports =  {
  mode: 'development',
  context: path.join(__dirname, 'src'),
  mode: 'none',
  entry: './main.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  devServer: {
    // contentBase: path.join(__dirname, 'js')
    stats: 'errors-only'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Webpack Starter',
      // minify: {
      //   collapseWhitespace: true,
      //   preserveLineBreaks: true
      // },
      hash: true,
      template: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../'
            }
          },
          "css-loader",
          "sass-loader"
       ]
      }
    ]
  }
};``
