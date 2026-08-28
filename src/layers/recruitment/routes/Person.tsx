import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPerson, PERSON_SOURCES } from '../data/people'
import { useTrace } from '@/shared/state/useTrace'
import { FieldValue, KeyTerm } from '../components/Emphasis'
import { ZY } from '@/shared/routes'
import { cn } from '@/shared/lib/cn'

/**
 * 项目成员资料页。
 *
 * 这一页什么都不解释——它只是把企业申报的字段原样摊开，
 * 然后老老实实列出「资料来源」。矛盾由玩家自己发现，出口由平台自己给出。
 */
export function Person() {
  const { id = '' } = useParams()
  const person = getPerson(id)
  const note = useTrace((s) => s.note)

  useEffect(() => {
    if (person) note(`person:${person.id}`)
  }, [person, note])

  if (!person) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-base text-zy-text">该资料页不存在</p>
        <Link to={ZY.home} className="zy-btn mt-6">
          返回首页
        </Link>
      </div>
    )
  }

  const sources = PERSON_SOURCES[person.id] ?? []

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <nav className="mb-4 text-xs text-zy-faint">
        <Link to={ZY.home} className="hover:text-zy-primary">
          首页
        </Link>
        <span className="mx-1.5">/</span>
        <span>项目成员</span>
        <span className="mx-1.5">/</span>
        <span className="text-zy-sub">{person.name}</span>
      </nav>

      <div className="space-y-5">
        {/* ── 基本信息 ─────────────────────────────── */}
        <section className="zy-card p-6">
          <div className="flex items-start gap-5">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-zy-tag text-xl text-zy-faint">
              {person.name.slice(0, 1)}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-3">
                <h1 className="text-xl font-semibold text-zy-text">{person.name}</h1>
                <span className="text-sm text-zy-sub">{person.title}</span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <span className="text-xs text-zy-faint">资料状态</span>
                <span
                  className={cn(
                    'rounded-sm px-2 py-0.5 text-xs',
                    person.statusTone === 'muted'
                      ? 'bg-zy-tag text-zy-faint'
                      : 'bg-zy-tag text-zy-sub',
                  )}
                >
                  <FieldValue odd={person.statusTone === 'muted'}>{person.status}</FieldValue>
                </span>
              </div>
              {person.workplace && (
                <div className="mt-2 text-sm text-zy-sub">工作地点：{person.workplace}</div>
              )}
            </div>
          </div>
        </section>

        {/* ── 参与项目 ─────────────────────────────── */}
        <section className="zy-card p-6">
          <h2 className="mb-4 text-base font-medium text-zy-text">参与项目</h2>
          <ol className="divide-y divide-zy-line">
            {person.projects.map((p, i) => (
              <li key={i} className="py-3 first:pt-0 last:pb-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-sm text-zy-text">{p.name}</span>
                  <span className="text-xs text-zy-faint">{p.period}</span>
                  <span className="zy-tag">{p.role}</span>
                </div>
                {p.externalRef && (
                  <div className="mt-1 text-xs text-zy-faint">
                    外部收录编号 <KeyTerm level={2}>{p.externalRef}</KeyTerm>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </section>

        {/* ── 同项目人员 ───────────────────────────── */}
        <section className="zy-card p-6">
          <h2 className="mb-4 text-base font-medium text-zy-text">同项目人员</h2>
          <ul className="divide-y divide-zy-line">
            {person.colleagues.map((c, i) => (
              <li key={i} className="flex flex-wrap items-baseline gap-3 py-3 first:pt-0 last:pb-0">
                {c.personId ? (
                  <Link to={ZY.person(c.personId)} className="zy-link text-sm">
                    {c.name}
                  </Link>
                ) : (
                  <span className="text-sm text-zy-sub">{c.name}</span>
                )}
                <span className="text-xs text-zy-faint">{c.role}</span>
                {c.note && <span className="text-xs text-zy-faint">· {c.note}</span>}
              </li>
            ))}
          </ul>
        </section>

        {/* ── 相关文件 ─────────────────────────────── */}
        <section className="zy-card p-6">
          <h2 className="mb-4 text-base font-medium text-zy-text">相关文件</h2>
          <ul className="divide-y divide-zy-line">
            {person.documents.map((d, i) => (
              <li key={i} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <span className="min-w-0 flex-1 truncate text-sm text-zy-sub">{d.name}</span>
                <span className="shrink-0 text-xs text-zy-faint">{d.meta}</span>
                <span
                  className={cn(
                    'w-16 shrink-0 text-right text-xs',
                    d.available ? 'text-zy-primary' : 'text-zy-faint',
                  )}
                >
                  {d.available ? '查看' : '暂不可用'}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── 资料来源。第二层的入口就在这儿。 ─────── */}
        {sources.length > 0 && (
          <section className="zy-card p-6">
            <h2 className="mb-1 text-base font-medium text-zy-text">资料来源</h2>
            <p className="mb-4 text-xs text-zy-faint">
              以下链接由平台自动抓取，指向站外页面。职引不对站外内容负责。
            </p>
            <ul className="space-y-3">
              {sources.map((s) => (
                <li key={s.to}>
                  <Link to={s.to} className="zy-link text-sm">
                    {s.label}
                  </Link>
                  <div className="mt-0.5 text-xs text-zy-faint">
                    {s.note} · {s.domain}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {person.systemNote && (
          <p className="px-1 text-xs leading-relaxed text-zy-faint">{person.systemNote}</p>
        )}
      </div>
    </div>
  )
}
