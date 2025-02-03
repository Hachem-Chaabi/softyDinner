import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { NavLink } from 'react-router-dom'

const DonationHistorySkeleton = () => {
  return (
    <div className="box_container donation_history_box_container">
      <h3 className="title">
        <Skeleton width={150} height={24} />
      </h3>
      <div className="box donation_history_box">
        <NavLink to={'/home/donation-history'}>
          <p className="see_all_link">
            <Skeleton width={60} height={20} />
          </p>
        </NavLink>

        {[...Array(4)].map((_, index) => (
          <div
            style={{ borderColor: 'rgba(132, 132, 132, 0.6)' }}
            key={index}
            className="donation_history_item"
          >
            <Skeleton  width={28} height={28} />

            <div className="text_container">
              <p>
                <Skeleton width={100} />
              </p>
              <p>
                <Skeleton width={50} />
              </p>
              <p>
                <Skeleton width={120} />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DonationHistorySkeleton
