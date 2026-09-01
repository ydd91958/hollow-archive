import { Link } from 'react-router-dom'
import { FORECAST, HOURLY, STATIONS, TODAY, WX_META } from '../data/weather'
import { WxIcon } from '../components/WxIcon'
import { PhotoFrame } from '@/shared/components/photo/PhotoFrame'
import { ObservatoryScene } from '@/shared/components/photo/scenes'
import { LG, WX } from '@/shared/routes'
import { cn } from '@/shared/lib/cn'

/* ══════════════════ 预报服务 ══════════════════ */

export function WxForecast() {
  return (
    <div className="space-y-3">
      <nav className="text-[12px] text-wx-faint">
        首页 <span className="mx-1">›</span> 预报服务
      </nav>

      <section className="wx-panel">
        <div className="wx-hd">
          <h2 className="wx-hd-t">城区七天预报</h2>
          <span className="text-[12px] text-wx-faint">{TODAY.date} {TODAY.updated} 发布</span>
        </div>
        <div className="overflow-x-auto p-3">
          <table className="wx-table">
            <thead>
              <tr>
                <th className="w-28">日期</th>
                <th className="w-24">白天</th>
                <th className="w-24">夜间</th>
                <th className="w-28">最高 / 最低</th>
                <th className="w-32">风向风力</th>
                <th className="w-24">空气质量</th>
              </tr>
            </thead>
            <tbody>
              {FORECAST.map((d) => (
                <tr key={d.date}>
                  <td className="tabular-nums">
                    {d.date} {d.weekday}
                  </td>
                  <td>
                    <span className="flex items-center gap-1.5">
                      <WxIcon p={d.day} size={20} />
                      {d.day}
                    </span>
                  </td>
                  <td>
                    <span className="flex items-center gap-1.5">
                      <WxIcon p={d.night} size={20} />
                      {d.night}
                    </span>
                  </td>
                  <td className="tabular-nums">
                    {d.high} ℃ / {d.low} ℃
                  </td>
                  <td>{d.wind}</td>
                  <td>{d.aqi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid gap-3 md:grid-cols-2">
        <section className="wx-panel">
          <div className="wx-hd">
            <h2 className="wx-hd-t">天气趋势</h2>
          </div>
          <div className="px-4 py-4">
            <svg viewBox="0 0 520 150" className="w-full" role="img" aria-label="七天气温趋势">
              {[0, 1, 2, 3].map((i) => (
                <line
                  key={i}
                  x1="30"
                  x2="510"
                  y1={20 + i * 34}
                  y2={20 + i * 34}
                  stroke="#e6ecf2"
                  strokeWidth="1"
                />
              ))}
              {(() => {
                const hi = FORECAST.map((d) => d.high)
                const lo = FORECAST.map((d) => d.low)
                const max = Math.max(...hi) + 2
                const min = Math.min(...lo) - 2
                const y = (v: number) => 20 + (1 - (v - min) / (max - min)) * 102
                const x = (i: number) => 44 + i * 76
                const line = (arr: number[]) => arr.map((v, i) => `${x(i)},${y(v)}`).join(' ')
                return (
                  <>
                    <polyline points={line(hi)} fill="none" stroke="#e07b1a" strokeWidth="2" />
                    <polyline points={line(lo)} fill="none" stroke="#2f6fd0" strokeWidth="2" />
                    {hi.map((v, i) => (
                      <g key={`h${i}`}>
                        <circle cx={x(i)} cy={y(v)} r="3" fill="#e07b1a" />
                        <text x={x(i)} y={y(v) - 8} textAnchor="middle" fontSize="11" fill="#556575">
                          {v}
                        </text>
                      </g>
                    ))}
                    {lo.map((v, i) => (
                      <g key={`l${i}`}>
                        <circle cx={x(i)} cy={y(v)} r="3" fill="#2f6fd0" />
                        <text x={x(i)} y={y(v) + 16} textAnchor="middle" fontSize="11" fill="#556575">
                          {v}
                        </text>
                      </g>
                    ))}
                    {FORECAST.map((d, i) => (
                      <text key={d.date} x={x(i)} y={144} textAnchor="middle" fontSize="10.5" fill="#8a97a5">
                        {d.date}
                      </text>
                    ))}
                  </>
                )
              })()}
            </svg>
          </div>
        </section>

        <section className="wx-panel">
          <div className="wx-hd">
            <h2 className="wx-hd-t">预报说明</h2>
          </div>
          <div className="space-y-2 px-4 py-4 text-[12.5px] leading-relaxed text-wx-sub">
            <p>本预报由本局预报科每日 08 时、11 时、17 时、20 时四次订正发布，以最新一次为准。</p>
            <p>预报覆盖范围为北岭市城区。乡镇预报请查询对应区域自动站页面。</p>
            <p>降水量按 24 小时累计统计，统计时段为当日 20 时至次日 20 时。</p>
            <p className="text-wx-faint">
              预报为参考信息，实际天气可能与预报存在偏差。涉及生产安全的决策请另行咨询本局。
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

/* ══════════════════ 实况观测 ══════════════════ */

export function WxHourly() {
  return (
    <div className="space-y-3">
      <nav className="text-[12px] text-wx-faint">
        首页 <span className="mx-1">›</span> 实况观测
      </nav>

      <section className="wx-panel">
        <div className="wx-hd">
          <h2 className="wx-hd-t">逐小时观测实况</h2>
          <span className="text-[12px] text-wx-faint">{TODAY.station}</span>
        </div>
        <div className="overflow-x-auto p-3">
          <table className="wx-table">
            <thead>
              <tr>
                <th className="w-20">时次</th>
                <th className="w-24">天气现象</th>
                <th className="w-24">气温（℃）</th>
                <th className="w-28">相对湿度</th>
                <th className="w-32">风向风力</th>
                <th className="w-28">降水量（mm）</th>
              </tr>
            </thead>
            <tbody>
              {HOURLY.map((h) => (
                <tr key={h.time}>
                  <td className="tabular-nums">{h.time}</td>
                  <td>
                    <span className="flex items-center gap-1.5">
                      <WxIcon p={h.phenomenon} size={18} />
                      {h.phenomenon}
                    </span>
                  </td>
                  <td className="tabular-nums">{h.temp}</td>
                  <td className="tabular-nums">{h.humidity}%</td>
                  <td>{h.wind}</td>
                  <td className="tabular-nums">{h.precip.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="border-t border-wx-line2 px-4 py-2.5 text-[12px] text-wx-faint">
          实况数据每小时更新一次，来源为国家基本气象站自动观测系统。历史日期请使用
          <Link to={WX.history} className="wx-link mx-1">
            历史资料查询
          </Link>
          。
        </p>
      </section>
    </div>
  )
}

/* ══════════════════ 气象站网 ══════════════════ */

export function WxStations() {
  return (
    <div className="space-y-3">
      <nav className="text-[12px] text-wx-faint">
        首页 <span className="mx-1">›</span> 气象站网
      </nav>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="wx-panel">
          <div className="wx-hd">
            <h2 className="wx-hd-t">北岭市气象观测站网分布示意图</h2>
            <span className="text-[12px] text-wx-faint">非精确比例</span>
          </div>
          <div className="p-3">
            <svg viewBox="0 0 100 78" className="w-full" role="img" aria-label="站网分布示意图">
              {/* 市域边界 */}
              <path
                d="M12 22 L26 10 L52 8 L74 12 L88 26 L90 46 L80 64 L58 72 L32 70 L16 58 L10 40 Z"
                fill="#f2f7fb"
                stroke="#9fb6c9"
                strokeWidth="0.6"
              />
              {/* 河 */}
              <path
                d="M20 16 Q36 30 40 44 T56 68"
                fill="none"
                stroke="#a9cbe6"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              {/* 山地示意 */}
              <path d="M64 18 L70 12 L76 18 Z" fill="#d7e2d2" />
              <path d="M72 22 L80 14 L88 24 Z" fill="#d7e2d2" />
              {/* 城区 */}
              <rect x="38" y="44" width="16" height="12" fill="#e4ebf2" stroke="#b9c9d6" strokeWidth="0.5" />
              <text x="46" y="51.5" textAnchor="middle" fontSize="2.6" fill="#556575">
                城区
              </text>
              <text x="74" y="34" textAnchor="middle" fontSize="2.6" fill="#556575">
                云岭
              </text>

              {/* 站点 */}
              {STATIONS.map((s) => {
                const closed = s.status !== '在用'
                return (
                  <g key={s.code}>
                    <circle
                      cx={s.x}
                      cy={s.y}
                      r={s.kind === '国家基本站' ? 1.7 : 1.2}
                      fill={closed ? '#ffffff' : s.kind === '区域自动站' ? '#2f6fd0' : '#1a5b9e'}
                      stroke={closed ? '#8a97a5' : 'none'}
                      strokeWidth="0.5"
                      strokeDasharray={closed ? '0.8 0.6' : undefined}
                    />
                    <text
                      x={s.x + 2.4}
                      y={s.y + 0.9}
                      fontSize="2.3"
                      fill={closed ? '#8a97a5' : '#1b2733'}
                    >
                      {s.name}
                    </text>
                  </g>
                )
              })}
            </svg>

            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 border-t border-wx-line2 pt-2 text-[11.5px] text-wx-sub">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-wx-head" />
                国家站
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-wx-blue" />
                区域自动站
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full border border-dashed border-wx-faint bg-white" />
                已迁移 / 已撤销
              </span>
            </div>
          </div>
        </section>

        <section className="wx-panel">
          <div className="wx-hd">
            <h2 className="wx-hd-t">观测场</h2>
          </div>
          <div className="p-3">
            <PhotoFrame treatment="scan" caption="北岭国家基本气象站观测场（气象路现址）">
              <ObservatoryScene width={310} height={194} />
            </PhotoFrame>
            <p className="mt-3 text-[12px] leading-relaxed text-wx-sub">
              观测场占地 25×25 米，四周设 1.2 米高稀疏围栏。场内按规范布设百叶箱、雨量筒、
              风向风速传感器及地温场。
            </p>
          </div>
        </section>
      </div>

      <section className="wx-panel">
        <div className="wx-hd">
          <h2 className="wx-hd-t">站点一览</h2>
          <span className="text-[12px] text-wx-faint">共 {STATIONS.length} 个</span>
        </div>
        <div className="overflow-x-auto p-3">
          <table className="wx-table">
            <thead>
              <tr>
                <th className="w-28">区站号</th>
                <th className="w-40">站名</th>
                <th className="w-32">类别</th>
                <th className="w-24">建站</th>
                <th className="w-24">拔海高度</th>
                <th className="w-24">状态</th>
                <th>备注</th>
              </tr>
            </thead>
            <tbody>
              {STATIONS.map((s) => (
                <tr key={s.code} className={cn(s.status !== '在用' && 'text-wx-faint')}>
                  <td className="tabular-nums">{s.code}</td>
                  <td>{s.name}</td>
                  <td>{s.kind}</td>
                  <td className="tabular-nums">{s.since}</td>
                  <td className="tabular-nums">{s.altitude}</td>
                  <td>{s.status}</td>
                  <td className="text-wx-sub">{s.note ?? ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

/* ══════════════════ 关于本站 ══════════════════ */

export function WxAbout() {
  return (
    <div className="space-y-3">
      <nav className="text-[12px] text-wx-faint">
        首页 <span className="mx-1">›</span> 关于本站
      </nav>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="space-y-3">
          <section className="wx-panel">
            <div className="wx-hd">
              <h2 className="wx-hd-t">本站简介</h2>
            </div>
            <div className="space-y-3 px-5 py-4 text-[13px] leading-[1.9] text-wx-sub">
              <p>
                {WX_META.platform}由{WX_META.org}
                主办，面向社会公众提供天气预报、实况观测、气象灾害预警信号及历史气象资料查询服务。
              </p>
              <p>
                本局始建于一九五三年，现辖国家基本气象站一个、国家一般气象站一个、
                区域自动气象站七个。台站沿革及站点变动情况详见气象站网页面。
              </p>
              <p>
                本站于二〇〇九年首次开通，二〇一九年完成集约化改版。当前版本发布于二〇二三年三月。
              </p>
            </div>
          </section>

          <section className="wx-panel">
            <div className="wx-hd">
              <h2 className="wx-hd-t">历史资料说明</h2>
            </div>
            <div className="space-y-3 px-5 py-4 text-[13px] leading-[1.9] text-wx-sub">
              <p>
                本站提供一九五三年建站以来的地面气象观测资料查询。其中一九九八年及以前的资料，
                原始载体为纸质观测簿、自记纸和月报表。
              </p>
              <p>
                二〇一四年至二〇一五年，本局按上级部署开展纸质气象记录档案数字化工作，
                共扫描录入观测簿一万四千余册、自记纸约二十三万张。该项工作于二〇一五年十月通过验收。
              </p>
              <p>
                数字化遵循原样录入原则。原件存在破损、霉变、褪色、缺页的，按缺测处理并在记录中标注，
                不作推算、不作补录。自记纸缺损段在逐时记录中以缺损标记表示，该时段无观测数据。
              </p>
              <p>
                部分早期专用观测站的资料由原设站单位移交本局代管。此类资料的完整性以移交清单为准，
                本局不对移交前的记录负责。
                <Link to={LG.home} className="wx-link ml-1">
                  相关工程项目著录可查询北岭地区工程资料库
                </Link>
                。
              </p>
              <p className="text-wx-faint">
                公众对历史天气的记忆与本站记录不一致的情况较为常见。本站不受理据此提出的更正申请。
              </p>
            </div>
          </section>
        </div>

        <div className="space-y-3">
          <section className="wx-panel">
            <div className="wx-hd">
              <h2 className="wx-hd-t">联系方式</h2>
            </div>
            <dl className="divide-y divide-wx-line2 text-[12.5px]">
              {[
                ['主办单位', WX_META.org],
                ['地址', WX_META.address],
                ['办公电话', WX_META.tel],
                ['天气预报电话', WX_META.weatherPhone],
                ['业务科（资料查询）', '0311-8624 1137'],
                ['值班（24 小时）', '0311-8624 1100'],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-3 px-4 py-2">
                  <dt className="w-28 shrink-0 text-wx-faint">{k}</dt>
                  <dd className="min-w-0 flex-1 text-wx-text">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="wx-panel">
            <div className="wx-hd">
              <h2 className="wx-hd-t">网站维护记录</h2>
            </div>
            <ul className="divide-y divide-wx-line2 text-[12px]">
              {[
                ['2023-03-18', '改版上线，调整栏目结构'],
                ['2021-06-02', '增加区域自动站实况接入'],
                ['2019-11-25', '按集约化要求迁移至政务云'],
                ['2015-10-22', '历史资料查询模块上线'],
                ['2013-08-09', '服务器迁移，历史数据接口暂停'],
                ['2009-04-30', '本站开通'],
              ].map(([d, t]) => (
                <li key={d} className="flex gap-3 px-4 py-2">
                  <span className="shrink-0 tabular-nums text-wx-faint">{d}</span>
                  <span className="min-w-0 flex-1 text-wx-sub">{t}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
