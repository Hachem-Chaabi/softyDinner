import tonightDinner from '/tonight-dinner.png'
import star from '/public/star.png'
import cancel from '/public/cancel.png'

import Button from '../../../shared/components/Button/Button'
import Timer from '../../../shared/components/Timer/Timer'
import { format } from 'date-fns'
import { useCreateReservationMutation, useGetDinnerScheduleQuery } from '../../data/home'
import { formatRate } from '../../../shared/helpers/helpers'
import { useToastMessage } from '../../../shared/hook/useToastMessage'
import DinnerSkeleton from '../../../shared/components/DinnerSkeleton/DinnerSkeleton'
import EmptyDinnerState from '../../../shared/components/EmptyDinnerState/EmptyDinnerState'
// import { useAppSelector } from '../../../shared/store'

interface IDinner {
  userId?: string
}

function Dinner({ userId }: IDinner) {
  const { showToastMessage, messageConfigProvider } = useToastMessage()

  const [createReservation] = useCreateReservationMutation()

  const todayDate = format(new Date(), 'yyyy-MM-dd')
  const isSunday = new Date().toLocaleDateString('en-US', { weekday: 'long' }) === 'Sunday'

  const { data, isLoading, error } = useGetDinnerScheduleQuery(todayDate, { skip: isSunday })

  const todayDish = data?.data?.dishes?.mainDish
  const isReserved = data?.data?.isReserved

  const handleReservation = async (e: any) => {
    e.preventDefault()
    await createReservation({
      Reservations: [
        {
          userId,
          dinnerScheduleId: todayDish?._id,
        },
      ],
    })
      .unwrap()
      .catch((err) => {
        showToastMessage(err?.message || 'Something went wrong', 'error')
      })
  }

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

              <Button onClick={handleReservation} type="primary">
                Reserve
              </Button>

              {/* <Button type="cancel">
            <span>Cancel</span>
            <img src={cancel} alt="cancel icon" />
            </Button> */}

              {/* <p className="period_ended">Time's up! the cancellation period has ended.</p> */}
            </div>
          </div>
        )}
      </div>

      {messageConfigProvider}
    </>
  )
}

export default Dinner
