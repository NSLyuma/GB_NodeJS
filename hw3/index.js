const fs = require("fs");
const readline = require("readline");

const IP_89 = "89.123.1.41";
const IP_34 = "34.48.240.111";

const IP_89_LOG = `./${IP_89}_requests.log`;
const IP_34_LOG = `./${IP_34}_requests.log`;
const ACCESS_LOG = "./access.log";

const createIpWriteStream = (fileName) => {
  return fs.createWriteStream(fileName, {
    encoding: "utf-8",
    flags: "a",
  });
};

const ip89Data = createIpWriteStream(IP_89_LOG);
const ip34Data = createIpWriteStream(IP_34_LOG);

const readStream = fs.createReadStream(ACCESS_LOG, {
  encoding: "utf-8",
});

const readInterface = readline.createInterface({
  input: readStream,
  console: false,
});

readInterface.on("line", (line) => {
  if (line.includes(IP_89)) {
    ip89Data.write(line + "\n");
  }

  if (line.includes(IP_34)) {
    ip34Data.write(line + "\n");
  }
});

// node index.js
