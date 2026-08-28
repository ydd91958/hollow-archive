import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Panel } from '@/layers/archive/components/ui/Panel'
import { ArchiveRow } from '@/layers/archive/components/archive/ArchiveRow'
import { visibleArchives } from '@/layers/archive/data/archives'
import { SEARCH_TRIGGERS } from '@/layers/archive/data/searchTriggers'
import { searchArchives, matchTriggers } from '@/layers/archive/lib/search'
import { useSession } from '@/layers/archive/state/useSession'
import { cn } from '@/shared/lib/cn'

const TONE = {
  info: 'border-cyanic/40 text-cyanic',
  warn: 'border-amberdim text-amber',
  error: 'border-rust/60 text-rust',
} as const

export function Search() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const [draft, setDraft] = useState(q)

  const clues = useSession((s) => s.clues)
  const unlocks = useSession((s) => s.unlocks)
  const recordSearch = useSession((s) => s.recordSearch)
  const searches = useSession((s) => s.searches)

  useEffect(() => setDraft(q), [q])
  useEffect(() => {
    if (q.trim()) recordSearch(q)
  }, [q, recordSearch])

  const pool = visibleArchives({ clues, unlocks })
  const hits = useMemo(() => searchArchives(pool, q), [pool, q])
  // 彩蛋在 recordSearch 之后求值，这样"输入即解锁"的那条线索能立刻生效。
  const triggers = useMemo(() => matchTriggers(SEARCH_TRIGGERS, q, clues), [q, clues])

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-[15px] tracking-wider2 text-ink">检索</h1>
        <p className="mt-1 text-[11px] text-faint">
          本库对编号、标题、代号、检索词与正文全文匹配。整句也可以直接键入。
        </p>
      </div>

      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          setParams(draft.trim() ? { q: draft.trim() } : {})
        }}
      >
        <input
          className="tinput"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="编号 · 人名 · 地点 · 日期 · 关键词 · 整句"
          autoFocus
          aria-label="检索"
        />
        <button className="tbtn shrink-0" type="submit">
          检索
        </button>
      </form>

      {/* ── 系统对某些词的反应 ───────────────────────── */}
      {triggers.map((t) => (
        <div key={t.id} className={cn('animate-fadeup border border-dashed px-4 py-3', TONE[t.response.tone])}>
          <div className="mb-1.5 text-[10px] uppercase tracking-wider2 opacity-70">
            检索响应 · {t.id}
          </div>
          <ul className="space-y-1 font-doc text-[12.5px] leading-relaxed">
            {t.response.lines.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>

          {t.ghostResults?.length ? (
            <ul className="mt-3 divide-y divide-current/20 border-t border-current/20 pt-1">
              {t.ghostResults.map((g) =>
                g.to ? (
                  <li key={g.id}>
                    <Link to={g.to} className="block py-1.5 transition-opacity hover:opacity-70">
                      <span className="font-mono text-[11.5px]">{g.title}</span>
                      <span className="ml-3 text-[11px] opacity-70">{g.line}</span>
                    </Link>
                  </li>
                ) : (
                  <li key={g.id} className="py-1.5">
                    <span className="font-mono text-[11.5px]">{g.title}</span>
                    <span className="ml-3 text-[11px] opacity-70">{g.line}</span>
                  </li>
                ),
              )}
            </ul>
          ) : null}
        </div>
      ))}

      {/* ── 常规结果 ─────────────────────────────────── */}
      {q.trim() ? (
        <Panel
          title="返回结果"
          meta={`${hits.length} 条 · 检索式「${q}」`}
          bodyClassName="p-0"
        >
          {hits.length ? (
            hits.map((h) => (
              <ArchiveRow key={h.archive.id} a={h.archive} note={`命中：${h.where.join(' / ')}`} />
            ))
          ) : (
            <div className="px-4 py-8 text-center">
              <p className="text-[12.5px] text-dim">无匹配记录。</p>
              <p className="mt-1.5 text-[11px] text-faint">
                检索式已记入本次会话日志。无匹配不等于不存在——只等于目录没有申报它。
              </p>
            </div>
          )}
        </Panel>
      ) : (
        <Panel title="本次会话检索历史" meta={`${searches.length} 条`} bodyClassName="p-0">
          {searches.length ? (
            <ul className="divide-y divide-line">
              {[...searches].reverse().map((s, i) => (
                <li key={`${s}-${i}`}>
                  <button
                    className="w-full px-3 py-2 text-left text-[12px] text-dim transition-colors hover:bg-panel2 hover:text-ink"
                    onClick={() => setParams({ q: s })}
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-3 py-6 text-center text-[11.5px] text-faint">
              尚无检索记录。你键入的每一个词都会被保存，包括打错的那些。
            </p>
          )}
        </Panel>
      )}
    </div>
  )
}
