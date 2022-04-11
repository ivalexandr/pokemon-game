import { createContext } from "react"

export const StartContext = createContext()

export const startPokemons = {
  player1Pokemons: [],
  player2Pokemons: [],
  win:'',
  addPlayer1Pokemons(pokemons) {
    this.player1Pokemons = [...pokemons]
  },
  addPlayer2Pokemons(pokemons) {
    this.player2Pokemons = [...pokemons]
  }
}
