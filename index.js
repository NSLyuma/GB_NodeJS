const colors = require("colors");

const [firstNumber] = process.argv.slice(2);
const [secondNumber] = process.argv.slice(3);
const numberString = firstNumber + secondNumber;

const digitOnly = (string) => {
  if (string) {
    [...string].every((c) => "0123456789".includes(c));
  } else {
    return;
  }
};

let arr = [];
let simpleArr = [];

for (let i = +firstNumber; i <= +secondNumber; i++) {
  arr.push(i);
}

const isSimple = (number) => {
  let start = 2;
  const limit = Math.sqrt(number);
  while (start <= limit) {
    if (number % start++ < 1) return false;
  }
  return number > 1;
};

for (let j = 0; j < arr.length; j++) {
  if (isSimple(arr[j])) {
    simpleArr.push(arr[j]);
  }
}

const getSimpleNumbers = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if ((i + 1) % 3 === 1) {
      console.log(colors.green(arr[i]));
    } else if ((i + 1) % 3 === 2) {
      console.log(colors.yellow(arr[i]));
    } else {
      console.log(colors.red(arr[i]));
    }
  }
};

if (digitOnly(numberString) || arr.length === 0) {
  console.log("ОШИБКА: один или оба аргумента не являются числом!");
} else if (simpleArr.length === 0) {
  console.log("Простых чисел в данном диапазоне нет".red);
} else {
  getSimpleNumbers(simpleArr);
}
