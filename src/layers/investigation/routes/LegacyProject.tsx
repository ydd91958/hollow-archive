import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getProject, type Station } from '../data/projects'
import { useTrace } from '@/shared/state/useTrace'
import { useSignal } from '@/shared/lib/useSignals'
import { LG } from '@/shared/routes'
import { cn } from '@/shared/lib/cn'

export function LegacyProject() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const project = getProject(id)
  const note = useTrace((s) => s.note)
  const gatewayOpen = useSignal('SIG_ATTACHMENT')
  const [openStation, setOpenStation] = useState<string | null>(null)

  useEffect(() => {
    if (project) note(`project:${project.id}`)
  }, [project, note])

  if (!project) {
    return (
      <div className="space-y-3">
        <div className="lg-bar">错误</div>
        <p>未找到该项目的著录信息。请返回索引页重新选择。</p>
        <Link to={LG.home} className="lg-link">
          « 返回项目索引
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="text-[11px]">
        <Link to={LG.home} className="lg-link">
          项目索引
        </Link>
        {' » '}
        <span>{project.id}</span>
      </div>

      <div className="lg-bar">项目著录信息</div>
      <table className="lg-table text-[12px]">
        <tbody>
          <tr>
            <th className="w-28">项目编号</th>
            <td className="w-64">{project.id}</td>
            <th className="w-28">项目状态</th>
            <td className={project.status === '终止' ? 'text-[#cc0000]' : ''}>{project.status}</td>
          </tr>
          <tr>
            <th>项目名称</th>
            <td colSpan={3}>{project.name}</td>
          </tr>
          <tr>
            <th>承担单位</th>
            <td colSpan={3}>{project.unit}</td>
          </tr>
          <tr>
            <th>起止时间</th>
            <td>{project.period}</td>
            <th>结题报告</th>
            <td>{project.report}</td>
          </tr>
        </tbody>
      </table>

      <div className="lg-bar">著录备注</div>
      <div className="border border-[#999] p-2 text-[12px] leading-relaxed">
        {project.remark.map((r, i) => (
          <p key={i} className="mb-1.5 last:mb-0">
            {i + 1}. {r}
          </p>
        ))}
      </div>

      <div className="lg-bar">项目人员名单</div>
      <table className="lg-table text-[12px]">
        <thead>
          <tr>
            <th className="w-12">序号</th>
            <th className="w-32">姓名</th>
            <th className="w-40">项目职务</th>
            <th>备注</th>
          </tr>
        </thead>
        <tbody>
          {project.staff.map((s, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td className={s.name === '（空白）' ? 'text-[#999]' : ''}>{s.name}</td>
              <td className={s.role === '（空白）' ? 'text-[#999]' : ''}>{s.role}</td>
              <td className="text-[#666]">{s.note ?? ''}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {project.stations && (
        <>
          <div className="lg-bar">观测点位一览</div>
          <table className="lg-table text-[12px]">
            <thead>
              <tr>
                <th className="w-20">点位编号</th>
                <th className="w-32">位置</th>
                <th className="w-20">井深</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              {project.stations.map((st) => (
                <StationRow
                  key={st.no}
                  station={st}
                  open={openStation === st.no}
                  onToggle={() => {
                    const next = openStation === st.no ? null : st.no
                    setOpenStation(next)
                    if (next && st.traceKey) note(st.traceKey as `well:${string}`)
                  }}
                />
              ))}
            </tbody>
          </table>
        </>
      )}

      <div className="lg-bar">卷内附件</div>
      <table className="lg-table text-[12px]">
        <thead>
          <tr>
            <th className="w-36">附件编号</th>
            <th>附件名称</th>
            <th className="w-20">大小</th>
            <th className="w-24">状态</th>
          </tr>
        </thead>
        <tbody>
          {project.attachments.map((a) => {
            const clickable = a.gateway ? gatewayOpen : a.state === '可下载'
            return (
              <tr key={a.id}>
                <td className="whitespace-nowrap">{a.id}</td>
                <td>
                  {clickable && a.gateway ? (
                    <button
                      className="lg-link"
                      onClick={() => navigate(LG.attach(project.id, a.id))}
                    >
                      {a.name}
                    </button>
                  ) : clickable ? (
                    <span className="lg-link cursor-default">{a.name}</span>
                  ) : (
                    <span className="text-[#666]">{a.name}</span>
                  )}
                </td>
                <td className="text-[#666]">{a.size}</td>
                <td
                  className={cn(
                    a.state === '可下载' ? 'text-[#006600]' : 'text-[#999]',
                    a.gateway && gatewayOpen && 'text-[#0000cc]',
                  )}
                >
                  {a.gateway && gatewayOpen ? '可访问' : a.state}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <p className="text-[11px] leading-relaxed text-[#666]">
        附件由原保管单位随卷提交，本站不作完整性核验。二〇〇七年服务器迁移后，部分早期附件的存储路径未能恢复。
      </p>
    </div>
  )
}

function StationRow({
  station,
  open,
  onToggle,
}: {
  station: Station
  open: boolean
  onToggle: () => void
}) {
  const expandable = Boolean(station.detail)

  return (
    <>
      <tr className={cn(expandable && 'cursor-pointer hover:bg-[#f0f4f8]')} onClick={expandable ? onToggle : undefined}>
        <td className="whitespace-nowrap">
          {expandable ? <span className="lg-link">{station.no}</span> : station.no}
        </td>
        <td>{station.place}</td>
        <td>{station.depth}</td>
        <td className={station.status.includes('封填') ? 'text-[#cc0000]' : 'text-[#666]'}>
          {station.status}
        </td>
      </tr>
      {expandable && open && (
        <tr>
          <td colSpan={4} className="bg-[#f7f9fb] leading-relaxed">
            <span className="text-[#666]">著录补充：</span>
            {station.detail}
          </td>
        </tr>
      )}
    </>
  )
}
