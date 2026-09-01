import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * 跨站访问痕迹。
 *
 * 这是第一层与第二层之间唯一的耦合点：各个"网站"彼此不知道对方存在，
 * 但它们都往同一个痕迹表里写自己被看过了。信号（signals.ts）再从这张表
 * 推导出"网站应该发生什么变化"。
 *
 * 和第三层的 useSession 刻意分开：空册有自己的线索/解锁引擎，
 * 那是玩家进入内网之后的事，两套系统不应该互相知道细节。
 */

/** 实体键统一格式：`kind:ID`，便于 grep 和以后扩展。 */
export type TraceKey =
  | `job:${string}`
  | `company:${string}`
  | `person:${string}`
  | `project:${string}`
  | `well:${string}`
  | `thread:${string}`
  | `post:${string}`
  | `doc:${string}`
  | `reveal:${string}`
  | `wx:${string}`

export type SiteId = 'zy' | 'bbs' | 'lg' | 'blog' | 'wx' | 'sys'

interface TraceState {
  /** 看过的实体，按首次访问顺序。 */
  seen: TraceKey[]
  /** 每个实体的首次访问时间戳。 */
  at: Record<string, number>
  /** 访问过的站点，用于"你从哪儿来的"之类的细节。 */
  sites: SiteId[]
  /** 每个站点被打开的次数——「第二次回到职引」这类判断要用。 */
  visits: Record<string, number>

  note: (key: TraceKey) => void
  enter: (site: SiteId) => void
  has: (key: TraceKey) => boolean
  hasAll: (keys: TraceKey[]) => boolean
  reset: () => void
}

export const useTrace = create<TraceState>()(
  persist(
    (set, get) => ({
      seen: [],
      at: {},
      sites: [],
      visits: {},

      note(key) {
        if (get().seen.includes(key)) return
        set((s) => ({ seen: [...s.seen, key], at: { ...s.at, [key]: Date.now() } }))
      },

      enter(site) {
        set((s) => ({
          sites: s.sites.includes(site) ? s.sites : [...s.sites, site],
          visits: { ...s.visits, [site]: (s.visits[site] ?? 0) + 1 },
        }))
      },

      has(key) {
        return get().seen.includes(key)
      },

      hasAll(keys) {
        const seen = get().seen
        return keys.every((k) => seen.includes(k))
      },

      reset() {
        set({ seen: [], at: {}, sites: [], visits: {} })
      },
    }),
    { name: 'trace.v1' },
  ),
)

/** 供纯函数使用的快照。 */
export interface TraceSnapshot {
  seen: TraceKey[]
  visits: Record<string, number>
}

export function traceOf(s: TraceState): TraceSnapshot {
  return { seen: s.seen, visits: s.visits }
}
