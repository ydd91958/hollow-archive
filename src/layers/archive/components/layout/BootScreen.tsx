import { useEffect, useState } from 'react'
import { BUREAU } from '@/layers/archive/data/system'
import { terminalId, fullStamp } from '@/shared/lib/format'

const LINES: { text: string; delay: number; tone?: 'ok' | 'warn' | 'err' }[] = [
  { text: `${BUREAU.systemNameEn} ${BUREAU.version} · BUILD ${BUREAU.build}`, delay: 60 },
  { text: `${BUREAU.publicName} · ${BUREAU.department}`, delay: 120 },
  { text: '挂载卷宗库 …… 完成', delay: 260, tone: 'ok' },
  { text: '校验目录 …… 申报 11 · 返回 12', delay: 420, tone: 'warn' },
  { text: '差值 +1 · 按惯例忽略', delay: 520, tone: 'warn' },
  { text: `登记终端 ${terminalId()} …… 未申请权限`, delay: 700 },
  { text: '权限校验 …… 通过', delay: 880, tone: 'ok' },
  { text: '——', delay: 1000 },
  { text: '本系统不对外提供服务。你的调阅行为将被记录。', delay: 1140, tone: 'err' },
]

const TONE = { ok: 'text-cyanic', warn: 'text-amber', err: 'text-rust' } as const

/** 进站引导。只在每个浏览器标签页出现一次，可随时点掉。 */
export function BootScreen({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0)

  useEffect(() => {
    const timers = LINES.map((l, i) => window.setTimeout(() => setN(i + 1), l.delay))
    const end = window.setTimeout(onDone, 2300)
    return () => {
      timers.forEach(window.clearTimeout)
      window.clearTimeout(end)
    }
  }, [onDone])

  return (
    <div
      className="fixed inset-0 z-[60] flex cursor-pointer flex-col justify-center bg-void px-8 font-mono text-[12.5px]"
      onClick={onDone}
      role="presentation"
    >
      <div className="mx-auto w-full max-w-2xl space-y-1">
        <div className="mb-4 text-[10px] uppercase tracking-wider2 text-faint">
          {fullStamp()} · 冷启动
        </div>
        {LINES.slice(0, n).map((l, i) => (
          <div key={i} className={l.tone ? TONE[l.tone] : 'text-dim'}>
            <span className="mr-2 text-faint">·</span>
            {l.text}
          </div>
        ))}
        <div className="pt-4 text-[10px] text-faint">点击任意处继续</div>
      </div>
    </div>
  )
}
