/**
 * 路由审计。
 *
 * SPA 的 index.html 对任何路径都返回 200，所以用 HTTP 状态码判断可达性
 * 毫无意义。这个脚本真的把每条路由渲染出来，看它到底出了什么。
 *
 *   node scripts/audit-routes.mjs [baseUrl]
 */
import { spawn } from 'node:child_process'
import { mkdtempSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { setTimeout as sleep } from 'node:timers/promises'

const BASE = process.argv[2] ?? 'http://localhost:5173'

/*
 * 部署到子路径时（GitHub Pages），页面上渲染出来的 href 会带前缀。
 * 从 BASE 里把这段路径取出来，拼进选择器，脚本才能同时验证
 * 本地根路径和线上子路径两种部署。
 */
const PREFIX = new URL(BASE).pathname.replace(/\/$/, '')

const ROUTES = [
  ['第一层 职引', '/'],
  ['', '/jobs'],
  ['', '/jobs/PM-ARCHIVE'],
  ['', '/jobs/JAVA-DEV'],
  ['', '/companies'],
  ['', '/company/HBSC'],
  ['', '/company/HBSC/project/YL-87-03'],
  ['', '/people/WEIYUN'],
  ['', '/people/JIANZHIYUAN'],
  ['', '/people/SHAOWENQI'],
  ['', '/special/campus2026'],
  ['', '/article/campus-newjobs'],
  ['', '/article/old-data-matters'],
  ['', '/news'],
  ['', '/resume'],

  ['第二层 论坛', '/forum'],
  ['', '/forum/b/recall'],
  ['', '/forum/b/chat'],
  ['', '/forum/t/STATION-CLOCK'],
  ['', '/forum/t/YL-ACCESS'],
  ['', '/forum/t/SEEK-1987'],

  ['第二层 气象', '/weather'],
  ['', '/weather/forecast'],
  ['', '/weather/hourly'],
  ['', '/weather/history'],
  ['', '/weather/history?d=1987-11-03'],
  ['', '/weather/stations'],
  ['', '/weather/about'],

  ['第二层 资料库', '/proj'],
  ['', '/proj/YL-87-03'],
  ['', '/proj/BL-83-07'],
  ['', '/proj/YL-87-03/attach/YL-87-03-A17'],

  ['第二层 博客', '/blog'],
  ['', '/blog/1103'],
  ['', '/blog/tape'],
  ['', '/blog/station-clock'],
  ['', '/blog/yunling-autumn'],

  ['第三层 空册', '/sys'],
  ['', '/sys/browse'],
  ['', '/sys/search'],
  ['', '/sys/timeline'],
  ['', '/sys/clues'],
  ['', '/sys/log'],
  ['', '/sys/archive/RS-87-0174'],
  ['', '/sys/archive/LC-62-0058'],
  ['', '/sys/archive/PN-79-0091'],
  ['', '/sys/archive/RG-00-0000'],
  ['', '/sys/archive/DS-00-0004'],
  ['', '/sys/archive/RS-57-0001'],
  ['', '/sys/x/vault'],
]

const CHROME = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
].find((p) => existsSync(p))
if (!CHROME) throw new Error('未找到 Chrome 或 Edge')

const port = 9500 + Math.floor(Math.random() * 200)
const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-proxy-server',
    '--proxy-bypass-list=<-loopback>',
    '--no-first-run',
    `--user-data-dir=${mkdtempSync(join(tmpdir(), 'audit-'))}`,
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
const pending = new Map()
let consoleErrors = []
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data)
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m.result)
    pending.delete(m.id)
  }
  if (m.method === 'Runtime.exceptionThrown') {
    consoleErrors.push(
      m.params.exceptionDetails.exception?.description ?? m.params.exceptionDetails.text,
    )
  }
})
const send = (method, params = {}) =>
  new Promise((res) => {
    const n = ++id
    pending.set(n, res)
    ws.send(JSON.stringify({ id: n, method, params }))
  })
const evaluate = async (expr) => {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true })
  return r?.result?.value
}

await send('Page.enable')
await send('Runtime.enable')

/* 引导屏会盖住空册的页面，先关掉它，否则测不出真实内容。 */
await send('Page.navigate', { url: BASE })
await sleep(1500)
await evaluate("sessionStorage.setItem('hollow.booted','1')")

const PROBE = `(function(){
  var root = document.querySelector('#root');
  var t = root ? root.innerText : '';
  return JSON.stringify({
    title: document.title,
    len: t.length,
    h1: (document.querySelector('h1')||{}).textContent || '',
    layer: document.documentElement.dataset.layer || '',
    links: document.querySelectorAll('a[href^="/"]').length,
    notFound: /无响应|404|不存在|未找到|已下线|没有这篇/.test(t.slice(0, 1200))
  });
})()`

