import { useAppSelector } from '../../../shared/store'
import { useMediaQuery } from '@mui/material'

import Dish from '../../../home/components/Dish/Dish'
import DinnerTickets from '../../../shared/components/DinnerTickets/DinnerTickets'
import DonationHistory from '../../../shared/components/DonationHistory/DonationHistory'
import EmptyFavorite from '../../../shared/components/EmptyFavorite/EmptyFavorite'

function Favorite() {
  const breakpoint_of_930 = useMediaQuery('(max-width:930px)')
  const { user } = useAppSelector((state) => state.auth)
  const userFavorites = useAppSelector((state) => state.favorite.userFavorites[user?._id!])

  return (
    <div className="favorite">
      <div className="left_side">
        <div className="title">
          <span>favorite Dishes</span>
        </div>
        {userFavorites?.length ? (
          <div className="favorite_box">
            {userFavorites?.map((fav) => (
              <Dish key={fav.id} image={fav.image} name={fav.name} _id={fav.id} />
            ))}
          </div>
        ) : (
          <EmptyFavorite />
        )}
      </div>

      {!breakpoint_of_930 && (
        <div className="right_side">
          <div className="right_side_container">
            <DinnerTickets />
            <DonationHistory />
          </div>
        </div>
      )}
    </div>
  )
}

export default Favorite
