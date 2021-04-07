export function getConfig(): Config {
  let config: Config;
  if (process.env.NODE_ENV === "production") {
    config = {
      ApiUri: "https://api.odm.ws311470.remote.ac",
    };
  } else if (process.env.NODE_ENV === "development") {
    config = {
      ApiUri: "https://dev.api.odm.ws311470.remote.ac",
    };
  } else {
    config = {
      ApiUri: "http://localhost:8000",
    };
  }

  return config;
}

export interface Config {
  ApiUri: string;
}
