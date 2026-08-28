import type { BarDatum, DonutDatum, TrendDatum } from '../../data/specials'
import { cn } from '@/shared/lib/cn'

/**
 * 专题页用的三种图表。
 * 全部是原生 SVG / CSS——招聘门户的信息图本来就朴素，不需要图表库，
 * 也不该有任何动效炫技。
 */

/** 横向条形图：正负双向，负值向左。 */
export function BarChart({ data }: { data: BarDatum[] }) {
  const max = Math.max(...data.map((d) => Math.abs(d.value)))

  return (
    <div className="space-y-1.5">
      {data.map((d) => {
        const pct = (Math.abs(d.value) / max) * 100
        const positive = d.value >= 0
        return (
          <div key={d.name} className="flex items-center gap-2 text-[12px]">
            <span className="w-16 shrink-0 truncate text-right text-zy-sub">{d.name}</span>
            <span className="relative flex h-4 min-w-0 flex-1 items-center">
              {/* 零轴 */}
              <span className="absolute left-[22%] top-0 h-full w-px bg-zy-line" />
              <span
                className={cn(
                  'absolute h-[10px] rounded-[1px]',
                  positive ? 'bg-[#1a6fdb]' : 'bg-[#c2703a]',
                )}
                style={
                  positive
                    ? { left: '22%', width: `${pct * 0.78}%` }
                    : { right: '78%', width: `${pct * 0.22}%` }
                }
              />
            </span>
            <span
              className={cn(
                'w-14 shrink-0 text-right tabular-nums',
                positive ? 'text-[#1a6fdb]' : 'text-[#c2703a]',
              )}
            >
              {positive ? '+' : ''}
              {d.value.toFixed(1)}%
            </span>
          </div>
        )
      })}
    </div>
  )
}

/** 折线 + 面积图。 */
export function TrendChart({ data, unit = '天' }: { data: TrendDatum[]; unit?: string }) {
  const w = 520
  const h = 160
  const padL = 34
  const padB = 22
  const padT = 12
  const max = Math.ceil(Math.max(...data.map((d) => d.value)) / 20) * 20
  const stepX = (w - padL - 12) / (data.length - 1)
  const y = (v: number) => padT + (1 - v / max) * (h - padT - padB)
  const pts = data.map((d, i) => [padL + i * stepX, y(d.value)] as const)
  const line = pts.map(([x, yy]) => `${x},${yy}`).join(' ')
  const area = `${padL},${h - padB} ${line} ${padL + (data.length - 1) * stepX},${h - padB}`
  const ticks = [0, max / 2, max]

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label="趋势图">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={padL} x2={w - 12} y1={y(t)} y2={y(t)} stroke="#e6e9ee" strokeWidth="1" />
          <text x={padL - 6} y={y(t) + 3.5} textAnchor="end" fontSize="10" fill="#a3aab6">
            {t}
          </text>
        </g>
      ))}
      <polygon points={area} fill="#1a6fdb" opacity="0.09" />
      <polyline points={line} fill="none" stroke="#1a6fdb" strokeWidth="1.8" />
      {pts.map(([x, yy], i) => (
        <g key={data[i].label}>
          <circle cx={x} cy={yy} r="3" fill="#fff" stroke="#1a6fdb" strokeWidth="1.8" />
          <text x={x} y={h - 7} textAnchor="middle" fontSize="10" fill="#6b7382">
            {data[i].label}
          </text>
          <text x={x} y={yy - 8} textAnchor="middle" fontSize="10" fill="#1f2430">
            {data[i].value}
          </text>
        </g>
      ))}
      <text x={padL - 6} y={padT - 2} textAnchor="end" fontSize="9" fill="#a3aab6">
        {unit}
      </text>
    </svg>
  )
}

/** 环形图 + 图例。 */
export function DonutChart({ data }: { data: DonutDatum[] }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  const r = 54
  const c = 2 * Math.PI * r
  let offset = 0

  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 140 140" className="h-[130px] w-[130px] shrink-0" role="img" aria-label="占比图">
        <g transform="translate(70,70) rotate(-90)">
          {data.map((d) => {
            const len = (d.value / total) * c
            const el = (
              <circle
                key={d.name}
                r={r}
                fill="none"
                stroke={d.color}
                strokeWidth="20"
                strokeDasharray={`${len} ${c - len}`}
                strokeDashoffset={-offset}
              />
            )
            offset += len
            return el
          })}
        </g>
        <text x="70" y="67" textAnchor="middle" fontSize="17" fill="#1f2430">
          {data[data.length - 1].value}%
        </text>
        <text x="70" y="82" textAnchor="middle" fontSize="9" fill="#a3aab6">
          三线及以下
        </text>
      </svg>

      <ul className="min-w-0 flex-1 space-y-1.5">
        {data.map((d) => (
          <li key={d.name} className="flex items-center gap-2 text-[12px]">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-[1px]"
              style={{ background: d.color }}
            />
            <span className="min-w-0 flex-1 truncate text-zy-sub">{d.name}</span>
            <span className="shrink-0 tabular-nums text-zy-text">{d.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
