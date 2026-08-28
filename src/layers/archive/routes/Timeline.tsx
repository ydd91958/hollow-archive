import { Link } from 'react-router-dom'
import { Panel } from '@/layers/archive/components/ui/Panel'
import { TIMELINE } from '@/layers/archive/data/timeline'
import { useSession } from '@/layers/archive/state/useSession'
import { cn } from '@/shared/lib/cn'

export function Timeline() {
  const clues = useSession((s) => s.clues)
  const events = TIMELINE.filter((e) => !e.requiresClue || clues.includes(e.requiresClue))
  const conflicts = events.filter((e) => e.conflict).length

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-[15px] tracking-wider2 text-ink">事件时间线</h1>
        <p className="mt-1 text-[11px] text-faint">
          由各卷宗的日期字段自动汇编。本页不做人工校对——因此矛盾会原样呈现。
        </p>
      </div>

      <Panel title="汇编结果" meta={`${events.length} 条 · 时序冲突 ${conflicts} 处`} bodyClassName="p-0">
        <ol className="divide-y divide-line">
          {events.map((e, i) => (
            <li key={i} className="grid grid-cols-[7rem_1fr] gap-3 px-3 py-3">
              <div className="pt-0.5">
                <div
                  className={cn(
                    'font-mono text-[11.5px]',
                    e.conflict ? 'text-rust' : 'text-amber',
                  )}
                >
                  {e.date}
                </div>
                {e.conflict && (
                  <div className="mt-0.5 text-[9px] uppercase tracking-wider2 text-rust/70">
                    时序冲突
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <span className="text-[13px] text-ink">{e.label}</span>
                  {e.archiveId && (
                    <Link
                      to={`/sys/archive/${e.archiveId}`}
                      className="font-mono text-[10.5px] text-dim transition-colors hover:text-amber"
                    >
                      {e.archiveId}
                    </Link>
                  )}
                </div>
                <p className="mt-1 font-doc text-[12.5px] leading-relaxed text-dim">{e.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </Panel>

      <div className="border border-dashed border-amberdim px-4 py-3 text-[11.5px] leading-relaxed text-amber">
        <span className="mr-2 opacity-60">[系统]</span>
        本页共检出 {conflicts} 处时序冲突，全部集中在同一名编制人员的相关记录上。汇编模块建议人工复核。复核请求已提交
        3 次，受理栏为空。
      </div>
    </div>
  )
}
