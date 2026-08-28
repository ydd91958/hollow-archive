import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LogEntry } from '@/layers/archive/types/arg'
import { CLUES, REVEAL_HINTS } from '@/layers/archive/data/clues'
import { UNLOCKS } from '@/layers/archive/data/unlocks'
import { newlyDiscovered, newlyUnlocked, type Progress } from '@/layers/archive/lib/engine'
import { normalize } from '@/layers/archive/lib/search'
import { fullStamp, stamp } from '@/shared/lib/format'

export interface Toast {
  key: number
  kind: 'CLUE' | 'UNLOCK' | 'HINT' | 'SYSTEM'
  title: string
  body: string
}

interface SessionState extends Progress {
  startedAt: number
  log: LogEntry[]
  toasts: Toast[]

  markRead: (archiveId: string) => void
  recordSearch: (query: string) => void
  submitCode: (value: string) => boolean
  reveal: (token: string) => void
  visit: (path: string) => void
  pushLog: (text: string, tone?: LogEntry['tone']) => void
  dismissToast: (key: number) => void
  purge: () => void
}

const EMPTY: Progress = {
  readArchives: [],
  searches: [],
  codes: [],
  reveals: [],
  visited: [],
  clues: [],
  unlocks: [],
}

let toastSeq = 1

export const useSession = create<SessionState>()(
  persist(
    (set, get) => {
      /** 每次状态变动后跑一次引擎，把新线索/新解锁写进状态并播报。 */
      const evaluate = () => {
        const s = get()
        let progress: Progress = {
          readArchives: s.readArchives,
          searches: s.searches,
          codes: s.codes,
          reveals: s.reveals,
          visited: s.visited,
          clues: s.clues,
          unlocks: s.unlocks,
        }

        const gainedClues = newlyDiscovered(CLUES, progress)
        if (gainedClues.length) {
          progress = { ...progress, clues: [...progress.clues, ...gainedClues.map((c) => c.id)] }
        }

        const gainedUnlocks = newlyUnlocked(UNLOCKS, progress)
        if (gainedUnlocks.length) {
          progress = { ...progress, unlocks: [...progress.unlocks, ...gainedUnlocks.map((u) => u.id)] }
        }

        if (!gainedClues.length && !gainedUnlocks.length) return

        const toasts: Toast[] = [
          ...gainedClues.map<Toast>((c) => ({
            key: toastSeq++,
            kind: 'CLUE',
            title: `线索 · ${c.id} · ${c.label}`,
            body: c.hint,
          })),
          ...gainedUnlocks.map<Toast>((u) => ({
            key: toastSeq++,
            kind: 'UNLOCK',
            title: `解锁 · ${u.id} · ${u.label}`,
            body: u.announcement,
          })),
        ]

        const logs: LogEntry[] = [
          ...gainedClues.map<LogEntry>((c) => ({ t: stamp(), text: `线索登记 ${c.id}「${c.label}」`, tone: 'good' })),
          ...gainedUnlocks.map<LogEntry>((u) => ({ t: stamp(), text: `权限变更 ${u.id} → 放行`, tone: 'warn' })),
        ]

        set((st) => ({
          clues: progress.clues,
          unlocks: progress.unlocks,
          toasts: [...st.toasts, ...toasts],
          log: [...logs.reverse(), ...st.log].slice(0, 200),
        }))
      }

      return {
        ...EMPTY,
        startedAt: Date.now(),
        log: [{ t: stamp(), text: `会话建立 · ${fullStamp()}`, tone: 'info' }],
        toasts: [],

        markRead(archiveId) {
          if (get().readArchives.includes(archiveId)) return
          set((s) => ({
            readArchives: [...s.readArchives, archiveId],
            log: [{ t: stamp(), text: `调阅 ${archiveId}`, tone: 'info' } as LogEntry, ...s.log].slice(0, 200),
          }))
          evaluate()
        },

        recordSearch(query) {
          const q = query.trim()
          if (!q) return
          set((s) => ({
            searches: s.searches.includes(q) ? s.searches : [...s.searches, q],
            log: [{ t: stamp(), text: `检索「${q}」`, tone: 'info' } as LogEntry, ...s.log].slice(0, 200),
          }))
          evaluate()
        },

        submitCode(value) {
          const v = value.trim()
          if (!v) return false
          const before = get().unlocks.length
          set((s) => ({
            codes: s.codes.map(normalize).includes(normalize(v)) ? s.codes : [...s.codes, v],
            log: [{ t: stamp(), text: `提交访问码 ${v.toUpperCase()}`, tone: 'warn' } as LogEntry, ...s.log].slice(0, 200),
          }))
          evaluate()
          const ok = get().unlocks.length > before
          if (!ok) {
            set((s) => ({
              log: [{ t: stamp(), text: '访问码校验失败 · 0x41', tone: 'error' } as LogEntry, ...s.log].slice(0, 200),
            }))
          }
          return ok
        },

        reveal(token) {
          if (get().reveals.includes(token)) return
          const hint = REVEAL_HINTS[token]
          set((s) => ({
            reveals: [...s.reveals, token],
            log: [{ t: stamp(), text: `介质残留读出 · ${token}`, tone: 'warn' } as LogEntry, ...s.log].slice(0, 200),
            toasts: hint
              ? [...s.toasts, { key: toastSeq++, kind: 'HINT' as const, title: '介质残留', body: hint }]
              : s.toasts,
          }))
          evaluate()
        },

        visit(path) {
          if (get().visited.includes(path)) return
          set((s) => ({ visited: [...s.visited, path] }))
          evaluate()
        },

        pushLog(text, tone = 'info') {
          set((s) => ({ log: [{ t: stamp(), text, tone }, ...s.log].slice(0, 200) }))
        },

        dismissToast(key) {
          set((s) => ({ toasts: s.toasts.filter((t) => t.key !== key) }))
        },

        purge() {
          set({
            ...EMPTY,
            startedAt: Date.now(),
            toasts: [],
            log: [{ t: stamp(), text: '本地会话已清除。服务端记录不受影响。', tone: 'error' }],
          })
        },
      }
    },
    {
      name: 'hollow.session.v1',
      partialize: (s) => ({
        readArchives: s.readArchives,
        searches: s.searches,
        codes: s.codes,
        reveals: s.reveals,
        visited: s.visited,
        clues: s.clues,
        unlocks: s.unlocks,
        startedAt: s.startedAt,
        log: s.log,
      }),
    },
  ),
)

/** 只取进度部分，交给引擎的纯函数。 */
export function progressOf(s: SessionState): Progress {
  return {
    readArchives: s.readArchives,
    searches: s.searches,
    codes: s.codes,
    reveals: s.reveals,
    visited: s.visited,
    clues: s.clues,
    unlocks: s.unlocks,
  }
}

