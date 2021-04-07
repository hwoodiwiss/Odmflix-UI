export function getConfig(): Config {
  if (process.env.NODE_ENV === "production") {
    return {
      ApiUri: "https://api.odm.ws311470.remote.ac",
    };
  } else {
    return {
      ApiUri: "https://dev.api.odm.ws311470.remote.ac",
    };
  }
}

export interface Config {
  ApiUri: string;
}
