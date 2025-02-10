/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, FetchArgs, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { clearTokens, getTokens, setTokens } from '../../utils/token'
import { isValidToken } from '../../utils/isValidToken'
import axios from 'axios'
import { VITE_APP_BASE_URL } from '../../../../config'

const baseQuery = fetchBaseQuery({
  baseUrl: VITE_APP_BASE_URL,
  prepareHeaders: (headers) => {
    const { access_token } = getTokens()
    if (access_token) {
      headers.set('Authorization', `Bearer ${access_token}`)
    }
    headers.set('Authorization', `Bearer ${access_token}`)
    headers.set('Content-Type', 'application/json')
    return headers
  },
})

const staggeredBaseQueryWithBailOut = retry(
  async (args: string | FetchArgs, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions)

    if (result.error) {
      if (result.error.status === 403) {
        const { refresh_token } = getTokens()
        if (refresh_token && isValidToken(refresh_token)) {
          try {
            const response = await axios.post('/api/v1/refresh-token', {
              refreshToken: refresh_token,
            })
            const { accessToken: new_accessToken, refreshToken: new_refresh_token } =
              response.data?.data
            setTokens(new_accessToken, new_refresh_token)

            const retryResult = await baseQuery(args, api, extraOptions)
            return retryResult
          } catch (error) {
            clearTokens()
            return result
          }
        }
      }
      return retry.fail(result.error?.data)
    }

    return result
  },
  {
    maxRetries: 3,
  }
)

const baseQueryWithRetry = staggeredBaseQueryWithBailOut

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Home', 'Menu', 'Shared'],
  baseQuery: baseQueryWithRetry,
  endpoints: () => ({}),
})
