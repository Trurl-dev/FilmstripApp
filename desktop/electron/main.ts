import { app, BrowserWindow, ipcMain } from "electron";
import { join } from "node:path";
import { IPC_CHANNELS } from "@filmstrip/shared";

function registerIpcHandlers(): void {
  ipcMain.handle(IPC_CHANNELS.appGetVersion, () => app.getVersion());
}

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    title: "Filmstrip",
    width: 1200,
    height: 800,
    webPreferences: {
      preload: join(__dirname, "../preload/preload.mjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  if (process.env["ELECTRON_RENDERER_URL"]) {
    void mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    void mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }

  mainWindow.webContents.on("did-finish-load", () => {
    console.log(`[filmstrip] window loaded, title="${mainWindow.getTitle()}"`);
  });
  mainWindow.webContents.on("did-fail-load", (_event, code, desc) => {
    console.error(`[filmstrip] window failed to load: ${code} ${desc}`);
  });
  mainWindow.on("page-title-updated", (_event, title) => {
    console.log(`[filmstrip] page title updated to "${title}"`);
  });
}

app.whenReady().then(() => {
  registerIpcHandlers();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
