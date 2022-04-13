import { createAsyncThunk } from '@reduxjs/toolkit'
import { registerUser } from '../../../../api/api'

export const register = createAsyncThunk(
  'modal/register',
  async data => await registerUser(data)
)
