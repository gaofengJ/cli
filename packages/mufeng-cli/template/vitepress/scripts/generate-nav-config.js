const fs = require('fs');
const path = require('path');

const EXCLUDED_FOLDERS = ['public'];
const INCLUDE_FILE_TYPE = ['md'];
const targetPath = path.join(__dirname, '../docs/src');
// 输出文件地址
const outputPath = path.join(targetPath, 'nav-config.mts');

/**
 * 获取文件名后缀
 */
const getFileExtension = (fileName) => {
  const match = fileName.match(/\.([^.]+)$/);
  if (match) {
    return match[1];
  }
  return ''; // 如果没有匹配到点，返回空字符串或其他默认值
};

/**
 * 获取md中title属性
 */
const getTitleOfMarkdown = (file) => {
  try {
    const data = fs.readFileSync(file, 'utf8');
    // 使用正则表达式匹配title的值
    const titleMatch = data.match(/title:\s*(.*)/);
    return titleMatch[1] || '';
  } catch (e) {
    console.log('e', e);
  }
};

/**
 * 写文件
 */
const writeFile = async (config) => {
  const sortOrder = {
    Nav1: 1,
    Nav2: 2,
    Nav3: 3,
  };
  const sortedConfig = config.sort((a, b) => sortOrder[a.text] - sortOrder[b.text]);
  let str = JSON.stringify(sortedConfig, null, 2);
  str = str.replace(/"/g, "'");
  await fs.writeFileSync(outputPath, `export default ${str}`);
};

/**
 * 获取存放源md文件的目录
 */
const getDirsPath = () => {
  try {
    const ret = [];
    const dirs = fs.readdirSync(targetPath);
    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i];
      if (EXCLUDED_FOLDERS.includes(dir)) continue;
      const tempPath = path.join(targetPath, dir);
      const stat = fs.statSync(tempPath);
      if (stat.isDirectory()) {
        ret.push(tempPath);
      }
    }
    return ret;
  } catch (e) {
    console.log('e', e);
  }
};

/**
 * 生成nav config
 */
const getNavConfig = (dirs) => {
  const regex = /\/([^/]+)$/; // 匹配最后一个斜杠后面的内容
  const config = [];
  for (let i = 0; i < dirs.length; i++) { // 遍历一级路径
    const dir = dirs[i];
    const configItem = {};
    const indexPath = `${dir}/index.md`;
    const titleOfMd = getTitleOfMarkdown(indexPath);
    configItem.text = titleOfMd;
    const lastPathOfFistLevel = dir.match(regex)[1]; // 获取最后一级路径作为key

    const secondLevelDirs = fs.readdirSync(dir);
    for (let j = 0; j < secondLevelDirs.length; j++) { // 遍历二级路径
      const secondLevelDir = secondLevelDirs[j];
      const secondLevelDirPath = path.join(dir, secondLevelDir);
      const secondLevelDirstat = fs.statSync(secondLevelDirPath);
      if (secondLevelDirstat.isDirectory() && !configItem.link) {
        const files = fs.readdirSync(secondLevelDirPath);
        configItem.link = `/${lastPathOfFistLevel}/${secondLevelDir}/${files.filter((file) => file !== 'index.md')[0]}`;
      }
    }
    configItem.activeMatch = `/${lastPathOfFistLevel}/`;
    config.push(configItem);
  }
  return config;
};

const generateNavConfig = () => {
  const dirs = getDirsPath();
  const navConfig = getNavConfig(dirs);
  writeFile(navConfig);
  console.info('nav-config生成成功！');
};

module.exports = generateNavConfig;
