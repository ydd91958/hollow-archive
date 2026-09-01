import type { Archive } from '@/layers/archive/types/archive'

/** TX · 转录 */
export const transcripts: Archive[] = [
  {
    id: 'TX-88-0007',
    title: 'T-17 磁带第二层内容转录',
    category: 'TRANSCRIPT',
    status: 'CORRUPT',
    clearance: 'SILENT',
    date: '1988-06-02',
    summary: '缄默级。本卷宗不在目录申报范围内。它在你取得第一条线索之后才出现在返回结果里。',
    requiresClues: ['CLUE_001'],
    body: [
      {
        kind: 'system',
        tone: 'error',
        text: '缄默级卷宗。你的终端不具备调阅权限。权限校验已通过。以上两句都成立，本系统不予解释。',
      },
      { kind: 'field', label: '介质', value: 'T-17 · 未编号磁带（封填层表面回收）' },
      { kind: 'field', label: '转录', value: '登记二组（转录人签名栏为空）' },
      { kind: 'field', label: '说明', value: '甲为在场登记员。乙无法确定为在场人员。' },
      { kind: 'divider' },
      {
        kind: 'text',
        text: '本段转录由誊录员逐句听写完成。听写过程中不得暂停、不得回放、不得对照前文。',
      },
      {
        /* 第二人称滑入。一句，然后恢复公文腔。不作任何说明。 */
        kind: 'text',
        text: '第二层的声音在这一处提到了一个正在阅读本卷宗的人。你不必对号入座，本处也无从核实。',
      },
      {
        kind: 'text',
        text: '誊录员在此处停了四十一秒，随后继续。停顿本身按规定记入，停顿的原因不记入。',
      },
      {
        kind: 'quote',
        time: '00:00:00',
        speaker: '甲',
        text: '现在是六月二日，二十一时四十分。第三次尝试。如果有人听到这一段，请记录时间。',
      },
      { kind: 'quote', time: '00:00:11', speaker: '乙', text: '请记录时间。' },
      { kind: 'quote', time: '00:00:14', speaker: '甲', text: '你是谁。' },
      { kind: 'quote', time: '00:00:14', speaker: '乙', text: '你是谁。' },
      { kind: 'damaged', text: '00:00:31 ── [ 信 号 丢 失  00:07 ] ──' },
      { kind: 'quote', time: '00:00:38', speaker: '乙', text: '不要再登册了。每登册一条，它就少一点。' },
      { kind: 'quote', time: '00:00:52', speaker: '甲', text: '少什么。' },
      { kind: 'quote', time: '00:00:55', speaker: '乙', text: '井。人。你手上那一份。' },
      { kind: 'quote', time: '00:01:10', speaker: '乙', text: '零一七五。' },
      { kind: 'quote', time: '00:01:12', speaker: '甲', text: '没有零一七五。到零一七四为止。' },
      { kind: 'quote', time: '00:01:12', speaker: '乙', text: '到零一七四为止。' },
      { kind: 'damaged', text: '00:01:39 ── [ 信 号 丢 失  00:41 ] ──' },
      {
        kind: 'quote',
        time: '00:02:20',
        speaker: '乙',
        text: '（本段声纹与甲一致，比对误差低于百分之三）别相信目录。',
      },
      { kind: 'quote', time: '00:02:26', speaker: '——', text: '[ 记录终止 ]' },
      { kind: 'divider' },
      { kind: 'heading', text: '转录人附注' },
      {
        kind: 'text',
        text: '带长共二分二十六秒。磁带物理长度可容纳三十分钟。剩余部分未被抹除，也未被录制：磁粉处于出厂状态。',
      },
      {
        kind: 'text',
        text: '两处信号丢失的时长分别为七秒与四十一秒。第二处与 {{ref:LC-62-0058}} 所载中断时长同为四十一，仅单位不同。本人不认为这是巧合，但无权在正文中如此记载，故记于附注。',
      },
      { kind: 'margin', hand: '无笔迹 · 直接写入介质', text: '乙没有在回答甲。乙在念一份还没写完的卷宗。' },
      {
        kind: 'system',
        tone: 'error',
        text: '本卷宗使目录返回数由 5 增至 6。校验差值已按惯例忽略。',
      },
    ],
    attachments: [
      {
        id: 'A-0007-1',
        name: 'T-17 数字化母带',
        kind: 'AUDIO',
        state: 'QUARANTINED',
        note: '与 RS-87-0174 的附件为同一文件。两处记录的哈希值不同。',
      },
      {
        id: 'A-0007-2',
        name: '声纹比对报告',
        kind: 'DOCUMENT',
        size: '12 KB',
        state: 'AVAILABLE',
        note: '结论：甲与乙为同一人。报告未署名，未受理，也未撤回。',
      },
    ],
    related: ['RS-87-0174', 'IR-88-0233', 'RS-87-0175'],
    keywords: ['转录', '磁带', '零一七五', '别相信目录', '声纹', 'T-17'],
    footer: '缄默级卷宗不生成阅读记录。本次阅读已生成阅读记录。',
  },
]
