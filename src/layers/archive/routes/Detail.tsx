import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CATEGORY_LABEL, CLEARANCE_LABEL, CUSTODY_LABEL, STATUS_LABEL } from '@/layers/archive/types/archive'
import { Panel } from '@/layers/archive/components/ui/Panel'
import { ArchiveBody } from '@/layers/archive/components/archive/ArchiveBody'
import { Attachments } from '@/layers/archive/components/archive/Attachments'
import { ClearanceTag, StatusTag } from '@/layers/archive/components/archive/tags'
import { getArchive, isVisible } from '@/layers/archive/data/archives'
import { useSession } from '@/layers/archive/state/useSession'
import { terminalId } from '@/shared/lib/format'
import { cn } from '@/shared/lib/cn'

/**
 * 某些卷宗的正文里埋了隐形墨水。
 * 在这里把卷宗和 reveal token 对应起来，避免把 ARG 逻辑写进数据文件。
 */
const INK_TOKENS: Record<string, string> = {
  'IR-88-0233': 'IR233_INK',
}

export function Detail() {
  const { id = '' } = useParams()
  const clues = useSession((s) => s.clues)
  const unlocks = useSession((s) => s.unlocks)
  const markRead = useSession((s) => s.markRead)
  const pushLog = useSession((s) => s.pushLog)

  const a = getArchive(id)
  const allowed = a ? isVisible(a, { clues, unlocks }) : false

  useEffect(() => {
    if (a && allowed) markRead(a.id)
    else pushLog(`调阅 ${id.toUpperCase()} · 拒绝 · 记录不在返回范围内`, 'error')
  }, [a, allowed, id, markRead, pushLog])

  if (!a || !allowed) return <Denied id={id} known={Boolean(a)} />

  return (
    <article className="space-y-5">
      {/* ── 卷宗头 ───────────────────────────────────── */}
      <header className="panel">
        <div className="panel-head">
          <span>卷宗</span>
          <span>
            {CATEGORY_LABEL[a.category]} · {a.id}
          </span>
        </div>

        <div className="grid grid-cols-2 divide-x divide-y divide-line border-b border-line sm:grid-cols-3 lg:grid-cols-5">
          <HeadCell label="ARCHIVE ID" value={a.id} mono accent />
          <HeadCell label="STATUS" value={STATUS_LABEL[a.status]} />
          <HeadCell label="DATE" value={a.date} mono />
          <HeadCell label="CLEARANCE" value={CLEARANCE_LABEL[a.clearance]} />
          <HeadCell label="CUSTODY" value={a.custody ? CUSTODY_LABEL[a.custody] : '不适用'} />
        </div>

        <div className="px-4 py-4">
          <h1 className="text-[19px] leading-snug tracking-wide text-ink">
            {a.title}
            {a.codename && <span className="ml-3 text-[15px] text-amber">「{a.codename}」</span>}
          </h1>
          <p className="mt-2 max-w-3xl font-doc text-[13px] leading-relaxed text-dim">{a.summary}</p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <StatusTag value={a.status} />
            <ClearanceTag value={a.clearance} />
            {a.revised && (
              <span className="text-[10px] text-faint">
                最后修订 {a.revised}
                {a.revisedBy && (
                  <span className={cn('ml-1', a.revisedBy.startsWith('[') && 'text-rust')}>
                    · {a.revisedBy}
                  </span>
                )}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* ── 正文 ─────────────────────────────────────── */}
      <Panel title="正文" meta={`调阅终端 ${terminalId()}`} bodyClassName="px-4 py-5 md:px-6">
        <ArchiveBody blocks={a.body} inkToken={INK_TOKENS[a.id]} />
      </Panel>

      {/* ── 附件 ─────────────────────────────────────── */}
      {a.attachments?.length ? (
        <Panel
          title="附件"
          meta={`${a.attachments.filter((x) => x.state === 'AVAILABLE').length} / ${a.attachments.length} 可读`}
          bodyClassName="px-2 py-1"
        >
          <Attachments items={a.attachments} archiveId={a.id} />
        </Panel>
      ) : null}

      {/* ── 关联 ─────────────────────────────────────── */}
      {a.related?.length ? (
        <Panel title="相关卷宗" meta="CROSS-REF" bodyClassName="p-0">
          <ul className="divide-y divide-line">
            {a.related.map((rid) => {
              const r = getArchive(rid)
              const ok = r && isVisible(r, { clues, unlocks })
              if (!ok) {
                return (
                  <li key={rid} className="flex items-baseline gap-3 px-3 py-2.5">
                    <span className="font-mono text-[11.5px] text-faint line-through">{rid}</span>
                    <span className="text-[12px] text-faint">
                      交叉引用存在，目标不在本次返回范围内。
                    </span>
                  </li>
                )
              }
              return (
                <li key={rid}>
                  <Link
                    to={`/sys/archive/${rid}`}
                    className="flex items-baseline gap-3 px-3 py-2.5 transition-colors hover:bg-panel2"
                  >
                    <span className="font-mono text-[11.5px] text-amber">{rid}</span>
                    <span className="min-w-0 flex-1 truncate text-[12.5px] text-ink/85">
                      {r.title}
                    </span>
                    <span className="shrink-0 text-[10px] text-faint">
                      {CATEGORY_LABEL[r.category]}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </Panel>
      ) : null}

      {a.footer && (
        <p className="border-t border-line pt-3 text-[10.5px] leading-relaxed text-faint">
          {a.footer}
        </p>
      )}
    </article>
  )
}

function HeadCell({
  label,
  value,
  mono,
  accent,
}: {
  label: string
  value: string
  mono?: boolean
  accent?: boolean
}) {
  return (
    <div className="px-3 py-2.5">
      <div className="field-label">{label}</div>
      <div
        className={cn(
          'mt-1 text-[12.5px]',
          mono && 'font-mono tracking-wide',
          accent ? 'text-amber' : 'text-ink/85',
        )}
      >
        {value}
      </div>
    </div>
  )
}

/** 调阅被拒。用系统的口吻，不用游戏的口吻。 */
function Denied({ id, known }: { id: string; known: boolean }) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="panel">
        <div className="panel-head">
          <span>调阅失败</span>
          <span className="text-rust">0x41</span>
        </div>
        <div className="space-y-3 px-5 py-6">
          <div className="font-mono text-[13px] text-rust">
            {known ? '记录存在，不在本次返回范围内。' : '未找到匹配的卷宗编号。'}
          </div>
          <div className="font-mono text-[12px] text-dim">请求编号：{id.toUpperCase() || '——'}</div>
          <p className="font-doc text-[12.5px] leading-relaxed text-dim">
            {known
              ? '交叉引用指向本条，目录不申报本条，检索不返回本条。以上三项同时成立。本系统按惯例不予解释——你需要先拿到能让它出现的东西。'
              : '编号格式正确的请求会被记入日志，即使目标不存在。本次请求已记入。'}
          </p>
          <div className="flex gap-2 pt-2">
            <Link to="/sys/browse" className="tbtn">
              返回目录
            </Link>
            <Link to="/sys/search" className="tbtn">
              改用检索
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
