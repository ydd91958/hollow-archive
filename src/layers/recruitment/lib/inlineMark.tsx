import { Fragment, type ReactNode } from 'react'
import { KeyTerm } from '../components/Emphasis'

/**
 * 文章正文里的行内标记。
 *
 * 数据层只写「这个词重要」，不关心它长什么样：
 *   **华北水测**              → L2 加粗
 *   **!1987**                 → L2 加粗 + 浅底（最该被记住的那几个）
 *   [[华北水测|/company/HBSC]] → L3 加粗 + 可点
 *
 * 渲染出来就是招聘平台把关键词标出来的样子。
 */

const TOKEN = /(\[\[[^\]]+\]\]|\*\*[^*]+\*\*)/g

export function renderInline(text: string): ReactNode {
  const parts = text.split(TOKEN).filter((p) => p !== '')

  return parts.map((part, i) => {
    if (part.startsWith('[[') && part.endsWith(']]')) {
      const inner = part.slice(2, -2)
      const bar = inner.lastIndexOf('|')
      if (bar === -1) return <Fragment key={i}>{inner}</Fragment>
      return (
        <KeyTerm key={i} to={inner.slice(bar + 1)}>
          {inner.slice(0, bar)}
        </KeyTerm>
      )
    }

    if (part.startsWith('**') && part.endsWith('**')) {
      const inner = part.slice(2, -2)
      const hit = inner.startsWith('!')
      return (
        <KeyTerm key={i} level={2} hit={hit}>
          {hit ? inner.slice(1) : inner}
        </KeyTerm>
      )
    }

    return <Fragment key={i}>{part}</Fragment>
  })
}
