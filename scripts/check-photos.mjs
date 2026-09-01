/**
 * 照片回退检查。
 *
 * public/photos/ 下的文件可以一张一张地补。这个脚本确认两件事：
 *   1. 文件还不在的时候，页面退回 SVG 场景，不出现裂图
 *   2. 文件到位之后，真的用上了照片
 *
 *   node scripts/check-photos.mjs [baseUrl]
 */
import { spawn } from 'node:child_process'
import { mkdtempSync, existsSync, readdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { setTimeout as sleep } from 'node:timers/promises'

const BASE = process.argv[2] ?? 'http://localhost:5173'

const PAGES = [
  ['博客 · 扫了一张老照片', '/blog/station-clock'],
  ['博客 · 云岭的秋天', '/blog/yunling-autumn'],
  ['论坛 · 火车站的钟', '/forum/t/STATION-CLOCK'],
]

const CHROME = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
].find((p) => existsSync(p))
if (!CHROME) throw new Error('未找到 Chrome 或 Edge')

/* 先看看目录里到底有几张图 */
let onDisk = []
try {
  onDisk = readdirSync('public/photos').filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
} catch {
  /* 目录还没建 */
}
console.log(`public/photos/ 里有 ${onDisk.length} 张图` + (onDisk.length ? '：' + onDisk.join('、') : ''))
console.log('')

const port = 9800 + Math.floor(Math.random() * 100)
const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-proxy-server',
    '--proxy-bypass-list=<-loopback>',
    '--no-first-run',
    `--user-data-dir=${mkdtempSync(join(tmpdir(), 'photo-'))}`,
    `--remote-debugging-port=${port}`,
    'about:blank',
  ],
  { stdio: 'ignore' },
)

let wsUrl
for (let i = 0; i < 60; i++) {
  try {
    const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()
    const p = list.find((t) => t.type === 'page')
    if (p?.webSocketDebuggerUrl) {
      wsUrl = p.webSocketDebuggerUrl
      break
    }
  } catch {
    /* 等 */
  }
  await sleep(250)
}

const ws = new WebSocket(wsUrl)
await new Promise((r) => ws.addEventListener('open', r, { once: true }))
let id = 0
const pend = new Map()
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data)
  if (m.id && pend.has(m.id)) {
    pend.get(m.id)(m.result)
    pend.delete(m.id)
  }
})
const send = (method, params = {}) =>
  new Promise((r) => {
    const n = ++id
    pend.set(n, r)
    ws.send(JSON.stringify({ id: n, method, params }))
  })
const ev = async (e) => (await send('Runtime.evaluate', { expression: e, returnByValue: true }))?.result?.value

await send('Page.enable')
await send('Runtime.enable')

const PROBE = `(function(){
  var figs = document.querySelectorAll('figure');
  var svg = 0, img = 0, broken = 0;
  figs.forEach(function(f){
    if (f.querySelector('svg')) svg++;
    var i = f.querySelector('img');
    if (i) { img++; if (!i.complete || i.naturalWidth === 0) broken++; }
  });
  return JSON.stringify({ figures: figs.length, svg: svg, img: img, broken: broken });
})()`

let bad = 0
for (const [label, url] of PAGES) {
  await send('Page.navigate', { url: BASE + url })
  let r = null
  for (let i = 0; i < 20; i++) {
    await sleep(300)
    const raw = await ev(PROBE)
    if (raw) {
      r = JSON.parse(raw)
      if (r.figures > 0) break
    }
  }
  r = r ?? { figures: 0, svg: 0, img: 0, broken: 0 }
  const ok = r.figures > 0 && r.broken === 0
  if (!ok) bad++
  console.log(
    (ok ? '  ' : '✗ ') +
      label.padEnd(24) +
      `插图 ${r.figures} · SVG ${r.svg} · 照片 ${r.img} · 裂图 ${r.broken}`,
  )
}

console.log('')
console.log(
  bad === 0
    ? '通过：没有裂图。缺文件的位置都退回了 SVG。'
    : `失败：有 ${bad} 个页面出现裂图或没渲染出插图。`,
)

ws.close()
chrome.kill()
process.exit(bad === 0 ? 0 : 1)
