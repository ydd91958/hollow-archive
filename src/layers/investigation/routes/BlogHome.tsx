import { Link } from 'react-router-dom'
import { POSTS } from '../data/blog'
import { BLOG } from '@/shared/routes'

export function BlogHome() {
  return (
    <div className="divide-y divide-blog-line">
      {POSTS.map((p) => (
        <article key={p.slug} className="py-6 first:pt-0">
          <h2 className="text-lg text-blog-ink">
            <Link to={BLOG.post(p.slug)} className="hover:text-blog-accent hover:underline">
              {p.title}
            </Link>
          </h2>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 text-xs text-blog-sub">
            <span>{p.date}</span>
            <span>·</span>
            <span>{p.category}</span>
            {p.comments.length > 0 && (
              <>
                <span>·</span>
                <span>{p.comments.length} 条评论</span>
              </>
            )}
          </div>
          <p className="mt-3 text-[14.5px] leading-[1.9] text-blog-ink/85">{p.excerpt}</p>
          <Link
            to={BLOG.post(p.slug)}
            className="mt-2 inline-block text-sm text-blog-accent hover:underline"
          >
            阅读全文 →
          </Link>
        </article>
      ))}
    </div>
  )
}
