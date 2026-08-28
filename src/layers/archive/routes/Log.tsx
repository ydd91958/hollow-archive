import { Panel } from '@/layers/archive/components/ui/Panel'
import { useSession } from '@/layers/archive/state/useSession'
import { terminalId } from '@/shared/lib/format'
import { cn } from '@/shared/lib/cn'

const TONE = {
  info: 'text-dim',
  good: 'text-cyanic',
  warn: 'text-amber',
  error: 'text-rust',
} as const

/** 系统日志：玩家自己做过的每一件事，以本局的口吻记回来。 */
export function Log() {
  const log = useSession((s) => s.log)
  const readArchives = useSession((s) => s.readArchives)

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-[15px] tracking-wider2 text-ink">系统日志</h1>
        <p className="mt-1 text-[11px] text-faint">
          终端 {terminalId()} · 本次会话 · 共 {log.length} 条 · 日志不可由调阅方删除
        </p>
      </div>

      <Panel title="调阅记录" meta={`${readArchives.length} 份卷宗`}>
        <div className="flex flex-wrap gap-1.5">
          {readArchives.length ? (
            readArchives.map((id) => (
              <span key={id} className="border border-line px-1.5 py-px font-mono text-[10.5px] text-dim">
                {id}
              </span>
            ))
          ) : (
            <span className="text-[11.5px] text-faint">尚无调阅记录。</span>
          )}
        </div>
      </Panel>

      <Panel title="事件流" meta="SYSLOG" bodyClassName="p-0">
        <ul className="max-h-[32rem] overflow-y-auto divide-y divide-line/60">
          {log.map((e, i) => (
            <li key={i} className="flex gap-3 px-3 py-1.5 font-mono text-[11.5px]">
              <span className="shrink-0 text-faint">{e.t}</span>
              <span className={cn('min-w-0', TONE[e.tone ?? 'info'])}>{e.text}</span>
            </li>
          ))}
        </ul>
      </Panel>

      <p className="text-[10.5px] leading-relaxed text-faint">
        日志同时写入本地与本局。两处的条目数长期一致。若你发现两处不一致，以本局为准。
      </p>
    </div>
  )
}
