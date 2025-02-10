import StarIcon from '../../../shared/assets/icons/shared/filled-star-icon.svg?react'
import CrossIcon from '../../../shared/assets/icons/shared/cross-icon.svg?react'

import { format } from 'date-fns'
import { formatRate } from '../../../shared/helpers/helpers'
import { useToastMessage } from '../../../shared/hook/useToastMessage'
import { useAppSelector } from '../../../shared/store'
import { useGetDinnerScheduleQuery } from '../../data/home'
import { useGetRatesQuery } from '../../../menu/data/menu'

import Button from '../../../shared/components/Button/Button'
import Timer from '../../../shared/components/Timer/Timer'
import EmptyDinnerState from '../../../shared/components/EmptyDinnerState/EmptyDinnerState'
import useHomeReservation from '../../data/useHomeReservation'

interface IDinner {
  userId?: string
}

function Dinner({ userId }: IDinner) {
  const timeLeft = useAppSelector((state) => state.timer)
  const isTimeOut = timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0

  const { showToastMessage, messageConfigProvider } = useToastMessage({})

  const todayDate = format(new Date(), 'yyyy-MM-dd')
  const isSunday = new Date().toLocaleDateString('en-US', { weekday: 'long' }) === 'Sunday'

  const { data } = useGetDinnerScheduleQuery(todayDate, { skip: isSunday })
  const reservationId = data?.data?.reservations?.[0]?._id

  const todayDish = data?.data?.dishes?.mainDish
  const isReserved = data?.data?.isReserved

  const {
    createReservationLoading,
    deleteReservationLoading,
    handleCreateReservation,
    handleDeleteReservation,
  } = useHomeReservation()

  const { data: ratingsData } = useGetRatesQuery(userId, {
    skip: !userId,
  })

  const rating = ratingsData?.data?.docs?.find(
    (doc: any) => doc.dinnerScheduleId._id === data?.data?._id
  )?.rating


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
                  <p>{formatRate(rating || '0')}/5</p>
                  <StarIcon />
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
                  <CrossIcon />
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
