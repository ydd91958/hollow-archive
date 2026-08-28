import { Link } from 'react-router-dom'
import type { Archive } from '@/layers/archive/types/archive'
import { CATEGORY_LABEL } from '@/layers/archive/types/archive'
import { ClearanceTag, StatusTag } from './tags'
import { useSession } from '@/layers/archive/state/useSession'
import { cn } from '@/shared/lib/cn'

/** 目录 / 检索结果里的一行。 */
export function ArchiveRow({ a, note }: { a: Archive; note?: string }) {
  const read = useSession((s) => s.readArchives.includes(a.id))

  return (
    <Link
      to={`/sys/archive/${a.id}`}
      className="group block border-b border-line px-3 py-3 transition-colors hover:bg-panel2"
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span
          className={cn(
            'font-mono text-[12px] tracking-wide',
            a.status === 'REVOKED' || a.status === 'PENDING' ? 'text-rust' : 'text-amber',
          )}
        >
          {a.id}
        </span>
        <span className="text-[13.5px] text-ink group-hover:text-white">
          {a.title}
          {a.codename && <span className="ml-2 text-dim">「{a.codename}」</span>}
        </span>
        <span className="ml-auto flex shrink-0 items-center gap-1.5">
          {read && <span className="text-[9px] uppercase tracking-wider2 text-faint">已调阅</span>}
          <StatusTag value={a.status} />
          <ClearanceTag value={a.clearance} />
        </span>
      </div>

      <p className="mt-1.5 line-clamp-2 font-doc text-[12.5px] leading-relaxed text-dim">
        {a.summary}
      </p>

      <div className="mt-1.5 flex flex-wrap items-center gap-x-4 text-[10px] text-faint">
        <span>{CATEGORY_LABEL[a.category]}</span>
        <span>登记 {a.date}</span>
        {a.revised && <span>修订 {a.revised}</span>}
        {note && <span className="text-cyanic">{note}</span>}
      </div>
    </Link>
  )
}
