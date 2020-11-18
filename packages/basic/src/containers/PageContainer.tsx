import * as React from 'react'
import { userSlice } from '@smoex-logic/user'
import { AppContainer } from '@react-kits/dom'
import { Provider } from 'react-redux'
import { configureStore } from '@react-kits/redux'

const PageRouter = React.lazy(() =>
  import('./PageRouter' /* webpackChunkName: "common" */),
)

// @ts-ignore
const initialState = typeof window === 'undefined' ? undefined : window.__PRELOAD_STATE__

export const store = configureStore({
    injector: userSlice.injector,
}, initialState)
  
export const PageContainer: React.FC<any> = (props) => {
    const { basename, redirectPaths } = props 
    return (
        <React.Suspense fallback={null}>
            <Provider store={store}>
                <AppContainer basename={basename}>
                    <PageRouter redirectPaths={redirectPaths}>
                        {props.children}
                    </PageRouter>
                </AppContainer>
            </Provider>
        </React.Suspense>
    )
}
