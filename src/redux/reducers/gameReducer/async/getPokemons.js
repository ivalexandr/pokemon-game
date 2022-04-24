import { createAsyncThunk } from "@reduxjs/toolkit"
import { getDataFromDatabase } from "../../../../api/api"

export const getPokemons = createAsyncThunk(
  'game/getData',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { modal:{ credential } } = getState()
      const { uid, idToken } = credential
      const res = idToken ? await getDataFromDatabase(uid, idToken) : {}
      return res
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)