import { useEffect, useState } from 'react'
import { useSession, progressOf } from '@/layers/archive/state/useSession'
import { anomalyLevel } from '@/layers/archive/lib/engine'
import { cn } from '@/shared/lib/cn'

/**
 * 全站 CRT 叠层。
 * 克制是关键：扫描线常驻但很淡，闪断很短、很少，且随剧情推进才变频繁。
 */
export function CrtOverlay() {
  const level = useSession((s) => anomalyLevel(progressOf(s)))
  const [blip, setBlip] = useState(false)

  useEffect(() => {
    if (level === 0) return
    let timer: number

    const schedule = () => {
      // 层级越高，闪断间隔越短，但始终不密集。
      const base = [0, 95_000, 55_000, 32_000][level]
      const delay = base + Math.random() * base * 0.6
      timer = window.setTimeout(() => {
        setBlip(true)
        window.setTimeout(() => setBlip(false), 90 + Math.random() * 120)
        schedule()
      }, delay)
    }

    schedule()
    return () => window.clearTimeout(timer)
  }, [level])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50">
      <div className="crt-lines absolute inset-0 opacity-[0.35]" />
      <div className="crt-vignette absolute inset-0" />
      {/* 缓慢下移的亮带 */}
      <div className="absolute inset-x-0 h-24 animate-scan bg-gradient-to-b from-transparent via-white/[0.014] to-transparent" />
      {/* 闪断 */}
      <div
        className={cn(
          'absolute inset-0 bg-ink/[0.06] transition-opacity duration-75',
          blip ? 'opacity-100' : 'opacity-0',
        )}
      />
    </div>
  )
}
