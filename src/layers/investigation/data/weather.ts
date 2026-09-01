/**
 * 北岭气象公共服务平台 · bl-qx.gov.cn
 *
 * 一个普通的地方气象局公共服务网站。
 *
 * 主线只有一处：历史资料查询里 1987-11-03 那天的自记纸缺了一段。
 * 页面不解释、不标红、不加任何提示，只按数字化时的原样列出两行边界。
 * 玩家自己做减法。
 *
 * 除那一天以外，任何日期都必须返回完整合理的数据。查错日期的代价
 * 只是看到一页正常天气，不会把人卡住。
 */

/* ══════════════════ 站点信息 ══════════════════ */

export const WX_META = {
  title: '北岭市气象局',
  platform: '公共气象服务平台',
  org: '北岭市气象局',
  icp: '冀ICP备 05003317 号',
  gov: '冀公网安备 13010202000841 号',
  siteId: '政府网站标识码 1301000032',
  tel: '0311-8624 1121',
  weatherPhone: '12121',
  address: '北岭市城北区气象路 3 号',
  lastUpdate: '2026-08-28 08:00',
}

/* ══════════════════ 今日实况 ══════════════════ */

export const TODAY = {
  date: '2026-08-28',
  weekday: '星期五',
  phenomenon: '多云',
  temp: 29,
  high: 32,
  low: 22,
  wind: '东南风 2 级',
  humidity: 64,
  pressure: 1002.4,
  visibility: 12,
  sunrise: '05:42',
  sunset: '19:01',
  updated: '08:00',
  station: '北岭国家基本气象站（54628）',
}

export const AIR = {
  aqi: 68,
  level: '良',
  primary: 'PM10',
  tone: 'yellow' as const,
  items: [
    { name: 'PM2.5', value: 34, unit: 'μg/m³' },
    { name: 'PM10', value: 79, unit: 'μg/m³' },
    { name: 'SO₂', value: 8, unit: 'μg/m³' },
    { name: 'NO₂', value: 31, unit: 'μg/m³' },
    { name: 'O₃', value: 112, unit: 'μg/m³' },
    { name: 'CO', value: 0.6, unit: 'mg/m³' },
  ],
}

export const LIFE_INDEX = [
  { name: '穿衣指数', level: '炎热', note: '建议着短袖衫、薄裙等清凉夏季服装。' },
  { name: '紫外线', level: '中等', note: '外出请适当涂抹防晒霜。' },
  { name: '晾晒指数', level: '适宜', note: '天气不错，适宜晾晒衣物。' },
  { name: '感冒指数', level: '少发', note: '无明显降温，感冒机率较低。' },
  { name: '运动指数', level: '较适宜', note: '午后气温较高，建议早晚运动。' },
  { name: '洗车指数', level: '适宜', note: '未来 48 小时无降水。' },
  { name: '空气扩散', level: '一般', note: '气象条件对污染物扩散无明显影响。' },
  { name: '交通指数', level: '良好', note: '能见度较好，路面干燥。' },
]

export const ALERTS = [
  {
    id: 'A-2026-0812',
    level: 'yellow' as const,
    title: '雷电黄色预警信号',
    org: '北岭市气象台',
    time: '2026-08-27 16:20',
    text: '预计未来 6 小时内，本市城北区、城西区将出现雷电活动，局地伴有短时强降水和 7 级以上阵风，请注意防范。',
    status: '已解除',
  },
]

/* ══════════════════ 7 天预报 ══════════════════ */

export const FORECAST = [
  { date: '08-28', weekday: '今天', day: '多云', night: '多云', high: 32, low: 22, wind: '东南风 2 级', aqi: '良' },
  { date: '08-29', weekday: '星期六', day: '阴', night: '小雨', high: 30, low: 22, wind: '东风 2 级', aqi: '良' },
  { date: '08-30', weekday: '星期日', day: '小雨', night: '中雨', high: 27, low: 21, wind: '东北风 3 级', aqi: '优' },
  { date: '08-31', weekday: '星期一', day: '小雨', night: '阴', high: 26, low: 20, wind: '北风 3 级', aqi: '优' },
  { date: '09-01', weekday: '星期二', day: '多云', night: '晴', high: 28, low: 19, wind: '西北风 2 级', aqi: '良' },
  { date: '09-02', weekday: '星期三', day: '晴', night: '晴', high: 30, low: 19, wind: '西南风 2 级', aqi: '良' },
  { date: '09-03', weekday: '星期四', day: '晴', night: '多云', high: 31, low: 21, wind: '南风 2 级', aqi: '轻度污染' },
]

/* ══════════════════ 逐小时（今日） ══════════════════ */

