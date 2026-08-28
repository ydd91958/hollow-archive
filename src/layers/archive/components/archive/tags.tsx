import type { Archive, ArchiveStatus, Clearance } from '@/layers/archive/types/archive'
import { CLEARANCE_LABEL, STATUS_LABEL, CATEGORY_LABEL } from '@/layers/archive/types/archive'
import { Tag } from '@/layers/archive/components/ui/Panel'

const CLEARANCE_TONE: Record<Clearance, 'dim' | 'cyan' | 'amber' | 'silent'> = {
  OPEN: 'dim',
  INTERNAL: 'cyan',
  RESTRICTED: 'amber',
  SILENT: 'silent',
}

const STATUS_TONE: Record<ArchiveStatus, 'dim' | 'cyan' | 'amber' | 'rust'> = {
  ACTIVE: 'cyan',
  SEALED: 'dim',
  DISPUTED: 'amber',
  REVOKED: 'rust',
  CORRUPT: 'rust',
  PENDING: 'rust',
}

export function ClearanceTag({ value }: { value: Clearance }) {
  return <Tag tone={CLEARANCE_TONE[value]}>{CLEARANCE_LABEL[value]}</Tag>
}

export function StatusTag({ value }: { value: ArchiveStatus }) {
  return <Tag tone={STATUS_TONE[value]}>{STATUS_LABEL[value]}</Tag>
}

export function CategoryTag({ value }: { value: Archive['category'] }) {
  return <Tag>{CATEGORY_LABEL[value]}</Tag>
}
