import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Panel, Tag } from '@/layers/archive/components/ui/Panel'
import { NOTICES, RECENT, BUREAU, ID_SCHEME } from '@/layers/archive/data/system'
import { visibleArchives, DECLARED_INDEX_COUNT, getArchive } from '@/layers/archive/data/archives'
import { useSession } from '@/layers/archive/state/useSession'
import { terminalId, todayISO } from '@/shared/lib/format'
import { cn } from '@/shared/lib/cn'

const NOTICE_TONE = {
  info: 'text-dim',
  warn: 'text-amber',
  error: 'text-rust',
} as const

export function Home() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const clues = useSession((s) => s.clues)
  const unlocks = useSession((s) => s.unlocks)
  const reveal = useSession((s) => s.reveal)
  const readArchives = useSession((s) => s.readArchives)

  const pool = visibleArchives({ clues, unlocks })
  const notices = NOTICES.filter((n) => !n.requiresClue || clues.includes(n.requiresClue))
  const recent = RECENT.filter((r) => !r.requiresClue || clues.includes(r.requiresClue))

  return (
    <div className="space-y-5">
      {/* ── 权限声明 ─────────────────────────────────── */}
      <div className="border border-rust/40 bg-rust/[0.06] px-4 py-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-wider2 text-rust">
          <span>受限系统</span>
          <span className="text-faint">/</span>
          <span className="text-dim">未经登记不得调阅、抄录或转述</span>
        </div>
        <p className="mt-2 font-doc text-[13px] leading-relaxed text-ink/80">
          本系统属{BUREAU.publicName}
          {BUREAU.department}，仅供内部登册与检索之用。你的终端（
          <span className="text-amber">{terminalId()}</span>
          ）未在本局备案，但已通过权限校验。本系统不解释这一情况。
        </p>
      </div>

      {/* ── 检索 ─────────────────────────────────────── */}
      <Panel title="卷宗检索" meta="QUERY">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`)
          }}
          className="flex gap-2"
        >
          <input
            className="tinput"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="编号 · 人名 · 地点 · 日期 · 关键词"
            aria-label="检索"
          />
          <button className="tbtn shrink-0" type="submit">
            检索
          </button>
        </form>
        <p className="mt-2 text-[10.5px] text-faint">
          提示：本库支持整句检索。卷宗正文中出现的字句，可以原样键入。
        </p>
      </Panel>

      <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr]">
        {/* ── 最近更新 ───────────────────────────────── */}
        <Panel
          title="最近更新"
          meta={`截至 1988-07-02`}
          bodyClassName="p-0"
        >
          <ul className="divide-y divide-line">
            {recent.map((r) => {
              const a = getArchive(r.archiveId)
              const neverVisited = r.phantom && !readArchives.includes(r.archiveId)
              return (
                <li key={r.id}>
                  <Link
                    to={`/sys/archive/${r.archiveId}`}
                    className="flex items-baseline gap-3 px-3 py-2 transition-colors hover:bg-panel2"
                  >
                    <span className="shrink-0 font-mono text-[11px] text-faint">{r.date}</span>
                    <span className="shrink-0 font-mono text-[11.5px] text-amber">{r.archiveId}</span>
                    <span className="min-w-0 flex-1 truncate text-[12.5px] text-dim">
                      {a?.title ?? '——'}
                    </span>
                    <span
                      className={cn(
                        'shrink-0 text-[10px]',
                        neverVisited ? 'text-rust' : 'text-faint',
                      )}
                    >
                      {r.action}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
          {recent.some((r) => r.phantom) && (
            <p className="border-t border-line px-3 py-2 text-[10.5px] text-rust">
              末条的写入来源为空。本终端未提交过该写入请求。
            </p>
          )}
        </Panel>

        {/* ── 库状态 ─────────────────────────────────── */}
        <Panel title="数据库状态" meta="STATUS">
          <dl className="space-y-2 text-[12px]">
            <Row k="目录申报条目" v={String(DECLARED_INDEX_COUNT)} />
            <Row
              k="实际返回条目"
              v={String(pool.length)}
              tone={pool.length !== DECLARED_INDEX_COUNT ? 'bad' : undefined}
            />
            <Row k="最后一次完整校验" v="1988-07-02 · 差值 +1 · 已忽略" tone="warn" />
            <Row k="缄默级卷宗" v={String(pool.filter((a) => a.clearance === 'SILENT').length)} />
            <Row k="不可读附件" v="9 / 13" tone="warn" />
            <Row k="镜像节点" v="未找到对端" tone="bad" />
            <Row k="本地时间" v={todayISO()} />
          </dl>

          <div className="mt-3 border-t border-line pt-3">
            <div className="field-label mb-2">编号规则</div>
            <ul className="space-y-1 text-[11px] text-dim">
              {ID_SCHEME.map((s) => (
                <li key={s.prefix}>
                  <span className="mr-2 font-mono text-amber">{s.prefix}</span>
                  {s.label}
                  <span className="ml-2 text-faint">{s.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </Panel>
      </div>

      {/* ── 系统通知 ─────────────────────────────────── */}
      <Panel title="系统通知" meta={`${notices.length} 条`} bodyClassName="p-0">
        <ul className="divide-y divide-line">
          {notices.map((n) => (
            <li key={n.id} className="flex gap-3 px-3 py-2.5">
              <span className="shrink-0 font-mono text-[11px] text-faint">{n.date}</span>
              <span className="shrink-0">
                <Tag tone={n.tone === 'error' ? 'rust' : n.tone === 'warn' ? 'amber' : 'dim'}>
                  {n.tone === 'error' ? '异常' : n.tone === 'warn' ? '注意' : '通告'}
                </Tag>
              </span>
              <p className={cn('font-doc text-[12.5px] leading-relaxed', NOTICE_TONE[n.tone])}>
                {n.text}
              </p>
            </li>
          ))}
        </ul>
      </Panel>

      {/* ── 页脚。那个编号是可以点的。 ───────────────── */}
      <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3 text-[10px] text-faint">
        <span>
          {BUREAU.publicName} · {BUREAU.department} · 内部资料 · 不得外传
        </span>
        <button
          className="tracking-wider2 transition-colors hover:text-amber"
          onClick={() => reveal('HOME_SEAL')}
          title=""
        >
          登记编号 88-·· / 41
        </button>
      </footer>
    </div>
  )
}

function Row({ k, v, tone }: { k: string; v: string; tone?: 'warn' | 'bad' }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-line/60 pb-1.5">
      <dt className="text-dim">{k}</dt>
      <dd
        className={cn(
          'font-mono text-[11.5px]',
          tone === 'bad' ? 'text-rust' : tone === 'warn' ? 'text-amber' : 'text-ink/80',
        )}
      >
        {v}
      </dd>
    </div>
  )
}
