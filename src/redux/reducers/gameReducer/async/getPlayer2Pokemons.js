import { createAsyncThunk } from '@reduxjs/toolkit'
import { getPlayerTwoCard } from '../../../../api/api'

export const getPlayer2 = createAsyncThunk(
  'game/getPlayer2',
  async (data, { rejectWithValue }) => {
    try {
      return await getPlayerTwoCard(data)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
