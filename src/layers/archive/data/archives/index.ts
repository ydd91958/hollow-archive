import type { Archive, ArchiveCategory } from '@/layers/archive/types/archive'
import { residuum } from './residuum'
import { loci } from './loci'
import { personnel } from './personnel'
import { investigations } from './investigations'
import { transcripts } from './transcripts'
import { purged } from './purged'

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
]

const BY_ID = new Map(ALL_ARCHIVES.map((a) => [a.id, a]))

export function getArchive(id: string): Archive | undefined {
  return BY_ID.get(id.trim().toUpperCase())
}

/**
 * 目录对外申报的条数。
 * 起始状态下与实际可见数相等；玩家拿到 CLUE_001 后 TX-88-0007 出现，
 * 实际返回变为 6——这时系统那句"申报 5 实际返回 6"才对得上。
 */
export const DECLARED_INDEX_COUNT = 5

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
