import { useAppSelector } from '../../../shared/store'

import Dish from '../../../home/components/Dish/Dish'
import DinnerTickets from '../../../shared/components/DinnerTickets/DinnerTickets'
import DonationHistory from '../../../shared/components/DonationHistory/DonationHistory'
import EmptyFavorite from '../../../shared/components/EmptyFavorite/EmptyFavorite'

function Favorite() {
  const favorites = useAppSelector((state) => state.favorite.favorites)

  return (
    <div className="favorite">
      {/* <EmptySearch /> */}
      <div className="left_side">
        <div className="title">favorite Dishes</div>
        {favorites.length ? (
          <div className="favorite_box">
            {favorites.map((fav) => (
              <Dish
                key={fav.id}
                image={fav.image}
                name={fav.name}
                _id={fav.id}
                averageRating={fav.averageRating}
              />
            ))}
          </div>
        ) : (
          <EmptyFavorite />
        )}
      </div>

      <div className="right_side">
        <div className="right_side_container">
          <DinnerTickets />
          <DonationHistory />
        </div>
      </div>
    </div>
  )
}

export default Favorite
