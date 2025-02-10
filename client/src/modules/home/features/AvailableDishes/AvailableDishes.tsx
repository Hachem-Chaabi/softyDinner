import LeftArrowIcon from '../../../shared/assets/icons/shared/left-arrow-icon.svg?react'
import ArrowIcon from '../../../shared/assets/icons/shared/responsive-arrow.svg?react'

import { useGetAvailableDishesQuery } from '../../data/home'
import { useMediaQuery } from '@mui/material'
import { IDish } from '../../data/types'
import { useNavigate } from 'react-router-dom'

import Dish from '../../components/Dish/Dish'
import Spinner from '../../../shared/components/Spinner/Spinner'

function AvailableDishes() {
  const breakpoint_of_930 = useMediaQuery('(max-width:930px)')
  const navigate = useNavigate()
  const { data, isLoading } = useGetAvailableDishesQuery({})

  const mainDishes = data?.data?.mainDishes.docs
  const sideDishes = data?.data?.sideDishes.docs

  const navigateBack = () => {
    navigate(-1)
  }

  if (isLoading) return <Spinner />

  return (
    <div className="available_dishes">
      <div className="header">
        {breakpoint_of_930 && (
          <span role="img" className="arrow_img" onClick={navigateBack}>
            <ArrowIcon />
          </span>
        )}
        <h3>Available Dishes</h3>
        {!breakpoint_of_930 && (
          <div onClick={navigateBack} className="go_back_btn">
            <LeftArrowIcon />
            <p>Back</p>
          </div>
        )}
      </div>

      <div className="body">
        {mainDishes.map((dish: IDish) => (
          <Dish key={dish._id} image={dish.image} name={dish.name} _id={dish._id} />
        ))}

        {sideDishes.map((dish: IDish) => (
          <Dish key={dish._id} image={dish.image} name={dish.name} _id={dish._id} />
        ))}
      </div>
    </div>
  )
}
export default AvailableDishes
