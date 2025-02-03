import { addFavorite, removeFavorite } from '../../../favorite/data/favoriteSlice'
import { Item } from '../../../favorite/data/types'
import { useAppDispatch, useAppSelector } from '../../../shared/store'
import { IDish } from '../../data/types'

import filledHeart from '/filled-heart.png'
import outlinedHeart from '/outlined-heart.png'
import star from '/star.png'

function Dish({ image, name, averageRating, _id }: IDish) {
  const dispatch = useAppDispatch()
  const favorites = useAppSelector((state) => state.favorite.favorites)
  const isFavorite = favorites.some((fav: Item) => fav.id === _id)

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFavorite(_id!))
    } else {
      dispatch(
        addFavorite({
          id: _id!,
          name,
          image,
          averageRating,
        })
      )
    }
  }

  return (
    <div className="dish_container">
      <img
        src={`https://softydinnerapi.softylines.com/api/uploads/${image}`}
        alt="name"
        className="dish_img"
      />
      <div className="dish_background">
        <div className="dish_name_and_rate">
          <div className="dish_name">
            <p>{name}</p>
            <img
              src={isFavorite ? filledHeart : outlinedHeart}
              alt={`${name} icon`}
              onClick={handleFavoriteToggle}
            />
          </div>
          <div className="dish_rate">
            <p>{averageRating}/5</p>
            <img src={star} alt="star" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dish
