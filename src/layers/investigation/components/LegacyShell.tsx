import { Link, Outlet } from 'react-router-dom'
import { useLayerTheme } from '@/shared/lib/useLayerTheme'
import { LG, DOMAINS } from '@/shared/routes'
import { SITE_META } from '../data/projects'

/**
 * 二〇〇三年前后的事业单位站点：表格布局、细边框、宋体小字、访问计数器。
 * 它最后一次更新是 2009 年——这一点要写在页面上，玩家才会明白
 * 「这个站没人管了」，而它却还在正常响应。
 */
export function LegacyShell() {
  useLayerTheme('legacy', 'lg', '北岭地区工程资料库')

  return (
    <div className="mx-auto flex min-h-screen max-w-[900px] flex-col bg-white">
      <header>
        <div className="border-b-2 border-[#8a9bb0] bg-gradient-to-b from-[#e8eef5] to-[#c8d6e5] px-4 py-3">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-[22px] font-bold tracking-wide text-[#1b3a5c]">
                {SITE_META.title}
              </h1>
              <div className="mt-0.5 text-[11px] text-[#4a6076]">{SITE_META.org}</div>
            </div>
            <div className="text-right text-[11px] text-[#4a6076]">
              <div>{DOMAINS.lg}</div>
              <div>最后更新：{SITE_META.lastUpdate}</div>
            </div>
          </div>
        </div>

        <table className="w-full border-collapse bg-[#dfe6ef] text-[12px]">
          <tbody>
            <tr>
              <td className="border-b border-[#8a9bb0] px-2 py-1">
                <Link to={LG.home} className="lg-link mr-3">
                  首页
                </Link>
                <Link to={LG.home} className="lg-link mr-3">
                  项目索引
                </Link>
                <span className="mr-3 text-[#666]">单位名录</span>
                <span className="mr-3 text-[#666]">标准规范</span>
                <span className="mr-3 text-[#666]">资料征集</span>
                <span className="text-[#666]">联系我们</span>
              </td>
            </tr>
          </tbody>
        </table>
      </header>

      <main className="flex-1 px-4 py-4">
        <Outlet />
      </main>

      <footer className="mt-6 border-t border-[#8a9bb0] px-4 py-4 text-[11px] leading-relaxed text-[#555]">
        <div className="mb-2">
          友情链接：
          {SITE_META.links.map((l, i) => (
            <span key={l.href}>
              {i > 0 && ' | '}
              <Link to={l.href} className="lg-link">
                {l.label}
              </Link>
            </span>
          ))}
        </div>
        <div>{SITE_META.notice}</div>
        <div className="mt-2">
          版权所有 © 2003-2009 {SITE_META.org} · 本站最佳浏览分辨率 1024×768
        </div>
        <div className="mt-1">
          您是本站第 <span className="font-bold text-[#cc0000]">{SITE_META.visits}</span> 位访问者
        </div>
      </footer>
    </div>
  )
}
