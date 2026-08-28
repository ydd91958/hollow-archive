import { useTrace } from '@/shared/state/useTrace'
import { SIGNALS, signalActive, type SignalId } from './signals'

/** 当前成立的全部信号。 */
export function useActiveSignals(): SignalId[] {
  const seen = useTrace((s) => s.seen)
  return SIGNALS.filter((sig) => sig.requires.every((k) => seen.includes(k))).map((s) => s.id)
}

/** 单条信号是否成立。 */
export function useSignal(id: SignalId): boolean {
  const seen = useTrace((s) => s.seen)
  return signalActive(id, { seen, visits: {} })
}
