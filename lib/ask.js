/**
 * @author flyerjay
 * @desc 问询配置
 */

const inquirer = require('inquirer');
const async = require('async')

module.exports = function ask(promps, data, done) {
  data = data || {};
  async.eachSeries(promps, (v, next) => {
    inquirer.prompt({
      type: 'input',
      name: v.name,
      message: v.description,
      default: v.default
    }).then(rs => {
      data[v.name] = rs[v.name];
      next();
    }).catch(next);
  }, done);
}
