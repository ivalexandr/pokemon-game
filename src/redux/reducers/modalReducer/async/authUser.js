import { createAsyncThunk } from '@reduxjs/toolkit'
import { authUser } from '../../../../api/api'

export const auth = createAsyncThunk(
  'modal/auth',
  async data => await authUser(data) 
)