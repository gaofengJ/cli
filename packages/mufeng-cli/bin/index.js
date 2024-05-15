#!/usr/bin/env node
const path = require('path');
const yargs = require('yargs');
const { inquirerPrompt } = require('./inquirer');
const { copyDir, checkMkdirExists } = require('./copy');

const cliInit = () => {
  // eslint-disable-next-line no-unused-expressions
  yargs.command(
    ['create', 'c'],
    '新建一个模板',
    (yargsObj) => yargsObj.option('name', {
      alias: 'n',
      demand: true,
      describe: '模板名称',
      type: 'string',
    }),
    async (argv) => {
      try {
        const answers = await inquirerPrompt(argv);
        const { name, type } = answers;
        const isMkdirExists = checkMkdirExists(
          path.resolve(process.cwd(), `./${name}`),
        );
        if (isMkdirExists) {
          console.log(`${name}文件夹已经存在`);
        } else {
          copyDir(
            path.resolve(__dirname, `../template/${type}`),
            path.resolve(process.cwd(), `./${name}`),
          );
        }
      } catch (e) {
        console.error('e', e);
      }
    },
  ).argv;
};

cliInit();
