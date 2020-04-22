import { ACCOUNT_ASYNC_ACTION, ACCOUNT_ACTION } from './enums'
import { createReducer } from 'redux-async-kit'

const initialState = {
  name: '123',
}

const mockCalculate = () => {
  for (let i = 1; i < 1000; i++) {
    for (let j = 1; j < 1000; j++) {
      for (let k = 1; k < 5000; k++) {
        const b = k * 100
      }
    }
  }
}

const reducerMap = (state: any) => ({
  [ACCOUNT_ASYNC_ACTION.GET_INFO]: () => {
    return {
      loading: true,
    }
  },
  [ACCOUNT_ACTION.SET_INFO]: ({ payload }: any) => {
    return {
      loading: false,
      payload,
    }
  },
  [ACCOUNT_ACTION.SET_ERROR]: () => {
    return {
      loading: false,
      name: 'error',
    }
  },
})

export const accountReducer = createReducer(initialState, reducerMap)
