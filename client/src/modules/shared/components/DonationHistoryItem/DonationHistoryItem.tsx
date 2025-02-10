import GiftIcon from '../../assets/icons/donationHistory/gift-icon.svg?react'

import { format, parseISO } from 'date-fns'

interface IDonationHistoryItem {
  createdAt: string
  recipient: string
  tickets: number
}

function DonationHistoryItem({ createdAt, recipient, tickets }: IDonationHistoryItem) {
  const formattedDate = format(parseISO(createdAt), 'dd-MM-yyyy HH:mm')

  return (
    <div className="donation_history_item">
      <div className="logo_container">
        <GiftIcon />
      </div>

      <div className="text_container">
        <p>
          To: <span>{recipient}</span>
        </p>
        <p>
          Tickets: <span>{tickets}</span>
        </p>
        <p>
          At: <span>{formattedDate}</span>
        </p>
      </div>
    </div>
  )
}

export default DonationHistoryItem
