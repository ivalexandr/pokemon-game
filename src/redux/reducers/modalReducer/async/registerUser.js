import { createAsyncThunk } from '@reduxjs/toolkit'
import { registerUser } from '../../../../api/api'
import { NotificationManager } from 'react-notifications'

export const register = createAsyncThunk(
  'modal/register',
  async (data, { rejectWithValue }) => {
    try {
      const res = await registerUser(data)
      NotificationManager.success('All OK', 'Success')
      localStorage.setItem('idToken', res.idToken)
      localStorage.setItem('refreshToken', res.refreshToken)
      return {
        uid: res.localId,
        refreshToken: res.refreshToken,
        idToken: res.idToken
      }
    } catch (error) {
      NotificationManager.error(error, 'Error')
      return rejectWithValue(error)
    }
  }
)