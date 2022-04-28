const fs = require("fs/promises");
const path = require("path");
const readLine = require("readline");
const inquirer = require("inquirer");
const yargs = require("yargs");
const { lstatSync } = require("fs");

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (questionString) =>
  new Promise((resolve) => {
    rl.question(questionString, resolve);
  });

const options = yargs
  .positional("d", {
    describe: "Path to directory",
    default: process.cwd(),
  })
  .positional("p", {
    describe: "Pattern",
    default: null,
  }).argv;
console.log(options);

class ListItem {
  constructor(path, fileName) {
    this.path = path;
    this.fileName = fileName;
  }

  get isDir() {
    return lstatSync(this.path).isDirectory();
  }
}

const start = async () => {
  let filePath = await question("Введите путь к папке: ");
  const list = await fs.readdir(filePath);
  const items = list.map(
    (fileName) => new ListItem(path.join(filePath, fileName), fileName)
  );

  const item = await inquirer
    .prompt([
      {
        name: "fileName",
        type: "list",
        message: `Выбранная папка/файл: ${filePath}`,
        choices: items.map((item) => ({ name: item.fileName, value: item })),
      },
    ])
    .then((answer) => answer.fileName);

  if (item.isDir) {
    filePath = item.path;
    return await start();
  } else {
    const data = await fs.readFile(item.path, "utf-8");

    if (options.p == null) console.log(data);
    else {
      const regExp = new RegExp(options.p, "igm");
      console.log(data.match(regExp));
    }
  }
};

start();
