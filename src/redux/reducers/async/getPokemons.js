import { createAsyncThunk } from "@reduxjs/toolkit"
import { getDataFromDatabase } from "../../../api/api"

export const getPokemons = createAsyncThunk(
  'POKEMONS/getData',
  async () => await getDataFromDatabase()
)