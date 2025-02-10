import * as Yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../../shared/store'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Input from '../../../shared/components/Input'
import Button from '../../../shared/components/Button/Button'
import { createNewPassword } from '../../data/authThunk'
import { useToastMessage } from '../../../shared/hook/useToastMessage'

const CreateNewPassword = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [submitting, setSubmitting] = useState<boolean>(false)

  const { showToastMessage, messageConfigProvider } = useToastMessage({ loginPage: true })

  const { email, code } = useAppSelector((state) => state.forgetPassword)

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object().shape({
      newPassword: Yup.string().required('Password is required').min(8, 'Password is too short!'),
      confirmPassword: Yup.string().oneOf([Yup.ref('newPassword')], "Passwords don't match"),
    }),
    onSubmit: (values) => {
      setSubmitting(true)
      dispatch(createNewPassword({ email, code, password: values.newPassword }))
        .unwrap()
        .then(() => {
          navigate('/login')
          showToastMessage('Password updated successfully.', 'success')
        })
        .catch((err) => {
          showToastMessage(err?.message || 'Something went wrong', 'error')
        })
        .finally(() => {
          setSubmitting(false)
        })
    },
  })

  return (
    <div className="login_feature">
      <form
        className="login_feature_container"
        onSubmit={formik.handleSubmit}
        style={{ gap: '46px' }}
      >
        <div className="logo">
          <img src="../../../public/softyDinnerLogo.png" alt="softy dinner logo" />
        </div>

        <div className="login_feature_container_inputs">
          <Input
            name="newPassword"
            formik={formik}
            variant="primary"
            label="New password (min 8 characters)"
            type="password"
          />

          <Input
            name="confirmPassword"
            formik={formik}
            variant="primary"
            label="Confirm password"
            type="password"
          />
        </div>

        <Button type="primary" submitting={submitting}>
          Save
        </Button>
      </form>

      {messageConfigProvider}
    </div>
  )
}

export default CreateNewPassword
