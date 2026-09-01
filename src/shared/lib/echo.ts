import { useState } from 'react'
import { useTrace } from '@/shared/state/useTrace'
import { signalActive } from './signals'

/**
 * 著录反应的分期。
 *
 * 故事设定里这是玩家被感染的程度，但站点从不承认这件事。
 * 对代码来说它只是一个由既有信号推导出来的档位。
 *
 *   0  没开始
 *   1  复述期。玩家已经把两个站对上了
 *   2  替代期。四个站全走过。回响从这一档开始
 *   3  归档期。进过空册
 */
export type EchoStage = 0 | 1 | 2 | 3

function computeStage(): EchoStage {
  const { seen, sites } = useTrace.getState()
  const snap = { seen, visits: {} }
  if (sites.includes('sys')) return 3
  if (signalActive('SIG_ATTACHMENT', snap)) return 2
  if (signalActive('SIG_SNAPSHOT', snap)) return 1
  return 0
}

/**
 * 取当前分期。
 *
 * 关键在于它**只在挂载时算一次**，之后这个页面的分期就冻住了。
 *
 * 因为访问某个页面这件事本身可能就是最后一把钥匙。比如气象站那一页，
 * 打开它就写入 wx:1987-11-03，信号当场成立。如果实时读，玩家第一次
 * 看到那两行时就已经是回响后的版本，文字会在他眼皮底下翻一下，
 * 而且他永远见不到原版——回响就白做了。
 *
 * 冻在挂载那一刻，行为才是对的：第一次看是原文，离开再回来才变。
 * 那正是这个机制想要的效果——玩家自己记得刚才不是这样。
 */
export function useEchoStage(): EchoStage {
  const [stage] = useState<EchoStage>(computeStage)
  return stage
}

/** 到没到某一档。默认问的是回响（二期）。 */
export function useEcho(at: EchoStage = 2): boolean {
  return useEchoStage() >= at
}
