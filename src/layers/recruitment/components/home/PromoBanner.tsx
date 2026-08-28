import { Link } from 'react-router-dom'
import type { Special } from '../../data/specials'
import { CampusScene, SalaryScene, SoeScene } from './HeroArt'
import { ZY } from '@/shared/routes'

/**
 * 首屏运营位。
 *
 * 三张的色彩语义是分开的：秋招=品牌蓝（平台/招聘），薪酬=橙（薪资/热门），
 * 国企=深青绿（稳定/福利）。构图也刻意不同——秋招是横向叙事、薪酬是右下角
 * 重心、国企是居中对称，所以并排放不会像「三个换了底色的矩形」。
 */

export function CampusBanner({ special }: { special: Special }) {
  return (
    <Link
      to={ZY.special(special.id)}
      className="zy-promo zy-noise group bg-[linear-gradient(118deg,#0a2f5e_0%,#12508f_38%,#1d6cb8_68%,#2a83cf_100%)]"
    >
      {/* 顶部高光，给整块一点光源方向 */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/[0.10] to-transparent" />
      {/* 底部压暗，让文字更稳 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#061d3c]/35 to-transparent" />

      <div className="relative flex h-[322px] items-stretch">
        {/* ── 文案区 ── */}
        <div className="relative z-10 flex w-[53%] min-w-0 flex-col justify-center py-6 pl-8 pr-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-hot-600 px-2.5 py-1 text-[11px] font-medium text-white shadow-[0_2px_8px_rgba(239,104,32,.4)]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
              秋招进行中
            </span>
            <span className="rounded-full border border-white/25 px-2.5 py-1 text-[11px] text-white/80">
              职引研究中心
            </span>
          </div>

          <div className="mt-3.5 text-[15px] font-medium tracking-[0.3em] text-white/45">2026</div>
          <h2 className="mt-0.5 text-[40px] font-semibold leading-[1.08] tracking-tight text-white">
            秋招观察
          </h2>
          <p className="mt-2 text-[16px] text-white/75">哪些岗位正在增长？</p>

          <dl className="mt-4 flex flex-nowrap items-start gap-x-6">
            {special.stats.slice(0, 3).map((s) => (
              <div key={s.label}>
                <dd className="flex items-baseline gap-1">
                  <span className="whitespace-nowrap text-[22px] font-semibold tabular-nums leading-none text-white">
                    {s.value}
                  </span>
                  <span className="text-[11px] text-white/55">{s.unit}</span>
                </dd>
                <dt className="mt-1 whitespace-nowrap text-[11.5px] text-white/55">{s.label}</dt>
              </div>
            ))}
          </dl>

          <span className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-[13.5px] font-medium text-brand-900 shadow-[0_4px_14px_rgba(0,0,0,.2)] transition-all duration-200 ease-soft group-hover:gap-2.5 group-hover:shadow-[0_6px_20px_rgba(0,0,0,.28)]">
            查看完整报告
            <span aria-hidden="true">→</span>
          </span>
        </div>

        {/* ── 插画区 ── */}
        <div className="zy-promo-art pointer-events-none absolute inset-y-0 right-0 hidden w-[56%] sm:block">
          <CampusScene />
        </div>
      </div>
    </Link>
  )
}

/* ── 两个副运营位：颜色、插画、构图三者都不同 ─────────────── */
export function SubPromos() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* 薪酬报告 · 暖橙 · 重心右下 */}
      <div className="zy-promo zy-noise group cursor-pointer bg-[linear-gradient(125deg,#8f3f08_0%,#c2650f_45%,#e08a2a_100%)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/[0.10] to-transparent" />
        <div className="relative flex h-[136px] items-center">
          <div className="relative z-10 min-w-0 flex-1 py-4 pl-5 pr-1">
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10.5px] text-white">
              薪酬报告
            </span>
            <div className="mt-2 text-[20px] font-semibold leading-tight tracking-tight text-white">
              2025 秋季薪酬报告
            </div>
            <div className="mt-1.5 text-[11.5px] text-white/70">68 城 · 412 个岗位 · 免费查看</div>
          </div>
          <div className="zy-promo-art pointer-events-none absolute bottom-0 right-0 hidden h-full w-[52%] sm:block">
            <SalaryScene />
          </div>
        </div>
        <span className="zy-ad-mark">广告</span>
      </div>

      {/* 国企专区 · 深青绿 · 居中对称 */}
      <div className="zy-promo zy-noise group cursor-pointer bg-[linear-gradient(125deg,#08402f_0%,#116b52_48%,#1e8f6f_100%)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/[0.10] to-transparent" />
        <div className="relative flex h-[136px] items-center">
          <div className="relative z-10 min-w-0 flex-1 py-4 pl-5 pr-1">
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10.5px] text-white">
              专区
            </span>
            <div className="mt-2 text-[20px] font-semibold leading-tight tracking-tight text-white">
              国企 · 事业单位
            </div>
            <div className="mt-1.5 text-[11.5px] text-white/70">稳定编制 · 五险一金 · 定期体检</div>
          </div>
          <div className="zy-promo-art pointer-events-none absolute bottom-0 right-0 hidden h-full w-[50%] sm:block">
            <SoeScene />
          </div>
        </div>
        <span className="zy-ad-mark">广告</span>
      </div>
    </div>
  )
}

/* ── 内容区之间的横条广告 ───────────────────────────────── */
export function StripAd() {
  return (
    <div className="zy-promo zy-noise group cursor-pointer bg-[linear-gradient(100deg,#2b1f5e_0%,#453089_46%,#5a45ab_100%)] !shadow-[0_6px_20px_rgba(43,31,94,.22)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-white/[0.10] to-transparent" />
      <div className="relative flex items-center gap-4 px-6 py-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-[17px] font-semibold text-white ring-1 ring-inset ring-white/20">
          简
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[16.5px] font-medium tracking-tight text-white">
            简历诊断 · 30 项检查即时评分
          </div>
          <div className="mt-1 text-[12px] text-white/65">
            上传简历，一分钟得到可改进的具体建议 · 本周已有 21,486 人使用
          </div>
        </div>

        {/* 装饰：几条数据线，和紫色的「AI / 新兴」语义呼应 */}
        <svg
          className="zy-promo-art pointer-events-none absolute right-40 top-0 hidden h-full w-48 sm:block"
          viewBox="0 0 190 80"
          aria-hidden="true"
        >
          <path
            d="M0 62 Q34 56 56 40 T112 30 T186 8"
            fill="none"
            stroke="rgba(255,255,255,.22)"
            strokeWidth="2"
          />
          <path
            d="M0 74 Q40 66 68 54 T126 46 T186 26"
            fill="none"
            stroke="rgba(255,255,255,.13)"
            strokeWidth="2"
          />
          {[
            [56, 40],
            [112, 30],
            [186, 8],
          ].map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r="3" fill="rgba(255,255,255,.4)" />
          ))}
        </svg>

        <span className="relative hidden shrink-0 rounded-full bg-white px-5 py-2 text-[13px] font-medium text-[#3b2a78] transition-transform duration-200 ease-soft group-hover:scale-105 sm:block">
          免费诊断
        </span>
      </div>
      <span className="zy-ad-mark">广告</span>
    </div>
  )
}
