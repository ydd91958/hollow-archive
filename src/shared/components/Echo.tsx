import { useEcho, type EchoStage } from '@/shared/lib/echo'

/**
 * 回响。
 *
 * 玩家到了某一档之后，这段文字变成另一段。
 *
 * 规则：
 *   1. 不加任何视觉提示。没有高亮，没有动画，没有 title 属性
 *   2. 改动必须小。一个词、一个数、一个后缀
 *   3. 改动的方向永远是「向档案的版本靠拢」，不是向真相靠拢
 *   4. 站点从不承认发生过变化
 *
 * 玩家唯一能察觉的方式是他自己记得刚才不是这样。
 * 那正是这个游戏在讲的事。
 */
export function Echo({
  was,
  now,
  at = 2,
}: {
  /** 回响前。 */
  was: string
  /** 回响后。 */
  now: string
  at?: EchoStage
}) {
  const echoed = useEcho(at)
  return <>{echoed ? now : was}</>
}

/** 只在回响之后才出现的一整句。回响前什么都不渲染。 */
export function EchoOnly({ children, at = 2 }: { children: React.ReactNode; at?: EchoStage }) {
  const echoed = useEcho(at)
  if (!echoed) return null
  return <>{children}</>
}
