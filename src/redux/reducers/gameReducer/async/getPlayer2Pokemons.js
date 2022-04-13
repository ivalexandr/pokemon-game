import { createAsyncThunk } from '@reduxjs/toolkit'
import { getPlayerTwoCard } from '../../../../api/api'

export const getPlayer2 = createAsyncThunk(
  'game/getPlayer2',
  async () => await getPlayerTwoCard()
)
