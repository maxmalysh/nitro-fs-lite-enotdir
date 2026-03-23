import { useStorage } from "nitropack/runtime"

// Simulates what Nuxt 4.4+ does for runtime payload caching:
// payloadCache = useStorage('cache:nuxt:payload')
// payloadCache.setItem(ssrContext.url, response)
//
// See: https://github.com/nuxt/nuxt/pull/34410

const payloadCache = useStorage("cache")

export async function cachePayload(url: string, payload: any) {
  await payloadCache.setItem(url, payload)
}
