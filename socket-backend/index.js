const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

app.get("/", (req, r) => r.send("ok"));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    
    allowedHeaders: ["Access-Control-Allow-Origin"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected from mbl");

  socket.on("public_channel", (message) => {
    // console.log(message);
    io.emit("public_channel", {message });
  });

});

server.listen(7000, () => {
  console.log("listening on *:7000");
});