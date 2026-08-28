/** 纯函数工具。不依赖 React。 */

export function pad(n: number, width = 2): string {
  return String(n).padStart(width, '0')
}

/** 今天的 ISO 日期。用于让某些卷宗的日期"就是现在"。 */
export function todayISO(d: Date = new Date()): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

/** 系统日志用的时间戳。 */
export function stamp(d: Date = new Date()): string {
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

export function fullStamp(d: Date = new Date()): string {
  return `${todayISO(d)} ${stamp(d)}`
}

/**
 * 终端号：由浏览器指纹的一点点信息派生出的稳定假编号。
 * 目的只是让页面上的"你的终端"看起来像个真的东西。
 */
export function terminalId(): string {
  const seedSource = [
    typeof navigator !== 'undefined' ? navigator.language : 'zh',
    typeof screen !== 'undefined' ? `${screen.width}x${screen.height}` : '0x0',
    new Date().getTimezoneOffset(),
  ].join('|')

  let h = 0x811c9dc5
  for (let i = 0; i < seedSource.length; i++) {
    h ^= seedSource.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  const n = Math.abs(h) % 10000
  return `T-${pad(n, 4)}`
}

/** 把 1987-11-03 拆成 MMDD = 1103。解谜时用得到，也用于校验玩家输入。 */
export function mmdd(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  return m ? `${m[2]}${m[3]}` : ''
}

/** 会话已持续的时长，显示在状态栏。 */
export function elapsed(fromMs: number, nowMs = Date.now()): string {
  const s = Math.max(0, Math.floor((nowMs - fromMs) / 1000))
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`
}
