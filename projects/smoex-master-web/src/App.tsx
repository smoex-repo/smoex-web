import * as React from 'react'
import { Route } from 'react-router-dom'
import { configureStore, useActionCallback } from 'redux-async-kit'
import { Container } from '@smoex-kit/react-dom'
import { PageRouter, Footer } from '@smoex-web/common'
import { commonSlice, accountAsyncAction } from 'smoex-common-business'
import { Provider } from 'react-redux'
import { createLazyComponent } from 'redux-async-kit'


const store = configureStore({
  injector: commonSlice.injector,
})

window['store'] = store

const HomePage = createLazyComponent({
  injector: commonSlice.injector,
  loader: () => import('./containers/HomePage' /* webpackChunkName: "home" */),
})


function useTimeout(time: number = 0) {
  const [loading, setLoading] = React.useState(true)
  setTimeout(() => {
    setLoading(false)
  }, time);
  return loading

}
const App: React.FC = () => {
  const loading = useTimeout(1000)
  return (
    <Provider store={store}>
      <Container>
        <PageRouter>
          <Route exact path="/" component={HomePage} />
        </PageRouter>
      </Container>
    </Provider>
  )
}

export default App
