const http = require("http");

const server = http.createServer((req, res) => {
  //   console.log(req.url);
  //   console.log(req.method);
  //   console.log(req.headers);
  res.writeHead(200, "OK", { test: "test" });
  res.end();
});

server.listen(5555);
