import Button from '../Button/Button'
import { useState } from 'react'
import DonationModal from '../DonationModal/DonationModal'
import { useGetUserQuery } from '../../../home/data/home'
import { useNavigate } from 'react-router-dom'

function DinnerTickets() {
  const navigate = useNavigate()
  const { data } = useGetUserQuery({})
  const user = data?.data?.user
  const points = user?.points

  const isSunday = new Date().toLocaleDateString('en-US', { weekday: 'long' }) === 'Sunday'

  const [modalOpen, setModalOpen] = useState(false)

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  const handleReserve = () => {
    navigate('/menu')
  }

  return (
    <div className="box_container dinner_tickets_box_container">
      <h3 className="title">Dinner Tickets</h3>
      <div className="box dinner_tickets_box">
        <p className="text">
          You have <span>{points}</span> tickets
        </p>

        {user?.points === 0 ? (
          <p className="dinner_tickets_empty_state">
            Purchase a ticket to reserve your dinner and enjoy a delicious meal!
          </p>
        ) : (
          <div className="btns">
            {!isSunday && (
              <Button onClick={handleReserve} type="primary">
                Reserve
              </Button>
            )}
            <Button onClick={handleOpenModal} type="secondary">
              Donate
            </Button>
            <DonationModal
              points={points}
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
