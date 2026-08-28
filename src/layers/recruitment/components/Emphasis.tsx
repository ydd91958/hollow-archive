import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/shared/lib/cn'

/**
 * 主线信息的可发现性分级。
 *
 * 玩家不该在五十条职位里盲点。但也不能出现「线索」「异常」这类字样——
 * 那会立刻把招聘网站变成游戏界面。
 *
 * 解法是借用一个真实招聘平台本来就有的功能：**匹配关键词加粗**。
 * 站内所有强调都长成「平台把关键词标出来了」的样子，
 * 玩家只会觉得这几个词比周围重要一点，不会觉得是作者在指路。
 *
 *   L1 也许值得注意     轻微加粗
 *   L2 主线相关         明显加粗 + 更深的字色（hit 变体再加一层浅底）
 *   L3 关键连接点       加粗 + 可点 + hover 下划线
 */

export function KeyTerm({
  level = 2,
  hit,
  to,
  title,
  children,
  className,
}: {
  level?: 1 | 2 | 3
  /** L2 专用：套一层像检索命中一样的浅底。用在最该被记住的那几个词上。 */
  hit?: boolean
  /** 给了 to 就是 L3。 */
  to?: string
  title?: string
  children: ReactNode
  className?: string
}) {
  if (to) {
    return (
      <Link to={to} title={title} className={cn('zy-kw3', className)}>
        {children}
      </Link>
    )
  }

  return (
    <span
      title={title}
      className={cn(level === 1 ? 'zy-kw' : hit ? 'zy-kw2-hit' : 'zy-kw2', className)}
    >
      {children}
    </span>
  )
}

/** 字段值本身就是不对劲的地方：未提交、未著录、资料不完整。 */
export function FieldValue({ children, odd }: { children: ReactNode; odd?: boolean }) {
  return <span className={odd ? 'zy-kw-field' : undefined}>{children}</span>
}
