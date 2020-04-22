import * as React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { useAsyncCallback } from 'redux-async-kit'
import { accountAsyncAction, commonSlice } from 'smoex-common-business'
import { Footer } from './Footer'
import { PageError } from './PageError'
import { PageLoading } from './PageLoading'
import { useToastError } from 'react-dom-basic-kit'
import { initInnerHeight, IS_WECHAT_WEBVIEW } from '@smoex-basic/browser'
import { IPageContext, useInitPageContext } from './PageRouterContext'

const PageContext = React.createContext({} as any)
export function usePageContext() {
  return React.useContext(PageContext)
}

export function usePageInit(page: IPageContext) {
  const [getInfo, infoState] = commonSlice.useAction(accountAsyncAction.getInfo)
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

    // WORKAROUND 兼容 wechat 内置浏览器路由切换时 innerHeight 不一致的问题
    if (IS_WECHAT_WEBVIEW) {
      // 经测试路由延迟大概 100 ms
      setTimeout(() => {
        const rootNode = document.getElementById('root')
        initInnerHeight(rootNode)
      }, 100)
    }
  }, [pathname])
  return infoState.error
}

export const PageRouter: React.FC<any> = (props) => {
  const { children } = props
  const pageContext = useInitPageContext()
  const { showHeader, showFooter } = pageContext
  const error = usePageInit(pageContext)
  useToastError(error)

  return (
    <PageContext.Provider value={pageContext}>
      {showHeader && <Header />}
      <React.Suspense fallback={<PageLoading />}>
        <Switch>
          {false ? <PageError code={500} /> : children}
          <Route render={() => <PageError code={404} />} />
        </Switch>
        {showFooter && <Footer />}
      </React.Suspense>
    </PageContext.Provider>
  )
}
export default PageRouter
