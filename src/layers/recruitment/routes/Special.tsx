import { Link, useParams } from 'react-router-dom'
import { getSpecial } from '../data/specials'
import { getArticle, ARTICLES } from '../data/articles'
import { getJob } from '../data/jobs'
import { getCompany } from '../data/companies'
import { ArticleBody } from '../components/ArticleBody'
import { BarChart, DonutChart, TrendChart } from '../components/home/Charts'
import { JobTile } from '../components/home/JobTile'
import { CompanyMark } from '../components/brand/CompanyMark'
import { ZY } from '@/shared/routes'
import { cn } from '@/shared/lib/cn'

export function Special() {
  const { id = '' } = useParams()
  const special = getSpecial(id)
  const article = special ? getArticle(special.articleSlug) : undefined

  if (!special || !article) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-[15px] text-zy-text">专题不存在或已下线</p>
        <Link to={ZY.home} className="zy-btn mt-6">
          返回首页
        </Link>
      </div>
    )
  }

  const jobs = special.relatedJobs.map(getJob).filter((j): j is NonNullable<typeof j> => Boolean(j))
  const companies = special.companies
    .map(getCompany)
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
  const related = special.relatedArticles
    .map((s) => ARTICLES.find((a) => a.slug === s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))

  return (
    <div>
      {/* ══════════ 主视觉 ══════════ */}
      <div className={cn('relative overflow-hidden bg-gradient-to-br', special.heroTone)}>
        {/* 底纹：细网格 + 两团柔光，避免变成一块纯色矩形 */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="pointer-events-none absolute -left-16 -top-24 h-72 w-72 rounded-full bg-white/12 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-28 right-10 h-80 w-80 rounded-full bg-white/10 blur-2xl" />

        <div className="relative mx-auto max-w-[1200px] px-4 py-9">
          <nav className="mb-5 text-[12px] text-white/65">
            <Link to={ZY.home} className="hover:text-white">
              首页
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-white/80">专题</span>
            <span className="mx-1.5">/</span>
            <span className="text-white">{special.title}</span>
          </nav>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="min-w-0">
              <span className="inline-block rounded-[2px] border border-white/35 px-2 py-0.5 text-[11px] text-white/90">
                {special.kicker}
              </span>
              <h1 className="mt-3 text-[34px] font-semibold leading-tight tracking-tight text-white">
                {special.title}
              </h1>
              <p className="mt-2 text-[15px] text-white/80">{special.subtitle}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-white/70">
                <span>{special.source}</span>
                <span className="text-white/30">|</span>
                <span>发布于 {special.publishedAt}</span>
                <span className="text-white/30">|</span>
                <span>更新于 {special.updatedAt}</span>
                <span className="text-white/30">|</span>
                <span>{special.readCount} 阅读</span>
                <span className="text-white/30">|</span>
                <span>{special.shareCount} 转发</span>
              </div>
            </div>

            {/* 主视觉右侧的信息图缩略 */}
            <div className="w-full max-w-sm shrink-0 rounded-[3px] border border-white/20 bg-white/10 p-4 backdrop-blur-[2px]">
              <div className="mb-2.5 text-[11px] uppercase tracking-wider text-white/60">
                数据速览
              </div>
              <div className="grid grid-cols-2 gap-x-5 gap-y-3">
                {special.stats.slice(0, 4).map((s) => (
                  <div key={s.label}>
                    <div className="text-[11px] text-white/65">{s.label}</div>
                    <div className="mt-0.5 flex items-baseline gap-1">
                      <span className="text-[19px] font-semibold tabular-nums text-white">
                        {s.value}
                      </span>
                      <span className="text-[11px] text-white/65">{s.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 专题内的进程时间轴 */}
          <ol className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/15 pt-4">
            {special.timeline.map((t, i) => (
              <li key={t.date} className="flex items-baseline gap-2 text-[12px]">
                <span
                  className={cn(
                    'rounded-[2px] px-1.5 py-px tabular-nums',
                    i <= 3 ? 'bg-white/20 text-white' : 'border border-white/25 text-white/60',
                  )}
                >
                  {t.date}
                </span>
                <span className={i <= 3 ? 'text-white/85' : 'text-white/55'}>{t.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-4 py-5">
        {/* ══════════ 秋招数据 ══════════ */}
        <section className="zy-sec">
          <header className="zy-sec-hd">
            <h2 className="zy-sec-title">秋招数据</h2>
            <span className="zy-more">数据截至 {special.updatedAt}</span>
          </header>
          <div className="grid grid-cols-2 divide-x divide-y divide-zy-line md:grid-cols-3 lg:grid-cols-6">
            {special.stats.map((s) => (
              <div key={s.label} className="px-4 py-3.5">
                <div className="text-[12px] text-zy-sub">{s.label}</div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-[21px] font-semibold tabular-nums text-zy-text">
                    {s.value}
                  </span>
                  <span className="text-[11px] text-zy-faint">{s.unit}</span>
                </div>
                {s.delta && (
                  <div
                    className={cn(
                      'mt-0.5 text-[11px] tabular-nums',
                      s.up ? 'text-[#c2703a]' : 'text-[#2f8f6b]',
                    )}
                  >
                    同比 {s.delta}
                  </div>
                )}
                {s.note && <div className="mt-0.5 text-[11px] text-zy-faint">{s.note}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* ══════════ 职位增长排行 ══════════ */}
        <section className="zy-sec mt-3">
          <header className="zy-sec-hd">
            <h2 className="zy-sec-title">职位增长排行</h2>
            <span className="zy-more">按岗位类别 · 同比 · 样本 128 万条</span>
          </header>
          <ol>
            {special.jobGrowth.map((g, i) => (
              <li
                key={g.name}
                className="grid grid-cols-[1.5rem_minmax(0,1fr)_5rem] items-center gap-x-3 border-b border-zy-line px-4 py-2.5 last:border-0 sm:grid-cols-[1.5rem_minmax(0,11rem)_minmax(0,1fr)_5.5rem_5rem]"
              >
                <span className={cn('zy-rank', i < 3 && 'zy-rank-top')}>{i + 1}</span>
                <span className="min-w-0 truncate text-[13.5px] text-zy-text">{g.name}</span>
                <span className="hidden min-w-0 items-center gap-2 sm:flex">
                  <span className="h-[5px] min-w-0 flex-1 overflow-hidden rounded-full bg-zy-tag">
                    <span
                      className={cn(
                        'block h-full rounded-full',
                        g.growth >= 0 ? 'bg-zy-primary' : 'bg-[#c2703a]',
                      )}
                      style={{ width: `${Math.max(4, (Math.abs(g.growth) / 55) * 100)}%` }}
                    />
                  </span>
                  <span className="shrink-0 truncate text-[11px] text-zy-faint">{g.note}</span>
                </span>
                <span className="hidden shrink-0 text-right text-[12px] tabular-nums text-zy-sub sm:block">
                  {g.salary}
                </span>
                <span
                  className={cn(
                    'shrink-0 text-right text-[13px] font-medium tabular-nums',
                    g.growth >= 0 ? 'text-zy-salary' : 'text-[#2f8f6b]',
                  )}
                >
                  {g.growth > 0 ? '+' : ''}
                  {g.growth.toFixed(1)}%
                </span>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-3 flex gap-3">
          {/* ══════════ 正文 ══════════ */}
          <article className="zy-sec min-w-0 flex-1">
            <header className="border-b border-zy-line px-6 py-5">
              <h2 className="text-[24px] font-semibold leading-snug text-zy-text">
                {article.title}
              </h2>
              <p className="mt-2.5 border-l-[3px] border-zy-line pl-3 text-[14px] leading-relaxed text-zy-sub">
                {article.deck}
              </p>
              <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-zy-faint">
                <span>{article.author}</span>
                <span className="text-zy-line">|</span>
                <span>{article.publishedAt}</span>
                <span className="text-zy-line">|</span>
                <span>{article.readCount} 阅读</span>
                <span className="ml-auto flex gap-1.5">
                  {article.tags.map((t) => (
                    <span key={t} className="zy-tag">
                      {t}
                    </span>
                  ))}
                </span>
              </div>
            </header>

            <div className="px-6 py-5">
              <ArticleBody
                body={article.body}
                charts={{
                  bar: <BarChart data={special.bars} />,
                  trend: <TrendChart data={special.trend} />,
                  donut: <DonutChart data={special.donut} />,
                }}
              />
            </div>

            <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-zy-line px-6 py-4 text-[12px] text-zy-faint">
              <span>本文由 {special.source} 发布，转载请注明出处。</span>
              <span className="flex gap-2">
                <button className="zy-btn-ghost !px-3 !py-1 text-[12px]">收藏</button>
                <button className="zy-btn-ghost !px-3 !py-1 text-[12px]">分享</button>
              </span>
            </footer>
          </article>

          {/* ══════════ 侧栏 ══════════ */}
          <aside className="hidden w-[19rem] shrink-0 space-y-3 lg:block">
            <section className="zy-sec">
              <header className="zy-sec-hd">
                <h2 className="zy-sec-title">相关阅读</h2>
              </header>
              <ul className="divide-y divide-zy-line">
                {related.map((a) => (
                  <li key={a.slug}>
                    <Link to={ZY.article(a.slug)} className="block px-4 py-3 hover:bg-[#fafbfd]">
                      <div className="flex gap-3">
                        <span
                          className={cn(
                            'h-[46px] w-[62px] shrink-0 rounded-[2px] bg-gradient-to-br',
                            a.coverTone,
                          )}
                        />
                        <span className="min-w-0 flex-1">
                          <span className="line-clamp-2 block text-[13px] leading-snug text-zy-text hover:text-zy-primary">
                            {a.title}
                          </span>
                          <span className="mt-1 block text-[11px] text-zy-faint">
                            {a.publishedAt} · {a.readCount} 阅读
                          </span>
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="zy-sec">
              <header className="zy-sec-hd">
                <h2 className="zy-sec-title">参与企业</h2>
                <Link to={ZY.companies} className="zy-more">
                  全部
                </Link>
              </header>
              <ul className="divide-y divide-zy-line">
                {companies.map((c) => (
                  <li key={c.id}>
                    <Link
                      to={ZY.company(c.id)}
                      className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-[#fafbfd]"
                    >
                      <CompanyMark brand={c.brand} text={c.shortName} id={c.id} size="sm" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[12.5px] text-zy-text">
                          {c.shortName}
                        </span>
                        <span className="block truncate text-[11px] text-zy-faint">
                          {c.industry.split(' / ')[0]} · {c.city}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="zy-sec">
              <header className="zy-sec-hd">
                <h2 className="zy-sec-title">数据说明</h2>
              </header>
              <div className="space-y-2 px-4 py-3 text-[11.5px] leading-relaxed text-zy-sub">
                <p>样本为平台在架职位，剔除重复发布与已关闭职位。</p>
                <p>行业归并依据《国民经济行业分类》，与企业自报行业可能不一致。</p>
                <p>薪资为职位标注的区间下限的算术平均，不含年终奖与提成。</p>
                <p className="text-zy-faint">口径变更记录见研究中心公告。</p>
              </div>
            </section>
          </aside>
        </div>

        {/* ══════════ 相关职位 ══════════ */}
        <section className="zy-sec mt-3">
          <header className="zy-sec-hd">
            <h2 className="zy-sec-title">相关职位</h2>
            <span className="hidden items-center gap-3 text-[12.5px] text-zy-sub sm:flex">
              <span className="text-zy-text">全部</span>
              <span>知识管理</span>
              <span>技术文档</span>
              <span>工程资料</span>
              <span>校招</span>
            </span>
            <Link to={ZY.jobs} className="zy-more">
              查看更多
            </Link>
          </header>
          <div className="grid gap-2.5 p-4 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((j) => (
              <JobTile key={j.id} job={j} />
            ))}
          </div>
          <p className="border-t border-zy-line px-4 py-2.5 text-[11.5px] text-zy-faint">
            相关职位由系统按文中提及的岗位类别自动匹配，与用人单位是否参与本专题无关。
          </p>
        </section>

        {/* ══════════ 底部相关阅读（宽屏之外的兜底） ══════════ */}
        <section className="zy-sec mt-3 lg:hidden">
          <header className="zy-sec-hd">
            <h2 className="zy-sec-title">相关阅读</h2>
          </header>
          <ul className="divide-y divide-zy-line">
            {related.map((a) => (
              <li key={a.slug}>
                <Link to={ZY.article(a.slug)} className="block px-4 py-3">
                  <div className="text-[13.5px] text-zy-text">{a.title}</div>
                  <div className="mt-1 text-[11.5px] text-zy-faint">
                    {a.publishedAt} · {a.source}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
