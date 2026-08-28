import type { Archive } from '@/layers/archive/types/archive'
import type { SearchTrigger } from '@/layers/archive/types/arg'
import { stripInline } from './inline'

/** 归一化：忽略大小写、空白、常见分隔符与全角标点。 */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[\s　]/g, '')
    .replace(/[·・．.,，、_—–－]/g, '')
    .trim()
}

export interface Hit {
  archive: Archive
  /** 命中位置，用于在结果里说明"为什么这条会出来"。 */
  where: string[]
  score: number
  /** 命中的正文片段。 */
  excerpt?: string
}

function blockText(a: Archive): string {
  return a.body
    .map((b) => {
      switch (b.kind) {
        case 'text':
        case 'heading':
        case 'damaged':
        case 'margin':
        case 'system':
          return b.text
        case 'field':
          return `${b.label} ${b.value}`
        case 'list':
          return b.items.join(' ')
        case 'quote':
          return `${b.speaker ?? ''} ${b.text}`
        default:
          return ''
      }
    })
    .join('\n')
}

export function searchArchives(pool: Archive[], query: string): Hit[] {
  const q = normalize(query)
  if (!q) return []

  const hits: Hit[] = []

  for (const a of pool) {
    const where: string[] = []
    let score = 0
    let excerpt: string | undefined

    if (normalize(a.id) === q) {
      where.push('编号 · 精确')
      score += 100
    } else if (normalize(a.id).includes(q)) {
      where.push('编号')
      score += 40
    }

    if (normalize(a.title).includes(q)) {
      where.push('标题')
      score += 30
    }
    if (a.codename && normalize(a.codename).includes(q)) {
      where.push('代号')
      score += 30
    }
    if (a.keywords?.some((k) => normalize(k).includes(q) || q.includes(normalize(k)))) {
      where.push('检索词')
      score += 20
    }
    if (normalize(a.summary).includes(q)) {
      where.push('摘要')
      score += 12
    }

    const body = stripInline(blockText(a))
    const idx = normalize(body).indexOf(q)
    if (idx >= 0) {
      where.push('正文')
      score += 8
      // 在原文里粗略定位一段上下文
      const rough = body.replace(/\s+/g, ' ')
      const approx = Math.max(0, Math.floor((idx / normalize(body).length) * rough.length) - 24)
      excerpt = rough.slice(approx, approx + 78)
    }

    if (score > 0) hits.push({ archive: a, where, score, excerpt })
  }

  return hits.sort((x, y) => y.score - x.score || x.archive.id.localeCompare(y.archive.id))
}

/** 找出被这次检索触发的彩蛋。 */
export function matchTriggers(
  triggers: SearchTrigger[],
  query: string,
  heldClues: string[],
): SearchTrigger[] {
  const q = normalize(query)
  if (!q) return []

  return triggers.filter((t) => {
    if (t.requiresClues?.some((c) => !heldClues.includes(c))) return false
    return t.match.some((m) => {
      const n = normalize(m)
      return n === q || q.includes(n)
    })
  })
}
