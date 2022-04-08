import { createContext } from "react"

export const StartContext = createContext()

export const startPokemons = {
  player1Pokemons: [],
  player2Pokemons: [],
  win:'',
  addPlayer1Pokemons(pokemon) {
    this.player1Pokemons.push(pokemon)
  },
  addPlayer2Pokemons(pokemons) {
    this.player2Pokemons = [...pokemons]
  }
}
