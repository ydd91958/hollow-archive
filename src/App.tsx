import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

/* ── 第一层：职引 ─────────────────────────────────── */
import { ZyShell } from '@/layers/recruitment/components/ZyShell'
import { Home as ZyHome } from '@/layers/recruitment/routes/Home'
import { Jobs } from '@/layers/recruitment/routes/Jobs'
import { JobDetail } from '@/layers/recruitment/routes/JobDetail'
import { Company } from '@/layers/recruitment/routes/Company'
import { Companies } from '@/layers/recruitment/routes/Companies'
import { CompanyProject } from '@/layers/recruitment/routes/CompanyProject'
import { Person } from '@/layers/recruitment/routes/Person'
import { Special } from '@/layers/recruitment/routes/Special'
import { Article } from '@/layers/recruitment/routes/Article'
import { LoginWall } from '@/layers/recruitment/routes/LoginWall'
import { ZyNotFound } from '@/layers/recruitment/routes/ZyNotFound'

/* ── 第二层：互联网调查 ───────────────────────────── */
import { BbsShell } from '@/layers/investigation/components/BbsShell'
import { ForumHome } from '@/layers/investigation/routes/ForumHome'
import { ForumThread } from '@/layers/investigation/routes/ForumThread'
import { LegacyShell } from '@/layers/investigation/components/LegacyShell'
import { LegacyHome } from '@/layers/investigation/routes/LegacyHome'
import { LegacyProject } from '@/layers/investigation/routes/LegacyProject'
import { LegacyAttach } from '@/layers/investigation/routes/LegacyAttach'
import { BlogShell } from '@/layers/investigation/components/BlogShell'
import { WxShell } from '@/layers/investigation/components/WxShell'
import { WxHome } from '@/layers/investigation/routes/WxHome'
import { WxHistory } from '@/layers/investigation/routes/WxHistory'
import {
  WxForecast,
  WxHourly,
  WxStations,
  WxAbout,
} from '@/layers/investigation/routes/WxPages'
import { BlogHome } from '@/layers/investigation/routes/BlogHome'
import { BlogPost } from '@/layers/investigation/routes/BlogPost'

/* ── 第三层：空册 ─────────────────────────────────── */
import { Shell as ArchiveShell } from '@/layers/archive/components/layout/Shell'
import { Home as ArchiveHome } from '@/layers/archive/routes/Home'
import { Browse } from '@/layers/archive/routes/Browse'
import { Detail } from '@/layers/archive/routes/Detail'
import { Search } from '@/layers/archive/routes/Search'
import { Timeline } from '@/layers/archive/routes/Timeline'
import { Clues } from '@/layers/archive/routes/Clues'
import { Log } from '@/layers/archive/routes/Log'
import { Vault } from '@/layers/archive/routes/Vault'
import { NotFound as ArchiveNotFound } from '@/layers/archive/routes/NotFound'
import { VAULT_PATH } from '@/layers/archive/data/unlocks'
import { SYS_ROOT } from '@/layers/archive/paths'

/**
 * 三层挂在同一个 SPA 下，但每一层有自己的外壳组件、自己的视觉语言、
 * 自己的「域名」。玩家从 / 进来看到的是一个招聘网站，
 * 第三层要一路调查到旧资料库的那条失效附件链接才能到达。
 */
export default function App() {
  /* basename 跟着 Vite 的 base 走：本地是 /，GitHub Pages 上是 /hollow-archive/。 */
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        {/* 第一层 · 职引 zhiyin.com */}
        <Route element={<ZyShell />}>
          <Route path="/" element={<ZyHome />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/company/:id" element={<Company />} />
          <Route path="/company/:id/project/:pid" element={<CompanyProject />} />
          <Route path="/people/:id" element={<Person />} />
          <Route path="/special/:id" element={<Special />} />
          <Route path="/article/:slug" element={<Article />} />
          <Route path="/news" element={<LoginWall title="职场资讯" />} />
          <Route path="/resume" element={<LoginWall title="我的简历" />} />
          <Route path="*" element={<ZyNotFound />} />
        </Route>

        {/* 第二层 · 北岭生活论坛 bbs.beiling.net */}
        <Route path="/forum" element={<BbsShell />}>
          <Route index element={<ForumHome />} />
          <Route path="b/:boardId" element={<ForumHome />} />
          <Route path="t/:id" element={<ForumThread />} />
        </Route>

        {/* 第二层 · 北岭地区工程资料库 bl-eng-data.org.cn */}
        <Route path="/proj" element={<LegacyShell />}>
          <Route index element={<LegacyHome />} />
          <Route path=":id" element={<LegacyProject />} />
          <Route path=":id/attach/:attachId" element={<LegacyAttach />} />
        </Route>

        {/* 第二层 · 北岭气象公共服务平台 bl-qx.gov.cn */}
        <Route path="/weather" element={<WxShell />}>
          <Route index element={<WxHome />} />
          <Route path="forecast" element={<WxForecast />} />
          <Route path="hourly" element={<WxHourly />} />
          <Route path="history" element={<WxHistory />} />
          <Route path="stations" element={<WxStations />} />
          <Route path="about" element={<WxAbout />} />
        </Route>

        {/* 第二层 · 个人博客 jianzhiyuan.blogcn.net */}
        <Route path="/blog" element={<BlogShell />}>
          <Route index element={<BlogHome />} />
          <Route path=":slug" element={<BlogPost />} />
        </Route>

        {/* 第三层 · 空册 */}
        <Route path={SYS_ROOT} element={<ArchiveShell />}>
          <Route index element={<ArchiveHome />} />
          <Route path="browse" element={<Browse />} />
          <Route path="archive/:id" element={<Detail />} />
          <Route path="search" element={<Search />} />
          <Route path="timeline" element={<Timeline />} />
          <Route path="clues" element={<Clues />} />
          <Route path="log" element={<Log />} />
          {/* 隐藏页面：不在导航里，但路径始终可达。 */}
          <Route path={VAULT_PATH.replace(`${SYS_ROOT}/`, '')} element={<Vault />} />
          <Route path="index" element={<Navigate to={SYS_ROOT} replace />} />
          <Route path="*" element={<ArchiveNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
