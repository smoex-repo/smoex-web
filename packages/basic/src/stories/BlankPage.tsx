import * as React from 'react'
import { Route, Link } from 'react-router-dom'
import { configureStore } from 'redux-async-kit'
import { AppContainer } from 'react-dom-basic-kit'
import { Container } from '../index'
import { userSlice } from '@smoex-business/user'
import { Provider } from 'react-redux'
// import { homeSlice } from 'common/slices/home'
import { PageLoading } from '../containers/PageLoading'

const store = configureStore({
  injector: [userSlice.injector],
})

// window['store'] = store

const HomePage = () => {
  return (
    <section>
      homepage
      <Link to="/test"> to test </Link>
    </section>
  )
}

const TestPage = () => {
  // const { update } = usePageContext()
  React.useEffect(() => {
    // update({ showFooter: false })
  }, [])
  return (
    <section>
      test
      <Link to="/home">to home</Link>
    </section>
  )
}

export const BlankPage: React.FC = () => {
  return (
    <Container>
      <Route path="/test" component={TestPage} />
      <Route path="/" component={HomePage} />
    </Container>
  )
}
