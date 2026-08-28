import { NavLink } from 'react-router-dom'
import { useSession } from '@/layers/archive/state/useSession'
import { VAULT_PATH } from '@/layers/archive/data/unlocks'
import { visibleArchives, DECLARED_INDEX_COUNT } from '@/layers/archive/data/archives'
import { cn } from '@/shared/lib/cn'

interface Item {
  to: string
  label: string
  sub: string
  /** 需要该解锁才出现在导航里。 */
  requiresUnlock?: string
}

const ITEMS: Item[] = [
  { to: '/sys', label: '主页', sub: 'INDEX' },
  { to: '/sys/browse', label: '卷宗目录', sub: 'CATALOGUE' },
  { to: '/sys/search', label: '检索', sub: 'QUERY' },
  { to: '/sys/timeline', label: '事件时间线', sub: 'CHRONOLOGY' },
  { to: '/sys/clues', label: '调查笔记', sub: 'NOTES' },
  { to: '/sys/log', label: '系统日志', sub: 'SYSLOG' },
  { to: VAULT_PATH, label: '底册接口', sub: 'VAULT / 未申报', requiresUnlock: 'UNLOCK_VAULT' },
]

export function SideNav() {
  const unlocks = useSession((s) => s.unlocks)
  const clues = useSession((s) => s.clues)
  const readCount = useSession((s) => s.readArchives.length)
  const total = visibleArchives({ clues, unlocks }).length

  return (
    <nav className="flex shrink-0 flex-col border-r border-line bg-panel/40 md:w-52">
      <ul className="flex overflow-x-auto md:block md:overflow-visible">
        {ITEMS.filter((i) => !i.requiresUnlock || unlocks.includes(i.requiresUnlock)).map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.to === '/sys'}
              className={({ isActive }) =>
                cn(
                  'block whitespace-nowrap border-b border-line px-4 py-2.5 transition-colors md:whitespace-normal',
                  isActive
                    ? 'border-l-2 border-l-amber bg-panel2 text-ink'
                    : 'border-l-2 border-l-transparent text-dim hover:bg-panel2 hover:text-ink',
                )
              }
            >
              <div className="text-[13px]">{item.label}</div>
              <div className="text-[9px] uppercase tracking-wider2 text-faint">{item.sub}</div>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="mt-auto hidden space-y-1 border-t border-line px-4 py-3 text-[10px] text-faint md:block">
        <div>
          目录申报 <span className="text-dim">{DECLARED_INDEX_COUNT}</span> · 实际返回{' '}
          <span className={total !== DECLARED_INDEX_COUNT ? 'text-rust' : 'text-dim'}>{total}</span>
        </div>
        <div>
          已调阅 <span className="text-dim">{readCount}</span> · 已获线索{' '}
          <span className="text-dim">{clues.length}</span>
        </div>
        <div className="pt-2 leading-relaxed text-faint/70">
          本系统不对外提供服务。
          <br />
          调阅行为一律留痕。
        </div>
      </div>
    </nav>
  )
}
