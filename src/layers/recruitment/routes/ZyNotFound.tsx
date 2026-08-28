import { Link, useLocation } from 'react-router-dom'
import { ZY } from '@/shared/routes'

export function ZyNotFound() {
  const { pathname } = useLocation()

  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <div className="text-4xl font-light text-zy-faint">404</div>
      <h1 className="mt-4 text-base font-medium text-zy-text">页面不存在</h1>
      <p className="mt-2 text-sm text-zy-sub">
        你访问的页面可能已被删除、下线，或链接有误。
      </p>
      <p className="mt-1 text-xs text-zy-faint">{pathname}</p>
      <div className="mt-6 flex justify-center gap-2">
        <Link to={ZY.home} className="zy-btn px-6">
          返回首页
        </Link>
        <Link to={ZY.jobs} className="zy-btn-ghost px-6">
          浏览职位
        </Link>
      </div>
    </div>
  )
}
