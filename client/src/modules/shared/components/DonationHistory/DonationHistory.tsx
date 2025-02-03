import { NavLink } from 'react-router-dom'
import DonationHistoryItem from '../DonationHistoryItem/DonationHistoryItem'
import { useGetDonationHistoryQuery } from '../../../home/data/home'
import DonationHistorySkeleton from '../DonationHistorySkeleton/DonationHistorySkeleton'
import { IDonation } from '../../../home/data/types'
import { useAppSelector } from '../../store'

function DonationHistory() {
  const { user } = useAppSelector((state) => state.auth)
  const id = user?._id
  const { data, isLoading, error } = useGetDonationHistoryQuery(id)

  const userDonations = data?.data?.filter((donation: IDonation) => donation.donor._id === id)
  const donationHistoryData = userDonations?.slice(-4).reverse()

  if (isLoading) return <DonationHistorySkeleton />

  return (
    <div className="box_container donation_history_box_container">
      <h3 className="title">Donation History</h3>
      <div className="box donation_history_box">
        <NavLink to={`/home/donation-history/${id}`}>
          <p className="see_all_link">See all</p>
        </NavLink>

        {data?.data?.length ? (
          <>
            {donationHistoryData.map((donation: IDonation) => (
              <DonationHistoryItem
                key={donation._id}
                createdAt={donation.createdAt}
                recipient={donation.recipient.name}
                tickets={donation.points}
              />
            ))}
          </>
        ) : (
          <p className="donation_history_empty_state">No donation yet.</p>
        )}
      </div>
    </div>
  )
}

export default DonationHistory
