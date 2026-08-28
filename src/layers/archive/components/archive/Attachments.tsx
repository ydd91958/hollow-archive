import { useState } from 'react'
import type { Attachment, AttachmentState } from '@/layers/archive/types/archive'
import { InlineText } from '@/layers/archive/components/ui/InlineText'
import { useSession } from '@/layers/archive/state/useSession'
import { cn } from '@/shared/lib/cn'

const STATE_LABEL: Record<AttachmentState, string> = {
  AVAILABLE: '可读',
  MISSING: '不在库',
  CORRUPT: '介质损坏',
  QUARANTINED: '已隔离',
}

const STATE_TONE: Record<AttachmentState, string> = {
  AVAILABLE: 'text-cyanic',
  MISSING: 'text-faint',
  CORRUPT: 'text-amber',
  QUARANTINED: 'text-rust',
}

const KIND_GLYPH = {
  AUDIO: '◍',
  IMAGE: '▣',
  DOCUMENT: '▤',
  DATA: '▦',
  UNKNOWN: '▨',
} as const

/**
 * 附件列表。
 * 这里几乎没有一个附件能真正打开——打不开这件事本身就是叙事。
 */
export function Attachments({ items, archiveId }: { items: Attachment[]; archiveId: string }) {
  const [open, setOpen] = useState<string | null>(null)
  const pushLog = useSession((s) => s.pushLog)

  return (
    <ul className="divide-y divide-line">
      {items.map((att) => {
        const isOpen = open === att.id
        return (
          <li key={att.id}>
            <button
              className="flex w-full items-center gap-3 px-1 py-2 text-left transition-colors hover:bg-panel2"
              onClick={() => {
                const next = isOpen ? null : att.id
                setOpen(next)
                if (next) {
                  pushLog(
                    `请求附件 ${archiveId}/${att.id} · ${STATE_LABEL[att.state]}`,
                    att.state === 'AVAILABLE' ? 'info' : 'warn',
                  )
                }
              }}
            >
              <span className={cn('w-4 shrink-0 text-center text-[13px]', STATE_TONE[att.state])}>
                {KIND_GLYPH[att.kind]}
              </span>
              <span className="min-w-0 flex-1 truncate text-[12.5px] text-ink/85">{att.name}</span>
              <span className="shrink-0 text-[10px] text-faint">{att.size ?? '——'}</span>
              <span
                className={cn(
                  'w-16 shrink-0 text-right text-[10px] uppercase tracking-wider2',
                  STATE_TONE[att.state],
                )}
              >
                {STATE_LABEL[att.state]}
              </span>
            </button>

            {isOpen && (
              <div className="animate-fadeup border-l-2 border-line2 bg-[#080b0d] px-3 py-2 text-[11.5px] leading-relaxed text-dim">
                <div className="mb-1 font-mono text-[9px] uppercase tracking-wider2 text-faint">
                  读取返回
                </div>
                <InlineText text={att.note ?? '无附加说明。'} />
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
