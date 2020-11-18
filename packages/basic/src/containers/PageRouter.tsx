import * as React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { useAsyncCallback } from '@react-kits/redux'
import { accountAsyncAction, userSlice } from '@smoex-logic/user'
import { Footer } from './Footer'
import { PageError } from './PageError'
import { PageLoading } from './PageLoading'
import { useToastError } from '@react-kits/dom'
import { initInnerHeight } from '@basic-kits/dom'
import { IPageContext, useInitPageContext } from './PageRouterContext'

const PageRouter: React.FC<any> = (props) => {
  const { children, refreshPaths = [] } = props
  const pageContext = useInitPageContext()
  const { showHeader, showFooter } = pageContext
  const { pathname } = useLocation()
  const error = usePageInit(pageContext, refreshPaths)
  useToastError(error)
  const notfoundVisible = !refreshPaths.find((path: string) => pathname.startsWith(path))
  return (
    <PageContext.Provider value={pageContext}>
      {showHeader && <Header />}
      <React.Suspense fallback={<PageLoading />}>
        <Switch>
          {false ? <PageError code={500} /> : children}
          {notfoundVisible && <Route render={() => <PageError code={404} />} />}
        </Switch>
        {showFooter && <Footer />}
      </React.Suspense>
    </PageContext.Provider>
  )
}

export default PageRouter

export const PageContext = React.createContext({} as IPageContext)

export function usePageContext() {
  return React.useContext(PageContext)
}

function usePageInit(page: IPageContext, refreshPaths: string[]) {
  const [getInfo, infoState] = userSlice.useAction(accountAsyncAction.getInfo)
  const { pathname } = useLocation()

  const onGetInfo = useAsyncCallback(async () => {
    await getInfo()
  })

  React.useEffect(() => {
    // 初始化 root 高度，处理 Safari 高度计算问题
    const rootNode = document.getElementById('root')
    if (!rootNode?.style.minHeight) {
      initInnerHeight(rootNode)
    }
    // 初始化请求
    onGetInfo()
  }, [])

  React.useEffect(() => {
    // 页面切换时，重置 context 数据
    page.reset()

    for (const path of refreshPaths) {
      if (pathname.startsWith(path)) {
        window.location.replace(pathname)
      }
    }

  }, [pathname])
  return infoState.error
}
