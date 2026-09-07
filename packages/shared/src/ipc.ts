export const IPC_CHANNELS = {
  appGetVersion: "app:get-version"
} as const;

export type IpcChannel = (typeof IPC_CHANNELS)[keyof typeof IPC_CHANNELS];

export interface IpcContract {
  [IPC_CHANNELS.appGetVersion]: {
    request: void;
    response: string;
  };
}

export type IpcRequest<C extends IpcChannel> = IpcContract[C]["request"];
export type IpcResponse<C extends IpcChannel> = IpcContract[C]["response"];

export interface FilmstripBridge {
  getAppVersion(): Promise<IpcResponse<typeof IPC_CHANNELS.appGetVersion>>;
}
