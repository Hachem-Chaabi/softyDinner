import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from './authTypes'
import { login } from './authThunk'
import { setTokens } from '../../shared/utils/token'

export interface AuthState {
  status: string
  isAuthenticated: boolean
  isInitialised: boolean
  user: IUser | null
  error: string | null
}

const initialState: AuthState = {
  status: 'idle',
  isAuthenticated: false,
  isInitialised: false,
  user: null,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initialise: (state, action) => {
      const { isAuthenticated, user } = action.payload

      state.isAuthenticated = isAuthenticated
      state.isInitialised = true
      state.user = user?.data?.user
    },
    restore: (state) => {
      state.error = null
    },
    cleanStore: (state) => {
      state.user = null
    },
    updateUserPoints: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.points = action.payload
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.error = null
      state.status = 'loading'
    })
    builder.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
      const { filteredUser, accessToken, refreshToken } = action.payload?.data

      setTokens(accessToken, refreshToken)
      state.isAuthenticated = true
      state.user = filteredUser
      state.status = 'succeeded'
    })
    builder.addCase(login.rejected, (state, action: PayloadAction<any>) => {
      state.error = action?.payload
      state.status = 'failed'
    })
  },
})

export const { initialise, restore, updateUserPoints, cleanStore } = authSlice.actions

export default authSlice.reducer
