import type { Archive } from '@/layers/archive/types/archive'

/**
 * 目录里的洞。
 *
 * 四份玩家打得开、但读不到什么的卷宗。它们的作用是让玩家知道
 * 这个系统比他看到的大得多，以及有些东西他这辈子都调不出来。
 *
 * 其中三份是后续作品的接口，一份是本作的留白。
 */
export const holes: Archive[] = [
  /* ── 局的第一份登记。1957 年那个村子。 ── */
  {
    id: 'RS-57-0001',
    title: '［标题字段为空］',
    category: 'RESIDUUM',
    status: 'SEALED',
    clearance: 'SILENT',
    custody: 'IV',
    date: '1957-08-19',
    summary: '本处第一号登记。正文与附件均不在本终端。仅保留日期与编号。',
    body: [
      { kind: 'system', tone: 'warn', text: '本卷宗为一号登记。调阅需两级授权。本终端具备零级。' },
      { kind: 'field', label: '编号', value: 'RS-57-0001' },
      { kind: 'field', label: '登记日期', value: '1957-08-19' },
      { kind: 'field', label: '登记完成', value: '1957-11-02' },
      { kind: 'field', label: '名称', value: '［字段为空］' },
      { kind: 'field', label: '位置', value: '［字段为空］' },
      { kind: 'field', label: '涉及人数', value: '一一四' },
      { kind: 'field', label: '监护等级', value: 'Ⅳ · 抹除' },
      { kind: 'divider' },
      {
        kind: 'text',
        text: '本卷宗的正文在登记完成当日即从本系统移除。移除依据为本卷宗自身第七节的建议。第七节亦已移除。',
      },
      {
        kind: 'text',
        text: '保留字段：编号、日期、涉及人数。保留理由载于《文档规范》第十一条：一号登记不得完全消失，否则本处无从说明自身的成立依据。',
      },
      { kind: 'damaged', text: '███ ███████ ████ ██ ████████ ███ █████████ ███ ██ ████ ██████' },
      {
        kind: 'margin',
        hand: '钢笔 · 已褪色',
        text: '一百一十四个人。名字我们全写下来了，写得很仔细。那是我们干得最认真的一次。',
      },
      {
        kind: 'system',
        tone: 'error',
        text: '本页剩余内容不在本终端。检索「1957」将触发上级通报。',
      },
    ],
    related: ['RG-00-0000'],
    keywords: ['一号登记', '1957', '成立', '第一份'],
    footer: '本处成立于本卷宗登记完成之次日。',
  },

  /* ── 已移交第三局。系列作品的接口。 ── */
  {
    id: 'RS-63-0022',
    title: '［已注销 · 移交］',
    category: 'PURGED',
    status: 'REVOKED',
    clearance: 'RESTRICTED',
    date: '1963-05-··',
    summary: '本卷宗已于一九六六年移交第三补充测绘局。本处不再保有正文。',
    body: [
      { kind: 'system', tone: 'info', text: '本卷宗已移交。以下为移交登记，按规定保留。' },
      { kind: 'field', label: '原编号', value: 'RS-63-0022' },
      { kind: 'field', label: '接收单位', value: '第三补充测绘局' },
      { kind: 'field', label: '移交日期', value: '1966-04-07' },
      { kind: 'field', label: '移交理由', value: '现象主体位于第三分局辖区' },
      { kind: 'field', label: '形制', value: '道路。往返里程不等。' },
      { kind: 'divider' },
      {
        kind: 'text',
        text: '移交后本处不再保有该卷宗正文。如需调阅，请通过跨局调阅程序向第三补充测绘局申请。本终端不具备跨局调阅权限。',
      },
      {
        kind: 'margin',
        hand: '铅笔',
        text: '差一百二十米。去的时候和回来的时候。量了十一次。',
      },
    ],
    related: ['RG-00-0000'],
    keywords: ['移交', '第三局', '道路', '里程'],
    footer: '跨局调阅需两局同时授权。',
  },

  /* ── 正在登记中。玩家永远进不去。 ── */
  {
    id: 'RS-91-0408',
    title: '████████',
    category: 'RESIDUUM',
    status: 'ACTIVE',
    clearance: 'SILENT',
    custody: 'III',
    date: '1991-··-··',
    summary: '████████████████████████',
    body: [
      {
        kind: 'system',
        tone: 'error',
        text: '本卷宗处于登记进行中状态。登记进行中的卷宗不对外提供正文。',
      },
      { kind: 'field', label: '监护等级', value: 'Ⅲ · 缄默' },
      { kind: 'field', label: '登记启动', value: '1991-··-··' },
      { kind: 'field', label: '预计完成', value: '［未填写］' },
      { kind: 'field', label: '当前进度', value: '第九次复核' },
      { kind: 'divider' },
      {
        kind: 'text',
        text: '按《作业细则》第十四条，Ⅲ 级卷宗的正文本身具备传染性，不向未授权终端开放。标题一并遮蔽。',
      },
      {
        kind: 'text',
        text: '本卷宗自一九九一年启动登记，至今未完成。九次复核均判定「尚可继续」。',
      },
      { kind: 'damaged', text: '██ ████████ ███ ██████ ████ ███ ████████ ███████ ██ ████' },
      {
        kind: 'margin',
        hand: '铅笔',
        text: '三十多年了。要么是写不完，要么是有人不想写完。',
      },
    ],
    keywords: ['登记中', '缄默', '复核'],
    footer: '本卷宗的阅读记录同样按缄默级处理。',
  },

  /* ── 第四个人。本作的留白，永久不给姓名。 ── */
  {
    id: 'PN-··-····',
    title: '［人员档案 · 编号未分配］',
    category: 'PERSONNEL',
    status: 'CORRUPT',
    clearance: 'INTERNAL',
    date: '····-··-··',
    summary: '本档案存在于人员索引中，但无编号、无姓名、无内容。索引项本身无法删除。',
    body: [
      {
        kind: 'system',
        tone: 'warn',
        text: '本档案的编号字段为空。系统按空编号排序，故位于人员索引末位。',
      },
      { kind: 'field', label: '编号', value: '［未分配］' },
      { kind: 'field', label: '姓名', value: '［字段为空］' },
      { kind: 'field', label: '入职', value: '［字段为空］' },
      { kind: 'field', label: '注销', value: '［字段为空］' },
      { kind: 'field', label: '所属', value: '［字段为空］' },
      { kind: 'divider' },
      {
        kind: 'text',
        text: '本档案曾数次被判定为无效索引项并执行删除。每次删除后，索引项在下一次校验时重新出现。',
      },
      {
        kind: 'text',
        text: '现按《作业细则》第二十条处理：保留索引项，不再尝试删除，不再尝试补录。',
      },
      {
        kind: 'margin',
        hand: '铅笔',
        text: '补不了。不是查不到，是写上去以后自己会没。试过四回。',
      },
      {
        kind: 'margin',
        hand: '另一种铅笔 · 很轻',
        text: '别补了。补上就真的没了。',
      },
    ],
    related: ['PN-79-0091'],
    keywords: ['空编号', '无姓名', '索引', '第四'],
    footer: '本档案不计入在编人数统计。',
  },
]
