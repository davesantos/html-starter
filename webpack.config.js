module.exports = function getWebpackConfig(env) {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  return require(`./webpack.${env}.js`);
};
