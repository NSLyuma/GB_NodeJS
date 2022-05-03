const socket = require("socket.io");
const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const indexPath = path.join(__dirname, "index.html");
  const readStream = fs.createReadStream(indexPath);
  readStream.pipe(res);
});

const io = socket(server);

io.on("connection", (client) => {
  client.on("client-connect", (data) => {
    const userData = {
      name: data.name,
    };

    client.broadcast.emit("server-connect", userData);

    client.on("disconnect", () => {
      client.broadcast.emit("server-disconnect", userData);
    });
  });

  client.on("client-msg", (data) => {
    console.log(data);

    const payload = {
      name: data.name,
      message: data.message,
    };

    client.broadcast.emit("server-msg", payload);
    client.emit("server-msg", payload);
  });
});

server.listen(5555);
