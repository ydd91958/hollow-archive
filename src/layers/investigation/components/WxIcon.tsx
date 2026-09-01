/** 天气现象图标。够用就行，政务站的图标本来就很朴素。 */
export function WxIcon({ p, size = 28 }: { p: string; size?: number }) {
  const sun = <circle cx="20" cy="18" r="9" fill="#e8a91f" />
  const cloud = (
    <path
      d="M14 40 a8 8 0 0 1 1.6 -15.8 a11 11 0 0 1 20.8 2.8 a7.5 7.5 0 0 1 -1.6 13 Z"
      fill="#b9c6d4"
    />
  )
  const cloudDark = (
    <path
      d="M14 40 a8 8 0 0 1 1.6 -15.8 a11 11 0 0 1 20.8 2.8 a7.5 7.5 0 0 1 -1.6 13 Z"
      fill="#8e9dab"
    />
  )
  const drops = [0, 1, 2].map((i) => (
    <path
      key={i}
      d={`M${17 + i * 8} 43 l-2 6`}
      stroke="#4a86c8"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
  ))

  return (
    <svg width={size} height={size} viewBox="0 0 50 52" aria-label={p} role="img">
      {p.includes('雨') ? (
        <>
          {cloudDark}
          {drops}
        </>
      ) : p === '阴' ? (
        cloudDark
      ) : p === '多云' ? (
        <>
          {sun}
          {cloud}
        </>
      ) : (
        <circle cx="25" cy="26" r="13" fill="#e8a91f" />
      )}
    </svg>
  )
}

const ALERT_TONE = {
  blue: 'bg-wx-blue',
  yellow: 'bg-wx-yellow',
  orange: 'bg-wx-orange',
  red: 'bg-wx-red',
} as const

/** 预警信号标志。国标是等边三角形加图形，这里做成简化的方形徽记。 */
export function AlertBadge({
  level,
  label,
  size = 'md',
}: {
  level: keyof typeof ALERT_TONE
  label: string
  size?: 'sm' | 'md'
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-white ${ALERT_TONE[level]} ${
        size === 'sm' ? 'text-[11px]' : 'text-[12.5px]'
      }`}
    >
      <span className="h-2 w-2 rotate-45 bg-white/80" />
      {label}
    </span>
  )
}
