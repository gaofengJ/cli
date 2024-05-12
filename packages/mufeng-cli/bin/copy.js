const fs = require('fs');
const path = require('path');
const copydir = require('copy-dir');
const Mustache = require('mustache');

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

/**
 * 读取模版中内容并返回
 */
const readTemplate = (dir, data = {}) => {
  const str = fs.readFileSync(dir, { encoding: 'utf8' });
  return Mustache.render(str, data);
};

exports.copyDir = copyDir;
exports.checkMkdirExists = checkMkdirExists;
exports.readTemplate = readTemplate;
