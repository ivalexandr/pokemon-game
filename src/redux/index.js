import { combineReducers } from "redux"
import { configureStore } from "@reduxjs/toolkit"
import { gameReducer } from "./reducers/gameReducer"
import { modalReducer } from "./reducers/modalReducer"

const rootReducer = combineReducers({
  game: gameReducer,
  modal: modalReducer
})

export const store = configureStore({
  reducer: rootReducer,
})