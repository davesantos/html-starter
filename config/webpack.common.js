const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const postcssConfig = require('./postcss.config.js');

let cleanOptions = {
  allowExternal: true
}

module.exports =  {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  context: path.join(__dirname, '../src'),
  entry: './main.js',
  plugins: [
    new CleanWebpackPlugin(['../dist'], cleanOptions),
    new HtmlWebpackPlugin({
      title: 'Webpack Starter',
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true
      },
      hash: true,
      template: './index.pug'
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash:6].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash:6].css',
    })
  ],
  module: {
    rules: [
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name () {
              if (devMode) {
                return '[name].[ext]?[hash:4]';
              }
              return '[name]-[sha512:hash:base64:6].[ext]';
            },
            outputPath: 'fonts/',
            publicPath: '/fonts/'
          },
        }]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: './config/'
              }
            }
          },
          'sass-loader',
        ],
      },
      {
        test: /\.pug$/,
        use: [
          'html-loader',
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|svg|gif|ico)$/i,
        use:[
          {
            loader: 'url-loader',
            options: {
                limit: 8192, // Convert images < 8kb to base64 strings
                name: 'images/[sha512:hash:base64:7]-[name].[ext]'
            }
          }
          // {
          //   loader: 'file-loader',
          //   options: {
          //     name: '[name]-[hash:6].[ext]',
          //     // name (file) {
          //     //   if (devMode) {
          //     //     return '[path][name].[ext]'
          //     //   }
          //     //   return '[sha512:hash:base64:7].[ext]'
          //     // },
          //     outputPath: 'assets/',
          //     publicPath: '/assets/',
          //   }
          // },
        ]
      },
    ]
  }
};
