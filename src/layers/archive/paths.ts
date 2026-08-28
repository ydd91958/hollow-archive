/**
 * 空册（第三层）的路由前缀。
 *
 * 第三层不再是站点首页——它挂在 /sys 下面，只能从第二层的一个
 * 看起来很普通的「项目附件」链接进去。前缀集中在这里，
 * 以后要换成别的伪装路径只改这一处。
 */
export const SYS_ROOT = '/sys'

export const SYS = {
  home: SYS_ROOT,
  browse: `${SYS_ROOT}/browse`,
  search: `${SYS_ROOT}/search`,
  timeline: `${SYS_ROOT}/timeline`,
  clues: `${SYS_ROOT}/clues`,
  log: `${SYS_ROOT}/log`,
} as const

export const archivePath = (id: string) => `${SYS_ROOT}/archive/${id}`
