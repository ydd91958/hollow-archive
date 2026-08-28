import { Link, Outlet } from 'react-router-dom'
import { useLayerTheme } from '@/shared/lib/useLayerTheme'
import { BBS, DOMAINS } from '@/shared/routes'
import { BOARDS } from '../data/forum'

export function BbsShell() {
  useLayerTheme('bbs', 'bbs', '北岭生活论坛')

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b-2 border-bbs-head bg-white">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-3">
          <Link to={BBS.home} className="flex items-baseline gap-2">
            <span className="text-[20px] font-bold text-bbs-head">北岭生活论坛</span>
            <span className="text-xs text-zy-faint">{DOMAINS.bbs}</span>
          </Link>
          <div className="ml-auto flex items-center gap-3 text-xs text-zy-sub">
            <span>您尚未登录</span>
            <button className="bbs-link">登录</button>
            <span className="text-zy-faint">|</span>
            <button className="bbs-link">注册</button>
          </div>
        </div>

        <nav className="bg-bbs-head">
          <div className="mx-auto flex max-w-5xl items-center gap-1 px-2">
            <Link to={BBS.home} className="px-3 py-2 text-[13px] text-white hover:bg-black/10">
              首页
            </Link>
            {BOARDS.map((b) => (
              <Link
                key={b.id}
                to={BBS.board(b.id)}
                className="px-3 py-2 text-[13px] text-white/90 hover:bg-black/10"
              >
                {b.name}
              </Link>
            ))}
            <div className="ml-auto py-1.5 pr-2">
              <input
                className="w-40 rounded-sm border border-white/30 bg-white/95 px-2 py-1 text-xs outline-none"
                placeholder="搜索帖子"
                aria-label="搜索帖子"
              />
            </div>
          </div>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-4">
        <Outlet />
      </main>

      <footer className="mt-8 border-t border-bbs-line bg-white">
        <div className="mx-auto max-w-5xl space-y-1 px-4 py-6 text-xs leading-relaxed text-zy-faint">
          <div>北岭生活论坛 · 本站言论仅代表发帖者个人观点，与本站立场无关</div>
          <div>违法和不良信息举报电话：0311-8****217 · 举报邮箱：jubao@beiling.net</div>
          <div>冀ICP备 09008812 号 · 程序版本 3.4.7 · 当前在线 217 人</div>
        </div>
      </footer>
    </div>
  )
}
