/**
 * 整页截图。
 *
 * 不装 puppeteer：直接用系统里的 Chrome + DevTools Protocol，
 * Node 24 自带全局 WebSocket，所以零依赖。
 *
 *   node scripts/shot.mjs <url> <输出路径> [宽度]
 */
import { spawn } from 'node:child_process'
import { mkdtempSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { setTimeout as sleep } from 'node:timers/promises'

const [url = 'http://localhost:5173', out = 'shot.png', width = '1440', maxH = '8000'] =
  process.argv.slice(2)

const CHROME = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
].find((p) => existsSync(p))

if (!CHROME) throw new Error('未找到 Chrome 或 Edge')

const port = 9222 + Math.floor(Math.random() * 400)
const profile = mkdtempSync(join(tmpdir(), 'shot-'))

const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    '--disable-gpu',
    /* 开发机上如果开着系统代理，localhost 也可能被劫走，
       导致无头浏览器拿不到页面、截出一张白图。 */
    '--no-proxy-server',
    '--proxy-bypass-list=<-loopback>',
    '--hide-scrollbars',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${profile}`,
    `--remote-debugging-port=${port}`,
    `--window-size=${width},1000`,
    'about:blank',
  ],
  { stdio: 'ignore' },
)

async function cdpTarget() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${port}/json/list`)
      const list = await r.json()
      const page = list.find((t) => t.type === 'page')
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl
    } catch {
      /* 还没起来，继续等 */
    }
    await sleep(250)
  }
  throw new Error('Chrome 调试端口未就绪')
}

const ws = new WebSocket(await cdpTarget())
await new Promise((res, rej) => {
  ws.addEventListener('open', res, { once: true })
  ws.addEventListener('error', rej, { once: true })
})

let id = 0
const pending = new Map()
ws.addEventListener('message', (ev) => {
  const msg = JSON.parse(ev.data)
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg.result)
    pending.delete(msg.id)
  }
})
const send = (method, params = {}) =>
  new Promise((res) => {
    const n = ++id
    pending.set(n, res)
    ws.send(JSON.stringify({ id: n, method, params }))
  })

await send('Page.enable')
await send('Emulation.setDeviceMetricsOverride', {
  width: Number(width),
  height: 1000,
  deviceScaleFactor: 1,
  mobile: false,
})
await send('Runtime.enable')
await send('Page.navigate', { url })

// 轮询直到 React 真的挂上内容，而不是死等一个固定时长
let mounted = false
for (let i = 0; i < 40; i++) {
  await sleep(300)
  const r = await send('Runtime.evaluate', {
    expression: "document.querySelector('#root')?.innerText.length || 0",
    returnByValue: true,
  })
  if ((r?.result?.value ?? 0) > 400) {
    mounted = true
    break
  }
}
if (!mounted) {
  const d = await send('Runtime.evaluate', {
    expression:
      "JSON.stringify({ready:document.readyState,href:location.href,title:document.title," +
      "rootLen:(document.querySelector('#root')||{}).innerHTML?.length||0," +
      "body:document.body?document.body.innerHTML.slice(0,200):'<no body>'})",
    returnByValue: true,
  })
  console.warn('页面未挂载，诊断：', d?.result?.value)
}
await sleep(900) // 让渐变、字体与阴影绘制完成

const { contentSize } = await send('Page.getLayoutMetrics')
const shot = await send('Page.captureScreenshot', {
  format: 'png',
  captureBeyondViewport: true,
  clip: {
    x: 0,
    y: 0,
    width: contentSize.width,
    height: Math.min(contentSize.height, Number(maxH)),
    scale: 1,
  },
})

mkdirSync(dirname(out), { recursive: true })
writeFileSync(out, Buffer.from(shot.data, 'base64'))
const shotH = Math.min(contentSize.height, Number(maxH))
console.log(
  `已保存 ${out}  ${Math.round(contentSize.width)}x${Math.round(shotH)}` +
    (shotH < contentSize.height ? `（整页 ${Math.round(contentSize.height)}，已裁剪）` : ''),
)

ws.close()
chrome.kill()
process.exit(0)
