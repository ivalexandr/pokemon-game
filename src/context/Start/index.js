import { createContext } from "react"

export const StartContext = createContext()

export const startPokemons = []
export const addPokemons = (pokemon) => {
  startPokemons.push(pokemon)
}