import { Link } from 'react-router-dom'
import { AIR, ALERTS, FORECAST, HOURLY, LIFE_INDEX, NEWS, TODAY, WX_META } from '../data/weather'
import { WxIcon, AlertBadge } from '../components/WxIcon'
import { WX } from '@/shared/routes'
import { cn } from '@/shared/lib/cn'

export function WxHome() {
  const maxT = Math.max(...FORECAST.map((d) => d.high))
  const minT = Math.min(...FORECAST.map((d) => d.low))

  return (
    <div className="space-y-3">
      {/* ── 实况 + 空气质量 + 预警 ── */}
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <section className="wx-panel">
          <div className="wx-hd">
            <h2 className="wx-hd-t">城区实况</h2>
            <span className="text-[12px] text-wx-faint">
              {TODAY.station} · {TODAY.updated} 发布
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 px-5 py-5">
            <WxIcon p={TODAY.phenomenon} size={72} />
            <div>
              <div className="flex items-start">
                <span className="text-[54px] font-light leading-none tabular-nums text-wx-head">
                  {TODAY.temp}
                </span>
                <span className="mt-1 text-[20px] text-wx-sub">℃</span>
              </div>
              <div className="mt-1 text-[14px] text-wx-sub">
                {TODAY.phenomenon} · {TODAY.low} ~ {TODAY.high} ℃
              </div>
            </div>

            <dl className="ml-auto grid grid-cols-2 gap-x-8 gap-y-1.5 text-[13px] sm:grid-cols-3">
              {[
                ['风向风力', TODAY.wind],
                ['相对湿度', `${TODAY.humidity}%`],
                ['气压', `${TODAY.pressure} hPa`],
                ['能见度', `${TODAY.visibility} km`],
                ['日出', TODAY.sunrise],
                ['日落', TODAY.sunset],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline gap-2">
                  <dt className="text-wx-faint">{k}</dt>
                  <dd className="tabular-nums text-wx-text">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* 逐小时缩略 */}
          <div className="border-t border-wx-line2 px-3 py-2.5">
            <div className="mb-1.5 flex items-baseline justify-between">
              <span className="text-[12.5px] text-wx-sub">逐小时</span>
              <Link to={WX.hourly} className="wx-more">
                完整实况 ›
              </Link>
            </div>
            <div className="flex gap-1 overflow-x-auto pb-1">
              {HOURLY.slice(0, 12).map((h) => (
                <div
                  key={h.time}
                  className="flex w-[62px] shrink-0 flex-col items-center gap-1 border border-wx-line2 py-1.5"
                >
                  <span className="text-[11px] tabular-nums text-wx-faint">{h.time}</span>
                  <WxIcon p={h.phenomenon} size={22} />
                  <span className="text-[12.5px] tabular-nums text-wx-text">{h.temp}°</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="space-y-3">
          <section className="wx-panel">
            <div className="wx-hd">
              <h2 className="wx-hd-t">空气质量</h2>
            </div>
            <div className="px-4 py-3">
              <div className="flex items-baseline gap-3">
                <span className="text-[34px] font-light leading-none tabular-nums text-wx-yellow">
                  {AIR.aqi}
                </span>
                <span className="text-[15px] text-wx-text">{AIR.level}</span>
                <span className="ml-auto text-[12px] text-wx-faint">首要污染物 {AIR.primary}</span>
              </div>
              <dl className="mt-3 grid grid-cols-3 gap-x-3 gap-y-1.5 border-t border-wx-line2 pt-2.5 text-[12px]">
                {AIR.items.map((i) => (
                  <div key={i.name}>
                    <dt className="text-wx-faint">{i.name}</dt>
                    <dd className="tabular-nums text-wx-text">{i.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <section className="wx-panel">
            <div className="wx-hd">
              <h2 className="wx-hd-t">预警信息</h2>
            </div>
            <div className="divide-y divide-wx-line2">
              {ALERTS.map((a) => (
                <div key={a.id} className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <AlertBadge level={a.level} label={a.title} size="sm" />
                    <span className="ml-auto text-[11px] text-wx-faint">{a.status}</span>
                  </div>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-wx-sub">{a.text}</p>
                  <div className="mt-1.5 text-[11px] text-wx-faint">
                    {a.org} · {a.time}
                  </div>
                </div>
              ))}
              <div className="px-4 py-2.5 text-[12px] text-wx-faint">
                当前无生效中的气象灾害预警信号。
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ── 七天预报 ── */}
      <section className="wx-panel">
        <div className="wx-hd">
          <h2 className="wx-hd-t">七天预报</h2>
          <Link to={WX.forecast} className="wx-more">
            更多 ›
          </Link>
        </div>
        <div className="grid grid-cols-4 divide-x divide-wx-line2 md:grid-cols-7">
          {FORECAST.map((d, i) => (
            <div key={d.date} className={cn('px-2 py-3 text-center', i === 0 && 'bg-[#f4f9fe]')}>
              <div className="text-[13px] text-wx-text">{d.weekday}</div>
              <div className="text-[11.5px] tabular-nums text-wx-faint">{d.date}</div>
              <div className="my-2 flex justify-center">
                <WxIcon p={d.day} size={34} />
              </div>
              <div className="text-[12.5px] text-wx-sub">{d.day}</div>
              <div className="mt-1 text-[13px] tabular-nums text-wx-text">
                {d.high}° / {d.low}°
              </div>
              {/* 温度条 */}
              <div className="mx-auto mt-2 h-1.5 w-12 overflow-hidden bg-wx-line2">
                <div
                  className="h-full bg-gradient-to-r from-[#63a2dd] to-[#e08b3a]"
                  style={{
                    marginLeft: `${((d.low - minT) / (maxT - minT)) * 60}%`,
                    width: `${((d.high - d.low) / (maxT - minT)) * 100}%`,
                  }}
                />
              </div>
              <div className="mt-2 text-[11px] text-wx-faint">{d.wind}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 生活指数 + 资讯 + 数据服务 ── */}
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="wx-panel">
          <div className="wx-hd">
            <h2 className="wx-hd-t">生活气象指数</h2>
            <span className="text-[12px] text-wx-faint">{TODAY.date} 发布</span>
          </div>
          <div className="grid grid-cols-2 divide-x divide-y divide-wx-line2 sm:grid-cols-4">
            {LIFE_INDEX.map((l) => (
              <div key={l.name} className="px-3 py-2.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-[12.5px] text-wx-sub">{l.name}</span>
                  <span className="text-[13px] font-medium text-wx-head">{l.level}</span>
                </div>
                <p className="mt-1 text-[11.5px] leading-snug text-wx-faint">{l.note}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="space-y-3">
          <section className="wx-panel">
            <div className="wx-hd">
              <h2 className="wx-hd-t">数据服务</h2>
            </div>
            <div className="grid grid-cols-2 gap-px bg-wx-line2">
              {[
                { to: WX.history, name: '历史资料查询', note: '1953 年至今' },
                { to: WX.stations, name: '气象站网', note: '10 个站点' },
                { to: WX.hourly, name: '实况观测', note: '逐小时' },
                { to: WX.about, name: '关于本站', note: '资料说明' },
              ].map((s) => (
                <Link key={s.to} to={s.to} className="bg-white px-3 py-3 hover:bg-[#f4f9fe]">
                  <div className="text-[13.5px] text-wx-head">{s.name}</div>
                  <div className="mt-0.5 text-[11.5px] text-wx-faint">{s.note}</div>
                </Link>
              ))}
            </div>
          </section>

          <section className="wx-panel">
            <div className="wx-hd">
              <h2 className="wx-hd-t">通知公告</h2>
            </div>
            <ul className="divide-y divide-wx-line2">
              {NEWS.map((n) => (
                <li key={n.title} className="flex items-baseline gap-2 px-3 py-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 bg-wx-faint" />
                  <span className="min-w-0 flex-1 truncate text-[12.5px] text-wx-text hover:text-wx-head">
                    {n.title}
                  </span>
                  <span className="shrink-0 text-[11px] tabular-nums text-wx-faint">{n.date}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <p className="border border-wx-line bg-white px-4 py-2.5 text-[11.5px] leading-relaxed text-wx-faint">
        本站发布的实况、预报及预警信息由{WX_META.org}制作发布，最终解释权归本单位所有。
        气象灾害预警信号以本站及市级广播电视媒体同步发布为准。历史资料仅供参考，
        不作为法律证据使用。
      </p>
    </div>
  )
}
