/**
 * 北岭地区工程资料库 · bl-eng-data.org.cn
 *
 * 一个 2009 年之后就没人维护过的事业单位站点。
 * 它是三条线索的汇合点，也是通往第三层的那扇门所在的位置——
 * 那扇门看起来只是一条失效的附件链接。
 */

export interface ProjectRow {
  id: string
  name: string
  unit: string
  period: string
  status: '完成' | '终止' | '移交'
}

export interface Staff {
  name: string
  role: string
  note?: string
}

export interface Station {
  no: string
  place: string
  depth: string
  status: string
  /** 点开后展开的补充说明。 */
  detail?: string
  traceKey?: string
}

export interface AttachmentRow {
  id: string
  name: string
  size: string
  state: '文件丢失' | '无法打开' | '链接失效' | '可下载'
  /** 只有这一条会在信号成立后变成入口。 */
  gateway?: boolean
}

export interface ProjectDetail extends ProjectRow {
  report: string
  remark: string[]
  staff: Staff[]
  stations?: Station[]
  attachments: AttachmentRow[]
}

export const SITE_META = {
  title: '北岭地区工程资料库',
  org: '北岭市勘察设计行业协会 资料工作委员会',
  lastUpdate: '2009-11-16',
  visits: 118427,
  notice:
    '本站为公益性行业资料索引，仅提供著录信息查询，不提供原始卷册借阅。原始卷册的保管单位以著录信息为准。',
  links: [
    { label: '北岭生活论坛', href: '/forum' },
    { label: '窗台上的胶卷（个人网页）', href: '/blog' },
  ],
}

export const PROJECTS: ProjectRow[] = [
  { id: 'BL-79-01', name: '北岭城区浅层地下水普查', unit: '北岭市水文地质工程勘察队', period: '1979.03—1980.12', status: '完成' },
  { id: 'BL-81-02', name: '西山水源地勘察', unit: '北岭市水文地质工程勘察队', period: '1981.05—1982.10', status: '完成' },
  { id: 'BL-83-07', name: '北岭西部岩溶水勘察', unit: '北岭市水文地质工程勘察队', period: '1983.06—1985.11', status: '完成' },
  { id: 'YL-87-03', name: '云岭地区地下水调查', unit: '北岭市水文地质工程勘察队', period: '1987.04—1988.06', status: '终止' },
  { id: 'BL-89-01', name: '北岭东郊供水井群改造', unit: '北岭市水文地质工程勘察队', period: '1989.02—1990.08', status: '完成' },
  { id: 'BL-91-04', name: '北岭城区供水管网普查', unit: '北岭市水文地质工程勘察队', period: '1991.03—1992.09', status: '完成' },
  { id: 'BL-93-02', name: '南河流域水质本底调查', unit: '北岭市水文地质工程勘察队', period: '1993.04—1994.11', status: '完成' },
  { id: 'BL-96-05', name: '北岭市地下水监测点复测', unit: '北岭市水文地质工程勘察队', period: '1996.05—1998.10', status: '完成' },
  { id: 'BL-98-03', name: '工业园区水文地质初勘', unit: '北岭市水文地质工程勘察队', period: '1998.06—1998.12', status: '完成' },
  { id: 'BL-02-01', name: '城西新区供水规划前期调查', unit: '北岭市勘察设计院', period: '2002.03—2003.05', status: '移交' },
]

const YL_STATIONS: Station[] = [
  { no: '第 1 号', place: '云岭乡东', depth: '68 m', status: '正常' },
  { no: '第 2 号', place: '云岭乡东', depth: '72 m', status: '正常' },
  { no: '第 3 号', place: '云岭乡南', depth: '55 m', status: '正常' },
  { no: '第 4 号', place: '云岭乡南', depth: '61 m', status: '正常' },
  { no: '第 5 号', place: '柏树坳', depth: '94 m', status: '正常' },
  { no: '第 6 号', place: '柏树坳', depth: '88 m', status: '正常' },
  { no: '第 7 号', place: '云岭乡西', depth: '77 m', status: '正常' },
  { no: '第 8 号', place: '云岭乡西', depth: '80 m', status: '正常' },
  { no: '第 9 号', place: '南河口', depth: '46 m', status: '1990 年填埋' },
  { no: '第 10 号', place: '南河口', depth: '49 m', status: '1990 年填埋' },
  { no: '第 11 号', place: '云岭乡北', depth: '103 m', status: '正常' },
  { no: '第 12 号', place: '云岭乡北', depth: '110 m', status: '正常' },
  { no: '第 13 号', place: '大坡地', depth: '126 m', status: '正常' },
  { no: '第 14 号', place: '大坡地', depth: '131 m', status: '正常' },
  { no: '第 15 号', place: '云岭乡北', depth: '158 m', status: '正常' },
  { no: '第 16 号', place: '云岭乡北', depth: '176 m', status: '正常' },
  {
    no: '第 17 号',
    place: '云岭乡北',
    depth: '214 m',
    status: '已封填 1987.11',
    traceKey: 'well:17',
    detail:
      '本点位为本项目最深观测井，1987 年 4 月成井，同年 11 月 6 日封填，井台以上结构一并拆除。封填申请由承担单位提出，批复文号著录为空。本点位 1987 年 11 月 3 日之后的观测数据未随项目卷册移交，著录时按缺项处理。',
  },
]

