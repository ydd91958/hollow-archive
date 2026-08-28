import type { Archive } from '@/layers/archive/types/archive'

/** 已注销卷宗：在目录里留一个洞，比什么都不留更可疑。 */
export const purged: Archive[] = [
  {
    id: 'EP-88-0012',
    title: '[卷宗已注销]',
    category: 'PURGED',
    status: 'REVOKED',
    clearance: 'SILENT',
    date: '1988-··-··',
    summary: '注销执行完成。摘要字段随正文一并清除。本行由系统生成。',
    body: [
      { kind: 'system', tone: 'error', text: '本卷宗已注销。以下为注销作业自身的记录，按规定保留。' },
      { kind: 'field', label: '原编号', value: 'EP-88-0012' },
      { kind: 'field', label: '原标题', value: '████████████████' },
      { kind: 'field', label: '注销依据', value: '████ 号令第 ██ 条' },
      { kind: 'field', label: '执行', value: '资料技术处' },
      { kind: 'field', label: '复核', value: '[账户不存在]' },
      { kind: 'divider' },
      {
        kind: 'text',
        text: '注销作业清除正文、附件、交叉引用与阅读记录。编号予以保留，以免目录出现空位。',
      },
      { kind: 'text', text: '本次作业耗时四十一分钟。作业期间本系统对外表现为正常。' },
      { kind: 'damaged', text: '████ ██ ████████ ███ ██████ ████████ ██ ███ ████ ████████ ███ ██' },
      {
        kind: 'margin',
        hand: '钢笔',
        text: '注销掉的不是卷宗。是那件事本身。卷宗只是最后一个还记得它的东西。',
      },
    ],
    related: ['RS-87-0174'],
    keywords: ['注销', '删除', '清除', '号令'],
    footer: '注销记录本身不可注销。这是本系统仅有的一条不可逆规则。',
  },
]
