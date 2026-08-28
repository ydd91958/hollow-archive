/**
 * 运营位插画。
 *
 * 三张图都按「背景 / 中景 / 前景」分层构图，而不是把简历、柱状图、
 * 城市轮廓平铺在一起——后者正是 Dashboard 感的来源。
 *
 * 共同的绘制规则：
 *   · 背景层：大面积、低对比、只提供空间感（天际线、光晕、巨型弧线）
 *   · 中景层：趋势曲线与飘落的叶片，串起整个画面
 *   · 前景层：一个明确的视觉焦点（职位卡 / 人物 / 建筑），对比最强
 *   · 阴影用低透明度椭圆，不用 filter，保证渲染稳定
 */

/* ══════════════════════════════════════════════════════════
   秋招观察：招聘现场
   焦点是一张浮起的职位卡，一个抽象人物正伸手去够它，
   身后是上升的市场趋势与城市，空中飘着几片秋叶。
   ══════════════════════════════════════════════════════════ */
export function CampusScene() {
  const skyline = [
    [8, 58],
    [34, 34],
    [56, 76],
    [84, 46],
    [106, 62],
    [132, 28],
    [152, 54],
    [178, 40],
    [204, 70],
    [232, 36],
    [256, 50],
    [284, 66],
    [312, 30],
    [334, 58],
    [362, 44],
    [388, 72],
    [418, 38],
    [444, 60],
    [472, 48],
    [500, 68],
    [528, 40],
  ] as const

  const leaves = [
    { x: 96, y: 60, r: -22, s: 1 },
    { x: 148, y: 132, r: 34, s: 0.72 },
    { x: 392, y: 52, r: 12, s: 0.85 },
    { x: 512, y: 118, r: -40, s: 0.66 },
    { x: 268, y: 32, r: 58, s: 0.6 },
  ]

  return (
    <svg viewBox="0 0 560 300" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="hs-card" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#eaf1fa" />
        </linearGradient>
        <linearGradient id="hs-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,.30)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <linearGradient id="hs-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8fc0f0" />
          <stop offset="100%" stopColor="#5d97d8" />
        </linearGradient>
        <linearGradient id="hs-leaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffd08a" />
          <stop offset="100%" stopColor="#ef8f3c" />
        </linearGradient>
        <radialGradient id="hs-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="rgba(255,255,255,.20)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      {/* ───────── 背景层 ───────── */}
      <circle cx="120" cy="70" r="150" fill="url(#hs-glow)" />
      <circle cx="452" cy="196" r="130" fill="url(#hs-glow)" />
      <circle
        cx="470"
        cy="70"
        r="112"
        fill="none"
        stroke="rgba(255,255,255,.09)"
        strokeWidth="26"
      />

      {/* 天际线 */}
      <g fill="rgba(255,255,255,.085)">
        {skyline.map(([x, h], i) => (
          <rect key={i} x={x} y={252 - h} width={i % 3 === 0 ? 24 : 18} height={h + 48} rx="2" />
        ))}
      </g>
      <g fill="rgba(255,255,255,.07)">
        {skyline.slice(0, 12).map(([x, h], i) =>
          [0, 1, 2].map((r) => (
            <rect key={`${i}-${r}`} x={x + 5} y={252 - h + 10 + r * 14} width="6" height="7" />
          )),
        )}
      </g>

      {/* ───────── 中景层：市场趋势 ───────── */}
      <path
        d="M20 232 L20 214 Q86 208 118 186 T208 150 T292 158 T376 112 T460 92 T540 62 L540 232 Z"
        fill="url(#hs-area)"
      />
      <path
        d="M20 214 Q86 208 118 186 T208 150 T292 158 T376 112 T460 92 T540 62"
        fill="none"
        stroke="rgba(255,255,255,.5)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="540" cy="62" r="5.5" fill="#ffd08a" />
      <circle cx="540" cy="62" r="11" fill="none" stroke="rgba(255,208,138,.45)" strokeWidth="2" />

      {/* ───────── 前景层 ───────── */}
      {/* 卡片投影 */}
      <ellipse cx="238" cy="242" rx="120" ry="13" fill="rgba(4,26,54,.24)" />

      {/* 后面那张卡（叠放，制造纵深） */}
      <g transform="rotate(5 268 130)" opacity="0.5">
        <rect x="186" y="52" width="188" height="132" rx="10" fill="#dce8f6" />
      </g>

      {/* 主职位卡 */}
      <g transform="rotate(-3 250 140)">
        <rect x="148" y="66" width="206" height="152" rx="11" fill="url(#hs-card)" />
        {/* 卡头：企业字标 + 职位名 */}
        <rect x="166" y="84" width="30" height="30" rx="7" fill="#2f6b8f" />
        <rect x="172" y="92" width="18" height="4" rx="2" fill="rgba(255,255,255,.75)" />
        <rect x="172" y="100" width="12" height="4" rx="2" fill="rgba(255,255,255,.45)" />
        <rect x="206" y="88" width="86" height="8" rx="4" fill="#274156" />
        <rect x="206" y="103" width="58" height="6" rx="3" fill="#9fb3c6" />
        {/* 薪资 */}
        <rect x="166" y="128" width="66" height="19" rx="5" fill="#fdece0" />
        <rect x="175" y="135" width="48" height="6" rx="3" fill="#ef6820" />
        {/* 标签 */}
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={166 + i * 46}
            y={158}
            width={40}
            height={15}
            rx="4"
            fill="#eef2f7"
          />
        ))}
        {/* 底部按钮 */}
        <rect x="166" y="186" width="72" height="20" rx="6" fill="#1a6fdb" />
        <rect x="182" y="194" width="40" height="5" rx="2.5" fill="rgba(255,255,255,.85)" />
        <rect x="252" y="190" width="86" height="6" rx="3" fill="#dbe3ec" />
        <rect x="252" y="201" width="60" height="6" rx="3" fill="#e7edf3" />
      </g>

      {/* 远处的第二个人物剪影（纵深） */}
      <g fill="rgba(255,255,255,.13)">
        <circle cx="118" cy="176" r="13" />
        <path d="M99 236 Q99 196 118 196 Q137 196 137 236 Z" />
      </g>

      {/* 主人物：伸手去够那张卡 */}
      <g>
        <ellipse cx="452" cy="243" rx="46" ry="9" fill="rgba(4,26,54,.22)" />
        {/* 腿 */}
        <path d="M432 238 L436 196 L468 196 L472 238 Z" fill="#2c5f9e" />
        {/* 身体 */}
        <path
          d="M424 200 Q422 152 452 152 Q482 152 480 200 Z"
          fill="url(#hs-body)"
        />
        {/* 手臂伸向卡片 */}
        <path
          d="M428 166 Q392 172 368 152"
          fill="none"
          stroke="#8fc0f0"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <circle cx="364" cy="150" r="8" fill="#a9d0f5" />
        {/* 头与颈 */}
        <rect x="446" y="132" width="13" height="14" rx="5" fill="#e8b98f" />
        <circle cx="452" cy="122" r="17" fill="#f0c79c" />
        <path d="M436 116 Q440 100 452 100 Q470 100 468 118 Q456 108 436 116 Z" fill="#3b4a5c" />
        {/* 手里的文件 */}
        <g transform="rotate(-14 494 178)">
          <rect x="480" y="158" width="34" height="44" rx="4" fill="#ffffff" opacity=".92" />
          <rect x="487" y="167" width="20" height="4" rx="2" fill="#c3d2e0" />
          <rect x="487" y="176" width="14" height="4" rx="2" fill="#dbe4ee" />
          <rect x="487" y="185" width="18" height="4" rx="2" fill="#dbe4ee" />
        </g>
      </g>

      {/* 秋叶：串联全画面的季节符号 */}
      {leaves.map((l, i) => (
        <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.r}) scale(${l.s})`}>
          <path
            d="M0 0 Q11 -12 22 0 Q11 13 0 0 Z"
            fill="url(#hs-leaf)"
            opacity={0.55 + (i % 3) * 0.15}
          />
          <path d="M0 0 L22 0" stroke="rgba(160,80,20,.35)" strokeWidth="1" />
        </g>
      ))}
    </svg>
  )
}

/* ══════════════════════════════════════════════════════════
   薪酬报告：右下角锚定的钱币与曲线
   构图与秋招完全不同——重心在右下，主体是硬币堆与上扬折线。
   ══════════════════════════════════════════════════════════ */
export function SalaryScene() {
  return (
    <svg viewBox="0 0 220 150" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="sl-coin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe0ab" />
          <stop offset="100%" stopColor="#f0a94e" />
        </linearGradient>
        <linearGradient id="sl-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,.34)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <radialGradient id="sl-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="rgba(255,255,255,.22)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      {/* 背景 */}
      <circle cx="168" cy="42" r="76" fill="url(#sl-glow)" />
      <circle cx="46" cy="120" r="58" fill="url(#sl-glow)" />

      {/* 中景：上扬曲线 */}
      <path d="M6 126 L6 104 Q44 96 70 74 T126 58 T182 24 L206 14 L206 126 Z" fill="url(#sl-area)" />
      <path
        d="M6 104 Q44 96 70 74 T126 58 T182 24 L206 14"
        fill="none"
        stroke="rgba(255,255,255,.75)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path d="M198 8 L212 12 L204 24 Z" fill="#ffffff" opacity=".85" />

      {/* 前景：硬币堆（右下锚定） */}
      <g>
        <ellipse cx="150" cy="140" rx="56" ry="8" fill="rgba(90,36,0,.22)" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(0 ${-i * 15})`}>
            <ellipse cx="150" cy="126" rx="34" ry="12" fill="url(#sl-coin)" />
            <ellipse cx="150" cy="123" rx="34" ry="12" fill="#ffd79a" />
            <ellipse cx="150" cy="123" rx="21" ry="7" fill="rgba(217,132,44,.35)" />
          </g>
        ))}
        <text
          x="150"
          y="69"
          textAnchor="middle"
          fontSize="19"
          fontWeight="700"
          fill="#b45a10"
          opacity=".8"
        >
          ¥
        </text>
      </g>

      {/* 左侧小柱，补构图重量 */}
      <g fill="rgba(255,255,255,.32)">
        <rect x="22" y="98" width="12" height="34" rx="3" />
        <rect x="40" y="84" width="12" height="48" rx="3" />
        <rect x="58" y="106" width="12" height="26" rx="3" />
      </g>
    </svg>
  )
}

