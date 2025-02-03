import { useAppDispatch } from '../../../shared/store'
import { useFormik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import Input from '../../../shared/components/Input'
import { useNavigate } from 'react-router-dom'
import Button from '../../../shared/components/Button/Button'

const CreateNewPassword = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [submitting, setSubmitting] = useState<boolean>(false)

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
      navigate('/todos')
      // setSubmitting(true)
      // dispatch(login(values))
      //   .unwrap()
      //   .then(() => {
      //     console.log('welcome')
      //   })
      //   .catch((err) => {
      //     alert(err?.message || 'something-went-wrong')
      //   })
      //   .finally(() => {
      //     setSubmitting(false)
      //   })
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
    </div>
  )
}

export default CreateNewPassword
