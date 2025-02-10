import { api } from '../../shared/store/services/api'

export const homeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: `/api/v1/me`,
      }),
      providesTags: [
        { type: 'Home', id: 'dinnerSchedule' },
        { type: 'Menu', id: 'dinnerSchedulePerWeek' },
        { type: 'Shared', id: 'donate' },
      ],
    }),
    getAvailableDishes: builder.query({
      query: () => ({
        url: `/api/v1/dinner`,
      }),
      providesTags: [{ type: 'Home', id: 'availableDishes' }],
    }),
    getDonationHistory: builder.query({
      query: (id?: string) => ({
        url: `/api/v1/donate/${id}`,
      }),
      providesTags: [{ type: 'Home', id: 'donationHistory' }],
    }),
    getDinnerSchedule: builder.query({
      query: (date?: string) => ({
        url: `/api/v1/dinnerSchedule/date?date=${date}`,
      }),
      providesTags: [{ type: 'Home', id: 'dinnerSchedule' }],
    }),
    createTodayReservation: builder.mutation({
      query: (data) => ({
        url: `/api/v1/dinnerReservation`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [
        { type: 'Home', id: 'dinnerSchedule' },
        { type: 'Menu', id: 'dinnerSchedulePerWeek' },
      ],
    }),
    deleteTodayReservation: builder.mutation({
      query: ({ id }: { id: string | null }) => ({
        url: `/api/v1/dinnerReservation/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        { type: 'Home', id: 'dinnerSchedule' },
        { type: 'Menu', id: 'dinnerSchedulePerWeek' },
      ],
    }),
  }),
})

export const {
  useGetUserQuery,
  useGetAvailableDishesQuery,
  useGetDonationHistoryQuery,
  useGetDinnerScheduleQuery,
  useCreateTodayReservationMutation,
  useDeleteTodayReservationMutation,
} = homeApi
