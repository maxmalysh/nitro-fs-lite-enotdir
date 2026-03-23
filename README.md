# Reproduction: fs-lite ENOTDIR with hierarchical keys

Demonstrates that using `fs-lite` storage driver with hierarchical keys causes `ENOTDIR` when a key is both a value and a prefix of another key.

## Steps to reproduce

```bash
npm install
npx nitro dev
# Open http://localhost:3000
```

The index route stores two keys:
1. `items:123` → fs-lite creates **file** at `.cache/nitro/items/123`
2. `items:123:details` → fs-lite tries to create `.cache/nitro/items/123/details`, but `123` is already a file → **ENOTDIR**

## Expected

Both keys should be stored successfully.

## Actual

```json
{
  "error": "ENOTDIR: not a directory, open '.../.cache/nitro/items/123/details'",
  "code": "ENOTDIR"
}
```
