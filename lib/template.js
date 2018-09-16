/**
 * @author flyerjay
 * @desc 下载模板
 */

const ora = require('ora');
const download = require('download-git-repo');
const path = require('path');
const ask = require('./ask');
const logger = require('./logger');
const render = require('./render').renderConf;

const promptMaps = require('../prompts.json');

exports.vueTemplate = (rename) => {
  let spinner = ora('正在下载模板...');
  rename = rename || 'snow-default-project';
  let dest = path.resolve(process.cwd(), rename);
  let data = {};
  promptMaps[0].default = rename;
  ask(promptMaps, data, () => {
    spinner.start();
    download('JRFE/vue-template', dest, { clone: false }, (err) => {
      spinner.stop();
      if (err) {
        logger.error(err.message);
      } else {
        logger.success('模板下载成功: ', dest);
        spinner.text = "正在编译，请稍候...";
        spinner.start();

        let pkgPath = path.resolve(process.cwd(), rename, 'package.json');
        let uaPath = path.resolve(process.cwd(), rename, 'ua.json');
        Promise.all([
          render(pkgPath, data),
          render(uaPath, { name: data.name })
        ]).then(rs => {
          spinner.stop();
          logger.success('模板安装完成');
          process.exit();
        })
      }
    });
  })
}

