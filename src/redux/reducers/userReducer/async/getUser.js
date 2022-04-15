import { createAsyncThunk } from '@reduxjs/toolkit'
import { getUser } from '../../../../api/api'

export const getActiveUser = createAsyncThunk(
  'user/getActiveUser',
  async (_, { rejectWithValue }) => {
    try {
      return await getUser()
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
