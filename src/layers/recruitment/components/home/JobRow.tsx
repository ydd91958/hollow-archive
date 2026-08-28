import { Link } from 'react-router-dom'
import type { Job } from '../../types'
import { getCompany } from '../../data/companies'
import { ZY } from '@/shared/routes'
import { cn } from '@/shared/lib/cn'

/** 排行用的单行：序号 + 标题 + 公司 + 薪资。 */
export function RankRow({ job, index }: { job: Job; index: number }) {
  const company = getCompany(job.companyId)
  return (
    <Link
      to={ZY.job(job.id)}
      className="flex items-center gap-2 border-b border-dashed border-zy-line py-2 last:border-0"
    >
      <span className={cn('zy-rank', index < 3 && 'zy-rank-top')}>{index + 1}</span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] text-zy-text hover:text-zy-primary">
          {job.title}
        </span>
        <span className="block truncate text-[11px] text-zy-faint">
          {company?.shortName} · {job.city}
        </span>
      </span>
      <span className="shrink-0 text-[12px] font-semibold tabular-nums text-hot-600">
        {job.salary}
      </span>
    </Link>
  )
}

/**
 * 密集列表行。
 *
 * 信息优先级：职位名称 > 公司名称 > 城市/经验/学历 > 标签 > 薪资。
 * 空间不够就整列隐藏，绝不缩字号、绝不让内容压到相邻列上。
 *
 * 实现要点：
 *  1. 用 grid 而不是 flex。轨道宽度由 grid-template-columns 决定，
 *     不会被内容撑破——之前 flex 下标签容器 flex-1、标签自身 shrink-0，
 *     容器被挤窄后标签就溢出压到右边的列上，那是重叠的根因。
 *  2. 每个格子都 min-w-0 + truncate/overflow-hidden。
 *  3. 每个断点上「可见子元素数量」严格等于「轨道数量」，
 *     否则隐藏一列会让后面的内容整体错位。
 *     DOM 顺序 = 视觉顺序 = 标题·公司·元信息·标签·投递·薪资，薪资恒在最后一列。
 */
export function DenseRow({ job }: { job: Job }) {
  const company = getCompany(job.companyId)

  return (
    <Link
      to={ZY.job(job.id)}
      className={cn(
        'zy-row group grid items-center gap-x-3 border-b border-zy-line2 px-4 py-[10px] last:border-0',
        /* 标题 · 薪资 */
        'grid-cols-[minmax(0,1fr)_4.5rem]',
        /* + 公司 */
        'sm:grid-cols-[minmax(0,1fr)_8rem_4.5rem]',
        /* + 城市/经验/学历 */
        'lg:grid-cols-[minmax(0,1fr)_8.5rem_9.5rem_4.5rem]',
        /* + 标签 */
        'xl:grid-cols-[minmax(0,1.3fr)_8.5rem_9.5rem_minmax(0,1fr)_4.5rem]',
        /* + 投递数 */
        '2xl:grid-cols-[minmax(0,1.3fr)_9rem_10rem_minmax(0,1fr)_4.5rem_4.5rem]',
      )}
    >
      {/* 1 · 职位名称（窄屏时把公司与城市降级成副行） */}
      <span className="min-w-0 overflow-hidden">
        <span className="block truncate text-[14px] font-medium tracking-tight text-zy-text transition-colors group-hover:text-brand-600">
          {job.title}
        </span>
        <span className="block truncate text-[11px] text-zy-faint sm:hidden">
          {company?.shortName} · {job.city}
        </span>
        <span className="hidden truncate text-[11px] text-zy-faint sm:block lg:hidden">
          {job.city} · {job.experience}
        </span>
      </span>

      {/* 2 · 公司 */}
      <span className="hidden min-w-0 truncate text-[12.5px] text-zy-sub sm:block">
        {company?.shortName}
      </span>

      {/* 3 · 城市 · 经验 · 学历 */}
      <span className="hidden min-w-0 truncate text-[12px] text-zy-sub lg:block">
        {job.city} · {job.experience} · {job.education}
      </span>

      {/* 4 · 福利标签 */}
      <span className="hidden min-w-0 overflow-hidden xl:block">
        <span className="flex flex-nowrap items-center gap-1">
          {job.perks.slice(0, 3).map((p, i) => (
            <span key={p} className={cn('zy-tag shrink-0', i === 2 && 'hidden 2xl:inline-block')}>
              {p}
            </span>
          ))}
        </span>
      </span>

      {/* 5 · 投递数 */}
      <span className="hidden min-w-0 truncate text-right text-[11px] tabular-nums text-zy-faint 2xl:block">
        {job.applicants ? `${job.applicants} 投递` : '—'}
      </span>

      {/* 6 · 薪资（恒在最后一列） */}
      <span className="min-w-0 truncate text-right text-[13px] font-semibold tabular-nums text-hot-600">
        {job.salary}
      </span>
    </Link>
  )
}
