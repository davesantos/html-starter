const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const path = require('path');

module.exports = Merge(CommonConfig, {
  output: {
    path: path.resolve('dist'),
    filename: '[name].js'
  },
  devServer: {
    // contentBase: path.join(__dirname, 'js')
    stats: 'errors-only'
  }
});
