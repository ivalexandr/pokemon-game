import { createAsyncThunk } from '@reduxjs/toolkit'
import { getPlayerTwoCard } from '../../../api/api'

export const getPlayer2 = createAsyncThunk(
  'POKEMONS/getPlayer2',
  async () => await getPlayerTwoCard()
)
