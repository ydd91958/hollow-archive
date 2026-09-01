/**
 * 空册系统 · 档案数据模型
 * 这里只定义"档案是什么"，不含任何 UI 逻辑。
 * 新增档案 = 新增一个符合 Archive 的对象，不需要改动任何组件。
 */

/** 卷宗分类。前缀与档案编号一一对应。 */
export type ArchiveCategory =
  | 'RESIDUUM' // RS · 残响登记（异常现象本体）
  | 'LOCUS' // LC · 地点档案
  | 'PERSONNEL' // PN · 人员档案
  | 'INVESTIGATION' // IR · 调查报告
  | 'TRANSCRIPT' // TX · 通信 / 录音转录
  | 'PROTOCOL' // EP · 实验与处置记录
  | 'PURGED' // 已注销 / 被删除档案

/** 保密等级，由低到高。 */
export type Clearance = 'OPEN' | 'INTERNAL' | 'RESTRICTED' | 'SILENT'

/** 卷宗状态。 */
export type ArchiveStatus =
  | 'ACTIVE' // 生效
  | 'SEALED' // 封存
  | 'DISPUTED' // 记录存疑
  | 'REVOKED' // 已注销
  | 'CORRUPT' // 介质损坏
  | 'PENDING' // 尚未创建

/** 监护等级：本局对残响采取的处置强度。 */
export type Custody = 'I' | 'II' | 'III' | 'IV' | 'UNSET'

export type AttachmentState = 'AVAILABLE' | 'MISSING' | 'CORRUPT' | 'QUARANTINED'

export interface Attachment {
  id: string
  name: string
  kind: 'AUDIO' | 'IMAGE' | 'DOCUMENT' | 'DATA' | 'UNKNOWN'
  size?: string
  state: AttachmentState
  /** 点开后系统给出的说明（大多数附件是打不开的——这本身就是叙事）。 */
  note?: string
}

/**
 * 正文由区块组成。区块内的文本支持行内标记，见 lib/inline.ts：
 *   {{redact:CLUE_001|1987-11-03}}  遮挡条，持有该线索后自动显影
 *   {{hidden:一句只有拖蓝才能看到的话}}
 *   {{ref:LC-62-0058}}             档案交叉引用（可点击）
 *   {{glitch:文字}}                 轻微抖动的字
 *   {{dim:文字}}                    次要文字
 */
export type Block =
  | { kind: 'text'; text: string }
  | { kind: 'heading'; text: string }
  | { kind: 'field'; label: string; value: string }
  | { kind: 'list'; items: string[]; ordered?: boolean }
  | { kind: 'quote'; time?: string; speaker?: string; text: string }
  | { kind: 'damaged'; text: string }
  /** 装订在卷内的手写批注 / 便签。 */
  | { kind: 'margin'; text: string; hand?: string }
  /** 系统自己插进正文的东西。 */
  | { kind: 'system'; text: string; tone?: 'info' | 'warn' | 'error' }
  /**
   * 每次读都不太一样的一段。
   *
   * 缄默级卷宗的正文本身具备传染性，所以它不肯保持同一个形状。
   * variants 里几句话说的是同一件事，只是措辞和语序不同——
   * 玩家第二次读会觉得哪里不对，但说不出哪里。
   */
  | { kind: 'unstable'; variants: string[] }
  /**
   * 待提交的登记表。
   * 只有 RS-87-0175 用它。玩家在这里按下的那个按钮就是结局。
   */
  | { kind: 'registration' }
  | { kind: 'divider' }

export interface Archive {
  /** 例：RS-87-0174 */
  id: string
  title: string
  /** 残响的内部代号，如「后声」。 */
  codename?: string
  category: ArchiveCategory
  status: ArchiveStatus
  clearance: Clearance
  custody?: Custody
  /** 登记日期 YYYY-MM-DD */
  date: string
  /** 最后修订，用于制造"档案被人改过"的矛盾。 */
  revised?: string
  revisedBy?: string
  /** 检索结果里显示的一句话。 */
  summary: string
  body: Block[]
  attachments?: Attachment[]
  /** 关联卷宗编号。 */
  related?: string[]
  /** 检索关键词（除标题/正文外的额外命中项）。 */
  keywords?: string[]
  /** 需要持有这些线索才会出现在数据库中。 */
  requiresClues?: string[]
  /** 需要这些解锁项才可访问。 */
  requiresUnlocks?: string[]
  /** 详情页底部的系统脚注。 */
  footer?: string
}

export const CATEGORY_LABEL: Record<ArchiveCategory, string> = {
  RESIDUUM: '残响登记',
  LOCUS: '地点',
  PERSONNEL: '人员',
  INVESTIGATION: '调查报告',
  TRANSCRIPT: '转录',
  PROTOCOL: '处置记录',
  PURGED: '已注销卷宗',
}

export const STATUS_LABEL: Record<ArchiveStatus, string> = {
  ACTIVE: '生效',
  SEALED: '封存',
  DISPUTED: '记录存疑',
  REVOKED: '已注销',
  CORRUPT: '介质损坏',
  PENDING: '尚未创建',
}

export const CLEARANCE_LABEL: Record<Clearance, string> = {
  OPEN: '公开',
  INTERNAL: '内部',
  RESTRICTED: '限阅',
  SILENT: '缄默级',
}

export const CUSTODY_LABEL: Record<Custody, string> = {
  I: 'Ⅰ · 静置',
  II: 'Ⅱ · 隔离',
  III: 'Ⅲ · 缄默',
  IV: 'Ⅳ · 抹除',
  UNSET: '未定级',
}
