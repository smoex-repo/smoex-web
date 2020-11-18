import * as React from 'react'
import { Route, Link } from 'react-router-dom'
import { configureStore } from '@react-kits/redux'
import { PageContainer } from '../index'
import { userSlice } from '@smoex-logic/user'
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
    <PageContainer>
      <Route path="/test" component={TestPage} />
      <Route path="/" component={HomePage} />
    </PageContainer>
  )
}
