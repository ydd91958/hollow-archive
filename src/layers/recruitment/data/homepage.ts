import type { IndustryKey } from '../types'

/**
 * 首页的运营内容。
 *
 * 真实招聘门户的首页有一半是运营位：banner、热搜词、城市入口、行业入口、
 * 资讯、工具、友链、备案。这些东西没有任何剧情作用——它们的作用是让页面
 * 看起来有人在天天维护。
 */

/* ── 顶部城市切换（真实城市） ─────────────────────── */
export const CITY_GROUPS: { label: string; cities: string[] }[] = [
  { label: '热门', cities: ['北京', '上海', '广州', '深圳', '杭州', '成都', '南京', '武汉'] },
  { label: 'A-G', cities: ['安庆', '北京', '常州', '成都', '重庆', '大连', '东莞', '福州', '广州', '贵阳'] },
  { label: 'H-N', cities: ['杭州', '合肥', '济南', '嘉兴', '昆明', '兰州', '洛阳', '南昌', '南京', '南通', '宁波'] },
  { label: 'Q-X', cities: ['青岛', '泉州', '厦门', '上海', '深圳', '沈阳', '石家庄', '苏州', '天津', '太原', '无锡', '武汉', '西安'] },
  { label: 'Y-Z', cities: ['烟台', '扬州', '长春', '长沙', '郑州', '中山', '珠海'] },
]

/* ── 热门搜索词 ───────────────────────────────────── */
export const HOT_SEARCHES = [
  '应届生',
  '数据分析师',
  'Java',
  '前端开发',
  '产品经理',
  '双休',
  '不加班',
  '国企',
  '五险一金',
  '销售',
  '会计',
  '实习',
]

/* ── 首页大搜索框下的推荐词（与上面刻意不同） ─────── */
export const SUGGEST_WORDS = ['算法工程师', '管培生', 'HRBP', '岩土工程师', '弹性工作', '13薪']

/* ── 热门城市入口 ─────────────────────────────────── */
export const HOT_CITIES: { name: string; jobs: number }[] = [
  { name: '北京', jobs: 128416 },
  { name: '上海', jobs: 141207 },
  { name: '深圳', jobs: 116832 },
  { name: '广州', jobs: 94570 },
  { name: '杭州', jobs: 87241 },
  { name: '成都', jobs: 76318 },
  { name: '南京', jobs: 54902 },
  { name: '武汉', jobs: 51447 },
  { name: '西安', jobs: 43286 },
  { name: '苏州', jobs: 46013 },
  { name: '天津', jobs: 38765 },
  { name: '长沙', jobs: 33194 },
  { name: '郑州', jobs: 31882 },
  { name: '宁波', jobs: 27650 },
  { name: '合肥', jobs: 26471 },
  { name: '青岛', jobs: 25908 },
  { name: '重庆', jobs: 44127 },
  { name: '厦门', jobs: 21536 },
]

/* ── 职位分类导航（左侧悬浮栏） ───────────────────── */
export const CATEGORY_NAV: { name: string; items: string[] }[] = [
  { name: '技术', items: ['Java', '前端', 'Android', '测试', '运维', '算法', '数据库', '安全'] },
  { name: '产品', items: ['产品经理', 'B端产品', '增长产品', '产品助理'] },
  { name: '数据', items: ['数据分析', 'BI', '数据挖掘', '数据治理'] },
  { name: '设计', items: ['UI 设计', '交互设计', '平面设计', '视觉设计'] },
  { name: '运营', items: ['内容运营', '用户运营', '海外运营', '活动运营'] },
  { name: '销售', items: ['大客户销售', '渠道销售', '医疗器械销售', '销售助理'] },
  { name: '职能', items: ['人力资源', '行政', '财务', '法务', '审计', '资料管理'] },
  { name: '工程', items: ['岩土', '测绘', '水文', '施工', '机械', '工艺', '检测'] },
  { name: '医疗', items: ['临床监查', '医学编辑', '注册专员', '医疗器械'] },
  { name: '教育', items: ['学科老师', '教研', '课程顾问'] },
  { name: '物流', items: ['调度', '仓储', '关务', '供应链'] },
  { name: '金融', items: ['风控', '投研', '保险', '资管'] },
]

/* ── 热门行业 ─────────────────────────────────────── */
export const INDUSTRY_ENTRIES: { key: IndustryKey; jobs: number; companies: number }[] = [
  { key: 'internet', jobs: 68412, companies: 5218 },
  { key: 'ai', jobs: 21873, companies: 1642 },
  { key: 'software', jobs: 45120, companies: 3871 },
  { key: 'manufacture', jobs: 52907, companies: 6104 },
  { key: 'finance', jobs: 33418, companies: 2093 },
  { key: 'education', jobs: 19740, companies: 2571 },
  { key: 'medical', jobs: 27655, companies: 1988 },
  { key: 'logistics', jobs: 24310, companies: 3102 },
  { key: 'engineering', jobs: 15286, companies: 1417 },
  { key: 'construction', jobs: 30974, companies: 4265 },
  { key: 'consulting', jobs: 9832, companies: 861 },
  { key: 'retail', jobs: 41267, companies: 5930 },
  { key: 'newenergy', jobs: 18093, companies: 1204 },
  { key: 'testing', jobs: 7451, companies: 692 },
  { key: 'survey', jobs: 5218, companies: 483 },
  { key: 'trade', jobs: 22684, companies: 4117 },
]

