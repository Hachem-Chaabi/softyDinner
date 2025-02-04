import star from '/public/star.png'
import cancel from '/public/cancel.png'

import { format } from 'date-fns'
import { formatRate } from '../../../shared/helpers/helpers'
import { useToastMessage } from '../../../shared/hook/useToastMessage'
import { useAppSelector } from '../../../shared/store'
import { useGetDinnerScheduleQuery } from '../../data/home'

import Button from '../../../shared/components/Button/Button'
import Timer from '../../../shared/components/Timer/Timer'
import DinnerSkeleton from '../../../shared/components/DinnerSkeleton/DinnerSkeleton'
import EmptyDinnerState from '../../../shared/components/EmptyDinnerState/EmptyDinnerState'
import useHomeReservation from '../../data/useHomeReservation'

interface IDinner {
  userId?: string
}

function Dinner({ userId }: IDinner) {
  const timeLeft = useAppSelector((state) => state.timer)
  const isTimeOut = timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0

  const { showToastMessage, messageConfigProvider } = useToastMessage()

  const todayDate = format(new Date(), 'yyyy-MM-dd')
  const isSunday = new Date().toLocaleDateString('en-US', { weekday: 'long' }) === 'Sunday'

  const { data, isLoading, error } = useGetDinnerScheduleQuery(todayDate, { skip: isSunday })
  const reservationId = data?.data?.reservations?.[0]._id

  const todayDish = data?.data?.dishes?.mainDish
  const isReserved = data?.data?.isReserved

  const {
    createReservationLoading,
    deleteReservationLoading,
    handleCreateReservation,
    handleDeleteReservation,
  } = useHomeReservation()

  if (isLoading) return <DinnerSkeleton />

  return (
    <>
      <div className="box_container">
        <h3 className="title">Tonight's Dinner</h3>

        {!todayDish ? (
          <EmptyDinnerState />
        ) : (
          <div className="box dinner_box">
            <div className="image_and_rate">
              <img
                className="dinner_image"
                src={`https://softydinnerapi.softylines.com/api/uploads/${todayDish?.image}`}
                alt="dinner"
              />
              {isReserved && <div className="ribbon">Reserved</div>}
              <div className="dinner_name_and_rate">
                <p className="dinner_name">{todayDish?.name}</p>
                <div className="dinner_rate">
                  <p>{formatRate(todayDish?.averageRating)}/5</p>
                  <img src={star} alt="star" />
                </div>
              </div>
            </div>
            <div className="timer">
              <p>Time left to reserve tonight's dinner:</p>
              <Timer />

              {!isTimeOut && !isReserved ? (
                <Button
                  submitting={createReservationLoading}
                  onClick={() =>
                    handleCreateReservation(showToastMessage, userId!, data?.data?._id)
                  }
                  type="primary"
                >
                  Reserve
                </Button>
              ) : !isTimeOut && isReserved ? (
                <Button
                  onClick={(e) => handleDeleteReservation(e, reservationId, showToastMessage)}
                  submitting={deleteReservationLoading}
                  type="cancel"
                >
                  <span>Cancel</span>
                  <img src={cancel} alt="cancel icon" />
                </Button>
              ) : (
                isTimeOut && (
                  <p className="period_ended">
                    Time's up! the {isReserved ? 'cancellation' : 'reservation'} period has ended.
                  </p>
                )
              )}
            </div>
          </div>
        )}
      </div>

      {messageConfigProvider}
    </>
  )
}

export default Dinner
