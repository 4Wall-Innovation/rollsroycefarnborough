const fs = require("fs");
const path = require("path");
const WebSocket = require("ws");
const { Client } = require("node-osc");
const express = require("express");
const app = express();
app.use(express.json());

const wss = new WebSocket.WebSocketServer({ port: 3001 });
const client = new Client("127.0.0.1", 12321);

const broadcast = async (data) => {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(json) {
    let { type, data } = JSON.parse(json);
  });
});

let screensPath = path.resolve(__dirname, "screens.json");

app.get("/screens/:id", function (req, res) {
  let screens = JSON.parse(fs.readFileSync(screensPath));
  let { id } = req.params;
  if (!id) throw "No id";
  let screen = screens.find((s) => s.id == id);
  if (!screen) throw "No screen";
  res.send(screen);
});
app.get("/screens", function (req, res) {
  let screens = JSON.parse(fs.readFileSync(screensPath));
  res.send(screens);
});

app.put("/screens", function (req, res) {
  let screen = req.body;
  if (!screen) throw "No screen";
  let screens = JSON.parse(fs.readFileSync(screensPath));
  let localScreen = screens.find((s) => s.id == screen.id);
  if (!localScreen) return;
  Object.assign(localScreen, screen);
  delete localScreen.editing;
  console.log(localScreen);
  fs.writeFileSync(screensPath, JSON.stringify(screens, null, 4));
  broadcast({ type: "update-screen", data: { screen: localScreen } });
  res.send(localScreen);
});

app.post("/osc", function (req, res) {
  let { address, args } = req.body;
  client.send(address, args, (err) => {});
  console.log("Sent OSC", address, args);
  res.send();
});

module.exports = app;
