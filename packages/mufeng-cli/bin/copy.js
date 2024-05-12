const fs = require('fs');
const copydir = require('copy-dir');

/**
 * 复制文件
 */
const copyDir = (from, to, options) => {
  copydir.sync(from, to, options);
};

/**
 * 判断目录是否存在
 */
const checkMkdirExists = (path) => fs.existsSync(path);

exports.copyDir = copyDir;
exports.checkMkdirExists = checkMkdirExists;
