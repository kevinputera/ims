const config = require("./config.js");
const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");

function createWindow(options, uri) {
  let window = new BrowserWindow(options);
  window.loadURL(uri);
  return window;
}

app.on("ready", () => {
  let appWindow = null;
  let serverWindow = null;

  // create app window
  appWindow = createWindow(
    { height: 600, width: 800 },
    url.format({
      protocol: "http",
      hostname: "localhost",
      port: config.react_port
    })
  );

  // create server window (hidden)
  // TODO: change __dirname to app.getAppPath() when packaging
  const serverPath = path.join(__dirname, "../", "public/server.html");
  serverWindow = createWindow(
    { show: false },
    url.format({
      protocol: "file",
      pathname: serverPath
    })
  );

  appWindow.on("close", () => {
    appWindow = null;
    if (serverWindow != null) {
      serverWindow.close();
      serverWindow = null;
    }
  });

  serverWindow.on("close", () => {
    serverWindow = null;
    if (appWindow != null) {
      appWindow.close();
      appWindow = null;
    }
  });

  // appWindow.webContents.toggleDevTools();
  // serverWindow.webContents.toggleDevTools();
});
