import { createSlice } from '@reduxjs/toolkit'
import { register } from './async/registerUser'
import { auth } from './async/authUser'
import { refresh } from './async/refreshUser'

const modalSlice = createSlice({
  name:'modal',
  
  initialState: {
    isOpen: false,
    isLoginForm: false,
    isRegister: false,
    isAuth: false,
    isRefresh: false,
    credential: {},
    error: '',
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
    },
    clearError: state => {
      state.error = ''
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
    builder.addCase(refresh.pending, state => {
      state.isRefresh = true
    })
    builder.addCase(refresh.fulfilled, (state, { payload }) => {
      state.isRefresh = false
      state.credential = payload
    })
    builder.addCase(refresh.rejected, (state, { payload }) => {
      state.isRefresh = false
      state.error = payload
    })
  }

})

export const modalReducer = modalSlice.reducer
export const {
  closeModal,
  openModal,
  toggleForm,
  clearError
} = modalSlice.actions

export const isOpen = store => store.modal.isOpen
export const isLoginForm = store => store.modal.isLoginForm
export const isAuth = store => store.modal.isAuth
export const isRegister = store => store.modal.isRegister
export const error = store => store.modal.error
export const isRefresh = store => store.modal.isRefresh