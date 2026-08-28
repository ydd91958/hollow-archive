/**
 * 运营专题。
 *
 * 真实招聘门户的 banner 点进去不是一张大图，而是一个带数据、图表、正文、
 * 相关阅读、相关职位与参与企业的落地页。秋招专题就是第一层的主入口。
 */

export interface StatBlock {
  label: string
  value: string
  unit?: string
  delta?: string
  up?: boolean
  note?: string
}

export interface BarDatum {
  name: string
  value: number
  delta: number
}

export interface TrendDatum {
  label: string
  value: number
}

export interface DonutDatum {
  name: string
  value: number
  color: string
}

export interface GrowthRow {
  name: string
  growth: number
  salary: string
  note: string
}

export interface Special {
  id: string
  title: string
  subtitle: string
  kicker: string
  publishedAt: string
  updatedAt: string
  source: string
  readCount: string
  shareCount: string
  heroTone: string
  /** 专题正文用哪一篇文章。 */
  articleSlug: string
  stats: StatBlock[]
  bars: BarDatum[]
  jobGrowth: GrowthRow[]
  trend: TrendDatum[]
  donut: DonutDatum[]
  relatedArticles: string[]
  relatedJobs: string[]
  companies: string[]
  timeline: { date: string; text: string }[]
}

export const SPECIALS: Special[] = [
  {
    id: 'campus2026',
    title: '2026 秋招观察',
    subtitle: '哪些岗位在涨，哪些在悄悄变多',
    kicker: '职引研究中心 · 年度专题',
    publishedAt: '2025-09-18',
    updatedAt: '2025-10-06',
    source: '职引研究中心',
    readCount: '18.6 万',
    shareCount: '4,271',
    heroTone: 'from-[#0f3d7a] via-[#1a5fb4] to-[#2f83d8]',
    articleSlug: 'campus-newjobs',
    stats: [
      { label: '参与企业', value: '3,412', unit: '家', delta: '+11.4%', up: true },
      { label: '在招岗位', value: '128,406', unit: '个', delta: '+8.2%', up: true },
      { label: '覆盖城市', value: '68', unit: '座', note: '含 21 座三线城市' },
      { label: '平均起薪', value: '9,140', unit: '元/月', delta: '+3.1%', up: true },
      { label: '平均在架', value: '31', unit: '天', delta: '+6 天', up: false, note: '较去年同期变长' },
      { label: '简历投递', value: '742 万', unit: '份', delta: '+19.7%', up: true },
    ],
    bars: [
      { name: '人工智能', value: 37.2, delta: 37.2 },
      { name: '新能源', value: 28.6, delta: 28.6 },
      { name: '工程勘察', value: 23.4, delta: 23.4 },
      { name: '检验检测', value: 21.9, delta: 21.9 },
      { name: '建筑施工', value: 18.3, delta: 18.3 },
      { name: '医疗健康', value: 14.7, delta: 14.7 },
      { name: '物流仓储', value: 9.2, delta: 9.2 },
      { name: '零售消费', value: 4.1, delta: 4.1 },
      { name: '教育培训', value: -6.8, delta: -6.8 },
    ],
    jobGrowth: [
      { name: '算法 / 机器学习', growth: 52.1, salary: '35-60K', note: '应用方向增速高于研究方向' },
      { name: '电芯 / 储能研发', growth: 44.6, salary: '20-35K', note: '常州、宁德、宜宾三地集中' },
      { name: '半导体工艺', growth: 38.2, salary: '18-30K', note: '要求硕士的比例最高' },
      { name: 'AI 产品 / 解决方案', growth: 31.7, salary: '25-45K', note: '从研究岗转向交付岗' },
      { name: '临床监查（CRA）', growth: 26.4, salary: '12-20K', note: '出差强度是主要流失原因' },
      { name: '工程资料 / 知识管理', growth: 23.4, salary: '6-12K', note: '招聘周期最长的一类' },
      { name: '检验检测', growth: 21.9, salary: '9-15K', note: '三线城市岗位占比过半' },
      { name: '跨境运营', growth: 17.3, salary: '8-14K', note: '旺季用工波动大' },
      { name: '施工 / 现场管理', growth: 12.8, salary: '8-13K', note: '包吃住是主要吸引点' },
      { name: '学科教师', growth: -6.8, salary: '8-15K', note: '连续第三年下降' },
    ],
    trend: [
      { label: '2021', value: 42 },
      { label: '2022', value: 51 },
      { label: '2023', value: 64 },
      { label: '2024', value: 78 },
      { label: '2025', value: 96 },
    ],
    donut: [
      { name: '一线城市', value: 18, color: '#1a6fdb' },
      { name: '新一线', value: 22, color: '#3f8ad8' },
      { name: '二线城市', value: 24, color: '#6ba7e4' },
      { name: '三线及以下', value: 36, color: '#a7cbf0' },
    ],
    relatedArticles: ['old-data-matters', 'doc-roles-manufacturing', 'archivist-day'],
    relatedJobs: [
      'KM-SPEC',
      'TECH-WRITER',
      'DOC-ENG',
      'ARCHIVE-DIGI',
      'PM-ARCHIVE',
      'ENG-DOC',
      'GRAD-MT',
      'GRAD-ENG',
      'INTERN-DATA',
    ],
    companies: ['XINGYE', 'QIYUN', 'SHENLAN', 'LINGYUE', 'HANTU', 'ZHONGCE', 'HAORAN', 'HBSC'],
    timeline: [
      { date: '08-15', text: '首批企业开放投递，互联网与新能源领先启动' },
      { date: '09-01', text: '高校宣讲季开始，线下场次同比增加 14%' },
      { date: '09-18', text: '本专题第一期数据发布' },
      { date: '10-06', text: '数据更新，制造与工程类岗位进入放量期' },
      { date: '11-下旬', text: '预计进入补录阶段' },
    ],
  },
]

export const SPECIAL_BY_ID = new Map(SPECIALS.map((s) => [s.id, s]))

export function getSpecial(id: string): Special | undefined {
  return SPECIAL_BY_ID.get(id)
}

/** 首页专题位。只有第一个是真的落地页，其余是运营占位——真实门户就是这样。 */
export const SPECIAL_CARDS = [
  {
    id: 'campus2026',
    to: '/special/campus2026',
    tag: '年度专题',
    title: '2026 秋招观察',
    sub: '3,412 家企业 · 12.8 万岗位',
    tone: 'from-[#0f3d7a] to-[#2f83d8]',
    live: true,
  },
  {
    id: 'salary2025',
    to: '',
    tag: '薪酬报告',
    title: '2025 秋季薪酬报告',
    sub: '68 城 · 412 个岗位',
    tone: 'from-[#7a4b1f] to-[#c2803a]',
    live: false,
  },
  {
    id: 'soe',
    to: '',
    tag: '专区',
    title: '国企 · 事业单位',
    sub: '稳定编制 · 定期体检',
    tone: 'from-[#1f5f4b] to-[#3f8f70]',
    live: false,
  },
]
