export type ClassValue = string | false | null | undefined

/** 极简 classnames。项目里不需要更复杂的东西。 */
export function cn(...parts: ClassValue[]): string {
  return parts.filter(Boolean).join(' ')
}
