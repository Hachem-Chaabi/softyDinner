import starIcon from '/star.png'
import tickIcon from '/tick-menu-page.png'
import filledHeartIcon from '/filled-heart.png'
import crossIcon from '/cross.png'
import plusIcon from '/plus.png'

import { useState } from 'react'

import RateModal from '../../../shared/components/RateModal/RateModal'
import { IMenuItem, ISideDish } from '../../data/types'
import { formatRate } from '../../../shared/helpers/helpers'

function MenuItem({ date, averageRating, isRated, dishes, isReserved }: IMenuItem) {
  const [modalOpen, setModalOpen] = useState(false)

  const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'long' })
  const mainDish = dishes.mainDish

  const isPassed = new Date() > new Date(date)
  const toRate = isPassed && isReserved
  const isCancel = new Date() === new Date(date) && isReserved
  const toReserve = new Date() < new Date(date) && !isReserved

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  let type, stateName
  if (toRate) {
    type = 'rate'
    stateName = 'Rate the dinner'
  }
  if (isPassed && !toRate) {
    type = 'time_passed'
    stateName = 'Reservation time passed'
  }
  if (isCancel) {
    type = 'cancel'
    stateName = 'Cancel the dinner'
  }
  if (toReserve) {
    type = 'reserve'
    stateName = 'Reserve the dinner'
  }

  return (
    <>
      <div className="menu_item">
        <div className="header">
          <p className="day_name">On {dayName} :</p>
          <p className={`state_${type}`}>{stateName}</p>
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
                <p>{formatRate(averageRating)}/5</p>
                <img src={starIcon} alt="star" />
                <img src={filledHeartIcon} alt="filled heart icon" />
              </div>
            </div>
          </div>

          <div
            onClick={toRate ? handleOpenModal : undefined}
            className={`menu_item_right_side menu_item_${type}`}
          >
            {isPassed && !toRate && <img src={tickIcon} alt="white tick icon" />}
            {toRate && (
              <svg
                width="28"
                height="28"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.7457 2.51001L14.5057 6.03001C14.7457 6.52002 15.3857 6.99001 15.9257 7.08001L19.1157 7.61001C21.1557 7.95001 21.6357 9.43001 20.1657 10.89L17.6857 13.37C17.2657 13.79 17.0357 14.6 17.1657 15.18L17.8757 18.25C18.4357 20.68 17.1457 21.62 14.9957 20.35L12.0057 18.58C11.4657 18.26 10.5757 18.26 10.0257 18.58L7.03566 20.35C4.89566 21.62 3.59566 20.67 4.15566 18.25L4.86566 15.18C4.99566 14.6 4.76566 13.79 4.34566 13.37L1.86566 10.89C0.405656 9.43001 0.875656 7.95001 2.91566 7.61001L6.10566 7.08001C6.63566 6.99001 7.27566 6.52002 7.51566 6.03001L9.27566 2.51001C10.2357 0.600015 11.7957 0.600015 12.7457 2.51001Z"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            {isCancel && (
              <img
                style={{ width: '22px', height: '22px' }}
                src={crossIcon}
                alt="white cross icon"
              />
            )}
            {toReserve && <img src={plusIcon} alt="white plus icon" />}
          </div>

          {isReserved && <div className="ribbon">Reserved</div>}

          <RateModal isOpen={modalOpen} setIsOpen={setModalOpen} />
        </div>
      </div>
    </>
  )
}

export default MenuItem
