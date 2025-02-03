import { Modal, Rate } from 'antd'

import Button from '../Button/Button'
import { useToastMessage } from '../../hook/useToastMessage'

interface IRateModal {
  isOpen: boolean
  setIsOpen: (arg: boolean) => void
}

function RateModal({ isOpen, setIsOpen }: IRateModal) {
  const { showToastMessage, messageConfigProvider } = useToastMessage()

  const handleClose = () => {
    setIsOpen(false)
    showToastMessage('Rating Received', 'success')
  }

  return (
    <>
      <Modal
        className="rate_modal"
        centered
        open={isOpen}
        onOk={handleClose}
        onCancel={handleClose}
        footer={[
          <div key={'rate_modal_footer'} className="rate_modal_footer">
            <Button onClick={handleClose} type="secondary">
              Cancel
            </Button>

            <Button onClick={handleClose} type="primary">
              Rate
            </Button>
          </div>,
        ]}
      >
        <h3>How did you find the dinner?</h3>
        <div className="rate_and_textarea">
          <Rate
            character={
              <svg
                width="28"
                height="28"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.7457 2.51001L14.5057 6.03001C14.7457 6.52002 15.3857 6.99001 15.9257 7.08001L19.1157 7.61001C21.1557 7.95001 21.6357 9.43001 20.1657 10.89L17.6857 13.37C17.2657 13.79 17.0357 14.6 17.1657 15.18L17.8757 18.25C18.4357 20.68 17.1457 21.62 14.9957 20.35L12.0057 18.58C11.4657 18.26 10.5757 18.26 10.0257 18.58L7.03566 20.35C4.89566 21.62 3.59566 20.67 4.15566 18.25L4.86566 15.18C4.99566 14.6 4.76566 13.79 4.34566 13.37L1.86566 10.89C0.405656 9.43001 0.875656 7.95001 2.91566 7.61001L6.10566 7.08001C6.63566 6.99001 7.27566 6.52002 7.51566 6.03001L9.27566 2.51001C10.2357 0.600015 11.7957 0.600015 12.7457 2.51001Z"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            }
          />
          <textarea
            placeholder="Leave a rate..."
            name="rate_description"
            id="rate_description"
            className="rate_description"
          />
        </div>
      </Modal>

      {messageConfigProvider}
    </>
  )
}

{
}

export default RateModal
