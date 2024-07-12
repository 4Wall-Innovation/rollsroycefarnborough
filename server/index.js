const fs = require("fs");
const path = require("path");
const WebSocket = require("ws");
const { Client } = require("node-osc");

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
    if (type == "get-screens") {
      getScreens();
    } else if (type == "get-screen") {
      let { screenId } = data;
      getScreen(screenId);
    } else if (type == "update-screen") {
      let { screen } = data;
      updateScreen(screen);
    } else if (type == "send-osc") {
      let { address, args } = data;
      sendOSC(address, args);
    }
  });
});

let screensPath = path.resolve(__dirname, "screens.json");

const getScreens = () => {
  console.log("get screens");
  let screens = JSON.parse(fs.readFileSync(screensPath));
  broadcast({ type: "get-screens", data: { screens } });
};

const getScreen = (screenId) => {
  console.log("get screen", screenId);
  let screens = JSON.parse(fs.readFileSync(screensPath));
  let screen = screens.find((s) => s.id == screenId);
  if (screen) broadcast({ type: "update-screen", data: { screen } });
};
const updateScreen = (screen) => {
  console.log("update screen");
  let screens = JSON.parse(fs.readFileSync(screensPath));
  let localScreen = screens.find((s) => s.id == screen.id);
  if (!localScreen) return;
  Object.assign(localScreen, screen);
  delete localScreen.editing;
  console.log(localScreen);
  fs.writeFileSync(screensPath, JSON.stringify(screens, null, 4));
  broadcast({ type: "update-screen", data: { screen: localScreen } });
};

const sendOSC = (address, args) => {
  client.send(address, args, (err) => {});
  console.log("Sent OSC", address, args);
};
