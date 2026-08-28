import { useEffect } from 'react'
import { useSession } from '@/layers/archive/state/useSession'
import { cn } from '@/shared/lib/cn'

const KIND_STYLE = {
  CLUE: { label: '线索登记', cls: 'border-amberdim text-amber' },
  UNLOCK: { label: '权限变更', cls: 'border-rust/70 text-rust' },
  HINT: { label: '介质残留', cls: 'border-cyanic/60 text-cyanic' },
  SYSTEM: { label: '系统', cls: 'border-line2 text-dim' },
} as const

/** 线索/解锁播报。做成"系统弹窗"，不是游戏成就。 */
export function ToastLayer() {
  const toasts = useSession((s) => s.toasts)
  const dismiss = useSession((s) => s.dismissToast)

  useEffect(() => {
    if (!toasts.length) return
    const id = window.setTimeout(() => dismiss(toasts[0].key), 16_000)
    return () => window.clearTimeout(id)
  }, [toasts, dismiss])

  if (!toasts.length) return null

  return (
    <div className="pointer-events-none fixed bottom-10 right-4 z-40 flex w-[min(26rem,calc(100vw-2rem))] flex-col gap-2">
      {toasts.slice(-3).map((t) => {
        const style = KIND_STYLE[t.kind]
        return (
          <div
            key={t.key}
            className={cn(
              'pointer-events-auto animate-fadeup border bg-panel/95 shadow-[0_0_0_1px_rgba(0,0,0,0.6),0_18px_40px_-24px_#000]',
              style.cls,
            )}
          >
            <div className="flex items-center justify-between border-b border-line px-3 py-1 text-[10px] uppercase tracking-wider2">
              <span>{style.label}</span>
              <button
                className="text-faint transition-colors hover:text-ink"
                onClick={() => dismiss(t.key)}
                aria-label="关闭"
              >
                ×
              </button>
            </div>
            <div className="px-3 py-2.5">
              <div className="text-[12px] tracking-wide">{t.title}</div>
              <p className="mt-1.5 font-doc text-[12.5px] leading-relaxed text-ink/80">{t.body}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
