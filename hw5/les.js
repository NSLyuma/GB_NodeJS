const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, "../hw4/cli.js");
  const readStream = fs.createReadStream(filePath);
  res.writeHead(200, { "Content-Type": "application/javascript" });
  readStream.pipe(res);
});

server.listen(5555);
