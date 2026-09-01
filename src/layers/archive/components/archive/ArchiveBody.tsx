import type { Block } from '@/layers/archive/types/archive'
import { useSession } from '@/layers/archive/state/useSession'
import { InlineText } from '@/layers/archive/components/ui/InlineText'
import { Registration } from './Registration'
import { cn } from '@/shared/lib/cn'

const SYSTEM_TONE = {
  info: 'border-cyanic/40 text-cyanic',
  warn: 'border-amberdim text-amber',
  error: 'border-rust/60 text-rust',
} as const

/**
 * 正文区块渲染器。
 * 新增区块类型时：在 types/archive.ts 的 Block 联合里加一项，然后在这里加一个 case。
 * TypeScript 会替你找出所有漏掉的地方。
 */
export function ArchiveBody({
  blocks,
  inkToken,
  archiveId,
}: {
  blocks: Block[]
  inkToken?: string
  /** 缄默级正文靠它取本卷宗的浏览次数，决定这次显示哪个变体。 */
  archiveId?: string
}) {
  const views = useSession((s) => (archiveId ? (s.views[archiveId] ?? 0) : 0))

  return (
    <div className="space-y-4">
      {blocks.map((b, i) => {
        switch (b.kind) {
          case 'heading':
            return (
              <h3
                key={i}
                className="pt-2 text-[12px] uppercase tracking-wider2 text-dim before:mr-2 before:text-faint before:content-['//']"
              >
                {b.text}
              </h3>
            )

          case 'text':
            return (
              <p key={i} className="doc-body">
                <InlineText text={b.text} inkToken={inkToken} />
              </p>
            )

          case 'field':
            return (
              <div key={i} className="grid grid-cols-[6.5rem_1fr] items-baseline gap-3">
                <div className="field-label">{b.label}</div>
                <div className="text-[13px]">
                  <InlineText text={b.value} inkToken={inkToken} />
                </div>
              </div>
            )

          case 'list':
            return (
              <ul key={i} className="space-y-1.5 pl-1">
                {b.items.map((it, n) => (
                  <li key={n} className="doc-body flex gap-3">
                    <span className="shrink-0 select-none font-mono text-[11px] text-faint">
                      {b.ordered ? `${n + 1}.` : '—'}
                    </span>
                    <span>
                      <InlineText text={it} inkToken={inkToken} />
                    </span>
                  </li>
                ))}
              </ul>
            )

          case 'quote':
            return (
              <div key={i} className="grid grid-cols-[5.5rem_2.5rem_1fr] gap-2 text-[13px]">
                <span className="select-none font-mono text-[11px] text-faint">{b.time}</span>
                <span className="font-mono text-[11px] text-cyanic">{b.speaker}</span>
                <span className="font-doc leading-relaxed text-ink/90">
                  <InlineText text={b.text} inkToken={inkToken} />
                </span>
              </div>
            )

          case 'damaged':
            return (
              <p key={i} className="damaged select-none py-1 text-center text-[12px] tracking-wider">
                {b.text}
              </p>
            )

          case 'margin':
            return (
              <aside
                key={i}
                className="border-l-2 border-line2 bg-panel2/60 px-3 py-2 font-doc text-[12.5px] italic leading-relaxed text-dim"
              >
                <div className="mb-1 font-mono text-[9px] uppercase not-italic tracking-wider2 text-faint">
                  卷内批注 {b.hand ? `· ${b.hand}` : ''}
                </div>
                <InlineText text={b.text} inkToken={inkToken} />
              </aside>
            )

          case 'system':
            return (
              <div
                key={i}
                className={cn(
                  'border border-dashed px-3 py-2 text-[11.5px] leading-relaxed',
                  SYSTEM_TONE[b.tone ?? 'info'],
                )}
              >
                <span className="mr-2 opacity-60">[系统]</span>
                <InlineText text={b.text} inkToken={inkToken} />
              </div>
            )

          case 'unstable': {
            /* 缄默级正文不肯保持同一个形状。
               几句话说的是同一件事，只是语序和措辞不同。
               页面不承认自己变过，也没有任何提示。 */
            const v = b.variants[Math.max(0, views - 1) % b.variants.length]
            return (
              <p key={i} className="doc-body">
                <InlineText text={v} inkToken={inkToken} />
              </p>
            )
          }

          case 'registration':
            return <Registration key={i} />

          case 'divider':
            return <hr key={i} className="border-line" />
        }
      })}
    </div>
  )
}
