import type { Archive } from '@/layers/archive/types/archive'

/** LC · 地点档案 */
export const loci: Archive[] = [
  {
    id: 'LC-62-0058',
    title: '云盘岭水文观测站 · 第十七号井',
    category: 'LOCUS',
    status: 'SEALED',
    clearance: 'INTERNAL',
    date: '1962-04-18',
    revised: '1988-06-28',
    revisedBy: '资料技术处',
    summary:
      '省级水文观测网下属观测点。一九八七年十一月出现四十一分钟全站记录中断，同月封填。现地表仅存无标识混凝土封填层一处。',
    body: [
      { kind: 'field', label: '坐标', value: '████.████ / ████.████（按 Ⅲ 级监护要求移除）' },
      { kind: 'field', label: '建站', value: '1962 年 4 月' },
      { kind: 'field', label: '井深', value: '二百一十四米' },
      { kind: 'field', label: '现状', value: '1987 年 11 月 6 日封填' },
      { kind: 'divider' },
      { kind: 'heading', text: '沿革' },
      {
        kind: 'text',
        text: '本站原为省级水文观测网下属观测点之一，任务为逐日上报井内水位与井温。一九六二年至一九七九年间提交常规月报共二百零四期，无异常上报。',
      },
      {
        kind: 'text',
        text: '一九七九年起，本站值班表改为夜班双人制。档案中未说明改制原因，亦无对应的人事批复。改制当年的值班表由 {{ref:PN-79-0091}} 归档。',
      },
      { kind: 'heading', text: '一九八七年十一月三日' },
      {
        kind: 'text',
        text: '该日二十二时十四分至二十二时五十五分，本站全部记录中断，历时四十一分钟。中断期间：纸带记录笔停留在同一位置；值班日志缺一页；井温自记曲线为一条直线。',
      },
      {
        kind: 'text',
        text: '二十二时五十五分记录恢复。恢复后的第一行日志由当班值班员写下，全文为：「已复位。请勿询问。」该行之后另有一行被涂销，涂销层下可辨认出两个数字。',
      },
      { kind: 'margin', hand: '铅笔 · 极轻', text: '四十一分钟。纸带上没有断口。笔一直是抬着的。' },
      {
        kind: 'text',
        text: '该日之后，本站不再提交月报。一九八七年十一月六日，本井按 {{ref:RS-87-0174}} 所载方案封填。',
      },
      { kind: 'heading', text: '现状核查' },
      {
        kind: 'text',
        text: '地表遗留混凝土封填层一处，直径二点二米，无标识。周边三百米内无常住人口。本局每年派员核查一次，核查记录见附件。',
      },
      {
        kind: 'system',
        tone: 'info',
        text: '本卷宗与 {{ref:RS-87-0174}} 存在交叉引用。交叉字段：日期。该字段在 RS-87-0174 中已被遮挡，在本卷宗中未被遮挡。',
      },
    ],
    attachments: [
      { id: 'A-0058-1', name: '年度核查记录 1988—', kind: 'DOCUMENT', state: 'MISSING', note: '一九八八年之后的核查记录不在库。派员记录显示每年均有人前往，但无人回报。' },
      { id: 'A-0058-2', name: '封填作业照片（4 张）', kind: 'IMAGE', size: '2.1 MB', state: 'CORRUPT', note: '四张照片可解码为同一帧。拍摄时间戳互不相同。' },
      { id: 'A-0058-3', name: '值班日志 1987-11 · 扫描件', kind: 'DOCUMENT', size: '——', state: 'MISSING', note: '缺页处为整齐撕口。撕口位置在装订线内侧，从外部无法撕出这种断口。' },
    ],
    related: ['RS-87-0174', 'IR-88-0233', 'PN-79-0091'],
    keywords: ['云盘岭', '观测井', '四十一分钟', '封填', '1987-11-03', '十七号'],
    footer: '本卷宗为内部级，无阅读限制。请勿转述给未登记人员。',
  },
]
