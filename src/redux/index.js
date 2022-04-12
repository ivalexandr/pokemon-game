import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { pokemonReducer } from "./reducers/pokemonsReducer";

const rootReducer = combineReducers({
  POKEMONS: pokemonReducer
})

export const store = configureStore({
  reducer: rootReducer,
})