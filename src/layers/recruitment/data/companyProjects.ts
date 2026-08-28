import { LG } from '@/shared/routes'

/**
 * 企业主页里「项目沿革」条目的详情页。
 *
 * 这一页是第一层与第二层之间的转接口，但它自己完全不知道这件事——
 * 它只是一个字段没填全的历史项目页，配一条平台的通用提示：资料正在迁移。
 * 提示下面按平台惯例列出著录来源，来源恰好是另一个网站。
 */

export interface CompanyProjectDetail {
  id: string
  companyId: string
  name: string
  /** 同一项目在其它资料中的著录名称。改制与整编过程中改名很常见。 */
  altName?: string
  code: string
  period: string
  status: string
  originalUnit: string
  role: string
  summary: string[]
  meta: { label: string; value: string; muted?: boolean }[]
  members: { personId?: string; name: string; role: string; note?: string }[]
  /** 平台的通用提示条，中性样式，不是警告。 */
  notice: { title: string; lines: string[] }
  /** 著录来源。第二层的入口就在这里。 */
  sources: { label: string; domain: string; to: string; note: string }[]
}

export const COMPANY_PROJECTS: CompanyProjectDetail[] = [
  {
    id: 'YL-87-03',
    companyId: 'HBSC',
    name: '云岭地区水文测绘项目',
    altName: '云岭地区地下水调查',
    code: 'YL-87-03',
    period: '1987.04 — 1988.06',
    status: '已结束',
    originalUnit: '北岭市水文地质工程勘察队',
    role: '承继保管',
    summary: [
      '本项目为北岭市云岭乡一带的区域地下水调查与水文测绘工作，内容包括观测井网布设、水位与井温的定期观测、区域水文地质条件评价。',
      '项目卷册于 2013 年随原承担单位的历史资料一并移交本公司代管。本页信息由 2013 年资料整编时自动导入，未经逐条核校。',
      '本项目在部分外部资料中著录为「云岭地区地下水调查」，两个名称指向同一项目编号。',
    ],
    meta: [
      { label: '项目编号', value: 'YL-87-03' },
      { label: '项目类型', value: '区域水文地质调查' },
      { label: '观测点位', value: '17 处' },
      { label: '结题报告', value: '未提交', muted: true },
      { label: '验收情况', value: '未著录', muted: true },
      { label: '资料载体', value: '纸质、磁性介质' },
      { label: '卷册数量', value: '31 册' },
      { label: '数字化进度', value: '未开始', muted: true },
    ],
    members: [
      { name: '邵文岐', role: '项目负责人' },
      { personId: 'JIANZHIYUAN', name: '简致远', role: '测量员' },
      { personId: 'WEIYUN', name: '韦昀', role: '项目顾问', note: '聘用文号未著录' },
    ],
    notice: {
      title: '资料正在迁移',
      lines: [
        '本公司历史项目资料的数字化工作正在分批进行，部分历史项目资料暂不可在线访问。',
        '一九九八年之前的项目详情、附件与图件尚未纳入本平台展示范围。如需调阅，请联系本公司资料部。',
      ],
    },
    sources: [
      {
        label: '云岭地区地下水调查 · 项目卷册目录',
        domain: 'bl-eng-data.org.cn',
        to: LG.project('YL-87-03'),
        note: '北岭地区工程资料库 · 收录编号 YL-87-03 · 由行业协会资料工作委员会著录',
      },
    ],
  },
]

export const COMPANY_PROJECT_BY_ID = new Map(COMPANY_PROJECTS.map((p) => [p.id, p]))

export function getCompanyProject(id: string): CompanyProjectDetail | undefined {
  return COMPANY_PROJECT_BY_ID.get(id)
}
