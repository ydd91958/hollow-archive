import { useEffect } from 'react'
import { useTrace, type SiteId } from '@/shared/state/useTrace'

export type LayerTheme = 'zy' | 'bbs' | 'legacy' | 'blog' | 'archive'

/**
 * 把当前站点写到 <html data-layer> 上，index.css 据此切换 body 底色与字体。
 * 顺便记一笔"玩家来过这个站"。
 *
 * 每个站点的外壳组件在顶部调用一次即可。
 */
export function useLayerTheme(theme: LayerTheme, site: SiteId, title: string) {
  const enter = useTrace((s) => s.enter)

  useEffect(() => {
    const root = document.documentElement
    const prev = root.dataset.layer
    root.dataset.layer = theme
    return () => {
      if (prev) root.dataset.layer = prev
      else delete root.dataset.layer
    }
  }, [theme])

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    enter(site)
    // 只在站点切换时记一次，页面内跳转不重复计数
  }, [site, enter])
}
