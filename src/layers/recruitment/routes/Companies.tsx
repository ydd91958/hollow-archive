import { Link } from 'react-router-dom'
import { COMPANIES } from '../data/companies'
import { visibleJobs } from '../data/jobs'
import { CompanyMark } from '../components/brand/CompanyMark'
import { useActiveSignals } from '@/shared/lib/useSignals'
import { ZY } from '@/shared/routes'

export function Companies() {
  const signals = useActiveSignals()
  const jobs = visibleJobs(signals)

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-4 flex items-baseline justify-between border-b border-zy-line pb-2">
        <h1 className="text-base font-medium text-zy-text">北岭 · 招聘企业</h1>
        <span className="text-xs text-zy-faint">共 {COMPANIES.length} 家</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {COMPANIES.map((c) => {
          const count = jobs.filter((j) => j.companyId === c.id).length
          return (
            <Link key={c.id} to={ZY.company(c.id)} className="zy-card zy-hover flex gap-3 p-4">
              <CompanyMark brand={c.brand} text={c.shortName} id={c.id} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[15px] text-zy-text">{c.name}</div>
                <div className="mt-1 flex flex-wrap gap-x-2 text-xs text-zy-sub">
                  <span>{c.industry}</span>
                  <span className="text-zy-faint">·</span>
                  <span>{c.size}</span>
                  <span className="text-zy-faint">·</span>
                  <span>{c.nature}</span>
                </div>
                <div className="mt-2 text-xs text-zy-faint">
                  在招职位 <span className="text-zy-primary">{count}</span> 个 · 成立于 {c.founded}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
