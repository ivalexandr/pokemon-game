import { createAsyncThunk } from '@reduxjs/toolkit'
import { authUser } from '../../../../api/api'
import { NotificationManager } from 'react-notifications'

export const auth = createAsyncThunk(
  'modal/auth',
  async (data, { rejectWithValue }) => {
    try {
      const res = await authUser(data)
      NotificationManager.success('All OK', 'Success')
      localStorage.setItem('idToken', res.idToken)
      localStorage.setItem('refreshToken', res.refreshToken)
      console.log(res)
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