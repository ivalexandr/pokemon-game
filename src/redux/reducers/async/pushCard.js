import { createAsyncThunk } from "@reduxjs/toolkit"
import { pushDataFromDatabase } from "../../../api/api"

export const pushCard = createAsyncThunk(
  'POKEMONS/pushCard',
  async (card) => await pushDataFromDatabase(card) 
) 