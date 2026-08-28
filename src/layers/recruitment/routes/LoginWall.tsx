import { Link } from 'react-router-dom'
import { ZY } from '@/shared/routes'

/** 招聘站上到处都是这种「登录后可用」的页面。它们必须存在，否则导航栏是假的。 */
export function LoginWall({ title }: { title: string }) {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="text-base font-medium text-zy-text">{title}</h1>
      <p className="mt-3 text-sm text-zy-sub">登录后可使用该功能。</p>
      <div className="mt-6 flex justify-center gap-2">
        <button className="zy-btn px-8">登录</button>
        <button className="zy-btn-ghost px-8">注册</button>
      </div>
      <p className="mt-8 text-xs text-zy-faint">
        暂不登录？
        <Link to={ZY.jobs} className="zy-link ml-1">
          先去看看职位
        </Link>
      </p>
    </div>
  )
}
