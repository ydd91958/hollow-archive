import type { Archive } from '@/layers/archive/types/archive'
import { todayISO } from '@/shared/lib/format'

/** RS · 残响登记 */
export const residuum: Archive[] = [
  {
    id: 'RS-87-0174',
    title: '第十七号井声学残留',
    codename: '后声',
    category: 'RESIDUUM',
    status: 'SEALED',
    clearance: 'RESTRICTED',
    custody: 'III',
    date: '1987-11-04',
    revised: '1988-06-28',
    revisedBy: '资料技术处',
    summary:
      '于一处深井结构内录制的磁带，在延时回放时出现第二层人声；该层内容与回放时刻之后数小时内在同一井口实际发生的对话一致。',
    body: [
      { kind: 'heading', text: '一 · 现象概述' },
      {
        kind: 'text',
        text: '本条登记针对云盘岭观测站第十七号竖井内的声学残留。任何在井口上方一点五米范围内完成的录音，在满四小时后重放时，除原始内容之外可听到第二层人声。第二层人声音量低于原始录音约十二分贝，吐字清晰可辨。',
      },
      {
        kind: 'text',
        text: '经三次独立比对，第二层人声所陈述的内容，与该井口在重放时刻之后三至七小时内实际发生的对话一致。用词、停顿位置、乃至咳嗽等非语言声均可逐一对应。',
      },
      {
        kind: 'text',
        text: '本局不使用"预言"一词。登册时统一记作：介质在写入阶段接收到了尚未写入的内容。',
      },
      { kind: 'divider' },
      { kind: 'field', label: '首次确认', value: '{{redact:CLUE_001|1987-11-03}}' },
      { kind: 'field', label: '确认人', value: '登记员 {{ref:PN-79-0091}}' },
      { kind: 'field', label: '复核', value: '████ ████' },
      { kind: 'divider' },
      { kind: 'heading', text: '二 · 复现条件' },
      {
        kind: 'list',
        items: [
          '录音须在井口完成。移出井台十米以外，现象不发生。',
          '设备须为磁性介质。数字设备记录到的第二层为空白，但空白时长与第二层内容时长完全一致。',
          '井内水位须低于地表以下一百七十米。',
          '现场不得多于两人。三人及以上时现象不发生，原因未查明。',
        ],
      },
      { kind: 'heading', text: '三 · 处置' },
      {
        kind: 'text',
        text: '一九八七年十一月六日，本井封口。井台以上结构拆除，井口以混凝土封填至地表以下四米。封填作业记录见 {{ref:LC-62-0058}}。',
      },
      {
        kind: 'text',
        text: '封填后第九日，作业队上报：在封填层表面回收到磁带一盘，无编号。带内容为封填作业本身的现场声。该磁带的录制时间戳早于作业开始四小时十一分钟。',
      },
      { kind: 'margin', hand: '钢笔 · 字迹外倾', text: '四小时十一分钟。又是四十一。' },
      {
        kind: 'system',
        tone: 'warn',
        text: '本卷宗第四节已按 Ⅲ 级监护要求移除。移除操作未记入修订历史。',
      },
    ],
    attachments: [
      { id: 'A-0174-1', name: 'T-17 · 未编号磁带（数字化副本）', kind: 'AUDIO', size: '18.4 MB', state: 'QUARANTINED', note: '介质已转入缄默序列。回放请求需二人同时授权。本终端仅检测到一人。' },
      { id: 'A-0174-2', name: '井位剖面图 · 1962 年原件', kind: 'IMAGE', size: '——', state: 'MISSING', note: '附件在册但不在库。调阅记录显示它从未被借出，也从未被归还。' },
      { id: 'A-0174-3', name: '复核意见（第四节）', kind: 'DOCUMENT', size: '0 KB', state: 'CORRUPT', note: '文件长度为零。文件名长度正常。' },
    ],
    related: ['LC-62-0058', 'IR-88-0233', 'PN-79-0091'],
    keywords: ['后声', '磁带', '竖井', '云盘岭', '第二层', '四十一'],
    footer: '本卷宗上一次开启为 1988-02-·· 。此后无访问记录。你是第 2 位读者。',
  },

  /* ── 隐藏卷宗：需通过底册接口提交访问码后才存在于目录中 ───────── */
  {
    id: 'RS-87-0175',
    title: '持续读取行为',
    codename: '（未命名）',
    category: 'RESIDUUM',
    status: 'PENDING',
    clearance: 'SILENT',
    custody: 'UNSET',
    date: todayISO(),
    summary: '本条登记由系统自动创建。创建请求来源：本终端。',
    requiresUnlocks: ['UNLOCK_RS0175'],
    body: [
      {
        kind: 'system',
        tone: 'error',
        text: '本卷宗的编号早于其创建时间十七年。编号与时间戳均通过校验。',
      },
      { kind: 'heading', text: '一 · 现象概述' },
      {
        kind: 'text',
        text: '一名不具备本局编制的读者，正在按顺序读取一组已于一九八八年封存的卷宗。读取顺序与一九八八年六月二日转录件中所述的顺序一致。',
      },
      {
        kind: 'text',
        text: '该读者的访问记录同时出现在一九八八年的检索日志中。日志文件的修改时间未变更。',
      },
      { kind: 'divider' },
      { kind: 'field', label: '首次确认', value: todayISO() },
      { kind: 'field', label: '登记员', value: '本次访问者' },
      { kind: 'field', label: '监护等级', value: '未定级 —— 无法对"读取"实施隔离' },
      { kind: 'divider' },
      { kind: 'heading', text: '二 · 与 0174 的比对' },
      {
        kind: 'text',
        text: '{{ref:RS-87-0174}} 记录的是：介质接收到了尚未写入的内容。本条记录的是：卷宗接收到了尚未存在的读者。',
      },
      {
        kind: 'text',
        text: '两者的四十一分钟窗口重合。差异仅在于方向。',
      },
      { kind: 'heading', text: '三 · 处置' },
      { kind: 'list', ordered: true, items: ['建议停止读取。', '建议不予登册。', '建议不将本条告知读者。'] },
      { kind: 'system', tone: 'error', text: '第 1 项建议未被采纳。读取仍在继续。' },
      { kind: 'system', tone: 'error', text: '第 3 项建议未被采纳。' },
      { kind: 'divider' },
      { kind: 'margin', hand: '无笔迹 · 直接写入介质', text: '你不是第一个读到这里的人。你是第一个还在读的人。' },
      {
        kind: 'text',
        text: '下一条编号已经生成。它还没有内容。{{hidden:如果你现在去检索 RS-87-0176，你会看到它正在被写。}}',
      },
      { kind: 'damaged', text: '本页余下内容将于读取结束后写入。' },
    ],
    attachments: [
      { id: 'A-0175-1', name: '本次会话检索日志', kind: 'DATA', state: 'AVAILABLE', note: '日志已在你打开本卷宗时归档。归档时间戳：1988-07-02。' },
    ],
    related: ['RS-87-0174', 'TX-88-0007'],
    keywords: ['0175', '读者', '登记员', '底册'],
    footer: '本卷宗没有上一位读者。',
  },
]
