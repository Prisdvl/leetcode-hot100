import { readFileSync, writeFileSync } from 'node:fs'

const html = readFileSync('scripts/verify-preview.html', 'utf8')
const head = html.slice(0, html.indexOf('<div class="grid">') + '<div class="grid">'.length)
const tail = '</div>\n</body></html>'
const cells = [...html.matchAll(/<div class="cell">[\s\S]*?<\/div>\n?(?=<div class="cell">|<\/div>)/g)].map((m) => m[0])
const per = Math.ceil(cells.length / 6)
for (let i = 0; i < 6; i++) {
  const chunk = cells.slice(i * per, (i + 1) * per)
  writeFileSync(
    `scripts/verify-preview-${i + 1}.html`,
    head + '\n' + chunk.join('\n') + tail
  )
}
console.log('cells:', cells.length, 'per page:', per)
