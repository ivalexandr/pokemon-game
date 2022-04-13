import { createSlice } from '@reduxjs/toolkit'
import { register } from './async/registerUser'
import { auth } from './async/authUser'

const modalSlice = createSlice({
  name:'modal',
  
  initialState: {
    isOpen: false,
    isLoginForm: false,
    isRegister: false,
    isAuth: false,
    credential: null,
    error:'',
  },

  reducers: {
    openModal: state => {
      state.isOpen = true
    },
    closeModal: state => {
      state.isOpen = false
    },
    toggleForm: state => {
      state.isLoginForm = !state.isLoginForm
    }
  },

  extraReducers:(builder) => {
    builder.addCase(register.pending, state => {
      state.isRegister = true
    })
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.isRegister = false
      state.credential = payload
    })
    builder.addCase(register.rejected, (state, { payload }) => {
      state.isRegister = false
      state.error = payload
    })
    builder.addCase(auth.pending, state => {
      state.isAuth = true
    })
    builder.addCase(auth.fulfilled, (state, { payload }) => {
      state.isAuth = false
      state.credential = payload
    })
    builder.addCase(auth.rejected, (state, { payload }) => {
      state.isAuth = false
      state.error = payload
    })
  }

})

export const modalReducer = modalSlice.reducer
export const {
  closeModal,
  openModal,
  toggleForm
} = modalSlice.actions

export const isOpen = store => store.modal.isOpen
export const isLoginForm = store => store.modal.isLoginForm