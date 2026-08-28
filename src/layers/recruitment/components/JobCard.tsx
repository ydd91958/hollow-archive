import { Link } from 'react-router-dom'
import type { Job } from '../types'
import { getCompany } from '../data/companies'
import { CompanyMark } from './brand/CompanyMark'
import { ZY } from '@/shared/routes'
import { cn } from '@/shared/lib/cn'

const FLAG_TAG: Record<string, { text: string; cls: string }> = {
  urgent: { text: '急招', cls: 'zy-tag-orange' },
  graduate: { text: '应届', cls: 'zy-tag-green' },
  intern: { text: '实习', cls: 'zy-tag-green' },
}

/** 列表页与相似职位用的卡片。比首页网格块信息多一层，但仍然紧凑。 */
export function JobCard({ job, compact }: { job: Job; compact?: boolean }) {
  const company = getCompany(job.companyId)
  const flag = job.flags?.find((f) => FLAG_TAG[f])

  return (
    <Link to={ZY.job(job.id)} className={cn('zy-card zy-hover block px-3.5 py-3', compact && 'py-2.5')}>
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-1.5">
            <h3 className="min-w-0 truncate text-[14.5px] text-zy-text">{job.title}</h3>
            {flag && <span className={cn('shrink-0', FLAG_TAG[flag].cls)}>{FLAG_TAG[flag].text}</span>}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[12px] text-zy-sub">
            <span>{job.city}</span>
            {job.district && (
              <>
                <span className="text-zy-line">·</span>
                <span>{job.district}</span>
              </>
            )}
            <span className="text-zy-line">|</span>
            <span>{job.experience}</span>
            <span className="text-zy-line">|</span>
            <span>{job.education}</span>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <div className="zy-salary text-[14.5px]">{job.salary}</div>
          {job.salaryNote && <div className="text-[11px] text-zy-faint">{job.salaryNote}</div>}
        </div>
      </div>

      {!compact && (
        <div className="mt-2 flex flex-wrap gap-1">
          {job.perks.slice(0, 4).map((p) => (
            <span key={p} className="zy-tag">
              {p}
            </span>
          ))}
        </div>
      )}

      <div className="mt-2.5 flex items-center gap-2 border-t border-dashed border-zy-line pt-2.5">
        {company && <CompanyMark brand={company.brand} text={company.shortName} id={company.id} size="sm" />}
        <div className="min-w-0 flex-1">
          <div className="truncate text-[12.5px] text-zy-text">{company?.shortName}</div>
          <div className="truncate text-[11px] text-zy-faint">
            {company?.industry.split(' / ')[0]} · {company?.size}
          </div>
        </div>
        <span className="shrink-0 text-[11px] text-zy-faint">{job.publishedText}</span>
      </div>
    </Link>
  )
}
