import type { Person } from '../types'
import { BBS, BLOG, LG } from '@/shared/routes'

/**
 * 项目成员资料页。
 *
 * 职引这类平台会把企业申报的项目成员做成聚合页面，来源写成「公开网络」。
 * 这正好给了第二层三个站点一个合理的出口——玩家不需要凭空知道它们存在，
 * 平台自己把来源列了出来。
 */
export const PEOPLE: Person[] = [
  {
    id: 'WEIYUN',
    name: '韦昀',
    title: '项目顾问',
    status: '资料不完整',
    statusTone: 'muted',
    workplace: '北岭市云岭乡（项目驻地）',
    projects: [
      {
        name: '云岭地区地下水调查',
        period: '1987.04—1988.06',
        role: '项目顾问',
        externalRef: 'YL-87-03',
      },
    ],
    colleagues: [
      { name: '邵文岐', role: '项目负责人' },
      { personId: 'JIANZHIYUAN', name: '简致远', role: '测量员' },
      { name: '（第四名成员，姓名字段为空）', role: '未填写', note: '该条记录在导入时即为空，非平台删除。' },
    ],
    documents: [
      { name: '项目成员登记表（1987）', meta: 'PDF · 1.2 MB', available: false },
      { name: '技术顾问聘用协议', meta: '来源单位未提供', available: false },
      { name: '云岭地区地下水调查 · 项目卷册目录', meta: '外部收录 · YL-87-03', available: true },
    ],
    systemNote:
      '本页信息由平台自动聚合，来源为企业申报资料与公开网络。平台不对早期项目资料的完整性作出保证。如信息有误，可联系企业更正。',
  },

  {
    id: 'JIANZHIYUAN',
    name: '简致远',
    title: '测量员（已退休）',
    status: '无在职记录',
    workplace: '北岭市',
    projects: [
      { name: '云岭地区地下水调查', period: '1987.04—1988.06', role: '测量员', externalRef: 'YL-87-03' },
      { name: '北岭城区供水管网普查', period: '1991.03—1992.09', role: '测量员' },
      { name: '北岭市地下水监测点复测', period: '1996.05—1998.10', role: '测量组组长' },
    ],
    colleagues: [
      { personId: 'WEIYUN', name: '韦昀', role: '项目顾问' },
      { name: '邵文岐', role: '项目负责人' },
    ],
    documents: [
      { name: '个人网页（本人提供）', meta: 'jianzhiyuan.blogcn.net', available: true },
      { name: '职称评审材料', meta: '来源单位未提供', available: false },
    ],
    systemNote: '本页信息由平台自动聚合，来源为企业申报资料与公开网络。',
  },

  {
    id: 'SHAOWENQI',
    name: '邵文岐',
    title: '项目负责人',
    status: '无在职记录',
    projects: [
      { name: '云岭地区地下水调查', period: '1987.04—1988.06', role: '项目负责人', externalRef: 'YL-87-03' },
      { name: '北岭西部岩溶水勘察', period: '1983.06—1985.11', role: '技术负责人' },
    ],
    colleagues: [
      { personId: 'WEIYUN', name: '韦昀', role: '项目顾问' },
      { personId: 'JIANZHIYUAN', name: '简致远', role: '测量员' },
    ],
    documents: [{ name: '项目结题报告（1988）', meta: '状态：未提交', available: false }],
    systemNote: '本页信息由平台自动聚合，来源为企业申报资料与公开网络。',
  },
]

export const PERSON_BY_ID = new Map(PEOPLE.map((p) => [p.id, p]))

export function getPerson(id: string): Person | undefined {
  return PERSON_BY_ID.get(id)
}

/** 「资料来源」区块里列出的站外链接。平台把它们当作公开网络来源。 */
export interface SourceLink {
  label: string
  domain: string
  to: string
  note: string
}

export const PERSON_SOURCES: Record<string, SourceLink[]> = {
  WEIYUN: [
    {
      label: '云岭地区地下水调查 · 项目卷册目录',
      domain: 'bl-eng-data.org.cn',
      to: LG.project('YL-87-03'),
      note: '北岭地区工程资料库 · 收录编号 YL-87-03',
    },
    {
      label: '云岭那边现在还能进去吗？',
      domain: 'bbs.beiling.net',
      to: BBS.thread('YL-ACCESS'),
      note: '北岭生活论坛 · 城事杂谈 · 提及本项目驻地',
    },
  ],
  JIANZHIYUAN: [
    {
      label: '窗台上的胶卷',
      domain: 'jianzhiyuan.blogcn.net',
      to: BLOG.home,
      note: '本人个人网页 · 由本人在企业资料中提供',
    },
    {
      label: '云岭地区地下水调查 · 项目卷册目录',
      domain: 'bl-eng-data.org.cn',
      to: LG.project('YL-87-03'),
      note: '北岭地区工程资料库 · 收录编号 YL-87-03',
    },
  ],
  SHAOWENQI: [
    {
      label: '云岭地区地下水调查 · 项目卷册目录',
      domain: 'bl-eng-data.org.cn',
      to: LG.project('YL-87-03'),
      note: '北岭地区工程资料库 · 收录编号 YL-87-03',
    },
  ],
}
