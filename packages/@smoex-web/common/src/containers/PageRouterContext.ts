import * as React from 'react'
import { createReducer, IReducerMap } from 'react-dom-basic-kit'

export const PageContext = React.createContext<any>(null)

type IPageState = {
  showHeader: boolean
  showFooter: boolean
}

type IPageActions = {
  update: (props: Partial<IPageState>) => void
  reset: () => void
}

const initialState: IPageState = {
  showHeader: true,
  showFooter: true,
}

const PAGE_SET_PROPS = 'PAGE_SET_PROPS'
const PAGE_RESET_PROPS = 'PAGE_RESET_PROPS'

const setPageProps = (props: Partial<IPageState>) => ({
  type: PAGE_SET_PROPS,
  props,
})
const resetPageProps = () => ({ type: PAGE_RESET_PROPS })

const reducerMap: IReducerMap<IPageState> = (state) => ({
  [PAGE_SET_PROPS]: ({ props }) => ({
    ...state,
    ...props,
  }),
  [PAGE_RESET_PROPS]: () => ({
    ...initialState,
  }),
})

const pageReducer = createReducer(reducerMap)

export type IPageContext = IPageState & IPageActions

export function useInitPageContext(): IPageContext {
  const [state, dispatch] = React.useReducer(pageReducer, initialState)
  return {
    ...state,
    // WORKAROUND: 通过 setTimeout 保证 update 的更新在 reset 之后
    update: (props: Partial<IPageState>) =>
      setTimeout(() => dispatch(setPageProps(props))),
    reset: () => dispatch(resetPageProps()),
  }
}
