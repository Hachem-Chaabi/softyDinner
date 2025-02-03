import React from 'react'
import { Input } from 'antd'
import type { GetProps } from 'antd'
import { useAppDispatch } from '../../../shared/store'
import { initialise } from '../../data/forgetPasswordSlice'

type OTPProps = GetProps<typeof Input.OTP>

const App: React.FC = () => {
  const dispatch = useAppDispatch()

  const onChange: OTPProps['onChange'] = (value) => {
    dispatch(initialise({ code: value }))
    console.log('onChange:', value)
  }

  const sharedProps: OTPProps = {
    onChange,
  }

  return (
    <div className="code_input_container">
      <Input.OTP type="number" length={4} size="large" {...sharedProps} />
    </div>
  )
}

export default App
