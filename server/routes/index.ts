import { eventHandler } from "h3"
import { useStorage } from "nitropack/runtime"

// Demonstrates that it's not possible to cache both "/foo" and "/foo/bar"
// when using fs-lite as the storage driver.

export default eventHandler(async () => {
  const cache = useStorage("cache")

  // Cache route "/foo" — fs-lite creates FILE at .cache/nitro/foo
  await cache.setItem("/foo", { page: "/foo", cached: true })

  // Cache route "/foo/bar" — fs-lite needs .cache/nitro/foo/ to be a DIRECTORY
  // but it's already a FILE → ENOTDIR
  try {
    await cache.setItem("/foo/bar", { page: "/foo/bar", cached: true })
  } catch (err: any) {
    return {
      error: err.message,
      code: err.code,
    }
  }

  return { ok: true }
})
