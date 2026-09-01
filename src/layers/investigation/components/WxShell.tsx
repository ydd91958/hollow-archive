import { Link, NavLink, Outlet } from 'react-router-dom'
import { useLayerTheme } from '@/shared/lib/useLayerTheme'
import { DOMAINS, LG, BBS, WX } from '@/shared/routes'
import { WX_META } from '../data/weather'
import { cn } from '@/shared/lib/cn'

const NAV = [
  { to: WX.home, label: '首页', end: true },
  { to: WX.forecast, label: '预报服务' },
  { to: WX.hourly, label: '实况观测' },
  { to: WX.history, label: '历史资料' },
  { to: WX.stations, label: '气象站网' },
  { to: WX.about, label: '关于本站' },
]

/** 原创的局徽。云 + 风向标，圆环里一圈单位名。不使用任何现实徽章。 */
function Emblem({ size = 46 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="#1a5b9e" />
      <circle cx="32" cy="32" r="26" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity=".55" />
      <path
        d="M20 38 a7 7 0 0 1 1.6 -13.8 a9.5 9.5 0 0 1 18 2.4 a6.5 6.5 0 0 1 -1.4 12.8 Z"
        fill="#ffffff"
        opacity=".92"
      />
      <path d="M32 20 L32 46" stroke="#ffffff" strokeWidth="1.8" opacity=".7" />
      <path d="M32 22 L42 26 L32 30 Z" fill="#e8b21f" />
      <circle cx="32" cy="32" r="30" fill="none" stroke="#12457a" strokeWidth="2" />
    </svg>
  )
}

export function WxShell() {
  useLayerTheme('weather', 'wx', `${WX_META.title} ${WX_META.platform}`)

  return (
    <div className="flex min-h-screen flex-col">
      {/* 政务站顶栏 */}
      <div className="border-b border-wx-line bg-white text-[12px] text-wx-sub">
        <div className="mx-auto flex h-8 max-w-[1180px] items-center gap-4 px-4">
          <span>{WX_META.org}主办</span>
          <span className="ml-auto flex items-center gap-3">
            <button className="hover:text-wx-head">无障碍浏览</button>
            <span className="text-wx-line">|</span>
            <button className="hover:text-wx-head">长者模式</button>
            <span className="text-wx-line">|</span>
            <button className="hover:text-wx-head">繁體</button>
            <span className="text-wx-line">|</span>
            <button className="hover:text-wx-head">设为首页</button>
          </span>
        </div>
      </div>

      {/* 站头 */}
      <header className="bg-gradient-to-b from-[#f7fafd] to-[#eaf1f8]">
        <div className="mx-auto flex max-w-[1180px] items-center gap-4 px-4 py-5">
          <Link to={WX.home} className="flex items-center gap-3">
            <Emblem />
            <span>
              <span className="block text-[24px] font-semibold tracking-tight text-wx-head">
                {WX_META.title}
              </span>
              <span className="block text-[13px] text-wx-sub">{WX_META.platform}</span>
            </span>
          </Link>

          <div className="ml-auto hidden items-end gap-6 text-right md:flex">
            <div>
              <div className="text-[12px] text-wx-faint">气象服务电话</div>
              <div className="text-[19px] font-semibold tabular-nums text-wx-head">
                {WX_META.weatherPhone}
              </div>
            </div>
            <div className="flex">
              <input className="wx-input w-44" placeholder="站内搜索" aria-label="站内搜索" />
              <button className="wx-btn">搜索</button>
            </div>
          </div>
        </div>

        {/* 主导航 */}
        <nav className="bg-wx-head">
          <div className="mx-auto flex max-w-[1180px] px-4">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) =>
                  cn(
                    'px-6 py-2.5 text-[14.5px] text-white/85 transition-colors hover:bg-wx-headDark',
                    isActive && 'bg-wx-headDark font-medium text-white',
                  )
                }
              >
                {n.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-[1180px] flex-1 px-4 py-4">
        <Outlet />
      </main>

      {/* 页脚 */}
      <footer className="mt-6 border-t-[3px] border-wx-head bg-white">
        <div className="mx-auto max-w-[1180px] px-4 py-5">
          <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-wx-line2 pb-3 text-[12.5px] text-wx-sub">
            <span className="text-wx-faint">友情链接：</span>
            <Link to={LG.home} className="wx-link">
              北岭地区工程资料库
            </Link>
            <Link to={BBS.home} className="wx-link">
              北岭生活论坛
            </Link>
            <span className="cursor-default">中国气象数据网</span>
            <span className="cursor-default">省气象局</span>
            <span className="cursor-default">北岭市人民政府</span>
            <span className="cursor-default">北岭市水务局</span>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-2 text-[12px] leading-relaxed text-wx-sub">
            <div>
              <div>主办单位：{WX_META.org}</div>
              <div>地址：{WX_META.address}</div>
              <div>联系电话：{WX_META.tel}</div>
            </div>
            <div>
              <div>{WX_META.icp}</div>
              <div>{WX_META.gov}</div>
              <div>{WX_META.siteId}</div>
            </div>
            <div className="text-wx-faint">
              <div>本站发布的气象信息以最新一次发布为准。</div>
              <div>转载请注明来源：{DOMAINS.wx}</div>
              <div>建议使用 1280×720 以上分辨率浏览</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
