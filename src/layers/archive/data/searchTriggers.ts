import type { SearchTrigger } from '@/layers/archive/types/arg'
import { VAULT_PATH } from './unlocks'

/**
 * 检索彩蛋。
 * 检索不是普通的数据库查询——某些词会让系统本身作出反应。
 * 匹配规则见 lib/search.ts：归一化后完全相等，或查询串包含 match 项。
 */
export const SEARCH_TRIGGERS: SearchTrigger[] = [
  {
    id: 'ST-INDEX',
    match: ['别相信目录', '不要相信目录', '别相信索引', 'dont trust the index', "don't trust the index"],
    response: {
      tone: 'error',
      lines: [
        '目录校验中止。',
        '申报条目 5 · 实际返回 6 · 差值 +1 · 该差值自 1988-07-02 起每次校验均出现在同一位置。',
        '本系统承认：存在不被目录申报的页面。',
      ],
    },
  },
  {
    id: 'ST-WEI',
    match: ['韦昀', 'wei yun', 'PN-79-0091', '0091'],
    response: {
      tone: 'warn',
      lines: [
        '检索命中 1 条编制记录，1 条会话记录。',
        '会话记录不应存在：该编制号已于 1983-09-02 注销。',
      ],
    },
    ghostResults: [
      {
        id: 'GH-WEI',
        title: 'PN-79-0091 · 会话',
        line: '状态：在线 · 终端：本终端 · 登录时间：数值超出可表示范围',
      },
    ],
  },
  {
    id: 'ST-0175',
    match: ['RS-87-0175', '0175', '零一七五'],
    response: {
      tone: 'error',
      lines: [
        '该编号存在，记录不存在。',
        '状态：尚未创建 · 预定创建时间：本次会话期间',
        '创建请求来源：本终端。你没有提交过这个请求。',
      ],
    },
  },
  {
    id: 'ST-HOLLOW',
    match: ['空册', 'hollow', 'hollow archive'],
    response: {
      tone: 'warn',
      lines: [
        '「空册」为本系统的内部俗称，不是正式名称。',
        '该俗称的由来记于登记二组的工作手记：每完成一次登册，被登册的那件事就会变得空一点。',
        '手记原件已注销。本条说明保留。',
      ],
    },
  },
  {
    id: 'ST-41',
    match: ['41', '四十一', '四十一分钟', '0041'],
    response: {
      tone: 'info',
      lines: [
        '数值 41 在本库 6 处出现：记录中断时长、磁带时间戳偏移、信号丢失长度、波形长度、注销作业耗时、时钟漂移修正量。',
        '统计模块判定：非巧合。判定结论未被采纳，理由栏为空。',
      ],
    },
  },
  {
    id: 'ST-VAULT',
    match: ['底册', 'vault', 'v-411103', '411103'],
    requiresClues: ['CLUE_002'],
    response: {
      tone: 'warn',
      lines: ['底册接口仍在监听。它不接受检索，只接受访问码。'],
    },
    ghostResults: [
      { id: 'GH-VAULT', title: '/x/vault', line: '底册接口 · 需访问码 · 不在目录申报范围内', to: VAULT_PATH },
    ],
  },
  {
    id: 'ST-0176',
    match: ['RS-87-0176', '0176', '零一七六'],
    requiresClues: ['CLUE_004'],
    response: {
      tone: 'error',
      lines: [
        '该编号已生成，内容长度 0。',
        '预定创建时间晚于本系统可表示范围。',
        '本次会话无法读取该记录。请在下一次会话中重试。',
      ],
    },
  },
  {
    id: 'ST-SELF',
    match: ['你是谁', '我是谁', 'who are you', '我是不是'],
    response: {
      tone: 'warn',
      lines: [
        '检索词已记入本次会话日志。',
        '本系统不保存访问者身份，也不需要保存：你每次进来，用的都是同一个终端号。',
      ],
    },
  },
]
