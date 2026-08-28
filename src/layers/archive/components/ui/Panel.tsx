import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

export interface PanelProps {
  title?: string
  /** 面板右上角的小字，通常放计数、状态、时间戳。 */
  meta?: ReactNode
  children: ReactNode
  className?: string
  bodyClassName?: string
}

export function Panel({ title, meta, children, className, bodyClassName }: PanelProps) {
  return (
    <section className={cn('panel', className)}>
      {(title || meta) && (
        <header className="panel-head">
          <span>{title}</span>
          <span className="text-faint">{meta}</span>
        </header>
      )}
      <div className={cn('p-3', bodyClassName)}>{children}</div>
    </section>
  )
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[7.5rem_1fr] items-baseline gap-3 py-1">
      <div className="field-label">{label}</div>
      <div className="field-value">{children}</div>
    </div>
  )
}

export function Tag({
  tone = 'dim',
  children,
}: {
  tone?: 'dim' | 'amber' | 'rust' | 'silent' | 'cyan'
  children: ReactNode
}) {
  const tones = {
    dim: 'border-line text-dim',
    amber: 'border-amberdim text-amber',
    rust: 'border-rust/60 text-rust',
    silent: 'border-silent bg-silent/15 text-rust',
    cyan: 'border-cyanic/50 text-cyanic',
  } as const

  return (
    <span
      className={cn(
        'inline-block border px-1.5 py-px text-[10px] uppercase tracking-wider2',
        tones[tone],
      )}
    >
      {children}
    </span>
  )
}