export const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  'YL-87-03': {
    id: 'YL-87-03',
    name: '云岭地区地下水调查',
    unit: '北岭市水文地质工程勘察队',
    period: '1987.04—1988.06',
    status: '终止',
    report: '未提交',
    remark: [
      '本项目于 1988 年 6 月终止，终止原因著录为空。结题报告未提交，验收未组织。',
      '本项目卷册于 2013 年移交华北水文测绘技术服务有限公司代管，本站保留目录著录，不保留原件。',
      '本项目人员名单按卷册封面誊录，其中一条记录的姓名栏在原件上即为空白，本站照录。',
    ],
    staff: [
      { name: '邵文岐', role: '项目负责人' },
      { name: '简致远', role: '测量员' },
      { name: '韦昀', role: '项目顾问', note: '聘用文号著录为空' },
      { name: '（空白）', role: '（空白）', note: '原件此行仅有编号，无文字' },
    ],
    stations: YL_STATIONS,
    attachments: [
      { id: 'YL-87-03-01', name: '项目任务书.pdf', size: '—', state: '文件丢失' },
      { id: 'YL-87-03-02', name: '中期报告（1987.12）.pdf', size: '4.1 MB', state: '无法打开' },
      { id: 'YL-87-03-03', name: '观测点位图.jpg', size: '—', state: '文件丢失' },
      { id: 'YL-87-03-04', name: '水位月报汇总表.xls', size: '212 KB', state: '可下载' },
      {
        id: 'YL-87-03-A17',
        name: '项目附件索引',
        size: '—',
        state: '链接失效',
        gateway: true,
      },
    ],
  },

  'BL-83-07': {
    id: 'BL-83-07',
    name: '北岭西部岩溶水勘察',
    unit: '北岭市水文地质工程勘察队',
    period: '1983.06—1985.11',
    status: '完成',
    report: '已提交（1986.03）',
    remark: ['本项目卷册于 2013 年移交华北水文测绘技术服务有限公司代管。'],
    staff: [
      { name: '邵文岐', role: '技术负责人' },
      { name: '罗世安', role: '项目负责人' },
    ],
    attachments: [
      { id: 'BL-83-07-01', name: '勘察报告.pdf', size: '8.7 MB', state: '无法打开' },
      { id: 'BL-83-07-02', name: '钻孔柱状图.pdf', size: '—', state: '文件丢失' },
    ],
  },

  'BL-96-05': {
    id: 'BL-96-05',
    name: '北岭市地下水监测点复测',
    unit: '北岭市水文地质工程勘察队',
    period: '1996.05—1998.10',
    status: '完成',
    report: '已提交（1999.01）',
    remark: [
      '本项目对全市 214 个监测点位实施复测。云岭地区点位按已封填处理，未纳入复测范围。',
    ],
    staff: [
      { name: '简致远', role: '测量组组长' },
      { name: '罗世安', role: '项目负责人' },
    ],
    attachments: [
      { id: 'BL-96-05-01', name: '复测成果表.xls', size: '1.4 MB', state: '可下载' },
      { id: 'BL-96-05-02', name: '点位一览.pdf', size: '2.2 MB', state: '无法打开' },
    ],
  },
}

export function getProject(id: string): ProjectDetail | undefined {
  return PROJECT_DETAILS[id]
}

export function getProjectRow(id: string): ProjectRow | undefined {
  return PROJECTS.find((p) => p.id === id)
}
