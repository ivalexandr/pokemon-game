import { createAsyncThunk } from "@reduxjs/toolkit"
import { getBoard } from "../../../api/api"

export const getGameBoard = createAsyncThunk(
  'POKEMONS/getGameBoard',
  async () => await getBoard()
)