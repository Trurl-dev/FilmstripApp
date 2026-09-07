import type { FilmstripBridge } from "@filmstrip/shared";

declare global {
  interface Window {
    filmstrip: FilmstripBridge;
  }
}

export {};
