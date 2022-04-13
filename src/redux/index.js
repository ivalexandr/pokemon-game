import { combineReducers } from "redux"
import { configureStore } from "@reduxjs/toolkit"
import { gameReducer } from "./reducers/gameReducer"

const rootReducer = combineReducers({
  game: gameReducer
})

export const store = configureStore({
  reducer: rootReducer,
})