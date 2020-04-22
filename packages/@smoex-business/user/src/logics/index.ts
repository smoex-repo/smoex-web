import { combineReducers } from 'redux'
import { createSlice } from 'redux-async-kit'
import { accountReducer } from './account'

export const commonReducer = {
  commonAccount: accountReducer,
}

export const commonSlice = createSlice('common', {
  account: accountReducer,
})
export { accountReducer }
