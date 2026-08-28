import { useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { JobCard } from '../components/JobCard'
import { visibleJobs, salaryFloor } from '../data/jobs'
import { getCompany } from '../data/companies'
import { useActiveSignals } from '@/shared/lib/useSignals'
import { cn } from '@/shared/lib/cn'

const CATS = ['全部', '技术', '产品', '数据', '设计', '运营', '销售', '职能', '工程', '医疗', '教育', '物流']
const EXPS = ['全部', '在校/应届', '经验不限', '1-3 年', '3-5 年']
const SALARIES = ['全部', '5K 以下', '5-10K', '10-20K', '20K 以上']
const EDUS = ['全部', '中专/高中', '大专', '本科', '硕士']

function salaryBucket(salary: string): string {
  const low = salaryFloor(salary)
  if (low === 0) return '面议'
  if (low < 5) return '5K 以下'
  if (low < 10) return '5-10K'
  if (low < 20) return '10-20K'
  return '20K 以上'
}

export function Jobs() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const catParam = params.get('cat') ?? '全部'

  const [draft, setDraft] = useState(q)
  const [cat, setCat] = useState(catParam)
  const [exp, setExp] = useState('全部')
  const [sal, setSal] = useState('全部')
  const [edu, setEdu] = useState('全部')
  const [city, setCity] = useState('全部')
  const [sort, setSort] = useState<'default' | 'salary'>('default')

  const signals = useActiveSignals()
  const pool = visibleJobs(signals)

  /* 城市选项直接从职位库里推导，不写死——加了新城市的职位就自动出现。 */
  const cities = useMemo(
    () => ['全部', ...Array.from(new Set(pool.map((j) => j.city)))],
    [pool],
  )

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase()
    const filtered = pool.filter((j) => {
      const company = getCompany(j.companyId)
      const haystack = [j.title, j.category, j.city, company?.name, company?.shortName, ...j.perks]
        .join(' ')
        .toLowerCase()
      if (needle && !haystack.includes(needle)) return false
      if (cat !== '全部' && j.category !== cat) return false
      if (exp !== '全部' && j.experience !== exp) return false
      if (sal !== '全部' && salaryBucket(j.salary) !== sal) return false
      if (edu !== '全部' && j.education !== edu) return false
      if (city !== '全部' && j.city !== city) return false
      return true
    })
    return sort === 'salary'
      ? [...filtered].sort((a, b) => salaryFloor(b.salary) - salaryFloor(a.salary))
      : filtered
  }, [pool, q, cat, exp, sal, edu, city, sort])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const next = new URLSearchParams(params)
    if (draft.trim()) next.set('q', draft.trim())
    else next.delete('q')
    setParams(next)
  }

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-4">
      <form onSubmit={submit} className="mb-3 flex max-w-2xl">
        <input
          className="zy-input rounded-r-none"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="搜索职位名称、公司名称或关键词"
          aria-label="搜索职位"
        />
        <button className="zy-btn shrink-0 rounded-l-none px-8" type="submit">
          搜索
        </button>
      </form>

      <div className="zy-card mb-3 divide-y divide-zy-line">
        <FilterRow label="城市" options={cities} value={city} onChange={setCity} />
        <FilterRow label="职位类别" options={CATS} value={cat} onChange={setCat} />
        <FilterRow label="工作经验" options={EXPS} value={exp} onChange={setExp} />
        <FilterRow label="学历要求" options={EDUS} value={edu} onChange={setEdu} />
        <FilterRow label="薪资范围" options={SALARIES} value={sal} onChange={setSal} />
      </div>

      <div className="mb-2.5 flex items-baseline justify-between">
        <div className="text-[13px] text-zy-sub">
          共 <span className="tabular-nums text-zy-text">{rows.length}</span> 个职位
          {q && (
            <>
              {' '}
              · 关键词「<span className="text-zy-text">{q}</span>」
            </>
          )}
        </div>
        <div className="flex items-center gap-3 text-[12.5px]">
          <button
            className={sort === 'default' ? 'text-zy-primary' : 'text-zy-sub hover:text-zy-text'}
            onClick={() => setSort('default')}
          >
            综合排序
          </button>
          <span className="text-zy-line">|</span>
          <button
            className={sort === 'salary' ? 'text-zy-primary' : 'text-zy-sub hover:text-zy-text'}
            onClick={() => setSort('salary')}
          >
            薪资优先
          </button>
        </div>
      </div>

      {rows.length ? (
        <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
          {rows.map((j) => (
            <JobCard key={j.id} job={j} />
          ))}
        </div>
      ) : (
        <div className="zy-card px-4 py-16 text-center">
          <p className="text-[13.5px] text-zy-sub">没有找到符合条件的职位</p>
          <p className="mt-1 text-[12px] text-zy-faint">试试减少筛选条件，或更换关键词</p>
        </div>
      )}
    </div>
  )
}

function FilterRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-1 gap-y-1 px-3 py-2">
      <span className="w-[4.5rem] shrink-0 text-[12.5px] text-zy-faint">{label}</span>
      {options.map((o) => (
        <Chip key={o} active={value === o} onClick={() => onChange(o)}>
          {o}
        </Chip>
      ))}
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
    <button
      className={cn(
        'rounded-[2px] px-2 py-0.5 text-[12.5px] transition-colors',
        active ? 'bg-zy-primary/10 text-zy-primary' : 'text-zy-sub hover:text-zy-text',
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
