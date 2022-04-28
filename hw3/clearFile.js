const fs = require("fs");

const IP_89_LOG = "./89.123.1.41_requests.log";
const IP_34_LOG = "./34.48.240.111_requests.log";

const clearFile = (path) => {
  fs.truncate(path, (err) => {
    if (err) throw err;
    console.log(`Файл ${path} успешно очищен`);
  });
};

clearFile(IP_89_LOG);
clearFile(IP_34_LOG);
