import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ECHO_GAP_LABEL, GAP_LABEL, HISTORY_RANGE, historyFor, STATIONS } from '../data/weather'
import { Echo } from '@/shared/components/Echo'
import { useTrace } from '@/shared/state/useTrace'
import { cn } from '@/shared/lib/cn'

/**
 * 历史资料查询。
 *
 * 任何日期都返回完整数据，只有 1987-11-03 的自记纸缺了一段。
 * 页面不解释、不标红、不加提示，两行边界摆在表里，玩家自己减。
 */
export function WxHistory() {
  const [params, setParams] = useSearchParams()
  const urlDate = params.get('d') ?? ''
  const [date, setDate] = useState(urlDate)
  const [station, setStation] = useState('54628')
  const note = useTrace((s) => s.note)

  useEffect(() => setDate(urlDate), [urlDate])

  const day = useMemo(() => (urlDate ? historyFor(urlDate) : null), [urlDate])

  useEffect(() => {
    if (day) note(`wx:${day.date}`)
  }, [day, note])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setParams(date ? { d: date } : {})
  }

  return (
    <div className="space-y-3">
      {/* 面包屑 */}
      <nav className="text-[12px] text-wx-faint">
        首页 <span className="mx-1">›</span> 历史资料 <span className="mx-1">›</span> 地面观测资料查询
      </nav>

      {/* 查询条件 */}
      <section className="wx-panel">
        <div className="wx-hd">
          <h2 className="wx-hd-t">地面观测资料查询</h2>
          <span className="text-[12px] text-wx-faint">
            可查询范围 {HISTORY_RANGE.min} 至 {HISTORY_RANGE.max}
          </span>
        </div>

        <form onSubmit={submit} className="flex flex-wrap items-end gap-x-6 gap-y-3 px-4 py-4">
          <label className="flex items-center gap-2 text-[13px] text-wx-sub">
            观测站
            <select
              className="wx-input"
              value={station}
              onChange={(e) => setStation(e.target.value)}
            >
              {STATIONS.filter((s) => s.status !== '已撤销').map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name}（{s.code}）
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-2 text-[13px] text-wx-sub">
            观测日期
            <input
              className="wx-input w-40 tabular-nums"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="YYYY-MM-DD"
              inputMode="numeric"
            />
          </label>

          <button className="wx-btn" type="submit">
            查询
          </button>

          <span className="text-[12px] text-wx-faint">
            单次仅可查询一日。批量资料请向本局业务科申请。
          </span>
        </form>
      </section>

      {/* 结果 */}
      {urlDate && !day && (
        <div className="wx-panel px-4 py-8 text-center text-[13px] text-wx-sub">
          未查询到该日期的观测资料。请确认日期格式为 YYYY-MM-DD，且在可查询范围内。
        </div>
      )}

      {day && (
        <>
          <section className="wx-panel">
            <div className="wx-hd">
              <h2 className="wx-hd-t">
                {day.date} 日概况
              </h2>
              <span className="text-[12px] text-wx-faint">{day.station}</span>
            </div>
            <dl className="grid grid-cols-2 divide-x divide-y divide-wx-line2 sm:grid-cols-5">
              {[
                ['天气现象', day.summary.phenomenon],
                ['最高气温', day.summary.high],
                ['最低气温', day.summary.low],
                ['日降水量', day.summary.precip],
                ['风向风力', day.summary.wind],
              ].map(([k, v]) => (
                <div key={k} className="px-4 py-3">
                  <dt className="text-[12px] text-wx-faint">{k}</dt>
                  <dd className="mt-1 text-[15px] tabular-nums text-wx-text">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="wx-panel">
            <div className="wx-hd">
              <h2 className="wx-hd-t">逐时观测记录</h2>
              <span className="text-[12px] text-wx-faint">共 {day.rows.length} 条</span>
            </div>
            <div className="overflow-x-auto p-3">
              <table className="wx-table">
                <thead>
                  <tr>
                    <th className="w-20">时次</th>
                    <th className="w-24">天气现象</th>
                    <th className="w-24">气温（℃）</th>
                    <th className="w-32">风向风力</th>
                    <th className="w-28">降水量（mm）</th>
                    <th>备注</th>
                  </tr>
                </thead>
                <tbody>
                  {day.rows.map((r) => (
                    <tr key={r.time} className={cn(r.gap && 'wx-gap')}>
                      <td className="tabular-nums">{r.time}</td>
                      <td>{r.phenomenon}</td>
                      <td className="tabular-nums">{r.temp}</td>
                      <td>{r.wind}</td>
                      <td className="tabular-nums">{r.precip}</td>
                      <td className="text-wx-faint">
                        {r.gap ? (
                          /* 回响。二期之后，缺损的原因从纸变成了人。
                             页面不承认自己改过。 */
                          <Echo
                            was={GAP_LABEL[r.time] ?? ''}
                            now={ECHO_GAP_LABEL[r.time] ?? GAP_LABEL[r.time] ?? ''}
                          />
                        ) : (
                          ''
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-wx-line2 px-4 py-3 text-[12px] leading-relaxed text-wx-sub">
              <div className="mb-1 text-wx-faint">资料说明</div>
              <p>{day.source}</p>
              {day.notes.map((n, i) => (
                <p key={i} className="mt-1">
                  {n}
                </p>
              ))}
            </div>
          </section>
        </>
      )}

      {!urlDate && (
        <section className="wx-panel">
          <div className="wx-hd">
            <h2 className="wx-hd-t">使用说明</h2>
          </div>
          <div className="space-y-2 px-4 py-4 text-[13px] leading-relaxed text-wx-sub">
            <p>
              本查询提供北岭市域内各观测站自建站以来的地面气象观测资料。一九五三年至一九九八年的资料来源于纸质观测簿与自记纸，
              已于二〇一五年完成数字化录入。
            </p>
            <p>
              纸质原件存在破损、缺页、字迹不清等情况的，数字化时按原样保留，不作推算和补录。
              自记纸缺损段在记录中以缺损标记表示，该时段无观测数据。
            </p>
            <p>
              一九九九年及以后的资料来源于自动气象站，采集频次为每小时一次，降水过程期间加密。
            </p>
            <p className="text-wx-faint">
              公众对历史天气的记忆与本站记录不一致的情况较为常见。本站不受理据此提出的更正申请。
              如对资料本身有疑问，可向本局业务科书面反映。
            </p>
          </div>
        </section>
      )}
    </div>
  )
}
