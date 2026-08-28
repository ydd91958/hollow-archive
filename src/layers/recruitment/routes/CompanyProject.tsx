import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCompanyProject } from '../data/companyProjects'
import { getCompany } from '../data/companies'
import { CompanyMark } from '../components/brand/CompanyMark'
import { FieldValue, KeyTerm } from '../components/Emphasis'
import { useTrace } from '@/shared/state/useTrace'
import { ZY } from '@/shared/routes'
import { cn } from '@/shared/lib/cn'

/**
 * 企业历史项目详情页。
 *
 * 这一页什么都不解释。它只是把一个字段没填全的老项目摊开，
 * 配一条平台的通用提示（资料正在迁移），然后按惯例列出著录来源。
 * 来源恰好指向另一个网站——那就是玩家离开招聘平台的地方。
 */
export function CompanyProject() {
  const { id = '', pid = '' } = useParams()
  const project = getCompanyProject(pid)
  const company = getCompany(id)
  const note = useTrace((s) => s.note)

  useEffect(() => {
    if (project) note(`project:${project.id}`)
  }, [project, note])

  if (!project || !company || project.companyId !== company.id) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-[15px] text-zy-text">未找到该项目的详情</p>
        <p className="mt-2 text-[13px] text-zy-sub">该企业的部分项目未提供详细信息。</p>
        <Link to={ZY.company(id)} className="zy-btn mt-6">
          返回企业主页
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-4">
      <nav className="mb-3 text-[12px] text-zy-faint">
        <Link to={ZY.home} className="hover:text-zy-primary">
          首页
        </Link>
        <span className="mx-1.5">/</span>
        <Link to={ZY.companies} className="hover:text-zy-primary">
          找公司
        </Link>
        <span className="mx-1.5">/</span>
        <Link to={ZY.company(company.id)} className="hover:text-zy-primary">
          {company.shortName}
        </Link>
        <span className="mx-1.5">/</span>
        <span>项目沿革</span>
        <span className="mx-1.5">/</span>
        <span className="text-zy-sub">{project.name}</span>
      </nav>

      <div className="flex gap-3">
        <div className="min-w-0 flex-1 space-y-3">
          {/* ── 项目头 ─────────────────────────────── */}
          <section className="zy-card px-6 py-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <h1 className="text-[21px] font-semibold text-zy-text">{project.name}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-zy-sub">
                  <KeyTerm level={2} className="tabular-nums">
                    {project.code}
                  </KeyTerm>
                  <span className="text-zy-line">|</span>
                  <KeyTerm level={2} hit className="tabular-nums">
                    {project.period}
                  </KeyTerm>
                  <span className="text-zy-line">|</span>
                  <span>{project.status}</span>
                  <span className="zy-tag">{project.role}</span>
                </div>
                {project.altName && (
                  <div className="mt-1.5 text-[12px] text-zy-faint">
                    别名（外部著录）：<KeyTerm level={2}>{project.altName}</KeyTerm>
                  </div>
                )}
              </div>
              <Link
                to={ZY.company(company.id)}
                className="flex shrink-0 items-center gap-2.5 rounded-[3px] border border-zy-line px-3 py-2 hover:border-zy-primary/45"
              >
                <CompanyMark brand={company.brand} text={company.shortName} id={company.id} />
                <span className="min-w-0">
                  <span className="block truncate text-[13px] text-zy-text">
                    {company.shortName}
                  </span>
                  <span className="block truncate text-[11px] text-zy-faint">
                    成立于 {company.founded}
                  </span>
                </span>
              </Link>
            </div>

            <div className="mt-4 space-y-3 border-t border-zy-line pt-4">
              {project.summary.map((p, i) => (
                <p key={i} className="text-[14px] leading-[1.9] text-zy-text/85">
                  {p}
                </p>
              ))}
            </div>
          </section>

          {/* ── 平台提示：资料正在迁移 ───────────────── */}
          <section className="rounded-[3px] border border-[#d8e6f7] bg-[#f4f8fd] px-5 py-4">
            <div className="flex items-baseline gap-2">
              <span className="flex h-[18px] w-[18px] shrink-0 translate-y-[3px] items-center justify-center rounded-full bg-zy-primary text-[11px] text-white">
                i
              </span>
              <div className="min-w-0">
                <h2 className="text-[14.5px] font-medium text-zy-text">{project.notice.title}</h2>
                <div className="mt-1.5 space-y-1.5">
                  {project.notice.lines.map((l, i) => (
                    <p key={i} className="text-[13px] leading-relaxed text-zy-sub">
                      {l}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── 项目信息 ─────────────────────────────── */}
          <section className="zy-sec">
            <header className="zy-sec-hd">
              <h2 className="zy-sec-title">项目信息</h2>
              <span className="zy-more">部分字段由整编时自动导入</span>
            </header>
            <dl className="grid grid-cols-2 divide-x divide-y divide-zy-line md:grid-cols-4">
              <Cell label="原承担单位" value={project.originalUnit} span muted />
              <Cell label="本公司角色" value={project.role} />
              <Cell label="项目状态" value={project.status} />
              {project.meta.map((m) => (
                <Cell key={m.label} label={m.label} value={m.value} muted={m.muted} />
              ))}
            </dl>
          </section>

          {/* ── 项目成员 ─────────────────────────────── */}
          <section className="zy-sec">
            <header className="zy-sec-hd">
              <h2 className="zy-sec-title">项目成员</h2>
              <span className="zy-more">{project.members.length} 人</span>
            </header>
            <ul className="divide-y divide-zy-line">
              {project.members.map((m) => (
                <li key={m.name} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 px-4 py-3">
                  {m.personId ? (
                    <Link to={ZY.person(m.personId)} className="zy-link text-[13.5px]">
                      {m.name}
                    </Link>
                  ) : (
                    <span className="text-[13.5px] text-zy-text">{m.name}</span>
                  )}
                  <span className="zy-tag">{m.role}</span>
                  {m.note && <span className="text-[11.5px] text-zy-faint">{m.note}</span>}
                </li>
              ))}
            </ul>
          </section>

          {/* ── 著录来源。第二层的门。 ───────────────── */}
          <section className="zy-sec">
            <header className="zy-sec-hd">
              <h2 className="zy-sec-title">资料来源</h2>
            </header>
            <div className="px-4 py-3">
              <p className="mb-3 text-[12px] text-zy-faint">
                本项目的著录信息由以下来源提供。链接指向站外页面，职引不对站外内容负责。
              </p>
              <ul className="space-y-3">
                {project.sources.map((s) => (
                  <li key={s.to}>
                    <Link to={s.to} className="zy-link text-[13.5px]">
                      {s.label}
                    </Link>
                    <div className="mt-0.5 text-[11.5px] text-zy-faint">
                      {s.note} · {s.domain}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* ── 侧栏 ─────────────────────────────────── */}
        <aside className="hidden w-[19rem] shrink-0 space-y-3 lg:block">
          <section className="zy-sec">
            <header className="zy-sec-hd">
              <h2 className="zy-sec-title">该企业其它项目</h2>
              <Link to={ZY.company(company.id)} className="zy-more">
                全部
              </Link>
            </header>
            <ul className="divide-y divide-zy-line">
              {(company.projects ?? [])
                .filter((p) => p.id !== project.id)
                .map((p) => (
                  <li key={p.id} className="px-4 py-2.5">
                    <div className="truncate text-[12.5px] text-zy-text">{p.name}</div>
                    <div className="mt-0.5 text-[11px] tabular-nums text-zy-faint">{p.period}</div>
                  </li>
                ))}
            </ul>
          </section>

          <section className="zy-sec">
            <header className="zy-sec-hd">
              <h2 className="zy-sec-title">该企业在招</h2>
            </header>
            <div className="px-4 py-3 text-[12.5px] leading-relaxed text-zy-sub">
              {company.shortName}目前有在招职位。资料部相关岗位常年开放。
              <Link to={ZY.company(company.id)} className="zy-link mt-2 block text-[12.5px]">
                查看企业主页 ›
              </Link>
            </div>
          </section>

          <section className="zy-sec">
            <header className="zy-sec-hd">
              <h2 className="zy-sec-title">关于项目沿革</h2>
            </header>
            <div className="space-y-2 px-4 py-3 text-[11.5px] leading-relaxed text-zy-sub">
              <p>项目沿革由企业自主申报，用于展示其业务经历与技术积累。</p>
              <p>
                工程勘察类企业的项目沿革中常见承继项目——业务与资料随改制、合并转移，年份可能早于企业注册时间。
              </p>
              <p className="text-zy-faint">如信息有误，可通过企业主页反馈。</p>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}

function Cell({
  label,
  value,
  muted,
  span,
}: {
  label: string
  value: string
  muted?: boolean
  span?: boolean
}) {
  return (
    <div className={cn('px-4 py-3', span && 'col-span-2')}>
      <dt className="text-[11.5px] text-zy-faint">{label}</dt>
      <dd className={cn('mt-1 text-[13px]', muted ? 'text-zy-sub' : 'text-zy-text')}>
        <FieldValue odd={muted}>{value}</FieldValue>
      </dd>
    </div>
  )
}
