import { createAsyncThunk } from '@reduxjs/toolkit'
import { setCardOnBoard } from '../../../../api/api'

export const setCardOnGameBoard = createAsyncThunk(
  'game/setCardOnGameBoard',
  async (params, { rejectWithValue }) => {
    try {
      return await setCardOnBoard(params)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)