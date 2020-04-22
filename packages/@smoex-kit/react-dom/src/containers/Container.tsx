import * as React from 'react'
import { BrowserRouter, useLocation } from 'react-router-dom'
import { ModalLayer } from './ModalLayer'
import { Toast } from '../components/Toast'
import { useInitAppContext } from '../logics/ContainerContext'
import { transformStyles } from '../utils/style'
import qs from 'qs'

type IAppContainerProps = {
  basename?: string
  loading?: any
}

export function useUrlQuery() {
  const { search } = useLocation()
  return qs.parse(search, { ignoreQueryPrefix: true })
}

const DebugComponent = React.lazy(() => import('./DebugConsole' /* webpackChunkName: "debug" */))

const DebugConsole = () => {
    const query = useUrlQuery()
    if (!query.debug) {
      return null
    }
    return (
      <DebugComponent />
    )
}

function useDebugConsole(urlFlag = 'debug') {
  return false
}

export const AppContext = React.createContext<any>(null)

export const Container: React.FC<IAppContainerProps> = (props) => {
  const { children, basename } = props
  const appContext = useInitAppContext()
  const showDebug = useDebugConsole()

  return (
    <AppContext.Provider value={appContext}>
      <BrowserRouter basename={basename}>
        {appContext.toasts.map((toast: any, i: number) => (
          <Toast {...toast.props} key={i}>
            {toast.text}
            {!!appContext.theme}
          </Toast>
        ))}
        <ModalLayer>{children}</ModalLayer>
        {/* <DebugConsole /> */}
      </BrowserRouter>
    </AppContext.Provider>
  )
}
