/**
 * 术语泄漏检查。
 *
 * 第一层和第二层的玩家可见文案里不得出现第三层的专有名词。
 * 玩家必须走到空册才第一次听说这些词。
 *
 *   node scripts/check-terms.mjs
 *
 * 只扫玩家看得见的字符串。代码注释里写「空册」是正常的，
 * 开发者需要知道自己在写什么。
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

/** 禁用词。用词组而不是单字，避免把普通中文词误判成术语。 */
const FORBIDDEN = [
  '空册',
  '残响',
  '监护等级',
  '缄默级',
  '补充测绘局',
  '誊录员',
  '誊录组',
  '校字员',
  '登记总局',
  '静置名录',
  '著录反应',
]

const ROOTS = ['src/layers/recruitment', 'src/layers/investigation']

function walk(dir) {
  const out = []
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) out.push(...walk(p))
    else if (/\.tsx?$/.test(name)) out.push(p)
  }
  return out
}

/** 去掉注释，只留玩家可能看到的内容。 */
function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/(^|[^:])\/\/.*$/gm, (m, p1) => p1 + ' '.repeat(Math.max(0, m.length - p1.length)))
}

let bad = 0
for (const file of ROOTS.flatMap(walk)) {
  const lines = stripComments(readFileSync(file, 'utf8')).split('\n')
  lines.forEach((line, i) => {
    for (const w of FORBIDDEN) {
      if (line.includes(w)) {
        console.log(`  ${file.replace(/\\/g, '/')}:${i + 1}  「${w}」`)
        console.log(`      ${line.trim().slice(0, 90)}`)
        bad++
      }
    }
  })
}

console.log('')
if (bad === 0) {
  console.log('通过：第一、二层的玩家可见文案里没有第三层术语。')
  process.exit(0)
}
console.log(`失败：发现 ${bad} 处术语泄漏。`)
process.exit(1)
