import leftArrowIcon from '/arrow-left.png'

import { useGetAvailableDishesQuery } from '../../data/home'

import Dish from '../../components/Dish/Dish'
import AvailableDishesSkeleton from '../../../shared/components/AvailableDishesSkeleton/AvailableDishesSkeleton'
import { IDish } from '../../data/types'
import { useNavigate } from 'react-router-dom'

function AvailableDishes() {
  const navigate = useNavigate()
  const { data, isLoading, error } = useGetAvailableDishesQuery({})

  const mainDishes = data?.data?.mainDishes.docs
  const sideDishes = data?.data?.sideDishes.docs

  const navigateBack = () => {
    navigate(-1)
  }

  if (isLoading) return <AvailableDishesSkeleton isLoading={isLoading} />

  return (
    <div className="available_dishes">
      <div className="header">
        <h3>Available Dishes</h3>
        <div onClick={navigateBack} className="go_back_btn">
          <img src={leftArrowIcon} alt="left arrow icon" />
          <p>Back</p>
        </div>
      </div>

      <div className="body">
        {mainDishes.map((dish: IDish) => (
          <Dish
            key={dish._id}
            image={dish.image}
            name={dish.name}
            averageRating={dish.averageRating}
          />
        ))}

        {sideDishes.map((dish: IDish) => (
          <Dish
            key={dish._id}
            image={dish.image}
            name={dish.name}
            averageRating={dish.averageRating}
          />
        ))}
        {/* <Dish imgSrc={saladeTunisienneImg} name="Salade Tunisienne" rate="2.8" />
        <Dish imgSrc={saladeTunisienneImg} name="Salade Niçoise" rate="2.8" /> */}
      </div>
    </div>
  )
}
export default AvailableDishes