/* ── 职场资讯 ─────────────────────────────────────── */
export interface NewsColumn {
  title: string
  more: string
  /** 没有对应文章页时，首条用这个色做占位图。 */
  leadTone?: string
  /** slug 指向研究中心的真实文章页；没有 slug 的条目只是标题。 */
  items: { title: string; meta: string; hot?: boolean; slug?: string }[]
}

export const NEWS_COLUMNS: NewsColumn[] = [
  {
    title: '求职攻略',
    more: '更多攻略',
    items: [
      {
        title: '从 AI 到「知识管理」：今年秋招正在出现哪些新岗位？',
        meta: '4.7 万阅读',
        hot: true,
        slug: 'campus-newjobs',
      },
      { title: '秋招进入尾声，这几类岗位仍在扩招', meta: '2.4 万阅读' },
      { title: '简历里的项目经历应该怎么写才不空洞', meta: '1.8 万阅读' },
      { title: '投了三十份简历没回音，问题多半出在这三处', meta: '1.1 万阅读' },
      { title: '面试被问「职业规划」时的三种答法', meta: '9,720 阅读' },
      { title: '背调一般查什么？哪些情况会被卡', meta: '8,431 阅读' },
      { title: '试用期被辞退，这几笔钱可以要', meta: '7,206 阅读' },
    ],
  },
  {
    title: '行业观察',
    more: '更多观察',
    items: [
      { title: '制造业为什么开始设「文档岗」', meta: '8,412 阅读', hot: true, slug: 'doc-roles-manufacturing' },
      { title: '2025 年三季度人才流动报告：制造业净流入转正', meta: '1.6 万阅读' },
      { title: '工程行业的「旧资料」到底有多重要？', meta: '1.2 万阅读', slug: 'old-data-matters' },
      { title: '新能源行业招聘需求同比增长 18%', meta: '1.2 万阅读' },
      { title: '检验检测行业为什么一直缺人', meta: '6,844 阅读' },
      { title: '中小企业为什么开始自己招 HRBP', meta: '5,391 阅读' },
      { title: '从岗位描述看今年企业最看重什么能力', meta: '4,772 阅读' },
      { title: '二线城市正在承接哪些岗位', meta: '4,108 阅读' },
    ],
  },
  {
    title: '薪资与政策',
    more: '更多资讯',
    leadTone: 'from-[#3f5f8a] to-[#6b87ad]',
    items: [
      { title: '2025 年各城市社保缴费基数调整一览', meta: '3.1 万阅读', hot: true },
      { title: '年终奖个税计算方式将于明年过渡到期', meta: '2.2 万阅读' },
      { title: '公积金异地转移接续办理流程', meta: '1.4 万阅读' },
      { title: '劳动合同到期不续签，补偿怎么算', meta: '1.3 万阅读' },
      { title: '各地高校毕业生就业补贴申领指南', meta: '9,155 阅读' },
      { title: '灵活就业人员参保的三个常见误区', meta: '6,027 阅读' },
    ],
  },
]

/* ── 求职工具 ─────────────────────────────────────── */
export const TOOLS: { name: string; desc: string; glyph: string; tone: string }[] = [
  { name: '在线简历', desc: '12 套模板，导出 PDF', glyph: '简', tone: 'bg-[#eef4fd] text-[#1a6fdb]' },
  { name: '简历诊断', desc: '30 项检查，即时评分', glyph: '诊', tone: 'bg-[#fdf1ea] text-[#c2703a]' },
  { name: '薪资查询', desc: '按城市与岗位对比', glyph: '薪', tone: 'bg-[#ecf7f2] text-[#2f8f6b]' },
  { name: '面试题库', desc: '按公司与岗位整理', glyph: '面', tone: 'bg-[#f2eefd] text-[#5b4bd4]' },
  { name: '公积金计算', desc: '各城市缴存比例', glyph: '算', tone: 'bg-[#fdf6e8] text-[#a5821f]' },
  { name: '求职进度', desc: '统一管理投递记录', glyph: '进', tone: 'bg-[#eef2f7] text-[#5a6b80]' },
]

/* ── 平台数据 ─────────────────────────────────────── */
export const PLATFORM_STATS = [
  { label: '在招职位', value: '1,284,617' },
  { label: '合作企业', value: '386,204' },
  { label: '今日新增', value: '12,845' },
  { label: '本周面试邀请', value: '73,916' },
]

/* ── 页脚友情链接 ─────────────────────────────────── */
export const FRIEND_LINKS = [
  '人才服务网',
  '社保查询',
  '公积金服务',
  '职业技能鉴定',
  '高校就业信息网',
  '劳动仲裁指南',
  '企业信用信息',
  '创业扶持政策',
  '职业资格考试',
  '人事考试网',
]

/* ── 页脚导航 ─────────────────────────────────────── */
export const FOOTER_NAV: { title: string; items: string[] }[] = [
  { title: '关于职引', items: ['公司介绍', '发展历程', '加入我们', '媒体报道', '商务合作'] },
  { title: '求职者', items: ['职位搜索', '企业黄页', '简历模板', '求职攻略', '薪资查询', '投诉建议'] },
  { title: '企业服务', items: ['企业注册', '发布职位', '招聘方案', '资质认证', '开具发票'] },
  { title: '帮助中心', items: ['新手指引', '常见问题', '账号安全', '用户协议', '隐私政策', '举报与投诉'] },
]
