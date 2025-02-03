import { useState } from 'react'
import { useGetAvailableDishesQuery } from '../../data/home'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

import Dish from '../../../home/components/Dish/Dish'
import ArrowBtn from '../../../shared/components/ArrowBtn/ArrowBtn'
import { IDish } from '../../data/types'
import DishesSkeleton from '../../../shared/components/DishesSkeleton/DishesSkeleton'

function Dishes() {
  const [startIndex, setStartIndex] = useState(0)

  const { data, isLoading, error } = useGetAvailableDishesQuery({})

  const mainDishes = data?.data?.mainDishes.docs
  const sideDishes = data?.data?.sideDishes.docs

  const visibleDishes = 4

  const nextSlide = () => {
    if (startIndex + visibleDishes < allDishes.length) {
      setStartIndex(startIndex + 1)
    }
  }

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1)
    }
  }

  if (isLoading) return <DishesSkeleton />

  const allDishes = [...mainDishes, ...sideDishes]

  return (
    <div className="box_container">
      <div className="box_header">
        <h3 className="title">Available Dishes</h3>
        <NavLink to={'/home/available-dishes'}>
          <p className="see_all_link">See all</p>
        </NavLink>
      </div>
      <div className="dishes_box_container">
        <ArrowBtn type="right" onClick={prevSlide} />
        <div className="slider">
          <motion.div
            className="dishes_box"
            initial={{ x: 0 }}
            animate={{ x: `-${startIndex * 1.4285}%` }}
            transition={{ type: 'spring', stiffness: 50 }}
          >
            {allDishes?.map((dish: IDish) => (
              <div key={dish._id} className="dishes">
                <Dish
                  _id={dish._id}
                  image={dish.image}
                  name={dish.name}
                  averageRating={dish.averageRating}
                />
              </div>
            ))}
          </motion.div>
        </div>
        <ArrowBtn type="left" onClick={nextSlide} />
      </div>
    </div>
  )
}

export default Dishes
