import { useAppDispatch } from '../../../shared/store'
import { useFormik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import Input from '../../../shared/components/Input'
import { NavLink, useNavigate } from 'react-router-dom'
import Button from '../../../shared/components/Button/Button'
import { validateEmail } from '../../data/authThunk'
import { initialise } from '../../data/forgetPasswordSlice'

const ResetPassword = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [submitting, setSubmitting] = useState<boolean>(false)

  const navigateBack = () => {
    navigate(-1)
  }

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required('Email is required')
        .matches(/^[a-zA-Z0-9._%+-]+@takiacademyteam\.com$/, "The email address don't match."),
    }),
    onSubmit: (values) => {
      setSubmitting(true)

      dispatch(validateEmail(values))
        .unwrap()
        .then(() => {
          console.log('email validated')
          dispatch(initialise(values))
          navigate('/login/reset-password/verify-email')
        })
        .catch((err) => {
          alert(err?.message || 'something-went-wrong')
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
        <div className="title">
          <h3>Reset Password</h3>
          <p>Please enter your email to receive a verification code.</p>
        </div>

        <div className="login_feature_container_inputs">
          <Input
            name="email"
            formik={formik}
            variant="primary"
            placeholder="Flenfouleni@takiacademyteam.com"
            label="Email"
          />
        </div>
        <div className="btns">
          <Button onClick={navigateBack} type="secondary" submitting={submitting}>
            Go Back
          </Button>
          {/* <NavLink to={'/login/reset-password/verify-email'}> */}
          <Button type="primary" submitting={submitting}>
            Send
          </Button>
          {/* </NavLink> */}
        </div>
      </form>
    </div>
  )
}

export default ResetPassword
