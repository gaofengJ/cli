#!/usr/bin/env node

const yargs = require('yargs');
const { inquirerPrompt } = require('./inquirer');

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
    (argv) => {
      inquirerPrompt(argv).then((answers) => {
        console.log(answers);
      });
    },
  ).argv;
};

cliInit();
