import Button from '../Button/Button'
import { useState } from 'react'
import DonationModal from '../DonationModal/DonationModal'
import { useAppSelector } from '../../store'

function DinnerTickets() {
  const { user } = useAppSelector((state) => state.auth)

  const isSunday = new Date().toLocaleDateString('en-US', { weekday: 'long' }) === 'Sunday'

  const [modalOpen, setModalOpen] = useState(false)

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  return (
    <div className="box_container dinner_tickets_box_container">
      <h3 className="title">Dinner Tickets</h3>
      <div className="box dinner_tickets_box">
        <p className="text">
          You have <span>{user?.points}</span> tickets
        </p>

        {user?.points === 0 ? (
          <p className="dinner_tickets_empty_state">
            Purchase a ticket to reserve your dinner and enjoy a delicious meal!
          </p>
        ) : (
          <div className="btns">
            {!isSunday && <Button type="primary">Reserve</Button>}
            <Button onClick={handleOpenModal} type="secondary">
              
              Donate
            </Button>
            <DonationModal
              points={user?.points}
              identifier={user?.identifier}
              isOpen={modalOpen}
              setIsOpen={setModalOpen}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default DinnerTickets
