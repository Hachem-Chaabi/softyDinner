import * as Yup from 'yup'
import { useAppDispatch } from '../../../shared/store'
import { useFormik } from 'formik'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { login } from '../../data/authThunk'

import Input from '../../../shared/components/Input'
import RememberMe from '../../../shared/components/RememberMe/RememberMe'
import Button from '../../../shared/components/Button/Button'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [submitting, setSubmitting] = useState<boolean>(false)

  const formik = useFormik({
    initialValues: {
      email: 'hachem.chaabi@takiacademyteam.com',
      password: 'softyHachem.8',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required('Email is required')
        .matches(/^[a-zA-Z0-9._%+-]+@takiacademyteam\.com$/, "The email address don't match."),
      password: Yup.string().required('Password is required').min(8, 'Password is too short!'),
    }),
    onSubmit: (values) => {
      setSubmitting(true)
      dispatch(login(values))
        .unwrap()
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
      <form className="login_feature_container" onSubmit={formik.handleSubmit}>
        <div className="logo">
          <img src="../../../public/softyDinnerLogo.png" alt="softy dinner logo" />
        </div>

        <div className="login_feature_container_inputs">
          <Input
            name="email"
            formik={formik}
            variant="primary"
            placeholder="Flenfouleni@takiacademyteam.com"
            label="Email"
          />

          <div className="password_input_and_actions">
            <Input
              name="password"
              formik={formik}
              variant="primary"
              label="Password (min 8 characters)"
              type="password"
            />

            {!formik?.errors?.password && (
              <div className="password_actions">
                <RememberMe />
                <NavLink to={'/login/reset-password'}>
                  <p className="forget_password">Forget Password?</p>
                </NavLink>
              </div>
            )}
          </div>
        </div>

        <Button type="primary" submitting={submitting}>
          Login
        </Button>
      </form>
    </div>
  )
}

export default Login
