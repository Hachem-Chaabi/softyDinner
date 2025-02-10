import { useCreateTodayReservationMutation, useDeleteTodayReservationMutation } from './home'

const useHomeReservation = () => {
  const [createReservation, { isLoading: createReservationLoading }] =
    useCreateTodayReservationMutation()
  const [deleteReservation, { isLoading: deleteReservationLoading }] =
    useDeleteTodayReservationMutation()

  const handleCreateReservation = (
    showToastMessage: (message: string, type: 'success' | 'error') => void,
    userId?: string,
    dinnerScheduleId?: string
  ) => {
    createReservation({
      Reservations: [
        {
          userId,
          dinnerScheduleId,
        },
      ],
    })
      .unwrap()
      .then(() => {
        showToastMessage('Reservation successful', 'success')
      })
      .catch((err) => showToastMessage(err?.message || 'Something went wrong', 'error'))
  }

  const handleDeleteReservation = (
    e: any,
    reservationId: string,
    showToastMessage: (message: string, type: 'success' | 'error') => void
  ) => {
    e.preventDefault()

    deleteReservation({ id: reservationId })
      .unwrap()
      .then(() => {
        showToastMessage('Reservation cancelled', 'success')
      })
      .catch((err) => showToastMessage(err?.message || 'Something went wrong', 'error'))
  }

  return {
    createReservationLoading,
    deleteReservationLoading,
    handleCreateReservation,
    handleDeleteReservation,
  }
}

export default useHomeReservation
