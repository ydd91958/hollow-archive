import { Fragment, type ReactNode } from 'react'
import { Echo } from '@/shared/components/Echo'

/**
 * 正文里的回响标记。
 *
 *   {{echo:四十来分钟|四十分钟}}
 *
 * 数据层只写「这一处会变」，怎么判断变没变由 Echo 决定。
 * 论坛、博客、资料库三个站共用同一套写法。
 */
const TOKEN = /(\{\{echo:[^}]+\}\})/g

export function renderEcho(text: string): ReactNode {
  if (!text.includes('{{echo:')) return text

  return text
    .split(TOKEN)
    .filter((p) => p !== '')
    .map((part, i) => {
      if (!part.startsWith('{{echo:')) return <Fragment key={i}>{part}</Fragment>
      const inner = part.slice(7, -2)
      const bar = inner.indexOf('|')
      if (bar === -1) return <Fragment key={i}>{inner}</Fragment>
      return <Echo key={i} was={inner.slice(0, bar)} now={inner.slice(bar + 1)} />
    })
}
