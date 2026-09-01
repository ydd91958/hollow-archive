/**
 * 照片里的场景。
 *
 * 全部是 SVG。直接看会像插画，套上 PhotoFrame 的颗粒与褪色之后才成立。
 * 所以这里画得克制：色彩压低、形状简单、不加高光和渐变细节。
 */

/* ══════════════════════════════════════════════════════════
   北岭火车站
   钟面数字形制是全篇的贯穿物，做成 prop。
   ══════════════════════════════════════════════════════════ */
export function StationScene({
  numerals = 'roman',
  width = 400,
  height = 250,
}: {
  numerals?: 'roman' | 'arabic'
  width?: number
  height?: number
}) {
  const marks =
    numerals === 'roman'
      ? [
          { t: 'Ⅻ', x: 200, y: 46 },
          { t: 'Ⅲ', x: 222, y: 68 },
          { t: 'Ⅵ', x: 200, y: 90 },
          { t: 'Ⅸ', x: 178, y: 68 },
        ]
      : [
          { t: '12', x: 200, y: 46 },
          { t: '3', x: 222, y: 68 },
          { t: '6', x: 200, y: 90 },
          { t: '9', x: 178, y: 68 },
        ]

  return (
    <svg viewBox="0 0 400 250" width={width} height={height} className="block" aria-hidden="true">
      {/* 天 */}
      <rect width="400" height="250" fill="#b9c4cc" />
      <rect width="400" height="120" fill="#c8d2d8" />
      <ellipse cx="86" cy="40" rx="54" ry="16" fill="#d3dade" opacity=".7" />
      <ellipse cx="300" cy="30" rx="70" ry="14" fill="#d3dade" opacity=".55" />

      {/* 主楼 */}
      <rect x="40" y="98" width="320" height="96" fill="#a9a294" />
      <rect x="40" y="98" width="320" height="6" fill="#8f8878" />
      {/* 两翼窗 */}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={`l${i}`} x={54 + i * 22} y="118" width="13" height="26" fill="#6f6f6c" />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={`r${i}`} x={252 + i * 22} y="118" width="13" height="26" fill="#6f6f6c" />
      ))}

      {/* 中段钟楼 */}
      <rect x="166" y="30" width="68" height="164" fill="#b3ac9e" />
      <rect x="160" y="26" width="80" height="8" fill="#9b9486" />
      <polygon points="200,8 244,26 156,26" fill="#8d8577" />
      {/* 钟面 */}
      <circle cx="200" cy="68" r="26" fill="#e6e2d6" />
      <circle cx="200" cy="68" r="26" fill="none" stroke="#7a7266" strokeWidth="2.5" />
      {marks.map((m) => (
        <text
          key={m.t}
          x={m.x}
          y={m.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={numerals === 'roman' ? 9 : 8.5}
          fill="#5c554b"
          fontFamily="serif"
        >
          {m.t}
        </text>
      ))}
      <line x1="200" y1="68" x2="200" y2="53" stroke="#463f37" strokeWidth="2.2" />
      <line x1="200" y1="68" x2="213" y2="74" stroke="#463f37" strokeWidth="2.2" />
      <circle cx="200" cy="68" r="2.2" fill="#463f37" />

      {/* 站名牌 */}
      <rect x="172" y="106" width="56" height="15" fill="#8a2f24" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={180 + i * 16} y="110" width="9" height="7" fill="#e8e2d4" opacity=".8" />
      ))}

      {/* 门廊 */}
      <rect x="176" y="150" width="48" height="44" fill="#5f5b52" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={150 + i * 34} y="150" width="7" height="44" fill="#9b9488" />
      ))}

      {/* 站前广场 */}
      <rect x="0" y="194" width="400" height="56" fill="#9a9a93" />
      <rect x="0" y="194" width="400" height="3" fill="#87877f" />

      {/* 人 */}
      {[
        [96, 210, 1],
        [110, 213, 0.9],
        [268, 208, 1],
        [292, 214, 0.85],
        [318, 210, 0.95],
      ].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`} fill="#4d4a45">
          <circle cx="0" cy="0" r="3.2" />
          <path d="M-3.4 4 Q-3.4 18 0 18 Q3.4 18 3.4 4 Z" />
        </g>
      ))}

      {/* 公交车 */}
      <rect x="18" y="196" width="62" height="24" rx="3" fill="#7d8b86" />
      <rect x="24" y="201" width="50" height="10" fill="#b6c0bb" />
      <circle cx="32" cy="221" r="4" fill="#3a3a38" />
      <circle cx="68" cy="221" r="4" fill="#3a3a38" />

      {/* 树 */}
      {[352, 372].map((x, i) => (
        <g key={i}>
          <rect x={x} y="176" width="4" height="22" fill="#5c5344" />
          <ellipse cx={x + 2} cy="170" rx="14" ry="16" fill="#6d7358" />
        </g>
      ))}
    </svg>
  )
}

/* ══════════════════════════════════════════════════════════
   第十七号观测井 · 井台
   figures 控制画面里站了几个人。第四个人的透明度略低，不作说明。
   ══════════════════════════════════════════════════════════ */
export function WellheadScene({
  figures = 4,
  width = 400,
  height = 250,
}: {
  figures?: number
  width?: number
  height?: number
}) {
  const people = [
    { x: 128, y: 176, fade: 1 },
    { x: 150, y: 178, fade: 1 },
    { x: 172, y: 176, fade: 1 },
    { x: 194, y: 179, fade: 0.42 },
  ].slice(0, figures)

  return (
    <svg viewBox="0 0 400 250" width={width} height={height} className="block" aria-hidden="true">
      <rect width="400" height="250" fill="#b3b3a4" />
      <rect width="400" height="112" fill="#c2c3b4" />

      {/* 远山 */}
      <path d="M0 112 L70 66 L128 100 L186 58 L252 104 L318 74 L400 110 L400 140 L0 140 Z" fill="#8e9080" />
      <path d="M0 122 L58 92 L124 118 L200 88 L272 120 L344 98 L400 124 L400 152 L0 152 Z" fill="#9ba08a" />

      {/* 秋天的坡 */}
      <rect x="0" y="140" width="400" height="110" fill="#a89a72" />
      <path d="M0 150 Q100 140 200 152 T400 146 L400 250 L0 250 Z" fill="#9c8f68" />

      {/* 灌木 */}
      {[24, 62, 340, 372].map((x, i) => (
        <ellipse key={i} cx={x} cy={168 + (i % 2) * 6} rx="16" ry="10" fill="#8a7f56" />
      ))}

      {/* 器材房 */}
      <rect x="266" y="120" width="72" height="44" fill="#a6a396" />
      <polygon points="262,120 342,120 302,104" fill="#8b8779" />
      <rect x="292" y="136" width="16" height="28" fill="#5e5b52" />
      <rect x="272" y="130" width="12" height="11" fill="#6d6a60" />

      {/* 井台 */}
      <ellipse cx="150" cy="206" rx="72" ry="18" fill="#9a9384" />
      <ellipse cx="150" cy="202" rx="72" ry="18" fill="#aaa495" />
      {/* 井口 */}
      <ellipse cx="150" cy="198" rx="26" ry="9" fill="#7d7669" />
      <rect x="124" y="184" width="52" height="14" fill="#8e887a" />
      <ellipse cx="150" cy="184" rx="26" ry="9" fill="#9d9789" />
      {/* 盖板与螺栓 */}
      <ellipse cx="150" cy="183" rx="21" ry="7" fill="#6f6a5f" />
      {[-14, 0, 14].map((dx) => (
        <circle key={dx} cx={150 + dx} cy={183} r="1.6" fill="#4e4a42" />
      ))}
      {/* 编号牌 */}
      <rect x="186" y="188" width="26" height="16" fill="#c9c3b2" />
      <rect x="190" y="193" width="18" height="2.5" fill="#5f5a50" />
      <rect x="190" y="198" width="12" height="2.5" fill="#5f5a50" />

      {/* 三脚架与线缆 */}
      <g stroke="#5f5a4e" strokeWidth="2" fill="none">
        <path d="M96 200 L104 160 L112 200" />
        <path d="M104 160 L104 152" />
      </g>
      <path d="M104 162 Q126 172 138 186" stroke="#4f4b42" strokeWidth="1.4" fill="none" />

      {/* 人 */}
      {people.map((p, i) => (
        <g key={i} transform={`translate(${p.x} ${p.y})`} fill="#4a473f" opacity={p.fade}>
          <circle cx="0" cy="0" r="4" />
          <path d="M-4.4 5 Q-4.6 26 0 26 Q4.6 26 4.4 5 Z" />
          <path d="M-4.4 8 L-9 18" stroke="#4a473f" strokeWidth="2.4" />
          <path d="M4.4 8 L9 17" stroke="#4a473f" strokeWidth="2.4" />
        </g>
      ))}
    </svg>
  )
}

/* ══════════════════════════════════════════════════════════
   气象观测场
   百叶箱、雨量筒、风杆。给气象站用。
   ══════════════════════════════════════════════════════════ */
export function ObservatoryScene({ width = 400, height = 250 }: { width?: number; height?: number }) {
  return (
    <svg viewBox="0 0 400 250" width={width} height={height} className="block" aria-hidden="true">
      <rect width="400" height="250" fill="#aebfc6" />
      <rect width="400" height="130" fill="#c1d0d6" />
      <ellipse cx="120" cy="44" rx="66" ry="15" fill="#d2dde1" opacity=".7" />
      <ellipse cx="310" cy="34" rx="52" ry="12" fill="#d2dde1" opacity=".6" />

      {/* 草坪 */}
      <rect x="0" y="130" width="400" height="120" fill="#8e9c72" />
      <path d="M0 142 Q120 134 240 144 T400 138 L400 250 L0 250 Z" fill="#849268" />

      {/* 围栏 */}
      <g stroke="#c8ccc4" strokeWidth="2.4">
        <line x1="20" y1="150" x2="380" y2="150" />
        <line x1="20" y1="164" x2="380" y2="164" />
        {Array.from({ length: 13 }).map((_, i) => (
          <line key={i} x1={20 + i * 30} y1="142" x2={20 + i * 30} y2="182" />
        ))}
      </g>

      {/* 百叶箱 */}
      <g>
        <rect x="128" y="112" width="56" height="42" fill="#e4e5df" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x="130" y={116 + i * 8} width="52" height="4" fill="#c6c8c0" />
        ))}
        <polygon points="124,112 188,112 156,100" fill="#d6d8d0" />
        <rect x="138" y="154" width="5" height="30" fill="#b8bab2" />
        <rect x="169" y="154" width="5" height="30" fill="#b8bab2" />
      </g>

      {/* 雨量筒 */}
      <g>
        <rect x="238" y="140" width="18" height="42" rx="2" fill="#d9dbd3" />
        <ellipse cx="247" cy="140" rx="9" ry="3.4" fill="#eceee7" />
        <ellipse cx="247" cy="140" rx="6" ry="2.2" fill="#a9aca4" />
      </g>

      {/* 风杆 */}
      <g>
        <rect x="322" y="52" width="4" height="132" fill="#b6b9b1" />
        <path d="M324 60 L352 66 L324 72 Z" fill="#c9ccc4" />
        <line x1="324" y1="60" x2="308" y2="56" stroke="#b6b9b1" strokeWidth="2.4" />
        {[0, 1, 2].map((i) => (
          <ellipse key={i} cx={302 - i * 2} cy={54 - i * 4} rx="5" ry="3" fill="#c9ccc4" />
        ))}
      </g>

      {/* 值班室 */}
      <rect x="20" y="118" width="64" height="40" fill="#b0a99c" />
      <polygon points="16,118 88,118 52,104" fill="#968f83" />
      <rect x="44" y="134" width="14" height="24" fill="#5f5c54" />
      <rect x="26" y="126" width="12" height="10" fill="#7d8a8e" />
    </svg>
  )
}
