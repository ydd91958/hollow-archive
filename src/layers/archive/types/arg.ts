/**
 * ARG 线索 / 解锁系统的数据模型。
 *
 * 设计链路：
 *   触发条件 → 线索(Clue) → 解锁(Unlock) → 新档案 / 隐藏页面 → 新的触发条件
 *
 * 一条线索可以由多种方式发现；一个解锁可以要求多条线索共同满足。
 * 所有内容都是纯数据，扩展剧情时只需往 data/ 里加对象。
 */

export type ClueId = string
export type UnlockId = string

/** 线索的发现方式。任一条满足即算发现。 */
export type Trigger =
  /** 读完指定的全部档案。 */
  | { type: 'READ_ALL'; archives: string[] }
  /** 读过其中任意一份档案。 */
  | { type: 'READ_ANY'; archives: string[] }
  /** 在检索框输入过其中任一关键词（大小写与空格不敏感）。 */
  | { type: 'SEARCH'; terms: string[] }
  /** 在任意密码框提交过该口令。 */
  | { type: 'CODE'; value: string }
  /** 在页面上点开 / 挖出了某个隐藏元素。 */
  | { type: 'REVEAL'; token: string }
  /** 已持有其它线索。 */
  | { type: 'HAS_CLUES'; clues: ClueId[] }
  /** 访问过某个路径。 */
  | { type: 'VISIT'; path: string }

export interface Clue {
  id: ClueId
  /** 线索栏里的标题。 */
  label: string
  /** 发现后展示给玩家的一句话——它应该指向下一步，而不是解释剧情。 */
  hint: string
  /** 这条线索交到玩家手里的"东西"：一段数字、一个词、一个编号。 */
  payload?: string
  /** 来源提示，用于线索栏里说明它是从哪儿捡到的。 */
  origin?: string
  triggers: Trigger[]
}

export interface Unlock {
  id: UnlockId
  label: string
  /** 需要同时持有的全部线索。 */
  requiresClues?: ClueId[]
  /** 需要提交过的口令。 */
  requiresCodes?: string[]
  /** 解锁后放行的路径（会出现在导航中）。 */
  grantsPath?: string
  /** 解锁后放行的档案编号。 */
  grantsArchives?: string[]
  /** 解锁瞬间系统播报的那一行字。 */
  announcement: string
}

/** 系统日志条目：玩家做过的每一件事都会留痕。 */
export interface LogEntry {
  /** 本地时间戳 */
  t: string
  text: string
  tone?: 'info' | 'warn' | 'error' | 'good'
}

/** 检索关键词彩蛋。 */
export interface SearchTrigger {
  id: string
  /** 命中这些词（归一化后完全相等或被包含）。 */
  match: string[]
  /** 检索结果页上方弹出的系统响应。 */
  response: {
    tone: 'info' | 'warn' | 'error'
    lines: string[]
  }
  /** 命中后临时插入结果列表的"幽灵条目"。 */
  ghostResults?: {
    id: string
    title: string
    line: string
    /** 可点进去的话给出路径。 */
    to?: string
  }[]
  /** 需要先持有这些线索，彩蛋才生效。 */
  requiresClues?: ClueId[]
}
