import { useAppDispatch, useAppSelector } from '../../../shared/store'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CodeInput from '../../components/CodeInput/CodeInput'
import Button from '../../../shared/components/Button/Button'
import { validateCode, validateEmail } from '../../data/authThunk'
import { useToastMessage } from '../../../shared/hook/useToastMessage'
import { initialise } from '../../data/forgetPasswordSlice'

const VerifyEmail = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const { showToastMessage, messageConfigProvider } = useToastMessage({ loginPage: true })

  const { email, code } = useAppSelector((state) => state.forgetPassword)

  const navigateBack = (e: any) => {
    e.preventDefault()
    navigate(-1)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if (code === '') {
      showToastMessage('Please enter the verification code.', 'error')
      return
    }

    setSubmitting(true)
    dispatch(validateCode({ email, code }))
      .unwrap()
      .then(() => {
        navigate('/login/reset-password/verify-email/create-new-password')
        setError(false)
      })
      .catch((err) => {
        showToastMessage(err?.message || 'Something went wrong', 'error')
        setError(true)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const handleResendCode = () => {
    setSubmitting(true)

    dispatch(validateEmail({ email }))
      .unwrap()
      .then(() => {
        dispatch(initialise({ email }))
      })
      .catch((err) => {
        showToastMessage(err?.message || 'Something went wrong', 'error')
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
          <p>Please enter the four digit code sent to {email}</p>
        </div>

        <div className="login_feature_container_inputs">
          <CodeInput error={error} />
        </div>
        <div className="login_feature_container_btns">
          <button
            disabled={submitting}
            onClick={handleResendCode}
            className={`login_feature_container_btn_resend ${error ? 'login_feature_container_btn_resend_error' : ''}`}
          >
            {error ? 'Invalid Code,' : ''} <span>Resend {error ? '' : 'Code'}</span>
          </button>
          <div className="btns">
            <Button onClick={navigateBack} type="secondary" submitting={submitting}>
              Go Back
            </Button>
            <Button type="primary" submitting={submitting}>
              Send
            </Button>
          </div>
        </div>
      </form>

      {messageConfigProvider}
    </div>
  )
}

export default VerifyEmail
