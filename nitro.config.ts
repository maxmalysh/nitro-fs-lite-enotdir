import { defineNitroConfig } from "nitropack/config"

// https://nitro.build/config
export default defineNitroConfig({
  compatibilityDate: "latest",
  srcDir: "server",

  storage: {
    cache: {
      driver: "fs-lite",
      base: ".cache/nitro",
    },
  },
});
