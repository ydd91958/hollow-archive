import { Link } from 'react-router-dom'
import { PROJECTS, PROJECT_DETAILS, SITE_META } from '../data/projects'
import { LG } from '@/shared/routes'

export function LegacyHome() {
  return (
    <div className="space-y-4">
      <div className="lg-bar">项目索引</div>

      <p className="leading-relaxed text-[#333]">
        本索引收录北岭地区一九七九年以来的水文地质与工程勘察项目著录信息，共 {PROJECTS.length} 条。
        著录内容依据各承担单位提交的卷册封面誊录，未作校核。带链接的条目可查看详细著录。
      </p>

      <table className="lg-table text-[12px]">
        <thead>
          <tr>
            <th className="w-24">项目编号</th>
            <th>项目名称</th>
            <th className="w-52">承担单位</th>
            <th className="w-36">起止时间</th>
            <th className="w-16">状态</th>
          </tr>
        </thead>
        <tbody>
          {PROJECTS.map((p) => {
            const hasDetail = Boolean(PROJECT_DETAILS[p.id])
            return (
              <tr key={p.id}>
                <td className="whitespace-nowrap">{p.id}</td>
                <td>
                  {hasDetail ? (
                    <Link to={LG.project(p.id)} className="lg-link">
                      {p.name}
                    </Link>
                  ) : (
                    <span className="text-[#666]">{p.name}</span>
                  )}
                </td>
                <td>{p.unit}</td>
                <td className="whitespace-nowrap">{p.period}</td>
                <td className={p.status === '终止' ? 'text-[#cc0000]' : ''}>{p.status}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="text-[11px] text-[#666]">
        共 1 页 · 未提供详细著录的条目，其卷册目录尚未录入本站。
      </div>

      <div className="lg-bar mt-6">本站公告</div>
      <table className="lg-table text-[12px]">
        <tbody>
          <tr>
            <td className="w-24 whitespace-nowrap text-[#666]">2009-11-16</td>
            <td>
              受经费影响，本站自即日起暂停内容更新。已录入内容继续保留查询。恢复更新时间另行通知。
            </td>
          </tr>
          <tr>
            <td className="whitespace-nowrap text-[#666]">2009-06-02</td>
            <td>第四批项目著录（1996—1998 年度）录入完成。</td>
          </tr>
          <tr>
            <td className="whitespace-nowrap text-[#666]">2008-12-30</td>
            <td>
              关于征集一九六二至一九七八年度项目卷册著录信息的通知。请各保管单位与资料工作委员会联系。
            </td>
          </tr>
          <tr>
            <td className="whitespace-nowrap text-[#666]">2007-03-11</td>
            <td>本站附件下载服务器迁移完成。部分早期附件链接可能失效，正在逐步修复。</td>
          </tr>
        </tbody>
      </table>

      <p className="pt-2 text-[11px] leading-relaxed text-[#666]">{SITE_META.notice}</p>
    </div>
  )
}
