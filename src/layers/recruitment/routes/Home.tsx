import { useMemo, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Section } from '../components/home/Section'
import { JobTile } from '../components/home/JobTile'
import { JobCard } from '../components/JobCard'
import { DenseRow, RankRow } from '../components/home/JobRow'
import { CompanyCard, CompanyRow } from '../components/home/CompanyCard'
import { CampusBanner, StripAd, SubPromos } from '../components/home/PromoBanner'
import { TrendChart } from '../components/home/Charts'
import { COMPANIES } from '../data/companies'
import { freshnessDays, homepageJobs, salaryFloor, visibleJobs } from '../data/jobs'
import { getSpecial } from '../data/specials'
import { ARTICLES } from '../data/articles'
import {
  CATEGORY_NAV,
  HOT_CITIES,
  INDUSTRY_ENTRIES,
  NEWS_COLUMNS,
  PLATFORM_STATS,
  SUGGEST_WORDS,
  TOOLS,
} from '../data/homepage'
import { INDUSTRY_LABEL } from '../types'
import { useActiveSignals } from '@/shared/lib/useSignals'
import { ZY } from '@/shared/routes'
import { cn } from '@/shared/lib/cn'

/** 「热招职位」上方那排 tab。 */
const HOT_TABS = ['技术', '工程', '职能', '数据', '运营', '销售', '产品', '设计', '医疗', '物流']

