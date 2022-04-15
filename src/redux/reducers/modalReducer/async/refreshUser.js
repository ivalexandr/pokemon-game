import { createAsyncThunk } from '@reduxjs/toolkit'
import { refreshUser } from '../../../../api/api'

export const refresh = createAsyncThunk(
  'modal/refresh',
  async (_, { rejectWithValue, getState }) => {
    try {
      const res = await refreshUser()
      localStorage.setItem('refreshToken', res.refresh_token)
      localStorage.setItem('idToken', res.id_token)
      return {
        uid: res.user_id,
        refreshToken: res.refresh_token,
        idToken: res.id_token
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)