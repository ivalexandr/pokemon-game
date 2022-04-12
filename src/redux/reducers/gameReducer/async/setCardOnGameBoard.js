import { createAsyncThunk } from '@reduxjs/toolkit'
import { setCardOnBoard } from '../../../../api/api'

export const setCardOnGameBoard = createAsyncThunk(
  'game/setCardOnGameBoard',
  async params => await setCardOnBoard(params)
)