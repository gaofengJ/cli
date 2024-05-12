const fs = require('fs');
const path = require('path');
const copydir = require('copy-dir');

/**
 * 创建目录
 */
const mkdir = (dir) => {
  if (fs.existsSync(dir)) return true;
  const dirname = path.dirname(dir);
  mkdir(dirname);
  fs.mkdirSync(dir);
};

/**
 * 目录守护，防止中间目录不存在
 */
const mkdirGuard = (target) => {
  try {
    fs.mkdirSync(target, { recursive: true });
  } catch (e) {
    mkdir(target);
  }
};

/**
 * 拷贝文件
 */
const copyFile = (from, to) => {
  const buffer = fs.readFileSync(from);
  const parentPath = path.dirname(to);

  mkdirGuard(parentPath);

  fs.writeFileSync(to, buffer);
};

/**
 * 复制目录
 */
const copyDir = (from, to, options) => {
  copydir.sync(from, to, options);
};

/**
 * 判断目录是否存在
 */
const checkMkdirExists = (dir) => fs.existsSync(dir);

exports.copyDir = copyDir;
exports.checkMkdirExists = checkMkdirExists;
