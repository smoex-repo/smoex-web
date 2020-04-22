import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { initWindowWidth } from '@smoex-basic/browser'
initWindowWidth()

const App = React.lazy(() => import('./App' /* webpackChunkName: "app" */))

const LazyApp = () => {
  return (
    <Suspense fallback={null}>
      <App />
    </Suspense>
  )
}

ReactDOM.render(<LazyApp />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
