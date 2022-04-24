import { createAsyncThunk } from "@reduxjs/toolkit"
import { getBoard } from "../../../../api/api"

export const getGameBoard = createAsyncThunk(
  'game/getGameBoard',
  async (_, { rejectWithValue }) => {
    try {
      return await getBoard()
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)