const inquirer = require('inquirer');
const { TEMPLATE_TYPE_LIST } = require('./config');

const inquirerPrompt = async (argv) => {
  const { name } = argv;
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: '模板名称',
        default: name,
        validate(val) {
          if (!/^[a-zA-Z]+$/.test(val)) {
            return '模板名称只能含有英文';
          }
          return true;
        },
      },
      {
        type: 'list',
        name: 'type',
        message: '模板类型',
        choices: TEMPLATE_TYPE_LIST,
        filter(value) {
          return value;
        },
      },
    ]);
    return answers;
  } catch (e) {
    console.error(e);
  }
};

exports.inquirerPrompt = inquirerPrompt;
