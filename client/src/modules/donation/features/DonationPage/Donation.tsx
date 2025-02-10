import { useMediaQuery } from '@mui/material'
import DinnerTickets from '../../../shared/components/DinnerTickets/DinnerTickets'
import ResponsiveDonationHistory from '../../components/ResponsiveDonationHistory/ResponsiveDonationHistory'
import DonationHistoryPage from '../../../home/features/DonationHistoryPage/DonationHistoryPage'

function Donation() {
  const breakpoint_of_930 = useMediaQuery('(max-width:930px)')

  return (
    <>
      {breakpoint_of_930 ? (
        <div className="donation_page">
          <div className="donation_page_container">
            <h3 className="page_title">Donation</h3>
            <DinnerTickets />
            <ResponsiveDonationHistory />
          </div>
        </div>
      ) : (
        <DonationHistoryPage />
      )}
    </>
  )
}

export default Donation
