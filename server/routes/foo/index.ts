import { eventHandler, getRequestURL } from "h3"
import { cachePayload } from "../../utils/payload-cache"

export default eventHandler(async (event) => {
  const url = getRequestURL(event).pathname
  const payload = { page: url, data: "Hello from /foo", ts: Date.now() }

  await cachePayload(url, payload)

  return `
    <meta charset="utf-8">
    <h1>/foo</h1>
    <p>Payload cached at key <code>${url}</code></p>
    <pre>${JSON.stringify(payload, null, 2)}</pre>
    <p>Now visit <a href="/foo/bar">/foo/bar</a> — it will fail with ENOTDIR.</p>
    <p><a href="/">← Back</a></p>
  `
})
