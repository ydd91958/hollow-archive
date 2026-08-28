import type { TraceKey, TraceSnapshot } from '@/shared/state/useTrace'

/**
 * 信号：由跨站访问痕迹推导出的"网站应该发生什么变化"。
 *
 * 设计原则——玩家的行为改变网站，但网站绝不承认这一点。
 * 每条信号只描述一个具体的、可解释的页面变化，不做任何元叙事的自白。
 *
 * 加新信号：在 SignalId 里加一个字面量，往 SIGNALS 里加一条，
 * 然后在对应页面用 useSignal(id) 判断。
 */

export type SignalId = 'SIG_RECOMMEND' | 'SIG_SNAPSHOT' | 'SIG_ATTACHMENT'

export interface Signal {
  id: SignalId
  /** 需要玩家看过的全部实体。 */
  requires: TraceKey[]
  /** 这条信号在哪个页面造成什么变化，仅供开发查阅。 */
  effect: string
}

export const SIGNALS: Signal[] = [
  {
    id: 'SIG_RECOMMEND',
    requires: ['person:WEIYUN', 'project:YL-87-03'],
    effect: '职引首页与职位页的「你可能感兴趣」多出一条玩家从未搜索过的职位：历史项目资料整理员。',
  },
  {
    id: 'SIG_SNAPSHOT',
    requires: ['thread:YL-ACCESS', 'post:1103'],
    effect: '论坛核心帖出现「查看本帖历史版本」，被管理员删除的那条回复变得可读。',
  },
  {
    id: 'SIG_ATTACHMENT',
    requires: ['well:17', 'post:TAPE', 'reveal:BBS-DELETED'],
    effect: '工程资料库的项目附件索引由失效链接变为可点击——这是通往第三层的入口。',
  },
]

const BY_ID = new Map<SignalId, Signal>(SIGNALS.map((s) => [s.id, s] as const))

export function signalActive(id: SignalId, trace: TraceSnapshot): boolean {
  const sig = BY_ID.get(id)
  if (!sig) return false
  return sig.requires.every((k) => trace.seen.includes(k))
}

/** 还差哪几个实体——开发调试用，不对玩家展示。 */
export function signalMissing(id: SignalId, trace: TraceSnapshot): TraceKey[] {
  const sig = BY_ID.get(id)
  if (!sig) return []
  return sig.requires.filter((k) => !trace.seen.includes(k))
}
