import { createAsyncThunk } from '@reduxjs/toolkit'
import { setCardOnBoard } from '../../../api/api'

export const setCardOnGameBoard = createAsyncThunk(
  'POKEMONS/setCardOnGameBoard',
  async params => await setCardOnBoard(params)
)