export const HOURLY = [
  { time: '08:00', temp: 25, phenomenon: '多云', precip: 0, wind: '东南风 2 级', humidity: 72 },
  { time: '09:00', temp: 26, phenomenon: '多云', precip: 0, wind: '东南风 2 级', humidity: 69 },
  { time: '10:00', temp: 28, phenomenon: '多云', precip: 0, wind: '东南风 2 级', humidity: 64 },
  { time: '11:00', temp: 30, phenomenon: '晴', precip: 0, wind: '南风 2 级', humidity: 58 },
  { time: '12:00', temp: 31, phenomenon: '晴', precip: 0, wind: '南风 3 级', humidity: 54 },
  { time: '13:00', temp: 32, phenomenon: '晴', precip: 0, wind: '南风 3 级', humidity: 51 },
  { time: '14:00', temp: 32, phenomenon: '多云', precip: 0, wind: '西南风 3 级', humidity: 52 },
  { time: '15:00', temp: 31, phenomenon: '多云', precip: 0, wind: '西南风 2 级', humidity: 55 },
  { time: '16:00', temp: 30, phenomenon: '多云', precip: 0, wind: '西风 2 级', humidity: 58 },
  { time: '17:00', temp: 29, phenomenon: '多云', precip: 0, wind: '西风 2 级', humidity: 61 },
  { time: '18:00', temp: 28, phenomenon: '多云', precip: 0, wind: '西北风 2 级', humidity: 65 },
  { time: '19:00', temp: 26, phenomenon: '多云', precip: 0, wind: '西北风 2 级', humidity: 70 },
  { time: '20:00', temp: 25, phenomenon: '阴', precip: 0, wind: '北风 2 级', humidity: 74 },
  { time: '21:00', temp: 24, phenomenon: '阴', precip: 0, wind: '北风 2 级', humidity: 77 },
  { time: '22:00', temp: 24, phenomenon: '阴', precip: 0, wind: '北风 1 级', humidity: 79 },
  { time: '23:00', temp: 23, phenomenon: '阴', precip: 0, wind: '北风 1 级', humidity: 81 },
]

/* ══════════════════ 气象站网 ══════════════════ */

export interface WxStation {
  code: string
  name: string
  kind: '国家基本站' | '国家一般站' | '区域自动站' | '专用站'
  since: string
  status: '在用' | '已迁移' | '已撤销'
  altitude: string
  /** 示意图上的相对坐标，0-100 */
  x: number
  y: number
  note?: string
}

export const STATIONS: WxStation[] = [
  { code: '54628', name: '北岭', kind: '国家基本站', since: '1953', status: '在用', altitude: '68.4 m', x: 48, y: 52 },
  { code: '54628-1', name: '北岭（站前旧址）', kind: '国家基本站', since: '1953', status: '已迁移', altitude: '65.1 m', x: 43, y: 55, note: '1994 年迁至气象路现址。原址位于北岭站西侧。' },
  { code: 'A2107', name: '城西', kind: '区域自动站', since: '2009', status: '在用', altitude: '71.0 m', x: 36, y: 50 },
  { code: 'A2113', name: '兴平路', kind: '区域自动站', since: '2011', status: '在用', altitude: '69.2 m', x: 42, y: 46 },
  { code: 'A2120', name: '城北', kind: '区域自动站', since: '2009', status: '在用', altitude: '74.6 m', x: 50, y: 34 },
  { code: 'A2131', name: '南关', kind: '区域自动站', since: '2012', status: '在用', altitude: '66.8 m', x: 54, y: 68 },
  { code: '54631', name: '云岭', kind: '国家一般站', since: '1958', status: '在用', altitude: '312.7 m', x: 74, y: 28 },
  { code: 'Y-03', name: '云岭乡（水文专用）', kind: '专用站', since: '1962', status: '已撤销', altitude: '308.2 m', x: 78, y: 24, note: '由原北岭市水文地质工程勘察队设立，1998 年撤销。观测资料移交本局。' },
  { code: 'A2145', name: '云岭水库', kind: '区域自动站', since: '2014', status: '在用', altitude: '295.0 m', x: 70, y: 20 },
  { code: 'A2152', name: '柏树街', kind: '区域自动站', since: '2013', status: '在用', altitude: '67.5 m', x: 46, y: 60 },
]

/* ══════════════════ 资讯 ══════════════════ */

