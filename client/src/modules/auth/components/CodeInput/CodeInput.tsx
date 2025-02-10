import { Input } from 'antd'
import type { GetProps } from 'antd'
import { useAppDispatch } from '../../../shared/store'
import { initialise } from '../../data/forgetPasswordSlice'

type OTPProps = GetProps<typeof Input.OTP>

const CodeInput = ({ error }: { error: boolean }) => {
  const dispatch = useAppDispatch()

  const onChange: OTPProps['onChange'] = (value) => {
    dispatch(initialise({ code: value }))
  }

  const sharedProps: OTPProps = {
    onChange,
  }

  return (
    <div className={`code_input_container ${error ? 'code_input_container_error' : ''}`}>
      <Input.OTP type="number" length={4} size="large" {...sharedProps} />
    </div>
  )
}

export default CodeInput
