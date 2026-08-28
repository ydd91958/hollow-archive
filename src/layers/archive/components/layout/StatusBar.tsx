import { useEffect, useState } from 'react'
import { AMBIENT_LOG } from '@/layers/archive/data/system'
import { useSession, progressOf } from '@/layers/archive/state/useSession'
import { anomalyLevel } from '@/layers/archive/lib/engine'
import { terminalId } from '@/shared/lib/format'
import { cn } from '@/shared/lib/cn'

export function StatusBar() {
  const level = useSession((s) => anomalyLevel(progressOf(s)))
  const lastLog = useSession((s) => s.log[0])
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % AMBIENT_LOG.length), 3400)
    return () => window.clearInterval(id)
  }, [])

  /** 线索到达第二档后，在线用户列表里会多出一个人。 */
  const users = level >= 2 ? [terminalId(), 'PN-79-0091'] : [terminalId()]

  return (
    <footer className="flex items-center justify-between gap-4 border-t border-line bg-panel/70 px-4 py-1.5 text-[10px] text-faint">
      <div className="flex min-w-0 items-center gap-3">
        <span className="text-cyanic">●</span>
        <span className="truncate">
          {lastLog ? `${lastLog.t}  ${lastLog.text}` : AMBIENT_LOG[i]}
        </span>
        <span className="hidden truncate text-faint/60 lg:inline">/ {AMBIENT_LOG[i]}</span>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <span>
          在线：
          {users.map((u, n) => (
            <span key={u} className={cn(n > 0 && 'ml-1 text-rust')}>
              {u}
              {n < users.length - 1 && ' ·'}
            </span>
          ))}
        </span>
        <span className="hidden sm:inline">
          链路 <span className="text-dim">加密</span>
        </span>
        <span className="animate-blink text-amber">_</span>
      </div>
    </footer>
  )
}
