/**
 * @author flyerjay
 * @desc 模板处理
 */

const fs = require('fs');
const logger = require('./logger');

function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, file) => {
      if (err) {
        reject(err);
      } else {
        resolve(Buffer.from(file).toString('utf-8'));
      }
    })
  });
}

exports.renderConf = function(path, data) {
  return readFile(path).then(file => {
    for (let key in data) {
      let exp = new RegExp(`"${key}":\\s*"(.*)"`);
      file = file.replace(exp, `"${key}": "${data[key]}"`);
    }
    try {
      fs.writeFileSync(path, file);
    } catch(err) {
      logger.error('模板编译出错');
      process.exit();
    }
    return true;
  })
  .catch(err => {
    return err
  })
}