export const NEWS = [
  { date: '2026-08-26', title: '我市启动秋季农业气象服务专项' },
  { date: '2026-08-21', title: '关于开展 2026 年气象科普进校园活动的通知' },
  { date: '2026-08-14', title: '八月上旬全市平均气温较常年同期偏高 1.2℃' },
  { date: '2026-07-30', title: '汛期气象服务保障工作阶段总结' },
  { date: '2026-07-11', title: '区域自动站 A2145（云岭水库）完成传感器更换' },
  { date: '2026-06-19', title: '关于调整 12121 天气预报电话服务时段的公告' },
  { date: '2026-05-08', title: '我局参加全省气象观测技能竞赛并获团体三等奖' },
  { date: '2015-10-22', title: '一九五三年以来纸质观测簿数字化工作完成验收' },
]

/* ══════════════════ 历史资料查询 ══════════════════ */

export interface HistoryRow {
  time: string
  phenomenon: string
  temp: string
  wind: string
  precip: string
  /** 自记纸缺损的边界行。渲染时置灰，不加任何警示色。 */
  gap?: boolean
}

export interface HistoryDay {
  date: string
  station: string
  summary: { phenomenon: string; high: string; low: string; precip: string; wind: string }
  rows: HistoryRow[]
  notes: string[]
  source: string
}

/** 可查询范围。1953 年建站，2015 年完成数字化。 */
export const HISTORY_RANGE = { min: '1953-01-01', max: '2026-08-27' }

