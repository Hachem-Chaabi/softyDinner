import { useGetDinnerSchedulePerWeekQuery } from '../../data/menu'
import { IMenuItem } from '../../data/types'
import { useMediaQuery } from '@mui/material'

import DinnerTickets from '../../../shared/components/DinnerTickets/DinnerTickets'
import DonationHistory from '../../../shared/components/DonationHistory/DonationHistory'
import EmptyMenu from '../../../shared/components/EmptyMenu/EmptyMenu'
import MenuItem from '../../components/MenuItem/MenuItem'
import Spinner from '../../../shared/components/Spinner/Spinner'

function Menu() {
  const breakpoint_of_930 = useMediaQuery('(max-width:930px)')

  const { data, isLoading } = useGetDinnerSchedulePerWeekQuery({})
  const menu = data?.data

  if (isLoading) return <Spinner />
  return (
    <div className="menu">
      <div className="left_side">
        <div className="title">Weekly Menu</div>
        {menu?.length ? (
          <div className="menu_box">
            {menu?.map((item: IMenuItem) => (
              <MenuItem
                key={item._id}
                _id={item._id}
                dishes={item.dishes}
                reservationId={item.reservations?.[0]?._id}
                date={item.date}
                isReserved={item.isReserved}
                isRated={item.isRated}
              />
            ))}
          </div>
        ) : (
          <EmptyMenu />
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

export default Menu
