import type { Clue, Trigger, Unlock } from '@/layers/archive/types/arg'
import { normalize } from './search'

/** 引擎求值时需要的全部玩家状态。保持成纯数据，方便测试。 */
export interface Progress {
  readArchives: string[]
  searches: string[]
  codes: string[]
  reveals: string[]
  visited: string[]
  clues: string[]
  unlocks: string[]
}

function satisfied(tr: Trigger, p: Progress): boolean {
  switch (tr.type) {
    case 'READ_ALL':
      return tr.archives.every((id) => p.readArchives.includes(id))
    case 'READ_ANY':
      return tr.archives.some((id) => p.readArchives.includes(id))
    case 'SEARCH': {
      const done = p.searches.map(normalize)
      return tr.terms.some((t) => {
        const n = normalize(t)
        return done.some((d) => d === n || d.includes(n))
      })
    }
    case 'CODE':
      return p.codes.map(normalize).includes(normalize(tr.value))
    case 'REVEAL':
      return p.reveals.includes(tr.token)
    case 'HAS_CLUES':
      return tr.clues.every((c) => p.clues.includes(c))
    case 'VISIT':
      return p.visited.includes(tr.path)
  }
}

/** 返回本次求值中"刚刚"被满足的线索。 */
export function newlyDiscovered(clues: Clue[], p: Progress): Clue[] {
  return clues.filter((c) => !p.clues.includes(c.id) && c.triggers.some((t) => satisfied(t, p)))
}

/** 返回本次求值中"刚刚"达成的解锁。 */
export function newlyUnlocked(unlocks: Unlock[], p: Progress): Unlock[] {
  return unlocks.filter((u) => {
    if (p.unlocks.includes(u.id)) return false
    if (u.requiresClues?.some((c) => !p.clues.includes(c))) return false
    if (u.requiresCodes?.some((c) => !p.codes.map(normalize).includes(normalize(c)))) return false
    return true
  })
}

/**
 * 数据库"完整度"。玩家挖得越深，这个数越低。
 * 它驱动全站异常强度：扫描线、闪断、幽灵条目、状态栏里那个多出来的用户。
 */
export function integrityOf(p: Progress): number {
  const cost = p.clues.length * 9 + p.unlocks.length * 11 + Math.min(p.readArchives.length, 8) * 2
  return Math.max(38, 100 - cost)
}

/** 异常强度分档，组件按档位决定表现，避免每个组件各写一套阈值。 */
export type AnomalyLevel = 0 | 1 | 2 | 3

export function anomalyLevel(p: Progress): AnomalyLevel {
  const n = p.clues.length + p.unlocks.length * 2
  if (n >= 7) return 3
  if (n >= 4) return 2
  if (n >= 1) return 1
  return 0
}