/* ══════════════════════════════════════════════════════════
   国企 · 事业单位：居中对称的建筑与徽章
   构图是对称的、静止的，和上面两张的动势刻意相反——稳定感就来自这里。
   ══════════════════════════════════════════════════════════ */
export function SoeScene() {
  return (
    <svg viewBox="0 0 220 150" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="so-b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,.95)" />
          <stop offset="100%" stopColor="rgba(255,255,255,.66)" />
        </linearGradient>
        <radialGradient id="so-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="rgba(255,255,255,.20)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      {/* 背景：对称光晕 + 稳定横带 */}
      <circle cx="110" cy="58" r="82" fill="url(#so-glow)" />
      <g fill="rgba(255,255,255,.10)">
        <rect x="0" y="118" width="220" height="6" rx="3" />
        <rect x="16" y="130" width="188" height="6" rx="3" />
      </g>

      {/* 前景：建筑（严格居中对称） */}
      <g fill="url(#so-b)">
        <polygon points="110,16 168,44 52,44" />
        <rect x="54" y="48" width="112" height="6" rx="2" />
        {[68, 89, 110, 131, 152].map((x) => (
          <rect key={x} x={x - 5} y="58" width="10" height="46" rx="2" />
        ))}
        <rect x="50" y="106" width="120" height="7" rx="2" />
      </g>
      <ellipse cx="110" cy="142" rx="72" ry="7" fill="rgba(0,50,38,.2)" />

      {/* 徽章：压在建筑右下，打破完全对称，避免呆板 */}
      <g transform="translate(150,78)">
        <path
          d="M0 0 L34 0 L34 22 Q34 38 17 46 Q0 38 0 22 Z"
          fill="rgba(255,255,255,.94)"
        />
        <path
          d="M9 21 l6 7 l12 -14"
          fill="none"
          stroke="#17836a"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}
