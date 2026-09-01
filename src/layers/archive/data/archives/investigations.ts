import type { Archive } from '@/layers/archive/types/archive'

/** IR · 调查报告 */
export const investigations: Archive[] = [
  {
    id: 'IR-88-0233',
    title: '关于第十七号井四十一分钟记录空白的补充说明',
    category: 'INVESTIGATION',
    status: 'DISPUTED',
    clearance: 'RESTRICTED',
    date: '1988-05-17',
    revised: '1988-06-29',
    revisedBy: '[账户不存在]',
    summary:
      '登记二组就一九八七年十一月三日记录中断提交的补充说明。撰写人署名早已注销。本报告被标记为记录存疑，但未被撤回。',
    body: [
      { kind: 'field', label: '撰写', value: '登记员 {{ref:PN-79-0091}}' },
      { kind: 'field', label: '提交', value: '1988-05-17' },
      { kind: 'field', label: '受理', value: '资料技术处（受理人签名栏为空）' },
      { kind: 'divider' },
      {
        kind: 'text',
        text: '别的观测站也上报过记录中断，但时长均不足十分钟，且均可归因于供电或纸带卡阻。云盘岭这一次两者都不是。供电日志连续，纸带完好，笔尖有墨。',
      },
      {
        kind: 'text',
        text: '相邻年份的值班表显示，本站自一九七九年起长期维持夜班双人制。这项改制没有批复文件。我向人事处询问过三次，第三次他们让我不要再问，并且把我的询问登记成了一次残响上报。',
      },
      {
        kind: 'text',
        text: '信号中断期间，井内水听器仍在工作。它与记录系统共用一路供电。记录系统停了，水听器没停。这在电气上说不通，除非停下来的不是设备。',
      },
      {
        kind: 'text',
        text: '目前可以确认的只有一件事：那四十一分钟里，井里有东西在录音。录下来的不是我们说过的话。是我们后来才说的话。',
      },
      {
        kind: 'text',
        text: '录音介质的物理检查未发现磨损，未发现二次写入痕迹，未发现拼接。磁粉排列均匀。第二层内容不在磁粉上。它在别处，只是借这盘带子响了一次。',
      },
      { kind: 'divider' },
      {
        kind: 'text',
        text: '以上五段为本人独立判断，与登记二组集体意见无关。若本页在归档后被修改，请以本人手写副本为准。{{hidden:每段头一个字。别写进正文里。}}',
      },
      { kind: 'margin', hand: '不同笔迹 · 后加', text: '手写副本未随卷。清退清单上也没有。' },
      {
        kind: 'system',
        tone: 'warn',
        text: '本报告已被标记为「记录存疑」，标记人字段为空。标记原因：撰写人在提交日期前已注销。',
      },
      {
        kind: 'damaged',
        text: '本页余下内容不可读。介质剩余长度 3 页，读取返回空白。空白页的行距与本页一致。',
      },
    ],
    attachments: [
      {
        id: 'A-0233-1',
        name: '手写副本',
        kind: 'DOCUMENT',
        state: 'MISSING',
        note: '在册记录：从未入库。撰写人在正文中称其存在。',
      },
      {
        id: 'A-0233-2',
        name: '供电日志 1987-11-03',
        kind: 'DATA',
        size: '96 KB',
        state: 'AVAILABLE',
        note: '连续，无中断。十七时四十一分至十八时二十二分之间的采样点存在，数值全部为前一采样点的复制。',
      },
      {
        id: 'A-0233-3',
        name: '水听器原始波形',
        kind: 'AUDIO',
        size: '——',
        state: 'QUARANTINED',
        note: '波形文件长度为 41 分 00 秒 000 毫秒。整数。自然录制不会得到这个结果。',
      },
    ],
    related: ['LC-62-0058', 'RS-87-0174', 'PN-79-0091'],
    keywords: ['四十一分钟', '补充说明', '水听器', '存疑', '云盘岭'],
    footer: '标记为存疑的报告不参与目录校验计数。',
  },
]
