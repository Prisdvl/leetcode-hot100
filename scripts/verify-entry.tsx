import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ANIMATION_REGISTRY } from '../src/components/animations/index'
import { CARDS } from '../src/data/cards'

interface Row {
  key: string
  step: number
  totalSteps: number
  len: number
  bad: string | null
  error: string | null
  html: string
}

const rows: Row[] = []
for (const [key, entry] of Object.entries(ANIMATION_REGISTRY)) {
  const { Component, totalSteps } = entry
  for (let step = 0; step < totalSteps; step++) {
    const row: Row = { key, step, totalSteps, len: 0, bad: null, error: null, html: '' }
    try {
      const inner = renderToStaticMarkup(React.createElement(Component, { stepIndex: step }))
      const html = `<svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`
      row.len = html.length
      const m = html.match(/NaN|undefined|Infinity/)
      row.bad = m ? m[0] : null
      row.html = html
    } catch (e: any) {
      row.error = String(e?.stack || e)
    }
    rows.push(row)
  }
}

const cardIssues: string[] = []
const nos = new Set<number>()
for (const c of CARDS) {
  if (!(c.animation in ANIMATION_REGISTRY)) cardIssues.push(`#${c.leetcodeNo} missing anim key: ${c.animation}`)
  if (nos.has(c.leetcodeNo)) cardIssues.push(`dup no: ${c.leetcodeNo}`)
  nos.add(c.leetcodeNo)
  for (const f of ['brief', 'insight', 'code', 'timeComplexity', 'spaceComplexity'] as const) {
    if (!c[f] || String(c[f]).trim().length < 4) cardIssues.push(`#${c.leetcodeNo} empty field ${f}`)
  }
  if (c.derivation.length < 2) cardIssues.push(`#${c.leetcodeNo} derivation too short`)
  if (c.pitfalls.length < 2) cardIssues.push(`#${c.leetcodeNo} pitfalls too short`)
}

const fs = require('fs')
const report = {
  cardCount: CARDS.length,
  cardIssues,
  animErrors: rows.filter((r) => r.error),
  animBad: rows.filter((r) => r.bad),
  zeroLen: rows.filter((r) => r.len === 0),
}
fs.writeFileSync('scripts/verify-report.json', JSON.stringify(report, null, 2))

const blocks: string[] = []
for (const r of rows) {
  blocks.push(
    `<div class="cell"><div class="cap">${r.key} step${r.step}/${r.totalSteps - 1}${r.bad ? ' WARN-' + r.bad : ''}${r.error ? ' ERR' : ''}</div>${r.html}</div>`
  )
}
const page = `<!doctype html><html><head><meta charset="utf-8"><title>animations</title>
<style>
body{background:#0f172a;color:#e2e8f0;font-family:ui-monospace,Menlo,monospace;margin:0;padding:20px}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.cell{background:#1e293b;border:1px solid #334155;border-radius:10px;padding:8px;overflow:hidden}
.cell svg{width:100%;height:auto;background:#fff;border-radius:6px}
.cap{font-size:11px;color:#94a3b8;margin-bottom:6px;word-break:break-all}
h1{font-size:18px}
</style></head><body>
<h1>keys: ${Object.keys(ANIMATION_REGISTRY).length} | cards: ${CARDS.length}</h1>
<div class="grid">${blocks.join('\n')}</div>
</body></html>`
fs.writeFileSync('scripts/verify-preview.html', page)

console.log('cards:', CARDS.length)
console.log('card issues:', cardIssues.length)
cardIssues.forEach((s) => console.log('  CARD', s))
console.log('anim errors:', report.animErrors.length)
report.animErrors.forEach((r: any) => console.log('  ERR', r.key, r.step, String(r.error).split('\n')[0]))
console.log('anim bad:', report.animBad.length)
report.animBad.forEach((r: any) => console.log('  BAD', r.key, r.step, r.bad))
console.log('zero len:', report.zeroLen.length)
