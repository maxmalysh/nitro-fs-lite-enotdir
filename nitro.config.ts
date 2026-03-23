import { defineNitroConfig } from "nitropack/config"

// https://nitro.build/config
export default defineNitroConfig({
  compatibilityDate: "latest",
  srcDir: "server",

  // Using fs-lite for cache storage — this is the root cause of the bug.
  // Equivalent to Nuxt config:
  //   nitro: { storage: { cache: { driver: 'fs-lite', base: '.cache/nitro' } } }
  storage: {
    cache: {
      driver: "fs-lite",
      base: ".cache/nitro",
    },
  },
});
