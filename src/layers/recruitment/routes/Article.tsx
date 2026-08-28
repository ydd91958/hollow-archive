import { Link, useParams } from 'react-router-dom'
import { ARTICLES, getArticle } from '../data/articles'
import { getJob } from '../data/jobs'
import { ArticleBody } from '../components/ArticleBody'
import { JobTile } from '../components/home/JobTile'
import { NEWS_COLUMNS } from '../data/homepage'
import { ZY } from '@/shared/routes'
import { cn } from '@/shared/lib/cn'

export function Article() {
  const { slug = '' } = useParams()
  const article = getArticle(slug)

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-[15px] text-zy-text">文章不存在或已下线</p>
        <Link to={ZY.home} className="zy-btn mt-6">
          返回首页
        </Link>
      </div>
    )
  }

  const related = (article.relatedArticles ?? [])
    .map((s) => ARTICLES.find((a) => a.slug === s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))
  const jobs = (article.relatedJobs ?? [])
    .map(getJob)
    .filter((j): j is NonNullable<typeof j> => Boolean(j))

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-4">
      <nav className="mb-3 text-[12px] text-zy-faint">
        <Link to={ZY.home} className="hover:text-zy-primary">
          首页
        </Link>
        <span className="mx-1.5">/</span>
        <span>职场资讯</span>
        <span className="mx-1.5">/</span>
        <span className="text-zy-sub">{article.source}</span>
      </nav>

      <div className="flex gap-3">
        <article className="zy-sec min-w-0 flex-1">
          {/* 文章头图 */}
          <div
            className={cn(
              'relative flex h-[180px] items-end overflow-hidden bg-gradient-to-br px-6 py-5',
              article.coverTone,
            )}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.14]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            <span className="relative rounded-[2px] border border-white/35 px-2 py-0.5 text-[11px] text-white/90">
              {article.coverLabel}
            </span>
          </div>

          <header className="border-b border-zy-line px-6 py-5">
            <h1 className="text-[25px] font-semibold leading-snug text-zy-text">{article.title}</h1>
            <p className="mt-2.5 border-l-[3px] border-zy-line pl-3 text-[14px] leading-relaxed text-zy-sub">
              {article.deck}
            </p>
            <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-zy-faint">
              <span className="text-zy-sub">{article.source}</span>
              <span className="text-zy-line">|</span>
              <span>{article.author}</span>
              <span className="text-zy-line">|</span>
              <span>{article.publishedAt}</span>
              <span className="text-zy-line">|</span>
              <span>{article.readCount} 阅读</span>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {article.tags.map((t) => (
                <span key={t} className="zy-tag">
                  {t}
                </span>
              ))}
            </div>
          </header>

          <div className="px-6 py-5">
            <ArticleBody body={article.body} />
          </div>

          {jobs.length > 0 && (
            <section className="border-t border-zy-line px-6 py-5">
              <h2 className="mb-3 text-[15px] font-medium text-zy-text">文中提到的岗位类别</h2>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {jobs.map((j) => (
                  <JobTile key={j.id} job={j} />
                ))}
              </div>
            </section>
          )}

          <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-zy-line px-6 py-4 text-[12px] text-zy-faint">
            <span>本文由 {article.source} 发布，转载请注明出处。</span>
            <span className="flex gap-2">
              <button className="zy-btn-ghost !px-3 !py-1 text-[12px]">收藏</button>
              <button className="zy-btn-ghost !px-3 !py-1 text-[12px]">分享</button>
            </span>
          </footer>
        </article>

        <aside className="hidden w-[19rem] shrink-0 space-y-3 lg:block">
          {related.length > 0 && (
            <section className="zy-sec">
              <header className="zy-sec-hd">
                <h2 className="zy-sec-title">相关阅读</h2>
              </header>
              <ul className="divide-y divide-zy-line">
                {related.map((a) => (
                  <li key={a.slug}>
                    <Link to={ZY.article(a.slug)} className="block px-4 py-3 hover:bg-[#fafbfd]">
                      <div className="flex gap-3">
                        <span
                          className={cn(
                            'h-[46px] w-[62px] shrink-0 rounded-[2px] bg-gradient-to-br',
                            a.coverTone,
                          )}
                        />
                        <span className="min-w-0 flex-1">
                          <span className="line-clamp-2 block text-[13px] leading-snug text-zy-text hover:text-zy-primary">
                            {a.title}
                          </span>
                          <span className="mt-1 block text-[11px] text-zy-faint">
                            {a.publishedAt}
                          </span>
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="zy-sec">
            <header className="zy-sec-hd">
              <h2 className="zy-sec-title">研究中心热文</h2>
            </header>
            <ul className="space-y-1.5 px-4 py-3">
              {NEWS_COLUMNS[1].items.map((n, i) => (
                <li key={n.title} className="flex items-baseline gap-2">
                  <span className={cn('zy-rank', i < 3 && 'zy-rank-top')}>{i + 1}</span>
                  <span className="min-w-0 flex-1 cursor-default truncate text-[12.5px] text-zy-sub hover:text-zy-primary">
                    {n.title}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="zy-sec">
            <header className="zy-sec-hd">
              <h2 className="zy-sec-title">订阅</h2>
            </header>
            <div className="px-4 py-3">
              <p className="text-[12.5px] leading-relaxed text-zy-sub">
                每周三推送一份行业招聘数据简报，由职引研究中心编辑。
              </p>
              <input className="zy-input mt-2.5 text-[12.5px]" placeholder="输入邮箱" aria-label="邮箱" />
              <button className="zy-btn mt-2 w-full !py-1.5 text-[13px]">订阅</button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}
