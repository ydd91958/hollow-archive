import { Link, Outlet } from 'react-router-dom'
import { useLayerTheme } from '@/shared/lib/useLayerTheme'
import { BLOG, DOMAINS } from '@/shared/routes'
import { BLOG_META, POSTS } from '../data/blog'

export function BlogShell() {
  useLayerTheme('blog', 'blog', `${BLOG_META.title} - ${BLOG_META.author}`)

  const archiveByYear = POSTS.reduce<Record<string, number>>((acc, p) => {
    const y = p.date.slice(0, 4)
    acc[y] = (acc[y] ?? 0) + 1
    return acc
  }, {})

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col px-5">
      <header className="border-b border-blog-line py-8">
        <Link to={BLOG.home} className="inline-block">
          <h1 className="text-2xl tracking-wide text-blog-ink">{BLOG_META.title}</h1>
        </Link>
        <p className="mt-2 text-sm text-blog-sub">{BLOG_META.subtitle}</p>
      </header>

      <div className="flex flex-1 flex-col gap-10 py-8 md:flex-row">
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>

        <aside className="w-full shrink-0 space-y-7 text-sm md:w-48">
          <section>
            <h2 className="mb-2 text-xs tracking-widest text-blog-sub">关于</h2>
            <p className="leading-relaxed text-blog-ink/80">
              {BLOG_META.author}，北岭。
              <br />
              {BLOG_META.since}开始写。
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xs tracking-widest text-blog-sub">分类</h2>
            <ul className="space-y-1 text-blog-ink/80">
              {BLOG_META.categories.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-xs tracking-widest text-blog-sub">存档</h2>
            <ul className="space-y-1 text-blog-ink/80">
              {Object.entries(archiveByYear)
                .sort((a, b) => b[0].localeCompare(a[0]))
                .map(([y, n]) => (
                  <li key={y}>
                    {y} 年（{n}）
                  </li>
                ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-xs tracking-widest text-blog-sub">链接</h2>
            <ul className="space-y-1">
              {BLOG_META.links.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-blog-accent hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      <footer className="border-t border-blog-line py-6 text-xs leading-relaxed text-blog-sub">
        <div>
          {BLOG_META.title} · {DOMAINS.blog}
        </div>
        <div className="mt-1">本站内容为个人记录，转载请注明出处。</div>
      </footer>
    </div>
  )
}
