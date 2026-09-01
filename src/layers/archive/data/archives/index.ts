import type { Archive, ArchiveCategory } from '@/layers/archive/types/archive'
import { residuum } from './residuum'
import { loci } from './loci'
import { personnel } from './personnel'
import { investigations } from './investigations'
import { transcripts } from './transcripts'
import { purged } from './purged'
import { registry } from './registry'
import { holes } from './holes'

/**
 * 全部卷宗的唯一来源。
 * 扩充剧情时：往对应的分类文件里加对象，或新建一个分类文件并在这里 concat。
 * 组件永远不直接 import 分类文件。
 */
export const ALL_ARCHIVES: Archive[] = [
  ...residuum,
  ...loci,
  ...personnel,
  ...investigations,
  ...transcripts,
  ...purged,
  ...registry,
  ...holes,
]

const BY_ID = new Map(ALL_ARCHIVES.map((a) => [a.id, a]))

export function getArchive(id: string): Archive | undefined {
  return BY_ID.get(id.trim().toUpperCase())
}

/**
 * 目录对外申报的条数。
 *
 * 十三份卷宗里两份有门槛：TX-88-0007 要 CLUE_001，RS-87-0175 要解锁。
 * 所以起始可见十一份，申报数就是十一，对得上。
 * 玩家拿到 CLUE_001 之后实际返回变成十二，申报数不动——
 * 「申报 11 实际返回 12」这句系统提示从那一刻起开始成立。
 */
export const DECLARED_INDEX_COUNT = 11

export interface Access {
  clues: string[]
  unlocks: string[]
}

/** 一份卷宗当前是否对玩家可见。 */
export function isVisible(a: Archive, access: Access): boolean {
  if (a.requiresClues?.some((c) => !access.clues.includes(c))) return false
  if (a.requiresUnlocks?.some((u) => !access.unlocks.includes(u))) return false
  return true
}

export function visibleArchives(access: Access): Archive[] {
  return ALL_ARCHIVES.filter((a) => isVisible(a, access))
}

/** 分类顺序：目录页左侧的排列。 */
export const CATEGORY_ORDER: ArchiveCategory[] = [
  'RESIDUUM',
  'LOCUS',
  'PERSONNEL',
  'INVESTIGATION',
  'TRANSCRIPT',
  'PROTOCOL',
  'PURGED',
]
