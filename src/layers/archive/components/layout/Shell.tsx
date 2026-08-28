import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { TopBar } from './TopBar'
import { SideNav } from './SideNav'
import { StatusBar } from './StatusBar'
import { CrtOverlay } from './CrtOverlay'
import { BootScreen } from './BootScreen'
import { ToastLayer } from '@/layers/archive/components/arg/ToastLayer'
import { useSession } from '@/layers/archive/state/useSession'
import { useLayerTheme } from '@/shared/lib/useLayerTheme'

const BOOT_KEY = 'hollow.booted'

export function Shell() {
  useLayerTheme('archive', 'sys', '空册 · 内部登记检索系统')

  const location = useLocation()
  const visit = useSession((s) => s.visit)

  /* 引导只在进入第三层时播放一次——它不该出现在招聘网站上。 */
  const [booting, setBooting] = useState(() => {
    try {
      return sessionStorage.getItem(BOOT_KEY) !== '1'
    } catch {
      return true
    }
  })

  const finishBoot = () => {
    try {
      sessionStorage.setItem(BOOT_KEY, '1')
    } catch {
      /* 隐私模式下不做处理——引导每次都放一遍也无所谓。 */
    }
    setBooting(false)
  }

  useEffect(() => {
    visit(location.pathname)
    window.scrollTo({ top: 0 })
  }, [location.pathname, visit])

  return (
    <>
      {booting && <BootScreen onDone={finishBoot} />}
      <div className="flex min-h-screen flex-col animate-flicker">
        <TopBar />
        <div className="flex flex-1 flex-col md:flex-row">
          <SideNav />
          <main className="min-w-0 flex-1 px-4 py-5 md:px-7 md:py-7">
            <div className="mx-auto max-w-5xl">
              <Outlet />
            </div>
          </main>
        </div>
        <StatusBar />
        <CrtOverlay />
        <ToastLayer />
      </div>
    </>
  )
}
