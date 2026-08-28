import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/shared/lib/cn'

/**
 * 首页区块外壳。
 * 标题行右侧允许放一排「子标签」——真实门户常用它做同区块内的切换，
 * 这里不做真实切换，只作为静态的信息密度。
 */
export function Section({
  title,
  tabs,
  more,
  moreTo,
  children,
  bodyClassName,
  className,
}: {
  title: string
  tabs?: string[]
  more?: string
  moreTo?: string
  children: ReactNode
  bodyClassName?: string
  className?: string
}) {
  return (
    <section className={cn('zy-sec', className)}>
      <header className="zy-sec-hd">
        <div className="flex min-w-0 items-baseline gap-4">
          <h2 className="zy-sec-title shrink-0">{title}</h2>
          {tabs && tabs.length > 0 && (
            <div className="hidden min-w-0 items-center gap-3 overflow-hidden sm:flex">
              {tabs.map((t, i) => (
                <span
                  key={t}
                  className={cn(
                    'whitespace-nowrap text-[13px]',
                    i === 0 ? 'text-zy-text' : 'text-zy-sub',
                  )}
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
        {more &&
          (moreTo ? (
            <Link to={moreTo} className="zy-more shrink-0">
              {more} ›
            </Link>
          ) : (
            <span className="zy-more shrink-0">{more} ›</span>
          ))}
      </header>
      <div className={cn('p-4', bodyClassName)}>{children}</div>
    </section>
  )
}
