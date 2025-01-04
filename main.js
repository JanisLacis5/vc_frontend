const { app, BrowserWindow, ipcMain, dialog, screen } = require("electron");
const path = require("path");

let mainWindow;
let widgetWindow;

async function createMainWindow() {
    mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.resolve("./preload/preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: false,
        },
    });
    await mainWindow.loadFile("./pages/index.html");
}

async function createWidgetWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    widgetWindow = new BrowserWindow({
        width: 500 + 1000,
        height: 200 + 1000,
        x: width - 20,
        y: 5,
        frame: false,
        // alwaysOnTop: true,
        resizable: false,
        webPreferences: {
            preload: path.resolve("./preload/preload.js"),
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: false,
        },
    });
    await widgetWindow.loadFile("./pages/widget/widget.html");
}

app.whenReady()
    .then(async () => await createMainWindow())
    .catch((e) => console.error(`error in the startup process: ${e}`));

// Handle folder selection
ipcMain.handle("selectFolder", async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ["openDirectory"], // Allow only directories
    });

    if (result.canceled) {
        return null;
    }
    return result.filePaths[0];
});

ipcMain.handle("openWidget", () => createWidgetWindow());
ipcMain.handle("closeWidget", () => widgetWindow.close());
