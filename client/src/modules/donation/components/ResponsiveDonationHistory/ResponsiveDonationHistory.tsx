import { useGetDonationHistoryQuery } from '../../../home/data/home'
import { IDonation } from '../../../home/data/types'
import DonationHistoryItem from '../../../shared/components/DonationHistoryItem/DonationHistoryItem'
import { useAppSelector } from '../../../shared/store'

function ResponsiveDonationHistory() {
  const { user } = useAppSelector((state) => state.auth)
  const id = user?._id
  const { data } = useGetDonationHistoryQuery(id)

  const userDonations = data?.data?.filter((donation: IDonation) => donation.donor._id === id)
  const donationHistoryData = userDonations?.reverse()

  return (
    <div className="responsive_donation_history_box_container">
      <h3 className="title">Donation History</h3>
      <div className="responsive_donation_history_box">
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
export default ResponsiveDonationHistory
