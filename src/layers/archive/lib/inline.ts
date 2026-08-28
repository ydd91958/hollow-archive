/**
 * 正文行内标记的解析器（纯函数，渲染在 components/ui/InlineText.tsx）。
 *
 * 支持：
 *   {{redact:CLUE_001|1987-11-03}}   遮挡条。持有 CLUE_001 后自动显影。
 *   {{redact:|某内容}}                永远遮挡（本局就是不想让你看到）。
 *   {{hidden:一句话}}                 隐形墨水：只有拖蓝或点击才看得见。
 *   {{ref:LC-62-0058}}               交叉引用，可点击跳转。
 *   {{glitch:文字}}                   偶尔抖一下的字。
 *   {{dim:文字}}                      次要文字。
 */

export type InlineToken =
  | { t: 'text'; v: string }
  | { t: 'redact'; clue: string | null; v: string }
  | { t: 'hidden'; v: string }
  | { t: 'ref'; v: string }
  | { t: 'glitch'; v: string }
  | { t: 'dim'; v: string }

const PATTERN = /\{\{(redact|hidden|ref|glitch|dim):([^}]*)\}\}/g

export function parseInline(input: string): InlineToken[] {
  const out: InlineToken[] = []
  let last = 0

  PATTERN.lastIndex = 0
  let m: RegExpExecArray | null
  while ((m = PATTERN.exec(input)) !== null) {
    if (m.index > last) out.push({ t: 'text', v: input.slice(last, m.index) })

    const kind = m[1]
    const raw = m[2]

    if (kind === 'redact') {
      const sep = raw.indexOf('|')
      const clue = sep >= 0 ? raw.slice(0, sep).trim() : ''
      const value = sep >= 0 ? raw.slice(sep + 1) : raw
      out.push({ t: 'redact', clue: clue.length ? clue : null, v: value })
    } else if (kind === 'hidden') {
      out.push({ t: 'hidden', v: raw })
    } else if (kind === 'ref') {
      out.push({ t: 'ref', v: raw.trim() })
    } else if (kind === 'glitch') {
      out.push({ t: 'glitch', v: raw })
    } else {
      out.push({ t: 'dim', v: raw })
    }

    last = m.index + m[0].length
  }

  if (last < input.length) out.push({ t: 'text', v: input.slice(last) })
  return out
}

/** 去掉所有标记，只留可读文本——检索时用这个版本。 */
export function stripInline(input: string): string {
  return parseInline(input)
    .map((tok) => (tok.t === 'hidden' ? '' : tok.v))
    .join('')
}

/** 生成一条遮挡条的显示字符（未解锁时）。 */
export function blackBar(len: number): string {
  return '█'.repeat(Math.max(2, Math.min(len, 24)))
}