export function Home() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [hotTab, setHotTab] = useState(HOT_TABS[0])
  const signals = useActiveSignals()

  /*
   * 首页职位池按发布新鲜度排序——真实门户的「最新」就是这么排的。
   * 副作用正好是我们要的：华北水测的水文岗、测绘岗（3 天前）会正常
   * 浮到玩家眼前，让这家公司在剧情之前就先以普通公司的身份存在过；
   * 而「已连续发布 419 天」的核心岗自动沉到最底，不需要靠城市过滤藏它。
   */
  const pool = useMemo(
    () => [...homepageJobs(signals)].sort((a, b) => freshnessDays(a) - freshnessDays(b)),
    [signals],
  )
  const all = visibleJobs(signals)
  const special = getSpecial('campus2026')

  const hotJobs = useMemo(
    () => pool.filter((j) => j.category === hotTab).slice(0, 8),
    [pool, hotTab],
  )
  const highpay = useMemo(
    () => [...pool].sort((a, b) => salaryFloor(b.salary) - salaryFloor(a.salary)).slice(0, 10),
    [pool],
  )
  const recommend = pool.filter((j) => !j.flags?.includes('intern')).slice(0, 18)
  const campus = pool.filter((j) => j.flags?.includes('graduate') || j.flags?.includes('intern'))
  const personalised = all.filter((j) => j.requiresSignal)

  const jobCount = (companyId: string) => all.filter((j) => j.companyId === companyId).length
  /* 不再按城市过滤企业：一个 22 家企业的平台，
     首页系统性排除某个城市本身就不自然。 */
  const companyPool = COMPANIES
  const featured = companyPool.filter((c) => c.verified).slice(0, 12)
  const sideCompanies = [...companyPool].sort((a, b) => jobCount(b.id) - jobCount(a.id)).slice(0, 7)

  const go = (w: string) => navigate(`${ZY.jobs}?q=${encodeURIComponent(w)}`)
  const submit = (e: FormEvent) => {
    e.preventDefault()
    navigate(q.trim() ? `${ZY.jobs}?q=${encodeURIComponent(q.trim())}` : ZY.jobs)
  }

  return (
    <div>
      {/* ══════════════════════════════════════════════════
          首屏彩色带。真实门户的首屏不是白的，白色内容区从这条带子
          下面才开始——这是「不像 SaaS 后台」最关键的一步。
          ══════════════════════════════════════════════════ */}
      <div className="zy-band zy-noise pb-6 pt-5">
        <div className="mx-auto max-w-[1200px] px-4">
          {/* 搜索 */}
          <form onSubmit={submit} className="mx-auto flex max-w-[760px]">
            <span className="hidden shrink-0 items-center gap-1 whitespace-nowrap rounded-l-md border border-r-0 border-zy-line bg-white px-4 text-[14px] text-zy-sub sm:flex">
              职位类型
              <span className="text-[9px] text-zy-faint">▼</span>
            </span>
            <input
              className="zy-input h-[46px] rounded-none border-x-0 text-[15px] sm:border-l-0"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="搜索职位名称、公司名称或关键词"
              aria-label="搜索职位"
            />
            <button
              className="zy-btn h-[46px] shrink-0 rounded-l-none px-11 text-[16px] font-medium"
              type="submit"
            >
              搜索
            </button>
          </form>

          <div className="mx-auto mt-2.5 flex max-w-[760px] flex-wrap items-center gap-2">
            <span className="text-[12.5px] text-zy-sub">热门职位：</span>
            {SUGGEST_WORDS.map((w) => (
              <button key={w} className="zy-chip" onClick={() => go(w)}>
                {w}
              </button>
            ))}
          </div>

          {/* 三栏等高。左栏用 flex-1 + overflow-hidden 卡住高度，
              这样它绝不会比中间的运营位高出一截留下空洞。 */}
          <div className="mt-5 flex items-stretch gap-3">
            {/* 左：职位分类 */}
            <nav className="hidden w-[14rem] shrink-0 flex-col rounded-[4px] border border-zy-line bg-white lg:flex">
              {/* li 用 flex-1 均分高度：条目多少都正好填满整栏，
                  不会像之前那样在底部留下一段空白。 */}
              <ul className="flex min-h-0 flex-1 flex-col overflow-hidden py-1">
                {CATEGORY_NAV.map((c) => (
                  <li key={c.name} className="group relative flex-1">
                    <div className="flex h-full cursor-default items-center gap-2 px-3 text-[13px] hover:bg-brand-50">
                      <span className="w-9 shrink-0 font-medium text-zy-text">{c.name}</span>
                      <span className="min-w-0 flex-1 truncate text-[12px] text-zy-faint">
                        {c.items.slice(0, 3).join(' · ')}
                      </span>
                      <span className="shrink-0 text-[10px] text-zy-faint">›</span>
                    </div>
                    {/* 悬停展开的二级面板 */}
                    <div className="invisible absolute left-full top-0 z-30 ml-px w-72 rounded-[3px] border border-zy-line bg-white p-3 opacity-0 shadow-xl transition-opacity group-hover:visible group-hover:opacity-100">
                      <div className="mb-2 text-[13px] font-medium text-zy-text">{c.name}</div>
                      <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                        {c.items.map((i) => (
                          <button
                            key={i}
                            className="text-[12.5px] text-zy-sub hover:text-zy-primary"
                            onClick={() => go(i)}
                          >
                            {i}
                          </button>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex shrink-0 items-center justify-between border-t border-zy-line px-3 py-1.5 text-[11.5px] text-zy-faint">
                <span>1 / 2</span>
                <span className="flex gap-1">
                  <span className="flex h-[18px] w-[18px] items-center justify-center rounded-[2px] border border-zy-line">
                    ‹
                  </span>
                  <span className="flex h-[18px] w-[18px] items-center justify-center rounded-[2px] border border-zy-line">
                    ›
                  </span>
                </span>
              </div>
            </nav>

            {/* 中：秋招大 banner + 两个副运营位 */}
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              {special && <CampusBanner special={special} />}
              <SubPromos />
            </div>

            {/* 右：账号 + 平台数据 + 研究中心 */}
            <aside className="hidden w-[15.5rem] shrink-0 flex-col gap-2.5 xl:flex">
              <div className="rounded-[4px] border border-zy-line bg-white p-3.5 text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-zy-tag text-[11px] text-zy-faint">
                  未登录
                </div>
                <p className="mt-2 text-[12.5px] text-zy-sub">登录后查看推荐职位与投递进度</p>
                <button className="zy-btn mt-2.5 w-full !py-1.5 text-[13px]">登录 / 注册</button>
              </div>

              <div className="rounded-[4px] border border-zy-line bg-white px-3.5 py-1.5">
                {PLATFORM_STATS.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-baseline justify-between border-b border-dashed border-zy-line py-[7px] last:border-0"
                  >
                    <span className="text-[12px] text-zy-sub">{s.label}</span>
                    <span className="text-[13px] tabular-nums text-zy-text">{s.value}</span>
                  </div>
                ))}
              </div>

              <div className="min-h-0 flex-1 overflow-hidden rounded-[4px] border border-zy-line bg-white px-3.5 py-2.5">
                <div className="mb-1.5 flex items-baseline justify-between">
                  <span className="text-[12.5px] font-medium text-zy-text">研究中心</span>
                  <span className="text-[11px] text-zy-faint">近期发布</span>
                </div>
                <ul className="space-y-[7px]">
                  {ARTICLES.slice(0, 4).map((a) => (
                    <li key={a.slug} className="flex items-baseline gap-1.5">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zy-faint" />
                      <Link
                        to={ZY.article(a.slug)}
                        className="min-w-0 flex-1 truncate text-[12px] text-zy-sub hover:text-zy-primary"
                      >
                        {a.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          {/* 热门城市：贴在彩色带底部，让首屏自然向下延伸 */}
          <div className="mt-3 rounded-lg bg-white/60 px-4 py-3 shadow-[0_1px_2px_rgba(16,24,40,.04)] ring-1 ring-white/60 backdrop-blur-[3px]">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
              <span className="text-[12.5px] font-medium text-zy-text">热门城市</span>
              {HOT_CITIES.map((c) => (
                <button
                  key={c.name}
                  onClick={() => go(c.name)}
                  className="group flex items-baseline gap-1"
                >
                  <span className="text-[13px] text-zy-sub group-hover:text-zy-primary">
                    {c.name}
                  </span>
                  <span className="text-[10.5px] tabular-nums text-zy-faint">
                    {(c.jobs / 10000).toFixed(1)}w
                  </span>
                </button>
              ))}
              <Link to={ZY.jobs} className="ml-auto text-[12px] text-zy-faint hover:text-zy-primary">
                全部城市 ›
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ 白色内容区 ══════════ */}
      <div className="mx-auto max-w-[1200px] px-4 py-6">
        {/* 热招职位：居中大标题 + 横向 tab */}
        <h2 className="zy-h2">热招职位</h2>
        <p className="zy-h2-sub">按职能分类，每日更新</p>
        <div className="mt-5 flex items-center gap-6 overflow-x-auto border-b border-zy-line">
          {HOT_TABS.map((t) => (
            <button
              key={t}
              onClick={() => setHotTab(t)}
              className={cn('zy-tab', t === hotTab && 'zy-tab-on')}
            >
              {t}
            </button>
          ))}
          <Link to={ZY.jobs} className="ml-auto shrink-0 pb-2 text-[12.5px] text-zy-faint hover:text-zy-primary">
            全部 ›
          </Link>
        </div>
        <div className="mt-3.5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {hotJobs.map((j) => (
            <JobTile key={j.id} job={j} />
          ))}
        </div>

        <div className="mt-5">
          <StripAd />
        </div>

        {/* 主体两栏 */}
        <div className="mt-5 flex gap-3">
          <div className="min-w-0 flex-1 space-y-3">
            {personalised.length > 0 && (
              <Section
                title="你可能感兴趣的职位"
                tabs={['根据你的浏览记录']}
                bodyClassName="p-3.5"
              >
                {/* 单独成行。之前它和另外五格挤在网格里，
                    玩家触发了也看不见——那是被浪费掉的回报。 */}
                <div className="space-y-2.5">
                  {personalised.map((j) => (
                    <JobCard key={j.id} job={j} />
                  ))}
                </div>
                <div className="mt-2.5 grid gap-2.5 sm:grid-cols-3">
                  {pool.slice(0, 3).map((j) => (
                    <JobTile key={j.id} job={j} />
                  ))}
                </div>
              </Section>
            )}

            <Section
              title="推荐职位"
              tabs={['最新', '最热', '离我最近']}
              more="查看全部"
              moreTo={ZY.jobs}
              bodyClassName="p-0"
            >
              {recommend.map((j) => (
                <DenseRow key={j.id} job={j} />
              ))}
              <div className="border-t border-zy-line px-4 py-2.5 text-center text-[12.5px]">
                <Link to={ZY.jobs} className="zy-link">
                  查看全部 {all.length} 个职位 ›
                </Link>
              </div>
            </Section>

            {campus.length > 0 && (
              <section className="overflow-hidden rounded-[4px] border border-[#cfe0f4] bg-gradient-to-b from-[#eaf2fc] to-[#f6f9fd]">
                <header className="flex items-center justify-between border-b border-[#cfe0f4] px-4 py-2.5">
                  <div className="flex items-baseline gap-3">
                    <h2 className="text-[16px] font-semibold text-zy-text">应届生 · 实习专区</h2>
                    <span className="text-[12px] text-zy-sub">2026 届秋招进行中</span>
                  </div>
                  {special && (
                    <Link to={ZY.special(special.id)} className="zy-more">
                      秋招专题 ›
                    </Link>
                  )}
                </header>
                <div className="grid gap-2.5 p-3.5 sm:grid-cols-2 lg:grid-cols-3">
                  {campus.map((j) => (
                    <JobTile key={j.id} job={j} />
                  ))}
                </div>
              </section>
            )}

            <Section
              title="名企推荐"
              tabs={['已认证企业']}
              more="全部企业"
              moreTo={ZY.companies}
              bodyClassName="grid gap-2.5 p-3.5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {featured.map((c) => (
                <CompanyCard key={c.id} company={c} jobCount={jobCount(c.id)} />
              ))}
            </Section>
          </div>

          {/* 右侧栏 */}
          <aside className="hidden w-[19rem] shrink-0 space-y-3 lg:block">
            <Section title="高薪职位榜" tabs={['本周']} bodyClassName="px-4 py-1">
              {highpay.map((j, i) => (
                <RankRow key={j.id} job={j} index={i} />
              ))}
            </Section>

            {special && (
              <Section title="资料类岗位在架天数" bodyClassName="px-3 py-3">
                <TrendChart data={special.trend} />
                <Link
                  to={ZY.special(special.id)}
                  className="mt-1 block text-center text-[12px] text-zy-faint hover:text-zy-primary"
                >
                  数据来自 2026 秋招观察 ›
                </Link>
              </Section>
            )}

            <Section title="热门企业" more="更多" moreTo={ZY.companies} bodyClassName="px-4 py-1">
              {sideCompanies.map((c) => (
                <CompanyRow key={c.id} company={c} jobCount={jobCount(c.id)} />
              ))}
            </Section>

            <Section title="求职工具" bodyClassName="grid grid-cols-2 gap-2 p-2.5">
              {TOOLS.map((t) => (
                <div
                  key={t.name}
                  className="zy-flat flex cursor-default items-center gap-2 px-2 py-2 transition-colors hover:bg-brand-50"
                >
                  <span
                    className={cn(
                      'flex h-7 w-7 shrink-0 items-center justify-center rounded-[3px] text-[12px]',
                      t.tone,
                    )}
                  >
                    {t.glyph}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[12.5px] text-zy-text">{t.name}</span>
                    <span className="block truncate text-[10.5px] text-zy-faint">{t.desc}</span>
                  </span>
                </div>
              ))}
            </Section>
          </aside>
        </div>

        {/* 热门行业：整块彩色网格，和上面的白卡片拉开差别 */}
        <h2 className="zy-h2 mt-10">热门行业</h2>
        <p className="zy-h2-sub">共 16 个行业 · 数据每周更新</p>
        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-8">
          {INDUSTRY_ENTRIES.map((e, i) => (
            <button
              key={e.key}
              onClick={() => go(INDUSTRY_LABEL[e.key])}
              className={cn(
                'group rounded-lg px-3.5 py-3 text-left ring-1 ring-inset transition-all duration-150 ease-soft hover:-translate-y-px',
                i % 4 === 0 && 'bg-brand-50 ring-brand-100 hover:bg-brand-100',
                i % 4 === 1 && 'bg-hot-50 ring-hot-100 hover:bg-hot-100',
                i % 4 === 2 && 'bg-stable-50 ring-stable-100 hover:bg-stable-100',
                i % 4 === 3 && 'bg-ai-50 ring-ai-100 hover:bg-ai-100',
              )}
            >
              <div className="text-[14px] font-medium tracking-tight text-zy-text">
                {INDUSTRY_LABEL[e.key]}
              </div>
              <div className="mt-1.5 text-[11.5px] tabular-nums text-zy-sub">
                {(e.jobs / 10000).toFixed(1)} 万职位
              </div>
              <div className="text-[11px] tabular-nums text-zy-faint">
                {e.companies.toLocaleString()} 家企业
              </div>
            </button>
          ))}
        </div>

        {/* 职场资讯 */}
        <h2 className="zy-h2 mt-10">职场资讯</h2>
        <p className="zy-h2-sub">职引研究中心 · 每周三更新</p>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {NEWS_COLUMNS.map((col) => {
            const lead = col.items[0].slug
              ? ARTICLES.find((a) => a.slug === col.items[0].slug)
              : undefined
            return (
              <Section
                key={col.title}
                title={col.title}
                more={col.more}
                className="min-w-0"
                bodyClassName="p-0"
              >
                {lead ? (
                  <Link
                    to={ZY.article(lead.slug)}
                    className="group block border-b border-zy-line p-3.5 hover:bg-[#fafbfd]"
                  >
                    <span
                      className={cn(
                        'mb-2 flex h-[96px] items-end rounded-[3px] bg-gradient-to-br p-2',
                        lead.coverTone,
                      )}
                    >
                      <span className="rounded-[2px] bg-black/20 px-1.5 py-px text-[10px] text-white/90">
                        {lead.coverLabel}
                      </span>
                    </span>
                    <span className="line-clamp-2 block text-[13.5px] leading-snug text-zy-text group-hover:text-zy-primary">
                      {lead.title}
                    </span>
                    <span className="mt-1 block text-[11px] text-zy-faint">
                      {lead.source} · {lead.publishedAt}
                    </span>
                  </Link>
                ) : (
                  <div className="border-b border-zy-line p-3.5">
                    <span
                      className={cn(
                        'mb-2 block h-[96px] rounded-[3px] bg-gradient-to-br',
                        col.leadTone ?? 'from-[#8a93a3] to-[#b5bdc9]',
                      )}
                    />
                    <span className="line-clamp-2 block cursor-default text-[13.5px] leading-snug text-zy-text">
                      {col.items[0].title}
                    </span>
                    <span className="mt-1 block text-[11px] text-zy-faint">
                      职引研究中心 · {col.items[0].meta}
                    </span>
                  </div>
                )}

                <ul className="space-y-1.5 px-3.5 py-2.5">
                  {col.items.slice(1).map((n) => (
                    <li key={n.title} className="flex items-baseline gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zy-faint" />
                      {n.slug ? (
                        <Link
                          to={ZY.article(n.slug)}
                          className="min-w-0 flex-1 truncate text-[12.5px] text-zy-sub hover:text-zy-primary"
                        >
                          {n.title}
                        </Link>
                      ) : (
                        <span className="min-w-0 flex-1 cursor-default truncate text-[12.5px] text-zy-sub hover:text-zy-primary">
                          {n.title}
                        </span>
                      )}
                      {n.hot && <span className="zy-tag-orange shrink-0">热</span>}
                      <span className="shrink-0 text-[11px] text-zy-faint">{n.meta}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            )
          })}
        </div>

        <div className="mt-6 rounded-[4px] border border-zy-line bg-white px-4 py-3 text-[11.5px] leading-relaxed text-zy-faint">
          职引依据用人单位提供的信息展示职位，招聘信息的真实性、合法性由发布方负责。平台已对企业营业执照进行形式审核，但不对其经营状况作出保证。求职过程中如遇要求缴纳费用、扣押证件、异地面试等情况，请立即停止并向平台举报。
        </div>
      </div>
    </div>
  )
}
