import { useAppDispatch, useAppSelector } from '../../../shared/store'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import CodeInput from '../../components/CodeInput/CodeInput'
import Button from '../../../shared/components/Button/Button'
import { validateCode } from '../../data/authThunk'

const VerifyEmail = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [submitting, setSubmitting] = useState<boolean>(false)

  const { email, code } = useAppSelector((state) => state.forgetPassword)

  const navigateBack = (e: any) => {
    e.preventDefault()
    navigate(-1)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setSubmitting(true)
    dispatch(validateCode({ email, code }))
      .unwrap()
      .then(() => {
        console.log('code validated')
        navigate('/login/reset-password/verify-email/create-new-password')
      })
      .catch((err) => {
        alert(err?.message || 'something-went-wrong')
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <div className="login_feature">
      <form className="login_feature_container" style={{ gap: '46px' }} onSubmit={handleSubmit}>
        <div className="title">
          <h3>Verify your Email</h3>
          <p>Please enter the four digit code sent to Flenfouleni@takiacademyteam.com</p>
        </div>

        <div className="login_feature_container_inputs">
          <CodeInput />
        </div>
        <div className="login_feature_container_btns">
          <button className="login_feature_container_btn_resend">Resend Code</button>
          <div className="btns">
            <Button onClick={navigateBack} type="secondary" submitting={submitting}>
              Go Back
            </Button>
            {/* <NavLink to={'/login/reset-password/verify-email/create-new-password'}> */}
            <Button type="primary" submitting={submitting}>
              Send
            </Button>
            {/* </NavLink> */}
          </div>
        </div>
      </form>
    </div>
  )
}

export default VerifyEmail
