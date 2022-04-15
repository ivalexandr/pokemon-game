import { createAsyncThunk } from "@reduxjs/toolkit"
import { pushDataFromDatabase } from "../../../../api/api"

export const pushCard = createAsyncThunk(
  'game/pushCard',
  async (card, { rejectWithValue, getState }) => {
    try {
      const { modal: { credential } } = getState()
      const { idToken, uid } = credential
      await pushDataFromDatabase(card, uid, idToken) 
    } catch (error) {
      return rejectWithValue(error)
    }
  }
) 