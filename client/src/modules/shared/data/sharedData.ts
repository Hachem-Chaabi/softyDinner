import { api } from '../../shared/store/services/api'

export const sharedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    donate: builder.mutation({
      query: (data) => ({
        url: `/api/v1/donate`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Shared', id: 'donate' }],
    }),
  }),
})

export const { useDonateMutation } = sharedApi
