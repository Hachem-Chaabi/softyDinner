import { useGetDinnerSchedulePerWeekQuery } from '../../data/menu'
import { IMenuItem } from '../../data/types'

import DinnerTickets from '../../../shared/components/DinnerTickets/DinnerTickets'
import DonationHistory from '../../../shared/components/DonationHistory/DonationHistory'
import EmptyMenu from '../../../shared/components/EmptyMenu/EmptyMenu'
import MenuItem from '../../components/MenuItem/MenuItem'
import MenuSkeleton from '../../../shared/components/MenuSkeleton/MenuSkeleton'

function Menu() {
  const { data, isLoading, error } = useGetDinnerSchedulePerWeekQuery({})
  const menu = data?.data

  if (isLoading) return <MenuSkeleton />

  return (
    <div className="menu">
      {/* <EmptySearch /> */}
      <div className="left_side">
        <div className="title">Weekly Menu</div>
        {menu?.length ? (
          <div className="menu_box">
            {menu?.map((item: IMenuItem) => (
              <MenuItem
                key={item._id}
                dishes={item.dishes}
                averageRating={item.averageRating}
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

      <div className="right_side">
        <div className="right_side_container">
          <DinnerTickets />
          <DonationHistory />
        </div>
      </div>
    </div>
  )
}

export default Menu
