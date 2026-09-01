/**
 * 回归验证。三段：
 *
 *   1. 门     四个站全走过，工程资料库那条失效附件才变成可点
 *   2. 回响   二期之后第二层的字句变化，退回去也要跟着退
 *   3. 空册   缄默级正文重排、会话身份替换、404 引用来源
 *   4. 结局   提交/作废两个按钮，以及提交后不可撤回
 *
 * 改动 signals / echo / useSession 之后必须跑一次。
 *
 *   node scripts/verify-gate.mjs [baseUrl]
 */
import { spawn } from 'node:child_process'
import { mkdtempSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { setTimeout as sleep } from 'node:timers/promises'

const BASE = process.argv[2] ?? 'http://localhost:5173'

const CHROME = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
].find((p) => existsSync(p))
if (!CHROME) throw new Error('未找到 Chrome 或 Edge')

const port = 9700 + Math.floor(Math.random() * 200)
const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-proxy-server',
    '--proxy-bypass-list=<-loopback>',
    '--no-first-run',
    `--user-data-dir=${mkdtempSync(join(tmpdir(), 'gate-'))}`,
    `--remote-debugging-port=${port}`,
    'about:blank',
  ],
  { stdio: 'ignore' },
)

let wsUrl
for (let i = 0; i < 60; i++) {
  try {
    const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()
    const page = list.find((t) => t.type === 'page')
    if (page?.webSocketDebuggerUrl) {
      wsUrl = page.webSocketDebuggerUrl
      break
    }
  } catch {
    /* 还没起来 */
  }
  await sleep(250)
}

const ws = new WebSocket(wsUrl)
await new Promise((r) => ws.addEventListener('open', r, { once: true }))

let id = 0
const pending = new Map()
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data)
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m.result)
    pending.delete(m.id)
  }
})
const send = (method, params = {}) =>
  new Promise((res) => {
    const n = ++id
    pending.set(n, res)
    ws.send(JSON.stringify({ id: n, method, params }))
  })

const evaluate = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
  return r?.result?.value
}

const goto = async (path) => {
  await send('Page.navigate', { url: BASE + path })
  for (let i = 0; i < 40; i++) {
    await sleep(250)
    const n = await evaluate("document.querySelector('#root')?.innerText.length || 0")
    if (n > 200) return true
  }
  return false
}

await send('Page.enable')
await send('Runtime.enable')

/* ── 1. 空白状态：门必须是关的 ── */
await goto('/')
await evaluate('localStorage.clear()')
await goto('/proj/YL-87-03')
const probe =
  "(function(){var t=document.body.innerText;" +
  "return JSON.stringify({open:t.indexOf('可访问')>=0, dead:t.indexOf('链接失效')>=0," +
  "hasIndex:t.indexOf('项目附件索引')>=0});})()"

const before = await evaluate(probe)

/* ── 2. 写入四个站的痕迹，模拟玩家全部走过 ── */
const KEYS = ['well:17', 'post:TAPE', 'reveal:BBS-DELETED', 'wx:1987-11-03']
await evaluate(`
  (function(){
    var now = Date.now();
    var at = {}; ${JSON.stringify(KEYS)}.forEach(function(k){ at[k] = now });
    localStorage.setItem('trace.v1', JSON.stringify({
      state: { seen: ${JSON.stringify(KEYS)}, at: at, sites: ['lg','blog','bbs','wx'], visits: {} },
      version: 0
    }));
    return 'seeded';
  })()
`)

/* ── 3. 重新加载，门必须开 ── */
await goto('/proj/YL-87-03')
const after = await evaluate(probe)

/* ── 3b. 回响：二期之后，气象站那两行的说法必须变 ── */
const echoProbe =
  "(function(){var t=document.body.innerText;" +
  "return JSON.stringify({paper:t.indexOf('自记纸中断')>=0, human:t.indexOf('人工观测记录缺失')>=0});})()"

await goto('/weather/history?d=1987-11-03')
const echoAfter = await evaluate(echoProbe)

/* ── 4. 缺一条：门关上，回响也必须退回去 ── */
const partial = KEYS.slice(0, 3)
await evaluate(`
  (function(){
    localStorage.setItem('trace.v1', JSON.stringify({
      state: { seen: ${JSON.stringify(partial)}, at: {}, sites: [], visits: {} }, version: 0
    }));
    return 'seeded-partial';
  })()
`)
await goto('/proj/YL-87-03')
const missingOne = await evaluate(probe)

await goto('/weather/history?d=1987-11-03')
const echoBefore = await evaluate(echoProbe)

/* ══════════ 3. 空册的几处手法 ══════════ */

/* 3a · 缄默级正文重排。同一份卷宗读两次，那一段的措辞必须不同。 */
const variantProbe =
  "(function(){var t=document.body.innerText;" +
  "return t.indexOf('第二层人声的响度低于')>=0?'A':" +
  "t.indexOf('第二层人声与数小时后')>=0?'B':" +
  "t.indexOf('逐字比对未发现出入：')>=0?'C':'none';})()"

await evaluate("localStorage.removeItem('hollow.session.v1')")
await goto('/sys/archive/RS-87-0174')
const read1 = await evaluate(variantProbe)
await goto('/sys/browse')
await goto('/sys/archive/RS-87-0174')
const read2 = await evaluate(variantProbe)