const rows = []
for (const [group, path] of ROUTES) {
  consoleErrors = []
  await send('Page.navigate', { url: BASE + path })
  let data = null
  for (let i = 0; i < 32; i++) {
    await sleep(200)
    const raw = await evaluate(PROBE)
    if (raw) {
      data = JSON.parse(raw)
      if (data.len > 120) break
    }
  }
  rows.push({ group, path, ...(data ?? { len: 0 }), err: consoleErrors[0] ?? '' })
}

console.log('')
console.log('路径'.padEnd(42) + '层'.padEnd(9) + '字数'.padEnd(8) + '状态')
console.log('─'.repeat(96))

let broken = 0
for (const r of rows) {
  if (r.group) {
    console.log('')
    console.log(`── ${r.group} ${'─'.repeat(Math.max(0, 70 - r.group.length))}`)
  }
  const bad = r.len < 120 || r.notFound || r.err
  if (bad) broken++
  const status = r.err
    ? 'JS 异常: ' + String(r.err).slice(0, 46)
    : r.len < 120
      ? '空白 / 未挂载'
      : r.notFound
        ? '错误页'
        : 'ok · ' + r.links + ' 个站内链接'
  console.log(
    (bad ? '✗ ' : '  ') +
      r.path.padEnd(40) +
      (r.layer || '—').padEnd(9) +
      String(r.len).padEnd(8) +
      status,
  )
}

console.log('')
console.log(`共 ${rows.length} 条路由，异常 ${broken} 条。`)

/* ══════════════════════════════════════════════════════════
   可达性。
   路由能渲染不代表玩家找得到。这里逐跳检查：站在 A 页面上，
   通往 B 的那个链接到底在不在。全程不许靠手输 URL。
   ══════════════════════════════════════════════════════════ */

const HOPS = [
  ['/', 'a[href="/special/campus2026"]', '首页秋招 Banner → 专题'],
  ['/special/campus2026', 'a[href="/company/HBSC"]', '专题正文 → 华北水测'],
  ['/company/HBSC', 'a[href="/company/HBSC/project/YL-87-03"]', '企业页 → 1987 项目'],
  ['/company/HBSC/project/YL-87-03', 'a[href="/proj/YL-87-03"]', '项目页资料来源 → 资料库'],
  ['/proj/YL-87-03', 'a[href="/forum"]', '资料库 → 论坛'],
  ['/proj/YL-87-03', 'a[href="/blog"]', '资料库 → 博客'],
  ['/proj/YL-87-03', 'a[href="/weather"]', '资料库 → 气象站'],
  ['/forum', 'a[href="/weather"]', '论坛 → 气象站'],
  ['/forum', 'a[href="/blog"]', '论坛 → 博客'],
  ['/forum', 'a[href="/proj"]', '论坛 → 资料库'],
  ['/forum/t/STATION-CLOCK', 'a[href="/blog"]', '论坛用户资料 → 博客'],
  ['/blog', 'a[href="/weather"]', '博客友链 → 气象站'],
  ['/blog', 'a[href="/blog/1103"]', '博客首页 → 十一月三号'],
  ['/blog', 'a[href="/blog/tape"]', '博客首页 → 关于一段录音'],
  ['/blog/1103', 'a[href="/weather/history?d=1987-11-03"]', '博客正文 → 气象站查那天'],
  ['/people/JIANZHIYUAN', 'a[href="/blog"]', '职引人物页 → 博客'],
  ['/people/WEIYUN', 'a[href="/proj/YL-87-03"]', '职引人物页 → 资料库'],
]

console.log('')
console.log('── 可达性：站在 A 页面上，通往 B 的链接在不在 ' + '─'.repeat(30))

let missing = 0
for (const [from, sel, label] of HOPS) {
  await send('Page.navigate', { url: BASE + from })
  let found = false
  for (let i = 0; i < 24; i++) {
    await sleep(200)
    const scoped = sel.replace(/href="\//g, `href="${PREFIX}/`)
    const n = await evaluate(`document.querySelectorAll(${JSON.stringify(scoped)}).length`)
    if (n > 0) {
      found = true
      break
    }
    const len = await evaluate("document.querySelector('#root')?.innerText.length || 0")
    if (len > 400 && i > 6) break
  }
  if (!found) missing++
  console.log((found ? '  ' : '✗ ') + label.padEnd(34) + (found ? 'ok' : '链接不存在'))
}

console.log('')
console.log(
  missing === 0
    ? '通过：全程可以只靠点链接走完，不需要手输任何 URL。'
    : `失败：有 ${missing} 跳没有链接，玩家会卡在这里。`,
)

ws.close()
chrome.kill()
process.exit(broken > 4 || missing > 0 ? 1 : 0)
