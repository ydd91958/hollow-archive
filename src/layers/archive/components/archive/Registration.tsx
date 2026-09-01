import { useState } from 'react'
import { useSession } from '@/layers/archive/state/useSession'
import { terminalId } from '@/shared/lib/format'

/**
 * 待提交的登记表。
 *
 * 只出现在 RS-87-0175 的正文末尾。玩家在这里按下的那个按钮就是结局。
 *
 * 两个按钮都通向同一处，只是「作废」会先告诉玩家为什么没用。
 * 提交之后本卷宗转入生效，相关人员名单出现——玩家的终端号排在
 * 韦昀和简致远后面。名单没有说明，也不需要说明。
 */
export function Registration() {
  const submitted = useSession((s) => s.submitted)
  const submit = useSession((s) => s.submitRegistration)
  const [voided, setVoided] = useState(false)
  const term = terminalId()

  if (submitted) {
    return (
      <section className="animate-fadeup space-y-4 border border-rust/50 bg-rust/[0.04] px-5 py-5">
        <div className="text-[10px] uppercase tracking-wider2 text-rust">登记已提交</div>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-2 border-b border-line pb-4 sm:grid-cols-4">
          {[
            ['状态', '生效'],
            ['监护等级', 'Ⅳ · 抹除'],
            ['登记员', '本次访问者'],
            ['完成时间', '17:41'],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="field-label">{k}</dt>
              <dd className="field-value mt-1 text-rust">{v}</dd>
            </div>
          ))}
        </dl>

        <div>
          <div className="mb-2 text-[10px] uppercase tracking-wider2 text-dim">相关人员</div>
          <table className="w-full font-mono text-[12px]">
            <tbody className="divide-y divide-line/60">
              {[
                ['PN-79-0091', '韦昀', '已注销'],
                ['［未分配］', '简致远', '一期 · 一九八八年起'],
                [term, '本次访问者', '本日'],
              ].map(([id, name, note], i) => (
                <tr key={id} className={i === 2 ? 'text-rust' : 'text-dim'}>
                  <td className="py-1.5 pr-4 align-top">{id}</td>
                  <td className="py-1.5 pr-4 align-top">{name}</td>
                  <td className="py-1.5 align-top text-faint">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-2 border-t border-line pt-4 font-doc text-[13px] leading-relaxed text-ink/80">
          <p>
            按《文档规范》第四条，完整读毕本级文件者列入本名单。名单随卷宗保管，
            卷宗注销时名单不注销。
          </p>
          <p className="text-dim">
            本条登记的编号早于其创建时间十七年。该差值不影响生效。
          </p>
          <p className="text-faint">感谢您的配合。</p>
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-4 border border-amberdim/60 bg-amber/[0.03] px-5 py-5">
      <div className="text-[10px] uppercase tracking-wider2 text-amber">待提交</div>

      <p className="font-doc text-[13px] leading-relaxed text-ink/85">
        本条登记尚未提交。提交后本卷宗由「尚未创建」转入「生效」，监护等级按 Ⅳ 执行。
        Ⅳ 级的含义见监护等级说明。
      </p>

      <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-[12.5px] sm:grid-cols-3">
        {[
          ['提交人', '本次访问者'],
          ['终端', term],
          ['依据', '本卷宗第三节'],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="field-label">{k}</dt>
            <dd className="field-value mt-1">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-wrap gap-2 pt-1">
        <button
          className="border border-rust/60 px-5 py-2 font-mono text-[12.5px] text-rust transition-colors hover:bg-rust/10"
          onClick={submit}
        >
          提交
        </button>
        <button
          className="tbtn"
          onClick={() => setVoided(true)}
        >
          作废
        </button>
      </div>

      {voided && (
        <p className="animate-fadeup border-l-2 border-rust/60 pl-3 font-mono text-[12.5px] text-rust">
          本次登记已于提交前完成。
        </p>
      )}

      <p className="text-[10.5px] leading-relaxed text-faint">
        本页的两个按钮均不改变已发生的事实。它们只决定本条记录以哪种状态归档。
      </p>
    </section>
  )
}
