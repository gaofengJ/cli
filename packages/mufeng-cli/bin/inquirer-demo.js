const inquirer = require('inquirer');

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
        choices: ['表单', '动态表单', '嵌套表单'],
        filter(value) {
          return {
            表单: 'form',
            动态表单: 'dynamicForm',
            嵌套表单: 'nestedForm',
          }[value];
        },
      },
      {
        type: 'list',
        message: '使用什么框架开发',
        choices: ['react', 'vue'],
        name: 'frame',
      },
    ]);
    const { frame } = answers;
    if (frame === 'react') {
      const answers1 = await inquirer.prompt([
        {
          type: 'list',
          message: '使用什么UI组件库开发',
          choices: [
            'Ant Design',
          ],
          name: 'library',
        },
      ]);
      return {
        ...answers,
        ...answers1,
      };
    }
    if (frame === 'vue') {
      const answers2 = await inquirer.prompt([
        {
          type: 'list',
          message: '使用什么UI组件库开发',
          choices: ['Element'],
          name: 'library',
        },
      ]);
      return {
        ...answers,
        ...answers2,
      };
    }
  } catch (e) {
    console.error(e);
  }
};

exports.inquirerPrompt = inquirerPrompt;
