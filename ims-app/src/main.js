const config = require("./config.json");
const { app, BrowserWindow } = require("electron");
const url = require("url");

function createWindow(options, uri) {
  let window = new BrowserWindow(options);
  window.loadURL(uri);
  return window;
}

app.on("ready", () => {
  let appWindow = null;

  // create app window
  appWindow = createWindow(
    { height: 600, width: 800 },
    url.format({
      protocol: "http",
      hostname: "localhost",
      port: config.react_port
    })
  );

  appWindow.on("close", () => {
    appWindow = null;
  });

  // appWindow.webContents.toggleDevTools();
});
