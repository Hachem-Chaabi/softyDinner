import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { validateEmail } from './authThunk'

export interface AuthState {
  status: string
  email: string
  code: string
  error: string | null
}

const initialState: AuthState = {
  status: 'idle',
  email: '',
  code: '',
  error: null,
}

const forgetPasswordSlice = createSlice({
  name: 'forget-password',
  initialState,
  reducers: {
    initialise: (state, action) => {
      const { email, code } = action.payload

      state.email = email === undefined ? state.email : email
      state.code = code === undefined ? state.code : code
    },
    restore: (state) => {
      state.error = null
    },
  },
})

export const { initialise, restore } = forgetPasswordSlice.actions

export default forgetPasswordSlice.reducer
