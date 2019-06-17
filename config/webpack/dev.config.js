var webpack = require('webpack');
var merge = require('webpack-merge');

var baseConfig = require('./base.config');
var devConfig = {};

module.exports = merge.smart(baseConfig, devConfig);
