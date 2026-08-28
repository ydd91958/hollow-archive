import { Link } from 'react-router-dom'
import type { Company } from '../../types'
import { CompanyMark } from '../brand/CompanyMark'
import { ZY } from '@/shared/routes'

/** 名企推荐网格里的一格。 */
export function CompanyCard({ company, jobCount }: { company: Company; jobCount: number }) {
  return (
    <Link to={ZY.company(company.id)} className="zy-card zy-hover block px-3 py-3">
      <div className="flex items-start gap-2.5">
        <CompanyMark brand={company.brand} text={company.shortName} id={company.id} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <span className="min-w-0 truncate text-[13.5px] text-zy-text">{company.shortName}</span>
            {company.verified && (
              <span className="shrink-0 text-[10px] text-zy-primary" title="平台已认证">
                ✓
              </span>
            )}
          </div>
          <div className="mt-0.5 truncate text-[11.5px] text-zy-faint">
            {company.industry.split(' / ')[0]} · {company.size}
          </div>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-1">
        {(company.tags ?? []).slice(0, 3).map((t) => (
          <span key={t} className="zy-tag">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-2 border-t border-dashed border-zy-line pt-1.5 text-[11.5px] text-zy-faint">
        在招 <span className="tabular-nums text-zy-primary">{jobCount}</span> 个职位 · {company.city}
      </div>
    </Link>
  )
}

/** 侧栏用的紧凑一行。 */
export function CompanyRow({ company, jobCount }: { company: Company; jobCount: number }) {
  return (
    <Link
      to={ZY.company(company.id)}
      className="flex items-center gap-2 border-b border-dashed border-zy-line py-2 last:border-0"
    >
      <CompanyMark brand={company.brand} text={company.shortName} id={company.id} size="sm" />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[12.5px] text-zy-text hover:text-zy-primary">
          {company.shortName}
        </span>
        <span className="block truncate text-[11px] text-zy-faint">{company.city}</span>
      </span>
      <span className="shrink-0 text-[11px] tabular-nums text-zy-faint">{jobCount} 职位</span>
    </Link>
  )
}
