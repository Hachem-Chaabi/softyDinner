import { useState } from 'react'
import { useGetAvailableDishesQuery } from '../../data/home'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useMediaQuery } from '@mui/material'
import { IDish } from '../../data/types'

import Dish from '../../../home/components/Dish/Dish'
import ArrowBtn from '../../../shared/components/ArrowBtn/ArrowBtn'

function Dishes() {
  const breakpoint_of_930 = useMediaQuery('(max-width:930px)')

  const [startIndex, setStartIndex] = useState(0)

  const { data } = useGetAvailableDishesQuery({})

  const mainDishes = data?.data?.mainDishes?.docs || []
  const sideDishes = data?.data?.sideDishes?.docs || []

  const nextSlide = () => {
    if (startIndex + 4 < allDishes.length) {
      setStartIndex(startIndex + 1)
    }
  }

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1)
    }
  }
  const allDishes = [...mainDishes, ...sideDishes]

  return (
    <div style={{ marginBottom: '50px' }} className="box_container">
      <div className="box_header">
        <h3 className="title">Available Dishes</h3>
        <NavLink to={'/home/available-dishes'}>
          <p className="see_all_link">See all</p>
        </NavLink>
      </div>
      <div className="dishes_box_container">
        {!breakpoint_of_930 && <ArrowBtn type="right" onClick={prevSlide} />}
        <div className="slider">
          <motion.div
            className="dishes_box"
            initial={{ x: 0 }}
            animate={{ x: `-${startIndex * 1.4285}%` }}
            transition={{ type: 'spring', stiffness: 50 }}
          >
            {allDishes?.map((dish: IDish) => (
              <div key={dish._id} className="dishes">
                <Dish _id={dish._id} image={dish.image} name={dish.name} />
              </div>
            ))}
          </motion.div>
        </div>
        {!breakpoint_of_930 && <ArrowBtn type="left" onClick={nextSlide} />}
      </div>
    </div>
  )
}

export default Dishes
