import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getProject } from '../data/projects'
import { useSignal } from '@/shared/lib/useSignals'
import { useTrace } from '@/shared/state/useTrace'
import { LG } from '@/shared/routes'
import { SYS_ROOT } from '@/layers/archive/paths'

type Phase = 'connecting' | 'error' | 'handoff'

/**
 * 第三层的门。
 *
 * 它看起来只是一条失效的附件链接。点开之后先给一个再普通不过的
 * 服务器错误——旧站上到处都是这种页面——错误页停留几秒，
 * 然后才露出一行不属于这个网站的东西，接着跳走。
 *
 * 这里不写任何"欢迎进入秘密数据库"式的文案。整页只有三条状态。
 */
export function LegacyAttach() {
  const { id = '', attachId = '' } = useParams()
  const navigate = useNavigate()
  const project = getProject(id)
  const allowed = useSignal('SIG_ATTACHMENT')
  const note = useTrace((s) => s.note)
  const [phase, setPhase] = useState<Phase>('connecting')

  const attachment = project?.attachments.find((a) => a.id === attachId)

  useEffect(() => {
    if (!allowed || !attachment) return
    note(`doc:${attachId}`)

    const t1 = window.setTimeout(() => setPhase('error'), 1400)
    const t2 = window.setTimeout(() => setPhase('handoff'), 4200)
    const t3 = window.setTimeout(() => navigate(SYS_ROOT, { replace: true }), 7000)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.clearTimeout(t3)
    }
  }, [allowed, attachment, attachId, note, navigate])

  /* 信号未成立，或附件不存在：就是一条普通的死链。 */
  if (!allowed || !attachment) {
    return (
      <div className="space-y-3">
        <div className="lg-bar">404 - 未找到</div>
        <p className="leading-relaxed">
          您请求的附件不存在，或存储路径已在服务器迁移中失效。
        </p>
        <p className="text-[11px] text-[#666]">
          请求路径：/attach/{id}/{attachId}
        </p>
        <Link to={LG.project(id)} className="lg-link">
          « 返回项目著录信息
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {phase === 'connecting' && (
        <>
          <div className="lg-bar">正在获取附件</div>
          <p className="leading-relaxed">
            正在连接附件服务器，请稍候……
          </p>
          <p className="text-[11px] text-[#666]">
            {attachment.id} · {attachment.name}
          </p>
        </>
      )}

      {phase === 'error' && (
        <>
          <div className="lg-bar">500 - 服务器内部错误</div>
          <div className="border border-[#999] bg-[#fff8f8] p-3 leading-relaxed">
            <p className="mb-2 font-bold text-[#cc0000]">附件服务器未能返回有效响应。</p>
            <p>
              请求已转发至保管单位的资料系统，但该系统未在预期时间内应答。您可以稍后重试，
              或直接与保管单位联系。
            </p>
          </div>
          <table className="lg-table text-[11px]">
            <tbody>
              <tr>
                <th className="w-28">请求编号</th>
                <td>{attachment.id}</td>
              </tr>
              <tr>
                <th>转发目标</th>
                <td className="text-[#666]">保管单位资料系统（未著录名称）</td>
              </tr>
              <tr>
                <th>响应</th>
                <td className="text-[#cc0000]">超时</td>
              </tr>
            </tbody>
          </table>
          <Link to={LG.project(id)} className="lg-link">
            « 返回项目著录信息
          </Link>
        </>
      )}

      {phase === 'handoff' && (
        <div className="animate-fadein space-y-2 border border-[#999] bg-[#0c1012] p-4 font-mono text-[12px] text-[#71827f]">
          <div>· 转发目标已应答，延迟 00:41</div>
          <div>· 应答方未提供系统名称</div>
          <div>· 该请求编号在对方目录中存在，且已被登记过一次</div>
          <div className="text-[#c9a227]">· 登记时间早于本次请求</div>
          <div className="pt-2 text-[#b3402f]">正在移交会话……</div>
        </div>
      )}
    </div>
  )
}