/* 用日期做种子的伪随机，保证同一天每次查到的数据一模一样。 */
function seeded(dateStr: string): () => number {
  let h = 2166136261
  for (let i = 0; i < dateStr.length; i++) {
    h ^= dateStr.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  let a = h >>> 0
  return () => {
    a += 0x6d2b79f5
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const PHENOMENA = ['晴', '晴', '多云', '多云', '阴', '阴', '小雨', '阵雨']
const DIRS = ['北', '东北', '东', '东南', '南', '西南', '西', '西北']

/** 华北的月平均气温，用来让生成的数据落在合理区间。 */
const MONTH_BASE = [-3, 0, 7, 15, 21, 25, 27, 26, 21, 14, 5, -1]

function pad(n: number) {
  return String(n).padStart(2, '0')
}

/** 生成某一天的完整观测记录。任何日期都拿得到结果。 */
function generate(date: string): HistoryDay {
  const rnd = seeded(date)
  const month = Number(date.slice(5, 7)) - 1
  const base = MONTH_BASE[month] ?? 12
  const swing = 6 + rnd() * 5
  const wet = rnd()
  const dir = DIRS[Math.floor(rnd() * DIRS.length)]

  const rows: HistoryRow[] = []
  let high = -99
  let low = 99
  let total = 0

  for (let h = 0; h < 24; h++) {
    /* 日变化：14 时最高，5 时最低 */
    const curve = Math.cos(((h - 14) / 24) * Math.PI * 2)
    const t = base + curve * (swing / 2) + (rnd() - 0.5) * 1.4
    const ph =
      wet > 0.72 && h >= 6 && h <= 20 && rnd() > 0.55
        ? '小雨'
        : PHENOMENA[Math.floor(rnd() * PHENOMENA.length)]
    const p = ph.includes('雨') ? Number((rnd() * 0.9).toFixed(1)) : 0
    total += p
    high = Math.max(high, t)
    low = Math.min(low, t)
    rows.push({
      time: `${pad(h)}:00`,
      phenomenon: ph,
      temp: `${t.toFixed(1)}`,
      wind: `${dir}风 ${1 + Math.floor(rnd() * 3)} 级`,
      precip: p ? p.toFixed(1) : '0.0',
    })
  }

  const dayPh = total > 1 ? '小雨' : rows[14].phenomenon

  return {
    date,
    station: '北岭（54628）',
    summary: {
      phenomenon: dayPh,
      high: `${high.toFixed(1)} ℃`,
      low: `${low.toFixed(1)} ℃`,
      precip: `${total.toFixed(1)} mm`,
      wind: `${dir}风 1—3 级`,
    },
    rows,
    notes: [],
    source: '本日资料由原始观测簿数字化录入。',
  }
}

/**
 * 1987-11-03。
 *
 * 那天下午下雨，本站按规定做了加密观测，所以有非整点的记录。
 * 17:41 起自记纸缺损，18:22 恢复，中间那一段不存在，18:00 那一行
 * 因此也不在表里。
 *
 * 页面不写"缺了 41 分钟"。两行边界摆在那里，玩家自己减。
 */
const YL_1103: HistoryDay = {
  date: '1987-11-03',
  station: '北岭（54628）',
  summary: {
    phenomenon: '小雨',
    high: '11.4 ℃',
    low: '5.2 ℃',
    precip: '4.6 mm',
    wind: '东北风 1—3 级',
  },
  source: '本日资料由原始观测簿及自记纸数字化录入。缺损段按原样标注。',
  notes: [
    '本日 14 时起出现降水，按《地面气象观测规范》执行加密观测，记录中含非整点时次。',
    '本日部分时次自记纸缺损，缺损段无观测记录，数字化时按原样保留。',
    '本站不受理据个人记忆提出的历史资料更正申请。',
  ],
  rows: [
    { time: '00:00', phenomenon: '阴', temp: '6.8', wind: '东北风 1 级', precip: '0.0' },
    { time: '01:00', phenomenon: '阴', temp: '6.4', wind: '东北风 1 级', precip: '0.0' },
    { time: '02:00', phenomenon: '阴', temp: '6.1', wind: '东北风 1 级', precip: '0.0' },
    { time: '03:00', phenomenon: '阴', temp: '5.8', wind: '北风 1 级', precip: '0.0' },
    { time: '04:00', phenomenon: '阴', temp: '5.5', wind: '北风 1 级', precip: '0.0' },
    { time: '05:00', phenomenon: '阴', temp: '5.2', wind: '北风 1 级', precip: '0.0' },
    { time: '06:00', phenomenon: '阴', temp: '5.4', wind: '北风 1 级', precip: '0.0' },
    { time: '07:00', phenomenon: '阴', temp: '6.2', wind: '东北风 2 级', precip: '0.0' },
    { time: '08:00', phenomenon: '阴', temp: '7.6', wind: '东北风 2 级', precip: '0.0' },
    { time: '09:00', phenomenon: '阴', temp: '8.9', wind: '东北风 2 级', precip: '0.0' },
    { time: '10:00', phenomenon: '阴', temp: '10.1', wind: '东北风 2 级', precip: '0.0' },
    { time: '11:00', phenomenon: '阴', temp: '10.9', wind: '东北风 2 级', precip: '0.0' },
    { time: '12:00', phenomenon: '阴', temp: '11.3', wind: '东北风 2 级', precip: '0.0' },
    { time: '13:00', phenomenon: '阴', temp: '11.4', wind: '东北风 2 级', precip: '0.0' },
    { time: '14:00', phenomenon: '小雨', temp: '11.0', wind: '东北风 2 级', precip: '0.4' },
    { time: '15:00', phenomenon: '小雨', temp: '10.2', wind: '东北风 2 级', precip: '0.8' },
    { time: '16:00', phenomenon: '小雨', temp: '9.4', wind: '东北风 2 级', precip: '0.6' },
    { time: '16:30', phenomenon: '小雨', temp: '9.1', wind: '东北风 2 级', precip: '0.3' },
    { time: '17:00', phenomenon: '小雨', temp: '8.6', wind: '东北风 2 级', precip: '0.3' },
    { time: '17:30', phenomenon: '小雨', temp: '8.4', wind: '东北风 2 级', precip: '0.2' },
    { time: '17:41', phenomenon: '——', temp: '——', wind: '——', precip: '——', gap: true },
    { time: '18:22', phenomenon: '——', temp: '——', wind: '——', precip: '——', gap: true },
    { time: '18:30', phenomenon: '小雨', temp: '8.1', wind: '北风 2 级', precip: '0.1' },
    { time: '19:00', phenomenon: '小雨', temp: '7.9', wind: '北风 2 级', precip: '0.2' },
    { time: '20:00', phenomenon: '小雨', temp: '7.5', wind: '北风 2 级', precip: '0.5' },
    { time: '21:00', phenomenon: '阴', temp: '7.1', wind: '北风 2 级', precip: '0.3' },
    { time: '22:00', phenomenon: '阴', temp: '6.7', wind: '北风 1 级', precip: '0.1' },
    { time: '23:00', phenomenon: '阴', temp: '6.3', wind: '北风 1 级', precip: '0.0' },
  ],
}

/** 缺损行上显示的文字。与温度等字段分开，避免玩家以为那是数据。 */
export const GAP_LABEL: Record<string, string> = {
  '17:41': '自记纸中断',
  '18:22': '记录恢复',
}

/**
 * 回响之后的缺损说明。
 *
 * 「自记纸中断」说的是纸坏了。「人工观测记录缺失」说的是那段时间
 * 没有人在记。同一段空白，两种解释，页面从不说明自己换过说法。
 */
export const ECHO_GAP_LABEL: Record<string, string> = {
  '17:41': '人工观测记录缺失',
  '18:22': '人工观测记录恢复',
}

const SPECIAL: Record<string, HistoryDay> = {
  '1987-11-03': YL_1103,
}

export function historyFor(date: string): HistoryDay | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null
  if (date < HISTORY_RANGE.min || date > HISTORY_RANGE.max) return null
  return SPECIAL[date] ?? generate(date)
}
