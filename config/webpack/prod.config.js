var webpack = require('webpack');
var merge = require('webpack-merge');

var baseConfig = require('./base.config');
var optimizationConfig = require('./opt.config');

const prodConfig = function (env) {
  const NODE_ENV = env.NODE_ENV ? env.NODE_ENV : 'development';
  return {
    plugins: [
      new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(NODE_ENV) }),
    ]
  };
}

module.exports = merge.smart(baseConfig, optimizationConfig, prodConfig);