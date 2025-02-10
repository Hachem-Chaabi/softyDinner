import { api } from '../../shared/store/services/api'

export const homeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDinnerSchedulePerWeek: builder.query({
      query: () => ({
        url: `/api/v1/dinnerSchedule/PerWeek`,
      }),
      providesTags: [{ type: 'Menu', id: 'dinnerSchedulePerWeek' }],
    }),
    createReservation: builder.mutation({
      query: (data) => ({
        url: `/api/v1/dinnerReservation`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [
        { type: 'Menu', id: 'dinnerSchedulePerWeek' },
        { type: 'Home', id: 'dinnerSchedule' },
      ],
    }),
    deleteReservation: builder.mutation({
      query: ({ id }: { id: string | null }) => ({
        url: `/api/v1/dinnerReservation/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        { type: 'Menu', id: 'dinnerSchedulePerWeek' },
        { type: 'Home', id: 'dinnerSchedule' },
      ],
    }),
    submitRate: builder.mutation({
      query: (data) => ({
        url: `/api/v1/rate`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [
        { type: 'Menu', id: 'rate' },
        { type: 'Menu', id: 'dinnerSchedulePerWeek' },
      ],
    }),
    getRates: builder.query({
      query: (id) => ({
        url: `/api/v1/rate/${id}`,
      }),
      providesTags: [
        { type: 'Menu', id: 'rate' },
        { type: 'Menu', id: 'dinnerSchedulePerWeek' },
      ],
    }),
  }),
})

export const {
  useGetDinnerSchedulePerWeekQuery,
  useCreateReservationMutation,
  useDeleteReservationMutation,
  useSubmitRateMutation,
  useGetRatesQuery,
} = homeApi
