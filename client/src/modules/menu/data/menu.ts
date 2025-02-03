import { api } from '../../shared/store/services/api'

export const homeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDinnerSchedulePerWeek: builder.query({
      query: () => ({
        url: `/api/v1/dinnerSchedule/PerWeek`,
      }),
      providesTags: [{ type: 'Menu', id: 'dinnerSchedulePerWeek' }],
    }),
  }),
})

export const { useGetDinnerSchedulePerWeekQuery } = homeApi
