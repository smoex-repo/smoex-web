import * as React from 'react'
import * as ReactDOM from 'react-dom'

// export * from './containers/PageRouterContext'
export * from './containers/PageContainer'
import { serviceWorker } from '@react-kits/dom'
import { initWindowWidth } from '@basic-kits/dom'

const initial = (opts?: any) => {
  initWindowWidth()
}

const render = (...params: any[]) => {
  const isomorphic = process.env.NODE_ENV === 'production' && process.env.REACT_APP_ISOMORPHIC === 'yes'
  const renderDOM = isomorphic ? ReactDOM.hydrate : ReactDOM.render
  // @ts-ignore
  renderDOM(...params)
}

export const starter = {
  initial, 
  render,
  register: serviceWorker.register,
  unregister: serviceWorker.unregister,
}

export const Header = React.lazy(() =>
  import('./containers/Header' /* webpackChunkName: "common" */),
)
export const Footer = React.lazy(() =>
  import('./containers/Footer' /* webpackChunkName: "common" */),
)

export const PageError = React.lazy(() =>
  import('./containers/PageError' /* webpackChunkName: "common" */),
)
export const PageLoading = React.lazy(() =>
  import('./containers/PageLoading' /* webpackChunkName: "common" */),
)

export const Loading = React.lazy(() =>
  import('./components/Loading' /* webpackChunkName: "common" */),
)
export const ConfirmModal = React.lazy(() =>
  import('./components/ConfirmModal' /* webpackChunkName: "common" */),
)
export const DrawerModal = React.lazy(() =>
  import('./components/DrawerModal' /* webpackChunkName: "common" */),
)
export const FullScreenModal = React.lazy(() =>
  import('./components/StandardModal' /* webpackChunkName: "common" */),
)
export const TipsModal = React.lazy(() =>
  import('./components/TipsModal' /* webpackChunkName: "common" */),
)
