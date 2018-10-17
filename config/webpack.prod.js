const path = require('path');
const Merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CommonConfig = require('./webpack.common.js');


module.exports = Merge(CommonConfig, {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      })
    ]
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].[hash:5].js'
  },
  // plugins: [
  //   new UglifyJsPlugin({
  //     cache: true,
  //     parallel: true,
  //     sourceMap: false
  //   })
  // ]

});
