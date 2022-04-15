import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { gameReducer } from './reducers/gameReducer'
import { modalReducer } from './reducers/modalReducer'
import { userReducer } from './reducers/userReducer'

const rootReducer = combineReducers({
  game: gameReducer,
  modal: modalReducer,
  user: userReducer
})

export const store = configureStore({
  reducer: rootReducer,
})