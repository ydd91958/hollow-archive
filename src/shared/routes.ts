/**
 * 全站路由常量。
 *
 * 三层挂在同一个 SPA 里，但玩家应该觉得自己在访问互不相干的几个网站。
 * 路径命名因此刻意避开任何"游戏感"的词——它们看起来就是普通站点的 URL。
 */

/* ── 第一层：职引（招聘平台） ───────────────────── */
export const ZY = {
  home: '/',
  jobs: '/jobs',
  job: (id: string) => `/jobs/${id}`,
  companies: '/companies',
  company: (id: string) => `/company/${id}`,
  /** 企业主页里某个历史项目的详情页。 */
  companyProject: (companyId: string, projectId: string) =>
    `/company/${companyId}/project/${projectId}`,
  person: (id: string) => `/people/${id}`,
  special: (id: string) => `/special/${id}`,
  article: (slug: string) => `/article/${slug}`,
} as const

/* ── 第二层：北岭生活论坛 ───────────────────────── */
export const BBS = {
  home: '/forum',
  board: (id: string) => `/forum/b/${id}`,
  thread: (id: string) => `/forum/t/${id}`,
} as const

/* ── 第二层：北岭气象公共服务平台 ─────────────────── */
export const WX = {
  home: '/weather',
  forecast: '/weather/forecast',
  hourly: '/weather/hourly',
  history: '/weather/history',
  stations: '/weather/stations',
  about: '/weather/about',
  /** 带日期直达历史查询。博客里那条链接用它。 */
  historyOn: (date: string) => `/weather/history?d=${date}`,
} as const

/* ── 第二层：北岭地区工程资料库 ─────────────────── */
export const LG = {
  home: '/proj',
  project: (id: string) => `/proj/${id}`,
  attach: (projectId: string, attachId: string) => `/proj/${projectId}/attach/${attachId}`,
} as const

/* ── 第二层：个人博客「窗台上的胶卷」 ───────────── */
export const BLOG = {
  home: '/blog',
  post: (slug: string) => `/blog/${slug}`,
} as const

/**
 * 每个站点的"域名"。只用来印在页脚和外链上，制造多站点错觉。
 * 站内跳转仍然走 react-router，不会真的发出请求。
 */
export const DOMAINS = {
  zy: 'zhiyin.com',
  bbs: 'bbs.beiling.net',
  lg: 'bl-eng-data.org.cn',
  blog: 'jianzhiyuan.blogcn.net',
  wx: 'bl-qx.gov.cn',
} as const