/* 3b · 会话身份替换。读过韦昀档案之后，日志页把会话记在他名下。 */
const idProbe =
  "(function(){var t=document.body.innerText;" +
  "return JSON.stringify({bound:t.indexOf('PN-79-0091')>=0 && t.indexOf('已注销')>=0," +
  "stamp:t.indexOf('17:41')>=0});})()"

await goto('/sys/log')
const idBefore = await evaluate(idProbe)
await goto('/sys/archive/PN-79-0091')
await goto('/sys/log')
const idAfter = await evaluate(idProbe)

/* 3c · 404 引用来源。玩家从论坛过来，空册却知道。 */
await evaluate(`
  localStorage.setItem('trace.v1', JSON.stringify({
    state: { seen: [], at: {}, sites: ['bbs','sys'], visits: {} }, version: 0
  }))
`)
await goto('/sys/no-such-path')
const referrer = await evaluate(
  "(function(){return document.body.innerText.indexOf('地方社区站点')>=0;})()",
)

/* ══════════ 4. 结局 ══════════ */

const click = (text) => `
  (function(){
    var b = [].slice.call(document.querySelectorAll('button'))
      .filter(function(x){ return x.textContent.trim() === ${JSON.stringify(text)} })[0];
    if (!b) return 'no-button';
    b.click();
    return 'clicked';
  })()
`

/* 直接把解锁灌进会话，跳过前面的推理，只测结局本身。 */
await goto('/sys')
await evaluate(`
  localStorage.setItem('hollow.session.v1', JSON.stringify({
    state: {
      readArchives: [], views: {}, submitted: false, searches: [],
      codes: ['V-411103'], reveals: [], visited: [],
      clues: ['CLUE_001','CLUE_002','CLUE_003'],
      unlocks: ['UNLOCK_VAULT','UNLOCK_RS0175'],
      startedAt: Date.now(), log: []
    }, version: 0
  }))
`)

await goto('/sys/archive/RS-87-0175')
const endProbe =
  "(function(){var t=document.body.innerText;" +
  "return JSON.stringify({pending:t.indexOf('待提交')>=0," +
  "voidMsg:t.indexOf('本次登记已于提交前完成')>=0," +
  "done:t.indexOf('登记已提交')>=0," +
  "roster:t.indexOf('相关人员')>=0 && t.indexOf('简致远')>=0," +
  "thanks:t.indexOf('感谢您的配合')>=0});})()"

const end0 = await evaluate(endProbe)
await evaluate(click('作废'))
await sleep(200)
const end1 = await evaluate(endProbe)
await evaluate(click('提交'))
await sleep(300)
const end2 = await evaluate(endProbe)

/* 提交之后清除本地会话，状态必须还在。 */
await evaluate(click('清除本地会话'))
await sleep(200)
await goto('/sys/archive/RS-87-0175')
const end3 = await evaluate(endProbe)

console.log('门 · 空白状态 ', before)
console.log('门 · 四条齐全 ', after)
console.log('门 · 缺气象站 ', missingOne)
console.log('回响 · 二期后 ', echoAfter)
console.log('回响 · 二期前 ', echoBefore)
console.log('空册 · 正文变体 ', read1, '→', read2)
console.log('空册 · 身份绑定前', idBefore)
console.log('空册 · 身份绑定后', idAfter)
console.log('空册 · 404 来源  ', referrer)
console.log('结局 · 初始     ', end0)
console.log('结局 · 点作废   ', end1)
console.log('结局 · 点提交   ', end2)
console.log('结局 · 清会话后 ', end3)

const gateOk =
  !JSON.parse(before).open && JSON.parse(after).open && !JSON.parse(missingOne).open

const e1 = JSON.parse(echoAfter)
const e2 = JSON.parse(echoBefore)
const echoOk = e1.human && !e1.paper && e2.paper && !e2.human

console.log('')
console.log(gateOk ? '通过：门只在四个站全部走过之后才开。' : '失败：门的开关不符合预期。')
console.log(
  echoOk ? '通过：回响只在二期之后出现，退回去也会跟着退。' : '失败：回响没有按分期切换。',
)

const variantOk = read1 !== 'none' && read2 !== 'none' && read1 !== read2
const idOk = !JSON.parse(idBefore).bound && JSON.parse(idAfter).bound && JSON.parse(idAfter).stamp
const sysOk = variantOk && idOk && referrer === true

console.log(
  sysOk
    ? '通过：缄默级正文会重排，会话被记在已注销账户名下，404 认得来源站。'
    : '失败：空册的手法有一项没生效。',
)

const E0 = JSON.parse(end0)
const E1 = JSON.parse(end1)
const E2 = JSON.parse(end2)
const E3 = JSON.parse(end3)
const endOk =
  E0.pending && !E0.voidMsg && !E0.done &&
  E1.voidMsg && !E1.done &&
  E2.done && E2.roster && E2.thanks &&
  E3.done

console.log(
  endOk
    ? '通过：作废只会得到一句话，提交不可撤回，清除本地会话也撤不掉。'
    : '失败：结局的状态机不符合预期。',
)

const ok = gateOk && echoOk && sysOk && endOk

ws.close()
chrome.kill()
process.exit(ok ? 0 : 1)
