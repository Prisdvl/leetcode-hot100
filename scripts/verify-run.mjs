import { build } from 'esbuild'
import { createRequire } from 'node:module'
import { rmSync } from 'node:fs'
const require = createRequire(import.meta.url)

const out = 'scripts/verify-bundle.cjs'
await build({
  entryPoints: ['scripts/verify-entry.tsx'],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  jsx: 'automatic',
  outfile: out,
  logLevel: 'silent',
})
require(process.cwd() + '/' + out)
rmSync(out)
