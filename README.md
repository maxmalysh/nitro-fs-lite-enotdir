# Reproduction: cannot cache both `/foo` and `/foo/bar` with fs-lite

It's not possible to cache both `/foo` and `/foo/bar` when using `fs` or `fs-lite` as the storage driver:

```ts
// nitro.config.ts (or nitro section of nuxt.config.ts)
storage: {
  cache: { driver: "fs-lite", base: ".cache/nitro" },
}
```

## Steps to reproduce

```bash
npm install
npx nitro dev
```

1. Open http://localhost:3000 — index page with links
2. Click `/foo` — payload is cached, creates **file** at `.cache/nitro/foo`
3. Click `/foo/bar` — tries to cache payload, needs `.cache/nitro/foo` to be a **directory** → **ENOTDIR**

## Expected

Both routes cache their payloads successfully.

## Actual

Visiting `/foo/bar` after `/foo` crashes with:

```
ENOTDIR: not a directory, open '.cache/nitro/foo/bar'
```
