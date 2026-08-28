import { cn } from '@/shared/lib/cn'

/**
 * 企业字标系统。
 *
 * 之前企业视觉是「一个纯色方块 + 公司名」，那看起来就是占位符。
 * 真实招聘站上的企业 logo 即使是平台生成的，也有一致的构造：
 * 底色取品牌色、字重统一、带一点光影、还有一个几何记号让每家看起来不同。
 *
 * 这里的字标由三层构成：
 *   1. 品牌色渐变底（同色相自动提亮，保证每家都成立）
 *   2. 一个按 id 哈希选出的几何记号（六选一，白色低透明度）
 *   3. 企业名首字，统一字重与光学居中
 * 尺寸与视觉重量在全站统一，所以并排放二十个也不会乱。
 */

const SIZES = {
  xs: { box: 'h-7 w-7 rounded-[5px]', text: 'text-[12px]' },
  sm: { box: 'h-9 w-9 rounded-md', text: 'text-[15px]' },
  md: { box: 'h-11 w-11 rounded-lg', text: 'text-[18px]' },
  lg: { box: 'h-14 w-14 rounded-[10px]', text: 'text-[23px]' },
  xl: { box: 'h-20 w-20 rounded-xl', text: 'text-[33px]' },
} as const

export type MarkSize = keyof typeof SIZES

/** 把品牌色朝白色提亮，用来做渐变的高光端。 */
function lighten(hex: string, amount: number): string {
  const n = parseInt(hex.slice(1), 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  const mix = (c: number) => Math.round(c + (255 - c) * amount)
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`
}

function hash(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}

/** 六种几何记号。低透明度白色，只提供质感，不抢首字。 */
function Glyph({ variant }: { variant: number }) {
  const common = { fill: 'rgba(255,255,255,.16)' }
  switch (variant) {
    case 0: // 右上角四分之一圆
      return <path d="M100 0 A100 100 0 0 1 0 100 L0 0 Z" transform="translate(52,-30)" {...common} />
    case 1: // 对角光带
      return <rect x="-30" y="62" width="180" height="26" transform="rotate(-38 60 70)" {...common} />
    case 2: // 点阵
      return (
        <g {...common}>
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => <circle key={`${r}${c}`} cx={60 + c * 13} cy={12 + r * 13} r="4" />),
          )}
        </g>
      )
    case 3: // 三角
      return <path d="M0 100 L46 22 L92 100 Z" transform="translate(38,4)" {...common} />
    case 4: // 波纹
      return (
        <path
          d="M-10 74 Q22 54 54 74 T118 74 L118 110 L-10 110 Z"
          {...common}
        />
      )
    default: // 同心弧
      return (
        <g fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="7">
          <circle cx="82" cy="20" r="30" />
          <circle cx="82" cy="20" r="48" />
        </g>
      )
  }
}

export function CompanyMark({
  brand,
  text,
  id,
  size = 'md',
  className,
}: {
  brand: string
  /** 企业简称，取首字做字标。 */
  text: string
  /** 用于挑选几何记号，保证同一家公司每次都一样。 */
  id?: string
  size?: MarkSize
  className?: string
}) {
  const s = SIZES[size]
  const variant = hash(id ?? text) % 6

  return (
    <span
      className={cn(
        'relative flex shrink-0 items-center justify-center overflow-hidden',
        'shadow-[0_1px_2px_rgba(16,24,40,.14),inset_0_1px_0_rgba(255,255,255,.28)]',
        s.box,
        className,
      )}
      style={{ background: `linear-gradient(140deg, ${lighten(brand, 0.18)}, ${brand} 62%)` }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 110 110" className="absolute inset-0 h-full w-full">
        <Glyph variant={variant} />
      </svg>
      <span
        className={cn('relative font-semibold leading-none text-white', s.text)}
        style={{ textShadow: '0 1px 2px rgba(0,0,0,.18)' }}
      >
        {text.slice(0, 1)}
      </span>
    </span>
  )
}

/**
 * 字标 + 名称的横向锁定组合。
 * 名称用品牌色，和字标形成一个整体，而不是「方块旁边有行字」。
 */
export function CompanyLockup({
  brand,
  name,
  sub,
  id,
  size = 'md',
}: {
  brand: string
  name: string
  sub?: string
  id?: string
  size?: MarkSize
}) {
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      <CompanyMark brand={brand} text={name} id={id} size={size} />
      <span className="min-w-0">
        <span className="block truncate text-[13.5px] font-medium tracking-tight text-zy-text">
          {name}
        </span>
        {sub && <span className="block truncate text-[11px] text-zy-faint">{sub}</span>}
      </span>
    </span>
  )
}
