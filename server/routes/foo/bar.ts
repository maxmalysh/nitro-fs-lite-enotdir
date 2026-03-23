import { eventHandler, getRequestURL } from "h3"
import { cachePayload } from "../../utils/payload-cache"

export default eventHandler(async (event) => {
  const url = getRequestURL(event).pathname
  const payload = { page: url, data: "Hello from /foo/bar", ts: Date.now() }

  // This will fail with ENOTDIR because /foo is already a file on disk
  await cachePayload(url, payload)

  return `
    <meta charset="utf-8">
    <h1>/foo/bar</h1>
    <p>Payload cached at key <code>${url}</code></p>
    <pre>${JSON.stringify(payload, null, 2)}</pre>
    <p><a href="/">← Back</a></p>
  `
})
