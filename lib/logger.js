/**
 * @author flyerjay
 * @desc 日志着色
 */

const chalk = require('chalk');
const format = require('util').format

const prefix = '   __SNOW-CLI__';
const sep = '.';

exports.log = (...args) => {
  const msg = format.apply(format, args);
  console.log(prefix, chalk.gray(sep), msg);
}

exports.error = (...args) => {
  const msg = format.apply(format, args);
  console.log(chalk.red(prefix), chalk.gray(sep), msg);
}

exports.success = (...args) => {
  const msg = format.apply(format, args);
  console.log(chalk.green(prefix), chalk.gray(sep), msg);
}