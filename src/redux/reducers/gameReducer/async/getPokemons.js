import { createAsyncThunk } from "@reduxjs/toolkit"
import { getDataFromDatabase } from "../../../../api/api"

export const getPokemons = createAsyncThunk(
  'game/getData',
  async () => await getDataFromDatabase()
)