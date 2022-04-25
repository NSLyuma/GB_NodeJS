const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const readLine = require("readline");

// const [filePath] = process.argv.slice(2);

// const options = yargs.usage("Usage: -p <file path>").option("p", {
//   alias: "path",
//   describe: "Path to the file",
//   type: "string",
//   demandOption: true,
// }).argv;

// console.log(options);

// const rl = readLine.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("Введите путь к папке: ", (filePath) => {
//   console.log(filePath);
//   rl.close();
// });

// const question = (questionString) =>
//   new Promise((resolve) => {
//     rl.question(questionString, resolve);
//   });

// (async () => {
//   const filePath = await question("Введите путь до файла: ");

//   const fullPath = path.join(__dirname, filePath);

//   fs.readdir(fullPath, function (err, items) {
//     // console.log(items);

//     for (var i = 0; i < items.length; i++) {
//       console.log(items[i]);
//     }
//   });

// fs.readFile(fullPath, "utf-8", (err, data) => {
//   if (err) console.log(err);
//   else console.log(data);
// });
//   rl.close();
// })();

const executionDir = process.cwd(); //папка, которая сейчас указана в консоли
console.log(executionDir);

const isFile = (fileName) => fs.lstatSync(fileName).isFile(); //isDirectory

const fileList = fs.readdirSync("./").filter(isFile);

inquirer
  .prompt([
    {
      name: "fileName",
      type: "list", //checkbox, confirm, input, list, number, password
      message: "Выберите файл для чтения",
      choices: fileList,
    },
  ])
  .then(({ fileName }) => {
    const fullPath = path.join(executionDir, fileName);
    fs.readFile(fullPath, "utf-8", (err, data) => {
      if (err) console.log(err);
      else console.log(data);
    });
  });
