/**
 * 系统级文案与设定常量。
 * 全部为原创设定，不引用任何既有作品的专有名词。
 */

export const BUREAU = {
  /** 对外挂牌名称——一个足够无聊、没人会多看一眼的单位。 */
  publicName: '第六补充测绘局',
  publicNameEn: 'SIXTH SUPPLEMENTARY SURVEY BUREAU',
  abbr: 'SSB-6',
  /** 内部对本数据库的称呼。 */
  systemName: '空册',
  systemNameEn: 'HOLLOW ARCHIVE SYSTEM',
  version: 'v4.11',
  build: '8814',
  department: '资料技术处 · 登记二组',
  /** 内部术语：本局不使用"异常"，一律记作"残响"。 */
  glossary: {
    residuum: '残响',
    registration: '登册',
    custody: '监护',
    silence: '缄默',
  },
} as const

/** 编号规则说明——玩家在"编号体系"页可以看到，同时也是解谜的基础知识。 */
export const ID_SCHEME = [
  { prefix: 'RS', label: '残响登记', note: '现象本体。一条残响一个编号，不因转移而变更。' },
  { prefix: 'LC', label: '地点', note: '按首次勘测年份编号，非按发现年份。' },
  { prefix: 'PN', label: '人员', note: '编制号。注销后编号不回收，也不复用。' },
  { prefix: 'IR', label: '调查报告', note: '一次调查可产生多份报告，序号连续。' },
  { prefix: 'TX', label: '转录', note: '录音、通信、笔录。原始介质另行封存。' },
  { prefix: 'EP', label: '处置记录', note: '含封填、迁移、销毁与监护变更。' },
] as const

/** 首页"系统通知"。可以随剧情推进增删。 */
export interface Notice {
  id: string
  date: string
  tone: 'info' | 'warn' | 'error'
  text: string
  /** 需要持有该线索才显示。 */
  requiresClue?: string
}

export const NOTICES: Notice[] = [
  {
    id: 'N-01',
    date: '1988-06-30',
    tone: 'info',
    text: '资料技术处：本季度登册核对已完成。第十七号井相关卷宗按 Ⅲ 级监护要求转入封存序列。',
  },
  {
    id: 'N-02',
    date: '1988-07-02',
    tone: 'warn',
    text: '目录校验异常：索引申报 11 条，实际返回 12 条。差值连续三次出现在同一位置。已按惯例忽略。',
  },
  {
    id: 'N-03',
    date: '1988-07-11',
    tone: 'warn',
    text: '安全提示：检索日志中出现非编制终端。该终端未申请权限，但通过了权限校验。请勿自行处理。',
  },
  {
    id: 'N-04',
    date: '——',
    tone: 'error',
    text: '本条通知的发布时间字段为空。系统无法确定它是何时被写入的，也无法删除它。',
  },
  {
    id: 'N-05',
    date: '待定',
    tone: 'error',
    text: '底册接口仍在响应外部请求。该接口的下线工单编号为空。',
    requiresClue: 'CLUE_002',
  },
]

/** 首页"最近更新"。日期刻意保持在 1988 年——直到玩家推进剧情。 */
export interface Recent {
  id: string
  archiveId: string
  date: string
  action: string
  requiresClue?: string
  /** 玩家从未访问过、却出现在"最近访问"里的条目。 */
  phantom?: boolean
}

export const RECENT: Recent[] = [
  { id: 'R-1', archiveId: 'LC-62-0058', date: '1988-06-28', action: '状态变更 · 封存' },
  { id: 'R-2', archiveId: 'RS-87-0174', date: '1988-06-28', action: '监护等级复核' },
  { id: 'R-3', archiveId: 'IR-88-0233', date: '1988-06-29', action: '标记为记录存疑' },
  { id: 'R-4', archiveId: 'PN-79-0091', date: '1988-07-01', action: '字段校验失败 · 未修复' },
  {
    id: 'R-5',
    archiveId: 'TX-88-0007',
    date: '1988-07-02',
    action: '写入 · 来源不明',
    requiresClue: 'CLUE_001',
    phantom: true,
  },
]

/** 状态栏里滚动的系统日志（纯装饰，但要像真的）。 */
export const AMBIENT_LOG = [
  'idx.rebuild ok — 13 rec',
  'custody.sweep — 0 change',
  'medium.check T-17 — read err 0x41',
  'auth.session refresh',
  'idx.verify — mismatch (+1) ignored',
  'thermal.log 214m — flat',
  'tape.spool — no device',
  'mirror.sync — peer not found',
  'clock.drift +00:41:00 — corrected',
  'clock.drift +00:41:00 — corrected',
  'clock.drift +00:41:00 — ',
]
