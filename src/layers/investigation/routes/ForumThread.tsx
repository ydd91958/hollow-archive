import { useEffect, useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getThread, BOARD_BY_ID, type Reply } from '../data/forum'
import { useTrace } from '@/shared/state/useTrace'
import { useSignal } from '@/shared/lib/useSignals'
import { BBS } from '@/shared/routes'
import { cn } from '@/shared/lib/cn'

export function ForumThread() {
  const { id = '' } = useParams()
  const thread = getThread(id)
  const note = useTrace((s) => s.note)
  const snapshotAvailable = useSignal('SIG_SNAPSHOT')
  const [showSnapshot, setShowSnapshot] = useState(false)

  useEffect(() => {
    if (thread) note(`thread:${thread.id}`)
  }, [thread, note])

  if (!thread) {
    return (
      <div className="bbs-panel px-4 py-16 text-center">
        <p className="text-sm">抱歉，指定的主题不存在或已被删除。</p>
        <Link to={BBS.home} className="bbs-link mt-4 inline-block text-sm">
          返回论坛首页
        </Link>
      </div>
    )
  }

  const board = BOARD_BY_ID.get(thread.boardId)
  const hasDeleted = thread.replies.some((r) => r.deleted)

  return (
    <div className="space-y-3">
      <nav className="text-xs text-zy-sub">
        <Link to={BBS.home} className="bbs-link">
          北岭生活论坛
        </Link>
        <span className="mx-1.5">›</span>
        <Link to={BBS.board(thread.boardId)} className="bbs-link">
          {board?.name}
        </Link>
        <span className="mx-1.5">›</span>
        <span>查看主题</span>
      </nav>

      <div className="bbs-panel">
        <div className="bbs-head flex items-center justify-between">
          <span className="truncate">{thread.title}</span>
          <span className="shrink-0 text-xs text-white/70">
            {thread.views.toLocaleString()} 次查看 · {thread.replies.length} 个回复
          </span>
        </div>

        <PostBlock
          author={thread.author}
          registered={thread.registered}
          posts={thread.posts}
          time={thread.time}
          floor={1}
        >
          {thread.body.map((p, i) => (
            <p key={i} className="mb-3 last:mb-0">
              {p}
            </p>
          ))}
        </PostBlock>

        {thread.replies.map((r) => (
          <ReplyBlock key={r.floor} reply={r} showSnapshot={showSnapshot} />
        ))}
      </div>

      {/* ── 历史版本。玩家在别处见过那个日期之后，论坛才把它露出来。 ── */}
      {hasDeleted && (
        <div className="bbs-panel px-4 py-3 text-xs">
          {snapshotAvailable ? (
            showSnapshot ? (
              <span className="text-zy-sub">
                正在显示本帖的历史版本（快照时间 2023-09-15 23:10）。已删除内容以原文呈现，仅供查证。
                <button
                  className="bbs-link ml-2"
                  onClick={() => setShowSnapshot(false)}
                >
                  返回当前版本
                </button>
              </span>
            ) : (
              <span className="text-zy-sub">
                本帖有 1 条回复已被删除。
                <button
                  className="bbs-link ml-2"
                  onClick={() => {
                    setShowSnapshot(true)
                    note('reveal:BBS-DELETED')
                  }}
                >
                  查看本帖历史版本
                </button>
              </span>
            )
          ) : (
            <span className="text-zy-faint">
              本帖有 1 条回复已被删除。历史版本需要通过站内检索调取，暂不可用。
            </span>
          )}
        </div>
      )}

      <div className="bbs-panel p-4">
        <div className="mb-2 text-[13px] text-zy-sub">快速回复</div>
        <textarea
          className="h-20 w-full resize-none border border-bbs-line px-2 py-1.5 text-[13px] outline-none"
          placeholder="登录后才能回复"
          disabled
        />
        <div className="mt-2 text-right">
          <button className="cursor-not-allowed border border-bbs-line bg-bbs-alt px-4 py-1 text-xs text-zy-faint">
            发表回复
          </button>
        </div>
      </div>
    </div>
  )
}

function PostBlock({
  author,
  registered,
  posts,
  time,
  floor,
  children,
  muted,
}: {
  author: string
  registered: string
  posts: number
  time: string
  floor: number
  children: ReactNode
  muted?: boolean
}) {
  return (
    <div className="flex border-t border-bbs-line first:border-t-0">
      <div className="w-32 shrink-0 border-r border-bbs-line bg-bbs-alt px-3 py-3 text-center">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center bg-bbs-head text-lg text-white">
          {author.slice(0, 1)}
        </div>
        <div className="text-[13px] text-bbs-link">{author}</div>
        <div className="mt-1 space-y-0.5 text-[10px] leading-tight text-zy-faint">
          <div>注册 {registered}</div>
          <div>帖子 {posts}</div>
        </div>
      </div>

      <div className="min-w-0 flex-1 px-4 py-3">
        <div className="mb-2 flex items-baseline justify-between border-b border-dashed border-bbs-line pb-1.5 text-[11px] text-zy-faint">
          <span>{time}</span>
          <span>{floor} 楼</span>
        </div>
        <div className={cn('text-[13.5px] leading-[1.9]', muted ? 'text-zy-faint' : 'text-zy-text')}>
          {children}
        </div>
      </div>
    </div>
  )
}

function ReplyBlock({ reply, showSnapshot }: { reply: Reply; showSnapshot: boolean }) {
  const del = reply.deleted
  const revealed = Boolean(del) && showSnapshot

  return (
    <PostBlock
      author={reply.author}
      registered={reply.registered}
      posts={reply.posts}
      time={reply.time}
      floor={reply.floor}
      muted={Boolean(del) && !revealed}
    >
      {del && !revealed && (
        <div className="border border-dashed border-bbs-line bg-bbs-alt px-3 py-2 text-[12.5px] text-zy-faint">
          该回复已被管理员删除
          <div className="mt-1 text-[11px]">
            删除时间 {del.time} · 原因：{del.reason}
          </div>
        </div>
      )}

      {del && revealed && (
        <div className="border-l-2 border-bbs-head bg-bbs-alt px-3 py-2.5">
          <div className="mb-1.5 text-[11px] text-zy-faint">
            历史版本 · 该内容已于 {del.time} 被删除
          </div>
          <p className="text-[13.5px] leading-[1.9] text-zy-text">{del.original}</p>
          {del.signature && (
            <div className="mt-2 text-[11px] text-zy-faint">{del.signature}</div>
          )}
        </div>
      )}

      {!del && <p>{reply.text}</p>}
    </PostBlock>
  )
}
