import StarIcon from '../../../shared/assets/icons/shared/filled-star-icon.svg?react'
import TickIcon from './../../assets/icons/tick-icon.svg?react'
import OutlinedStarIcon from './../../assets/icons/outlined-star-icon.svg?react'
import FilledHeartIcon from '../../../shared/assets/icons/shared/filled-heart-icon.svg?react'
import OutlinedHeartIcon from '../../../shared/assets/icons/shared/outlined-heart-icon.svg?react'
import CrossIcon from '../../assets/icons/cross-icon.svg?react'
import PlusIcon from './../../assets/icons/plus-icon.svg?react'

import { useState } from 'react'
import { IMenuItem, ISideDish } from '../../data/types'
import { formatRate } from '../../../shared/helpers/helpers'
import { useAppDispatch, useAppSelector } from '../../../shared/store'
import { Item } from '../../../favorite/data/types'
import { addFavorite, removeFavorite } from '../../../favorite/data/favoriteSlice'
import { useToastMessage } from '../../../shared/hook/useToastMessage'
import useMenuReservation from '../../data/useMenuReservation'
import { useGetRatesQuery } from '../../data/menu'

import RateModal from '../../../shared/components/RateModal/RateModal'

function MenuItem({ _id, date, isRated, dishes, isReserved, reservationId }: IMenuItem) {
  const dispatch = useAppDispatch()
  const [modalOpen, setModalOpen] = useState(false)
  const { user } = useAppSelector((state) => state.auth)

  const { data } = useGetRatesQuery(user?._id)
  const rating = data?.data?.docs?.find((doc: any) => doc.dinnerScheduleId._id === _id)?.rating

  const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'long' })
  const mainDish = dishes.mainDish

  const userFavorites = useAppSelector((state) => state.favorite.userFavorites[user?._id!])
  const isFavorite = userFavorites?.some((fav: Item) => fav.id === mainDish._id)

  const {
    createReservationLoading,
    deleteReservationLoading,
    handleCreateReservation,
    handleDeleteReservation,
  } = useMenuReservation()

  const timeLeft = useAppSelector((state) => state.timer)
  const isTimeOut = timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0

  const isPassed =
    new Date().setHours(isTimeOut ? 12 : 0, 0, 0, 0) > new Date(date).setHours(0, 0, 0, 0)
  const toBeRated = isPassed && isReserved
  const toBeReserved =
    new Date().setHours(isTimeOut ? 12 : 0, 0, 0, 0) <= new Date(date).setHours(0, 0, 0, 0) &&
    !isReserved
  const isCancel =
    isReserved && new Date().setHours(0, 0, 0, 0) <= new Date(date).setHours(0, 0, 0, 0)

  const { showToastMessage, messageConfigProvider } = useToastMessage({})

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  const handleFavoriteToggle = () => {
    if (!user) return

    if (isFavorite) {
      dispatch(removeFavorite({ userId: user._id, itemId: _id! }))
    } else {
      dispatch(
        addFavorite({
          userId: user._id,
          item: {
            id: mainDish._id,
            name: mainDish.name,
            image: mainDish.image,
            averageRating: rating,
          },
        })
      )
    }
  }

  let type, stateName
  if (toBeRated) {
    type = 'rate'
    stateName = 'Rate the dinner'
  }
  if (isPassed && !toBeRated) {
    type = 'time_passed'
    stateName = 'Reservation time passed'
  }
  if (isCancel) {
    type = 'cancel'
    stateName = 'Cancel the dinner'
  }
  if (toBeReserved) {
    type = 'reserve'
    stateName = 'Reserve the dinner'
  }

  return (
    <>
      <div className="menu_item">
        <div className="header">
          <p className="day_name">On {dayName} :</p>
          <p className={`state_${type}`}>{isRated ? 'Dinner rated' : stateName}</p>
        </div>

        <div className="card">
          <div className="menu_item_left_side">
            <img
              className="dish_img"
              src={`https://softydinnerapi.softylines.com/api/uploads/${mainDish.image}`}
              alt="dish"
            />
            <div className="text">
              <p className="dish_name">{mainDish.name}</p>
              <p className="side_dishes">
                {dishes?.sideDish?.map((sideDish: ISideDish) => sideDish.name).join(', ')}
              </p>
              <div className="rate">
                <p>{formatRate(rating || '0')}/5</p>
                <StarIcon />
                <span className="heart_icon" onClick={handleFavoriteToggle}>
                  {isFavorite ? <FilledHeartIcon /> : <OutlinedHeartIcon />}
                </span>
              </div>
            </div>
          </div>

          <div
            onClick={toBeRated ? handleOpenModal : undefined}
            style={isRated ? { backgroundColor: '#bfa900' } : undefined}
            className={`menu_item_right_side menu_item_${type}`}
          >
            {isPassed && !toBeRated && (
              <button className="menu_item_btn">
                <TickIcon />
              </button>
            )}
            {toBeRated && (
              <button disabled={isRated} className="menu_item_btn">
                <OutlinedStarIcon />
              </button>
            )}
            {isCancel && (
              <button
                className="menu_item_btn"
                disabled={deleteReservationLoading}
                onClick={(e) => handleDeleteReservation(e, reservationId!, showToastMessage)}
              >
                <CrossIcon />
              </button>
            )}
            {toBeReserved && (
              <button
                className="menu_item_btn"
                disabled={createReservationLoading}
                onClick={() => handleCreateReservation(showToastMessage, user?._id, _id)}
              >
                <PlusIcon />
              </button>
            )}
          </div>

          {isReserved && <div className="ribbon">Reserved</div>}

          <RateModal
            userId={user?._id}
            dinnerId={mainDish?._id}
            dinnerScheduleId={_id}
            isOpen={modalOpen}
            setIsOpen={setModalOpen}
          />
        </div>
      </div>

      {messageConfigProvider}
    </>
  )
}

export default MenuItem
