import type { ReactNode } from 'react'
import type { Para } from '../data/articles'
import { renderInline } from '../lib/inlineMark'
import { getJob } from '../data/jobs'
import { JobTile } from './home/JobTile'
import { cn } from '@/shared/lib/cn'

/**
 * 文章正文渲染器。
 * 专题页与文章页共用。图表由调用方通过 charts 注入——
 * 正文数据里只写"这里放哪张图"，不关心图怎么画。
 */
export function ArticleBody({
  body,
  charts,
}: {
  body: Para[]
  charts?: Partial<Record<'bar' | 'trend' | 'donut', ReactNode>>
}) {
  return (
    <div className="space-y-4">
      {body.map((p, i) => {
        switch (p.kind) {
          case 'h':
            return (
              <h3 key={i} className="pt-3 text-[16px] font-medium text-zy-text">
                {p.text}
              </h3>
            )

          case 'p':
            return (
              <p key={i} className="text-[14.5px] leading-[1.95] text-zy-text/85">
                {renderInline(p.text)}
              </p>
            )

          case 'list':
            return (
              <ol key={i} className="space-y-2 rounded-[3px] bg-[#f7f9fc] px-4 py-3">
                {p.items.map((it, n) => (
                  <li key={n} className="flex gap-2.5 text-[14px] leading-[1.9] text-zy-text/85">
                    <span className="shrink-0 text-zy-faint">
                      {p.ordered ? `${n + 1}.` : '·'}
                    </span>
                    <span>{renderInline(it)}</span>
                  </li>
                ))}
              </ol>
            )

          case 'quote':
            return (
              <blockquote
                key={i}
                className="border-l-[3px] border-zy-primary bg-[#f6f9fd] px-4 py-3"
              >
                <p className="text-[14.5px] leading-[1.9] text-zy-text/90">
                  「{renderInline(p.text)}」
                </p>
                <footer className="mt-1.5 text-[12px] text-zy-faint">—— {p.by}</footer>
              </blockquote>
            )

          case 'figure':
            return (
              <figure key={i} className="rounded-[3px] border border-zy-line bg-white p-4">
                {charts?.[p.chart] ?? (
                  <div className="flex h-32 items-center justify-center text-[12px] text-zy-faint">
                    图表加载中…
                  </div>
                )}
                <figcaption className="mt-3 border-t border-dashed border-zy-line pt-2 text-[12px] text-zy-faint">
                  {p.caption}
                </figcaption>
              </figure>
            )

          case 'photo':
            return (
              <figure key={i}>
                <div
                  className={cn(
                    'flex h-52 items-center justify-center rounded-[3px] bg-gradient-to-br',
                    p.tone,
                  )}
                >
                  <span className="rounded-[2px] bg-black/20 px-2 py-1 text-[11px] text-white/85">
                    图片
                  </span>
                </div>
                <figcaption className="mt-2 text-[12px] text-zy-faint">{p.caption}</figcaption>
              </figure>
            )

          case 'joblist': {
            const jobs = p.ids.map(getJob).filter((j): j is NonNullable<typeof j> => Boolean(j))
            if (jobs.length === 0) return null
            return (
              <section key={i} className="rounded-lg bg-[#f5f8fc] p-4">
                <div className="mb-3 flex items-baseline justify-between gap-3">
                  <h4 className="text-[14px] font-medium text-zy-text">{p.title}</h4>
                  <span className="text-[11.5px] text-zy-faint">{jobs.length} 个在招</span>
                </div>
                <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                  {jobs.map((j) => (
                    <JobTile key={j.id} job={j} />
                  ))}
                </div>
                {p.note && <p className="mt-3 text-[11.5px] text-zy-faint">{p.note}</p>}
              </section>
            )
          }

          case 'note':
            return (
              <p
                key={i}
                className="rounded-[3px] border border-dashed border-zy-line bg-[#fafbfc] px-4 py-2.5 text-[12.5px] leading-relaxed text-zy-sub"
              >
                {renderInline(p.text)}
              </p>
            )
        }
      })}
    </div>
  )
}
