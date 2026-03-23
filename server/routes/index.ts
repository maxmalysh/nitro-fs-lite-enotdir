import { eventHandler } from "h3"

export default eventHandler(() => {
  return `
    <meta charset="utf-8">
    <h1>fs-lite ENOTDIR reproduction</h1>
    <p>Visit these routes <b>in order</b>:</p>
    <ol>
      <li><a href="/foo">/foo</a> — caches payload, creates <b>file</b> at .cache/foo</li>
      <li><a href="/foo/bar">/foo/bar</a> — tries to cache payload, needs .cache/foo to be a <b>directory</b> → ENOTDIR</li>
    </ol>
  `
})
