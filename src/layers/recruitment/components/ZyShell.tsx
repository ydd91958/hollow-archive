import { useState, type FormEvent } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useLayerTheme } from '@/shared/lib/useLayerTheme'
import { ZY, DOMAINS } from '@/shared/routes'
import { cn } from '@/shared/lib/cn'
import { CITY_GROUPS, FOOTER_NAV, FRIEND_LINKS, HOT_SEARCHES } from '../data/homepage'

const NAV = [
  { to: ZY.jobs, label: '找工作', match: '/jobs' },
  { to: '/companies', label: '找公司', match: '/compan' },
  { to: '/news', label: '职场资讯', match: '/news' },
  { to: '/resume', label: '我的简历', match: '/resume' },
]

const SUB_NAV = ['校园招聘', '兼职/实习', '国企专区', '海外岗位', '薪资查询', '简历模板', '企业黄页']

export function ZyShell() {
  useLayerTheme('zy', 'zy', '职引 - 找工作，就上职引')
  const navigate = useNavigate()
  const location = useLocation()
  const [q, setQ] = useState('')
  const [city, setCity] = useState('北京')
  const [cityOpen, setCityOpen] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    navigate(q.trim() ? `${ZY.jobs}?q=${encodeURIComponent(q.trim())}` : ZY.jobs)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* ── 顶栏：城市 / 提示 / 账号入口 ─────────────── */}
      <div className="border-b border-zy-line bg-white text-[12px] text-zy-sub">
        <div className="mx-auto flex h-8 max-w-[1200px] items-center gap-4 px-4">
          <div className="relative">
            <button
              className="flex items-center gap-1 hover:text-zy-primary"
              onClick={() => setCityOpen((v) => !v)}
            >
              当前城市：<span className="text-zy-text">{city}</span>
              <span className="text-[9px] text-zy-faint">▼</span>
            </button>
            {cityOpen && (
              <div className="absolute left-0 top-8 z-30 w-[34rem] rounded-[3px] border border-zy-line bg-white p-3 shadow-lg">
                {CITY_GROUPS.map((g) => (
                  <div key={g.label} className="flex gap-3 border-b border-zy-line py-1.5 last:border-0">
                    <span className="w-10 shrink-0 pt-px text-[11px] text-zy-faint">{g.label}</span>
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      {g.cities.map((c) => (
                        <button
                          key={`${g.label}-${c}`}
                          className={cn(
                            'text-[12.5px] hover:text-zy-primary',
                            c === city ? 'text-zy-primary' : 'text-zy-sub',
                          )}
                          onClick={() => {
                            setCity(c)
                            setCityOpen(false)
                          }}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <span className="hidden text-zy-faint md:inline">
            本站不向求职者收取任何费用
          </span>

          <div className="ml-auto flex items-center gap-3">
            <button className="hover:text-zy-primary">下载 APP</button>
            <span className="text-zy-line">|</span>
            <button className="hover:text-zy-primary">企业版</button>
            <span className="text-zy-line">|</span>
            <button className="hover:text-zy-primary">帮助中心</button>
          </div>
        </div>
      </div>

      {/* ── 主导航 ─────────────────────────────────── */}
      <header className="border-b border-zy-line bg-white">
        <div className="mx-auto flex max-w-[1200px] items-center gap-6 px-4 py-3">
          <Link to={ZY.home} className="flex shrink-0 items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-[3px] bg-zy-primary text-[15px] font-bold text-white">
              职
            </span>
            <span className="text-[19px] font-semibold tracking-tight text-zy-text">职引</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={cn(
                  'rounded-[3px] px-3 py-1.5 text-[14px] transition-colors',
                  location.pathname.startsWith(n.match)
                    ? 'font-medium text-zy-primary'
                    : 'text-zy-sub hover:text-zy-text',
                )}
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <form onSubmit={submit} className="ml-auto hidden min-w-0 max-w-md flex-1 lg:block">
            <div className="flex">
              <input
                className="zy-input rounded-r-none"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="搜索职位、公司"
                aria-label="搜索"
              />
              <button className="zy-btn shrink-0 rounded-l-none" type="submit">
                搜索
              </button>
            </div>
          </form>

          <div className="ml-auto flex shrink-0 items-center gap-3 lg:ml-0">
            <button className="text-[13.5px] text-zy-sub transition-colors hover:text-zy-primary">
              登录
            </button>
            <button className="zy-btn-ghost !px-3 !py-1 text-[12.5px]">注册</button>
          </div>
        </div>

        {/* 二级导航条 */}
        <div className="border-t border-zy-line bg-[#fafbfc]">
          <div className="mx-auto flex max-w-[1200px] items-center gap-5 overflow-x-auto px-4 py-1.5 text-[12.5px]">
            {SUB_NAV.map((s) => (
              <button
                key={s}
                className="whitespace-nowrap text-zy-sub transition-colors hover:text-zy-primary"
                onClick={() => navigate(`${ZY.jobs}?q=${encodeURIComponent(s)}`)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* ── 页脚 ───────────────────────────────────── */}
      <footer className="mt-10 border-t border-zy-line bg-white">
        <div className="mx-auto max-w-[1200px] px-4 py-7">
          <div className="grid gap-6 text-[13px] sm:grid-cols-2 lg:grid-cols-5">
            {FOOTER_NAV.map((col) => (
              <div key={col.title}>
                <div className="mb-2.5 text-[13.5px] font-medium text-zy-text">{col.title}</div>
                <ul className="space-y-1.5 text-zy-sub">
                  {col.items.map((i) => (
                    <li key={i} className="hover:text-zy-primary">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <div className="mb-2.5 text-[13.5px] font-medium text-zy-text">关注我们</div>
              <div className="flex gap-2">
                {['公众号', '小程序'].map((t) => (
                  <div key={t} className="text-center">
                    <div className="flex h-16 w-16 items-center justify-center border border-zy-line bg-[#f7f8fa] text-[10px] text-zy-faint">
                      二维码
                    </div>
                    <div className="mt-1 text-[11px] text-zy-faint">{t}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-[12px] text-zy-sub">客服 400-611-2280</div>
              <div className="text-[11.5px] text-zy-faint">工作日 9:00-18:00</div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-zy-line pt-4 text-[11.5px] text-zy-faint">
            <span className="text-zy-sub">热门搜索：</span>
            {HOT_SEARCHES.map((w) => (
              <button
                key={w}
                className="transition-colors hover:text-zy-primary"
                onClick={() => navigate(`${ZY.jobs}?q=${encodeURIComponent(w)}`)}
              >
                {w}
              </button>
            ))}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11.5px] text-zy-faint">
            <span className="text-zy-sub">友情链接：</span>
            {FRIEND_LINKS.map((w) => (
              <span key={w} className="cursor-default hover:text-zy-sub">
                {w}
              </span>
            ))}
          </div>

          <div className="mt-4 space-y-1 border-t border-zy-line pt-4 text-[11.5px] leading-relaxed text-zy-faint">
            <div>
              职引招聘 · 北京引擎时代信息技术有限公司 · {DOMAINS.zy} · 人力资源服务许可证
              12010320250417 号
            </div>
            <div>
              增值电信业务经营许可证 京B2-20190228 · 京ICP备 19004417 号-3 · 京公网安备
              11010802001174 号 · 营业执照
            </div>
            <div>
              本站所有招聘信息均由用人单位自主发布，职引不对信息真实性承担责任。请警惕以任何名义收取费用、扣押证件的招聘行为。
            </div>
            <div>违法和不良信息举报：jubao@zhiyin.com · 未成年人保护举报专线 400-611-2280 转 9</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
