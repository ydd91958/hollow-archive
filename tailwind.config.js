/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* ── 第三层：空册 ───────────────────────── */
        void: '#07090a',
        panel: '#0c1012',
        panel2: '#10161a',
        line: '#1c2429',
        line2: '#2a343a',
        ink: '#c6cfce',
        dim: '#71827f',
        faint: '#3f4c4e',
        amber: '#c9a227',
        amberdim: '#7d6718',
        rust: '#b3402f',
        cyanic: '#5c908a',
        silent: '#7a1f18',

        /* ══════════════════════════════════════════════
           职引品牌系统。颜色有语义，不是"哪里空放哪个"：
             brand  蓝  = 平台 / 招聘 / 主行动
             hot    橙  = 热门 / 薪资 / 运营活动
             stable 绿  = 国企 / 福利 / 稳定性
             ai     紫  = AI / 新兴行业
           每组都给到 50–700，保证浅底、描边、实色能配成一套。
           ══════════════════════════════════════════════ */
        brand: {
          50: '#f2f7fd',
          100: '#e3edfb',
          200: '#c7dcf6',
          300: '#94bdec',
          500: '#3d8ae6',
          600: '#1a6fdb',
          700: '#1558b0',
          900: '#0d3b74',
        },
        hot: {
          50: '#fef7f2',
          100: '#fdeee3',
          200: '#fad8c2',
          500: '#f5883f',
          600: '#ef6820',
          700: '#c44f13',
        },
        stable: {
          50: '#f1faf7',
          100: '#dff2ec',
          200: '#b9e3d6',
          500: '#2a9b80',
          600: '#17836a',
          700: '#0f6151',
        },
        ai: {
          50: '#f6f3fe',
          100: '#eae4fb',
          200: '#d4c8f6',
          500: '#8467e0',
          600: '#6d4bd4',
          700: '#5535ac',
        },

        /* ── 第一层：职引（普通中文招聘产品） ───── */
        zy: {
          bg: '#f1f3f7',
          line: '#e4e8ee',
          line2: '#eef1f5',
          text: '#101828',
          sub: '#5b6472',
          faint: '#98a2b3',
          primary: '#1a6fdb',
          primaryDark: '#155bb5',
          tag: '#f0f3f7',
          /* 中文招聘站的薪资几乎都是这种橙红 */
          salary: '#f5642d',
        },

        /* ── 第二层：地方论坛 ───────────────────── */
        bbs: {
          bg: '#eef1f5',
          line: '#c9d4e0',
          head: '#4a7ab5',
          link: '#215d9c',
          alt: '#f7f9fb',
        },

        /* ── 第二层：北岭气象公共服务平台（政务站） ── */
        wx: {
          bg: '#eef2f6',
          head: '#1a5b9e',
          headDark: '#12457a',
          line: '#d3dde6',
          line2: '#e6ecf2',
          text: '#1b2733',
          sub: '#556575',
          faint: '#8a97a5',
          panel: '#f6f9fc',
          /* 预警信号四色，国标顺序 */
          blue: '#2f6fd0',
          yellow: '#e8b21f',
          orange: '#e07b1a',
          red: '#c8321f',
        },

        /* ── 第二层：个人博客 ───────────────────── */
        blog: {
          bg: '#faf8f4',
          ink: '#33302b',
          sub: '#8a8377',
          line: '#e4ded2',
          accent: '#7a6a4f',
        },
      },
      fontFamily: {
        /* 第一层 / 论坛：现代中文界面字体 */
        sans: [
          'PingFang SC',
          'Hiragino Sans GB',
          'Microsoft YaHei',
          'Segoe UI',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        /* 第二层旧站：宋体，撑住 2003 年的年代感 */
        song: ['SimSun', 'Songti SC', 'STSong', 'serif'],
        /* 个人博客：略带书卷气但不做作 */
        blog: ['Georgia', 'Songti SC', 'STSong', 'SimSun', 'serif'],
        /* 第三层 */
        mono: [
          'ui-monospace',
          'Cascadia Mono',
          'Consolas',
          'Menlo',
          'Noto Sans Mono CJK SC',
          'Microsoft YaHei',
          'monospace',
        ],
        doc: ['Inter', 'Segoe UI', 'Noto Sans CJK SC', 'Microsoft YaHei', 'sans-serif'],
      },
      letterSpacing: { wider2: '0.18em' },
      boxShadow: {
        card: '0 1px 2px rgba(16,24,40,.04), 0 1px 3px rgba(16,24,40,.04)',
        cardh: '0 4px 12px rgba(16,24,40,.08), 0 2px 4px rgba(16,24,40,.04)',
        promo: '0 10px 28px rgba(13,59,116,.18)',
        promoh: '0 16px 40px rgba(13,59,116,.26)',
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(.22,.61,.36,1)',
      },
      keyframes: {
        flicker: {
          '0%,100%': { opacity: '1' },
          '92%': { opacity: '1' },
          '93%': { opacity: '0.72' },
          '94%': { opacity: '1' },
          '97%': { opacity: '0.86' },
        },
        scan: { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(100%)' } },
        blink: { '0%,49%': { opacity: '1' }, '50%,100%': { opacity: '0' } },
        jitter: {
          '0%,100%': { transform: 'translate(0,0)' },
          '20%': { transform: 'translate(-1px,0)' },
          '40%': { transform: 'translate(1px,-1px)' },
          '60%': { transform: 'translate(-1px,1px)' },
        },
        fadeup: { from: { opacity: '0', transform: 'translateY(4px)' }, to: { opacity: '1', transform: 'none' } },
        fadein: { from: { opacity: '0' }, to: { opacity: '1' } },
      },
      animation: {
        flicker: 'flicker 9s infinite',
        scan: 'scan 7s linear infinite',
        blink: 'blink 1.1s step-end infinite',
        jitter: 'jitter 220ms steps(2) 1',
        fadeup: 'fadeup 320ms ease-out both',
        fadein: 'fadein 200ms ease-out both',
      },
    },
  },
  plugins: [],
}
