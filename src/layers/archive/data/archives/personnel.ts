import type { Archive } from '@/layers/archive/types/archive'

/** PN · 人员档案 */
export const personnel: Archive[] = [
  {
    id: 'PN-79-0091',
    title: '韦昀 · 登记员',
    category: 'PERSONNEL',
    status: 'REVOKED',
    clearance: 'RESTRICTED',
    date: '1979-08-20',
    revised: '1983-09-02',
    revisedBy: '[账户不存在]',
    summary: '原资料技术处登记二组登记员。本记录存在时序矛盾，已三次上报，未处理。',
    body: [
      { kind: 'field', label: '姓名', value: '韦昀' },
      { kind: 'field', label: '编制号', value: 'PN-79-0091' },
      { kind: 'field', label: '部门', value: '资料技术处 · 登记二组' },
      { kind: 'field', label: '入职', value: '1984-06-11' },
      { kind: 'field', label: '注销', value: '1983-09-02' },
      { kind: 'field', label: '照片', value: '[图像已从介质中移除，移除者字段为空]' },
      {
        kind: 'system',
        tone: 'error',
        text: '字段校验失败：注销日期早于入职日期。系统已尝试自动修正 3 次。每次修正提交后，字段在下一次读取时恢复原值。',
      },
      { kind: 'divider' },
      { kind: 'heading', text: '履历' },
      {
        kind: 'list',
        items: [
          '1979 · 归档云盘岭观测站值班表改制文件。（本条早于入职日期五年，未修正）',
          '1984 · 任登记二组登记员。',
          '1986 · 参与第十七号井前期声学勘测。',
          '1987 · 确认 {{ref:RS-87-0174}}，署名为确认人。',
          '1988 · 撰写 {{ref:IR-88-0233}}。（本条晚于注销日期五年，未修正）',
        ],
      },
      { kind: 'heading', text: '备注' },
      {
        kind: 'text',
        text: '注销原因栏为空。人事处答复：该栏自始为空，非删除所致。本局无该员的离职谈话记录、无移交清单签收页、无门禁注销回执。',
      },
      {
        kind: 'text',
        text: '个人物品清退清单遗留一行未划销条目：磁带一盘。编号栏未按规范填写编号，而是写作 —— 41 / 1103。清退人签名不可辨。',
      },
      { kind: 'margin', hand: '圆珠笔 · 用力过重划破纸面', text: '他把两个数字写在一起了。那不是编号。那是提醒。' },
      {
        kind: 'system',
        tone: 'warn',
        text: '本人员在本系统内的最近一次登录时间为：数值超出可表示范围。会话状态：在线。',
      },
    ],
    attachments: [
      { id: 'A-0091-1', name: '一寸照片', kind: 'IMAGE', state: 'MISSING', note: '文件不存在。缩略图缓存存在，尺寸 0×0。' },
      { id: 'A-0091-2', name: '清退清单 · 扫描件', kind: 'DOCUMENT', size: '440 KB', state: 'CORRUPT', note: '可解码区域仅剩编号栏一行。其余部分为均匀灰度。' },
      { id: 'A-0091-3', name: '门禁与登录记录', kind: 'DATA', state: 'QUARANTINED', note: '记录仍在增长。最近一条写入于本次会话开始后第 11 秒。' },
    ],
    related: ['RS-87-0174', 'IR-88-0233', 'LC-62-0058'],
    keywords: ['韦昀', '登记员', '注销', '41', '1103', '编制'],
    footer: '人员卷宗一经注销即不可编辑。本卷宗的修订计数为 3。',
  },
]
