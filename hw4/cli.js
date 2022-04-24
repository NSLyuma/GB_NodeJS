const fs = require("fs");
const path = require("path");
const readLine = require("readline");
const inquirer = require("inquirer");

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const readUserFile = (fullPath) => {
  const fileList = fs.readdirSync(fullPath);

  inquirer
    .prompt([
      {
        name: "fileName",
        type: "list", //checkbox, confirm, input, list, number, password
        message: "Выберите файл для чтения",
        choices: fileList,
      },
    ])
    .then((answer) => {
      console.log(answer);
    });
};

const readDirectory = (fullPath) => {
  fs.readdir(fullPath, (err) => {
    if (err) {
      console.log("ОШИБКА: Папка не найдена!");
    } else {
      readUserFile(fullPath);
    }
  });
};

const question = (questionString) =>
  new Promise((resolve) => {
    rl.question(questionString, resolve);
  });

(async () => {
  const filePath = await question("Введите путь к папке: ");

  const fullPath = path.join(__dirname, filePath);

  readDirectory(fullPath);

  rl.close();
})();
