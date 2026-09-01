import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

/**
 * 照片框。
 *
 * 场景本身用 SVG 画，但直接画出来会像插画。真实感来自后期：
 * 颗粒、褪色、低对比、暗角、边缘脏点。这些全部用 CSS 叠加实现，
 * 不用 SVG filter，因为 filter 的 id 在同页多实例时会撞车。
 *
 * 四种处理：
 *   print   九十年代冲印照片。白边、右下角日期戳、偏黄
 *   scan    平板扫描件。轻微歪斜、灰底、有灰尘
 *   film    胶卷条。齿孔、片号、偏青
 *   plain   不做旧。用于气象站这类现代网站里的示意图
 */

export type PhotoTreatment = 'print' | 'scan' | 'film' | 'plain'

const TREATMENT: Record<PhotoTreatment, { filter: string; tint: string }> = {
  print: {
    filter: 'sepia(.34) saturate(.72) contrast(.9) brightness(1.04)',
    tint: 'linear-gradient(150deg, rgba(255,238,200,.20), rgba(120,90,50,.10))',
  },
  scan: {
    filter: 'sepia(.16) saturate(.6) contrast(.86) brightness(1.06)',
    tint: 'linear-gradient(180deg, rgba(255,252,240,.16), rgba(90,86,70,.10))',
  },
  film: {
    filter: 'sepia(.10) saturate(.66) contrast(.94)',
    tint: 'linear-gradient(160deg, rgba(210,235,235,.14), rgba(40,60,60,.14))',
  },
  plain: { filter: 'none', tint: 'none' },
}

/** 颗粒。同一张 data-uri 全站复用，浏览器只解一次。 */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")"

export function PhotoFrame({
  children,
  treatment = 'print',
  /** 冲印照片右下角的日期戳。留空则不打。 */
  stamp,
  caption,
  /** 扫描件的轻微歪斜，单位度。 */
  skew = 0,
  grain = 0.09,
  className,
}: {
  children: ReactNode
  treatment?: PhotoTreatment
  stamp?: string
  caption?: string
  skew?: number
  grain?: number
  className?: string
}) {
  const t = TREATMENT[treatment]

  return (
    <figure className={cn('m-0', className)}>
      <div
        className={cn(
          'relative overflow-hidden',
          treatment === 'print' && 'border-[6px] border-b-[22px] border-[#fdfbf4] shadow-[0_1px_4px_rgba(0,0,0,.22)]',
          treatment === 'scan' && 'shadow-[0_1px_3px_rgba(0,0,0,.16)]',
          treatment === 'film' && 'bg-[#1c1c1a] p-[7px]',
        )}
        style={skew ? { transform: `rotate(${skew}deg)` } : undefined}
      >
        {/* 胶卷齿孔 */}
        {treatment === 'film' && (
          <>
            <span className="pointer-events-none absolute inset-x-[7px] top-[1px] flex h-[5px] justify-between">
              {Array.from({ length: 14 }).map((_, i) => (
                <span key={i} className="h-full w-[7px] rounded-[1px] bg-[#e8e6df]" />
              ))}
            </span>
            <span className="pointer-events-none absolute inset-x-[7px] bottom-[1px] flex h-[5px] justify-between">
              {Array.from({ length: 14 }).map((_, i) => (
                <span key={i} className="h-full w-[7px] rounded-[1px] bg-[#e8e6df]" />
              ))}
            </span>
          </>
        )}

        <div className="relative" style={{ filter: t.filter }}>
          {children}

          {/* 色偏 */}
          {t.tint !== 'none' && (
            <span className="pointer-events-none absolute inset-0" style={{ background: t.tint }} />
          )}

          {/* 暗角 */}
          <span
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 50% 45%, transparent 52%, rgba(60,45,25,.30) 100%)',
            }}
          />

          {/* 颗粒 */}
          <span
            className="pointer-events-none absolute inset-0 mix-blend-multiply"
            style={{ backgroundImage: GRAIN, opacity: grain }}
          />

          {/* 冲印日期戳 */}
          {stamp && (
            <span className="pointer-events-none absolute bottom-1.5 right-2 font-mono text-[11px] tracking-tight text-[#ff7a3c] opacity-85 mix-blend-screen">
              {stamp}
            </span>
          )}
        </div>
      </div>

      {caption && (
        <figcaption className="mt-1.5 text-[11.5px] leading-snug text-current opacity-60">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/**
 * 加载失败的图片。
 *
 * 网站上真实存在过、但现在打不开的东西。火车站那条贯穿线要用它：
 * 楼主说"我找到我爸的老照片了"，附件就是这个。
 */
export function BrokenImage({
  filename,
  width = 260,
  height = 180,
  note,
}: {
  filename: string
  width?: number
  height?: number
  note?: string
}) {
  return (
    <figure className="m-0 inline-block">
      <div
        className="flex items-center justify-center border border-dashed border-[#b9bec7] bg-[#f4f5f7]"
        style={{ width, height }}
      >
        <div className="flex items-center gap-2 px-3 text-[#8b929c]">
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="2.5" y="4" width="19" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <path d="M2.5 16 l5 -5 l4 4 l3.5 -3 l6.5 6" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="8.5" cy="9" r="1.6" fill="currentColor" />
            <path d="M4 20 L20 4" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          <span className="min-w-0 truncate text-[12px]">{filename}</span>
        </div>
      </div>
      {note && <figcaption className="mt-1 text-[11px] opacity-55">{note}</figcaption>}
    </figure>
  )
}
