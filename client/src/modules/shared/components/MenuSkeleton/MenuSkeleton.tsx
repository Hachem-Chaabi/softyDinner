import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css' // Import CSS for skeleton
import DonationHistorySkeleton from '../DonationHistorySkeleton/DonationHistorySkeleton'
import DinnerTickets from '../DinnerTickets/DinnerTickets'

const MenuSkeleton = () => {
  return (
    <div className="menu">
      <div className="left_side">
        <div className="title">
          <Skeleton width={150} height={25} />
        </div>

        <div className="menu_box">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="menu_item_skeleton">
              <Skeleton height={130} width={600} />
            </div>
          ))}
        </div>
      </div>

      <div className="right_side">
        <div className="right_side_container">
          <DinnerTickets />
          <DonationHistorySkeleton />
        </div>
      </div>
    </div>
  )
}

export default MenuSkeleton
