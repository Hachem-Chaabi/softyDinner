import * as Yup from 'yup'
import { Modal } from 'antd'
import { useToastMessage } from '../../hook/useToastMessage'
import { useFormik } from 'formik'
import { useDonateMutation } from '../../data/sharedData'

import Button from '../Button/Button'
import Input from '../Input'

interface IDonationModal {
  points: number
  identifier?: string
  isOpen: boolean
  setIsOpen: (arg: boolean) => void
}

function DonationModal({ points, identifier, isOpen, setIsOpen }: IDonationModal) {
  const { showToastMessage, messageConfigProvider } = useToastMessage({})

  const handleClose = () => {
    setIsOpen(false)
  }

  const [donate, { isLoading }] = useDonateMutation()

  const formik = useFormik({
    initialValues: {
      recipientId: '',
      ticketsNum: '',
    },
    validationSchema: Yup.object().shape({
      recipientId: Yup.number()
        .required('Recipient identifier is required')
        .typeError('Recipient identifier must be a number'),
      ticketsNum: Yup.number()
        .required('Number of tickets is required')
        .typeError('Number of tickets must be a number')
        .lessThan(points, `Please enter a number less than ${points}`),
    }),
    onSubmit: async (values) => {
      await donate({
        donorIdentifier: identifier,
        recipientIdentifier: values.recipientId,
        points: Number(values.ticketsNum),
      })
        .unwrap()
        .then(() => {
          handleClose()
          showToastMessage('Donation Received', 'success')
        })
        .catch((err) => {
          showToastMessage(err?.message || 'Something went wrong', 'error')
        })
    },
  })

  return (
    <>
      <Modal
        centered
        open={isOpen}
        onOk={handleClose}
        onCancel={handleClose}
        footer={[
          <div key={'donation_modal_footer'} className="donation_modal_footer">
            <Button submitting={isLoading} onClick={handleClose} type="secondary">
              Cancel
            </Button>

            <Button submitting={isLoading} onClick={formik.handleSubmit} type="primary">
              Donate
            </Button>
          </div>,
        ]}
      >
        <h3>Donate Points</h3>
        <Input formik={formik} label="Recipient identifier" name="recipientId" />
        <Input formik={formik} label="Number of tickets" name="ticketsNum" />
      </Modal>
      {messageConfigProvider}
    </>
  )
}

export default DonationModal
