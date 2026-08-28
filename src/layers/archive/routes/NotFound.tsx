import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useSession } from '@/layers/archive/state/useSession'

/** 用系统的口吻报错。玩家乱试 URL 是 ARG 的正常玩法，这里要鼓励而不是惩罚。 */
export function NotFound() {
  const { pathname } = useLocation()
  const pushLog = useSession((s) => s.pushLog)

  useEffect(() => {
    pushLog(`请求路径 ${pathname} · 无响应 · 已记入`, 'error')
  }, [pathname, pushLog])

  return (
    <div className="mx-auto max-w-2xl">
      <div className="panel">
        <div className="panel-head">
          <span>无响应</span>
          <span className="text-rust">404 · 路径未申报</span>
        </div>
        <div className="space-y-3 px-5 py-6">
          <div className="font-mono text-[12.5px] text-dim">请求路径：{pathname}</div>
          <p className="font-doc text-[13px] leading-relaxed text-dim">
            该路径当前没有服务在监听。请求已记入日志。
          </p>
          <p className="font-doc text-[12.5px] leading-relaxed text-faint">
            本系统的路径表由资料技术处维护，最后一次更新于一九八八年。表上有些条目对应的服务已经下线，
            也有些服务在响应，但不在表上。这两类都不会返回本页。
          </p>
          <div className="flex gap-2 pt-2">
            <Link to="/sys" className="tbtn">
              返回主页
            </Link>
            <Link to="/sys/browse" className="tbtn">
              卷宗目录
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
