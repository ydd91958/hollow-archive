import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCompany } from '../data/companies'
import { visibleJobs } from '../data/jobs'
import { JobCard } from '../components/JobCard'
import { useTrace } from '@/shared/state/useTrace'
import { useActiveSignals } from '@/shared/lib/useSignals'
import { KeyTerm } from '../components/Emphasis'
import { CompanyMark } from '../components/brand/CompanyMark'
import { ZY } from '@/shared/routes'
import { cn } from '@/shared/lib/cn'

type Tab = 'intro' | 'jobs' | 'projects' | 'reviews'

const TABS: { id: Tab; label: string }[] = [
  { id: 'intro', label: '公司介绍' },
  { id: 'jobs', label: '在招职位' },
  { id: 'projects', label: '项目沿革' },
  { id: 'reviews', label: '公司评价' },
]

export function Company() {
  const { id = '' } = useParams()
  const company = getCompany(id)
  const note = useTrace((s) => s.note)
  const signals = useActiveSignals()
  const [tab, setTab] = useState<Tab>('intro')

  useEffect(() => {
    if (company) note(`company:${company.id}`)
  }, [company, note])

  if (!company) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-base text-zy-text">企业主页不存在</p>
        <Link to={ZY.home} className="zy-btn mt-6">
          返回首页
        </Link>
      </div>
    )
  }

  const jobs = visibleJobs(signals).filter((j) => j.companyId === company.id)
  const avgRating =
    company.reviews.reduce((s, r) => s + r.rating, 0) / Math.max(1, company.reviews.length)

  return (
    <div>
      {/* ── 企业头部 ───────────────────────────────── */}
      <div className="border-b border-zy-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-7">
          <div className="flex flex-wrap items-start gap-5">
            <CompanyMark
              brand={company.brand}
              text={company.shortName}
              id={company.id}
              size="xl"
            />
            <div className="min-w-0 flex-1">
              <h1 className="text-xl font-semibold text-zy-text">{company.name}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zy-sub">
                <span>{company.industry}</span>
                <span className="text-zy-faint">|</span>
                <span>{company.size}</span>
                <span className="text-zy-faint">|</span>
                <span>{company.nature}</span>
                <span className="text-zy-faint">|</span>
                <span>成立于 {company.founded}</span>
              </div>
              <div className="mt-1.5 text-sm text-zy-sub">{company.address}</div>
              {company.website && (
                <div className="mt-1 text-xs text-zy-faint">官网 {company.website}</div>
              )}
            </div>
            <div className="text-right">
              <div className="zy-salary text-2xl">{avgRating.toFixed(1)}</div>
              <div className="text-xs text-zy-faint">{company.reviews.length} 条评价</div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4">
          <div className="flex gap-1 border-t border-zy-line">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  '-mb-px border-b-2 px-4 py-3 text-sm transition-colors',
                  tab === t.id
                    ? 'border-zy-primary text-zy-primary'
                    : 'border-transparent text-zy-sub hover:text-zy-text',
                )}
              >
                {t.label}
                {t.id === 'jobs' && <span className="ml-1 text-xs">{jobs.length}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6">
        {tab === 'intro' && (
          <section className="zy-card p-6">
            <h2 className="mb-4 text-base font-medium text-zy-text">公司介绍</h2>
            <div className="space-y-4 text-sm leading-relaxed text-zy-sub">
              {company.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <h2 className="mb-4 mt-8 text-base font-medium text-zy-text">企业发展</h2>
            <ol className="space-y-3">
              {company.milestones.map((m) => (
                <li key={m.year} className="flex gap-4 text-sm">
                  <span className="w-12 shrink-0 text-zy-primary">{m.year}</span>
                  <span className="text-zy-sub">{m.text}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {tab === 'jobs' && (
          <div className="grid gap-3 sm:grid-cols-2">
            {jobs.length ? (
              jobs.map((j) => <JobCard key={j.id} job={j} />)
            ) : (
              <p className="zy-card col-span-full px-4 py-12 text-center text-sm text-zy-sub">
                该企业暂无在招职位
              </p>
            )}
          </div>
        )}

        {tab === 'projects' && (
          <section className="zy-card p-6">
            <h2 className="mb-1 text-base font-medium text-zy-text">项目沿革</h2>
            <p className="mb-5 text-xs text-zy-faint">
              以下内容由企业自主申报，部分早期条目由档案整编时批量导入，平台未逐条核验。
            </p>

            {company.projects?.length ? (
              <ol className="divide-y divide-zy-line">
                {company.projects.map((p) => (
                  <li key={p.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      {p.hasDetail ? (
                        <Link
                          to={ZY.companyProject(company.id, p.id)}
                          className="text-sm font-medium text-zy-primary hover:underline"
                        >
                          {p.name}
                        </Link>
                      ) : (
                        <span className="text-sm font-medium text-zy-text">{p.name}</span>
                      )}
                      {p.hasDetail ? (
                        <KeyTerm level={2} className="text-xs tabular-nums">
                          {p.period}
                        </KeyTerm>
                      ) : (
                        <span className="text-xs tabular-nums text-zy-faint">{p.period}</span>
                      )}
                      <span className="zy-tag">{p.role}</span>
                      {p.hasDetail && (
                        <span className="text-xs text-zy-faint">项目编号 {p.id}</span>
                      )}
                    </div>

                    {p.note && (
                      <p className="mt-1.5 text-xs leading-relaxed text-zy-faint">{p.note}</p>
                    )}

                    {p.members?.length ? (
                      <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                        <span className="text-xs text-zy-faint">项目成员</span>
                        {p.members.map((m) =>
                          m.personId ? (
                            <Link
                              key={m.name}
                              to={ZY.person(m.personId)}
                              className="zy-link text-[13px]"
                            >
                              {m.name}
                              <span className="ml-1 text-xs text-zy-faint">{m.role}</span>
                            </Link>
                          ) : (
                            <span key={m.name} className="text-[13px] text-zy-sub">
                              {m.name}
                              <span className="ml-1 text-xs text-zy-faint">{m.role}</span>
                            </span>
                          ),
                        )}
                      </div>
                    ) : null}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="py-8 text-center text-sm text-zy-sub">该企业暂未申报项目信息</p>
            )}
          </section>
        )}

        {tab === 'reviews' && (
          <section className="zy-card divide-y divide-zy-line">
            {company.reviews.map((r) => (
              <article key={r.id} className="p-5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zy-faint">
                  <span className="text-sm text-zy-text">{r.author}</span>
                  <span>{r.role}</span>
                  <span className="ml-auto">{r.date}</span>
                </div>
                <div className="mt-1.5 text-sm text-zy-salary">
                  {'★'.repeat(r.rating)}
                  <span className="text-zy-faint">{'★'.repeat(5 - r.rating)}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-zy-sub">{r.text}</p>
              </article>
            ))}
            <div className="p-4 text-center text-xs text-zy-faint">
              评价由平台认证的在职或离职员工提交，不代表平台观点。
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
