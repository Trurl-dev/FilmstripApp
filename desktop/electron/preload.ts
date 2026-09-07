import { contextBridge, ipcRenderer } from "electron";
import { IPC_CHANNELS, type FilmstripBridge } from "@filmstrip/shared";

const bridge: FilmstripBridge = {
  getAppVersion: () => ipcRenderer.invoke(IPC_CHANNELS.appGetVersion) as Promise<string>,
};

contextBridge.exposeInMainWorld("filmstrip", bridge);
