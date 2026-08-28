import { useMemo, useState, type ReactNode } from 'react'
import type { ArchiveCategory, Clearance } from '@/layers/archive/types/archive'
import { CATEGORY_LABEL, CLEARANCE_LABEL } from '@/layers/archive/types/archive'
import { Panel } from '@/layers/archive/components/ui/Panel'
import { ArchiveRow } from '@/layers/archive/components/archive/ArchiveRow'
import { visibleArchives, CATEGORY_ORDER, DECLARED_INDEX_COUNT } from '@/layers/archive/data/archives'
import { useSession } from '@/layers/archive/state/useSession'
import { cn } from '@/shared/lib/cn'

type CatFilter = ArchiveCategory | 'ALL'
type ClrFilter = Clearance | 'ALL'
type SortKey = 'ID' | 'DATE' | 'CLEARANCE'

const CLEARANCE_RANK: Record<Clearance, number> = { OPEN: 0, INTERNAL: 1, RESTRICTED: 2, SILENT: 3 }

export function Browse() {
  const clues = useSession((s) => s.clues)
  const unlocks = useSession((s) => s.unlocks)
  const [cat, setCat] = useState<CatFilter>('ALL')
  const [clr, setClr] = useState<ClrFilter>('ALL')
  const [sort, setSort] = useState<SortKey>('ID')

  const pool = visibleArchives({ clues, unlocks })

  const rows = useMemo(() => {
    const filtered = pool.filter(
      (a) => (cat === 'ALL' || a.category === cat) && (clr === 'ALL' || a.clearance === clr),
    )
    return filtered.sort((x, y) => {
      if (sort === 'DATE') return y.date.localeCompare(x.date)
      if (sort === 'CLEARANCE') return CLEARANCE_RANK[y.clearance] - CLEARANCE_RANK[x.clearance]
      return x.id.localeCompare(y.id)
    })
  }, [pool, cat, clr, sort])

  const counts = useMemo(() => {
    const m = new Map<ArchiveCategory, number>()
    for (const a of pool) m.set(a.category, (m.get(a.category) ?? 0) + 1)
    return m
  }, [pool])

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-[15px] tracking-wider2 text-ink">卷宗目录</h1>
        <p className="mt-1 text-[11px] text-faint">
          目录申报 {DECLARED_INDEX_COUNT} 条 · 本次返回{' '}
          <span className={pool.length !== DECLARED_INDEX_COUNT ? 'text-rust' : ''}>
            {pool.length}
          </span>{' '}
          条。差值不影响检索，按惯例忽略。
        </p>
      </div>

      <Panel title="筛选" meta={`${rows.length} 条`}>
        <div className="space-y-2.5">
          <FilterRow label="分类">
            <Chip active={cat === 'ALL'} onClick={() => setCat('ALL')}>
              全部
            </Chip>
            {CATEGORY_ORDER.filter((c) => counts.has(c)).map((c) => (
              <Chip key={c} active={cat === c} onClick={() => setCat(c)}>
                {CATEGORY_LABEL[c]} <span className="text-faint">{counts.get(c)}</span>
              </Chip>
            ))}
          </FilterRow>

          <FilterRow label="保密等级">
            <Chip active={clr === 'ALL'} onClick={() => setClr('ALL')}>
              全部
            </Chip>
            {(['OPEN', 'INTERNAL', 'RESTRICTED', 'SILENT'] as Clearance[]).map((c) => (
              <Chip key={c} active={clr === c} onClick={() => setClr(c)}>
                {CLEARANCE_LABEL[c]}
              </Chip>
            ))}
          </FilterRow>

          <FilterRow label="排序">
            {(
              [
                ['ID', '按编号'],
                ['DATE', '按登记日期'],
                ['CLEARANCE', '按保密等级'],
              ] as [SortKey, string][]
            ).map(([k, label]) => (
              <Chip key={k} active={sort === k} onClick={() => setSort(k)}>
                {label}
              </Chip>
            ))}
          </FilterRow>
        </div>
      </Panel>

      <Panel title="返回结果" meta="CATALOGUE" bodyClassName="p-0">
        {rows.length ? (
          rows.map((a) => <ArchiveRow key={a.id} a={a} />)
        ) : (
          <p className="px-3 py-6 text-center text-[12px] text-faint">
            当前筛选条件下无返回。这不代表不存在。
          </p>
        )}
      </Panel>
    </div>
  )
}

function FilterRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="field-label w-16 shrink-0">{label}</span>
      {children}
    </div>
  )
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button className={cn('tbtn !py-1', active && 'tbtn-active')} onClick={onClick}>
      {children}
    </button>
  )
}
