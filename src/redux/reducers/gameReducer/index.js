import { createSlice, current } from "@reduxjs/toolkit"
import { getPokemons } from "./async/getPokemons"
import { getPlayer2 } from "./async/getPlayer2Pokemons"
import { getGameBoard } from "./async/getBoard"
import { setCardOnGameBoard } from "./async/setCardOnGameBoard"
import { pushCard } from "./async/pushCard"

const gameSlice = createSlice({
  name:'game',
  initialState: {
    pokemons: [],
    player1Pokemons:[],
    player2Pokemons:[],
    player1PokemonsGame: [],
    player2PokemonsGame: [],
    board: [],
    choiseCard: null,
    playerStart: null,
    selectedCard: null,
    countPlayer1: 0,
    countPlayer2: 0,
    isLoadingAllCards: false,
    isLoadingPlayer2: false,
    isLoadingBoard: false,
    isLoadingPushCard: false,
    win:'',
    error:'',
    steps: 0,
  },
  reducers:{
    setCard: (state, { payload }) => {
      const pokemon = Object.entries(state.pokemons).find(item => item[1].id === payload)
      if (pokemon[1].isSelected) {
        pokemon[1].isSelected = false
      } else {
        pokemon[1].isSelected = true
      }
      state.pokemons[pokemon[0]] = {...pokemon[1]}
    },

    choiseCard: state => {
      const items = Object.values(state.pokemons)
      .filter(item => item.isSelected)
      .map(item => ({...item, possession:'blue'}))
      state.player1PokemonsGame = items
      state.player1Pokemons = items
    },

    setPlayerCard: (state, { payload }) => {
      if (payload.player === 1) {
        state.player1Pokemons = state.player1Pokemons.filter(item => item.id !== payload.id)
      }
      if (payload.player === 2) {
        state.player2Pokemons = state.player2Pokemons.filter(item => item.id !== payload.id)
      }
    },

    setWinCard: (state, { payload }) => {
      state.player2PokemonsGame = state.player2PokemonsGame.map(item => {
        item.selected = false
        if (item.id === payload) {
          item.selected = true
          state.choiseCard = item
        }
        return item
      })
    },

    setWin: (state, action) => {
      state.win = action.payload
    },

    setPlayerStart: (state, { payload }) => {
      state.playerStart = payload
    },

    selectCard: (state, { payload }) => {
      state.selectedCard = payload
    },

    counterWin: (state) => {
      state.countPlayer1 = state.player1Pokemons.length
      state.countPlayer2 = state.player2Pokemons.length
      current(state.board).forEach(item => {
        if (item.card.possession === 'red') {
          state.countPlayer2++
        }
        if (item.card.possession === 'blue') {
          state.countPlayer1++
        }
      })
    },

    cleanState: state => {
      state.pokemons = []
      state.player1Pokemons = []
      state.player2Pokemons = []
      state.player1PokemonsGame = []
      state.player2PokemonsGame = []
      state.win = ''
      state.steps = 0
      state.choiseCard = null
      state.playerStart = null
      state.selectedCard = null
    }

  },
  extraReducers: builder => {
    builder.addCase(getPokemons.pending, state => {
      state.isLoadingAllCards = true
    })

    builder.addCase(getPokemons.fulfilled, (state, action) => {
      state.isLoadingAllCards = false
      state.pokemons = action.payload
    })

    builder.addCase(getPokemons.rejected, (state, action) => {
      state.isLoadingAllCards = false
      state.error = action.payload
    })

    builder.addCase(getPlayer2.pending, state => {
      state.isLoadingPlayer2 = true
    })
    
    builder.addCase(getPlayer2.fulfilled, (state, action) => {
      state.isLoadingPlayer2 = false
      const items = action.payload.data.map(item => ({...item, possession: 'red'}))
      state.player2Pokemons = items
      state.player2PokemonsGame = items
    })

    builder.addCase(getPlayer2.rejected, (state, action) => {
      state.isLoadingPlayer2 = false
      state.error = action.payload
    })

    builder.addCase(getGameBoard.pending, state => {
      state.isLoadingBoard = true
    })

    builder.addCase(getGameBoard.fulfilled, (state, action) => {
      state.isLoadingBoard = false
      state.board = action.payload.data
    })

    builder.addCase(getGameBoard.rejected, (state, action) => {
      state.isLoadingBoard = false
      state.error = action.payload
    })

    builder.addCase(setCardOnGameBoard.pending, state => {
      state.isLoadingBoard = true
    })

    builder.addCase(setCardOnGameBoard.fulfilled, (state, action) => {
      state.isLoadingBoard = false
      state.board = action.payload.data
      state.steps = state.steps + 1
    })

    builder.addCase(setCardOnGameBoard, (state, action) => {
      state.isLoadingAllCards = false
      state.error = action.payload
    })

    builder.addCase(pushCard.pending, state => {
      state.isLoadingPushCard = true
    })

    builder.addCase(pushCard.fulfilled, state => {
      state.isLoadingPushCard = false
    })

    builder.addCase(pushCard.rejected, (state, action) => {
      state.isLoadingPushCard = false
      state.error = action.payload
    })

  }
})

export const gameReducer = gameSlice.reducer
export const { 
  setCard,
  choiseCard,
  setPlayerCard,
  setWin,
  cleanState,
  setWinCard,
  setPlayerStart,
  selectCard,
  counterWin
} = gameSlice.actions

export const pokemons = store => store.game.pokemons
export const player1Pokemons = store => store.game.player1Pokemons
export const player2Pokemons = store => store.game.player2Pokemons
export const result = store => store.game.win
export const board = store => store.game.board
export const choiseWinCard = store => store.game.choiseCard
export const playerStart = store => store.game.playerStart
export const selectedCard = store => store.game.selectedCard
export const steps = store => store.game.steps
export const counterPlayer1 = store => store.game.countPlayer1
export const counterPlayer2 = store => store.game.countPlayer2
export const player1PokemonsGame = store => store.game.player1PokemonsGame
export const player2PokemonsGame = store => store.game.player2PokemonsGame