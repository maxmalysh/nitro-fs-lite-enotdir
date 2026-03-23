# Reproduction: cannot cache both `/foo` and `/foo/bar` with fs-lite

It's not possible to cache both `/foo` and `/foo/bar` when using `fs` or `fs-lite` as the storage driver:

```ts
// nitro.config.ts
export default defineNitroConfig({
  storage: {
    cache: { driver: "fs-lite", base: ".cache/nitro" },
  },
})
```

## Steps to reproduce

```bash
npm install
npx nitro dev
# Open http://localhost:3000
```

The index route caches two keys — `/foo` and `/foo/bar`. The second one fails with `ENOTDIR` because `fs-lite` already created `/foo` as a file, not a directory.

## Expected

Both keys stored successfully.

## Actual

```json
{
  "error": "ENOTDIR: not a directory, open '.../.cache/nitro/foo/bar'",
  "code": "ENOTDIR"
}
```
