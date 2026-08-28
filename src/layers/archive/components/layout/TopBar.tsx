import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BUREAU } from '@/layers/archive/data/system'
import { useSession, progressOf } from '@/layers/archive/state/useSession'
import { integrityOf } from '@/layers/archive/lib/engine'
import { elapsed, fullStamp, terminalId } from '@/shared/lib/format'

export function TopBar() {
  const startedAt = useSession((s) => s.startedAt)
  const integrity = useSession((s) => integrityOf(progressOf(s)))
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <header className="border-b border-line bg-panel/80 backdrop-blur-[1px]">
      <div className="flex items-stretch justify-between">
        <Link to="/sys" className="group flex items-center gap-3 px-4 py-2.5">
          <div className="flex h-8 w-8 items-center justify-center border border-line2 text-[15px] text-amber">
            空
          </div>
          <div className="leading-tight">
            <div className="text-[13px] tracking-wider2 text-ink group-hover:text-amber">
              {BUREAU.systemName} · 内部登记检索系统
            </div>
            <div className="text-[10px] uppercase tracking-wider2 text-faint">
              {BUREAU.publicNameEn} — {BUREAU.systemNameEn} {BUREAU.version} / BUILD {BUREAU.build}
            </div>
          </div>
        </Link>

        <div className="hidden items-center divide-x divide-line border-l border-line text-[10px] uppercase tracking-wider2 text-faint md:flex">
          <div className="px-4 py-2">
            <div>终端</div>
            <div className="text-[11px] text-dim">{terminalId()}</div>
          </div>
          <div className="px-4 py-2">
            <div>会话</div>
            <div className="text-[11px] text-dim">{elapsed(startedAt, now)}</div>
          </div>
          <div className="px-4 py-2">
            <div>库完整度</div>
            <div className="text-[11px] text-dim">
              <span className={integrity < 70 ? 'text-rust' : integrity < 88 ? 'text-amber' : ''}>
                {integrity}%
              </span>
            </div>
          </div>
          <div className="px-4 py-2">
            <div>系统时间</div>
            <div className="text-[11px] text-dim">{fullStamp(new Date(now))}</div>
          </div>
        </div>
      </div>
    </header>
  )
}
