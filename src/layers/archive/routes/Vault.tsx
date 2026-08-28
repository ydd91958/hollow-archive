import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useSession } from '@/layers/archive/state/useSession'
import { VAULT_PATH } from '@/layers/archive/data/unlocks'
import { fullStamp, terminalId } from '@/shared/lib/format'
import { cn } from '@/shared/lib/cn'

/**
 * 底册接口 · /x/vault
 *
 * 这个页面故意做成"可以直接用 URL 到达"：
 * 读过 index.html 源码注释的玩家会提前找到它，但没有访问码依然进不去。
 * 导航栏里的入口则要集齐 CLUE_001 / CLUE_002 / CLUE_003 才出现。
 */
export function Vault() {
  const unlocks = useSession((s) => s.unlocks)
  const clues = useSession((s) => s.clues)
  const submitCode = useSession((s) => s.submitCode)
  const pushLog = useSession((s) => s.pushLog)

  const [code, setCode] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const opened = unlocks.includes('UNLOCK_RS0175')
  const announced = unlocks.includes('UNLOCK_VAULT')

  useEffect(() => {
    pushLog(`接入底册接口 ${VAULT_PATH} · 该接口不在目录申报范围内`, 'warn')
  }, [pushLog])

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="border border-line bg-[#080b0d]">
        <div className="panel-head border-b border-line">
          <span>底册 · 未申报接口</span>
          <span className="text-rust">NO INDEX ENTRY</span>
        </div>

        <div className="space-y-1 px-5 py-4 font-mono text-[12px] text-dim">
          <Line>{fullStamp()} 接口响应中</Line>
          <Line>监听方 · 资料技术处（下线工单编号为空）</Line>
          <Line>来访终端 · {terminalId()}</Line>
          <Line tone="warn">本接口不接受检索。只接受访问码。</Line>
          {announced && (
            <Line tone="warn">访问码格式 · V-&lt;断层时长&gt;&lt;断层日期MMDD&gt;</Line>
          )}
          {!announced && <Line tone="dim">你是怎么找到这里的？本接口没有对外链接。</Line>}
        </div>
      </div>

      {opened ? (
        <div className="animate-fadeup border border-rust/50 bg-rust/[0.05] px-5 py-5">
          <div className="mb-2 text-[10px] uppercase tracking-wider2 text-rust">底册返回</div>
          <p className="font-doc text-[13px] leading-relaxed text-ink/85">
            接口返回一条记录。它的编号属于一九八七年的序列，它的登记日期是今天。
            两个字段都通过了校验。
          </p>
          <Link
            to="/sys/archive/RS-87-0175"
            className="mt-4 inline-block border border-rust/60 px-4 py-2 font-mono text-[12.5px] text-rust transition-colors hover:bg-rust/10"
          >
            RS-87-0175 · 调阅
          </Link>
          <p className="mt-4 text-[10.5px] leading-relaxed text-faint">
            调阅本条将生成一条阅读记录。该记录会出现在一九八八年的日志里。这一点无法关闭。
          </p>
        </div>
      ) : (
        <form
          className="space-y-3 border border-line bg-panel px-5 py-5"
          onSubmit={(e) => {
            e.preventDefault()
            if (!code.trim()) return
            const ok = submitCode(code)
            if (!ok) {
              setAttempts((n) => n + 1)
              setError(
                attempts >= 2
                  ? '校验失败 0x41。提示：本接口要的两个数，你在两份不同的卷宗里各见过一次。'
                  : '校验失败 0x41。',
              )
            }
            setCode('')
          }}
        >
          <label className="field-label block">访问码</label>
          <div className="flex gap-2">
            <input
              className="tinput font-mono uppercase tracking-wider"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="V-______"
              autoFocus
              aria-label="访问码"
            />
            <button className="tbtn shrink-0" type="submit">
              验证
            </button>
          </div>

          {error && <p className="text-[11.5px] text-rust">{error}</p>}

          <p className="border-t border-line pt-3 text-[10.5px] leading-relaxed text-faint">
            已持线索 {clues.length} 条。本接口不会告诉你缺哪一条。
            {attempts >= 4 && (
              <span className="mt-1 block text-amber">
                连续失败 {attempts} 次。本接口不设锁定——它不介意你一直试。
              </span>
            )}
          </p>
        </form>
      )}

      <div className="flex justify-between text-[10px] text-faint">
        <Link to="/sys/browse" className="hover:text-amber">
          ← 返回目录
        </Link>
        <span>该路径不会出现在任何一份卷宗的正文里</span>
      </div>
    </div>
  )
}

function Line({ children, tone }: { children: ReactNode; tone?: 'warn' | 'dim' }) {
  return (
    <div className={cn(tone === 'warn' && 'text-amber', tone === 'dim' && 'text-faint')}>
      <span className="mr-2 text-faint">·</span>
      {children}
    </div>
  )
}
