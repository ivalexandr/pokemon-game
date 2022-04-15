import { createSlice } from '@reduxjs/toolkit'
import { getActiveUser } from './async/getUser'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isLoadingUser: false,
    isProfileOpen: false,
    error: ''
  },

  reducers: {
    openProfile: state => {
      state.isProfileOpen = true
    },
    closeProfile: state => {
      state.isProfileOpen = false
    },
    toggleProfile: state => {
      state.isProfileOpen =!state.isProfileOpen
    },
    logoutUser: state => {
      state.user = null
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('idToken')
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getActiveUser.pending, state => {
      state.isLoadingUser = true
    })
    builder.addCase(getActiveUser.fulfilled, (state, { payload }) => {
      state.isLoadingUser = false
      state.user = payload.users[0]
    })
    builder.addCase(getActiveUser.rejected, (state, { payload }) => {
      state.isLoadingUser = false
      state.error = payload
    })
  }

})

export const userReducer = userSlice.reducer
export const { 
  openProfile,
  closeProfile,
  toggleProfile,
  logoutUser
  } = userSlice.actions
export const selectUser = store => store.user.user
export const selectIsProfileOpen = store => store.user.isProfileOpen