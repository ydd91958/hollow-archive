import type { Unlock } from '@/layers/archive/types/arg'

/** 隐藏页面的路径。刻意不放在 /sys/archive 命名空间下。 */
export const VAULT_PATH = '/sys/x/vault'

/** 底册接口的访问码。格式沿用旧规：V-<断层时长><断层日期MMDD>。 */
export const VAULT_CODE = 'V-411103'

export const UNLOCKS: Unlock[] = [
  {
    id: 'UNLOCK_VAULT',
    label: '底册接口',
    requiresClues: ['CLUE_001', 'CLUE_002', 'CLUE_003'],
    grantsPath: VAULT_PATH,
    announcement:
      '目录之外检出一个仍在响应的接口：/x/vault。资料处的下线工单编号为空。接口要求访问码，格式为 V-<断层时长><断层日期MMDD>。你手上已经有这两个数了。',
  },
  {
    id: 'UNLOCK_RS0175',
    label: '第 0175 号残响',
    requiresCodes: [VAULT_CODE],
    grantsArchives: ['RS-87-0175'],
    announcement:
      '访问码通过。底册返回一条编号为 RS-87-0175 的记录。该编号在一九八八年的目录中不存在。它的登记日期是今天。',
  },
]

export const UNLOCK_BY_ID = new Map(UNLOCKS.map((u) => [u.id, u]))
