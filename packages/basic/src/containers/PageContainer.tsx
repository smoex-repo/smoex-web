import * as React from 'react'
import { userSlice } from '@smoex-business/user'
import { AppContainer } from 'react-dom-basic-kit'
import { Provider } from 'react-redux'
import { configureStore } from 'redux-async-kit'

const PageRouter = React.lazy(() =>
  import('./PageRouter' /* webpackChunkName: "common" */),
)

const store = configureStore({
    injector: userSlice.injector,
})
  
export const PageContainer: React.FC = (props) => {
    return (
        <React.Suspense fallback={null}>
            <Provider store={store}>
                <AppContainer>
                    <PageRouter>{props.children}</PageRouter>
                </AppContainer>
            </Provider>
        </React.Suspense>
    )
}
