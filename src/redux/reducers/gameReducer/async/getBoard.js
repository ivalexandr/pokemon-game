import { createAsyncThunk } from "@reduxjs/toolkit"
import { getBoard } from "../../../../api/api"

export const getGameBoard = createAsyncThunk(
  'game/getGameBoard',
  async () => await getBoard()
)