import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getJob, visibleJobs } from '../data/jobs'
import { getCompany } from '../data/companies'
import { JobCard } from '../components/JobCard'
import { CompanyMark } from '../components/brand/CompanyMark'
import { useTrace } from '@/shared/state/useTrace'
import { useActiveSignals } from '@/shared/lib/useSignals'
import { KeyTerm } from '../components/Emphasis'
import { renderInline } from '../lib/inlineMark'
import { ZY } from '@/shared/routes'
import { cn } from '@/shared/lib/cn'

export function JobDetail() {
  const { id = '' } = useParams()
  const job = getJob(id)
  const company = job ? getCompany(job.companyId) : undefined
  const note = useTrace((s) => s.note)
  const signals = useActiveSignals()

  useEffect(() => {
    if (job) note(`job:${job.id}`)
    if (job?.companyId) note(`company:${job.companyId}`)
  }, [job, note])

  if (!job || !company) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-base text-zy-text">该职位已下线或不存在</p>
        <p className="mt-2 text-sm text-zy-sub">职位可能已被企业关闭，或链接有误。</p>
        <Link to={ZY.jobs} className="zy-btn mt-6">
          浏览其他职位
        </Link>
      </div>
    )
  }

  /*
   * 相似职位排序：同职位族 > 同公司 > 同类目。
   * 只按 category 匹配会把「项目资料管理员」推给 HRBP、法务专员——
   * 那会把玩家从资料岗这一簇里弹出去，是一处断链。
   */
  const similar = visibleJobs(signals)
    .filter(
      (j) =>
        j.id !== job.id &&
        (j.family === job.family || j.companyId === job.companyId || j.category === job.category),
    )
    .map((j) => ({
      job: j,
      score:
        (job.family && j.family === job.family ? 4 : 0) +
        (j.companyId === job.companyId ? 3 : 0) +
        (j.category === job.category ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((x) => x.job)

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <nav className="mb-4 text-xs text-zy-faint">
        <Link to={ZY.home} className="hover:text-zy-primary">
          首页
        </Link>
        <span className="mx-1.5">/</span>
        <Link to={ZY.jobs} className="hover:text-zy-primary">
          {job.city}招聘
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-zy-sub">{job.title}</span>
      </nav>

      <div className="grid gap-5 lg:grid-cols-[1fr_19rem]">
        <div className="space-y-5">
          {/* ── 职位头部 ─────────────────────────────── */}
          <section className="zy-card p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-xl font-semibold text-zy-text">{job.title}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-zy-sub">
                  <span className="zy-salary text-lg">{job.salary}</span>
                  {job.salaryNote && <span className="text-xs text-zy-faint">{job.salaryNote}</span>}
                  <span className="text-zy-faint">|</span>
                  <span>
                    {job.city}
                    {job.district ? ` · ${job.district}` : ''}
                  </span>
                  <span className="text-zy-faint">|</span>
                  <span>{job.experience}</span>
                  <span className="text-zy-faint">|</span>
                  <span>{job.education}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="zy-btn-ghost">收藏</button>
                <button className="zy-btn px-6">立即投递</button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {job.perks.map((p) => (
                <span key={p} className="zy-tag">
                  {p}
                </span>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-2 border-t border-zy-line pt-3 text-xs text-zy-faint">
              {job.publishedText.includes('已连续发布') ? (
                <KeyTerm level={2}>{job.publishedText}</KeyTerm>
              ) : (
                <span>{job.publishedText}</span>
              )}
              <span>· 该职位由企业直招 · 简历查看率 76%</span>
            </div>
          </section>

          {/* ── 职位描述 ─────────────────────────────── */}
          <section className="zy-card p-6">
            <h2 className="mb-4 text-base font-medium text-zy-text">职位描述</h2>

            <h3 className="mb-2 text-sm font-medium text-zy-text">工作内容</h3>
            <ol className="mb-6 space-y-2 text-sm leading-relaxed text-zy-sub">
              {job.responsibilities.map((r, i) => (
                <li key={i} className="flex gap-2">
                  <span className="shrink-0 text-zy-faint">{i + 1}.</span>
                  <span>{r}</span>
                </li>
              ))}
            </ol>

            <h3 className="mb-2 text-sm font-medium text-zy-text">任职要求</h3>
            <ol className="space-y-2 text-sm leading-relaxed text-zy-sub">
              {job.requirements.map((r, i) => (
                <li key={i} className="flex gap-2">
                  <span className="shrink-0 text-zy-faint">{i + 1}.</span>
                  {job.highlight?.includes(r) ? <KeyTerm level={2}>{r}</KeyTerm> : <span>{r}</span>}
                </li>
              ))}
            </ol>

            {job.addendum && (
              <p className="mt-6 border-t border-zy-line pt-4 text-sm leading-relaxed text-zy-sub">
                {renderInline(job.addendum)}
              </p>
            )}
          </section>

          {/* ── 工作地点 ─────────────────────────────── */}
          <section className="zy-card p-6">
            <h2 className="mb-3 text-base font-medium text-zy-text">工作地点</h2>
            <p className="text-sm text-zy-sub">{company.address}</p>
            <div className="mt-3 flex h-36 items-center justify-center rounded border border-zy-line bg-zy-tag text-xs text-zy-faint">
              地图加载中…
            </div>
          </section>

          {similar.length > 0 && (
            <section>
              <h2 className="mb-3 border-b border-zy-line pb-2 text-base font-medium text-zy-text">
                相似职位
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {similar.map((j) => (
                  <JobCard key={j.id} job={j} compact />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* ── 侧栏 ───────────────────────────────────── */}
        <aside className="space-y-5">
          <section className="zy-card p-4">
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm text-white',
                  job.recruiter.avatarTone,
                )}
              >
                {job.recruiter.name.slice(0, 1)}
              </span>
              <div className="min-w-0">
                <div className="text-sm text-zy-text">{job.recruiter.name}</div>
                <div className="truncate text-xs text-zy-faint">
                  {job.recruiter.title} · {job.recruiter.activeText}
                </div>
              </div>
            </div>
            <button className="zy-btn-ghost mt-3 w-full">在线沟通</button>
          </section>

          <section className="zy-card p-4">
            <Link to={ZY.company(company.id)} className="flex items-center gap-3">
              <CompanyMark brand={company.brand} text={company.shortName} id={company.id} />
              <div className="min-w-0">
                <div className="truncate text-sm text-zy-text">{company.shortName}</div>
                <div className="truncate text-xs text-zy-faint">{company.industry}</div>
              </div>
            </Link>
            <dl className="mt-4 space-y-2 border-t border-zy-line pt-3 text-xs">
              <Row k="企业性质" v={company.nature} />
              <Row k="人员规模" v={company.size} />
              <Row k="成立时间" v={company.founded} />
              <Row k="所在地" v={company.city} />
            </dl>
            <Link to={ZY.company(company.id)} className="zy-link mt-3 block text-xs">
              查看公司主页 →
            </Link>
          </section>

          <div className="text-right">
            <button className="text-xs text-zy-faint transition-colors hover:text-zy-sub">
              举报该职位
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-zy-faint">{k}</dt>
      <dd className="text-right text-zy-sub">{v}</dd>
    </div>
  )
}
