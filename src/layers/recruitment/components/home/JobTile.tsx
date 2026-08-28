import { Link } from 'react-router-dom'
import type { Job } from '../../types'
import { getCompany } from '../../data/companies'
import { CompanyMark } from '../brand/CompanyMark'
import { ZY } from '@/shared/routes'
import { cn } from '@/shared/lib/cn'

const FLAG_LABEL: Record<string, { text: string; cls: string }> = {
  urgent: { text: '急招', cls: 'zy-tag-orange' },
  graduate: { text: '应届', cls: 'zy-tag-green' },
  intern: { text: '实习', cls: 'zy-tag-green' },
}

/**
 * 首页网格里的职位块。
 * 比列表页的卡片更紧：三行文字 + 一行公司，没有多余留白。
 */
export function JobTile({ job }: { job: Job }) {
  const company = getCompany(job.companyId)
  const flag = job.flags?.find((f) => FLAG_LABEL[f])

  return (
    <Link to={ZY.job(job.id)} className="zy-card zy-hover group block px-3.5 py-3">
      {/* 一级：职位名 + 薪资 */}
      <div className="flex items-baseline gap-2">
        <h3 className="min-w-0 flex-1 truncate text-[14.5px] font-medium tracking-tight text-zy-text transition-colors group-hover:text-brand-600">
          {job.title}
        </h3>
        <span className="shrink-0 text-[14.5px] font-semibold tabular-nums text-hot-600">
          {job.salary}
        </span>
      </div>

      {/* 二级：城市 · 经验 · 学历 */}
      <div className="mt-1.5 flex items-center gap-1.5 text-[12px] text-zy-sub">
        <span className="truncate">{job.city}</span>
        <span className="text-zy-line">·</span>
        <span className="shrink-0">{job.experience}</span>
        <span className="text-zy-line">·</span>
        <span className="shrink-0">{job.education}</span>
        {flag && (
          <span className={cn('ml-auto shrink-0', FLAG_LABEL[flag].cls)}>
            {FLAG_LABEL[flag].text}
          </span>
        )}
      </div>

      {/* 三级：企业字标 lockup */}
      <div className="mt-2.5 flex items-center gap-2 border-t border-zy-line2 pt-2.5">
        {company && (
          <CompanyMark brand={company.brand} text={company.shortName} id={company.id} size="xs" />
        )}
        <span className="min-w-0 flex-1 truncate text-[12px] text-zy-sub">
          {company?.shortName}
        </span>
        <span className="shrink-0 text-[11px] text-zy-faint">{company?.size}</span>
      </div>
    </Link>
  )
}
