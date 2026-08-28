import type { Clue } from '@/layers/archive/types/arg'

/**
 * 第一章线索链
 *
 *   读 RS-87-0174 + LC-62-0058 ──► CLUE_001（补全遮挡条 → 拿到 1103）
 *   读 LC-62-0058 + PN-79-0091 ──► CLUE_003（拿到 41）
 *   在检索框输入「别相信目录」 ──► CLUE_002（知道目录之外还有页面）
 *
 *   CLUE_001 + CLUE_002 + CLUE_003 ──► UNLOCK_VAULT（底册接口出现在导航里）
 *   在底册接口提交 V-411103      ──► UNLOCK_RS0175（新卷宗）
 *   读 RS-87-0175                ──► CLUE_004（第二章钩子）
 *
 * 新增线索只需往这个数组里加对象；引擎会自动评估。
 */
export const CLUES: Clue[] = [
  {
    id: 'CLUE_001',
    label: '井底的那个日期',
    origin: 'RS-87-0174 × LC-62-0058',
    payload: '1103',
    hint: 'RS-87-0174 的「首次确认」被遮挡了，但 LC-62-0058 把同一天完整写了出来。两份卷宗对同一个字段的处理不一致——遮挡的那一份现在可以读了。',
    triggers: [{ type: 'READ_ALL', archives: ['RS-87-0174', 'LC-62-0058'] }],
  },
  {
    id: 'CLUE_003',
    label: '四十一',
    origin: 'LC-62-0058 × PN-79-0091',
    payload: '41',
    hint: '记录中断四十一分钟。磁带比作业早四小时十一分。信号丢失四十一秒。注销作业耗时四十一分钟。清退清单上那行「41 / 1103」不是编号，是有人怕自己忘掉。',
    triggers: [{ type: 'READ_ALL', archives: ['LC-62-0058', 'PN-79-0091'] }],
  },
  {
    id: 'CLUE_002',
    label: '别相信目录',
    origin: 'IR-88-0233 段首 / TX-88-0007 末段',
    payload: '别相信目录',
    hint: '目录申报 5 条，实际返回 6 条。这句话出现过两次：一次藏在一份报告的每段头一个字里，一次由一个和撰写人同声纹的声音说出来。既然目录不可信，那就说明有页面不在目录里。',
    triggers: [
      {
        type: 'SEARCH',
        terms: ['别相信目录', '不要相信目录', '别相信索引', 'dont trust the index', "don't trust the index"],
      },
    ],
  },
  {
    id: 'CLUE_004',
    label: '登记员栏里的名字',
    origin: 'RS-87-0175',
    payload: '本次访问者',
    hint: '第 0175 号残响的登记员写的是「本次访问者」。这份卷宗不是在描述某个现象——它是在描述你正在做的这件事。下一条编号已经生成，但还没有内容。',
    triggers: [{ type: 'READ_ANY', archives: ['RS-87-0175'] }],
  },
]

export const CLUE_BY_ID = new Map(CLUES.map((c) => [c.id, c]))

/**
 * 不构成线索、但会写进系统日志的小提示。
 * 玩家挖出隐藏元素时触发，用来把人往正确的方向推一下，而不直接给答案。
 */
export const REVEAL_HINTS: Record<string, string> = {
  IR233_INK: '介质残留：一行未印出的字被读出。「每段头一个字。别写进正文里。」——请自行拼读，然后把它输进检索框。',
  HOME_SEAL: '首页页脚的登记编号是可以点的。大多数人不会去点。',
}
