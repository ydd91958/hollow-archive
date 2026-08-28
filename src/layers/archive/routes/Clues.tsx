import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Panel, Tag } from '@/layers/archive/components/ui/Panel'
import { CLUES } from '@/layers/archive/data/clues'
import { UNLOCKS } from '@/layers/archive/data/unlocks'
import { useSession } from '@/layers/archive/state/useSession'
import { cn } from '@/shared/lib/cn'

/**
 * 调查笔记：玩家的线索栏。
 * 刻意做成"本地记事"而不是系统功能——本局不会好心给你做一个解谜进度条。
 */
export function Clues() {
  const clues = useSession((s) => s.clues)
  const unlocks = useSession((s) => s.unlocks)
  const codes = useSession((s) => s.codes)
  const submitCode = useSession((s) => s.submitCode)
  const purge = useSession((s) => s.purge)

  const [code, setCode] = useState('')
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null)

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-[15px] tracking-wider2 text-ink">调查笔记</h1>
        <p className="mt-1 text-[11px] text-faint">
          本页保存在你的浏览器里，不上传。本局无法读取它——本局这么说。
        </p>
      </div>

      <Panel title="已获线索" meta={`${clues.length} / ${CLUES.length}`} bodyClassName="p-0">
        <ul className="divide-y divide-line">
          {CLUES.map((c) => {
            const got = clues.includes(c.id)
            return (
              <li key={c.id} className={cn('px-3 py-3', !got && 'opacity-45')}>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className={cn('font-mono text-[11.5px]', got ? 'text-amber' : 'text-faint')}>
                    {c.id}
                  </span>
                  <span className="text-[13px] text-ink">{got ? c.label : '——'}</span>
                  {got && c.payload && (
                    <span className="ml-auto">
                      <Tag tone="amber">{c.payload}</Tag>
                    </span>
                  )}
                </div>
                <p className="mt-1.5 font-doc text-[12.5px] leading-relaxed text-dim">
                  {got ? c.hint : '尚未获得。线索的存在本身也不应该被你看到。'}
                </p>
                {got && c.origin && (
                  <div className="mt-1 text-[10px] text-faint">来源 · {c.origin}</div>
                )}
              </li>
            )
          })}
        </ul>
      </Panel>

      <Panel title="口令提交" meta="ACCESS CODE">
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            if (!code.trim()) return
            const ok = submitCode(code)
            setFeedback(
              ok
                ? { ok: true, text: '校验通过。放行项已写入本次会话。' }
                : { ok: false, text: '校验失败 0x41。该口令不对应任何接口。' },
            )
            setCode('')
          }}
        >
          <input
            className="tinput font-mono uppercase"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="在此提交你在卷宗里找到的口令"
            aria-label="访问码"
          />
          <button className="tbtn shrink-0" type="submit">
            提交
          </button>
        </form>

        {feedback && (
          <p className={cn('mt-2 text-[11.5px]', feedback.ok ? 'text-cyanic' : 'text-rust')}>
            {feedback.text}
          </p>
        )}

        {codes.length > 0 && (
          <div className="mt-3 border-t border-line pt-2 text-[10.5px] text-faint">
            已提交：{codes.map((c) => c.toUpperCase()).join(' · ')}
          </div>
        )}
      </Panel>

      <Panel title="放行项" meta={`${unlocks.length} / ${UNLOCKS.length}`} bodyClassName="p-0">
        <ul className="divide-y divide-line">
          {UNLOCKS.map((u) => {
            const got = unlocks.includes(u.id)
            const need = (u.requiresClues ?? []).filter((c) => !clues.includes(c))
            return (
              <li key={u.id} className={cn('px-3 py-3', !got && 'opacity-60')}>
                <div className="flex items-baseline gap-3">
                  <span className={cn('font-mono text-[11.5px]', got ? 'text-rust' : 'text-faint')}>
                    {u.id}
                  </span>
                  <span className="text-[13px] text-ink">{u.label}</span>
                  {got && u.grantsPath && (
                    <Link to={u.grantsPath} className="ml-auto tbtn !py-1">
                      进入
                    </Link>
                  )}
                </div>
                <p className="mt-1.5 font-doc text-[12.5px] leading-relaxed text-dim">
                  {got
                    ? u.announcement
                    : u.requiresCodes
                      ? '需要一个口令。它不在任何一份卷宗里被完整写出。'
                      : `尚缺 ${need.length} 条线索。`}
                </p>
              </li>
            )
          })}
        </ul>
      </Panel>

      <div className="flex items-center justify-between border-t border-line pt-3">
        <p className="text-[10.5px] text-faint">
          清除本地会话会丢失全部线索与放行项。服务端记录不受影响。
        </p>
        <button
          className="tbtn hover:!border-rust hover:!text-rust"
          onClick={() => {
            if (window.confirm('清除本地会话？已获线索、已解锁页面与阅读记录将全部丢失。')) purge()
          }}
        >
          清除本地会话
        </button>
      </div>
    </div>
  )
}
