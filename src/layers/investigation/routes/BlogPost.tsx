import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPost, POSTS } from '../data/blog'
import { useTrace, type TraceKey } from '@/shared/state/useTrace'
import { BLOG } from '@/shared/routes'

export function BlogPost() {
  const { slug = '' } = useParams()
  const post = getPost(slug)
  const note = useTrace((s) => s.note)

  useEffect(() => {
    if (post?.traceKey) note(post.traceKey as TraceKey)
  }, [post, note])

  if (!post) {
    return (
      <div className="py-16 text-center">
        <p className="text-blog-ink">没有这篇文章。</p>
        <Link to={BLOG.home} className="mt-4 inline-block text-sm text-blog-accent hover:underline">
          回到首页
        </Link>
      </div>
    )
  }

  const index = POSTS.findIndex((p) => p.slug === post.slug)
  const newer = index > 0 ? POSTS[index - 1] : undefined
  const older = index < POSTS.length - 1 ? POSTS[index + 1] : undefined

  return (
    <article>
      <header className="border-b border-blog-line pb-5">
        <h1 className="text-xl text-blog-ink">{post.title}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 text-xs text-blog-sub">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.category}</span>
          {post.tags.length > 0 && (
            <>
              <span>·</span>
              <span>{post.tags.join(' / ')}</span>
            </>
          )}
        </div>
      </header>

      <div className="blog-prose py-7">
        {post.paragraphs.map((p, i) =>
          p.startsWith('[图片') ? (
            <figure
              key={i}
              className="mb-6 flex h-44 items-center justify-center border border-blog-line bg-white/60 text-xs text-blog-sub"
            >
              {p.replace(/^\[|\]$/g, '')}
            </figure>
          ) : (
            <p key={i}>{p}</p>
          ),
        )}
      </div>

      <nav className="flex justify-between gap-4 border-t border-blog-line py-5 text-sm">
        <span className="min-w-0 flex-1">
          {older && (
            <Link to={BLOG.post(older.slug)} className="text-blog-accent hover:underline">
              ← {older.title}
            </Link>
          )}
        </span>
        <span className="min-w-0 flex-1 text-right">
          {newer && (
            <Link to={BLOG.post(newer.slug)} className="text-blog-accent hover:underline">
              {newer.title} →
            </Link>
          )}
        </span>
      </nav>

      <section className="border-t border-blog-line pt-6">
        <h2 className="mb-4 text-sm tracking-widest text-blog-sub">
          评论（{post.comments.length}）
        </h2>

        {post.comments.length ? (
          <ul className="space-y-5">
            {post.comments.map((c, i) => (
              <li key={i} className="border-l-2 border-blog-line pl-4">
                <div className="flex flex-wrap items-baseline gap-x-3 text-xs text-blog-sub">
                  <span className="text-blog-ink">{c.author}</span>
                  <span>{c.time}</span>
                  {c.unanswered && <span className="text-blog-sub/70">· 未回复</span>}
                </div>
                <p className="mt-1.5 text-[14px] leading-[1.9] text-blog-ink/85">{c.text}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-blog-sub">还没有评论。</p>
        )}

        <div className="mt-6 border border-blog-line bg-white/50 p-4">
          <textarea
            className="h-20 w-full resize-none border border-blog-line bg-white px-2 py-1.5 text-sm outline-none"
            placeholder="评论功能已关闭"
            disabled
          />
          <p className="mt-2 text-xs text-blog-sub">
            本站评论已于 2020 年关闭。如需联系，请留言至旧邮箱。
          </p>
        </div>
      </section>
    </article>
  )
}
