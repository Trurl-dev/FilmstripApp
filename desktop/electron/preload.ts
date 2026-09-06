import { contextBridge } from "electron";

contextBridge.exposeInMainWorld("filmstrip", {
  platform: process.platform
});
