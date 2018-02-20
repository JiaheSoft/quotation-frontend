import { config as debugConf } from "./DebugConfig";
import { config as prodConf } from "./ProdConfig";

export interface Config {
  apiBaseUrl: string;
}

export function getConfig(): Config {
  if (process.env.NODE_ENV === "production") {
    return prodConf;
  } else {
    return debugConf;
  }
}