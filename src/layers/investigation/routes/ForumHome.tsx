import { Link, useParams } from 'react-router-dom'
import { BOARDS, BOARD_BY_ID, THREADS, threadsOfBoard } from '../data/forum'
import { BBS } from '@/shared/routes'
import { cn } from '@/shared/lib/cn'

export function ForumHome() {
  const { boardId } = useParams()
  const board = boardId ? BOARD_BY_ID.get(boardId) : undefined
  const threads = boardId ? threadsOfBoard(boardId) : THREADS

  const sorted = [...threads].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
    return b.time.localeCompare(a.time)
  })

  return (
    <div className="space-y-4">
      <nav className="text-xs text-zy-sub">
        <Link to={BBS.home} className="bbs-link">
          北岭生活论坛
        </Link>
        {board && (
          <>
            <span className="mx-1.5">›</span>
            <span>{board.name}</span>
          </>
        )}
      </nav>

      {!board && (
        <section className="bbs-panel">
          <div className="bbs-head">论坛版块</div>
          <ul className="divide-y divide-bbs-line">
            {BOARDS.map((b) => (
              <li key={b.id} className="flex items-center gap-4 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <Link to={BBS.board(b.id)} className="bbs-link text-[15px] font-medium">
                    {b.name}
                  </Link>
                  <div className="mt-0.5 text-xs text-zy-sub">{b.desc}</div>
                </div>
                <div className="shrink-0 text-right text-xs text-zy-faint">
                  <div>主题 {b.threadCount.toLocaleString()}</div>
                  <div>帖子 {b.postCount.toLocaleString()}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="bbs-panel">
        <div className="bbs-head flex items-center justify-between">
          <span>{board ? board.name : '最新主题'}</span>
          <span className="text-xs text-white/70">共 {sorted.length} 个主题</span>
        </div>

        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-bbs-line bg-bbs-alt text-xs text-zy-sub">
              <th className="px-3 py-2 text-left font-normal">主题</th>
              <th className="w-24 px-2 py-2 text-left font-normal">作者</th>
              <th className="w-20 px-2 py-2 text-center font-normal">回复/查看</th>
              <th className="w-32 px-2 py-2 text-left font-normal">最后发表</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((t) => (
              <tr key={t.id} className="border-b border-bbs-line last:border-0 hover:bg-bbs-alt">
                <td className="px-3 py-2.5">
                  {t.pinned && (
                    <span className="mr-1.5 rounded-sm bg-bbs-head px-1 py-px text-[10px] text-white">
                      置顶
                    </span>
                  )}
                  <Link
                    to={BBS.thread(t.id)}
                    className={cn('bbs-link', t.pinned && 'font-medium')}
                  >
                    {t.title}
                  </Link>
                  {!board && (
                    <span className="ml-2 text-xs text-zy-faint">
                      [{BOARD_BY_ID.get(t.boardId)?.name}]
                    </span>
                  )}
                </td>
                <td className="px-2 py-2.5 text-xs text-zy-sub">{t.author}</td>
                <td className="px-2 py-2.5 text-center text-xs text-zy-sub">
                  {t.replies.length} / {t.views.toLocaleString()}
                </td>
                <td className="px-2 py-2.5 text-xs text-zy-faint">
                  {(t.replies.at(-1)?.time ?? t.time).slice(0, 10)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="flex items-center justify-between text-xs text-zy-faint">
        <span>1 / 1 页</span>
        <span>本版仅显示最近 90 天的主题，更早内容请使用搜索</span>
      </div>
    </div>
  )
}
