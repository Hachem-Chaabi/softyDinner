import StarIcon from '../../../shared/assets/icons/shared/filled-star-icon.svg?react'
import FilledHeart from '../../../shared/assets/icons/shared/filled-heart-icon.svg?react'
import OulinedHeart from '../../../shared/assets/icons/shared/outlined-heart-icon.svg?react'

import { addFavorite, removeFavorite } from '../../../favorite/data/favoriteSlice'
import { Item } from '../../../favorite/data/types'
import { useGetRatesQuery } from '../../../menu/data/menu'
import { formatRate } from '../../../shared/helpers/helpers'
import { useAppDispatch, useAppSelector } from '../../../shared/store'
import { IDish } from '../../data/types'

function Dish({ image, name, _id }: IDish) {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const userFavorites = useAppSelector((state) => state.favorite.userFavorites[user?._id!])
  const isFavorite = userFavorites?.some((fav: Item) => fav.id === _id)

  const { data } = useGetRatesQuery(user?._id)
  const rating = data?.data?.docs?.find((doc: any) => doc.dinnerScheduleId._id === _id)?.rating

  const handleFavoriteToggle = () => {
    if (!user) return

    if (isFavorite) {
      dispatch(removeFavorite({ userId: user._id, itemId: _id! }))
    } else {
      dispatch(
        addFavorite({
          userId: user._id,
          item: {
            id: _id!,
            name,
            image,
            averageRating: rating,
          },
        })
      )
    }
  }

  return (
    <div className="dish_container">
      <img
        src={`https://softydinnerapi.softylines.com/api/uploads/${image}`}
        alt={name}
        className="dish_img"
      />
      <div className="dish_background">
        <div className="dish_name_and_rate">
          <div className="dish_name">
            <p>{name}</p>
            <span onClick={handleFavoriteToggle}>
              {isFavorite ? <FilledHeart /> : <OulinedHeart />}
            </span>
          </div>
          <div className="dish_rate">
            <p>{formatRate(rating || '0')}/5</p>
            <StarIcon />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dish
