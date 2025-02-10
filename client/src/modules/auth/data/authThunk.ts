/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../shared/utils/axios'
import {
  createNewPasswordPayload,
  LoginPayload,
  RegisterPayload,
  validateCodePayload,
  validateEmailPayload,
} from './authTypes'

export const login = createAsyncThunk(
  'auth/login',
  async (query: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/api/v1/login`, query)

      if (response.status === 200) {
        return response?.data
      }

      throw new Error(response?.statusText)
    } catch (err: any) {
      return rejectWithValue(err)
    }
  }
)

export const validateEmail = createAsyncThunk(
  'auth/validate-email',
  async (query: validateEmailPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/api/v1/validate-email`, query)

      if (response.status === 200) {
        return response?.data
      }

      throw new Error(response?.statusText)
    } catch (err: any) {
      return rejectWithValue(err)
    }
  }
)

export const validateCode = createAsyncThunk(
  'auth/validate-code',
  async (query: validateCodePayload, { rejectWithValue }) => {
    try {
      const { email, code } = query

      const response = await axiosInstance.post(`/api/v1/validate-code/${email}`, { code })

      if (response.status === 200) {
        return response?.data
      }

      throw new Error(response?.statusText)
    } catch (err: any) {
      return rejectWithValue(err)
    }
  }
)

export const createNewPassword = createAsyncThunk(
  'auth/create-new-password',
  async (query: createNewPasswordPayload, { rejectWithValue }) => {
    try {
      const { email, code, password } = query

      const response = await axiosInstance.post(`/api/v1/update-password/${email}/${code}`, {
        password,
      })

      if (response.status === 200) {
        return response?.data
      }

      throw new Error(response?.statusText)
    } catch (err: any) {
      return rejectWithValue(err)
    }
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async (query: RegisterPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/users`, query)

      if (response.status === 201) {
        return response?.data
      }

      throw new Error(response.statusText)
    } catch (err: any) {
      return rejectWithValue(err)
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/api/auth/logout`)

    if (response.status === 200) {
      return response.data
    }

    throw new Error(response.statusText)
  } catch (err: any) {
    return rejectWithValue(err)
  }
})
