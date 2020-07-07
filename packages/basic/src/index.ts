import * as React from 'react'

export * from './containers/PageRouter'

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
