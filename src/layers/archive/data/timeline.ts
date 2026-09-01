export interface TimelineEvent {
  date: string
  label: string
  detail: string
  archiveId?: string
  /** 与其它条目互相矛盾的条目，在时间线上另作标记。 */
  conflict?: boolean
  requiresClue?: string
}

/** 事件时间线。玩家在这里最容易看出档案之间的时序矛盾。 */
export const TIMELINE: TimelineEvent[] = [
  { date: '1962-04', label: '云盘岭第十七号井建站', detail: '列入省级水文观测网。井深二百一十四米。', archiveId: 'LC-62-0058' },
  {
    date: '1979-··',
    label: '值班表改制为夜班双人制',
    detail: '无批复文件。归档人为 PN-79-0091，但该员的入职日期为 1984 年。',
    archiveId: 'LC-62-0058',
    conflict: true,
  },
  { date: '1983-09-02', label: 'PN-79-0091 注销', detail: '注销原因栏为空。此后仍有其署名的文件产生。', archiveId: 'PN-79-0091', conflict: true },
  { date: '1984-06-11', label: 'PN-79-0091 入职', detail: '晚于注销日期九个月零九天。系统三次自动修正均失败。', archiveId: 'PN-79-0091', conflict: true },
  { date: '1986-··', label: '第十七号井前期声学勘测', detail: '勘测报告未随卷。仅在人员履历中留有一行。', archiveId: 'PN-79-0091' },
  {
    date: '1987-11-03',
    label: '记录中断 · 四十一分钟',
    detail: '十七时四十一分至十八时二十二分。纸带无断口，笔一直抬着。',
    archiveId: 'LC-62-0058',
  },
  { date: '1987-11-04', label: '登册 RS-87-0174「后声」', detail: '确认人 PN-79-0091。首次确认日期字段被遮挡。', archiveId: 'RS-87-0174' },
  { date: '1987-11-06', label: '第十七号井封填', detail: '井口混凝土封填至地表以下四米。井台以上结构拆除。', archiveId: 'LC-62-0058' },
  { date: '1987-11-15', label: '封填层表面回收未编号磁带', detail: '磁带内容为封填作业现场声，时间戳早于作业开始四小时十一分钟。', archiveId: 'RS-87-0174' },
  { date: '1988-05-17', label: '提交 IR-88-0233', detail: '撰写人 PN-79-0091。该员已注销四年零八个月。', archiveId: 'IR-88-0233', conflict: true },
  {
    date: '1988-06-02',
    label: 'T-17 第二层内容转录',
    detail: '转录件中出现编号「零一七五」。当时目录只到零一七四。',
    archiveId: 'TX-88-0007',
    requiresClue: 'CLUE_001',
  },
  { date: '1988-06-29', label: 'IR-88-0233 被标记为记录存疑', detail: '标记人字段为空。报告未被撤回。', archiveId: 'IR-88-0233' },
  { date: '1988-07-02', label: '目录校验出现 +1 差值', detail: '此后每次校验均出现，位置固定。已按惯例忽略。' },
  {
    date: '——',
    label: '本次会话',
    detail: '一名不具编制的读者按转录件所述顺序读取上列卷宗。该读者的访问记录出现在 1988 年的日志中。',
    archiveId: 'RS-87-0175',
    conflict: true,
    requiresClue: 'CLUE_004',
  },
]
