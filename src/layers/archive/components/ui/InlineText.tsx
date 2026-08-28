import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { parseInline, blackBar } from '@/layers/archive/lib/inline'
import { useSession } from '@/layers/archive/state/useSession'
import { getArchive, isVisible } from '@/layers/archive/data/archives'
import { cn } from '@/shared/lib/cn'

/** 遮挡条。持有对应线索后显影为琥珀色，并可以选中复制。 */
function Redacted({ clue, value }: { clue: string | null; value: string }) {
  const clues = useSession((s) => s.clues)
  const pushLog = useSession((s) => s.pushLog)
  const open = clue !== null && clues.includes(clue)

  if (open) {
    return (
      <span className="redacted redacted-open px-0.5" title={`遮挡已解除 · 依据 ${clue}`}>
        {value}
      </span>
    )
  }

  return (
    <span
      className="redacted px-0.5"
      title="本字段已按监护要求遮挡"
      onClick={() => pushLog('尝试读取遮挡字段 · 拒绝 · 本终端权限不足', 'error')}
    >
      {blackBar(value.length)}
    </span>
  )
}

/** 隐形墨水：默认看不见，拖蓝可见，点一下会被"读出"并记录。 */
function InvisibleInk({ text, token }: { text: string; token?: string }) {
  const reveal = useSession((s) => s.reveal)
  const reveals = useSession((s) => s.reveals)
  const [forced, setForced] = useState(false)
  const shown = forced || (token ? reveals.includes(token) : false)

  return (
    <span
      className={cn(
        'cursor-help transition-colors',
        shown ? 'bg-amber/15 text-amber' : 'invisible-ink',
      )}
      title=""
      onClick={() => {
        setForced(true)
        if (token) reveal(token)
      }}
    >
      {text}
    </span>
  )
}

/** 卷宗交叉引用。指向不可见卷宗时，如实告诉玩家"它不在目录里"。 */
function Ref({ id }: { id: string }) {
  const clues = useSession((s) => s.clues)
  const unlocks = useSession((s) => s.unlocks)
  const a = getArchive(id)
  const visible = a ? isVisible(a, { clues, unlocks }) : false

  if (!visible) {
    return (
      <span
        className="border-b border-dashed border-faint text-dim"
        title="交叉引用指向的卷宗不在当前目录返回范围内"
      >
        {id}
      </span>
    )
  }

  return (
    <Link
      to={`/sys/archive/${id}`}
      className="border-b border-amberdim text-amber transition-colors hover:bg-amber/10"
    >
      {id}
    </Link>
  )
}

export interface InlineTextProps {
  text: string
  /** 该段落中隐形墨水对应的 reveal token。 */
  inkToken?: string
  className?: string
}

export function InlineText({ text, inkToken, className }: InlineTextProps) {
  const tokens = parseInline(text)
  return (
    <span className={className}>
      {tokens.map((tok, i) => {
        switch (tok.t) {
          case 'text':
            return <Fragment key={i}>{tok.v}</Fragment>
          case 'redact':
            return <Redacted key={i} clue={tok.clue} value={tok.v} />
          case 'hidden':
            return <InvisibleInk key={i} text={tok.v} token={inkToken} />
          case 'ref':
            return <Ref key={i} id={tok.v} />
          case 'glitch':
            return (
              <span key={i} className="inline-block animate-jitter text-ink">
                {tok.v}
              </span>
            )
          case 'dim':
            return (
              <span key={i} className="text-dim">
                {tok.v}
              </span>
            )
        }
      })}
    </span>
  )
}
