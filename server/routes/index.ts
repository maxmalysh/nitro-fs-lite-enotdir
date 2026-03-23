import { eventHandler } from "h3"
import { useStorage } from "nitropack/runtime"

export default eventHandler(async () => {
  const storage = useStorage("cache")

  // Step 1: Store a value with key "items:123"
  //         fs-lite driver creates FILE at .cache/nitro/items/123
  await storage.setItem("items:123", { name: "Item 123" })

  // Step 2: Store a value with key "items:123:details"
  //         fs-lite driver tries to create .cache/nitro/items/123/details
  //         but "123" is already a FILE, not a directory → ENOTDIR
  try {
    await storage.setItem("items:123:details", { name: "Item 123 details" })
  } catch (err: any) {
    return {
      error: err.message,
      code: err.code,
      explanation:
        "fs-lite maps ':' to '/' in file paths. " +
        "Key 'items:123' creates a file at items/123, " +
        "then key 'items:123:details' needs items/123/ to be a directory — ENOTDIR.",
    }
  }

  return { ok: true }
})
