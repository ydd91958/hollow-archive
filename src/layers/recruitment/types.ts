/**
 * 职引（第一层）的数据模型。
 * 这一层必须像个运营多年的真实招聘平台，所以字段也按真实招聘产品来设计。
 */

export type IndustryKey =
  | 'internet'
  | 'ai'
  | 'software'
  | 'manufacture'
  | 'finance'
  | 'education'
  | 'medical'
  | 'logistics'
  | 'engineering'
  | 'construction'
  | 'consulting'
  | 'retail'
  | 'newenergy'
  | 'testing'
  | 'survey'
  | 'trade'

export const INDUSTRY_LABEL: Record<IndustryKey, string> = {
  internet: '互联网',
  ai: '人工智能',
  software: '软件服务',
  manufacture: '制造业',
  finance: '金融',
  education: '教育培训',
  medical: '医疗健康',
  logistics: '物流仓储',
  engineering: '工程勘察',
  construction: '建筑施工',
  consulting: '专业咨询',
  retail: '零售消费',
  newenergy: '新能源',
  testing: '检验检测',
  survey: '测绘地信',
  trade: '贸易批发',
}

export interface Recruiter {
  name: string
  title: string
  /** 「3 小时前在线」这类活跃度文案。 */
  activeText: string
  avatarTone: string
}

/** 职位上的运营标记。真实平台靠这些做分区，而不是靠颜色去暗示什么。 */
export type JobFlag = 'urgent' | 'graduate' | 'intern' | 'highpay'

export interface Job {
  id: string
  title: string
  companyId: string
  salary: string
  /** 「14薪」「13薪」之类的补充，可空。 */
  salaryNote?: string
  city: string
  district?: string
  experience: string
  education: string
  /** 福利标签。 */
  perks: string[]
  /** 职位类别，用于首页分栏与筛选。 */
  category: string
  /**
   * 职位族。比 category 更细的一层，用于「相似职位」排序。
   * 资料/文档/知识管理这一族横跨技术、工程、职能三个 category，
   * 只靠 category 匹配会把资料岗推给 HRBP，那是断链。
   */
  family?: string
  publishedText: string
  /** 已投递人数，列表页显示，纯粹是密度。 */
  applicants?: number
  flags?: JobFlag[]
  responsibilities: string[]
  requirements: string[]
  /** 招聘方补充说明，可空。 */
  addendum?: string
  /**
   * 需要在正文里加粗的原句。
   * 对外这是平台的「关键词高亮」：把 JD 里值得留意的表述标出来，
   * 真实招聘站都有这个功能。多条普通职位也用它，所以它不是标记。
   */
  highlight?: string[]
  recruiter: Recruiter
  /** 需要信号才出现在列表里。 */
  requiresSignal?: string
}

export interface CompanyMilestone {
  year: string
  text: string
}

export interface CompanyReview {
  id: string
  author: string
  role: string
  date: string
  rating: number
  text: string
}

/** 公司主页上的「项目沿革」条目。 */
export interface CompanyProject {
  id: string
  name: string
  period: string
  role: string
  members?: { personId?: string; name: string; role: string }[]
  note?: string
  /** 有详情页的条目，名称可点。大多数条目没有——平台只对部分项目做了详情。 */
  hasDetail?: boolean
}

export interface Company {
  id: string
  name: string
  shortName: string
  industry: string
  industryKey: IndustryKey
  size: string
  nature: string
  founded: string
  city: string
  address: string
  website?: string
  intro: string[]
  milestones: CompanyMilestone[]
  projects?: CompanyProject[]
  reviews: CompanyReview[]
  /** Logo 用文字块代替真实图片：既避免版权，也更像平台上的占位图。 */
  logoText: string
  logoTone: string
  /** 品牌主色。字标底色、hover 描边、企业页强调都用它。 */
  brand: string
  /** 企业标签，显示在名企推荐里。 */
  tags?: string[]
  /** 平台认证。 */
  verified?: boolean
}

export interface PersonProject {
  name: string
  period: string
  role: string
  /** 指向工程资料库的项目编号，玩家要自己找过去。 */
  externalRef?: string
}

export interface Person {
  id: string
  name: string
  title: string
  status: string
  statusTone?: 'normal' | 'muted'
  workplace?: string
  projects: PersonProject[]
  colleagues: { personId?: string; name: string; role: string; note?: string }[]
  documents: { name: string; meta: string; available: boolean }[]
  systemNote?: string
}
